// Runs the editor's own parser/serialiser against real saves.
//
//     node test_editor.js
//
// The important property is that loading a save and exporting it without
// changing anything produces a byte-identical file. Anything else means the
// editor is quietly rewriting parts of the save it does not understand.

const fs = require("fs");
const vm = require("vm");
const path = require("path");
const crypto = require("crypto");

// The signing key is console specific and personal, so it is never committed.
// Supply it with SHR_KEY=<32 hex chars>, or drop it in a local save_key.txt
// (git-ignored) as "save_key=<hex>".
const KEY_HEX = (function () {
    if (process.env.SHR_KEY) return process.env.SHR_KEY.trim();
    for (const candidate of ["save_key.txt", "../save_key.txt"]) {
        try {
            const match = require("fs").readFileSync(candidate, "utf8")
                .match(/save_key=([0-9a-fA-F]{32})/);
            if (match) return match[1];
        } catch (e) { /* not there */ }
    }
    return null;
})();

if (!KEY_HEX) {
    console.log("No signing key available, so signature checks are skipped.");
    console.log("Set SHR_KEY=<32 hex chars> to run them.");
}
const SAVES = [
    "../roundtrip/before/85DEBBF2AB0B/05",
    "../roundtrip/before/85DEBBF3AB0B/05",
    "../Bak/56550015/85DEBA48DF78/05"
];

const store = { shr_xbox_save_key: KEY_HEX };
const sandbox = {
    console,
    localStorage: {
        getItem: k => (k in store ? store[k] : null),
        setItem: (k, v) => { store[k] = v; },
        removeItem: k => { delete store[k]; }
    },
    module: { exports: {} },
    Uint8Array, DataView, ArrayBuffer, Math, Date, JSON, String, Array, Number, Object
};
vm.createContext(sandbox);
for (const file of ["xbox_signing.js", "shar_data.js", "save_parser.js"]) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, file), "utf8"), sandbox);
}

function roundTrip(file, mutation) {
    const original = fs.readFileSync(path.join(__dirname, file));
    sandbox.__buf = original.buffer.slice(
        original.byteOffset, original.byteOffset + original.byteLength);
    const result = vm.runInContext(`(function () {
        const save = new SharSaveGame();
        save.load(__buf, "05");
        const parsed = { coins: save.coins, name: save.profileName };
        ${mutation || ""}
        const bytes = save.serialize();
        return { parsed: parsed, signed: save.lastSignResult, bytes: Array.from(bytes) };
    })()`, sandbox);
    return { original, edited: Buffer.from(result.bytes),
             signed: result.signed, parsed: result.parsed };
}

function differing(a, b) {
    const out = [];
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        if (a[i] !== b[i]) out.push(i);
    }
    return out;
}

function signatureValid(buffer) {
    const body = buffer.subarray(0, buffer.length - 20);
    const want = crypto.createHmac("sha1", Buffer.from(KEY_HEX, "hex"))
        .update(body).digest();
    return want.equals(buffer.subarray(buffer.length - 20));
}

let failures = 0;
function check(label, ok, detail) {
    console.log(`  ${ok ? "PASS" : "FAIL"}  ${label}${detail ? "  " + detail : ""}`);
    if (!ok) failures++;
}

console.log("[1] exporting an unedited save must not change a single byte");
for (const file of SAVES) {
    if (!fs.existsSync(path.join(__dirname, file))) {
        console.log(`  skip  ${file} (missing)`);
        continue;
    }
    const { original, edited, signed } = roundTrip(file);
    const diff = differing(original, edited);
    check(path.basename(path.dirname(file)) + "/" + path.basename(file),
          diff.length === 0 && signed,
          `${diff.length} bytes changed, signed=${signed}`);
}

console.log("\n[2] a coin edit changes only the coins and the signature");
{
    const { original, edited, parsed } = roundTrip(SAVES[0], "save.coins = 1000;");
    const diff = differing(original, edited);
    const expected = [0x112d, 0x112e];
    const inSig = diff.filter(i => i >= original.length - 20);
    const inBody = diff.filter(i => i < original.length - 20);
    check("parsed the original coin value", parsed.coins === 70, String(parsed.coins));
    check("only the coin field changed in the body",
          JSON.stringify(inBody) === JSON.stringify(expected),
          inBody.map(x => "0x" + x.toString(16)).join(" "));
    check("the signature was recomputed", inSig.length === 20);
    check("signature is valid", signatureValid(edited));
    check("size unchanged", edited.length === original.length);

    const reference = path.join(__dirname, "../roundtrip/signed/85DEBBF2AB0B/05");
    if (fs.existsSync(reference)) {
        check("byte-identical to the independently signed file",
              fs.readFileSync(reference).equals(edited));
    }
}

console.log("\n[3] the profile-name field no longer eats its neighbours");
{
    const { original, edited } = roundTrip(SAVES[0], 'save.profileName = "Homer";');
    check("bytes after the name terminator are untouched",
          original.subarray(0x1d, 0x25).equals(edited.subarray(0x1d, 0x25)),
          original.subarray(0x1d, 0x25).toString("hex"));
    check("the new name was written",
          edited.subarray(0x15, 0x1a).toString("latin1") === "Homer");
}

console.log("\n[4] without a key, nothing is signed and nothing is corrupted");
{
    delete store.shr_xbox_save_key;
    const { original, edited, signed } = roundTrip(SAVES[0]);
    check("signing reported as not done", signed === false, String(signed));
    check("the file is still byte-identical", differing(original, edited).length === 0);
    store.shr_xbox_save_key = KEY_HEX;
}

console.log(`\nFAILURES: ${failures}`);
process.exit(failures ? 1 : 0);
