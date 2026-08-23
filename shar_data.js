// The Simpsons: Hit & Run - Comprehensive Game Data Definition
// Extracted from Radical Entertainment scripts (rewards.mfk, level.mfk, missions.mfk, cars.con)

const SHAR_DATA = {
    levels: [
        {
            id: 1,
            name: "Level 1: Evergreen Terrace / Suburbs",
            character: "Homer",
            timeOfDay: "Day",
            zone: "Residential / Nuclear Plant",
            totalGags: 15,
            totalWasps: 20,
            missions: [
                { id: "m0", name: "Tutorial: The Cola Caper", giver: "Marge", type: "tutorial" },
                { id: "m1", name: "Mission 1: S-M-R-T", giver: "Homer", type: "story" },
                { id: "m2", name: "Mission 2: Petty Theft", giver: "Barney", type: "story" },
                { id: "m3", name: "Mission 3: Office Spaced", giver: "Mr. Burns", type: "story" },
                { id: "m4", name: "Mission 4: Blind Big Brother", giver: "Lenny", type: "story" },
                { id: "m5", name: "Mission 5: Flowers By Irene", giver: "Carl", type: "story" },
                { id: "m6", name: "Mission 6: Bonfire of the Manatees", giver: "Apu", type: "story" },
                { id: "m7", name: "Mission 7: The Fat and the Furious", giver: "Lisa", type: "story" },
                { id: "sr1", name: "Street Race 1: Time Trial", giver: "Ralph", type: "race" },
                { id: "sr2", name: "Street Race 2: Circuit Race", giver: "Nelson", type: "race" },
                { id: "sr3", name: "Street Race 3: Checkpoint Race", giver: "Milhouse", type: "race" },
                { id: "bm1", name: "Bonus Mission: This Old Shanty", giver: "Cletus", type: "bonus", reward: "cletu_v (Pickup Truck)" },
                { id: "gr1", name: "Gamble Race: Evergreen Sprint", giver: "Louie", type: "gamble" }
            ],
            cards: [
                { num: 1, name: "Bar None Candy Bar", desc: "Chocolate bar with the taste of chocolate and nuts!" },
                { num: 2, name: "Soy Pop", desc: "It has the delicious flavor of soy beans!" },
                { num: 3, name: "Mr. Sparkle Box", desc: "I am disrespectful to dirt! Can you see that I am serious?" },
                { num: 4, name: "Pork Parchments", desc: "Made with authentic pork by-products." },
                { num: 5, name: "Bort License Plate", desc: "We need more Bort license plates in the gift shop." },
                { num: 6, name: "Donut Box", desc: "Mmm... forbidden donut." },
                { num: 7, name: "Tab Soda", desc: "No time for that now, the computer's starting!" }
            ],
            bonusCar: { id: "rocke_v", name: "Rocket Car" },
            skins: [
                { id: "homer", name: "Default Homer", cost: 0, type: "default" },
                { id: "h_undrwr", name: "Casual / Underwear Homer", cost: 100, type: "shop" },
                { id: "h_fat", name: "Muumuu / Fat Homer", cost: 125, type: "shop" },
                { id: "h_stcrobe", name: "Chosen One / Stonecutter Homer", cost: 150, type: "shop" }
            ],
            cars: [
                { id: "famil_v", name: "Family Sedan", type: "default", cost: 0 },
                { id: "cletu_v", name: "Pickup Truck", type: "bonus", cost: 0 },
                { id: "elect_v", name: "Electaurus", type: "race", cost: 0 },
                { id: "plowk_v", name: "Plow King", type: "shop", cost: 150, seller: "Barney" },
                { id: "cDuff", name: "Duff Truck", type: "shop", cost: 125, seller: "Gil" },
                { id: "cVan", name: "Surveillance Van", type: "shop", cost: 100, seller: "Gil" }
            ]
        },
        {
            id: 2,
            name: "Level 2: Downtown Springfield",
            character: "Bart",
            timeOfDay: "Day",
            zone: "Commercial / Downtown",
            totalGags: 11,
            totalWasps: 20,
            missions: [
                { id: "m0", name: "Tutorial / Staging", giver: "Bart", type: "tutorial" },
                { id: "m1", name: "Mission 1: Detention Deficit Disorder", giver: "Principal Skinner", type: "story" },
                { id: "m2", name: "Mission 2: Weapons of Mass Delinquency", giver: "Homer", type: "story" },
                { id: "m3", name: "Mission 3: Vox Populi", giver: "Comic Book Guy", type: "story" },
                { id: "m4", name: "Mission 4: Bart & Frink vs 3-D Monster", giver: "Professor Frink", type: "story" },
                { id: "m5", name: "Mission 5: Better Than Beef", giver: "Apu", type: "story" },
                { id: "m6", name: "Mission 6: Monkey See Monkey D'oh", giver: "Dr. Nick", type: "story" },
                { id: "m7", name: "Mission 7: Cell-Outs", giver: "Snake", type: "story" },
                { id: "sr1", name: "Street Race 1: Point to Point", giver: "Nelson", type: "race" },
                { id: "sr2", name: "Street Race 2: Circuit Race", giver: "Milhouse", type: "race" },
                { id: "sr3", name: "Street Race 3: Checkpoint Race", giver: "Ralph", type: "race" },
                { id: "bm1", name: "Bonus Mission: Dial B for Blood", giver: "Grampa", type: "bonus", reward: "gramp_v (WWII Jeep)" },
                { id: "gr1", name: "Gamble Race: Downtown Dash", giver: "Louie", type: "gamble" }
            ],
            cards: [
                { num: 1, name: "Radioactive Man #1", desc: "Up and at them! The first ever issue." },
                { num: 2, name: "Bonestorm", desc: "Buy me Bonestorm or go to hell!" },
                { num: 3, name: "Bart Simpson Card", desc: "Don't have a cow, man!" },
                { num: 4, name: "Itchy & Scratchy Cel", desc: "Original animation cel from The Itchy & Scratchy Show." },
                { num: 5, name: "Glow-in-the-Dark Homer", desc: "Radiating nuclear awesomeness." },
                { num: 6, name: "Disposal Bag", desc: "Official Springfield nuclear waste containment bag." },
                { num: 7, name: "Love Tester Machine", desc: "You are: CASANOVA!" }
            ],
            bonusCar: { id: "mono_v", name: "Monorail Car" },
            skins: [
                { id: "bart", name: "Default Bart", cost: 0, type: "default" },
                { id: "b_tall", name: "Tall Bart", cost: 150, type: "shop" },
                { id: "b_football", name: "Football Bart", cost: 200, type: "shop" },
                { id: "b_ninja", name: "Ninja Bart", cost: 250, type: "shop" }
            ],
            cars: [
                { id: "honor_v", name: "Honor Roller", type: "default", cost: 0 },
                { id: "gramp_v", name: "WWII Jeep", type: "bonus", cost: 0 },
                { id: "moe_v", name: "Sedan (Moe's)", type: "race", cost: 0 },
                { id: "mrplo_v", name: "Mr. Plow", type: "shop", cost: 200, seller: "Homer" },
                { id: "cLimo", name: "Limousine", type: "shop", cost: 150, seller: "Gil" },
                { id: "cFire_v", name: "Fire Truck", type: "shop", cost: 250, seller: "Gil" }
            ]
        },
        {
            id: 3,
            name: "Level 3: Springfield Squidport & Harbour",
            character: "Lisa",
            timeOfDay: "Day",
            zone: "Squidport / Pier / Dam",
            totalGags: 11,
            totalWasps: 20,
            missions: [
                { id: "m0", name: "Tutorial / Staging", giver: "Lisa", type: "tutorial" },
                { id: "m1", name: "Mission 1: Nerd Race Queen", giver: "Comic Book Guy", type: "story" },
                { id: "m2", name: "Mission 2: Clueless", giver: "Milhouse", type: "story" },
                { id: "m3", name: "Mission 3: Bonfire of the Manatees", giver: "Apu", type: "story" },
                { id: "m4", name: "Mission 4: Operation Hellfish", giver: "Grampa", type: "story" },
                { id: "m5", name: "Mission 5: Slithery Sleuthing", giver: "Snake", type: "story" },
                { id: "m6", name: "Mission 6: Fishy Deals", giver: "Captain McCallister", type: "story" },
                { id: "m7", name: "Mission 7: The Old Pirate and the Sea", giver: "Captain", type: "story" },
                { id: "sr1", name: "Street Race 1: Time Trial", giver: "Milhouse", type: "race" },
                { id: "sr2", name: "Street Race 2: Circuit Race", giver: "Nelson", type: "race" },
                { id: "sr3", name: "Street Race 3: Checkpoint Race", giver: "Ralph", type: "race" },
                { id: "bm1", name: "Bonus Mission: Principal of the Thing", giver: "Skinner", type: "bonus", reward: "skinn_v (Sedan)" },
                { id: "gr1", name: "Gamble Race: Pier Pressure", giver: "Louie", type: "gamble" }
            ],
            cards: [
                { num: 1, name: "Eye On Springfield", desc: "Springfield's finest tabloid news program." },
                { num: 2, name: "Lisa's Saxophone", desc: "For Lisa - Never Forget Your Saxophone - Love, Dad." },
                { num: 3, name: "Bleeding Gums Murphy Album", desc: "Sax on the Beach album record." },
                { num: 4, name: "Angel Skeleton", desc: "The Angel Skeleton hoax from the dig site." },
                { num: 5, name: "Evil Krusty Doll", desc: "Set to: EVIL." },
                { num: 6, name: "Soy Milk", desc: "For calcium-rich non-dairy refreshment." },
                { num: 7, name: "Freezer Geezer", desc: "Frostillicus frozen in the Kwik-E-Mart freezer!" }
            ],
            bonusCar: { id: "bookb_v", name: "Book Burning Van" },
            skins: [
                { id: "lisa", name: "Default Lisa", cost: 0, type: "default" },
                { id: "l_cool", name: "Cool Lisa", cost: 250, type: "shop" },
                { id: "l_florida", name: "Floreda Lisa", cost: 250, type: "shop" },
                { id: "l_jersey", name: "Hockey Lisa", cost: 300, type: "shop" }
            ],
            cars: [
                { id: "lisa_v", name: "Malibu Stacy Car", type: "default", cost: 0 },
                { id: "skinn_v", name: "Sedan (Skinner's)", type: "bonus", cost: 0 },
                { id: "bookb_v", name: "Book Burning Van", type: "race", cost: 0 },
                { id: "otto_v", name: "School Bus", type: "shop", cost: 300, seller: "Otto" },
                { id: "cDonut", name: "Donut Truck", type: "shop", cost: 250, seller: "Gil" },
                { id: "cNerd", name: "Nerd Car", type: "shop", cost: 250, seller: "Gil" }
            ]
        },
        {
            id: 4,
            name: "Level 4: Evergreen Terrace (Night)",
            character: "Marge",
            timeOfDay: "Night",
            zone: "Residential / Suburbs Night",
            totalGags: 15,
            totalWasps: 20,
            missions: [
                { id: "m0", name: "Tutorial / Staging", giver: "Marge", type: "tutorial" },
                { id: "m1", name: "Mission 1: For a Few Donuts More", giver: "Chief Wiggum", type: "story" },
                { id: "m2", name: "Mission 2: Redneck Roundup", giver: "Cletus", type: "story" },
                { id: "m3", name: "Mission 3: Ketchup Logic", giver: "Comic Book Guy", type: "story" },
                { id: "m4", name: "Mission 4: Return of the Nearly-Dead", giver: "Grampa", type: "story" },
                { id: "m5", name: "Mission 5: Wolves Stole My Apu", giver: "Chief Wiggum", type: "story" },
                { id: "m6", name: "Mission 6: The Cooler", giver: "Snake", type: "story" },
                { id: "m7", name: "Mission 7: Beached Love", giver: "Bart", type: "story" },
                { id: "sr1", name: "Street Race 1: Time Trial", giver: "Ralph", type: "race" },
                { id: "sr2", name: "Street Race 2: Circuit Race", giver: "Nelson", type: "race" },
                { id: "sr3", name: "Street Race 3: Checkpoint Race", giver: "Milhouse", type: "race" },
                { id: "bm1", name: "Bonus Mission: Ketchup Kayak", giver: "Comic Book Guy", type: "bonus", reward: "comic_v ('70s Sports Car)" },
                { id: "gr1", name: "Gamble Race: Suburbia Speedway", giver: "Louie", type: "gamble" }
            ],
            cards: [
                { num: 1, name: "Boudoir Photo", desc: "Marge's glamour photo for Homer." },
                { num: 2, name: "Pepper Spray", desc: "One squirt and you're blind as a bat!" },
                { num: 3, name: "Krusty-O's", desc: "Flesh-eating bacteria in every box!" },
                { num: 4, name: "Canyonero", desc: "Top of the line in utility sports!" },
                { num: 5, name: "Power Plant Uniform", desc: "Standard issue hazmat suit." },
                { num: 6, name: "Love Letters to Homer", desc: "Dearest Homer, I love you..." },
                { num: 7, name: "Blansky's Beauties", desc: "Retro glamour collectible." }
            ],
            bonusCar: { id: "krust_v", name: "Clown Car" },
            skins: [
                { id: "marge", name: "Default Marge", cost: 0, type: "default" },
                { id: "m_prison", name: "Inmate / Prison Marge", cost: 300, type: "shop" },
                { id: "m_pink", name: "Classy / Pink Chanel Marge", cost: 350, type: "shop" },
                { id: "m_police", name: "Police Marge", cost: 400, type: "shop" }
            ],
            cars: [
                { id: "marge_v", name: "Canyonero", type: "default", cost: 0 },
                { id: "comic_v", name: "'70s Sports Car (Comic Guy)", type: "bonus", cost: 0 },
                { id: "krust_v", name: "Clown Car", type: "race", cost: 0 },
                { id: "willi_v", name: "Tractor", type: "shop", cost: 400, seller: "Willie" },
                { id: "cKlimo", name: "Krusty's Limo", type: "shop", cost: 350, seller: "Gil" },
                { id: "cCurator", name: "Curator's Car", type: "shop", cost: 300, seller: "Gil" }
            ]
        },
        {
            id: 5,
            name: "Level 5: Downtown Springfield (Night)",
            character: "Apu",
            timeOfDay: "Night",
            zone: "Downtown Night",
            totalGags: 6,
            totalWasps: 20,
            missions: [
                { id: "m0", name: "Tutorial / Staging", giver: "Apu", type: "tutorial" },
                { id: "m1", name: "Mission 1: Incriminating Caffeine", giver: "Chief Wiggum", type: "story" },
                { id: "m2", name: "Mission 2: ...And Token Wondering", giver: "Homer", type: "story" },
                { id: "m3", name: "Mission 3: Roots of Evil", giver: "Dr. Hibbert", type: "story" },
                { id: "m4", name: "Mission 4: A Few Good Scams", giver: "Snake", type: "story" },
                { id: "m5", name: "Mission 5: Kwik-E-Marty", giver: "Bart", type: "story" },
                { id: "m6", name: "Mission 6: The Fat and Furious II", giver: "Lisa", type: "story" },
                { id: "m7", name: "Mission 7: Eight is Too Much", giver: "Manjula", type: "story" },
                { id: "sr1", name: "Street Race 1: Point to Point", giver: "Nelson", type: "race" },
                { id: "sr2", name: "Street Race 2: Circuit Race", giver: "Milhouse", type: "race" },
                { id: "sr3", name: "Street Race 3: Checkpoint Race", giver: "Ralph", type: "race" },
                { id: "bm1", name: "Bonus Mission: Curse of Were-Car", giver: "Professor Frink", type: "bonus", reward: "frink_v (Hover Car)" },
                { id: "gr1", name: "Gamble Race: City Night Rally", giver: "Louie", type: "gamble" }
            ],
            cards: [
                { num: 1, name: "Sanjay's Smuggled Cigarettes", desc: "Duty-free contraband from abroad." },
                { num: 2, name: "Hot Dog Roller", desc: "Has this been turning since 1993?" },
                { num: 3, name: "Squishee", desc: "An all-syrup Super-Squishee." },
                { num: 4, name: "Apu's T-Shirt", desc: "I survived the Kwik-E-Mart robbery." },
                { num: 5, name: "Chutney", desc: "Authentic spicy Indian chutney." },
                { num: 6, name: "Kwik-E-Mart Apron", desc: "Thank you, come again!" },
                { num: 7, name: "Ganesha Statue", desc: "Deity of wisdom and remover of obstacles." }
            ],
            bonusCar: { id: "bbman_v", name: "El Carro Loco" },
            skins: [
                { id: "apu", name: "Default Apu", cost: 0, type: "default" },
                { id: "a_army", name: "American / Army Apu", cost: 375, type: "shop" },
                { id: "a_american", name: "Bespoke / USA Flag Apu", cost: 425, type: "shop" },
                { id: "a_besharp", name: "Be Sharps / Donut Apu", cost: 475, type: "shop" }
            ],
            cars: [
                { id: "apu_v", name: "Longhorn", type: "default", cost: 0 },
                { id: "frink_v", name: "Hover Car", type: "bonus", cost: 0 },
                { id: "bbman_v", name: "El Carro Loco", type: "race", cost: 0 },
                { id: "carhom_v", name: "The Car Built For Homer", type: "shop", cost: 500, seller: "Homer" },
                { id: "wiggu_v", name: "Police Car", type: "shop", cost: 425, seller: "Gil" },
                { id: "cCola", name: "Cola Truck", type: "shop", cost: 350, seller: "Gil" }
            ]
        },
        {
            id: 6,
            name: "Level 6: Springfield Squidport (Night)",
            character: "Bart",
            timeOfDay: "Night",
            zone: "Squidport / Observatory Night",
            totalGags: 11,
            totalWasps: 20,
            missions: [
                { id: "m0", name: "Tutorial / Staging", giver: "Bart", type: "tutorial" },
                { id: "m1", name: "Mission 1: Going to the Luau", giver: "Otto", type: "story" },
                { id: "m2", name: "Mission 2: Give Me Liberty or Coin", giver: "Snake", type: "story" },
                { id: "m3", name: "Mission 3: Set To Stun", giver: "Professor Frink", type: "story" },
                { id: "m4", name: "Mission 4: Kang & Kodos Strike Back", giver: "Homer", type: "story" },
                { id: "m5", name: "Mission 5: Milhouse The Fugitive", giver: "Milhouse", type: "story" },
                { id: "m6", name: "Mission 6: T&A", giver: "Chief Wiggum", type: "story" },
                { id: "m7", name: "Mission 7: Alien 'Auto'topsy Part 1", giver: "Lisa", type: "story" },
                { id: "sr1", name: "Street Race 1: Time Trial", giver: "Milhouse", type: "race" },
                { id: "sr2", name: "Street Race 2: Circuit Race", giver: "Nelson", type: "race" },
                { id: "sr3", name: "Street Race 3: Checkpoint Race", giver: "Ralph", type: "race" },
                { id: "bm1", name: "Bonus Mission: Snake's Big Score", giver: "Snake", type: "bonus", reward: "snake_v (Bandit)" },
                { id: "gr1", name: "Gamble Race: Harbour Burnout", giver: "Louie", type: "gamble" }
            ],
            cards: [
                { num: 1, name: "Krusty Burger", desc: "Official greasy fast-food hamburger." },
                { num: 2, name: "Kamp Krusty Flag", desc: "Welcome to Kamp Krusty!" },
                { num: 3, name: "Itchy & Scratchy Money", desc: "It's like regular money, but with no value." },
                { num: 4, name: "Mr. Sparkle Soap", desc: "Awesome power for dishwashing!" },
                { num: 5, name: "Scorpio Flamethrower", desc: "Hank Scorpio's supervillain weapon." },
                { num: 6, name: "Linus Caldwell", desc: "Heists and casino capers." },
                { num: 7, name: "Krusty Doll", desc: "Hi, I'm Talking Krusty!" }
            ],
            bonusCar: { id: "burns_v", name: "Armored Truck / Limo" },
            skins: [
                { id: "bart", name: "Default Bart", cost: 0, type: "default" },
                { id: "b_hugo", name: "Hugo Simpson", cost: 400, type: "shop" },
                { id: "b_military", name: "Cadet / Military Bart", cost: 500, type: "shop" },
                { id: "b_man", name: "Dirty / Tuxedo Bart", cost: 600, type: "shop" }
            ],
            cars: [
                { id: "bart_v", name: "Ferrini - Red", type: "default", cost: 0 },
                { id: "snake_v", name: "Bandit", type: "bonus", cost: 0 },
                { id: "burns_v", name: "Armored Truck / Limo", type: "race", cost: 0 },
                { id: "scorp_v", name: "Globex Super Villain Car", type: "shop", cost: 600, seller: "Kearney" },
                { id: "cArmor", name: "Armored Truck", type: "shop", cost: 400, seller: "Gil" },
                { id: "cSedan", name: "Chase Sedan", type: "shop", cost: 500, seller: "Gil" }
            ]
        },
        {
            id: 7,
            name: "Level 7: Evergreen Terrace (Halloween / Spooky)",
            character: "Homer",
            timeOfDay: "Halloween Night",
            zone: "Spooky Suburbs / Alien Invasion",
            totalGags: 15,
            totalWasps: 20,
            missions: [
                { id: "m0", name: "Tutorial / Staging", giver: "Homer", type: "tutorial" },
                { id: "m1", name: "Mission 1: Rigellian Pizza", giver: "Lisa", type: "story" },
                { id: "m2", name: "Mission 2: A Few Good Mutants", giver: "Professor Frink", type: "story" },
                { id: "m3", name: "Mission 3: Pocket Protector", giver: "Bart", type: "story" },
                { id: "m4", name: "Mission 4: There's Something About Monty", giver: "Mr. Burns", type: "story" },
                { id: "m5", name: "Mission 5: Alien 'Auto'topsy Part 2", giver: "Snake", type: "story" },
                { id: "m6", name: "Mission 6: It's a Mad, Mad Marge", giver: "Marge", type: "story" },
                { id: "m7", name: "Mission 7: Alien 'Auto'topsy Part 3", giver: "Grampa", type: "story" },
                { id: "sr1", name: "Street Race 1: Time Trial", giver: "Ralph", type: "race" },
                { id: "sr2", name: "Street Race 2: Circuit Race", giver: "Nelson", type: "race" },
                { id: "sr3", name: "Street Race 3: Checkpoint Race", giver: "Milhouse", type: "race" },
                { id: "bm1", name: "Bonus Mission: Flaming Moes", giver: "Smithers", type: "bonus", reward: "smith_v (Hearse)" },
                { id: "gr1", name: "Gamble Race: Spooky Speedway", giver: "Louie", type: "gamble" }
            ],
            cards: [
                { num: 1, name: "Hell Toupee", desc: "The hair of Snake Jailbird." },
                { num: 2, name: "Devil Flanders", desc: "It's always the one you least suspect!" },
                { num: 3, name: "Soul Donut", desc: "Mmm... forbidden soul donut." },
                { num: 4, name: "Ghost of Maude", desc: "Haunting the Flanders residence." },
                { num: 5, name: "Evil Clown Bed", desc: "Can't sleep, clown will eat me." },
                { num: 6, name: "Voodoo Doll", desc: "Stuck with pins and curses." },
                { num: 7, name: "Zombie Head", desc: "Springfield graveyard resurrection." }
            ],
            bonusCar: { id: "fone_v", name: "Open Wheel 500 / Phone Car" },
            skins: [
                { id: "homer", name: "Default Homer", cost: 0, type: "default" },
                { id: "h_scuzzy", name: "Dirty / Scuzzy Homer", cost: 400, type: "shop" },
                { id: "h_evil", name: "Don Homer / Mafia Homer", cost: 450, type: "shop" },
                { id: "h_donut", name: "Evil Homer / Donut Head", cost: 500, type: "shop" }
            ],
            cars: [
                { id: "homer_v", name: "70s Sports Car (Homer)", type: "default", cost: 0 },
                { id: "smith_v", name: "Hearse (Smithers)", type: "bonus", cost: 0 },
                { id: "fone_v", name: "Open Wheel 500", type: "race", cost: 0 },
                { id: "zombi_v", name: "Zombie Car", type: "shop", cost: 500, seller: "Zombie" },
                { id: "hbike_v", name: "Hover Bike", type: "shop", cost: 1000, seller: "Gil" },
                { id: "cHears", name: "Ghost Hearse", type: "shop", cost: 750, seller: "Gil" }
            ]
        }
    ],

    // All 60 unlockable & drivable vehicles catalog
    allVehicles: [
        { id: "famil_v", name: "Family Sedan", level: 1, type: "Default Car", speed: 1.0, accel: 1.5, tough: 2.5, hand: 4.0 },
        { id: "cletu_v", name: "Pickup Truck", level: 1, type: "Bonus Mission", speed: 1.0, accel: 1.0, tough: 3.5, hand: 2.5 },
        { id: "elect_v", name: "Electaurus", level: 1, type: "Street Race", speed: 2.0, accel: 1.5, tough: 1.5, hand: 4.0 },
        { id: "plowk_v", name: "Plow King", level: 1, type: "Shop (Barney)", speed: 1.5, accel: 0.5, tough: 5.0, hand: 1.5 },
        { id: "cDuff", name: "Duff Truck", level: 1, type: "Shop (Gil)", speed: 0.5, accel: 0.5, tough: 4.0, hand: 1.0 },
        { id: "cVan", name: "Surveillance Van", level: 1, type: "Shop (Gil)", speed: 1.5, accel: 1.5, tough: 3.5, hand: 3.0 },
        { id: "rocke_v", name: "Rocket Car", level: 1, type: "Card Collector", speed: 5.0, accel: 5.0, tough: 1.0, hand: 4.5 },
        { id: "redbrick", name: "Red Brick Car", level: 1, type: "Secret Easter Egg", speed: 4.0, accel: 3.5, tough: 5.0, hand: 3.0 },

        { id: "honor_v", name: "Honor Roller", level: 2, type: "Default Car", speed: 1.5, accel: 2.0, tough: 1.5, hand: 5.0 },
        { id: "gramp_v", name: "WWII Jeep", level: 2, type: "Bonus Mission", speed: 1.5, accel: 1.5, tough: 3.5, hand: 3.0 },
        { id: "moe_v", name: "Sedan (Moe's)", level: 2, type: "Street Race", speed: 2.0, accel: 1.5, tough: 2.5, hand: 3.5 },
        { id: "mrplo_v", name: "Mr. Plow", level: 2, type: "Shop (Homer)", speed: 2.0, accel: 1.5, tough: 3.5, hand: 3.0 },
        { id: "cLimo", name: "Limousine", level: 2, type: "Shop (Gil)", speed: 1.5, accel: 1.5, tough: 3.5, hand: 2.5 },
        { id: "cFire_v", name: "Fire Truck", level: 2, type: "Shop (Gil)", speed: 3.0, accel: 0.5, tough: 5.0, hand: 1.0 },
        { id: "mono_v", name: "Monorail Car", level: 2, type: "Card Collector", speed: 4.5, accel: 4.0, tough: 2.5, hand: 4.0 },

        { id: "lisa_v", name: "Malibu Stacy Car", level: 3, type: "Default Car", speed: 2.5, accel: 3.0, tough: 1.5, hand: 4.5 },
        { id: "skinn_v", name: "Sedan (Skinner's)", level: 3, type: "Bonus Mission", speed: 2.0, accel: 2.0, tough: 2.5, hand: 3.0 },
        { id: "bookb_v", name: "Book Burning Van", level: 3, type: "Street Race", speed: 2.0, accel: 1.5, tough: 3.5, hand: 2.5 },
        { id: "otto_v", name: "School Bus", level: 3, type: "Shop (Otto)", speed: 2.0, accel: 1.0, tough: 5.0, hand: 2.0 },
        { id: "cDonut", name: "Donut Truck", level: 3, type: "Shop (Gil)", speed: 0.5, accel: 1.5, tough: 3.0, hand: 3.0 },
        { id: "cNerd", name: "Nerd Car", level: 3, type: "Shop (Gil)", speed: 1.5, accel: 2.5, tough: 2.5, hand: 4.0 },
        { id: "knigh_v", name: "Knight Boat", level: 3, type: "Card Collector", speed: 3.5, accel: 3.0, tough: 3.0, hand: 3.5 },

        { id: "marge_v", name: "Canyonero", level: 4, type: "Default Car", speed: 2.5, accel: 1.5, tough: 4.0, hand: 3.0 },
        { id: "comic_v", name: "'70s Sports Car (Comic Guy)", level: 4, type: "Bonus Mission", speed: 2.5, accel: 2.0, tough: 3.0, hand: 4.0 },
        { id: "krust_v", name: "Clown Car", level: 4, type: "Street Race", speed: 3.0, accel: 3.0, tough: 1.5, hand: 5.0 },
        { id: "willi_v", name: "Tractor", level: 4, type: "Shop (Willie)", speed: 3.0, accel: 2.5, tough: 3.5, hand: 3.5 },
        { id: "cKlimo", name: "Krusty's Limo", level: 4, type: "Shop (Gil)", speed: 2.5, accel: 2.0, tough: 4.0, hand: 2.5 },
        { id: "cCurator", name: "Curator's Car", level: 4, type: "Shop (Gil)", speed: 2.5, accel: 3.0, tough: 2.5, hand: 4.5 },
        { id: "hype_v", name: "Hover Car (Card)", level: 4, type: "Card Collector", speed: 4.0, accel: 4.0, tough: 2.0, hand: 4.5 },

        { id: "apu_v", name: "Longhorn", level: 5, type: "Default Car", speed: 3.5, accel: 3.5, tough: 2.5, hand: 3.5 },
        { id: "frink_v", name: "Hover Car", level: 5, type: "Bonus Mission", speed: 4.0, accel: 4.0, tough: 1.0, hand: 3.0 },
        { id: "bbman_v", name: "El Carro Loco", level: 5, type: "Street Race", speed: 4.0, accel: 3.0, tough: 2.5, hand: 3.5 },
        { id: "carhom_v", name: "The Car Built For Homer", level: 5, type: "Shop (Homer)", speed: 4.5, accel: 3.5, tough: 3.5, hand: 3.0 },
        { id: "wiggu_v", name: "Police Car", level: 5, type: "Shop (Gil)", speed: 4.0, accel: 3.5, tough: 3.0, hand: 4.0 },
        { id: "cCola", name: "Cola Truck", level: 5, type: "Shop (Gil)", speed: 3.0, accel: 1.0, tough: 5.0, hand: 1.0 },
        { id: "dune_v", name: "Monster Truck / Dune Buggy", level: 5, type: "Card Collector", speed: 4.5, accel: 3.5, tough: 4.0, hand: 3.5 },

        { id: "bart_v", name: "Ferrini - Red", level: 6, type: "Default Car", speed: 4.0, accel: 4.0, tough: 1.5, hand: 5.0 },
        { id: "snake_v", name: "Bandit", level: 6, type: "Bonus Mission", speed: 4.5, accel: 4.0, tough: 2.5, hand: 4.5 },
        { id: "burns_v", name: "Armored Truck / Limo", level: 6, type: "Street Race", speed: 4.0, accel: 2.5, tough: 3.5, hand: 4.0 },
        { id: "scorp_v", name: "Globex Super Villain Car", level: 6, type: "Shop (Kearney)", speed: 4.5, accel: 4.5, tough: 1.5, hand: 4.0 },
        { id: "cArmor", name: "Armored Truck", level: 6, type: "Shop (Gil)", speed: 1.5, accel: 1.5, tough: 5.0, hand: 1.5 },
        { id: "cSedan", name: "Chase Sedan", level: 6, type: "Shop (Gil)", speed: 4.0, accel: 4.5, tough: 3.0, hand: 4.5 },
        { id: "fone_v", name: "Open Wheel 500", level: 6, type: "Card Collector", speed: 5.0, accel: 5.0, tough: 0.5, hand: 5.0 },

        { id: "homer_v", name: "70s Sports Car (Homer)", level: 7, type: "Default Car", speed: 4.5, accel: 4.5, tough: 2.0, hand: 4.0 },
        { id: "smith_v", name: "Hearse (Smithers)", level: 7, type: "Bonus Mission", speed: 4.5, accel: 3.0, tough: 4.5, hand: 3.5 },
        { id: "zombi_v", name: "Zombie Car", level: 7, type: "Shop (Zombie)", speed: 4.5, accel: 5.0, tough: 1.5, hand: 4.5 },
        { id: "hbike_v", name: "Hover Bike", level: 7, type: "Shop (Gil)", speed: 5.0, accel: 4.5, tough: 1.0, hand: 3.5 },
        { id: "cHears", name: "Ghost Hearse", level: 7, type: "Shop (Gil)", speed: 4.5, accel: 4.5, tough: 3.5, hand: 4.0 },
        { id: "oblit_v", name: "Obliterator / RC Car", level: 7, type: "Card Collector", speed: 4.5, accel: 5.0, tough: 2.0, hand: 4.5 },

        // Secret / Bonus Cheat Cars
        { id: "gramR_v", name: "Grampa's Rocket", level: 0, type: "Cheat / Bonus", speed: 5.0, accel: 5.0, tough: 3.5, hand: 3.0 },
        { id: "coffin", name: "Coffin Car", level: 0, type: "Cheat / Bonus", speed: 4.5, accel: 4.0, tough: 2.5, hand: 3.5 },
        { id: "hallo", name: "Halloween Hearse", level: 0, type: "Cheat / Bonus", speed: 4.5, accel: 4.5, tough: 3.0, hand: 4.0 },
        { id: "witchcar", name: "Witch Broom", level: 0, type: "Cheat / Bonus", speed: 4.5, accel: 4.5, tough: 1.5, hand: 4.5 },
        { id: "cBlbart", name: "Black Ferrini", level: 0, type: "Cheat / Bonus", speed: 4.5, accel: 4.5, tough: 2.0, hand: 5.0 },
        { id: "cBone", name: "Bone Car", level: 0, type: "Cheat / Bonus", speed: 4.0, accel: 4.0, tough: 3.0, hand: 4.0 },
        { id: "cCube", name: "Cube Car", level: 0, type: "Cheat / Bonus", speed: 4.0, accel: 4.0, tough: 4.0, hand: 3.5 },
        { id: "taxiA", name: "Springfield Taxi", level: 0, type: "Traffic / Hidden", speed: 3.0, accel: 2.5, tough: 3.0, hand: 3.5 },
        { id: "garbage", name: "Garbage Truck", level: 0, type: "Traffic / Hidden", speed: 2.0, accel: 1.0, tough: 5.0, hand: 1.5 },
        { id: "icecream", name: "Ice Cream Truck", level: 0, type: "Traffic / Hidden", speed: 2.0, accel: 1.5, tough: 3.5, hand: 2.5 },
        { id: "pizza", name: "Pizza Van", level: 0, type: "Traffic / Hidden", speed: 2.5, accel: 2.5, tough: 3.0, hand: 3.5 }
    ]
};
