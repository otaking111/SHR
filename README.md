# The Simpsons: Hit & Run - Web Save Editor

A web-based save game editor for **The Simpsons: Hit & Run** (Original Xbox & PC).

![Simpsons Hit & Run](https://upload.wikimedia.org/wikipedia/en/2/2a/The_Simpsons_-_Hit_%26_Run_Coverart.png)

## Features

- **Save File Support**:
  - Direct Drag-and-Drop and File Picker for `05` (Xbox) and `.rad` (PC) save files.
  - Built-in embedded sample save from `SavE/56550015/85DEBA48DF78/05`.
  - 1-Click Export as raw binary `05` or a full Xbox ZIP package (`56550015/85DEBA48DF78/05` + `SaveMeta.xbx`).
- **Profile & Progress**:
  - Edit Profile Name (up to 15 characters).
  - Modify Coin Balance ($0 to $999,999+).
  - Select Current Story Level (1–7) and Active Mission (m0–m7).
  - Sync / customize save timestamps.
- **7 Levels Hub**:
  - **Level 1**: Homer (Evergreen Terrace / Suburbs)
  - **Level 2**: Bart (Downtown Springfield)
  - **Level 3**: Lisa (Squidport & Harbour)
  - **Level 4**: Marge (Evergreen Terrace Night)
  - **Level 5**: Apu (Downtown Night)
  - **Level 6**: Bart (Squidport Night)
  - **Level 7**: Homer (Spooky Halloween Suburbs)
  - Complete, unlock, or lock individual story missions, street races, bonus missions, and gamble races.
  - Active character outfit / costume selector.
  - Wasp Cameras and Gag counters.
- **Collector Cards (49 Cards)**:
  - Full catalog of all 7 cards per level (49 total) with quotes and descriptions.
  - Level bonus vehicles unlocked upon card set completion (Rocket Car, Monorail Car, Knight Boat, Clown Car, El Carro Loco, Police Hovercar, Open Wheel 500).
- **Vehicle Garage (60 Slots)**:
  - 60 Vehicle slots with stats (Speed, Acceleration, Toughness, Handling).
  - Add / remove any character car, bonus vehicle, Gil shop car, traffic car, or secret cheat car (e.g. Red Brick Car, Coffin Car, Grampa's Rocket, etc.).
  - Set vehicle health / 100% repair.
- **Quick 1-Click Cheats**:
  - 🌟 **100% Game Completion** (All missions, all 49 cards, all 60 cars, wasps, gags, max coins)
  - 💰 **Max Coins ($999,999)**
  - 🚗 **Unlock All 60 Vehicles & Max Repair**
  - 🃏 **Unlock All 49 Collector Cards**
  - 🎯 **Complete All Story & Bonus Missions**
  - 🔧 **Repair All Vehicles**
- **Hex Inspector**:
  - Live memory map viewer with jump navigation across save data offsets.

## How to Run

### Option 1: Open Directly in Browser
Double-click [`index.html`](file:///C:/Users/jtaki/Documents/AGY/SHR/index.html) in your browser.

### Option 2: Local Python Web Server
Run:
```bash
python start_server.py
```
And navigate to `http://localhost:8000`.

## Save File Structure Reference (Xbox Title ID 56550015)
- `0x0000 - 0x0014`: Save Header (Filesize, Timestamp Year/Month/Day/Hour/Min/Sec, Level, Mission)
- `0x0015 - 0x0024`: Profile Name (16 bytes)
- `0x0025 - 0x1118`: 7 Level Blocks (620 bytes each = 4,340 bytes total)
  - `+0x000`: 7 Collector Cards (17 bytes each)
  - `+0x078`: 13 Missions (32 bytes each: 8 story, 3 street races, 1 bonus mission, 1 gamble race)
  - `+0x218`: Level unlocks, equipped skin, gags & wasps
- `0x1119 - 0x1130`: Global State (Current Level, Current Mission, Coins)
- `0x1131 - 0x16D0`: 60 Vehicle Slots (24 bytes each: ID string, Health float, Damage float)
- `0x16D1 - 0x1BF4`: World Persistent Entity Bitmasks (1,316 bytes)
- `0x1BF5 - 0x1C19`: Audio & Gameplay Settings
- `0x1C1A - 0x1C2E`: Xbox Save Signature (20 bytes HMAC)
