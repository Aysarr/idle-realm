export let actions = [
  {
    id: "chop_normal_tree",
    isim: "Normal Ağaç Kes",
    skillId: "woodcutting",
    itemId: "log_normal",
    sureMs: 3000,
    xp: 10
  },
  {
    id: "mine_copper",
    isim: "Bakır Cevheri Kaz",
    skillId: "mining",
    itemId: "ore_copper",
    sureMs: 3200,
    xp: 12
  },
  {
    id: "fish_sardine_action",
    isim: "Sardalya Tut",
    skillId: "fishing",
    itemId: "fish_sardine",
    sureMs: 2800,
    xp: 8
  },
  {
    id: "cook_sardine_action",
    isim: "Sardalya Pişir",
    skillId: "cooking",
    itemId: "cooked_sardine",
    sureMs: 2500,
    xp: 6,
    gerekliItemId: "fish_sardine",
    gerekliMiktar: 1
  },
  {
    id: "smith_bronze_sword_action",
    isim: "Bronz Kılıç Yap",
    skillId: "smithing",
    itemId: "bronze_sword",
    sureMs: 4000,
    xp: 15,
    gerekliItemId: "ore_copper",
    gerekliMiktar: 2
  },
  {
    id: "smith_bronze_helmet_action",
    isim: "Bronz Kask Yap",
    skillId: "smithing",
    itemId: "bronze_helmet",
    sureMs: 4500,
    xp: 18,
    gerekliItemId: "ore_copper",
    gerekliMiktar: 3
  },
  {
    id: "smith_bronze_shield_action",
    isim: "Bronz Kalkan Yap",
    skillId: "smithing",
    itemId: "bronze_shield",
    sureMs: 5000,
    xp: 22,
    gerekliItemId: "ore_copper",
    gerekliMiktar: 4
  },
  {
    id: "smith_bronze_body_action",
    isim: "Bronz Zırh Yap",
    skillId: "smithing",
    itemId: "bronze_body",
    sureMs: 6000,
    xp: 28,
    gerekliItemId: "ore_copper",
    gerekliMiktar: 5
  }
];