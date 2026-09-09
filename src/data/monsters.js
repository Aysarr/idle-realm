// ============================================================
// CANAVARLAR
//
// kacinma      : oyuncunun ıskalama ihtimalini artırır (çevik canavar)
// isabet       : canavarın sana vurma şansını belirler
// saldiriHiziMs: kaç milisaniyede bir vurduğu
// ============================================================

export let monsters = [
  {
    id: "rat",
    isim: "Fare",
    ikon: "🐀",
    maxHp: 20,
    saldiri: 3,
    isabet: 8,
    kacinma: 6,
    saldiriHiziMs: 1800,
    xpOdulu: 8,
    altinOdulu: 3,
    lootTablosu: [
      { itemId: "bones", sans: 1 },
      { itemId: "feather", sans: 0.5 },
      { itemId: "rat_tail", sans: 0.25 }
    ]
  },
  {
    id: "goblin",
    isim: "Goblin",
    ikon: "👹",
    maxHp: 45,
    saldiri: 7,
    isabet: 14,
    kacinma: 12,
    saldiriHiziMs: 2800,
    xpOdulu: 18,
    altinOdulu: 9,
    lootTablosu: [
      { itemId: "bones", sans: 1 },
      { itemId: "feather", sans: 0.7 },
      { itemId: "ore_copper", sans: 0.4 },
      { itemId: "goblin_mail", sans: 0.08 }
    ]
  }
];