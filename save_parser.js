// The Simpsons: Hit & Run - Save Game Binary Parser & Serializer
// Supports Original Xbox binary saves ("05") and PC saves

class SharSaveGame {
    constructor() {
        this.rawBuffer = null;
        this.dataView = null;
        this.bytes = null;
        this.isLoaded = false;
        this.filename = "05";
        this.isXbox = true;

        // Model state
        this.fileSize = 7218;
        this.timestamp = {
            year: 2026,
            month: 8,
            day: 23,
            hour: 18,
            minute: 26,
            second: 33,
            subsecond: 1978
        };
        this.headerLevel = 1;
        this.headerMission = 1;
        this.profileName = "Player1";

        // Levels 1..7 data
        this.levels = [];
        for (let i = 1; i <= 7; i++) {
            this.levels.push({
                levelNum: i,
                isUnlocked: i === 1,
                activeSkin: "NULL",
                cards: Array(7).fill(false),
                cardNames: Array(7).fill("NULL"),
                missions: {},
                gagsFound: 0,
                waspsDestroyed: 0
            });
        }

        // Global state
        this.currentLevel = 1;
        this.currentMission = 1;
        this.coins = 0;

        // 60 Vehicle slots
        this.vehicles = [];

        // Audio & options
        this.sfxVolume = 0.84;
        this.musicVolume = 0.88;
        this.dialogVolume = 0.88;
    }

    load(arrayBuffer, filename = "05") {
        this.rawBuffer = arrayBuffer.slice(0);
        this.bytes = new Uint8Array(this.rawBuffer);
        this.dataView = new DataView(this.rawBuffer);
        this.filename = filename;
        this.fileSize = this.bytes.length;

        // Check if Xbox (7218 bytes) or PC/other
        this.isXbox = this.fileSize >= 7194;

        this.parse();
        this.isLoaded = true;
    }

    parse() {
        const dv = this.dataView;
        const u8 = this.bytes;

        // --- 1. Header (0x00 to 0x14) ---
        // 0x00: uint32 total size
        // 0x04: uint16 subsecond
        // 0x06: uint16 year
        // 0x08: uint8 month, 0x09: day, 0x0A: hour, 0x0B: min, 0x0C: sec
        // 0x0E: uint8 headerLevel, 0x0F: uint8 headerMission
        if (this.fileSize >= 20) {
            this.timestamp.subsecond = dv.getUint16(0x04, true);
            this.timestamp.year = dv.getUint16(0x06, true) || new Date().getFullYear();
            this.timestamp.month = u8[0x08] || (new Date().getMonth() + 1);
            this.timestamp.day = u8[0x09] || new Date().getDate();
            this.timestamp.hour = u8[0x0A] || new Date().getHours();
            this.timestamp.minute = u8[0x0B] || new Date().getMinutes();
            this.timestamp.second = u8[0x0C] || new Date().getSeconds();
            this.headerLevel = u8[0x0E] || 1;
            this.headerMission = u8[0x0F] || 1;
        }

        // Profile name: 0x15..0x25 (16 bytes null terminated)
        this.profileName = this.readString(0x15, 16) || "Player1";

        // --- 2. Levels 1 to 7 (620 bytes each, starts at 0x25) ---
        for (let lvlIdx = 0; lvlIdx < 7; lvlIdx++) {
            const base = 0x25 + lvlIdx * 620;
            const lvlObj = this.levels[lvlIdx];

            // 7 Cards (each 17 bytes: 16 bytes string + 1 byte flag)
            lvlObj.cards = [];
            lvlObj.cardNames = [];
            for (let c = 0; c < 7; c++) {
                const cOff = base + c * 17;
                const cName = this.readString(cOff, 16);
                const cCollected = u8[cOff + 16] === 1;
                lvlObj.cardNames.push(cName);
                lvlObj.cards.push(cCollected);
            }

            // 13 Missions (each 32 bytes: starts at base + 120 = 0x078 in block)
            // m0..m7, sr1, sr2, sr3, bm1, gr1
            lvlObj.missions = {};
            const missionKeys = ["m0", "m1", "m2", "m3", "m4", "m5", "m6", "m7", "sr1", "sr2", "sr3", "bm1", "gr1"];
            for (let m = 0; m < 13; m++) {
                const mOff = base + 120 + m * 32;
                const mName = this.readString(mOff, 16) || missionKeys[m];
                const isCompleted = dv.getInt32(mOff + 16, true) === 1;
                const unlockState = dv.getInt32(mOff + 20, true); // 2 = unlocked/available, 0 = locked
                const bestTime = dv.getInt32(mOff + 24, true);
                const secondaryStat = dv.getInt32(mOff + 28, true);

                lvlObj.missions[missionKeys[m]] = {
                    name: mName,
                    completed: isCompleted,
                    unlocked: unlockState > 0,
                    bestTime: bestTime,
                    secondaryStat: secondaryStat
                };
            }

            // Trailing 84 bytes in level (base + 536 to base + 620)
            const extraBase = base + 536;
            lvlObj.isUnlocked = dv.getInt32(extraBase + 12, true) === 1 || lvlIdx === 0;
            lvlObj.activeSkin = this.readString(extraBase + 16, 16) || "NULL";
            
            // Gags bitmask / count
            const gagVal = dv.getUint32(extraBase + 32, true);
            lvlObj.gagsFound = this.countBits(gagVal);
            lvlObj.rawGagMask = gagVal;

            // Wasp count
            const waspVal = dv.getUint32(extraBase + 36, true);
            lvlObj.waspsDestroyed = waspVal;
        }

        // --- 3. Global State (0x1119 to 0x1131) ---
        // 0x1125: currentLevel (1-indexed)
        // 0x1129: currentMission
        // 0x112D: coins (uint32)
        if (this.fileSize >= 0x1131) {
            this.currentLevel = dv.getUint32(0x1125, true) || 1;
            this.currentMission = dv.getUint32(0x1129, true) || 1;
            this.coins = dv.getUint32(0x112D, true);
        }

        // --- 4. 60 Vehicles (0x1131 to 0x16D1, 24 bytes each) ---
        this.vehicles = [];
        if (this.fileSize >= 0x16D1) {
            for (let v = 0; v < 60; v++) {
                const vOff = 0x1131 + v * 24;
                const vName = this.readString(vOff, 16) || "n/a";
                const health = dv.getFloat32(vOff + 16, true);
                const damage = dv.getFloat32(vOff + 20, true);

                const isOwned = vName !== "n/a" && vName !== "" && vName !== "NULL";
                this.vehicles.push({
                    slot: v,
                    id: vName,
                    isOwned: isOwned,
                    health: isOwned ? Math.max(0, health) : 1.0,
                    damage: damage
                });
            }
        }

        // --- 5. Audio & Volume (0x1BF5 to 0x1C09) ---
        if (this.fileSize >= 0x1C10) {
            this.sfxVolume = dv.getFloat32(0x1BF9, true);
            this.musicVolume = dv.getFloat32(0x1BFD, true);
            this.dialogVolume = dv.getFloat32(0x1C01, true);
        }
    }

