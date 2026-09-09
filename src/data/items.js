// ============================================================
// EŞYALAR
//
// Alanlar:
//   slot            : kuşanılabilirse hangi slota
//   saldiriBonusu   : hasar
//   isabetBonusu    : vuruş tutma şansı
//   savunmaBonusu   : kaçınma + hasar azaltma
//   hizMs           : silahsa saldırı hızı
//   okGerektirir    : yaysa true
//   okMu            : ok mühimmatıysa true
//   iyilestirme     : yemekse can
//   gereksinimler   : kuşanmak için seviye şartı
//   satisFiyati     : dükkânda satış değeri
// ============================================================

export let items = [
  // ================================================================
  // HAMMADDE — ODUN
  // ================================================================
  {
    id: "log_normal",
    isim: "Normal Kütük",
    ikon: "🪵",
    satisFiyati: 2
  },
  {
    id: "log_poplar",
    isim: "Kavak Kütüğü",
    ikon: "🪵",
    satisFiyati: 4
  },
  {
    id: "log_oak",
    isim: "Meşe Kütüğü",
    ikon: "🌳",
    satisFiyati: 7
  },
  {
    id: "log_beech",
    isim: "Kayın Kütüğü",
    ikon: "🌳",
    satisFiyati: 12
  },
  {
    id: "log_willow",
    isim: "Söğüt Kütüğü",
    ikon: "🌲",
    satisFiyati: 19
  },
  {
    id: "log_pine",
    isim: "Çam Kütüğü",
    ikon: "🌲",
    satisFiyati: 28
  },

  // ================================================================
  // HAMMADDE — CEVHER VE YAKIT
  // ================================================================
  {
    id: "ore_copper",
    isim: "Bakır Cevheri",
    ikon: "🟠",
    satisFiyati: 3
  },
  {
    id: "ore_tin",
    isim: "Kalay Cevheri",
    ikon: "🔘",
    satisFiyati: 4
  },
  {
    id: "ore_iron",
    isim: "Demir Cevheri",
    ikon: "⛏️",
    satisFiyati: 9
  },
  {
    id: "ore_silver",
    isim: "Gümüş Cevheri",
    ikon: "⚪",
    satisFiyati: 16
  },
  {
    id: "ore_cobalt",
    isim: "Kobalt Cevheri",
    ikon: "🔵",
    satisFiyati: 24
  },
  {
    id: "ore_gold",
    isim: "Altın Cevheri",
    ikon: "🟡",
    satisFiyati: 38
  },
  {
    id: "coal",
    isim: "Kömür",
    ikon: "🪨",
    satisFiyati: 5
  },
  {
    id: "hot_coal",
    isim: "Kızgın Kömür",
    ikon: "🔥",
    satisFiyati: 26
  },

  // ================================================================
  // HAMMADDE — DİĞER
  // ================================================================
  {
    id: "feather",
    isim: "Kuş Tüyü",
    ikon: "🪶",
    satisFiyati: 2
  },

  // ================================================================
  // BALIK — ÇİĞ
  // ================================================================
  {
    id: "fish_sardine",
    isim: "Sardalya",
    ikon: "🐟",
    satisFiyati: 2
  },
  {
    id: "fish_anchovy",
    isim: "Hamsi",
    ikon: "🐟",
    satisFiyati: 4
  },
  {
    id: "fish_trout",
    isim: "Alabalık",
    ikon: "🐠",
    satisFiyati: 8
  },
  {
    id: "fish_bass",
    isim: "Levrek",
    ikon: "🐠",
    satisFiyati: 14
  },
  {
    id: "fish_salmon",
    isim: "Somon",
    ikon: "🐡",
    satisFiyati: 22
  },
  {
    id: "fish_shrimp",
    isim: "Karides",
    ikon: "🦐",
    satisFiyati: 32
  },

  // ================================================================
  // YEMEK
  // ================================================================
  {
    id: "cooked_sardine",
    isim: "Pişmiş Sardalya",
    ikon: "🍤",
    slot: "food",
    iyilestirme: 8,
    satisFiyati: 5
  },
  {
    id: "cooked_anchovy",
    isim: "Pişmiş Hamsi",
    ikon: "🍢",
    slot: "food",
    iyilestirme: 12,
    satisFiyati: 8
  },
  {
    id: "cooked_trout",
    isim: "Pişmiş Alabalık",
    ikon: "🍥",
    slot: "food",
    iyilestirme: 18,
    satisFiyati: 14
  },
  {
    id: "cooked_bass",
    isim: "Pişmiş Levrek",
    ikon: "🍱",
    slot: "food",
    iyilestirme: 25,
    satisFiyati: 24
  },
  {
    id: "cooked_salmon",
    isim: "Pişmiş Somon",
    ikon: "🍣",
    slot: "food",
    iyilestirme: 34,
    satisFiyati: 38
  },
  {
    id: "cooked_shrimp",
    isim: "Pişmiş Karides",
    ikon: "🍤",
    slot: "food",
    iyilestirme: 45,
    satisFiyati: 55
  },

  // ================================================================
  // OK ZİNCİRİ
  // ================================================================
  {
    id: "arrow_shaft",
    isim: "Ok Gövdesi",
    ikon: "🥢",
    satisFiyati: 1
  },
  {
    id: "arrow_tip",
    isim: "Bronz Ok Ucu",
    ikon: "🔻",
    satisFiyati: 2
  },
  {
    id: "iron_arrow_tip",
    isim: "Demir Ok Ucu",
    ikon: "🔻",
    satisFiyati: 5
  },
  {
    id: "steel_arrow_tip",
    isim: "Çelik Ok Ucu",
    ikon: "🔺",
    satisFiyati: 11
  },
  {
    id: "bronze_arrow",
    isim: "Bronz Ok",
    ikon: "🏹",
    slot: "ammo",
    okMu: true,
    saldiriBonusu: 2,
    isabetBonusu: 3,
    satisFiyati: 4
  },
  {
    id: "iron_arrow",
    isim: "Demir Ok",
    ikon: "🏹",
    slot: "ammo",
    okMu: true,
    saldiriBonusu: 4,
    isabetBonusu: 6,
    gereksinimler: [{ skillId: "ranged", seviye: 15 }],
    satisFiyati: 9
  },
  {
    id: "steel_arrow",
    isim: "Çelik Ok",
    ikon: "🏹",
    slot: "ammo",
    okMu: true,
    saldiriBonusu: 7,
    isabetBonusu: 10,
    gereksinimler: [{ skillId: "ranged", seviye: 30 }],
    satisFiyati: 18
  },

  // ================================================================
  // SİLAHLAR
  // ================================================================
  {
    id: "bronze_sword",
    isim: "Bronz Kılıç",
    ikon: "🗡️",
    slot: "weapon",
    saldiriBonusu: 4,
    isabetBonusu: 6,
    hizMs: 2400,
    satisFiyati: 12
  },
  {
    id: "iron_sword",
    isim: "Demir Kılıç",
    ikon: "⚔️",
    slot: "weapon",
    saldiriBonusu: 8,
    isabetBonusu: 12,
    hizMs: 2400,
    gereksinimler: [{ skillId: "attack", seviye: 15 }],
    satisFiyati: 40
  },
  {
    id: "steel_sword",
    isim: "Çelik Kılıç",
    ikon: "⚔️",
    slot: "weapon",
    saldiriBonusu: 14,
    isabetBonusu: 20,
    hizMs: 2400,
    gereksinimler: [{ skillId: "attack", seviye: 30 }],
    satisFiyati: 120
  },
  {
    id: "short_bow",
    isim: "Kısa Yay",
    ikon: "🎯",
    slot: "weapon",
    saldiriBonusu: 6,
    isabetBonusu: 8,
    hizMs: 3200,
    okGerektirir: true,
    gereksinimler: [{ skillId: "ranged", seviye: 5 }],
    satisFiyati: 30
  },
  {
    id: "oak_bow",
    isim: "Meşe Yay",
    ikon: "🏹",
    slot: "weapon",
    saldiriBonusu: 11,
    isabetBonusu: 15,
    hizMs: 3200,
    okGerektirir: true,
    gereksinimler: [{ skillId: "ranged", seviye: 15 }],
    satisFiyati: 80
  },
  {
    id: "willow_bow",
    isim: "Söğüt Yay",
    ikon: "🏹",
    slot: "weapon",
    saldiriBonusu: 19,
    isabetBonusu: 24,
    hizMs: 3000,
    okGerektirir: true,
    gereksinimler: [{ skillId: "ranged", seviye: 30 }],
    satisFiyati: 240
  },

  // ================================================================
  // BRONZ SET
  // ================================================================
  {
    id: "bronze_helmet",
    isim: "Bronz Kask",
    ikon: "⛑️",
    slot: "helmet",
    savunmaBonusu: 3,
    satisFiyati: 14
  },
  {
    id: "bronze_body",
    isim: "Bronz Zırh",
    ikon: "🦺",
    slot: "body",
    savunmaBonusu: 6,
    satisFiyati: 22
  },
  {
    id: "bronze_shield",
    isim: "Bronz Kalkan",
    ikon: "🛡️",
    slot: "shield",
    savunmaBonusu: 4,
    satisFiyati: 18
  },

  // ================================================================
  // DEMİR SET
  // ================================================================
  {
    id: "iron_helmet",
    isim: "Demir Kask",
    ikon: "🪖",
    slot: "helmet",
    savunmaBonusu: 6,
    gereksinimler: [{ skillId: "defence", seviye: 15 }],
    satisFiyati: 45
  },
  {
    id: "iron_body",
    isim: "Demir Zırh",
    ikon: "🥋",
    slot: "body",
    savunmaBonusu: 11,
    gereksinimler: [{ skillId: "defence", seviye: 15 }],
    satisFiyati: 70
  },
  {
    id: "iron_shield",
    isim: "Demir Kalkan",
    ikon: "🛡️",
    slot: "shield",
    savunmaBonusu: 7,
    gereksinimler: [{ skillId: "defence", seviye: 15 }],
    satisFiyati: 55
  },

  // ================================================================
  // ÇELİK SET
  // ================================================================
  {
    id: "steel_helmet",
    isim: "Çelik Kask",
    ikon: "🪖",
    slot: "helmet",
    savunmaBonusu: 10,
    gereksinimler: [{ skillId: "defence", seviye: 30 }],
    satisFiyati: 130
  },
  {
    id: "steel_body",
    isim: "Çelik Zırh",
    ikon: "🥋",
    slot: "body",
    savunmaBonusu: 18,
    gereksinimler: [{ skillId: "defence", seviye: 30 }],
    satisFiyati: 200
  },
  {
    id: "steel_shield",
    isim: "Çelik Kalkan",
    ikon: "🛡️",
    slot: "shield",
    savunmaBonusu: 12,
    gereksinimler: [{ skillId: "defence", seviye: 30 }],
    satisFiyati: 160
  },
  {
    id: "steel_legs",
    isim: "Çelik Pantolon",
    ikon: "👖",
    slot: "legs",
    savunmaBonusu: 14,
    gereksinimler: [{ skillId: "defence", seviye: 30 }],
    satisFiyati: 175
  },

  // ================================================================
  // LOOT — SAVAŞTAN DÜŞENLER
  // ================================================================
  {
    id: "bones",
    isim: "Kemik",
    ikon: "🦴",
    satisFiyati: 1
  },
  {
    id: "rat_tail",
    isim: "Fare Kuyruğu",
    ikon: "🪱",
    satisFiyati: 4
  },
  {
    id: "goblin_mail",
    isim: "Goblin Zırhı",
    ikon: "🥋",
    slot: "body",
    savunmaBonusu: 9,
    gereksinimler: [{ skillId: "defence", seviye: 5 }],
    satisFiyati: 25
  },
  {
    id: "wolf_pelt",
    isim: "Kurt Postu",
    ikon: "🟫",
    slot: "cape",
    savunmaBonusu: 4,
    gereksinimler: [{ skillId: "defence", seviye: 8 }],
    satisFiyati: 20
  },
  {
    id: "bandit_hood",
    isim: "Haydut Başlığı",
    ikon: "🎭",
    slot: "helmet",
    savunmaBonusu: 5,
    isabetBonusu: 4,
    gereksinimler: [{ skillId: "attack", seviye: 10 }],
    satisFiyati: 45
  },

  // ---------- TERK EDİLMİŞ MADEN ----------
  {
    id: "spider_silk",
    isim: "Örümcek İpeği",
    ikon: "🕸️",
    satisFiyati: 12
  },
  {
    id: "troll_hide",
    isim: "Trol Derisi",
    ikon: "🟤",
    satisFiyati: 18
  },
  {
    id: "shadow_essence",
    isim: "Gölge Özü",
    ikon: "🌑",
    satisFiyati: 35
  },
  {
    id: "spider_cape",
    isim: "Örümcek Pelerini",
    ikon: "🕸️",
    slot: "cape",
    savunmaBonusu: 9,
    isabetBonusu: 5,
    gereksinimler: [{ skillId: "defence", seviye: 18 }],
    satisFiyati: 140
  },
  {
    id: "golem_core",
    isim: "Golem Kalbi",
    ikon: "💠",
    slot: "amulet",
    savunmaBonusu: 12,
    gereksinimler: [{ skillId: "defence", seviye: 20 }],
    satisFiyati: 220
  },
  {
    id: "troll_legs",
    isim: "Trol Derisi Pantolon",
    ikon: "👖",
    slot: "legs",
    savunmaBonusu: 10,
    gereksinimler: [{ skillId: "defence", seviye: 18 }],
    satisFiyati: 160
  },
  {
    id: "shadow_ring",
    isim: "Gölge Yüzüğü",
    ikon: "💍",
    slot: "ring",
    saldiriBonusu: 6,
    isabetBonusu: 9,
    gereksinimler: [{ skillId: "attack", seviye: 20 }],
    satisFiyati: 300
  },

  // ================================================================
  // DÜKKÂN ÜRÜNLERİ
  // ================================================================
  {
    id: "leather_boots",
    isim: "Deri Bot",
    ikon: "🥾",
    slot: "boots",
    savunmaBonusu: 2,
    satisFiyati: 10
  },
  {
    id: "leather_gloves",
    isim: "Deri Eldiven",
    ikon: "🧤",
    slot: "gloves",
    savunmaBonusu: 1,
    satisFiyati: 8
  },
  {
    id: "simple_ring",
    isim: "Basit Yüzük",
    ikon: "💍",
    slot: "ring",
    saldiriBonusu: 2,
    isabetBonusu: 2,
    satisFiyati: 20
  }
];