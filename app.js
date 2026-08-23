// The Simpsons: Hit & Run - Save Editor Web Application Logic

let save = new SharSaveGame();
let currentLevelView = 1;
let currentGarageFilter = "all";

// DOM Elements
const toastEl = document.getElementById("toast");
const lblProfile = document.getElementById("lbl-profile");
const lblCurrentProgress = document.getElementById("lbl-current-progress");
const lblCoinsStat = document.getElementById("lbl-coins-stat");
const lblCardsStat = document.getElementById("lbl-cards-stat");
const lblCarsStat = document.getElementById("lbl-cars-stat");

// Progress elements
const progMissionsText = document.getElementById("prog-missions-text");
const progMissionsBar = document.getElementById("prog-missions-bar");
const progCardsText = document.getElementById("prog-cards-text");
const progCardsBar = document.getElementById("prog-cards-bar");
const progCarsText = document.getElementById("prog-cars-text");
const progCarsBar = document.getElementById("prog-cars-bar");
const progWaspsText = document.getElementById("prog-wasps-text");
const progWaspsBar = document.getElementById("prog-wasps-bar");

// Inputs
const inputProfileName = document.getElementById("input-profile-name");
const inputCoins = document.getElementById("input-coins");
const selectCurrentLevel = document.getElementById("select-current-level");
const selectCurrentMission = document.getElementById("select-current-mission");
const inputYear = document.getElementById("input-year");
const inputMonth = document.getElementById("input-month");
const inputDay = document.getElementById("input-day");
const inputTime = document.getElementById("input-time");
const metaPreviewText = document.getElementById("meta-preview-text");

// Audio sliders
const rangeSfx = document.getElementById("range-sfx");
const rangeMusic = document.getElementById("range-music");
const rangeDialog = document.getElementById("range-dialog");
const valSfx = document.getElementById("val-sfx");
const valMusic = document.getElementById("val-music");
const valDialog = document.getElementById("val-dialog");

// Initialize Application
window.addEventListener("DOMContentLoaded", () => {
    setupTabNavigation();
    setupDropzone();
    setupFileInput();
    setupEventListeners();

    // Auto-load sample save if available
    if (typeof SAMPLE_SAVE_B64 !== "undefined") {
        loadSampleSaveFromB64(SAMPLE_SAVE_B64);
    }
});

function showToast(message, isError = false) {
    toastEl.textContent = message;
    toastEl.style.borderLeftColor = isError ? "var(--danger-red)" : "var(--simpson-yellow)";
    toastEl.classList.remove("hidden");
    setTimeout(() => {
        toastEl.classList.add("hidden");
    }, 3500);
}

// Convert Base64 to ArrayBuffer
function b64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

function loadSampleSaveFromB64(b64) {
    try {
        const buffer = b64ToArrayBuffer(b64);
        save.load(buffer, "05");
        updateUI();
        showToast("🍩 Sample Xbox Save (05) successfully loaded!");
    } catch (e) {
        console.error(e);
        showToast("Error loading sample save: " + e.message, true);
    }
}

// Setup Tab Navigation
function setupTabNavigation() {
    const tabs = document.querySelectorAll(".nav-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

            tab.classList.add("active");
            const targetId = tab.getAttribute("data-tab");
            const pane = document.getElementById(targetId);
            if (pane) pane.classList.add("active");

            if (targetId === "tab-hex") {
                renderHexViewer(0);
            }
        });
    });
}

// File Drag and Drop & Input
function setupDropzone() {
    const dropzone = document.getElementById("dropzone");
    if (!dropzone) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => dropzone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => dropzone.classList.remove('dragover'), false);
    });

    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function setupFileInput() {
    const fileInput = document.getElementById("file-input");
    if (!fileInput) return;
    fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });
}

function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const buffer = e.target.result;
            save.load(buffer, file.name);
            updateUI();
            showToast(`✅ Loaded save file: "${file.name}" (${save.fileSize} bytes)`);
        } catch (err) {
            console.error(err);
            showToast("Failed to parse save file: " + err.message, true);
        }
    };
    reader.readAsArrayBuffer(file);
}

