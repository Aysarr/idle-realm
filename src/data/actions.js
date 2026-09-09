// ============================================================
// AKSİYONLAR — YENİ FORMAT
//
// Her aksiyon şu alanları kullanabilir:
//   seviyeGerekli : bu seviyeden önce kilitli (yazılmazsa 1 sayılır)
//   girdiler      : tüketilen eşyalar [{ itemId, miktar }, ...]
//   ciktilar      : her seferinde kesin üretilenler [{ itemId, miktar }]
//   sansliCiktilar: şansa bağlı yan ürünler [{ itemId, miktar, sans }]
//
// girdiler yazılmazsa "bedava toplama" aksiyonu olur.
// ============================================================

export let actions = [
  // ---------- ODUNCU ----------
  {
    id: "chop_normal_tree",
    isim: "Normal Ağaç Kes",
    skillId: "woodcutting",
    seviyeGerekli: 1,
    sureMs: 3000,
    xp: 10,
    ciktilar: [{ itemId: "log_normal", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.05 }]
  },

  // ---------- MADENCİLİK ----------
  {
    id: "mine_copper",
    isim: "Bakır Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 1,
    sureMs: 3200,
    xp: 12,
    ciktilar: [{ itemId: "ore_copper", miktar: 1 }]
  },

  // ---------- BALIKÇILIK ----------
  {
    id: "fish_sardine_action",
    isim: "Sardalya Tut",
    skillId: "fishing",
    seviyeGerekli: 1,
    sureMs: 2800,
    xp: 8,
    ciktilar: [{ itemId: "fish_sardine", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.03 }]
  },

  // ---------- ATEŞ YAKMA ----------
  {
    id: "burn_normal_log",
    isim: "Kütük Yak",
    skillId: "firemaking",
    seviyeGerekli: 1,
    sureMs: 3500,
    xp: 14,
    girdiler: [{ itemId: "log_normal", miktar: 2 }],
    ciktilar: [{ itemId: "coal", miktar: 1 }]
  },

  // ---------- AŞÇILIK ----------
  {
    id: "cook_sardine_action",
    isim: "Sardalya Pişir",
    skillId: "cooking",
    seviyeGerekli: 1,
    sureMs: 2500,
    xp: 6,
    girdiler: [{ itemId: "fish_sardine", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_sardine", miktar: 1 }]
  },

  // ---------- DEMİRCİLİK ----------
  {
    id: "smith_arrow_tip_action",
    isim: "Ok Ucu Dök",
    skillId: "smithing",
    seviyeGerekli: 1,
    sureMs: 3000,
    xp: 10,
    girdiler: [
      { itemId: "ore_copper", miktar: 1 },
      { itemId: "coal", miktar: 1 }
    ],
    ciktilar: [{ itemId: "arrow_tip", miktar: 5 }]
  },
  {
    id: "smith_bronze_sword_action",
    isim: "Bronz Kılıç Yap",
    skillId: "smithing",
    seviyeGerekli: 2,
    sureMs: 4000,
    xp: 15,
    girdiler: [
      { itemId: "ore_copper", miktar: 2 },
      { itemId: "coal", miktar: 1 }
    ],
    ciktilar: [{ itemId: "bronze_sword", miktar: 1 }]
  },
  {
    id: "smith_bronze_helmet_action",
    isim: "Bronz Kask Yap",
    skillId: "smithing",
    seviyeGerekli: 4,
    sureMs: 4500,
    xp: 18,
    girdiler: [
      { itemId: "ore_copper", miktar: 3 },
      { itemId: "coal", miktar: 1 }
    ],
    ciktilar: [{ itemId: "bronze_helmet", miktar: 1 }]
  },
  {
    id: "smith_bronze_shield_action",
    isim: "Bronz Kalkan Yap",
    skillId: "smithing",
    seviyeGerekli: 6,
    sureMs: 5000,
    xp: 22,
    girdiler: [
      { itemId: "ore_copper", miktar: 4 },
      { itemId: "coal", miktar: 2 }
    ],
    ciktilar: [{ itemId: "bronze_shield", miktar: 1 }]
  },
  {
    id: "smith_bronze_body_action",
    isim: "Bronz Zırh Yap",
    skillId: "smithing",
    seviyeGerekli: 8,
    sureMs: 6000,
    xp: 28,
    girdiler: [
      { itemId: "ore_copper", miktar: 5 },
      { itemId: "coal", miktar: 2 }
    ],
    ciktilar: [{ itemId: "bronze_body", miktar: 1 }]
  },

  // ---------- MARANGOZLUK ----------
  {
    id: "craft_arrow_shaft_action",
    isim: "Ok Gövdesi Yont",
    skillId: "fletching",
    seviyeGerekli: 1,
    sureMs: 3000,
    xp: 9,
    girdiler: [
      { itemId: "log_normal", miktar: 1 },
      { itemId: "feather", miktar: 2 }
    ],
    ciktilar: [{ itemId: "arrow_shaft", miktar: 5 }]
  },
  {
    id: "craft_bronze_arrow_action",
    isim: "Bronz Ok Yap",
    skillId: "fletching",
    seviyeGerekli: 3,
    sureMs: 3500,
    xp: 16,
    girdiler: [
      { itemId: "arrow_shaft", miktar: 5 },
      { itemId: "arrow_tip", miktar: 5 }
    ],
    ciktilar: [{ itemId: "bronze_arrow", miktar: 5 }]
  },
  {
    id: "craft_short_bow_action",
    isim: "Kısa Yay Yap",
    skillId: "fletching",
    seviyeGerekli: 5,
    sureMs: 6000,
    xp: 35,
    girdiler: [{ itemId: "log_normal", miktar: 4 }],
    ciktilar: [{ itemId: "short_bow", miktar: 1 }]
  }
];