    countBits(n) {
        let count = 0;
        let v = n >>> 0;
        while (v > 0) {
            count += v & 1;
            v = v >>> 1;
        }
        return count;
    }

    readString(offset, maxLength) {
        let s = "";
        for (let i = 0; i < maxLength; i++) {
            const b = this.bytes[offset + i];
            if (b === 0) break;
            s += String.fromCharCode(b);
        }
        return s;
    }

    writeString(offset, str, maxLength) {
        for (let i = 0; i < maxLength; i++) {
            if (i < str.length) {
                this.bytes[offset + i] = str.charCodeAt(i);
            } else {
                this.bytes[offset + i] = 0;
            }
        }
    }

    // Save and serialize changes back into the buffer
    serialize() {
        const dv = this.dataView;
        const u8 = this.bytes;

        // 1. Update Header
        dv.setUint16(0x04, this.timestamp.subsecond || 1978, true);
        dv.setUint16(0x06, this.timestamp.year, true);
        u8[0x08] = this.timestamp.month;
        u8[0x09] = this.timestamp.day;
        u8[0x0A] = this.timestamp.hour;
        u8[0x0B] = this.timestamp.minute;
        u8[0x0C] = this.timestamp.second;
        u8[0x0E] = this.currentLevel;
        u8[0x0F] = this.currentMission;

        // Profile name
        this.writeString(0x15, this.profileName, 16);

        // 2. Update Levels 1 to 7
        for (let lvlIdx = 0; lvlIdx < 7; lvlIdx++) {
            const base = 0x25 + lvlIdx * 620;
            const lvlObj = this.levels[lvlIdx];

            // 7 Cards
            for (let c = 0; c < 7; c++) {
                const cOff = base + c * 17;
                const isCollected = lvlObj.cards[c];
                // In game, collected card string is e.g. "Cardx" or card name, flag = 1
                const cName = isCollected ? (lvlObj.cardNames[c] === "NULL" ? "Cardx" : lvlObj.cardNames[c]) : "NULL";
                this.writeString(cOff, cName, 16);
                u8[cOff + 16] = isCollected ? 1 : 0;
            }

            // 13 Missions
            const missionKeys = ["m0", "m1", "m2", "m3", "m4", "m5", "m6", "m7", "sr1", "sr2", "sr3", "bm1", "gr1"];
            for (let m = 0; m < 13; m++) {
                const mOff = base + 120 + m * 32;
                const k = missionKeys[m];
                const mData = lvlObj.missions[k] || { completed: false, unlocked: false, bestTime: 0, secondaryStat: -1 };
                
                this.writeString(mOff, k, 16);
                dv.setInt32(mOff + 16, mData.completed ? 1 : 0, true);
                dv.setInt32(mOff + 20, mData.completed ? 2 : (mData.unlocked ? 2 : 0), true);
                dv.setInt32(mOff + 24, mData.bestTime || 0, true);
                dv.setInt32(mOff + 28, mData.secondaryStat ?? -1, true);
            }

            // Trailing 84 bytes in level
            const extraBase = base + 536;
            dv.setInt32(extraBase + 12, lvlObj.isUnlocked ? 1 : 0, true);
            this.writeString(extraBase + 16, lvlObj.activeSkin || "NULL", 16);

            // Wasps & Gags
            dv.setUint32(extraBase + 36, lvlObj.waspsDestroyed || 0, true);
        }

        // 3. Update Global State
        dv.setUint32(0x1125, this.currentLevel, true);
        dv.setUint32(0x1129, this.currentMission, true);
        dv.setUint32(0x112D, this.coins, true);

        // 4. Update Vehicles
        for (let v = 0; v < 60; v++) {
            const vOff = 0x1131 + v * 24;
            const vData = this.vehicles[v];
            if (vData && vData.isOwned && vData.id && vData.id !== "n/a" && vData.id !== "NULL") {
                this.writeString(vOff, vData.id, 16);
                dv.setFloat32(vOff + 16, vData.health ?? 1.0, true);
                dv.setFloat32(vOff + 20, vData.damage ?? -1.0, true);
            } else {
                this.writeString(vOff, "n/a", 16);
                dv.setFloat32(vOff + 16, -1.0, true);
                dv.setFloat32(vOff + 20, -1.0, true);
            }
        }

        // 5. Update Audio
        if (this.fileSize >= 0x1C10) {
            dv.setFloat32(0x1BF9, this.sfxVolume, true);
            dv.setFloat32(0x1BFD, this.musicVolume, true);
            dv.setFloat32(0x1C01, this.dialogVolume, true);
        }

        return this.bytes;
    }