// Setup Event Listeners
function setupEventListeners() {
    // Quick Buttons
    document.getElementById("btn-load-sample").addEventListener("click", () => {
        if (typeof SAMPLE_SAVE_B64 !== "undefined") {
            loadSampleSaveFromB64(SAMPLE_SAVE_B64);
        }
    });

    // Profile & Inputs
    inputProfileName.addEventListener("input", (e) => {
        save.profileName = e.target.value;
        lblProfile.textContent = save.profileName;
    });

    inputCoins.addEventListener("input", (e) => {
        save.coins = Math.max(0, parseInt(e.target.value) || 0);
        lblCoinsStat.textContent = save.coins.toLocaleString();
    });

    document.getElementById("btn-quick-max-coins").addEventListener("click", () => {
        save.maxCoins();
        inputCoins.value = save.coins;
        lblCoinsStat.textContent = save.coins.toLocaleString();
        showToast("💰 Set Coins to 999,999!");
    });

    selectCurrentLevel.addEventListener("change", (e) => {
        save.currentLevel = parseInt(e.target.value);
        updateMetaPreview();
        updateSidebarStats();
    });

    selectCurrentMission.addEventListener("change", (e) => {
        save.currentMission = parseInt(e.target.value);
        updateMetaPreview();
        updateSidebarStats();
    });

    // Timestamp
    inputYear.addEventListener("input", (e) => {
        save.timestamp.year = parseInt(e.target.value) || 2026;
        updateMetaPreview();
    });
    inputMonth.addEventListener("input", (e) => {
        save.timestamp.month = Math.min(12, Math.max(1, parseInt(e.target.value) || 1));
        updateMetaPreview();
    });
    inputDay.addEventListener("input", (e) => {
        save.timestamp.day = Math.min(31, Math.max(1, parseInt(e.target.value) || 1));
        updateMetaPreview();
    });
    inputTime.addEventListener("input", (e) => {
        const parts = e.target.value.split(":");
        if (parts.length >= 3) {
            save.timestamp.hour = parseInt(parts[0]) || 0;
            save.timestamp.minute = parseInt(parts[1]) || 0;
            save.timestamp.second = parseInt(parts[2]) || 0;
        }
        updateMetaPreview();
    });

    document.getElementById("btn-set-timestamp-now").addEventListener("click", () => {
        const now = new Date();
        save.timestamp.year = now.getFullYear();
        save.timestamp.month = now.getMonth() + 1;
        save.timestamp.day = now.getDate();
        save.timestamp.hour = now.getHours();
        save.timestamp.minute = now.getMinutes();
        save.timestamp.second = now.getSeconds();

        inputYear.value = save.timestamp.year;
        inputMonth.value = save.timestamp.month;
        inputDay.value = save.timestamp.day;
        inputTime.value = `${String(save.timestamp.hour).padStart(2, '0')}:${String(save.timestamp.minute).padStart(2, '0')}:${String(save.timestamp.second).padStart(2, '0')}`;
        updateMetaPreview();
        showToast("🕒 Timestamp synced to current local time!");
    });

    // Audio Sliders
    rangeSfx.addEventListener("input", (e) => {
        save.sfxVolume = parseFloat(e.target.value);
        valSfx.textContent = `${Math.round(save.sfxVolume * 100)}%`;
    });
    rangeMusic.addEventListener("input", (e) => {
        save.musicVolume = parseFloat(e.target.value);
        valMusic.textContent = `${Math.round(save.musicVolume * 100)}%`;
    });
    rangeDialog.addEventListener("input", (e) => {
        save.dialogVolume = parseFloat(e.target.value);
        valDialog.textContent = `${Math.round(save.dialogVolume * 100)}%`;
    });

    // Quick Cheats
    document.getElementById("cheat-100").addEventListener("click", () => {
        save.complete100Percent();
        updateUI();
        showToast("🌟 Applied 100% Game Completion Cheat!");
    });
    document.getElementById("cheat-max-coins").addEventListener("click", () => {
        save.maxCoins();
        updateUI();
        showToast("💰 Maximum Coins Granted (999,999)!");
    });
    document.getElementById("cheat-all-cars").addEventListener("click", () => {
        save.unlockAllVehicles();
        save.repairAllVehicles();
        updateUI();
        showToast("🚗 All 60 Vehicles Unlocked & Repaired!");
    });
    document.getElementById("cheat-all-cards").addEventListener("click", () => {
        save.unlockAllCards();
        updateUI();
        showToast("🃏 All 49 Collector Cards Unlocked!");
    });
    document.getElementById("cheat-all-missions").addEventListener("click", () => {
        save.completeAllMissions();
        updateUI();
        showToast("🎯 All Story & Side Missions Completed!");
    });
    document.getElementById("cheat-repair-all").addEventListener("click", () => {
        save.repairAllVehicles();
        updateUI();
        showToast("🔧 All Vehicles 100% Repaired!");
    });

    // Garage Actions
    document.getElementById("btn-garage-unlock-all").addEventListener("click", () => {
        save.unlockAllVehicles();
        updateUI();
        showToast("🚗 All 60 Vehicles Added to Garage!");
    });
    document.getElementById("btn-garage-repair-all").addEventListener("click", () => {
        save.repairAllVehicles();
        updateUI();
        showToast("🔧 All Garage Vehicles 100% Repaired!");
    });

    // Cards Tab Action
    document.getElementById("btn-collect-all-cards").addEventListener("click", () => {
        save.unlockAllCards();
        updateUI();
        showToast("✨ Collected All 49 Cards!");
    });

    // Garage Filters
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentGarageFilter = btn.getAttribute("data-filter");
            renderGarage();
        });
    });

    // Export Buttons
    document.getElementById("btn-export-save").addEventListener("click", exportSaveBinary);
    document.getElementById("btn-export-xbox-zip").addEventListener("click", exportXboxZip);
}

