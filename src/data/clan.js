// ============================================================
// CLAN SİSTEMİ VERİSİ
//
// Şu an tek kişilik çalışıyor (sen kendi clanını kurarsın).
// Online'a geçildiğinde değişecek TEK şey, bu verinin nerede
// saklandığı olacak — bonuslar, bağış mantığı, seviye eğrisi
// aynen kalacak.
// ============================================================

// Clan seviyesi için gereken toplam bağış puanı
export function clanSeviyeIcinPuan(seviye) {
  if (seviye <= 1) {
    return 0;
  }
  // Her seviye bir öncekinden %60 daha pahalı
  return Math.floor(100 * (Math.pow(1.6, seviye - 1) - 1) / 0.6);
}

export const MAX_CLAN_SEVIYESI = 25;

// Clan seviyesine göre açılan bonuslar.
// Bilinçli olarak MÜTEVAZI tutuldu: clansız oynayan biri
// geri kalmamalı, sadece biraz yavaş ilerlemeli.
export let clanBonuslari = [
  {
    seviye: 3,
    id: "toplama_hiz_1",
    isim: "Ortak Aletler",
    aciklama: "Toplama ve üretim aksiyonları %3 hızlı",
    ikon: "⚡"
  },
  {
    seviye: 6,
    id: "envanter_1",
    isim: "Clan Ambarı",
    aciklama: "+5 envanter kapasitesi",
    ikon: "🎒"
  },
  {
    seviye: 10,
    id: "toplama_hiz_2",
    isim: "Usta Aletler",
    aciklama: "Toplama ve üretim aksiyonları %5 hızlı (toplam)",
    ikon: "⚡"
  },
  {
    seviye: 14,
    id: "altin_1",
    isim: "Tüccar Ağı",
    aciklama: "Savaştan %10 daha çok altın",
    ikon: "🪙"
  },
  {
    seviye: 18,
    id: "envanter_2",
    isim: "Genişletilmiş Ambar",
    aciklama: "+10 envanter kapasitesi (toplam), +1 sekme",
    ikon: "🎒"
  },
  {
    seviye: 22,
    id: "toplama_hiz_3",
    isim: "Clan Ustaları",
    aciklama: "Toplama ve üretim aksiyonları %8 hızlı (toplam)",
    ikon: "⚡"
  }
];

// Bağışlanabilecek eşyaların puan değeri.
// Satış fiyatının yerine ayrı bir değer kullanıyoruz ki
// ekonomiyi bozmadan dengeleyebilelim.
// ============================================================
// CLAN NİŞANI
//
// Clan seviyesi artık eşya bağışıyla değil, aktivite yaparken
// düşen özel bir kaynakla yükseliyor.
//
// Neden: eşya bağışı iki sorun yaratıyordu — her yeni eşyanın
// puanını elle dengelemek gerekiyordu, ve "bu kömürü üretimde
// mi kullansam clana mı versem" gibi can sıkıcı bir seçim
// doğuyordu. Nişan bu ikisini de ortadan kaldırıyor.
//
// Nişan envanterde yer kaplamaz, ayrı bir sayaçta birikir.
// ============================================================

export const NISAN_PUANI = 10;

// Hangi aktiviteden hangi oranda düşer
export const NISAN_SANSLARI = {
  toplama: 0.01,   // %1  - bol ama seyrek
  uretim: 0.02,    // %2  - emek daha çok
  savas: 0.08      // %8  - en verimli
};

// Nadir bir loot düştüğünde ek şans
export const NISAN_NADIR_BONUS = 0.25;