// ============================================================
// CANAVARLAR
//
// isabet        : canavarın sana vurma gücü (kaçınmanla karşılaştırılır)
// kacinma       : senin ıskalama ihtimalini artırır
// saldiriHiziMs : kaç milisaniyede bir vurduğu
// tipId         : savaş üçgeni (agile / armored / beast)
//
// DENGE: Her bölgede üç dengeli canavar ve bir 'boss' var.
// Boss'un dayanma oranı ~2.2x — yemek olmadan girilmez.
// ============================================================

export let monsters = [
  // ================= KÖY ÇEVRESİ =================
  {
    id: "rat",
    isim: "Fare",
    ikon: "🐀",
    bolgeId: "village",
    tipId: "agile",
    maxHp: 12,
    saldiri: 2,
    isabet: 5,
    kacinma: 5,
    saldiriHiziMs: 1800,
    xpOdulu: 8,
    altinOdulu: 3,
    lootTablosu: [
      { itemId: "bones", sans: 1, minMiktar: 1, maxMiktar: 2 },
      { itemId: "feather", sans: 0.5 },
      { itemId: "rat_tail", sans: 0.25 }
    ]
  },
  {
    id: "goblin",
    isim: "Goblin",
    ikon: "👹",
    bolgeId: "village",
    tipId: "armored",
    maxHp: 26,
    saldiri: 4,
    isabet: 9,
    kacinma: 10,
    saldiriHiziMs: 2600,
    xpOdulu: 18,
    altinOdulu: 9,
    lootTablosu: [
      { itemId: "bones", sans: 1, minMiktar: 1, maxMiktar: 3 },
      { itemId: "feather", sans: 0.7, minMiktar: 2, maxMiktar: 5 },
      { itemId: "ore_copper", sans: 0.4 },
      { itemId: "goblin_mail", sans: 0.08 }
    ]
  },

  // ================= KARANLIK ORMAN =================
  {
    id: "wolf",
    isim: "Kurt",
    ikon: "🐺",
    bolgeId: "forest",
    tipId: "beast",
    maxHp: 70,
    saldiri: 8,
    isabet: 20,
    kacinma: 22,
    saldiriHiziMs: 1800,
    xpOdulu: 30,
    altinOdulu: 14,
    lootTablosu: [
      { itemId: "bones", sans: 1, minMiktar: 2, maxMiktar: 4 },
      { itemId: "wolf_pelt", sans: 0.35 }
    ]
  },
  {
    id: "bandit",
    isim: "Haydut",
    ikon: "🥷",
    bolgeId: "forest",
    tipId: "agile",
    maxHp: 105,
    saldiri: 12,
    isabet: 26,
    kacinma: 30,
    saldiriHiziMs: 2800,
    xpOdulu: 48,
    altinOdulu: 30,
    lootTablosu: [
      { itemId: "bones", sans: 1, minMiktar: 1, maxMiktar: 2 },
      { itemId: "coal", sans: 0.5, minMiktar: 1, maxMiktar: 3 },
      { itemId: "ore_copper", sans: 0.6, minMiktar: 2, maxMiktar: 5 },
      { itemId: "bandit_hood", sans: 0.06 }
    ]
  },

  // ================= TERK EDİLMİŞ MADEN =================
  {
    id: "cave_spider",
    isim: "Mağara Örümceği",
    ikon: "🕷️",
    bolgeId: "mine",
    tipId: "agile",
    maxHp: 190,
    saldiri: 17,
    isabet: 42,
    kacinma: 62,
    saldiriHiziMs: 1600,
    xpOdulu: 70,
    altinOdulu: 22,
    lootTablosu: [
      { itemId: "bones", sans: 1, minMiktar: 2, maxMiktar: 4 },
      { itemId: "spider_silk", sans: 0.45, minMiktar: 1, maxMiktar: 3 },
      { itemId: "spider_cape", sans: 0.05 }
    ]
  },
  {
    id: "rock_golem",
    isim: "Kaya Golemi",
    ikon: "🗿",
    bolgeId: "mine",
    tipId: "armored",
    maxHp: 330,
    saldiri: 28,
    isabet: 46,
    kacinma: 30,
    saldiriHiziMs: 3400,
    xpOdulu: 105,
    altinOdulu: 38,
    lootTablosu: [
      { itemId: "ore_iron", sans: 0.8, minMiktar: 2, maxMiktar: 6 },
      { itemId: "coal", sans: 0.6, minMiktar: 2, maxMiktar: 5 },
      { itemId: "golem_core", sans: 0.07 }
    ]
  },
  {
    id: "mine_troll",
    isim: "Maden Trolü",
    ikon: "👺",
    bolgeId: "mine",
    tipId: "beast",
    maxHp: 260,
    saldiri: 22,
    isabet: 52,
    kacinma: 48,
    saldiriHiziMs: 2600,
    xpOdulu: 95,
    altinOdulu: 34,
    lootTablosu: [
      { itemId: "bones", sans: 1, minMiktar: 3, maxMiktar: 6 },
      { itemId: "ore_tin", sans: 0.5, minMiktar: 2, maxMiktar: 5 },
      { itemId: "troll_hide", sans: 0.3, minMiktar: 1, maxMiktar: 2 },
      { itemId: "troll_legs", sans: 0.06 }
    ]
  },
  {
    id: "shadow_miner",
    isim: "Gölge Madenci",
    ikon: "⛏️",
    bolgeId: "mine",
    tipId: "agile",
    maxHp: 300,
    saldiri: 25,
    isabet: 64,
    kacinma: 76,
    saldiriHiziMs: 2200,
    xpOdulu: 130,
    altinOdulu: 55,
    lootTablosu: [
      { itemId: "ore_iron", sans: 0.7, minMiktar: 3, maxMiktar: 8 },
      { itemId: "coal", sans: 0.7, minMiktar: 3, maxMiktar: 7 },
      { itemId: "shadow_essence", sans: 0.25 },
      { itemId: "shadow_ring", sans: 0.04 }
    ]
  },

  // ================= KAYIP TAPINAK =================
  {
    id: "stone_guardian",
    isim: "Taş Muhafız",
    ikon: "🗿",
    bolgeId: "temple",
    tipId: "armored",
    maxHp: 300,
    saldiri: 39,
    isabet: 95,
    kacinma: 98,
    saldiriHiziMs: 3400,
    xpOdulu: 260,
    altinOdulu: 95,
    lootTablosu: [
      { itemId: "ore_silver", sans: 0.6, minMiktar: 2, maxMiktar: 5 },
      { itemId: "hot_coal", sans: 0.4, minMiktar: 1, maxMiktar: 3 },
      { itemId: "temple_shard", sans: 0.3, minMiktar: 1, maxMiktar: 2 },
      { itemId: "guardian_plate", sans: 0.05 }
    ]
  },
  {
    id: "snake_priest",
    isim: "Yılan Rahip",
    ikon: "🐍",
    bolgeId: "temple",
    tipId: "agile",
    maxHp: 240,
    saldiri: 27,
    isabet: 95,
    kacinma: 98,
    saldiriHiziMs: 2000,
    xpOdulu: 220,
    altinOdulu: 80,
    lootTablosu: [
      { itemId: "bones", sans: 1, minMiktar: 4, maxMiktar: 8 },
      { itemId: "temple_shard", sans: 0.35, minMiktar: 1, maxMiktar: 3 },
      { itemId: "serpent_amulet", sans: 0.06 }
    ]
  },
  {
    id: "cursed_monk",
    isim: "Lanetli Keşiş",
    ikon: "🧟",
    bolgeId: "temple",
    tipId: "beast",
    maxHp: 280,
    saldiri: 35,
    isabet: 95,
    kacinma: 98,
    saldiriHiziMs: 2600,
    xpOdulu: 240,
    altinOdulu: 88,
    lootTablosu: [
      { itemId: "bones", sans: 1, minMiktar: 3, maxMiktar: 6 },
      { itemId: "ore_gold", sans: 0.45, minMiktar: 1, maxMiktar: 4 },
      { itemId: "temple_shard", sans: 0.3, minMiktar: 1, maxMiktar: 2 }
    ]
  },
  {
    id: "temple_warden",
    isim: "Tapınak Bekçisi",
    ikon: "🛡️",
    bolgeId: "temple",
    tipId: "armored",
    maxHp: 390,
    saldiri: 44,
    isabet: 95,
    kacinma: 98,
    saldiriHiziMs: 3000,
    xpOdulu: 340,
    altinOdulu: 150,
    lootTablosu: [
      { itemId: "ore_mithril", sans: 0.5, minMiktar: 2, maxMiktar: 5 },
      { itemId: "hot_coal", sans: 0.6, minMiktar: 2, maxMiktar: 5 },
      { itemId: "temple_shard", sans: 0.5, minMiktar: 2, maxMiktar: 4 },
      { itemId: "warden_cape", sans: 0.05 }
    ]
  },

  // ================= YANARDAĞ MAĞARASI =================
  {
    id: "magma_beetle",
    isim: "Magma Böceği",
    ikon: "🪲",
    bolgeId: "volcano",
    tipId: "agile",
    maxHp: 440,
    saldiri: 33,
    isabet: 129,
    kacinma: 128,
    saldiriHiziMs: 1600,
    xpOdulu: 430,
    altinOdulu: 140,
    lootTablosu: [
      { itemId: "ore_obsidian", sans: 0.4, minMiktar: 1, maxMiktar: 3 },
      { itemId: "ember_core", sans: 0.35, minMiktar: 1, maxMiktar: 2 },
      { itemId: "hot_coal", sans: 0.7, minMiktar: 3, maxMiktar: 7 }
    ]
  },
  {
    id: "ash_golem",
    isim: "Kül Golemi",
    ikon: "🌫️",
    bolgeId: "volcano",
    tipId: "armored",
    maxHp: 590,
    saldiri: 49,
    isabet: 129,
    kacinma: 128,
    saldiriHiziMs: 3600,
    xpOdulu: 520,
    altinOdulu: 175,
    lootTablosu: [
      { itemId: "ore_adamant", sans: 0.5, minMiktar: 2, maxMiktar: 5 },
      { itemId: "ember_core", sans: 0.4, minMiktar: 1, maxMiktar: 3 },
      { itemId: "ash_helm", sans: 0.05 }
    ]
  },
  {
    id: "fire_spirit",
    isim: "Ateş Ruhu",
    ikon: "🔥",
    bolgeId: "volcano",
    tipId: "beast",
    maxHp: 520,
    saldiri: 43,
    isabet: 129,
    kacinma: 128,
    saldiriHiziMs: 2400,
    xpOdulu: 480,
    altinOdulu: 160,
    lootTablosu: [
      { itemId: "dragon_ember", sans: 0.35, minMiktar: 1, maxMiktar: 2 },
      { itemId: "ember_core", sans: 0.45, minMiktar: 1, maxMiktar: 3 },
      { itemId: "flame_ring", sans: 0.05 }
    ]
  },
  {
    id: "lava_drake",
    isim: "Lav Ejderi",
    ikon: "🐲",
    bolgeId: "volcano",
    tipId: "agile",
    maxHp: 740,
    saldiri: 53,
    isabet: 129,
    kacinma: 128,
    saldiriHiziMs: 2800,
    xpOdulu: 680,
    altinOdulu: 280,
    lootTablosu: [
      { itemId: "ore_dragonstone", sans: 0.4, minMiktar: 1, maxMiktar: 3 },
      { itemId: "dragon_ember", sans: 0.6, minMiktar: 2, maxMiktar: 5 },
      { itemId: "ember_core", sans: 0.6, minMiktar: 2, maxMiktar: 4 },
      { itemId: "drake_scale_body", sans: 0.04 }
    ]
  },

  // ================= GÖLGE DİYARI =================
  {
    id: "shadow_wolf",
    isim: "Gölge Kurdu",
    ikon: "🐺",
    bolgeId: "shadowrealm",
    tipId: "beast",
    maxHp: 760,
    saldiri: 51,
    isabet: 169,
    kacinma: 159,
    saldiriHiziMs: 1800,
    xpOdulu: 820,
    altinOdulu: 320,
    lootTablosu: [
      { itemId: "shadow_essence", sans: 0.7, minMiktar: 2, maxMiktar: 5 },
      { itemId: "void_fragment", sans: 0.3, minMiktar: 1, maxMiktar: 2 }
    ]
  },
  {
    id: "dark_knight",
    isim: "Karanlık Şövalye",
    ikon: "⚔️",
    bolgeId: "shadowrealm",
    tipId: "armored",
    maxHp: 1000,
    saldiri: 58,
    isabet: 169,
    kacinma: 159,
    saldiriHiziMs: 3200,
    xpOdulu: 980,
    altinOdulu: 420,
    lootTablosu: [
      { itemId: "ore_shadowstone", sans: 0.45, minMiktar: 2, maxMiktar: 4 },
      { itemId: "void_fragment", sans: 0.4, minMiktar: 1, maxMiktar: 3 },
      { itemId: "knight_greaves", sans: 0.05 }
    ]
  },
  {
    id: "void_rat",
    isim: "Boşluk Sıçanı",
    ikon: "🐁",
    bolgeId: "shadowrealm",
    tipId: "agile",
    maxHp: 650,
    saldiri: 45,
    isabet: 169,
    kacinma: 159,
    saldiriHiziMs: 1500,
    xpOdulu: 740,
    altinOdulu: 290,
    lootTablosu: [
      { itemId: "shadow_essence", sans: 0.6, minMiktar: 2, maxMiktar: 4 },
      { itemId: "void_fragment", sans: 0.35, minMiktar: 1, maxMiktar: 2 },
      { itemId: "void_boots", sans: 0.06 }
    ]
  },
  {
    id: "shadow_lord",
    isim: "Gölge Lordu",
    ikon: "👤",
    bolgeId: "shadowrealm",
    tipId: "agile",
    maxHp: 1290,
    saldiri: 62,
    isabet: 169,
    kacinma: 159,
    saldiriHiziMs: 2600,
    xpOdulu: 1450,
    altinOdulu: 700,
    lootTablosu: [
      { itemId: "ore_starstone", sans: 0.35, minMiktar: 1, maxMiktar: 3 },
      { itemId: "dragon_ember", sans: 0.7, minMiktar: 3, maxMiktar: 8 },
      { itemId: "void_fragment", sans: 0.7, minMiktar: 3, maxMiktar: 6 },
      { itemId: "shadow_crown", sans: 0.03 }
    ]
  }
];