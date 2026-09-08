export let monsters = [
  {
    id: "rat",
    isim: "Fare",
    ikon: "🐀",
    maxHp: 20,
    saldiri: 2,
    xpOdulu: 8,
    altinOdulu: 3,
    lootTablosu: [
      { itemId: "bones", sans: 1 },
      { itemId: "rat_tail", sans: 0.25 }
    ]
  },
  {
    id: "goblin",
    isim: "Goblin",
    ikon: "👹",
    maxHp: 45,
    saldiri: 5,
    xpOdulu: 18,
    altinOdulu: 9,
    lootTablosu: [
      { itemId: "bones", sans: 1 },
      { itemId: "ore_copper", sans: 0.4 },
      { itemId: "goblin_mail", sans: 0.08 }
    ]
  }
];