// Update the entire UI from the save model
function updateUI() {
    // 1. Overview & Profile
    inputProfileName.value = save.profileName;
    inputCoins.value = save.coins;
    selectCurrentLevel.value = String(save.currentLevel);
    selectCurrentMission.value = String(save.currentMission);

    inputYear.value = save.timestamp.year;
    inputMonth.value = save.timestamp.month;
    inputDay.value = save.timestamp.day;
    inputTime.value = `${String(save.timestamp.hour).padStart(2, '0')}:${String(save.timestamp.minute).padStart(2, '0')}:${String(save.timestamp.second).padStart(2, '0')}`;

    // 2. Audio Sliders
    rangeSfx.value = save.sfxVolume;
    valSfx.textContent = `${Math.round(save.sfxVolume * 100)}%`;
    rangeMusic.value = save.musicVolume;
    valMusic.textContent = `${Math.round(save.musicVolume * 100)}%`;
    rangeDialog.value = save.dialogVolume;
    valDialog.textContent = `${Math.round(save.dialogVolume * 100)}%`;

    // 3. Sub-views
    updateMetaPreview();
    updateSidebarStats();
    renderLevelPills();
    renderLevelDetail(currentLevelView);
    renderAllCardsTab();
    renderGarage();
    renderHexViewer(0);
}

function updateMetaPreview() {
    const month = String(save.timestamp.month).padStart(2, '0');
    const day = String(save.timestamp.day).padStart(2, '0');
    const year = String(save.timestamp.year).slice(-2);
    const hour = String(save.timestamp.hour).padStart(2, '0');
    const min = String(save.timestamp.minute).padStart(2, '0');
    const sec = String(save.timestamp.second).padStart(2, '0');

    metaPreviewText.textContent = `Name = (L${save.currentLevel} M${save.currentMission})    ${month}/${day}/${year} ${hour}:${min}:${sec}`;
}

function updateSidebarStats() {
    lblProfile.textContent = save.profileName;
    lblCurrentProgress.textContent = `L${save.currentLevel} M${save.currentMission}`;
    lblCoinsStat.textContent = save.coins.toLocaleString();

    // Count cards
    let totalCards = 0;
    for (const lvl of save.levels) {
        totalCards += lvl.cards.filter(Boolean).length;
    }
    lblCardsStat.textContent = `${totalCards} / 49`;
    progCardsText.textContent = `${totalCards} / 49`;
    progCardsBar.style.width = `${Math.round((totalCards / 49) * 100)}%`;

    // Count missions
    let totalMissions = 0;
    for (const lvl of save.levels) {
        for (const m of Object.values(lvl.missions)) {
            if (m.completed) totalMissions++;
        }
    }
    // 7 levels * (7 story + 1 bm) = 56 primary missions
    progMissionsText.textContent = `${totalMissions} / 91`;
    progMissionsBar.style.width = `${Math.round((totalMissions / 91) * 100)}%`;

    // Count cars
    const ownedCars = save.vehicles.filter(v => v.isOwned).length;
    lblCarsStat.textContent = `${ownedCars} / 60`;
    progCarsText.textContent = `${ownedCars} / 60`;
    progCarsBar.style.width = `${Math.round((ownedCars / 60) * 100)}%`;

    // Wasps
    let totalWasps = 0;
    for (const lvl of save.levels) {
        totalWasps += lvl.waspsDestroyed || 0;
    }
    progWaspsText.textContent = `${totalWasps} / 140`;
    progWaspsBar.style.width = `${Math.round((totalWasps / 140) * 100)}%`;
}

