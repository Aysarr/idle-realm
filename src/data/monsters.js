export let monsters = [
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
  }
];