// ============================================================
// CANAVARLAR
//
// isabet        : canavarın sana vurma gücü (senin kaçınmanla karşılaştırılır)
// kacinma       : senin ıskalama ihtimalini artırır
// saldiriHiziMs : kaç milisaniyede bir vurduğu
// tipId         : savaş üçgeni tipi (agile / armored / beast)
//
// TASARIM NOTU: Her bölgede farklı tipler ve farklı hızlar var.
// Hepsi aynı tipse oyuncu tek silah kuşanıp mekaniği unutur.
//
// DENGE HEDEFİ: Bölgenin hedef ekipman kademesindeki bir oyuncu
// için öldürme süresi 4-30sn, dayanma süresi öldürmenin en az
// 1.2 katı (boss) ile 30 katı (giriş canavarı) arasında.
// ============================================================

export let monsters = [
  // ================================================================
  // KÖY ÇEVRESİ — hedef: Sv 1-10, bronz ekipman
  // ================================================================
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

  // ================================================================
  // KARANLIK ORMAN — hedef: Sv 12-22, demir ekipman
  // ================================================================
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

  // ================================================================
  // TERK EDİLMİŞ MADEN — hedef: Sv 25-40, çelik ekipman
  //
  // Dört farklı ritim:
  //   Örümcek : hızlı, çok kaçıyor, isabet gerektirir
  //   Golem   : yavaş ama çok canlı ve sert, kılıç işine yarar
  //   Trol    : dengeli, zayıflığı yok
  //   Madenci : bölgenin en zoru — yemek olmadan girme
  // ================================================================
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
  }
];