// Render Level Pills (1 to 7)
function renderLevelPills() {
    const container = document.getElementById("level-selector-pills");
    if (!container) return;
    container.innerHTML = "";

    for (let i = 1; i <= 7; i++) {
        const lvlData = SHAR_DATA.levels[i - 1];
        const pill = document.createElement("button");
        pill.className = `lvl-pill ${i === currentLevelView ? 'active' : ''}`;
        pill.textContent = `Level ${i} (${lvlData.character})`;
        pill.addEventListener("click", () => {
            currentLevelView = i;
            renderLevelPills();
            renderLevelDetail(i);
        });
        container.appendChild(pill);
    }
}

// Render Specific Level Detail
function renderLevelDetail(lvlNum) {
    const container = document.getElementById("level-detail-container");
    if (!container) return;

    const meta = SHAR_DATA.levels[lvlNum - 1];
    const lvlState = save.levels[lvlNum - 1];

    let cardsHtml = "";
    meta.cards.forEach((card, idx) => {
        const isCollected = lvlState.cards[idx];
        cardsHtml += `
            <div class="card-item ${isCollected ? 'collected' : ''}" data-lvl="${lvlNum}" data-card="${idx}">
                <input type="checkbox" class="card-check" ${isCollected ? 'checked' : ''}>
                <div>
                    <div class="card-item-title">Card #${card.num}: ${card.name}</div>
                    <div class="card-item-desc">${card.desc}</div>
                </div>
            </div>
        `;
    });

    let missionsHtml = "";
    meta.missions.forEach(m => {
        const mState = lvlState.missions[m.id] || { completed: false, unlocked: false };
        const isCompleted = mState.completed;
        const badgeClass = m.type === "story" ? "badge-story" : (m.type === "race" ? "badge-race" : (m.type === "bonus" ? "badge-bonus" : "badge-gamble"));
        
        missionsHtml += `
            <div class="mission-item">
                <div class="mission-info">
                    <input type="checkbox" class="mission-checkbox" data-lvl="${lvlNum}" data-mission="${m.id}" ${isCompleted ? 'checked' : ''}>
                    <div>
                        <div class="mission-name">${m.name}</div>
                        <div class="mission-giver">Giver: ${m.giver} ${m.reward ? `• Reward: <strong>${m.reward}</strong>` : ''}</div>
                    </div>
                </div>
                <span class="mission-badge ${badgeClass}">${m.type}</span>
            </div>
        `;
    });

    // Skins dropdown
    let skinsOptions = "";
    meta.skins.forEach(skin => {
        skinsOptions += `<option value="${skin.id}" ${lvlState.activeSkin === skin.id ? 'selected' : ''}>${skin.name} (${skin.cost === 0 ? 'Default' : `$${skin.cost}`})</option>`;
    });

    container.innerHTML = `
        <div class="level-banner">
            <div>
                <div class="level-title">${meta.name}</div>
                <div class="level-meta-tags">
                    <span class="tag">Character: ${meta.character}</span>
                    <span class="tag">Time: ${meta.timeOfDay}</span>
                    <span class="tag">Zone: ${meta.zone}</span>
                    <span class="tag">Bonus Car: ${meta.bonusCar.name}</span>
                </div>
            </div>
            <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-right: 8px;">Level Unlocked:</label>
                <input type="checkbox" id="chk-level-unlocked" ${lvlState.isUnlocked ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--simpson-yellow); vertical-align: middle;">
            </div>
        </div>

        <div class="grid-2col">
            <!-- Missions List -->
            <div class="card">
                <div class="card-header flex-between">
                    <span><span class="card-icon">🎯</span> Missions & Races (${meta.missions.length})</span>
                    <button class="btn btn-sm btn-accent" id="btn-complete-this-level-missions">Complete All</button>
                </div>
                <div class="card-body">
                    <div class="mission-list">
                        ${missionsHtml}
                    </div>
                </div>
            </div>

            <!-- Side Stats & Skins -->
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div class="card">
                    <div class="card-header">
                        <span class="card-icon">👕</span> Character Outfit & Collectibles
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label>Active Character Skin / Costume</label>
                            <select id="select-level-skin" class="form-control">
                                ${skinsOptions}
                            </select>
                        </div>
                        <div class="form-row-2">
                            <div class="form-group">
                                <label>Gags Interacted (${meta.totalGags} Max)</label>
                                <input type="number" id="input-level-gags" min="0" max="${meta.totalGags}" class="form-control" value="${lvlState.gagsFound}">
                            </div>
                            <div class="form-group">
                                <label>Wasps Destroyed (${meta.totalWasps} Max)</label>
                                <input type="number" id="input-level-wasps" min="0" max="${meta.totalWasps}" class="form-control" value="${lvlState.waspsDestroyed}">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header flex-between">
                        <span><span class="card-icon">🃏</span> Level Collector Cards (7)</span>
                        <button class="btn btn-sm btn-warning" id="btn-collect-this-level-cards">Collect 7 Cards</button>
                    </div>
                    <div class="card-body">
                        <div class="cards-grid">
                            ${cardsHtml}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Attach listeners for dynamic elements
    container.querySelector("#chk-level-unlocked").addEventListener("change", (e) => {
        lvlState.isUnlocked = e.target.checked;
    });

    container.querySelector("#select-level-skin").addEventListener("change", (e) => {
        lvlState.activeSkin = e.target.value;
    });

    container.querySelector("#input-level-gags").addEventListener("input", (e) => {
        lvlState.gagsFound = parseInt(e.target.value) || 0;
    });

    container.querySelector("#input-level-wasps").addEventListener("input", (e) => {
        lvlState.waspsDestroyed = parseInt(e.target.value) || 0;
        updateSidebarStats();
    });

    container.querySelector("#btn-complete-this-level-missions").addEventListener("click", () => {
        for (const m of meta.missions) {
            if (!lvlState.missions[m.id]) lvlState.missions[m.id] = {};
            lvlState.missions[m.id].completed = true;
            lvlState.missions[m.id].unlocked = true;
        }
        renderLevelDetail(lvlNum);
        updateSidebarStats();
        showToast(`🎯 All Level ${lvlNum} missions completed!`);
    });

    container.querySelector("#btn-collect-this-level-cards").addEventListener("click", () => {
        for (let i = 0; i < 7; i++) {
            lvlState.cards[i] = true;
            lvlState.cardNames[i] = "Cardx";
        }
        renderLevelDetail(lvlNum);
        updateSidebarStats();
        showToast(`🃏 Collected all 7 cards for Level ${lvlNum}!`);
    });

    // Individual mission check
    container.querySelectorAll(".mission-checkbox").forEach(chk => {
        chk.addEventListener("change", (e) => {
            const mId = e.target.getAttribute("data-mission");
            if (!lvlState.missions[mId]) lvlState.missions[mId] = {};
            lvlState.missions[mId].completed = e.target.checked;
            lvlState.missions[mId].unlocked = true;
            updateSidebarStats();
        });
    });

    // Individual card click
    container.querySelectorAll(".card-item").forEach(cEl => {
        cEl.addEventListener("click", (e) => {
            const cIdx = parseInt(cEl.getAttribute("data-card"));
            const chk = cEl.querySelector(".card-check");
            // toggle
            if (e.target !== chk) {
                chk.checked = !chk.checked;
            }
            lvlState.cards[cIdx] = chk.checked;
            lvlState.cardNames[cIdx] = chk.checked ? "Cardx" : "NULL";
            cEl.classList.toggle("collected", chk.checked);
            updateSidebarStats();
        });
    });
}

// Render All Cards Tab
function renderAllCardsTab() {
    const container = document.getElementById("all-cards-container");
    if (!container) return;

    let html = "";
    SHAR_DATA.levels.forEach(lvl => {
        const lvlState = save.levels[lvl.id - 1];
        let itemsHtml = "";
        lvl.cards.forEach((card, idx) => {
            const isCollected = lvlState.cards[idx];
            itemsHtml += `
                <div class="card-item ${isCollected ? 'collected' : ''}" data-lvl="${lvl.id}" data-card="${idx}">
                    <input type="checkbox" class="card-check" ${isCollected ? 'checked' : ''}>
                    <div>
                        <div class="card-item-title">Card #${card.num}: ${card.name}</div>
                        <div class="card-item-desc">${card.desc}</div>
                    </div>
                </div>
            `;
        });

        html += `
            <div class="card mb-20" style="margin-bottom: 20px;">
                <div class="card-header flex-between">
                    <span><span class="card-icon">🃏</span> ${lvl.name} (Bonus Car: <strong>${lvl.bonusCar.name}</strong>)</span>
                    <button class="btn btn-sm btn-accent btn-collect-level-cards-all" data-lvl="${lvl.id}">Collect 7 Cards</button>
                </div>
                <div class="card-body">
                    <div class="cards-grid">
                        ${itemsHtml}
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Attach click listeners for all cards
    container.querySelectorAll(".card-item").forEach(cEl => {
        cEl.addEventListener("click", (e) => {
            const lvlId = parseInt(cEl.getAttribute("data-lvl"));
            const cIdx = parseInt(cEl.getAttribute("data-card"));
            const chk = cEl.querySelector(".card-check");
            if (e.target !== chk) {
                chk.checked = !chk.checked;
            }
            save.levels[lvlId - 1].cards[cIdx] = chk.checked;
            save.levels[lvlId - 1].cardNames[cIdx] = chk.checked ? "Cardx" : "NULL";
            cEl.classList.toggle("collected", chk.checked);
            updateSidebarStats();
        });
    });

    container.querySelectorAll(".btn-collect-level-cards-all").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const lvlId = parseInt(btn.getAttribute("data-lvl"));
            for (let i = 0; i < 7; i++) {
                save.levels[lvlId - 1].cards[i] = true;
                save.levels[lvlId - 1].cardNames[i] = "Cardx";
            }
            renderAllCardsTab();
            updateSidebarStats();
            showToast(`✨ Collected all 7 cards for Level ${lvlId}!`);
        });
    });
}

