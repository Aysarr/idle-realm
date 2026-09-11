// ============================================================
// AKSİYONLAR
//
// KADEME KALIBI (bkz. ILERLEME_TASARIMI.md):
//   Toplama: 15 kademe, Sv 1/8/16/24/32/40/48/55/62/68/74/80/85/90/95
//   Süre 3.0sn -> 8.0sn, XP 10 -> 150 (XP/saat ~6 kat artar)
//   Üst kademe DAHA YAVAŞ ama DAHA ÇOK XP verir; böylece eğri
//   düzleşmez ve oyun erken bitmez.
//
// ALET KADEMELERİ: 1=Bronz 2=Demir(Sv16) 3=Çelik(Sv32)
//                  4=Mithril(Sv48) 5=Adamantit(Sv62) 6=Ejderha(Sv80)
// ============================================================

export let actions = [
  // ================= ODUNCU =================
  {
    id: "woodcutting_t1",
    isim: "Normal Ağaç Kes",
    skillId: "woodcutting",
    seviyeGerekli: 1,
    sureMs: 3000,
    xp: 10,
    ciktilar: [{ itemId: "log_normal", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.05 }]
  },
  {
    id: "woodcutting_t2",
    isim: "Kavak Kes",
    skillId: "woodcutting",
    seviyeGerekli: 8,
    sureMs: 3400,
    xp: 12,
    ciktilar: [{ itemId: "log_poplar", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.054 }]
  },
  {
    id: "woodcutting_t3",
    isim: "Meşe Kes",
    skillId: "woodcutting",
    seviyeGerekli: 16,
    gerekliAletKademesi: 2,
    sureMs: 3700,
    xp: 15,
    ciktilar: [{ itemId: "log_oak", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.058 }]
  },
  {
    id: "woodcutting_t4",
    isim: "Kayın Kes",
    skillId: "woodcutting",
    seviyeGerekli: 24,
    gerekliAletKademesi: 2,
    sureMs: 4100,
    xp: 18,
    ciktilar: [{ itemId: "log_beech", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.062 }]
  },
  {
    id: "woodcutting_t5",
    isim: "Söğüt Kes",
    skillId: "woodcutting",
    seviyeGerekli: 32,
    gerekliAletKademesi: 3,
    sureMs: 4400,
    xp: 22,
    ciktilar: [{ itemId: "log_willow", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.066 }]
  },
  {
    id: "woodcutting_t6",
    isim: "Çam Kes",
    skillId: "woodcutting",
    seviyeGerekli: 40,
    gerekliAletKademesi: 3,
    sureMs: 4800,
    xp: 26,
    ciktilar: [{ itemId: "log_pine", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.07 }]
  },
  {
    id: "woodcutting_t7",
    isim: "Akçaağaç Kes",
    skillId: "woodcutting",
    seviyeGerekli: 48,
    gerekliAletKademesi: 4,
    sureMs: 5100,
    xp: 32,
    ciktilar: [{ itemId: "log_maple", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.074 }]
  },
  {
    id: "woodcutting_t8",
    isim: "Ceviz Kes",
    skillId: "woodcutting",
    seviyeGerekli: 55,
    gerekliAletKademesi: 4,
    sureMs: 5500,
    xp: 39,
    ciktilar: [{ itemId: "log_walnut", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.078 }]
  },
  {
    id: "woodcutting_t9",
    isim: "Porsuk Kes",
    skillId: "woodcutting",
    seviyeGerekli: 62,
    gerekliAletKademesi: 5,
    sureMs: 5900,
    xp: 47,
    ciktilar: [{ itemId: "log_yew", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.082 }]
  },
  {
    id: "woodcutting_t10",
    isim: "Abanoz Kes",
    skillId: "woodcutting",
    seviyeGerekli: 68,
    gerekliAletKademesi: 5,
    sureMs: 6200,
    xp: 57,
    ciktilar: [{ itemId: "log_ebony", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.086 }]
  },
  {
    id: "woodcutting_t11",
    isim: "Sedir Kes",
    skillId: "woodcutting",
    seviyeGerekli: 74,
    gerekliAletKademesi: 5,
    sureMs: 6600,
    xp: 69,
    ciktilar: [{ itemId: "log_cedar", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.09 }]
  },
  {
    id: "woodcutting_t12",
    isim: "Demirtahta Kes",
    skillId: "woodcutting",
    seviyeGerekli: 80,
    gerekliAletKademesi: 6,
    sureMs: 6900,
    xp: 84,
    ciktilar: [{ itemId: "log_ironwood", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.094 }]
  },
  {
    id: "woodcutting_t13",
    isim: "Sihirli Ağaç Kes",
    skillId: "woodcutting",
    seviyeGerekli: 85,
    gerekliAletKademesi: 6,
    sureMs: 7300,
    xp: 102,
    ciktilar: [{ itemId: "log_magic", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.098 }]
  },
  {
    id: "woodcutting_t14",
    isim: "Gölge Ağacı Kes",
    skillId: "woodcutting",
    seviyeGerekli: 90,
    gerekliAletKademesi: 6,
    sureMs: 7600,
    xp: 124,
    ciktilar: [{ itemId: "log_shadow", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.102 }]
  },
  {
    id: "woodcutting_t15",
    isim: "Dünya Ağacı Kes",
    skillId: "woodcutting",
    seviyeGerekli: 95,
    gerekliAletKademesi: 6,
    sureMs: 8000,
    xp: 150,
    ciktilar: [{ itemId: "log_world", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.106 }]
  },

  // ================= MADENCİLİK =================
  {
    id: "mining_t1",
    isim: "Bakır Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 1,
    sureMs: 3000,
    xp: 10,
    ciktilar: [{ itemId: "ore_copper", miktar: 1 }]
  },
  {
    id: "mining_t2",
    isim: "Kalay Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 8,
    sureMs: 3400,
    xp: 12,
    ciktilar: [{ itemId: "ore_tin", miktar: 1 }]
  },
  {
    id: "mining_t3",
    isim: "Demir Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 16,
    gerekliAletKademesi: 2,
    sureMs: 3700,
    xp: 15,
    ciktilar: [{ itemId: "ore_iron", miktar: 1 }]
  },
  {
    id: "mining_t4",
    isim: "Gümüş Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 24,
    gerekliAletKademesi: 2,
    sureMs: 4100,
    xp: 18,
    ciktilar: [{ itemId: "ore_silver", miktar: 1 }]
  },
  {
    id: "mining_t5",
    isim: "Kobalt Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 32,
    gerekliAletKademesi: 3,
    sureMs: 4400,
    xp: 22,
    ciktilar: [{ itemId: "ore_cobalt", miktar: 1 }]
  },
  {
    id: "mining_t6",
    isim: "Altın Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 40,
    gerekliAletKademesi: 3,
    sureMs: 4800,
    xp: 26,
    ciktilar: [{ itemId: "ore_gold", miktar: 1 }]
  },
  {
    id: "mining_t7",
    isim: "Mithril Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 48,
    gerekliAletKademesi: 4,
    sureMs: 5100,
    xp: 32,
    ciktilar: [{ itemId: "ore_mithril", miktar: 1 }]
  },
  {
    id: "mining_t8",
    isim: "Ametist Çıkar",
    skillId: "mining",
    seviyeGerekli: 55,
    gerekliAletKademesi: 4,
    sureMs: 5500,
    xp: 39,
    ciktilar: [{ itemId: "ore_amethyst", miktar: 1 }]
  },
  {
    id: "mining_t9",
    isim: "Adamantit Cevheri Kaz",
    skillId: "mining",
    seviyeGerekli: 62,
    gerekliAletKademesi: 5,
    sureMs: 5900,
    xp: 47,
    ciktilar: [{ itemId: "ore_adamant", miktar: 1 }]
  },
  {
    id: "mining_t10",
    isim: "Obsidyen Kır",
    skillId: "mining",
    seviyeGerekli: 68,
    gerekliAletKademesi: 5,
    sureMs: 6200,
    xp: 57,
    ciktilar: [{ itemId: "ore_obsidian", miktar: 1 }]
  },
  {
    id: "mining_t11",
    isim: "Yakut Çıkar",
    skillId: "mining",
    seviyeGerekli: 74,
    gerekliAletKademesi: 5,
    sureMs: 6600,
    xp: 69,
    ciktilar: [{ itemId: "ore_ruby", miktar: 1 }]
  },
  {
    id: "mining_t12",
    isim: "Elmas Çıkar",
    skillId: "mining",
    seviyeGerekli: 80,
    gerekliAletKademesi: 6,
    sureMs: 6900,
    xp: 84,
    ciktilar: [{ itemId: "ore_diamond", miktar: 1 }]
  },
  {
    id: "mining_t13",
    isim: "Ejder Taşı Kaz",
    skillId: "mining",
    seviyeGerekli: 85,
    gerekliAletKademesi: 6,
    sureMs: 7300,
    xp: 102,
    ciktilar: [{ itemId: "ore_dragonstone", miktar: 1 }]
  },
  {
    id: "mining_t14",
    isim: "Gölge Taşı Kaz",
    skillId: "mining",
    seviyeGerekli: 90,
    gerekliAletKademesi: 6,
    sureMs: 7600,
    xp: 124,
    ciktilar: [{ itemId: "ore_shadowstone", miktar: 1 }]
  },
  {
    id: "mining_t15",
    isim: "Yıldız Taşı Kaz",
    skillId: "mining",
    seviyeGerekli: 95,
    gerekliAletKademesi: 6,
    sureMs: 8000,
    xp: 150,
    ciktilar: [{ itemId: "ore_starstone", miktar: 1 }]
  },

  // ================= BALIKÇILIK =================
  {
    id: "fishing_t1",
    isim: "Sardalya Tut",
    skillId: "fishing",
    seviyeGerekli: 1,
    sureMs: 3000,
    xp: 10,
    ciktilar: [{ itemId: "fish_sardine", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.03 }]
  },
  {
    id: "fishing_t2",
    isim: "Hamsi Tut",
    skillId: "fishing",
    seviyeGerekli: 8,
    sureMs: 3400,
    xp: 12,
    ciktilar: [{ itemId: "fish_anchovy", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.033 }]
  },
  {
    id: "fishing_t3",
    isim: "Alabalık Tut",
    skillId: "fishing",
    seviyeGerekli: 16,
    gerekliAletKademesi: 2,
    sureMs: 3700,
    xp: 15,
    ciktilar: [{ itemId: "fish_trout", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.036 }]
  },
  {
    id: "fishing_t4",
    isim: "Levrek Tut",
    skillId: "fishing",
    seviyeGerekli: 24,
    gerekliAletKademesi: 2,
    sureMs: 4100,
    xp: 18,
    ciktilar: [{ itemId: "fish_bass", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.039 }]
  },
  {
    id: "fishing_t5",
    isim: "Somon Tut",
    skillId: "fishing",
    seviyeGerekli: 32,
    gerekliAletKademesi: 3,
    sureMs: 4400,
    xp: 22,
    ciktilar: [{ itemId: "fish_salmon", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.042 }]
  },
  {
    id: "fishing_t6",
    isim: "Karides Avla",
    skillId: "fishing",
    seviyeGerekli: 40,
    gerekliAletKademesi: 3,
    sureMs: 4800,
    xp: 26,
    ciktilar: [{ itemId: "fish_shrimp", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.045 }]
  },
  {
    id: "fishing_t7",
    isim: "Ton Balığı Tut",
    skillId: "fishing",
    seviyeGerekli: 48,
    gerekliAletKademesi: 4,
    sureMs: 5100,
    xp: 32,
    ciktilar: [{ itemId: "fish_tuna", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.048 }]
  },
  {
    id: "fishing_t8",
    isim: "Istakoz Avla",
    skillId: "fishing",
    seviyeGerekli: 55,
    gerekliAletKademesi: 4,
    sureMs: 5500,
    xp: 39,
    ciktilar: [{ itemId: "fish_lobster", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.051 }]
  },
  {
    id: "fishing_t9",
    isim: "Kılıçbalığı Tut",
    skillId: "fishing",
    seviyeGerekli: 62,
    gerekliAletKademesi: 5,
    sureMs: 5900,
    xp: 47,
    ciktilar: [{ itemId: "fish_swordfish", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.054 }]
  },
  {
    id: "fishing_t10",
    isim: "Köpekbalığı Avla",
    skillId: "fishing",
    seviyeGerekli: 68,
    gerekliAletKademesi: 5,
    sureMs: 6200,
    xp: 57,
    ciktilar: [{ itemId: "fish_shark", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.057 }]
  },
  {
    id: "fishing_t11",
    isim: "Kalkan Balığı Tut",
    skillId: "fishing",
    seviyeGerekli: 74,
    gerekliAletKademesi: 5,
    sureMs: 6600,
    xp: 69,
    ciktilar: [{ itemId: "fish_turbot", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.06 }]
  },
  {
    id: "fishing_t12",
    isim: "Ahtapot Avla",
    skillId: "fishing",
    seviyeGerekli: 80,
    gerekliAletKademesi: 6,
    sureMs: 6900,
    xp: 84,
    ciktilar: [{ itemId: "fish_octopus", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.063 }]
  },
  {
    id: "fishing_t13",
    isim: "Ejder Balığı Tut",
    skillId: "fishing",
    seviyeGerekli: 85,
    gerekliAletKademesi: 6,
    sureMs: 7300,
    xp: 102,
    ciktilar: [{ itemId: "fish_dragonfish", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.066 }]
  },
  {
    id: "fishing_t14",
    isim: "Gölge Yılanbalığı Tut",
    skillId: "fishing",
    seviyeGerekli: 90,
    gerekliAletKademesi: 6,
    sureMs: 7600,
    xp: 124,
    ciktilar: [{ itemId: "fish_shadoweel", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.069 }]
  },
  {
    id: "fishing_t15",
    isim: "Yıldız Balığı Tut",
    skillId: "fishing",
    seviyeGerekli: 95,
    gerekliAletKademesi: 6,
    sureMs: 8000,
    xp: 150,
    ciktilar: [{ itemId: "fish_starfish", miktar: 1 }],
    sansliCiktilar: [{ itemId: "feather", miktar: 1, sans: 0.072 }]
  },

  // ================= AŞÇILIK =================
  {
    id: "cooking_t1",
    isim: "Sardalya Pişir",
    skillId: "cooking",
    seviyeGerekli: 1,
    sureMs: 2800,
    xp: 8,
    girdiler: [{ itemId: "fish_sardine", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_sardine", miktar: 1 }]
  },
  {
    id: "cooking_t2",
    isim: "Hamsi Pişir",
    skillId: "cooking",
    seviyeGerekli: 8,
    sureMs: 3200,
    xp: 10,
    girdiler: [{ itemId: "fish_anchovy", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_anchovy", miktar: 1 }]
  },
  {
    id: "cooking_t3",
    isim: "Alabalık Pişir",
    skillId: "cooking",
    seviyeGerekli: 16,
    sureMs: 3500,
    xp: 13,
    girdiler: [{ itemId: "fish_trout", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_trout", miktar: 1 }]
  },
  {
    id: "cooking_t4",
    isim: "Levrek Pişir",
    skillId: "cooking",
    seviyeGerekli: 24,
    sureMs: 3900,
    xp: 15,
    girdiler: [{ itemId: "fish_bass", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_bass", miktar: 1 }]
  },
  {
    id: "cooking_t5",
    isim: "Somon Pişir",
    skillId: "cooking",
    seviyeGerekli: 32,
    sureMs: 4200,
    xp: 19,
    girdiler: [{ itemId: "fish_salmon", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_salmon", miktar: 1 }]
  },
  {
    id: "cooking_t6",
    isim: "Karides Pişir",
    skillId: "cooking",
    seviyeGerekli: 40,
    sureMs: 4600,
    xp: 22,
    girdiler: [{ itemId: "fish_shrimp", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_shrimp", miktar: 1 }]
  },
  {
    id: "cooking_t7",
    isim: "Ton Balığı Pişir",
    skillId: "cooking",
    seviyeGerekli: 48,
    sureMs: 4900,
    xp: 27,
    girdiler: [{ itemId: "fish_tuna", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_tuna", miktar: 1 }]
  },
  {
    id: "cooking_t8",
    isim: "Istakoz Pişir",
    skillId: "cooking",
    seviyeGerekli: 55,
    sureMs: 5300,
    xp: 33,
    girdiler: [{ itemId: "fish_lobster", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_lobster", miktar: 1 }]
  },
  {
    id: "cooking_t9",
    isim: "Kılıçbalığı Pişir",
    skillId: "cooking",
    seviyeGerekli: 62,
    sureMs: 5700,
    xp: 40,
    girdiler: [{ itemId: "fish_swordfish", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_swordfish", miktar: 1 }]
  },
  {
    id: "cooking_t10",
    isim: "Köpekbalığı Pişir",
    skillId: "cooking",
    seviyeGerekli: 68,
    sureMs: 6000,
    xp: 48,
    girdiler: [{ itemId: "fish_shark", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_shark", miktar: 1 }]
  },
  {
    id: "cooking_t11",
    isim: "Kalkan Balığı Pişir",
    skillId: "cooking",
    seviyeGerekli: 74,
    sureMs: 6400,
    xp: 59,
    girdiler: [{ itemId: "fish_turbot", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_turbot", miktar: 1 }]
  },
  {
    id: "cooking_t12",
    isim: "Ahtapot Pişir",
    skillId: "cooking",
    seviyeGerekli: 80,
    sureMs: 6700,
    xp: 71,
    girdiler: [{ itemId: "fish_octopus", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_octopus", miktar: 1 }]
  },
  {
    id: "cooking_t13",
    isim: "Ejder Balığı Pişir",
    skillId: "cooking",
    seviyeGerekli: 85,
    sureMs: 7100,
    xp: 87,
    girdiler: [{ itemId: "fish_dragonfish", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_dragonfish", miktar: 1 }]
  },
  {
    id: "cooking_t14",
    isim: "Gölge Yılanbalığı Pişir",
    skillId: "cooking",
    seviyeGerekli: 90,
    sureMs: 7400,
    xp: 105,
    girdiler: [{ itemId: "fish_shadoweel", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_shadoweel", miktar: 1 }]
  },
  {
    id: "cooking_t15",
    isim: "Yıldız Balığı Pişir",
    skillId: "cooking",
    seviyeGerekli: 95,
    sureMs: 7800,
    xp: 128,
    girdiler: [{ itemId: "fish_starfish", miktar: 1 }],
    ciktilar: [{ itemId: "cooked_starfish", miktar: 1 }]
  },

  // ================= AŞÇILIK — ZİYAFETLER =================
  // Çok malzemeli tarifler. Geçici bonus verirler, yemek
  // slotuna girmezler; envanterden kullanılırlar.
  {
    id: "cook_feast_stew",
    isim: "Balık Çorbası Pişir",
    skillId: "cooking",
    seviyeGerekli: 25,
    sureMs: 6000,
    xp: 55,
    girdiler: [
      { itemId: "cooked_bass", miktar: 2 },
      { itemId: "coal", miktar: 1 }
    ],
    ciktilar: [{ itemId: "feast_stew", miktar: 1 }]
  },
  {
    id: "cook_feast_adventurer",
    isim: "Maceracı Güveci Pişir",
    skillId: "cooking",
    seviyeGerekli: 40,
    sureMs: 7000,
    xp: 95,
    girdiler: [
      { itemId: "cooked_shrimp", miktar: 2 },
      { itemId: "feather", miktar: 3 },
      { itemId: "coal", miktar: 2 }
    ],
    ciktilar: [{ itemId: "feast_adventurer", miktar: 1 }]
  },
  {
    id: "cook_feast_king",
    isim: "Kral Sofrası Hazırla",
    skillId: "cooking",
    seviyeGerekli: 58,
    sureMs: 8000,
    xp: 170,
    girdiler: [
      { itemId: "cooked_lobster", miktar: 2 },
      { itemId: "ore_gold", miktar: 1 }
    ],
    ciktilar: [{ itemId: "feast_king", miktar: 1 }]
  },
  {
    id: "cook_feast_warrior",
    isim: "Savaşçı Ziyafeti Hazırla",
    skillId: "cooking",
    seviyeGerekli: 70,
    sureMs: 9000,
    xp: 260,
    girdiler: [
      { itemId: "cooked_shark", miktar: 2 },
      { itemId: "hot_coal", miktar: 2 }
    ],
    ciktilar: [{ itemId: "feast_warrior", miktar: 1 }]
  },
  {
    id: "cook_feast_dragon",
    isim: "Ejder Ziyafeti Hazırla",
    skillId: "cooking",
    seviyeGerekli: 85,
    sureMs: 10000,
    xp: 420,
    girdiler: [
      { itemId: "cooked_dragonfish", miktar: 2 },
      { itemId: "log_magic", miktar: 1 }
    ],
    ciktilar: [{ itemId: "feast_dragon", miktar: 1 }]
  },
  {
    id: "cook_feast_star",
    isim: "Yıldız Şöleni Hazırla",
    skillId: "cooking",
    seviyeGerekli: 95,
    sureMs: 12000,
    xp: 700,
    girdiler: [
      { itemId: "cooked_starfish", miktar: 2 },
      { itemId: "ore_starstone", miktar: 1 }
    ],
    ciktilar: [{ itemId: "feast_star", miktar: 1 }]
  },

  // ================= ATEŞ YAKMA =================
  // Üst kademeler yeni ürün açmaz, aynı yakıtı DAHA VERİMLİ üretir.
  // Yeni yakıt TÜRÜ sadece Sv30 (Kızgın Kömür) ve Sv70'te (Ejder Közü) gelir.
  {
    id: "firemaking_t1",
    isim: "Normal Kütük Yak",
    skillId: "firemaking",
    seviyeGerekli: 1,
    sureMs: 3500,
    xp: 14,
    girdiler: [{ itemId: "log_normal", miktar: 2 }],
    ciktilar: [{ itemId: "coal", miktar: 1 }]
  },
  {
    id: "firemaking_t2",
    isim: "Kavak Yak",
    skillId: "firemaking",
    seviyeGerekli: 8,
    sureMs: 3700,
    xp: 17,
    girdiler: [{ itemId: "log_poplar", miktar: 2 }],
    ciktilar: [{ itemId: "coal", miktar: 1 }]
  },
  {
    id: "firemaking_t3",
    isim: "Meşe Yak",
    skillId: "firemaking",
    seviyeGerekli: 15,
    sureMs: 4000,
    xp: 22,
    girdiler: [{ itemId: "log_oak", miktar: 2 }],
    ciktilar: [{ itemId: "coal", miktar: 2 }]
  },
  {
    id: "firemaking_t4",
    isim: "Kayın Yak",
    skillId: "firemaking",
    seviyeGerekli: 24,
    sureMs: 4300,
    xp: 28,
    girdiler: [{ itemId: "log_beech", miktar: 2 }],
    ciktilar: [{ itemId: "coal", miktar: 3 }]
  },
  {
    id: "firemaking_t5",
    isim: "Söğüt Yak",
    skillId: "firemaking",
    seviyeGerekli: 30,
    sureMs: 4800,
    xp: 38,
    girdiler: [{ itemId: "log_willow", miktar: 3 }],
    ciktilar: [{ itemId: "hot_coal", miktar: 1 }]
  },
  {
    id: "firemaking_t6",
    isim: "Çam Yak",
    skillId: "firemaking",
    seviyeGerekli: 40,
    sureMs: 5200,
    xp: 48,
    girdiler: [{ itemId: "log_pine", miktar: 3 }],
    ciktilar: [{ itemId: "hot_coal", miktar: 2 }]
  },
  {
    id: "firemaking_t7",
    isim: "Akçaağaç Yak",
    skillId: "firemaking",
    seviyeGerekli: 48,
    sureMs: 5600,
    xp: 62,
    girdiler: [{ itemId: "log_maple", miktar: 3 }],
    ciktilar: [{ itemId: "hot_coal", miktar: 3 }]
  },
  {
    id: "firemaking_t8",
    isim: "Ceviz Yak",
    skillId: "firemaking",
    seviyeGerekli: 58,
    sureMs: 6000,
    xp: 80,
    girdiler: [{ itemId: "log_walnut", miktar: 3 }],
    ciktilar: [{ itemId: "hot_coal", miktar: 4 }]
  },
  {
    id: "firemaking_t9",
    isim: "Porsuk Yak",
    skillId: "firemaking",
    seviyeGerekli: 70,
    sureMs: 6500,
    xp: 105,
    girdiler: [{ itemId: "log_yew", miktar: 4 }],
    ciktilar: [{ itemId: "dragon_ember", miktar: 1 }]
  },
  {
    id: "firemaking_t10",
    isim: "Abanoz Yak",
    skillId: "firemaking",
    seviyeGerekli: 78,
    sureMs: 6900,
    xp: 132,
    girdiler: [{ itemId: "log_ebony", miktar: 4 }],
    ciktilar: [{ itemId: "dragon_ember", miktar: 2 }]
  },
  {
    id: "firemaking_t11",
    isim: "Sedir Yak",
    skillId: "firemaking",
    seviyeGerekli: 86,
    sureMs: 7300,
    xp: 165,
    girdiler: [{ itemId: "log_cedar", miktar: 4 }],
    ciktilar: [{ itemId: "dragon_ember", miktar: 3 }]
  },
  {
    id: "firemaking_t12",
    isim: "Sihirli Kütük Yak",
    skillId: "firemaking",
    seviyeGerekli: 94,
    sureMs: 7800,
    xp: 210,
    girdiler: [{ itemId: "log_magic", miktar: 4 }],
    ciktilar: [{ itemId: "dragon_ember", miktar: 4 }]
  },

  // ================= DEMİRCİLİK =================
  // Çelik ayrı cevher İSTEMEZ: 2 Demir + 2 Kömür. Bu, Demir
  // madenciliğini uzun süre canlı tutar.
  {
    id: "smith_bronze_arrow_tip",
    isim: "Bronz Ok Ucu Yap",
    skillId: "smithing",
    seviyeGerekli: 1,
    sureMs: 3000,
    xp: 9,
    girdiler: [{ itemId: "ore_copper", miktar: 1 }, { itemId: "coal", miktar: 1 }],
    ciktilar: [{ itemId: "bronze_arrow_tip", miktar: 5 }]
  },
  {
    id: "smith_bronze_sword",
    isim: "Bronz Kılıç Yap",
    skillId: "smithing",
    seviyeGerekli: 2,
    sureMs: 4200,
    xp: 16,
    girdiler: [{ itemId: "ore_copper", miktar: 2 }, { itemId: "coal", miktar: 1 }],
    ciktilar: [{ itemId: "bronze_sword", miktar: 1 }]
  },
  {
    id: "smith_bronze_helmet",
    isim: "Bronz Kask Yap",
    skillId: "smithing",
    seviyeGerekli: 4,
    sureMs: 4500,
    xp: 19,
    girdiler: [{ itemId: "ore_copper", miktar: 2 }, { itemId: "coal", miktar: 1 }],
    ciktilar: [{ itemId: "bronze_helmet", miktar: 1 }]
  },
  {
    id: "smith_bronze_shield",
    isim: "Bronz Kalkan Yap",
    skillId: "smithing",
    seviyeGerekli: 6,
    sureMs: 4800,
    xp: 21,
    girdiler: [{ itemId: "ore_copper", miktar: 3 }, { itemId: "coal", miktar: 1 }],
    ciktilar: [{ itemId: "bronze_shield", miktar: 1 }]
  },
  {
    id: "smith_bronze_body",
    isim: "Bronz Zırh Yap",
    skillId: "smithing",
    seviyeGerekli: 10,
    sureMs: 5800,
    xp: 26,
    girdiler: [{ itemId: "ore_copper", miktar: 3 }, { itemId: "coal", miktar: 2 }],
    ciktilar: [{ itemId: "bronze_body", miktar: 1 }]
  },
  {
    id: "smith_iron_arrow_tip",
    isim: "Demir Ok Ucu Yap",
    skillId: "smithing",
    seviyeGerekli: 15,
    sureMs: 3200,
    xp: 19,
    girdiler: [{ itemId: "ore_iron", miktar: 1 }, { itemId: "coal", miktar: 1 }],
    ciktilar: [{ itemId: "iron_arrow_tip", miktar: 5 }]
  },
  {
    id: "smith_iron_sword",
    isim: "Demir Kılıç Yap",
    skillId: "smithing",
    seviyeGerekli: 16,
    sureMs: 4400,
    xp: 35,
    girdiler: [{ itemId: "ore_iron", miktar: 2 }, { itemId: "coal", miktar: 1 }],
    ciktilar: [{ itemId: "iron_sword", miktar: 1 }]
  },
  {
    id: "smith_iron_helmet",
    isim: "Demir Kask Yap",
    skillId: "smithing",
    seviyeGerekli: 18,
    sureMs: 4600,
    xp: 41,
    girdiler: [{ itemId: "ore_iron", miktar: 2 }, { itemId: "coal", miktar: 1 }],
    ciktilar: [{ itemId: "iron_helmet", miktar: 1 }]
  },
  {
    id: "smith_iron_shield",
    isim: "Demir Kalkan Yap",
    skillId: "smithing",
    seviyeGerekli: 20,
    sureMs: 5000,
    xp: 46,
    girdiler: [{ itemId: "ore_iron", miktar: 3 }, { itemId: "coal", miktar: 1 }],
    ciktilar: [{ itemId: "iron_shield", miktar: 1 }]
  },
  {
    id: "smith_iron_body",
    isim: "Demir Zırh Yap",
    skillId: "smithing",
    seviyeGerekli: 24,
    sureMs: 6000,
    xp: 56,
    girdiler: [{ itemId: "ore_iron", miktar: 3 }, { itemId: "coal", miktar: 2 }],
    ciktilar: [{ itemId: "iron_body", miktar: 1 }]
  },
  {
    id: "smith_steel_arrow_tip",
    isim: "Çelik Ok Ucu Yap",
    skillId: "smithing",
    seviyeGerekli: 30,
    sureMs: 3300,
    xp: 31,
    girdiler: [{ itemId: "ore_iron", miktar: 2 }, { itemId: "coal", miktar: 2 }],
    ciktilar: [{ itemId: "steel_arrow_tip", miktar: 5 }]
  },
  {
    id: "smith_steel_sword",
    isim: "Çelik Kılıç Yap",
    skillId: "smithing",
    seviyeGerekli: 31,
    sureMs: 4500,
    xp: 55,
    girdiler: [{ itemId: "ore_iron", miktar: 4 }, { itemId: "coal", miktar: 4 }],
    ciktilar: [{ itemId: "steel_sword", miktar: 1 }]
  },
  {
    id: "smith_steel_helmet",
    isim: "Çelik Kask Yap",
    skillId: "smithing",
    seviyeGerekli: 33,
    sureMs: 4800,
    xp: 64,
    girdiler: [{ itemId: "ore_iron", miktar: 5 }, { itemId: "coal", miktar: 5 }],
    ciktilar: [{ itemId: "steel_helmet", miktar: 1 }]
  },
  {
    id: "smith_steel_shield",
    isim: "Çelik Kalkan Yap",
    skillId: "smithing",
    seviyeGerekli: 35,
    sureMs: 5100,
    xp: 72,
    girdiler: [{ itemId: "ore_iron", miktar: 5 }, { itemId: "coal", miktar: 5 }],
    ciktilar: [{ itemId: "steel_shield", miktar: 1 }]
  },
  {
    id: "smith_steel_legs",
    isim: "Çelik Pantolon Yap",
    skillId: "smithing",
    seviyeGerekli: 37,
    sureMs: 5500,
    xp: 80,
    girdiler: [{ itemId: "ore_iron", miktar: 6 }, { itemId: "coal", miktar: 6 }],
    ciktilar: [{ itemId: "steel_legs", miktar: 1 }]
  },
  {
    id: "smith_steel_body",
    isim: "Çelik Zırh Yap",
    skillId: "smithing",
    seviyeGerekli: 39,
    sureMs: 6100,
    xp: 89,
    girdiler: [{ itemId: "ore_iron", miktar: 6 }, { itemId: "coal", miktar: 6 }],
    ciktilar: [{ itemId: "steel_body", miktar: 1 }]
  },
  {
    id: "smith_mithril_arrow_tip",
    isim: "Mithril Ok Ucu Yap",
    skillId: "smithing",
    seviyeGerekli: 45,
    sureMs: 3400,
    xp: 42,
    girdiler: [{ itemId: "ore_mithril", miktar: 2 }, { itemId: "hot_coal", miktar: 1 }],
    ciktilar: [{ itemId: "mithril_arrow_tip", miktar: 5 }]
  },
  {
    id: "smith_mithril_sword",
    isim: "Mithril Kılıç Yap",
    skillId: "smithing",
    seviyeGerekli: 46,
    sureMs: 4600,
    xp: 76,
    girdiler: [{ itemId: "ore_mithril", miktar: 3 }, { itemId: "hot_coal", miktar: 2 }],
    ciktilar: [{ itemId: "mithril_sword", miktar: 1 }]
  },
  {
    id: "smith_mithril_helmet",
    isim: "Mithril Kask Yap",
    skillId: "smithing",
    seviyeGerekli: 48,
    sureMs: 5000,
    xp: 87,
    girdiler: [{ itemId: "ore_mithril", miktar: 3 }, { itemId: "hot_coal", miktar: 2 }],
    ciktilar: [{ itemId: "mithril_helmet", miktar: 1 }]
  },
  {
    id: "smith_mithril_shield",
    isim: "Mithril Kalkan Yap",
    skillId: "smithing",
    seviyeGerekli: 50,
    sureMs: 5200,
    xp: 98,
    girdiler: [{ itemId: "ore_mithril", miktar: 4 }, { itemId: "hot_coal", miktar: 3 }],
    ciktilar: [{ itemId: "mithril_shield", miktar: 1 }]
  },
  {
    id: "smith_mithril_legs",
    isim: "Mithril Pantolon Yap",
    skillId: "smithing",
    seviyeGerekli: 52,
    sureMs: 5600,
    xp: 110,
    girdiler: [{ itemId: "ore_mithril", miktar: 4 }, { itemId: "hot_coal", miktar: 3 }],
    ciktilar: [{ itemId: "mithril_legs", miktar: 1 }]
  },
  {
    id: "smith_mithril_body",
    isim: "Mithril Zırh Yap",
    skillId: "smithing",
    seviyeGerekli: 54,
    sureMs: 6200,
    xp: 121,
    girdiler: [{ itemId: "ore_mithril", miktar: 5 }, { itemId: "hot_coal", miktar: 3 }],
    ciktilar: [{ itemId: "mithril_body", miktar: 1 }]
  },
  {
    id: "smith_adamant_arrow_tip",
    isim: "Adamantit Ok Ucu Yap",
    skillId: "smithing",
    seviyeGerekli: 58,
    sureMs: 3600,
    xp: 51,
    girdiler: [{ itemId: "ore_adamant", miktar: 2 }, { itemId: "hot_coal", miktar: 2 }],
    ciktilar: [{ itemId: "adamant_arrow_tip", miktar: 5 }]
  },
  {
    id: "smith_adamant_sword",
    isim: "Adamantit Kılıç Yap",
    skillId: "smithing",
    seviyeGerekli: 59,
    sureMs: 4800,
    xp: 93,
    girdiler: [{ itemId: "ore_adamant", miktar: 3 }, { itemId: "hot_coal", miktar: 3 }],
    ciktilar: [{ itemId: "adamant_sword", miktar: 1 }]
  },
  {
    id: "smith_adamant_helmet",
    isim: "Adamantit Kask Yap",
    skillId: "smithing",
    seviyeGerekli: 61,
    sureMs: 5100,
    xp: 107,
    girdiler: [{ itemId: "ore_adamant", miktar: 3 }, { itemId: "hot_coal", miktar: 3 }],
    ciktilar: [{ itemId: "adamant_helmet", miktar: 1 }]
  },
  {
    id: "smith_adamant_shield",
    isim: "Adamantit Kalkan Yap",
    skillId: "smithing",
    seviyeGerekli: 63,
    sureMs: 5400,
    xp: 121,
    girdiler: [{ itemId: "ore_adamant", miktar: 4 }, { itemId: "hot_coal", miktar: 4 }],
    ciktilar: [{ itemId: "adamant_shield", miktar: 1 }]
  },
  {
    id: "smith_adamant_legs",
    isim: "Adamantit Pantolon Yap",
    skillId: "smithing",
    seviyeGerekli: 65,
    sureMs: 5800,
    xp: 135,
    girdiler: [{ itemId: "ore_adamant", miktar: 4 }, { itemId: "hot_coal", miktar: 4 }],
    ciktilar: [{ itemId: "adamant_legs", miktar: 1 }]
  },
  {
    id: "smith_adamant_body",
    isim: "Adamantit Zırh Yap",
    skillId: "smithing",
    seviyeGerekli: 67,
    sureMs: 6400,
    xp: 149,
    girdiler: [{ itemId: "ore_adamant", miktar: 5 }, { itemId: "hot_coal", miktar: 5 }],
    ciktilar: [{ itemId: "adamant_body", miktar: 1 }]
  },
  {
    id: "smith_obsidian_arrow_tip",
    isim: "Obsidyen Ok Ucu Yap",
    skillId: "smithing",
    seviyeGerekli: 70,
    sureMs: 3700,
    xp: 60,
    girdiler: [{ itemId: "ore_obsidian", miktar: 2 }, { itemId: "hot_coal", miktar: 2 }],
    ciktilar: [{ itemId: "obsidian_arrow_tip", miktar: 5 }]
  },
  {
    id: "smith_obsidian_sword",
    isim: "Obsidyen Kılıç Yap",
    skillId: "smithing",
    seviyeGerekli: 71,
    sureMs: 4900,
    xp: 110,
    girdiler: [{ itemId: "ore_obsidian", miktar: 4 }, { itemId: "hot_coal", miktar: 4 }],
    ciktilar: [{ itemId: "obsidian_sword", miktar: 1 }]
  },
  {
    id: "smith_obsidian_helmet",
    isim: "Obsidyen Kask Yap",
    skillId: "smithing",
    seviyeGerekli: 73,
    sureMs: 5200,
    xp: 126,
    girdiler: [{ itemId: "ore_obsidian", miktar: 5 }, { itemId: "hot_coal", miktar: 5 }],
    ciktilar: [{ itemId: "obsidian_helmet", miktar: 1 }]
  },
  {
    id: "smith_obsidian_shield",
    isim: "Obsidyen Kalkan Yap",
    skillId: "smithing",
    seviyeGerekli: 75,
    sureMs: 5500,
    xp: 142,
    girdiler: [{ itemId: "ore_obsidian", miktar: 5 }, { itemId: "hot_coal", miktar: 5 }],
    ciktilar: [{ itemId: "obsidian_shield", miktar: 1 }]
  },
  {
    id: "smith_obsidian_legs",
    isim: "Obsidyen Pantolon Yap",
    skillId: "smithing",
    seviyeGerekli: 77,
    sureMs: 5900,
    xp: 159,
    girdiler: [{ itemId: "ore_obsidian", miktar: 6 }, { itemId: "hot_coal", miktar: 6 }],
    ciktilar: [{ itemId: "obsidian_legs", miktar: 1 }]
  },
  {
    id: "smith_obsidian_body",
    isim: "Obsidyen Zırh Yap",
    skillId: "smithing",
    seviyeGerekli: 79,
    sureMs: 6500,
    xp: 175,
    girdiler: [{ itemId: "ore_obsidian", miktar: 6 }, { itemId: "hot_coal", miktar: 6 }],
    ciktilar: [{ itemId: "obsidian_body", miktar: 1 }]
  },
  {
    id: "smith_dragon_arrow_tip",
    isim: "Ejderha Ok Ucu Yap",
    skillId: "smithing",
    seviyeGerekli: 82,
    sureMs: 3800,
    xp: 69,
    girdiler: [{ itemId: "ore_dragonstone", miktar: 2 }, { itemId: "dragon_ember", miktar: 1 }],
    ciktilar: [{ itemId: "dragon_arrow_tip", miktar: 5 }]
  },
  {
    id: "smith_dragon_sword",
    isim: "Ejderha Kılıç Yap",
    skillId: "smithing",
    seviyeGerekli: 83,
    sureMs: 5000,
    xp: 126,
    girdiler: [{ itemId: "ore_dragonstone", miktar: 3 }, { itemId: "dragon_ember", miktar: 2 }],
    ciktilar: [{ itemId: "dragon_sword", miktar: 1 }]
  },
  {
    id: "smith_dragon_helmet",
    isim: "Ejderha Kask Yap",
    skillId: "smithing",
    seviyeGerekli: 85,
    sureMs: 5300,
    xp: 145,
    girdiler: [{ itemId: "ore_dragonstone", miktar: 3 }, { itemId: "dragon_ember", miktar: 2 }],
    ciktilar: [{ itemId: "dragon_helmet", miktar: 1 }]
  },
  {
    id: "smith_dragon_shield",
    isim: "Ejderha Kalkan Yap",
    skillId: "smithing",
    seviyeGerekli: 87,
    sureMs: 5600,
    xp: 163,
    girdiler: [{ itemId: "ore_dragonstone", miktar: 4 }, { itemId: "dragon_ember", miktar: 3 }],
    ciktilar: [{ itemId: "dragon_shield", miktar: 1 }]
  },
  {
    id: "smith_dragon_legs",
    isim: "Ejderha Pantolon Yap",
    skillId: "smithing",
    seviyeGerekli: 89,
    sureMs: 6000,
    xp: 182,
    girdiler: [{ itemId: "ore_dragonstone", miktar: 4 }, { itemId: "dragon_ember", miktar: 3 }],
    ciktilar: [{ itemId: "dragon_legs", miktar: 1 }]
  },
  {
    id: "smith_dragon_body",
    isim: "Ejderha Zırh Yap",
    skillId: "smithing",
    seviyeGerekli: 91,
    sureMs: 6600,
    xp: 201,
    girdiler: [{ itemId: "ore_dragonstone", miktar: 5 }, { itemId: "dragon_ember", miktar: 3 }],
    ciktilar: [{ itemId: "dragon_body", miktar: 1 }]
  },
  {
    id: "smith_shadow_arrow_tip",
    isim: "Gölge Ok Ucu Yap",
    skillId: "smithing",
    seviyeGerekli: 92,
    sureMs: 3900,
    xp: 77,
    girdiler: [{ itemId: "ore_shadowstone", miktar: 2 }, { itemId: "dragon_ember", miktar: 2 }],
    ciktilar: [{ itemId: "shadow_arrow_tip", miktar: 5 }]
  },
  {
    id: "smith_shadow_sword",
    isim: "Gölge Kılıç Yap",
    skillId: "smithing",
    seviyeGerekli: 93,
    sureMs: 5100,
    xp: 139,
    girdiler: [{ itemId: "ore_shadowstone", miktar: 4 }, { itemId: "dragon_ember", miktar: 3 }],
    ciktilar: [{ itemId: "shadow_sword", miktar: 1 }]
  },
  {
    id: "smith_shadow_helmet",
    isim: "Gölge Kask Yap",
    skillId: "smithing",
    seviyeGerekli: 95,
    sureMs: 5400,
    xp: 160,
    girdiler: [{ itemId: "ore_shadowstone", miktar: 5 }, { itemId: "dragon_ember", miktar: 3 }],
    ciktilar: [{ itemId: "shadow_helmet", miktar: 1 }]
  },
  {
    id: "smith_shadow_shield",
    isim: "Gölge Kalkan Yap",
    skillId: "smithing",
    seviyeGerekli: 97,
    sureMs: 5700,
    xp: 181,
    girdiler: [{ itemId: "ore_shadowstone", miktar: 5 }, { itemId: "dragon_ember", miktar: 4 }],
    ciktilar: [{ itemId: "shadow_shield", miktar: 1 }]
  },
  {
    id: "smith_shadow_legs",
    isim: "Gölge Pantolon Yap",
    skillId: "smithing",
    seviyeGerekli: 99,
    sureMs: 6100,
    xp: 202,
    girdiler: [{ itemId: "ore_shadowstone", miktar: 6 }, { itemId: "dragon_ember", miktar: 4 }],
    ciktilar: [{ itemId: "shadow_legs", miktar: 1 }]
  },
  {
    id: "smith_shadow_body",
    isim: "Gölge Zırh Yap",
    skillId: "smithing",
    seviyeGerekli: 101,
    sureMs: 6700,
    xp: 223,
    girdiler: [{ itemId: "ore_shadowstone", miktar: 6 }, { itemId: "dragon_ember", miktar: 5 }],
    ciktilar: [{ itemId: "shadow_body", miktar: 1 }]
  },

  // ================= MARANGOZLUK =================
  // Ok gövdesi tek tür; üst kütük DAHA ÇOK gövde verir.
  {
    id: "fletch_shaft_t1",
    isim: "Ok Gövdesi Yont",
    skillId: "fletching",
    seviyeGerekli: 1,
    sureMs: 3000,
    xp: 9,
    girdiler: [{ itemId: "log_normal", miktar: 1 }, { itemId: "feather", miktar: 2 }],
    ciktilar: [{ itemId: "arrow_shaft", miktar: 5 }]
  },
  {
    id: "fletch_shaft_t2",
    isim: "Meşe Ok Gövdesi Yont",
    skillId: "fletching",
    seviyeGerekli: 15,
    sureMs: 3400,
    xp: 14,
    girdiler: [{ itemId: "log_oak", miktar: 1 }, { itemId: "feather", miktar: 2 }],
    ciktilar: [{ itemId: "arrow_shaft", miktar: 8 }]
  },
  {
    id: "fletch_shaft_t3",
    isim: "Söğüt Ok Gövdesi Yont",
    skillId: "fletching",
    seviyeGerekli: 30,
    sureMs: 3800,
    xp: 24,
    girdiler: [{ itemId: "log_willow", miktar: 1 }, { itemId: "feather", miktar: 2 }],
    ciktilar: [{ itemId: "arrow_shaft", miktar: 12 }]
  },
  {
    id: "fletch_shaft_t4",
    isim: "Akçaağaç Ok Gövdesi Yont",
    skillId: "fletching",
    seviyeGerekli: 45,
    sureMs: 4200,
    xp: 40,
    girdiler: [{ itemId: "log_maple", miktar: 1 }, { itemId: "feather", miktar: 2 }],
    ciktilar: [{ itemId: "arrow_shaft", miktar: 16 }]
  },
  {
    id: "fletch_shaft_t5",
    isim: "Porsuk Ok Gövdesi Yont",
    skillId: "fletching",
    seviyeGerekli: 58,
    sureMs: 4600,
    xp: 62,
    girdiler: [{ itemId: "log_yew", miktar: 1 }, { itemId: "feather", miktar: 2 }],
    ciktilar: [{ itemId: "arrow_shaft", miktar: 22 }]
  },
  {
    id: "fletch_shaft_t6",
    isim: "Sedir Ok Gövdesi Yont",
    skillId: "fletching",
    seviyeGerekli: 70,
    sureMs: 5000,
    xp: 90,
    girdiler: [{ itemId: "log_cedar", miktar: 1 }, { itemId: "feather", miktar: 2 }],
    ciktilar: [{ itemId: "arrow_shaft", miktar: 28 }]
  },
  {
    id: "fletch_shaft_t7",
    isim: "Sihirli Ok Gövdesi Yont",
    skillId: "fletching",
    seviyeGerekli: 82,
    sureMs: 5400,
    xp: 128,
    girdiler: [{ itemId: "log_magic", miktar: 1 }, { itemId: "feather", miktar: 2 }],
    ciktilar: [{ itemId: "arrow_shaft", miktar: 36 }]
  },
  {
    id: "fletch_short_bow",
    isim: "Kısa Yay Yap",
    skillId: "fletching",
    seviyeGerekli: 5,
    sureMs: 4575,
    xp: 41,
    girdiler: [{ itemId: "log_normal", miktar: 4 }],
    ciktilar: [{ itemId: "short_bow", miktar: 1 }]
  },
  {
    id: "fletch_oak_bow",
    isim: "Meşe Yay Yap",
    skillId: "fletching",
    seviyeGerekli: 15,
    sureMs: 4725,
    xp: 64,
    girdiler: [{ itemId: "log_oak", miktar: 5 }],
    ciktilar: [{ itemId: "oak_bow", miktar: 1 }]
  },
  {
    id: "fletch_willow_bow",
    isim: "Söğüt Yay Yap",
    skillId: "fletching",
    seviyeGerekli: 30,
    sureMs: 4950,
    xp: 98,
    girdiler: [{ itemId: "log_willow", miktar: 6 }, { itemId: "spider_silk", miktar: 2 }],
    ciktilar: [{ itemId: "willow_bow", miktar: 1 }]
  },
  {
    id: "fletch_maple_bow",
    isim: "Akçaağaç Yay Yap",
    skillId: "fletching",
    seviyeGerekli: 45,
    sureMs: 5175,
    xp: 131,
    girdiler: [{ itemId: "log_maple", miktar: 7 }, { itemId: "spider_silk", miktar: 2 }],
    ciktilar: [{ itemId: "maple_bow", miktar: 1 }]
  },
  {
    id: "fletch_yew_bow",
    isim: "Porsuk Yay Yap",
    skillId: "fletching",
    seviyeGerekli: 58,
    sureMs: 5370,
    xp: 160,
    girdiler: [{ itemId: "log_yew", miktar: 8 }, { itemId: "spider_silk", miktar: 2 }],
    ciktilar: [{ itemId: "yew_bow", miktar: 1 }]
  },
  {
    id: "fletch_cedar_bow",
    isim: "Sedir Yay Yap",
    skillId: "fletching",
    seviyeGerekli: 70,
    sureMs: 5550,
    xp: 188,
    girdiler: [{ itemId: "log_cedar", miktar: 9 }, { itemId: "spider_silk", miktar: 2 }],
    ciktilar: [{ itemId: "cedar_bow", miktar: 1 }]
  },
  {
    id: "fletch_magic_bow",
    isim: "Sihirli Yay Yap",
    skillId: "fletching",
    seviyeGerekli: 82,
    sureMs: 5730,
    xp: 214,
    girdiler: [{ itemId: "log_magic", miktar: 10 }, { itemId: "spider_silk", miktar: 2 }],
    ciktilar: [{ itemId: "magic_bow", miktar: 1 }]
  },
  {
    id: "fletch_shadow_bow",
    isim: "Gölge Yay Yap",
    skillId: "fletching",
    seviyeGerekli: 92,
    sureMs: 5880,
    xp: 237,
    girdiler: [{ itemId: "log_shadow", miktar: 12 }, { itemId: "spider_silk", miktar: 2 }],
    ciktilar: [{ itemId: "shadow_bow", miktar: 1 }]
  },
  {
    id: "fletch_bronze_arrow",
    isim: "Bronz Ok Yap",
    skillId: "fletching",
    seviyeGerekli: 3,
    sureMs: 3512,
    xp: 17,
    girdiler: [{ itemId: "arrow_shaft", miktar: 5 }, { itemId: "bronze_arrow_tip", miktar: 5 }],
    ciktilar: [{ itemId: "bronze_arrow", miktar: 5 }]
  },
  {
    id: "fletch_iron_arrow",
    isim: "Demir Ok Yap",
    skillId: "fletching",
    seviyeGerekli: 18,
    sureMs: 3680,
    xp: 35,
    girdiler: [{ itemId: "arrow_shaft", miktar: 5 }, { itemId: "iron_arrow_tip", miktar: 5 }],
    ciktilar: [{ itemId: "iron_arrow", miktar: 5 }]
  },
  {
    id: "fletch_steel_arrow",
    isim: "Çelik Ok Yap",
    skillId: "fletching",
    seviyeGerekli: 33,
    sureMs: 3860,
    xp: 54,
    girdiler: [{ itemId: "arrow_shaft", miktar: 5 }, { itemId: "steel_arrow_tip", miktar: 5 }],
    ciktilar: [{ itemId: "steel_arrow", miktar: 5 }]
  },
  {
    id: "fletch_mithril_arrow",
    isim: "Mithril Ok Yap",
    skillId: "fletching",
    seviyeGerekli: 48,
    sureMs: 4040,
    xp: 74,
    girdiler: [{ itemId: "arrow_shaft", miktar: 5 }, { itemId: "mithril_arrow_tip", miktar: 5 }],
    ciktilar: [{ itemId: "mithril_arrow", miktar: 5 }]
  },
  {
    id: "fletch_adamant_arrow",
    isim: "Adamantit Ok Yap",
    skillId: "fletching",
    seviyeGerekli: 61,
    sureMs: 4196,
    xp: 90,
    girdiler: [{ itemId: "arrow_shaft", miktar: 5 }, { itemId: "adamant_arrow_tip", miktar: 5 }],
    ciktilar: [{ itemId: "adamant_arrow", miktar: 5 }]
  },
  {
    id: "fletch_obsidian_arrow",
    isim: "Obsidyen Ok Yap",
    skillId: "fletching",
    seviyeGerekli: 73,
    sureMs: 4340,
    xp: 106,
    girdiler: [{ itemId: "arrow_shaft", miktar: 5 }, { itemId: "obsidian_arrow_tip", miktar: 5 }],
    ciktilar: [{ itemId: "obsidian_arrow", miktar: 5 }]
  },
  {
    id: "fletch_dragon_arrow",
    isim: "Ejderha Ok Yap",
    skillId: "fletching",
    seviyeGerekli: 85,
    sureMs: 4484,
    xp: 121,
    girdiler: [{ itemId: "arrow_shaft", miktar: 5 }, { itemId: "dragon_arrow_tip", miktar: 5 }],
    ciktilar: [{ itemId: "dragon_arrow", miktar: 5 }]
  },
  {
    id: "fletch_shadow_arrow",
    isim: "Gölge Ok Yap",
    skillId: "fletching",
    seviyeGerekli: 95,
    sureMs: 4604,
    xp: 134,
    girdiler: [{ itemId: "arrow_shaft", miktar: 5 }, { itemId: "shadow_arrow_tip", miktar: 5 }],
    ciktilar: [{ itemId: "shadow_arrow", miktar: 5 }]
  }
];