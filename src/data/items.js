// ============================================================
// EŞYALAR
//
// Bu dosyanın büyük kısmı KADEME KALIBI ile üretilmiştir.
// Yeni bir kademe eklerken aynı kalıbı izle:
//   toplama ürünü -> sadece isim/ikon/satisFiyati
//   ekipman       -> slot + bonus + gereksinimler
// ============================================================

export let items = [
  // ---------------- ODUN ----------------
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
  {
    id: "log_maple",
    isim: "Akçaağaç Kütüğü",
    ikon: "🍁",
    satisFiyati: 42
  },
  {
    id: "log_walnut",
    isim: "Ceviz Kütüğü",
    ikon: "🍂",
    satisFiyati: 60
  },
  {
    id: "log_yew",
    isim: "Porsuk Kütüğü",
    ikon: "🌴",
    satisFiyati: 85
  },
  {
    id: "log_ebony",
    isim: "Abanoz Kütüğü",
    ikon: "⬛",
    satisFiyati: 120
  },
  {
    id: "log_cedar",
    isim: "Sedir Kütüğü",
    ikon: "🌲",
    satisFiyati: 165
  },
  {
    id: "log_ironwood",
    isim: "Demirtahta",
    ikon: "🟫",
    satisFiyati: 225
  },
  {
    id: "log_magic",
    isim: "Sihirli Kütük",
    ikon: "✨",
    satisFiyati: 310
  },
  {
    id: "log_shadow",
    isim: "Gölge Kütüğü",
    ikon: "🌑",
    satisFiyati: 420
  },
  {
    id: "log_world",
    isim: "Dünya Kütüğü",
    ikon: "🌍",
    satisFiyati: 580
  },

  // ---------------- CEVHER ----------------
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
    id: "ore_mithril",
    isim: "Mithril Cevheri",
    ikon: "🔷",
    satisFiyati: 55
  },
  {
    id: "ore_amethyst",
    isim: "Ametist",
    ikon: "🟣",
    satisFiyati: 78
  },
  {
    id: "ore_adamant",
    isim: "Adamantit Cevheri",
    ikon: "🟢",
    satisFiyati: 110
  },
  {
    id: "ore_obsidian",
    isim: "Obsidyen",
    ikon: "⚫",
    satisFiyati: 150
  },
  {
    id: "ore_ruby",
    isim: "Yakut",
    ikon: "🔴",
    satisFiyati: 205
  },
  {
    id: "ore_diamond",
    isim: "Elmas",
    ikon: "💎",
    satisFiyati: 280
  },
  {
    id: "ore_dragonstone",
    isim: "Ejder Taşı",
    ikon: "🐉",
    satisFiyati: 380
  },
  {
    id: "ore_shadowstone",
    isim: "Gölge Taşı",
    ikon: "🌑",
    satisFiyati: 520
  },
  {
    id: "ore_starstone",
    isim: "Yıldız Taşı",
    ikon: "☄️",
    satisFiyati: 700
  },

  // ---------------- YAKIT ----------------
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
  {
    id: "dragon_ember",
    isim: "Ejder Közü",
    ikon: "🌋",
    satisFiyati: 95
  },

  // ---------------- DİĞER HAMMADDE ----------------
  {
    id: "feather",
    isim: "Kuş Tüyü",
    ikon: "🪶",
    satisFiyati: 2
  },
  {
    id: "arrow_shaft",
    isim: "Ok Gövdesi",
    ikon: "🥢",
    satisFiyati: 1
  },

  // ---------------- ÇİĞ BALIK ----------------
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
  {
    id: "fish_tuna",
    isim: "Ton Balığı",
    ikon: "🐟",
    satisFiyati: 46
  },
  {
    id: "fish_lobster",
    isim: "Istakoz",
    ikon: "🦞",
    satisFiyati: 64
  },
  {
    id: "fish_swordfish",
    isim: "Kılıçbalığı",
    ikon: "🗡️",
    satisFiyati: 88
  },
  {
    id: "fish_shark",
    isim: "Köpekbalığı",
    ikon: "🦈",
    satisFiyati: 120
  },
  {
    id: "fish_turbot",
    isim: "Kalkan Balığı",
    ikon: "🐋",
    satisFiyati: 165
  },
  {
    id: "fish_octopus",
    isim: "Ahtapot",
    ikon: "🐙",
    satisFiyati: 225
  },
  {
    id: "fish_dragonfish",
    isim: "Ejder Balığı",
    ikon: "🐉",
    satisFiyati: 310
  },
  {
    id: "fish_shadoweel",
    isim: "Gölge Yılanbalığı",
    ikon: "🌑",
    satisFiyati: 420
  },
  {
    id: "fish_starfish",
    isim: "Yıldız Balığı",
    ikon: "⭐",
    satisFiyati: 570
  },

  // ---------------- YEMEK ----------------
  {
    id: "cooked_sardine",
    isim: "Pişmiş Sardalya",
    ikon: "🍤",
    slot: "food",
    iyilestirme: 8,
    satisFiyati: 4
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
    satisFiyati: 16
  },
  {
    id: "cooked_bass",
    isim: "Pişmiş Levrek",
    ikon: "🍱",
    slot: "food",
    iyilestirme: 25,
    satisFiyati: 28
  },
  {
    id: "cooked_salmon",
    isim: "Pişmiş Somon",
    ikon: "🍣",
    slot: "food",
    iyilestirme: 34,
    satisFiyati: 44
  },
  {
    id: "cooked_shrimp",
    isim: "Pişmiş Karides",
    ikon: "🍤",
    slot: "food",
    iyilestirme: 45,
    satisFiyati: 64
  },
  {
    id: "cooked_tuna",
    isim: "Pişmiş Ton",
    ikon: "🍲",
    slot: "food",
    iyilestirme: 58,
    satisFiyati: 92
  },
  {
    id: "cooked_lobster",
    isim: "Pişmiş Istakoz",
    ikon: "🦞",
    slot: "food",
    iyilestirme: 74,
    satisFiyati: 128
  },
  {
    id: "cooked_swordfish",
    isim: "Pişmiş Kılıçbalığı",
    ikon: "🍛",
    slot: "food",
    iyilestirme: 92,
    satisFiyati: 176
  },
  {
    id: "cooked_shark",
    isim: "Pişmiş Köpekbalığı",
    ikon: "🥘",
    slot: "food",
    iyilestirme: 115,
    satisFiyati: 240
  },
  {
    id: "cooked_turbot",
    isim: "Pişmiş Kalkan",
    ikon: "🍜",
    slot: "food",
    iyilestirme: 142,
    satisFiyati: 330
  },
  {
    id: "cooked_octopus",
    isim: "Pişmiş Ahtapot",
    ikon: "🍢",
    slot: "food",
    iyilestirme: 175,
    satisFiyati: 450
  },
  {
    id: "cooked_dragonfish",
    isim: "Pişmiş Ejder Balığı",
    ikon: "🔥",
    slot: "food",
    iyilestirme: 215,
    satisFiyati: 620
  },
  {
    id: "cooked_shadoweel",
    isim: "Pişmiş Gölge Yılanbalığı",
    ikon: "🌙",
    slot: "food",
    iyilestirme: 265,
    satisFiyati: 840
  },
  {
    id: "cooked_starfish",
    isim: "Pişmiş Yıldız Balığı",
    ikon: "✨",
    slot: "food",
    iyilestirme: 325,
    satisFiyati: 1140
  },

  // ---------------- OK UÇLARI ----------------
  {
    id: "bronze_arrow_tip",
    isim: "Bronz Ok Ucu",
    ikon: "🔻",
    satisFiyati: 3
  },
  {
    id: "iron_arrow_tip",
    isim: "Demir Ok Ucu",
    ikon: "🔻",
    satisFiyati: 17
  },
  {
    id: "steel_arrow_tip",
    isim: "Çelik Ok Ucu",
    ikon: "🔻",
    satisFiyati: 32
  },
  {
    id: "mithril_arrow_tip",
    isim: "Mithril Ok Ucu",
    ikon: "🔻",
    satisFiyati: 47
  },
  {
    id: "adamant_arrow_tip",
    isim: "Adamantit Ok Ucu",
    ikon: "🔻",
    satisFiyati: 60
  },
  {
    id: "obsidian_arrow_tip",
    isim: "Obsidyen Ok Ucu",
    ikon: "🔻",
    satisFiyati: 72
  },
  {
    id: "dragon_arrow_tip",
    isim: "Ejderha Ok Ucu",
    ikon: "🔻",
    satisFiyati: 84
  },
  {
    id: "shadow_arrow_tip",
    isim: "Gölge Ok Ucu",
    ikon: "🔻",
    satisFiyati: 94
  },

  // ---------------- OKLAR ----------------
  {
    id: "bronze_arrow",
    isim: "Bronz Ok",
    ikon: "🏹",
    slot: "ammo",
    okMu: true,
    saldiriBonusu: 2,
    isabetBonusu: 3,
    satisFiyati: 5
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
    satisFiyati: 19
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
    satisFiyati: 34
  },
  {
    id: "mithril_arrow",
    isim: "Mithril Ok",
    ikon: "🏹",
    slot: "ammo",
    okMu: true,
    saldiriBonusu: 11,
    isabetBonusu: 15,
    gereksinimler: [{ skillId: "ranged", seviye: 45 }],
    satisFiyati: 49
  },
  {
    id: "adamant_arrow",
    isim: "Adamantit Ok",
    ikon: "🏹",
    slot: "ammo",
    okMu: true,
    saldiriBonusu: 16,
    isabetBonusu: 22,
    gereksinimler: [{ skillId: "ranged", seviye: 58 }],
    satisFiyati: 62
  },
  {
    id: "obsidian_arrow",
    isim: "Obsidyen Ok",
    ikon: "🏹",
    slot: "ammo",
    okMu: true,
    saldiriBonusu: 23,
    isabetBonusu: 31,
    gereksinimler: [{ skillId: "ranged", seviye: 70 }],
    satisFiyati: 74
  },
  {
    id: "dragon_arrow",
    isim: "Ejderha Ok",
    ikon: "🏹",
    slot: "ammo",
    okMu: true,
    saldiriBonusu: 32,
    isabetBonusu: 43,
    gereksinimler: [{ skillId: "ranged", seviye: 82 }],
    satisFiyati: 86
  },
  {
    id: "shadow_arrow",
    isim: "Gölge Ok",
    ikon: "🏹",
    slot: "ammo",
    okMu: true,
    saldiriBonusu: 44,
    isabetBonusu: 58,
    gereksinimler: [{ skillId: "ranged", seviye: 92 }],
    satisFiyati: 96
  },

  // ---------------- KILIÇLAR ----------------
  {
    id: "bronze_sword",
    isim: "Bronz Kılıç",
    ikon: "⚔️",
    slot: "weapon",
    saldiriBonusu: 4,
    isabetBonusu: 6,
    hizMs: 2400,
    satisFiyati: 20
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
    satisFiyati: 132
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
    satisFiyati: 252
  },
  {
    id: "mithril_sword",
    isim: "Mithril Kılıç",
    ikon: "⚔️",
    slot: "weapon",
    saldiriBonusu: 23,
    isabetBonusu: 30,
    hizMs: 2400,
    gereksinimler: [{ skillId: "attack", seviye: 45 }],
    satisFiyati: 372
  },
  {
    id: "adamant_sword",
    isim: "Adamantit Kılıç",
    ikon: "⚔️",
    slot: "weapon",
    saldiriBonusu: 35,
    isabetBonusu: 44,
    hizMs: 2400,
    gereksinimler: [{ skillId: "attack", seviye: 58 }],
    satisFiyati: 476
  },
  {
    id: "obsidian_sword",
    isim: "Obsidyen Kılıç",
    ikon: "⚔️",
    slot: "weapon",
    saldiriBonusu: 50,
    isabetBonusu: 62,
    hizMs: 2400,
    gereksinimler: [{ skillId: "attack", seviye: 70 }],
    satisFiyati: 572
  },
  {
    id: "dragon_sword",
    isim: "Ejderha Kılıç",
    ikon: "⚔️",
    slot: "weapon",
    saldiriBonusu: 70,
    isabetBonusu: 85,
    hizMs: 2400,
    gereksinimler: [{ skillId: "attack", seviye: 82 }],
    satisFiyati: 668
  },
  {
    id: "shadow_sword",
    isim: "Gölge Kılıç",
    ikon: "⚔️",
    slot: "weapon",
    saldiriBonusu: 95,
    isabetBonusu: 115,
    hizMs: 2400,
    gereksinimler: [{ skillId: "attack", seviye: 92 }],
    satisFiyati: 748
  },

  // ---------------- YAYLAR ----------------
  {
    id: "short_bow",
    isim: "Kısa Yay",
    ikon: "🏹",
    slot: "weapon",
    saldiriBonusu: 6,
    isabetBonusu: 8,
    hizMs: 3200,
    okGerektirir: true,
    satisFiyati: 80
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
    satisFiyati: 180
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
    satisFiyati: 330
  },
  {
    id: "maple_bow",
    isim: "Akçaağaç Yay",
    ikon: "🏹",
    slot: "weapon",
    saldiriBonusu: 30,
    isabetBonusu: 38,
    hizMs: 3000,
    okGerektirir: true,
    gereksinimler: [{ skillId: "ranged", seviye: 45 }],
    satisFiyati: 480
  },
  {
    id: "yew_bow",
    isim: "Porsuk Yay",
    ikon: "🏹",
    slot: "weapon",
    saldiriBonusu: 45,
    isabetBonusu: 56,
    hizMs: 2800,
    okGerektirir: true,
    gereksinimler: [{ skillId: "ranged", seviye: 58 }],
    satisFiyati: 610
  },
  {
    id: "cedar_bow",
    isim: "Sedir Yay",
    ikon: "🏹",
    slot: "weapon",
    saldiriBonusu: 64,
    isabetBonusu: 79,
    hizMs: 2800,
    okGerektirir: true,
    gereksinimler: [{ skillId: "ranged", seviye: 70 }],
    satisFiyati: 730
  },
  {
    id: "magic_bow",
    isim: "Sihirli Yay",
    ikon: "🏹",
    slot: "weapon",
    saldiriBonusu: 88,
    isabetBonusu: 108,
    hizMs: 2600,
    okGerektirir: true,
    gereksinimler: [{ skillId: "ranged", seviye: 82 }],
    satisFiyati: 850
  },
  {
    id: "shadow_bow",
    isim: "Gölge Yay",
    ikon: "🏹",
    slot: "weapon",
    saldiriBonusu: 118,
    isabetBonusu: 145,
    hizMs: 2600,
    okGerektirir: true,
    gereksinimler: [{ skillId: "ranged", seviye: 92 }],
    satisFiyati: 950
  },

  // ---------------- ZIRHLAR ----------------
  {
    id: "bronze_helmet",
    isim: "Bronz Kask",
    ikon: "🪖",
    slot: "helmet",
    savunmaBonusu: 3,
    satisFiyati: 28
  },
  {
    id: "bronze_body",
    isim: "Bronz Zırh",
    ikon: "🥋",
    slot: "body",
    savunmaBonusu: 6,
    satisFiyati: 46
  },
  {
    id: "bronze_shield",
    isim: "Bronz Kalkan",
    ikon: "🛡️",
    slot: "shield",
    savunmaBonusu: 4,
    satisFiyati: 34
  },
  {
    id: "iron_helmet",
    isim: "Demir Kask",
    ikon: "🪖",
    slot: "helmet",
    savunmaBonusu: 6,
    gereksinimler: [{ skillId: "defence", seviye: 15 }],
    satisFiyati: 46
  },
  {
    id: "iron_body",
    isim: "Demir Zırh",
    ikon: "🥋",
    slot: "body",
    savunmaBonusu: 11,
    gereksinimler: [{ skillId: "defence", seviye: 15 }],
    satisFiyati: 76
  },
  {
    id: "iron_shield",
    isim: "Demir Kalkan",
    ikon: "🛡️",
    slot: "shield",
    savunmaBonusu: 7,
    gereksinimler: [{ skillId: "defence", seviye: 15 }],
    satisFiyati: 52
  },
  {
    id: "steel_helmet",
    isim: "Çelik Kask",
    ikon: "🪖",
    slot: "helmet",
    savunmaBonusu: 10,
    gereksinimler: [{ skillId: "defence", seviye: 30 }],
    satisFiyati: 70
  },
  {
    id: "steel_body",
    isim: "Çelik Zırh",
    ikon: "🥋",
    slot: "body",
    savunmaBonusu: 18,
    gereksinimler: [{ skillId: "defence", seviye: 30 }],
    satisFiyati: 118
  },
  {
    id: "steel_shield",
    isim: "Çelik Kalkan",
    ikon: "🛡️",
    slot: "shield",
    savunmaBonusu: 12,
    gereksinimler: [{ skillId: "defence", seviye: 30 }],
    satisFiyati: 82
  },
  {
    id: "steel_legs",
    isim: "Çelik Pantolon",
    ikon: "👖",
    slot: "legs",
    savunmaBonusu: 14,
    gereksinimler: [{ skillId: "defence", seviye: 30 }],
    satisFiyati: 94
  },
  {
    id: "mithril_helmet",
    isim: "Mithril Kask",
    ikon: "🪖",
    slot: "helmet",
    savunmaBonusu: 14,
    gereksinimler: [{ skillId: "defence", seviye: 45 }],
    satisFiyati: 94
  },
  {
    id: "mithril_body",
    isim: "Mithril Zırh",
    ikon: "🥋",
    slot: "body",
    savunmaBonusu: 26,
    gereksinimler: [{ skillId: "defence", seviye: 45 }],
    satisFiyati: 166
  },
  {
    id: "mithril_shield",
    isim: "Mithril Kalkan",
    ikon: "🛡️",
    slot: "shield",
    savunmaBonusu: 18,
    gereksinimler: [{ skillId: "defence", seviye: 45 }],
    satisFiyati: 118
  },
  {
    id: "mithril_legs",
    isim: "Mithril Pantolon",
    ikon: "👖",
    slot: "legs",
    savunmaBonusu: 22,
    gereksinimler: [{ skillId: "defence", seviye: 45 }],
    satisFiyati: 142
  },
  {
    id: "adamant_helmet",
    isim: "Adamantit Kask",
    ikon: "🪖",
    slot: "helmet",
    savunmaBonusu: 21,
    gereksinimler: [{ skillId: "defence", seviye: 58 }],
    satisFiyati: 136
  },
  {
    id: "adamant_body",
    isim: "Adamantit Zırh",
    ikon: "🥋",
    slot: "body",
    savunmaBonusu: 38,
    gereksinimler: [{ skillId: "defence", seviye: 58 }],
    satisFiyati: 238
  },
  {
    id: "adamant_shield",
    isim: "Adamantit Kalkan",
    ikon: "🛡️",
    slot: "shield",
    savunmaBonusu: 25,
    gereksinimler: [{ skillId: "defence", seviye: 58 }],
    satisFiyati: 160
  },
  {
    id: "adamant_legs",
    isim: "Adamantit Pantolon",
    ikon: "👖",
    slot: "legs",
    savunmaBonusu: 31,
    gereksinimler: [{ skillId: "defence", seviye: 58 }],
    satisFiyati: 196
  },
  {
    id: "obsidian_helmet",
    isim: "Obsidyen Kask",
    ikon: "🪖",
    slot: "helmet",
    savunmaBonusu: 29,
    gereksinimler: [{ skillId: "defence", seviye: 70 }],
    satisFiyati: 184
  },
  {
    id: "obsidian_body",
    isim: "Obsidyen Zırh",
    ikon: "🥋",
    slot: "body",
    savunmaBonusu: 53,
    gereksinimler: [{ skillId: "defence", seviye: 70 }],
    satisFiyati: 328
  },
  {
    id: "obsidian_shield",
    isim: "Obsidyen Kalkan",
    ikon: "🛡️",
    slot: "shield",
    savunmaBonusu: 35,
    gereksinimler: [{ skillId: "defence", seviye: 70 }],
    satisFiyati: 220
  },
  {
    id: "obsidian_legs",
    isim: "Obsidyen Pantolon",
    ikon: "👖",
    slot: "legs",
    savunmaBonusu: 43,
    gereksinimler: [{ skillId: "defence", seviye: 70 }],
    satisFiyati: 268
  },
  {
    id: "dragon_helmet",
    isim: "Ejderha Kask",
    ikon: "🪖",
    slot: "helmet",
    savunmaBonusu: 39,
    gereksinimler: [{ skillId: "defence", seviye: 82 }],
    satisFiyati: 244
  },
  {
    id: "dragon_body",
    isim: "Ejderha Zırh",
    ikon: "🥋",
    slot: "body",
    savunmaBonusu: 71,
    gereksinimler: [{ skillId: "defence", seviye: 82 }],
    satisFiyati: 436
  },
  {
    id: "dragon_shield",
    isim: "Ejderha Kalkan",
    ikon: "🛡️",
    slot: "shield",
    savunmaBonusu: 47,
    gereksinimler: [{ skillId: "defence", seviye: 82 }],
    satisFiyati: 292
  },
  {
    id: "dragon_legs",
    isim: "Ejderha Pantolon",
    ikon: "👖",
    slot: "legs",
    savunmaBonusu: 58,
    gereksinimler: [{ skillId: "defence", seviye: 82 }],
    satisFiyati: 358
  },
  {
    id: "shadow_helmet",
    isim: "Gölge Kask",
    ikon: "🪖",
    slot: "helmet",
    savunmaBonusu: 51,
    gereksinimler: [{ skillId: "defence", seviye: 92 }],
    satisFiyati: 316
  },
  {
    id: "shadow_body",
    isim: "Gölge Zırh",
    ikon: "🥋",
    slot: "body",
    savunmaBonusu: 94,
    gereksinimler: [{ skillId: "defence", seviye: 92 }],
    satisFiyati: 574
  },
  {
    id: "shadow_shield",
    isim: "Gölge Kalkan",
    ikon: "🛡️",
    slot: "shield",
    savunmaBonusu: 63,
    gereksinimler: [{ skillId: "defence", seviye: 92 }],
    satisFiyati: 388
  },
  {
    id: "shadow_legs",
    isim: "Gölge Pantolon",
    ikon: "👖",
    slot: "legs",
    savunmaBonusu: 77,
    gereksinimler: [{ skillId: "defence", seviye: 92 }],
    satisFiyati: 472
  },

  // ---------------- SAVAŞ LOOT'U ----------------
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

  // ---------------- ZİYAFETLER (geçici bonus) ----------------
  //
  // Ziyafetler yemek slotuna GİRMEZ (slot alanı yok) — envanterden
  // doğrudan kullanılır. Böylece otomatik yemek pahalı ziyafeti
  // boşa harcamaz.
  {
    id: "feast_stew",
    isim: "Balık Çorbası",
    ikon: "🍲",
    iyilestirme: 60,
    bonus: {
      sureMs: 300000,
      etkiler: [{ tur: "xp", deger: 0.05 }]
    },
    satisFiyati: 90
  },
  {
    id: "feast_adventurer",
    isim: "Maceracı Güveci",
    ikon: "🥘",
    iyilestirme: 110,
    bonus: {
      sureMs: 480000,
      etkiler: [{ tur: "hiz", deger: 0.06 }]
    },
    satisFiyati: 180
  },
  {
    id: "feast_king",
    isim: "Kral Sofrası",
    ikon: "🍛",
    iyilestirme: 190,
    bonus: {
      sureMs: 600000,
      etkiler: [{ tur: "altin", deger: 0.15 }]
    },
    satisFiyati: 340
  },
  {
    id: "feast_warrior",
    isim: "Savaşçı Ziyafeti",
    ikon: "🍖",
    iyilestirme: 280,
    bonus: {
      sureMs: 600000,
      etkiler: [{ tur: "hasar", deger: 0.10 }]
    },
    satisFiyati: 520
  },
  {
    id: "feast_dragon",
    isim: "Ejder Ziyafeti",
    ikon: "🔥",
    iyilestirme: 430,
    bonus: {
      sureMs: 900000,
      etkiler: [{ tur: "xp", deger: 0.12 }]
    },
    satisFiyati: 900
  },
  {
    id: "feast_star",
    isim: "Yıldız Şöleni",
    ikon: "🌟",
    iyilestirme: 650,
    bonus: {
      sureMs: 1200000,
      etkiler: [
        { tur: "xp", deger: 0.10 },
        { tur: "hiz", deger: 0.08 },
        { tur: "altin", deger: 0.20 },
        { tur: "hasar", deger: 0.08 }
      ]
    },
    satisFiyati: 2400
  },

  // ---------------- ÜST BÖLGE LOOT'U ----------------
  {
    id: "temple_shard",
    isim: "Tapınak Parçası",
    ikon: "🔶",
    satisFiyati: 60
  },
  {
    id: "ember_core",
    isim: "Köz Çekirdeği",
    ikon: "🟥",
    satisFiyati: 140
  },
  {
    id: "void_fragment",
    isim: "Boşluk Kırığı",
    ikon: "🔮",
    satisFiyati: 320
  },
  {
    id: "guardian_plate",
    isim: "Muhafız Göğüslüğü",
    ikon: "🛡️",
    slot: "body",
    savunmaBonusu: 34,
    gereksinimler: [{ skillId: "defence", seviye: 40 }],
    satisFiyati: 900
  },
  {
    id: "serpent_amulet",
    isim: "Yılan Kolyesi",
    ikon: "🐍",
    slot: "amulet",
    saldiriBonusu: 9,
    isabetBonusu: 22,
    gereksinimler: [{ skillId: "attack", seviye: 40 }],
    satisFiyati: 850
  },
  {
    id: "warden_cape",
    isim: "Bekçi Pelerini",
    ikon: "🧣",
    slot: "cape",
    savunmaBonusu: 22,
    isabetBonusu: 12,
    gereksinimler: [{ skillId: "defence", seviye: 42 }],
    satisFiyati: 780
  },
  {
    id: "ash_helm",
    isim: "Kül Miğferi",
    ikon: "🪖",
    slot: "helmet",
    savunmaBonusu: 30,
    gereksinimler: [{ skillId: "defence", seviye: 55 }],
    satisFiyati: 1400
  },
  {
    id: "flame_ring",
    isim: "Alev Yüzüğü",
    ikon: "💍",
    slot: "ring",
    saldiriBonusu: 16,
    isabetBonusu: 26,
    gereksinimler: [{ skillId: "attack", seviye: 55 }],
    satisFiyati: 1600
  },
  {
    id: "drake_scale_body",
    isim: "Ejder Pulu Zırh",
    ikon: "🐲",
    slot: "body",
    savunmaBonusu: 62,
    gereksinimler: [{ skillId: "defence", seviye: 58 }],
    satisFiyati: 2600
  },
  {
    id: "knight_greaves",
    isim: "Şövalye Dizliği",
    ikon: "👖",
    slot: "legs",
    savunmaBonusu: 52,
    gereksinimler: [{ skillId: "defence", seviye: 68 }],
    satisFiyati: 3200
  },
  {
    id: "void_boots",
    isim: "Boşluk Botu",
    ikon: "🥾",
    slot: "boots",
    savunmaBonusu: 28,
    isabetBonusu: 18,
    gereksinimler: [{ skillId: "defence", seviye: 68 }],
    satisFiyati: 2900
  },
  {
    id: "shadow_crown",
    isim: "Gölge Tacı",
    ikon: "👑",
    slot: "helmet",
    savunmaBonusu: 58,
    saldiriBonusu: 14,
    isabetBonusu: 34,
    gereksinimler: [{ skillId: "defence", seviye: 75 }],
    satisFiyati: 6500
  },

  // ---------------- DÜKKÂN ----------------
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