    // Quick Action Presets
    maxCoins() {
        this.coins = 999999;
    }

    unlockAllVehicles() {
        // Collect all distinct vehicles from metadata
        const list = SHAR_DATA.allVehicles.map(v => v.id);
        for (let i = 0; i < 60; i++) {
            if (i < list.length) {
                this.vehicles[i] = {
                    slot: i,
                    id: list[i],
                    isOwned: true,
                    health: 1.0,
                    damage: -1.0
                };
            }
        }
    }

    repairAllVehicles() {
        for (const v of this.vehicles) {
            if (v.isOwned) {
                v.health = 1.0;
                v.damage = -1.0;
            }
        }
    }

    unlockAllCards() {
        for (let lvl = 0; lvl < 7; lvl++) {
            for (let c = 0; c < 7; c++) {
                this.levels[lvl].cards[c] = true;
                this.levels[lvl].cardNames[c] = "Cardx";
            }
        }
    }

    completeAllMissions() {
        for (let lvl = 0; lvl < 7; lvl++) {
            this.levels[lvl].isUnlocked = true;
            for (const key of Object.keys(this.levels[lvl].missions)) {
                this.levels[lvl].missions[key].completed = true;
                this.levels[lvl].missions[key].unlocked = true;
            }
        }
    }

    complete100Percent() {
        this.maxCoins();
        this.unlockAllVehicles();
        this.repairAllVehicles();
        this.unlockAllCards();
        this.completeAllMissions();
        for (let lvl = 0; lvl < 7; lvl++) {
            this.levels[lvl].isUnlocked = true;
            this.levels[lvl].waspsDestroyed = SHAR_DATA.levels[lvl].totalWasps;
            this.levels[lvl].gagsFound = SHAR_DATA.levels[lvl].totalGags;
        }
    }

    // Generate Xbox SaveMeta.xbx string (UTF-16LE with BOM)
    generateSaveMeta() {
        const month = String(this.timestamp.month).padStart(2, '0');
        const day = String(this.timestamp.day).padStart(2, '0');
        const year = String(this.timestamp.year).slice(-2);
        const hour = String(this.timestamp.hour).padStart(2, '0');
        const min = String(this.timestamp.minute).padStart(2, '0');
        const sec = String(this.timestamp.second).padStart(2, '0');

        const titleText = `Name = (L${this.currentLevel} M${this.currentMission})    ${month}/${day}/${year} ${hour}:${min}:${sec}\r\n\r\n`;
        
        // Convert to UTF-16LE ArrayBuffer with 0xFEFF BOM
        const buffer = new ArrayBuffer(2 + titleText.length * 2);
        const view = new DataView(buffer);
        view.setUint16(0, 0xFEFF, true); // BOM
        for (let i = 0; i < titleText.length; i++) {
            view.setUint16(2 + i * 2, titleText.charCodeAt(i), true);
        }
        return new Uint8Array(buffer);
    }
}
