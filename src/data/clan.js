// ============================================================
// CLAN SİSTEMİ VERİSİ
//
// Şu an tek kişilik çalışıyor. Online'a geçildiğinde değişecek
// TEK şey bu verinin nerede saklandığı olacak — yükseltmeler,
// depo ve seviye eğrisi aynen kalacak.
// ============================================================

// ---------- SEVİYE ----------

export const MAX_CLAN_SEVIYESI = 25;

export function clanSeviyeIcinPuan(seviye) {
  if (seviye <= 1) {
    return 0;
  }
  // Her seviye bir öncekinden %45 daha pahalı.
  // Tek kişiyle son seviye ~2 ay; kalabalık bir clanda çok daha hızlı.
  return Math.floor(200 * (Math.pow(1.45, seviye - 1) - 1) / 0.45);
}

// ---------- CLAN NİŞANI ----------
//
// Clan seviyesi eşya bağışıyla değil, aktivite yaparken düşen
// özel bir kaynakla yükselir. Nişan envanterde yer kaplamaz.

export const NISAN_PUANI = 10;

export const NISAN_SANSLARI = {
  toplama: 0.01,   // %1  - bol ama seyrek
  uretim: 0.02,    // %2  - emek daha çok
  savas: 0.08      // %8  - en verimli
};

export const NISAN_NADIR_BONUS = 0.25;

// ---------- YÜKSELTME AĞACI ----------
//
// Her clan seviyesi 1 yükseltme puanı verir. Puanlar dallara
// harcanır. Kademe maliyetleri arttığı için TÜM dalları
// maksimuma çıkarmak mümkün değil — bu, gerçek bir seçim yaratır.
//
// Maksimum seviyede (25) toplam 24 puan kazanılır.
// Tüm yükseltmelerin toplam maliyeti 27 puan.

export let clanDallari = [
  {
    id: "ambar",
    isim: "Ambar",
    ikon: "🎒",
    aciklama: "Envanter kapasiteni artırır",
    kademeler: [
      { maliyet: 1, deger: 5, metin: "+5 envanter kapasitesi" },
      { maliyet: 2, deger: 10, metin: "+10 envanter kapasitesi" },
      { maliyet: 3, deger: 18, metin: "+18 envanter kapasitesi" }
    ]
  },
  {
    id: "atolye",
    isim: "Atölye",
    ikon: "⚡",
    aciklama: "Toplama ve üretim aksiyonlarını hızlandırır",
    kademeler: [
      { maliyet: 1, deger: 0.02, metin: "Aksiyonlar %2 hızlı" },
      { maliyet: 2, deger: 0.05, metin: "Aksiyonlar %5 hızlı" },
      { maliyet: 3, deger: 0.09, metin: "Aksiyonlar %9 hızlı" }
    ]
  },
  {
    id: "pazar",
    isim: "Pazar",
    ikon: "🪙",
    aciklama: "Savaştan gelen altını artırır",
    kademeler: [
      { maliyet: 1, deger: 0.08, metin: "Savaş altını %8 fazla" },
      { maliyet: 2, deger: 0.18, metin: "Savaş altını %18 fazla" },
      { maliyet: 3, deger: 0.32, metin: "Savaş altını %32 fazla" }
    ]
  },
  {
    id: "mutfak",
    isim: "Mutfak",
    ikon: "🍳",
    aciklama: "Yemeklerin daha çok can yeniler",
    kademeler: [
      { maliyet: 1, deger: 0.10, metin: "Yemekler %10 fazla iyileştirir" },
      { maliyet: 2, deger: 0.22, metin: "Yemekler %22 fazla iyileştirir" },
      { maliyet: 3, deger: 0.38, metin: "Yemekler %38 fazla iyileştirir" }
    ]
  },
  {
    id: "depo",
    isim: "Depo",
    ikon: "📦",
    aciklama: "Clan deposunun kapasitesini ve sekme sayını artırır",
    kademeler: [
      { maliyet: 1, deger: 1, metin: "+10 depo yeri, +1 envanter sekmesi" },
      { maliyet: 2, deger: 2, metin: "+25 depo yeri, +2 envanter sekmesi" }
    ]
  }
];

// ---------- DEPO ----------
// Bağıştan farkı: depoya konan eşya KAYBOLMAZ, geri alınabilir.
// Envanterin dolduğunda taşma alanı olarak işe yarar.

export const TEMEL_DEPO_KAPASITESI = 10;

export function depoKapasitesi(depoKademesi) {
  if (depoKademesi >= 2) {
    return TEMEL_DEPO_KAPASITESI + 25;
  }
  if (depoKademesi >= 1) {
    return TEMEL_DEPO_KAPASITESI + 10;
  }
  return TEMEL_DEPO_KAPASITESI;
}
