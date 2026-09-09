// ============================================================
// ALETLER
//
// Aletler HIZ VERMEZ. İki iş yaparlar:
//   1. Kademe kapısı — bazı aksiyonlar belirli alet ister
//   2. Çift ürün şansı — zaman matematiğine dokunmaz
//
// Neden hız değil: ustalık %40 + clan %8 + alet %15 üst üste
// binince toplam indirim öngörülemez hale gelir.
//
// Aletler envanterde yer kaplamaz; sahip olunan kademe
// state.aletler içinde sayı olarak tutulur.
// ============================================================

export let aletTurleri = [
  { id: "axe", isim: "Balta", ikon: "🪓", skillId: "woodcutting" },
  { id: "pickaxe", isim: "Kazma", ikon: "⛏️", skillId: "mining" },
  { id: "rod", isim: "Olta", ikon: "🎣", skillId: "fishing" }
];

// Kademe 1 herkeste var (başlangıç aleti)
export let aletKademeleri = [
  {
    kademe: 1,
    isim: "Bronz",
    fiyat: 0,
    gerekliSeviye: 1,
    ciftUrunSansi: 0
  },
  {
    kademe: 2,
    isim: "Demir",
    fiyat: 800,
    gerekliSeviye: 16,
    ciftUrunSansi: 0.04
  },
  {
    kademe: 3,
    isim: "Çelik",
    fiyat: 4000,
    gerekliSeviye: 32,
    ciftUrunSansi: 0.07
  },
  {
    kademe: 4,
    isim: "Mithril",
    fiyat: 20000,
    gerekliSeviye: 48,
    ciftUrunSansi: 0.10
  },
  {
    kademe: 5,
    isim: "Adamantit",
    fiyat: 80000,
    gerekliSeviye: 62,
    ciftUrunSansi: 0.13
  },
  {
    kademe: 6,
    isim: "Ejderha",
    fiyat: 350000,
    gerekliSeviye: 80,
    ciftUrunSansi: 0.17
  }
];