export let items = [
  // ---------- HAMMADDE ----------
  {
    id: "log_normal",
    isim: "Normal Kütük",
    ikon: "🪵",
    satisFiyati: 2
  },
  {
    id: "ore_copper",
    isim: "Bakır Cevheri",
    ikon: "🟠",
    satisFiyati: 3
  },
  {
    id: "coal",
    isim: "Kömür",
    ikon: "🪨",
    satisFiyati: 5
  },
  {
    id: "feather",
    isim: "Kuş Tüyü",
    ikon: "🪶",
    satisFiyati: 2
  },
  {
    id: "fish_sardine",
    isim: "Sardalya",
    ikon: "🐟",
    satisFiyati: 2
  },

  // ---------- YEMEK ----------
  {
    id: "cooked_sardine",
    isim: "Pişmiş Sardalya",
    ikon: "🍤",
    slot: "food",
    iyilestirme: 8,
    satisFiyati: 5
  },

  // ---------- OK ZİNCİRİ ----------
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
    id: "bronze_arrow",
    isim: "Bronz Ok",
    ikon: "🏹",
    slot: "ammo",
    okMu: true,
    saldiriBonusu: 2,
    isabetBonusu: 3,
    satisFiyati: 4
  },

  // ---------- SİLAHLAR ----------
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
    id: "short_bow",
    isim: "Kısa Yay",
    ikon: "🎯",
    slot: "weapon",
    saldiriBonusu: 5,
    isabetBonusu: 8,
    hizMs: 3200,
    okGerektirir: true,
    satisFiyati: 30
  },

  // ---------- ZIRHLAR ----------
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

  // ---------- LOOT ----------
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
    satisFiyati: 25
  },

  // ---------- DÜKKÂN ----------
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