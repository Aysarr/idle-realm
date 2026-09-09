// ============================================================
// CANAVARLAR
//
// isabet        : canavarın sana vurma gücü (senin kaçınmanla karşılaştırılır)
// kacinma       : senin ıskalama ihtimalini artırır
// saldiriHiziMs : kaç milisaniyede bir vurduğu
// tipId         : savaş üçgeni tipi (agile / armored / beast)
//
// TASARIM NOTU: Her bölgede farklı tipler ve farklı hızlar olmalı.
// Hepsi aynı tipse oyuncu tek silah kuşanıp mekaniği unutur.
// ============================================================

export let monsters = [
  // ================================================================
  // KÖY ÇEVRESİ
  // ================================================================
  {
    id: "rat",
    isim: "Fare",
    ikon: "🐀",
    bolgeId: "village",
    tipId: "agile",
    maxHp: 20,
    saldiri: 3,
    isabet: 8,
    kacinma: 6,
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
    maxHp: 45,
    saldiri: 7,
    isabet: 14,
    kacinma: 12,
    saldiriHiziMs: 2800,
    xpOdulu: 18,
    altinOdulu: 9,
    lootTablosu: [
      { itemId: "bones", sans: 1, minMiktar: 1, maxMiktar: 3 },
      { itemId: "feather", sans: 0.7, minMiktar: 2, maxMiktar: 5 },
      { itemId: "ore_copper", sans: 0.4 },
      { itemId: "goblin_mail", sans: 0.08 }
    ]
  },

  // ================================================================
  // KARANLIK ORMAN
  // ================================================================
  {
    id: "wolf",
    isim: "Kurt",
    ikon: "🐺",
    bolgeId: "forest",
    tipId: "beast",
    maxHp: 60,
    saldiri: 9,
    isabet: 22,
    kacinma: 20,
    saldiriHiziMs: 1600,
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
    maxHp: 90,
    saldiri: 13,
    isabet: 30,
    kacinma: 26,
    saldiriHiziMs: 3000,
    xpOdulu: 48,
    altinOdulu: 30,
    lootTablosu: [
      { itemId: "bones", sans: 1, minMiktar: 1, maxMiktar: 2 },
      { itemId: "coal", sans: 0.5, minMiktar: 1, maxMiktar: 3 },
      { itemId: "ore_copper", sans: 0.6, minMiktar: 2, maxMiktar: 5 },
      { itemId: "bandit_hood", sans: 0.06 }
    ]
  },

  // ================================================================
  // TERK EDİLMİŞ MADEN
  // Demir set giyen oyuncu için tasarlandı.
  // Dört farklı ritim: hızlı-zayıf, yavaş-sert, dengeli, çevik-güçlü.
  // ================================================================
  {
    id: "cave_spider",
    isim: "Mağara Örümceği",
    ikon: "🕷️",
    bolgeId: "mine",
    tipId: "agile",
    maxHp: 110,
    saldiri: 15,
    isabet: 42,
    kacinma: 46,
    saldiriHiziMs: 1400,
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
    maxHp: 230,
    saldiri: 27,
    isabet: 46,
    kacinma: 20,
    saldiriHiziMs: 3600,
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
    maxHp: 175,
    saldiri: 21,
    isabet: 56,
    kacinma: 36,
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
    maxHp: 200,
    saldiri: 25,
    isabet: 70,
    kacinma: 58,
    saldiriHiziMs: 2200,
    xpOdulu: 130,
    altinOdulu: 55,
    lootTablosu: [
      { itemId: "ore_iron", sans: 0.7, minMiktar: 3, maxMiktar: 8 },
      { itemId: "coal", sans: 0.7, minMiktar: 3, maxMiktar: 7 },
      { itemId: "shadow_essence", sans: 0.25 },
      { itemId: "shadow_ring", sans: 0.04 }
    ]
  }
];