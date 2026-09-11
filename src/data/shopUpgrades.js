// ============================================================
// DÜKKÂN YÜKSELTMELERİ
//
// Altınla alınan KALICI yükseltmeler. Clan ağacından farklı
// şeyler verirler — üst üste binmesinler diye bilinçli ayrıldı:
//
//   Clan  -> envanter, aksiyon hızı, savaş altını, yemek gücü, depo
//   Dükkân -> ustalık hızı, şans, satış fiyatı, ok tasarrufu,
//             can yenilenmesi, çanta
//
// Fiyatlar sert artar; bu, altının uzun vadeli gideri olur.
// ============================================================

export let dukkanYukseltmeleri = [
  {
    id: "canta",
    isim: "Sırt Çantası",
    ikon: "🎒",
    aciklama: "Envanterde daha çok eşya çeşidi taşırsın",
    kademeler: [
      { fiyat: 500,     deger: 5,  metin: "+5 envanter kapasitesi" },
      { fiyat: 4000,    deger: 12, metin: "+12 envanter kapasitesi" },
      { fiyat: 25000,   deger: 25, metin: "+25 envanter kapasitesi" },
      { fiyat: 150000,  deger: 45, metin: "+45 envanter kapasitesi" }
    ]
  },
  {
    id: "ustalikKitabi",
    isim: "Ustalık Kitabı",
    ikon: "📕",
    aciklama: "Aksiyonlardan daha çok ustalık XP'si kazanırsın",
    kademeler: [
      { fiyat: 2500,   deger: 0.15, metin: "Ustalık XP +%15" },
      { fiyat: 20000,  deger: 0.35, metin: "Ustalık XP +%35" },
      { fiyat: 120000, deger: 0.60, metin: "Ustalık XP +%60" }
    ]
  },
  {
    id: "sansTilsimi",
    isim: "Şans Tılsımı",
    ikon: "🍀",
    aciklama: "Şansa bağlı yan ürünlerin (tüy gibi) düşme oranını artırır",
    kademeler: [
      { fiyat: 1500,  deger: 0.30, metin: "Şanslı çıktı oranı +%30" },
      { fiyat: 12000, deger: 0.70, metin: "Şanslı çıktı oranı +%70" },
      { fiyat: 80000, deger: 1.20, metin: "Şanslı çıktı oranı +%120" }
    ]
  },
  {
    id: "tuccarLisansi",
    isim: "Tüccar Lisansı",
    ikon: "📜",
    aciklama: "Sattığın eşyalardan daha çok altın alırsın",
    kademeler: [
      { fiyat: 1000,  deger: 0.12, metin: "Satış fiyatı +%12" },
      { fiyat: 8000,  deger: 0.28, metin: "Satış fiyatı +%28" },
      { fiyat: 50000, deger: 0.50, metin: "Satış fiyatı +%50" }
    ]
  },
  {
    id: "cephanelik",
    isim: "Cephanelik",
    ikon: "🎯",
    aciklama: "Yay kullanırken bazen ok harcanmaz",
    kademeler: [
      { fiyat: 3000,   deger: 0.12, metin: "%12 ihtimalle ok harcanmaz" },
      { fiyat: 25000,  deger: 0.25, metin: "%25 ihtimalle ok harcanmaz" },
      { fiyat: 150000, deger: 0.40, metin: "%40 ihtimalle ok harcanmaz" }
    ]
  },
  {
    id: "sifaOcagi",
    isim: "Şifa Ocağı",
    ikon: "❤️‍🔥",
    aciklama: "Savaş dışında canın daha hızlı yenilenir",
    kademeler: [
      { fiyat: 800,   deger: 2, metin: "Can yenilenmesi 2 kat hızlı" },
      { fiyat: 6000,  deger: 3, metin: "Can yenilenmesi 3 kat hızlı" },
      { fiyat: 40000, deger: 5, metin: "Can yenilenmesi 5 kat hızlı" }
    ]
  }
];