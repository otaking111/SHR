// Xbox save signing.
//
// The last 20 bytes of an Xbox save data file are
//     HMAC-SHA1(key, everything before them)
// so any edit invalidates them and the game reports a damaged save. Recompute
// the signature and the game accepts the file again.
//
// The key is specific to the console *and* the title. It is not derivable from
// the save or from the game disc: it is built from the console's EEPROM, so it
// has to be supplied. See the project README for how to recover one.
//
// SHA-1 is implemented here rather than using crypto.subtle because SubtleCrypto
// is unavailable on file:// pages, and this editor should work when opened
// straight from disk.

const XboxSigning = (function () {
    const SIGNATURE_BYTES = 20;
    const STORAGE_KEY = "shr_xbox_save_key";

    function rotl(value, bits) {
        return ((value << bits) | (value >>> (32 - bits))) >>> 0;
    }

    // Straight FIPS 180-1 SHA-1 over a byte array, returning 20 bytes.
    function sha1(bytes) {
        const length = bytes.length;
        const withPadding = (((length + 8) >> 6) + 1) << 6;
        const block = new Uint8Array(withPadding);
        block.set(bytes);
        block[length] = 0x80;

        const bitLength = length * 8;
        const view = new DataView(block.buffer);
        view.setUint32(withPadding - 4, bitLength >>> 0, false);
        view.setUint32(withPadding - 8, Math.floor(bitLength / 0x100000000), false);

        let h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE;
        let h3 = 0x10325476, h4 = 0xC3D2E1F0;
        const w = new Uint32Array(80);

        for (let offset = 0; offset < withPadding; offset += 64) {
            for (let i = 0; i < 16; i++) {
                w[i] = view.getUint32(offset + i * 4, false);
            }
            for (let i = 16; i < 80; i++) {
                w[i] = rotl(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
            }

            let a = h0, b = h1, c = h2, d = h3, e = h4;
            for (let i = 0; i < 80; i++) {
                let f, k;
                if (i < 20) {
                    f = (b & c) | (~b & d);
                    k = 0x5A827999;
                } else if (i < 40) {
                    f = b ^ c ^ d;
                    k = 0x6ED9EBA1;
                } else if (i < 60) {
                    f = (b & c) | (b & d) | (c & d);
                    k = 0x8F1BBCDC;
                } else {
                    f = b ^ c ^ d;
                    k = 0xCA62C1D6;
                }
                const temp = (rotl(a, 5) + f + e + k + w[i]) >>> 0;
                e = d; d = c; c = rotl(b, 30); b = a; a = temp;
            }
            h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0;
            h3 = (h3 + d) >>> 0; h4 = (h4 + e) >>> 0;
        }

        const out = new Uint8Array(20);
        new DataView(out.buffer).setUint32(0, h0, false);
        new DataView(out.buffer).setUint32(4, h1, false);
        new DataView(out.buffer).setUint32(8, h2, false);
        new DataView(out.buffer).setUint32(12, h3, false);
        new DataView(out.buffer).setUint32(16, h4, false);
        return out;
    }

    function hmacSha1(key, message) {
        const blockSize = 64;
        let paddedKey = new Uint8Array(blockSize);
        if (key.length > blockSize) {
            paddedKey.set(sha1(key));
        } else {
            paddedKey.set(key);
        }

        const inner = new Uint8Array(blockSize + message.length);
        const outer = new Uint8Array(blockSize + 20);
        for (let i = 0; i < blockSize; i++) {
            inner[i] = paddedKey[i] ^ 0x36;
            outer[i] = paddedKey[i] ^ 0x5C;
        }
        inner.set(message, blockSize);
        outer.set(sha1(inner), blockSize);
        return sha1(outer);
    }

    function parseKey(text) {
        const cleaned = (text || "").replace(/[^0-9a-fA-F]/g, "");
        if (cleaned.length !== 32) {
            return null;
        }
        const key = new Uint8Array(16);
        for (let i = 0; i < 16; i++) {
            key[i] = parseInt(cleaned.substr(i * 2, 2), 16);
        }
        return key;
    }

    function getStoredKey() {
        try {
            return parseKey(localStorage.getItem(STORAGE_KEY) || "");
        } catch (e) {
            return null;
        }
    }

    function storeKey(text) {
        const key = parseKey(text);
        try {
            if (key) {
                localStorage.setItem(STORAGE_KEY, text.replace(/[^0-9a-fA-F]/g, ""));
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (e) {
            // Private browsing and file:// can both refuse storage; not fatal.
        }
        return key;
    }

    /**
     * Recompute the trailing signature over a save buffer, in place.
     * Returns true when it signed, false when no usable key is available.
     */
    function signBuffer(bytes, key) {
        key = key || getStoredKey();
        if (!key || bytes.length <= SIGNATURE_BYTES) {
            return false;
        }
        const body = bytes.subarray(0, bytes.length - SIGNATURE_BYTES);
        bytes.set(hmacSha1(key, body), bytes.length - SIGNATURE_BYTES);
        return true;
    }

    /** True when the buffer's existing signature already matches its contents. */
    function verifyBuffer(bytes, key) {
        key = key || getStoredKey();
        if (!key || bytes.length <= SIGNATURE_BYTES) {
            return null;
        }
        const body = bytes.subarray(0, bytes.length - SIGNATURE_BYTES);
        const expected = hmacSha1(key, body);
        for (let i = 0; i < SIGNATURE_BYTES; i++) {
            if (expected[i] !== bytes[bytes.length - SIGNATURE_BYTES + i]) {
                return false;
            }
        }
        return true;
    }

    function toHex(bytes) {
        return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
    }

    return {
        SIGNATURE_BYTES,
        STORAGE_KEY,
        sha1,
        hmacSha1,
        parseKey,
        getStoredKey,
        storeKey,
        signBuffer,
        verifyBuffer,
        toHex
    };
})();

if (typeof module !== "undefined" && module.exports) {
    module.exports = XboxSigning;
}
