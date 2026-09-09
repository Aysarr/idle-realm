export let skills = [
  // ---------- SAVAŞ ----------
  {
    id: "attack",
    isim: "Saldırı",
    ikon: "⚔️",
    kategori: "combat",
    xp: 0
  },
  {
    id: "strength",
    isim: "Kuvvet",
    ikon: "💪",
    kategori: "combat",
    xp: 0
  },
  {
    id: "defence",
    isim: "Savunma",
    ikon: "🛡️",
    kategori: "combat",
    xp: 0
  },
  {
    id: "hitpoints",
    isim: "Sağlık",
    ikon: "❤️",
    kategori: "combat",
    xp: 0
  },
  {
    id: "ranged",
    isim: "Menzilli",
    ikon: "🏹",
    kategori: "combat",
    xp: 0
  },

  // ---------- SAVAŞ DIŞI ----------
  {
    id: "woodcutting",
    isim: "Oduncu",
    ikon: "🪓",
    kategori: "nonCombat",
    xp: 0
  },
  {
    id: "mining",
    isim: "Madencilik",
    ikon: "⛏️",
    kategori: "nonCombat",
    xp: 0
  },
  {
    id: "fishing",
    isim: "Balıkçılık",
    ikon: "🎣",
    kategori: "nonCombat",
    xp: 0
  },
  {
    id: "firemaking",
    isim: "Ateş Yakma",
    ikon: "🔥",
    kategori: "nonCombat",
    xp: 0
  },
  {
    id: "cooking",
    isim: "Aşçılık",
    ikon: "🍳",
    kategori: "nonCombat",
    xp: 0
  },
  {
    id: "smithing",
    isim: "Demircilik",
    ikon: "🔨",
    kategori: "nonCombat",
    xp: 0
  },
  {
    id: "fletching",
    isim: "Marangozluk",
    ikon: "🏹",
    kategori: "nonCombat",
    xp: 0
  }
];

// Yakın dövüş stilleri — hangi stille dövüşürsen o yetenek XP alır
export let savasStilleri = [
  { id: "attack", isim: "Saldırı", ikon: "⚔️", aciklama: "Dengeli hasar" },
  { id: "strength", isim: "Kuvvet", ikon: "💪", aciklama: "Ağır vuruş" },
  { id: "defence", isim: "Savunma", ikon: "🛡️", aciklama: "Temkinli dövüş" }
];