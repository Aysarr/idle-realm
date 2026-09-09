// ============================================================
// AKSİYONLAR
//
// Her aksiyon şu alanları kullanabilir:
//   seviyeGerekli        : bu seviyeden önce kilitli (yazılmazsa 1)
//   gerekliAletKademesi  : bu alet kademesi gerekir (yazılmazsa 1)
//   girdiler             : tüketilen eşyalar [{ itemId, miktar }]
//   ciktilar             : kesin üretilenler [{ itemId, miktar }]
//   sansliCiktilar       : şansa bağlı yan ürünler [{ itemId, miktar, sans }]
//
// KADEME TABLOSU (bkz. ILERLEME_TASARIMI.md):
//   Toplama: T1 Sv1 3.0sn 10xp · T2 Sv8 3.4sn 12xp · T3 Sv16 3.7sn 15xp
//            T4 Sv24 4.1sn 18xp · T5 Sv32 4.4sn 22xp · T6 Sv40 4.8sn 26xp
//   Üretim : T1 Sv1 · T2 Sv15 · T3 Sv30 · T4 Sv45 ...
//
// ALET KADEMELERİ: 2=Demir(Sv16) · 3=Çelik(Sv32) · 4=Mithril(Sv48)
// ============================================================

export let actions = [
  // ================================================================
  // ODUNCU
  // ================================================================
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
  {
    id: "chop_poplar",
    isim: "Kavak Kes",
    skillId: "woodcutting",
    seviyeGerekli: 8,
    sureMs: 3400,
    xp: 12,
    ciktilar: [{ itemId: "log_poplar", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.05 }]
  },
  {
    id: "chop_oak",
    isim: "Meşe Kes",
    skillId: "woodcutting",
    seviyeGerekli: 16,
    gerekliAletKademesi: 2,
    sureMs: 3700,
    xp: 15,
    ciktilar: [{ itemId: "log_oak", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.06 }]
  },
  {
    id: "chop_beech",
    isim: "Kayın Kes",
    skillId: "woodcutting",
    seviyeGerekli: 24,
    gerekliAletKademesi: 2,
    sureMs: 4100,
    xp: 18,
    ciktilar: [{ itemId: "log_beech", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.06 }]
  },
  {
    id: "chop_willow",
    isim: "Söğüt Kes",
    skillId: "woodcutting",
    seviyeGerekli: 32,
    gerekliAletKademesi: 3,
    sureMs: 4400,
    xp: 22,
    ciktilar: [{ itemId: "log_willow", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.07 }]
  },
  {
    id: "chop_pine",
    isim: "Çam Kes",
    skillId: "woodcutting",
    seviyeGerekli: 40,
    gerekliAletKademesi: 3,
    sureMs: 4800,
    xp: 26,
    ciktilar: [{ itemId: "log_pine", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.07 }]
  },

  // ================================================================
  // MADENCİLİK
  // ================================================================
  {
    id: "mine_copper",
    isim: "Bakır Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 1,
    sureMs: 3000,
    xp: 10,
    ciktilar: [{ itemId: "ore_copper", miktar: 1 }]
  },
  {
    id: "mine_tin",
    isim: "Kalay Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 8,
    sureMs: 3400,
    xp: 12,
    ciktilar: [{ itemId: "ore_tin", miktar: 1 }]
  },
  {
    id: "mine_iron",
    isim: "Demir Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 16,
    gerekliAletKademesi: 2,
    sureMs: 3700,
    xp: 15,
    ciktilar: [{ itemId: "ore_iron", miktar: 1 }]
  },
  {
    id: "mine_silver",
    isim: "Gümüş Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 24,
    gerekliAletKademesi: 2,
    sureMs: 4100,
    xp: 18,
    ciktilar: [{ itemId: "ore_silver", miktar: 1 }]
  },
  {
    id: "mine_cobalt",
    isim: "Kobalt Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 32,
    gerekliAletKademesi: 3,
    sureMs: 4400,
    xp: 22,
    ciktilar: [{ itemId: "ore_cobalt", miktar: 1 }]
  },
  {
    id: "mine_gold",
    isim: "Altın Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 40,
    gerekliAletKademesi: 3,
    sureMs: 4800,
    xp: 26,
    ciktilar: [{ itemId: "ore_gold", miktar: 1 }]
  },

  // ================================================================
  // BALIKÇILIK
  // ================================================================
  {
    id: "fish_sardine_action",
    isim: "Sardalya Tut",
    skillId: "fishing",
    seviyeGerekli: 1,
    sureMs: 3000,
    xp: 10,
    ciktilar: [{ itemId: "fish_sardine", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.03 }]
  },
  {
    id: "fish_anchovy_action",
    isim: "Hamsi Tut",
    skillId: "fishing",
    seviyeGerekli: 8,
    sureMs: 3400,
    xp: 12,
    ciktilar: [{ itemId: "fish_anchovy", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.03 }]
  },
  {
    id: "fish_trout_action",
    isim: "Alabalık Tut",
    skillId: "fishing",
    seviyeGerekli: 16,
    gerekliAletKademesi: 2,
    sureMs: 3700,
    xp: 15,
    ciktilar: [{ itemId: "fish_trout", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.04 }]
  },
  {
    id: "fish_bass_action",
    isim: "Levrek Tut",
    skillId: "fishing",
    seviyeGerekli: 24,
    gerekliAletKademesi: 2,
    sureMs: 4100,
    xp: 18,
    ciktilar: [{ itemId: "fish_bass", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.04 }]
  },
  {
    id: "fish_salmon_action",
    isim: "Somon Tut",
    skillId: "fishing",
    seviyeGerekli: 32,
    gerekliAletKademesi: 3,
    sureMs: 4400,
    xp: 22,
    ciktilar: [{ itemId: "fish_salmon", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.05 }]
  },
  {
    id: "fish_shrimp_action",
    isim: "Karides Avla",
    skillId: "fishing",
    seviyeGerekli: 40,
    gerekliAletKademesi: 3,
    sureMs: 4800,
    xp: 26,
    ciktilar: [{ itemId: "fish_shrimp", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.05 }]
  },

  // ================================================================
  // ATEŞ YAKMA
  // Üst kademeler yeni ürün açmaz, aynı yakıtı DAHA VERİMLİ üretir.
  // Sv 30'da yeni bir yakıt TÜRÜ açılır: Kızgın Kömür.
  // ================================================================
  {
    id: "burn_normal_log",
    isim: "Normal Kütük Yak",
    skillId: "firemaking",
    seviyeGerekli: 1,
    sureMs: 3500,
    xp: 14,
    girdiler: [{ itemId: "log_normal", miktar: 2 }],
    ciktilar: [{ itemId: "coal", miktar: 1 }]
  },
  {
    id: "burn_poplar_log",
    isim: "Kavak Yak",
    skillId: "firemaking",
    seviyeGerekli: 8,
    sureMs: 3700,
    xp: 17,
    girdiler: [{ itemId: "log_poplar", miktar: 2 }],
    ciktilar: [{ itemId: "coal", miktar: 1 }]
  },
  {
    id: "burn_oak_log",
    isim: "Meşe Yak",
    skillId: "firemaking",
    seviyeGerekli: 15,
    sureMs: 4000,
    xp: 22,
    girdiler: [{ itemId: "log_oak", miktar: 2 }],
    ciktilar: [{ itemId: "coal", miktar: 2 }]
  },
  {
    id: "burn_beech_log",
    isim: "Kayın Yak",
    skillId: "firemaking",
    seviyeGerekli: 24,
    sureMs: 4300,
    xp: 28,
    girdiler: [{ itemId: "log_beech", miktar: 2 }],
    ciktilar: [{ itemId: "coal", miktar: 3 }]
  },
  {
    id: "burn_willow_log",
    isim: "Söğüt Yak",
    skillId: "firemaking",
    seviyeGerekli: 30,
    sureMs: 4800,
    xp: 38,
    girdiler: [{ itemId: "log_willow", miktar: 3 }],
    ciktilar: [{ itemId: "hot_coal", miktar: 1 }]
  },
  {
    id: "burn_pine_log",
    isim: "Çam Yak",
    skillId: "firemaking",
    seviyeGerekli: 40,
    sureMs: 5200,
    xp: 48,
    girdiler: [{ itemId: "log_pine", miktar: 3 }],
    ciktilar: [{ itemId: "hot_coal", miktar: 2 }]
  },

  // ================================================================
  // AŞÇILIK
  // ================================================================
  {
    id: "cook_sardine_action",
    isim: "Sardalya Pişir",
    skillId: "cooking",
    seviyeGerekli: 1,
    sureMs: 2800,
    xp: 8,
    girdiler: [{ itemId: "fish_sardine", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_sardine", miktar: 1 }]
  },
  {
    id: "cook_anchovy_action",
    isim: "Hamsi Pişir",
    skillId: "cooking",
    seviyeGerekli: 8,
    sureMs: 3000,
    xp: 10,
    girdiler: [{ itemId: "fish_anchovy", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_anchovy", miktar: 1 }]
  },
  {
    id: "cook_trout_action",
    isim: "Alabalık Pişir",
    skillId: "cooking",
    seviyeGerekli: 16,
    sureMs: 3400,
    xp: 16,
    girdiler: [{ itemId: "fish_trout", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_trout", miktar: 1 }]
  },
  {
    id: "cook_bass_action",
    isim: "Levrek Pişir",
    skillId: "cooking",
    seviyeGerekli: 24,
    sureMs: 3800,
    xp: 22,
    girdiler: [{ itemId: "fish_bass", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_bass", miktar: 1 }]
  },
  {
    id: "cook_salmon_action",
    isim: "Somon Pişir",
    skillId: "cooking",
    seviyeGerekli: 32,
    sureMs: 4200,
    xp: 30,
    girdiler: [{ itemId: "fish_salmon", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_salmon", miktar: 1 }]
  },
  {
    id: "cook_shrimp_action",
    isim: "Karides Pişir",
    skillId: "cooking",
    seviyeGerekli: 40,
    sureMs: 4600,
    xp: 40,
    girdiler: [{ itemId: "fish_shrimp", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_shrimp", miktar: 1 }]
  },

  // ================================================================
  // DEMİRCİLİK — BRONZ SETİ (T1)
  // Bronz, Bakır + Kalay ister; bu Kalay madenciliğini canlı tutar.
  // ================================================================
  {
    id: "smith_arrow_tip_action",
    isim: "Bronz Ok Ucu Dök",
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
      { itemId: "ore_tin", miktar: 1 },
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
      { itemId: "ore_tin", miktar: 1 },
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
      { itemId: "ore_tin", miktar: 2 },
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
      { itemId: "ore_tin", miktar: 2 },
      { itemId: "coal", miktar: 2 }
    ],
    ciktilar: [{ itemId: "bronze_body", miktar: 1 }]
  },

  // ================================================================
  // DEMİRCİLİK — DEMİR SETİ (T2)
  // ================================================================
  {
    id: "smith_iron_arrow_tip",
    isim: "Demir Ok Ucu Dök",
    skillId: "smithing",
    seviyeGerekli: 15,
    sureMs: 3400,
    xp: 20,
    girdiler: [
      { itemId: "ore_iron", miktar: 1 },
      { itemId: "coal", miktar: 1 }
    ],
    ciktilar: [{ itemId: "iron_arrow_tip", miktar: 5 }]
  },
  {
    id: "smith_iron_sword",
    isim: "Demir Kılıç Yap",
    skillId: "smithing",
    seviyeGerekli: 16,
    sureMs: 4200,
    xp: 30,
    girdiler: [
      { itemId: "ore_iron", miktar: 2 },
      { itemId: "coal", miktar: 1 }
    ],
    ciktilar: [{ itemId: "iron_sword", miktar: 1 }]
  },
  {
    id: "smith_iron_helmet",
    isim: "Demir Kask Yap",
    skillId: "smithing",
    seviyeGerekli: 18,
    sureMs: 4500,
    xp: 34,
    girdiler: [
      { itemId: "ore_iron", miktar: 3 },
      { itemId: "coal", miktar: 1 }
    ],
    ciktilar: [{ itemId: "iron_helmet", miktar: 1 }]
  },
  {
    id: "smith_iron_shield",
    isim: "Demir Kalkan Yap",
    skillId: "smithing",
    seviyeGerekli: 20,
    sureMs: 4800,
    xp: 38,
    girdiler: [
      { itemId: "ore_iron", miktar: 4 },
      { itemId: "coal", miktar: 2 }
    ],
    ciktilar: [{ itemId: "iron_shield", miktar: 1 }]
  },
  {
    id: "smith_iron_body",
    isim: "Demir Zırh Yap",
    skillId: "smithing",
    seviyeGerekli: 22,
    sureMs: 5400,
    xp: 46,
    girdiler: [
      { itemId: "ore_iron", miktar: 5 },
      { itemId: "coal", miktar: 2 }
    ],
    ciktilar: [{ itemId: "iron_body", miktar: 1 }]
  },

  // ================================================================
  // DEMİRCİLİK — ÇELİK SETİ (T3)
  //
  // KRİTİK TASARIM: Çelik ayrı bir cevher İSTEMEZ. 2 Demir + 2 Kömür
  // ile yapılır. Böylece Demir madenciliği çok daha uzun süre canlı
  // kalır — yeni cevher eklemek yerine eskisini daha çok tüketmek,
  // "alt kademe ölmesin" ilkesinin en temiz uygulamasıdır.
  // ================================================================
  {
    id: "smith_steel_arrow_tip",
    isim: "Çelik Ok Ucu Dök",
    skillId: "smithing",
    seviyeGerekli: 30,
    sureMs: 4000,
    xp: 42,
    girdiler: [
      { itemId: "ore_iron", miktar: 2 },
      { itemId: "coal", miktar: 2 }
    ],
    ciktilar: [{ itemId: "steel_arrow_tip", miktar: 5 }]
  },
  {
    id: "smith_steel_sword",
    isim: "Çelik Kılıç Yap",
    skillId: "smithing",
    seviyeGerekli: 31,
    sureMs: 5000,
    xp: 60,
    girdiler: [
      { itemId: "ore_iron", miktar: 4 },
      { itemId: "coal", miktar: 4 }
    ],
    ciktilar: [{ itemId: "steel_sword", miktar: 1 }]
  },
  {
    id: "smith_steel_helmet",
    isim: "Çelik Kask Yap",
    skillId: "smithing",
    seviyeGerekli: 33,
    sureMs: 5300,
    xp: 68,
    girdiler: [
      { itemId: "ore_iron", miktar: 6 },
      { itemId: "coal", miktar: 4 }
    ],
    ciktilar: [{ itemId: "steel_helmet", miktar: 1 }]
  },
  {
    id: "smith_steel_shield",
    isim: "Çelik Kalkan Yap",
    skillId: "smithing",
    seviyeGerekli: 35,
    sureMs: 5600,
    xp: 76,
    girdiler: [
      { itemId: "ore_iron", miktar: 8 },
      { itemId: "coal", miktar: 6 }
    ],
    ciktilar: [{ itemId: "steel_shield", miktar: 1 }]
  },
  {
    id: "smith_steel_legs",
    isim: "Çelik Pantolon Yap",
    skillId: "smithing",
    seviyeGerekli: 37,
    sureMs: 5900,
    xp: 84,
    girdiler: [
      { itemId: "ore_iron", miktar: 9 },
      { itemId: "coal", miktar: 6 },
      { itemId: "ore_cobalt", miktar: 1 }
    ],
    ciktilar: [{ itemId: "steel_legs", miktar: 1 }]
  },
  {
    id: "smith_steel_body",
    isim: "Çelik Zırh Yap",
    skillId: "smithing",
    seviyeGerekli: 40,
    sureMs: 6400,
    xp: 96,
    girdiler: [
      { itemId: "ore_iron", miktar: 10 },
      { itemId: "coal", miktar: 8 },
      { itemId: "ore_cobalt", miktar: 2 }
    ],
    ciktilar: [{ itemId: "steel_body", miktar: 1 }]
  },

  // ================================================================
  // MARANGOZLUK — T1
  // ================================================================
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
    sureMs: 4500,
    xp: 30,
    girdiler: [{ itemId: "log_normal", miktar: 4 }],
    ciktilar: [{ itemId: "short_bow", miktar: 1 }]
  },

  // ================================================================
  // MARANGOZLUK — T2
  // Üst kütük daha çok gövde verir: "aynı ürün, daha iyi oran"
  // ================================================================
  {
    id: "craft_oak_shaft",
    isim: "Meşe Ok Gövdesi Yont",
    skillId: "fletching",
    seviyeGerekli: 15,
    sureMs: 3400,
    xp: 14,
    girdiler: [
      { itemId: "log_oak", miktar: 1 },
      { itemId: "feather", miktar: 2 }
    ],
    ciktilar: [{ itemId: "arrow_shaft", miktar: 8 }]
  },
  {
    id: "craft_oak_bow",
    isim: "Meşe Yay Yap",
    skillId: "fletching",
    seviyeGerekli: 15,
    sureMs: 5000,
    xp: 42,
    girdiler: [{ itemId: "log_oak", miktar: 5 }],
    ciktilar: [{ itemId: "oak_bow", miktar: 1 }]
  },
  {
    id: "craft_iron_arrow",
    isim: "Demir Ok Yap",
    skillId: "fletching",
    seviyeGerekli: 18,
    sureMs: 3700,
    xp: 22,
    girdiler: [
      { itemId: "arrow_shaft", miktar: 5 },
      { itemId: "iron_arrow_tip", miktar: 5 }
    ],
    ciktilar: [{ itemId: "iron_arrow", miktar: 5 }]
  },

  // ================================================================
  // MARANGOZLUK — T3
  // ================================================================
  {
    id: "craft_willow_shaft",
    isim: "Söğüt Ok Gövdesi Yont",
    skillId: "fletching",
    seviyeGerekli: 30,
    sureMs: 3800,
    xp: 24,
    girdiler: [
      { itemId: "log_willow", miktar: 1 },
      { itemId: "feather", miktar: 2 }
    ],
    ciktilar: [{ itemId: "arrow_shaft", miktar: 12 }]
  },
  {
    id: "craft_willow_bow",
    isim: "Söğüt Yay Yap",
    skillId: "fletching",
    seviyeGerekli: 30,
    sureMs: 5600,
    xp: 78,
    girdiler: [
      { itemId: "log_willow", miktar: 6 },
      { itemId: "spider_silk", miktar: 2 }
    ],
    ciktilar: [{ itemId: "willow_bow", miktar: 1 }]
  },
  {
    id: "craft_steel_arrow",
    isim: "Çelik Ok Yap",
    skillId: "fletching",
    seviyeGerekli: 33,
    sureMs: 4100,
    xp: 36,
    girdiler: [
      { itemId: "arrow_shaft", miktar: 5 },
      { itemId: "steel_arrow_tip", miktar: 5 }
    ],
    ciktilar: [{ itemId: "steel_arrow", miktar: 5 }]
  }
];