// ============================================================
// YETENEKLER
//
// renk alanı: o yeteneğin sayfa başlığında ve kart vurgularında
// kullanılır. Görsel kimlik için — her yetenek kendi rengiyle
// tanınıyor, oyuncu hangi sayfada olduğunu bir bakışta anlıyor.
// ============================================================

export let skills = [
  // ---------- SAVAŞ ----------
  {
    id: "attack",
    isim: "Saldırı",
    ikon: "⚔️",
    kategori: "combat",
    renk: "#e05656",
    xp: 0
  },
  {
    id: "strength",
    isim: "Kuvvet",
    ikon: "💪",
    kategori: "combat",
    renk: "#e08a3c",
    xp: 0
  },
  {
    id: "defence",
    isim: "Savunma",
    ikon: "🛡️",
    kategori: "combat",
    renk: "#4a8fd4",
    xp: 0
  },
  {
    id: "hitpoints",
    isim: "Sağlık",
    ikon: "❤️",
    kategori: "combat",
    renk: "#d44a6a",
    xp: 0
  },
  {
    id: "ranged",
    isim: "Menzilli",
    ikon: "🏹",
    kategori: "combat",
    renk: "#4aa86a",
    xp: 0
  },

  // ---------- SAVAŞ DIŞI ----------
  {
    id: "woodcutting",
    isim: "Oduncu",
    ikon: "🪓",
    kategori: "nonCombat",
    renk: "#3d8b4a",
    xp: 0
  },
  {
    id: "mining",
    isim: "Madencilik",
    ikon: "⛏️",
    kategori: "nonCombat",
    renk: "#8a7a68",
    xp: 0
  },
  {
    id: "fishing",
    isim: "Balıkçılık",
    ikon: "🎣",
    kategori: "nonCombat",
    renk: "#3a86a8",
    xp: 0
  },
  {
    id: "firemaking",
    isim: "Ateş Yakma",
    ikon: "🔥",
    kategori: "nonCombat",
    renk: "#d4622a",
    xp: 0
  },
  {
    id: "cooking",
    isim: "Aşçılık",
    ikon: "🍳",
    kategori: "nonCombat",
    renk: "#c49a3a",
    xp: 0
  },
  {
    id: "smithing",
    isim: "Demircilik",
    ikon: "🔨",
    kategori: "nonCombat",
    renk: "#6a7080",
    xp: 0
  },
  {
    id: "fletching",
    isim: "Marangozluk",
    ikon: "🏹",
    kategori: "nonCombat",
    renk: "#9a7a4a",
    xp: 0
  }
];

// Savaş stilleri — savaş ekranındaki üç kutu
export let savasStilleri = [
  { id: "attack", isim: "Saldırı", ikon: "⚔️", aciklama: "Dengeli hasar" },
  { id: "strength", isim: "Kuvvet", ikon: "💪", aciklama: "Ağır vuruş" },
  { id: "defence", isim: "Savunma", ikon: "🛡️", aciklama: "Temkinli dövüş" }
];