// Render Vehicle Garage Tab (60 Slots)
function renderGarage() {
    const container = document.getElementById("garage-grid");
    if (!container) return;

    let html = "";
    SHAR_DATA.allVehicles.forEach((carMeta, idx) => {
        // Find if in save
        const saveVehicle = save.vehicles.find(v => v.id === carMeta.id);
        const isOwned = saveVehicle ? saveVehicle.isOwned : false;
        const health = saveVehicle ? saveVehicle.health : 1.0;

        // Apply filter
        if (currentGarageFilter === "owned" && !isOwned) return;
        if (currentGarageFilter === "level1" && carMeta.level !== 1) return;
        if (currentGarageFilter === "level2" && carMeta.level !== 2) return;
        if (currentGarageFilter === "level3" && carMeta.level !== 3) return;
        if (currentGarageFilter === "level4" && carMeta.level !== 4) return;
        if (currentGarageFilter === "level5" && carMeta.level !== 5) return;
        if (currentGarageFilter === "level6" && carMeta.level !== 6) return;
        if (currentGarageFilter === "level7" && carMeta.level !== 7) return;
        if (currentGarageFilter === "bonus" && carMeta.level !== 0) return;

        html += `
            <div class="vehicle-card ${isOwned ? 'owned' : ''}">
                <div class="vehicle-card-header">
                    <div>
                        <div class="vehicle-name">${carMeta.name}</div>
                        <div class="vehicle-type">${carMeta.type} • <code>${carMeta.id}</code></div>
                    </div>
                    <span class="vehicle-owned-tag ${isOwned ? 'owned-yes' : 'owned-no'}">${isOwned ? 'In Garage' : 'Locked'}</span>
                </div>

                <div class="car-stats">
                    <div class="stat-row">
                        <span class="stat-name">Speed</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: ${(carMeta.speed / 5) * 100}%;"></div></div>
                        <span>${carMeta.speed}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-name">Accel</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: ${(carMeta.accel / 5) * 100}%;"></div></div>
                        <span>${carMeta.accel}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-name">Toughness</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: ${(carMeta.tough / 5) * 100}%;"></div></div>
                        <span>${carMeta.tough}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-name">Handling</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: ${(carMeta.hand / 5) * 100}%;"></div></div>
                        <span>${carMeta.hand}</span>
                    </div>
                </div>

                <div class="vehicle-actions">
                    <button class="btn btn-sm ${isOwned ? 'btn-secondary' : 'btn-success'} w-100 btn-toggle-vehicle" data-id="${carMeta.id}">
                        ${isOwned ? '❌ Remove' : '➕ Add to Garage'}
                    </button>
                    ${isOwned ? `
                        <button class="btn btn-sm btn-accent btn-repair-vehicle" data-id="${carMeta.id}" title="Set Health to 100%">
                            🔧 100%
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Attach listeners
    container.querySelectorAll(".btn-toggle-vehicle").forEach(btn => {
        btn.addEventListener("click", () => {
            const carId = btn.getAttribute("data-id");
            let v = save.vehicles.find(item => item.id === carId);
            if (v) {
                v.isOwned = !v.isOwned;
                if (!v.isOwned) v.id = "n/a";
            } else {
                // Find first free slot
                const freeSlot = save.vehicles.find(item => !item.isOwned || item.id === "n/a");
                if (freeSlot) {
                    freeSlot.id = carId;
                    freeSlot.isOwned = true;
                    freeSlot.health = 1.0;
                    freeSlot.damage = -1.0;
                }
            }
            renderGarage();
            updateSidebarStats();
        });
    });

    container.querySelectorAll(".btn-repair-vehicle").forEach(btn => {
        btn.addEventListener("click", () => {
            const carId = btn.getAttribute("data-id");
            let v = save.vehicles.find(item => item.id === carId);
            if (v) {
                v.health = 1.0;
                v.damage = -1.0;
                showToast(`🔧 Repaired ${carId} to 100%!`);
            }
        });
    });
}

// Render Hex Viewer
function renderHexViewer(startOffset = 0) {
    const dumpEl = document.getElementById("hex-dump-content");
    if (!dumpEl || !save.bytes) return;

    const data = save.serialize();
    let text = `Offset(h)  -- -- -- -- -- -- -- --  -- -- -- -- -- -- -- --  Decoded Text\n`;
    text += `--------  -----------------------  -----------------------  ----------------\n`;

    const viewLength = Math.min(1024, data.length - startOffset);
    for (let i = startOffset; i < startOffset + viewLength; i += 16) {
        const offsetHex = i.toString(16).padStart(8, '0');
        let hexPart1 = "";
        let hexPart2 = "";
        let asciiPart = "";

        for (let j = 0; j < 16; j++) {
            const byteIdx = i + j;
            if (byteIdx < data.length) {
                const b = data[byteIdx];
                const bHex = b.toString(16).padStart(2, '0');
                if (j < 8) hexPart1 += bHex + " ";
                else hexPart2 += bHex + " ";
                asciiPart += (b >= 32 && b < 127) ? String.fromCharCode(b) : ".";
            } else {
                if (j < 8) hexPart1 += "   ";
                else hexPart2 += "   ";
            }
        }
        text += `${offsetHex}  ${hexPart1} ${hexPart2} |${asciiPart}|\n`;
    }

    dumpEl.textContent = text;

    // Hex buttons jump
    document.querySelectorAll(".hex-jump-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".hex-jump-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const off = parseInt(btn.getAttribute("data-offset")) || 0;
            renderHexViewer(off);
        });
    });
}

