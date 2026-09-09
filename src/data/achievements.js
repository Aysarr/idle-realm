// ============================================================
// BAŞARIMLAR
//
// Her başarım bir İSTATİSTİK SAYACINA bağlı. Ayrı bir takip
// sistemi yok — sayaç eşiği geçince başarım açılır.
//
// Yeni başarım eklemek: buraya bir kayıt yaz. Kod değişmez.
//
// Alanlar:
//   sayac   : state.istatistik içindeki alan adı
//   esik    : bu değere ulaşınca açılır
//   grup    : listede hangi başlık altında görünecek
//   gizli   : true ise açılana kadar "???" görünür
//   odul    : { altin: 100 } veya { itemId: "coal", miktar: 5 }
//
// KADEMELİ GÖRÜNÜRLÜK: aynı sayaca bağlı başarımlardan sadece
// bir sonraki basamak listelenir. Bu yüzden eşikleri artan
// sırayla yazmak önemli.
// ============================================================

export let basarimlar = [
  // ---------- TOPLAMA ----------
  {
    id: "toplayici_1",
    isim: "İlk Adımlar",
    aciklama: "50 kaynak topla",
    ikon: "🌱",
    grup: "Toplama",
    sayac: "toplananKaynak",
    esik: 50,
    odul: { altin: 50 }
  },
  {
    id: "toplayici_2",
    isim: "Çalışkan Eller",
    aciklama: "500 kaynak topla",
    ikon: "🌿",
    grup: "Toplama",
    sayac: "toplananKaynak",
    esik: 500,
    odul: { altin: 250 }
  },
  {
    id: "toplayici_3",
    isim: "Doğanın Dostu",
    aciklama: "5.000 kaynak topla",
    ikon: "🌳",
    grup: "Toplama",
    sayac: "toplananKaynak",
    esik: 5000,
    odul: { altin: 1500 }
  },
  {
    id: "toplayici_4",
    isim: "Tükenmez Kaynak",
    aciklama: "50.000 kaynak topla",
    ikon: "🏔️",
    grup: "Toplama",
    sayac: "toplananKaynak",
    esik: 50000,
    odul: { altin: 10000 }
  },

  // ---------- ÜRETİM ----------
  {
    id: "usta_1",
    isim: "Çırak",
    aciklama: "25 eşya üret",
    ikon: "🔧",
    grup: "Üretim",
    sayac: "uretilenEsya",
    esik: 25,
    odul: { altin: 60 }
  },
  {
    id: "usta_2",
    isim: "Zanaatkâr",
    aciklama: "250 eşya üret",
    ikon: "🔨",
    grup: "Üretim",
    sayac: "uretilenEsya",
    esik: 250,
    odul: { altin: 300 }
  },
  {
    id: "usta_3",
    isim: "Usta Zanaatkâr",
    aciklama: "2.500 eşya üret",
    ikon: "⚒️",
    grup: "Üretim",
    sayac: "uretilenEsya",
    esik: 2500,
    odul: { altin: 2000 }
  },

  // ---------- USTALIK ----------
  {
    id: "ustalik_1",
    isim: "Tekrarın Gücü",
    aciklama: "10 ustalık seviyesi kazan",
    ikon: "⭐",
    grup: "Ustalık",
    sayac: "ustalikSeviyeAtlama",
    esik: 10,
    odul: { altin: 150 }
  },
  {
    id: "ustalik_2",
    isim: "Deneyimli",
    aciklama: "50 ustalık seviyesi kazan",
    ikon: "🌟",
    grup: "Ustalık",
    sayac: "ustalikSeviyeAtlama",
    esik: 50,
    odul: { altin: 800 }
  },
  {
    id: "ustalik_3",
    isim: "Uzman",
    aciklama: "200 ustalık seviyesi kazan",
    ikon: "✨",
    grup: "Ustalık",
    sayac: "ustalikSeviyeAtlama",
    esik: 200,
    odul: { altin: 5000 }
  },

  // ---------- SAVAŞ ----------
  {
    id: "savasci_1",
    isim: "İlk Kan",
    aciklama: "10 canavar öldür",
    ikon: "🗡️",
    grup: "Savaş",
    sayac: "oldurulenCanavar",
    esik: 10,
    odul: { altin: 75 }
  },
  {
    id: "savasci_2",
    isim: "Avcı",
    aciklama: "100 canavar öldür",
    ikon: "⚔️",
    grup: "Savaş",
    sayac: "oldurulenCanavar",
    esik: 100,
    odul: { altin: 400 }
  },
  {
    id: "savasci_3",
    isim: "Canavar Kâbusu",
    aciklama: "1.000 canavar öldür",
    ikon: "💀",
    grup: "Savaş",
    sayac: "oldurulenCanavar",
    esik: 1000,
    odul: { altin: 3000 }
  },
  {
    id: "okcu_1",
    isim: "Nişancı",
    aciklama: "500 ok at",
    ikon: "🏹",
    grup: "Savaş",
    sayac: "atilanOk",
    esik: 500,
    odul: { itemId: "arrow_tip", miktar: 50 }
  },
  {
    id: "okcu_2",
    isim: "Ok Yağmuru",
    aciklama: "5.000 ok at",
    ikon: "🎯",
    grup: "Savaş",
    sayac: "atilanOk",
    esik: 5000,
    odul: { itemId: "arrow_tip", miktar: 250 }
  },

  // ---------- EKONOMİ ----------
  {
    id: "tuccar_1",
    isim: "İlk Kazanç",
    aciklama: "500 altın kazan",
    ikon: "🪙",
    grup: "Ekonomi",
    sayac: "kazanilanAltin",
    esik: 500,
    odul: { altin: 100 }
  },
  {
    id: "tuccar_2",
    isim: "Bezirgân",
    aciklama: "10.000 altın kazan",
    ikon: "💰",
    grup: "Ekonomi",
    sayac: "kazanilanAltin",
    esik: 10000,
    odul: { altin: 1000 }
  },
  {
    id: "tuccar_3",
    isim: "Zengin",
    aciklama: "100.000 altın kazan",
    ikon: "👑",
    grup: "Ekonomi",
    sayac: "kazanilanAltin",
    esik: 100000,
    odul: { altin: 10000 }
  },

  // ---------- SEBAT ----------
  {
    id: "sabir_1",
    isim: "Bir Saat",
    aciklama: "1 saat oyna",
    ikon: "⏱️",
    grup: "Sebat",
    sayac: "toplamOyunSuresiMs",
    esik: 3600000,
    odul: { altin: 200 }
  },
  {
    id: "sabir_2",
    isim: "Sadık Maceracı",
    aciklama: "10 saat oyna",
    ikon: "🕰️",
    grup: "Sebat",
    sayac: "toplamOyunSuresiMs",
    esik: 36000000,
    odul: { altin: 1500 }
  },

  // ---------- GİZLİ ----------
  {
    id: "gizli_olum",
    isim: "Acı Ders",
    aciklama: "İlk kez öl",
    ikon: "⚰️",
    grup: "Gizli",
    sayac: "olumSayisi",
    esik: 1,
    gizli: true,
    odul: { itemId: "cooked_sardine", miktar: 10 }
  },
  {
    id: "gizli_obur",
    isim: "Obur",
    aciklama: "200 yemek ye",
    ikon: "🍤",
    grup: "Gizli",
    sayac: "yenenYemek",
    esik: 200,
    gizli: true,
    odul: { altin: 500 }
  },
  {
    id: "gizli_israfci",
    isim: "Müsrif",
    aciklama: "50.000 altın harca",
    ikon: "💸",
    grup: "Gizli",
    sayac: "harcananAltin",
    esik: 50000,
    gizli: true,
    odul: { altin: 5000 }
  }
];