// Export Save Binary (05)
function exportSaveBinary() {
    try {
        const modifiedBytes = save.serialize();
        const blob = new Blob([modifiedBytes], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = save.filename || "05";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast("💾 Save binary (05) exported successfully!");
    } catch (e) {
        console.error(e);
        showToast("Export failed: " + e.message, true);
    }
}

// Export Full Xbox ZIP Package
async function exportXboxZip() {
    if (typeof JSZip === "undefined") {
        showToast("JSZip library not available, downloading single file.", true);
        exportSaveBinary();
        return;
    }

    try {
        const zip = new JSZip();
        const modifiedBytes = save.serialize();
        const metaBytes = save.generateSaveMeta();

        // Create Xbox save folder structure:
        // 56550015/85DEBA48DF78/05
        // 56550015/85DEBA48DF78/SaveMeta.xbx
        const saveFolder = zip.folder("56550015").folder("85DEBA48DF78");
        saveFolder.file("05", modifiedBytes);
        saveFolder.file("SaveMeta.xbx", metaBytes);

        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = `SHAR_Xbox_Save_L${save.currentLevel}M${save.currentMission}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast("📦 Full Xbox Save ZIP package exported successfully!");
    } catch (e) {
        console.error(e);
        showToast("ZIP export failed: " + e.message, true);
    }
}
