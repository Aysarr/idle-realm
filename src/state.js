import { ekipmanSlotlari } from "./data/slots.js";

// ============================================================
// OYUN DURUMU
//
// Oyunun DEĞİŞEN her verisi bu tek objenin içinde.
// Neden obje? Çünkü modüller arasında paylaşılan bir değişkene
// başka dosyadan değer atanamaz - ama bir objenin İÇİNİ
// değiştirmek serbest. Bu yüzden her yerde "state.altin" gibi
// yazacağız, sade "altin" değil.
// ============================================================

export let state = {
  // Envanter: [{ itemId: "log_normal", miktar: 5 }, ...]
  envanter: [],
    // Kaç farklı eşya türü taşıyabilirsin (yığın boyutu sınırsız)
  envanterKapasitesi: 30,

  // Oyuncunun kendi oluşturduğu düzenleme sekmeleri.
  // Kapasiteyle ilgisi yok, sadece görsel gruplama.
  // Kaç sekme açabilirsin (ileride dükkândan artırılabilir)
  maxEnvanterSekmesi: 3,
  envanterSekmeleri: [{ id: "genel", isim: "Genel", ikon: "📦" }],
  acikEnvanterSekmesi: "genel",
    // Sekme ikonu için seçilen/sürüklenen eşya
  tasinanItemId: null,
  altin: 0,

  // Oyuncu
  oyuncuHp: 30,
  temelMaxHp: 30,
  temelSaldiri: 5,

  // Hangi slotta hangi eşya takılı
  ekipman: {},

    // Yığın slotlarında (ok, yemek) kaç adet var
  ekipmanAdet: {},

  // Ayarlar
  otomatikYemekAcik: false,
    otomatikYemekEsigi: 50,
      savasStili: "attack",

  // Aktif toplama/üretim aksiyonu
  aktifAksiyonId: null,
  aktifZamanlayici: null,
  aksiyonBaslangicZamani: 0,

  // Aktif savaş
  aktifSavasMonsterId: null,
  aktifSavasMonsterHp: 0,
  aktifSavasZamanlayici: null,
  siradakiOyuncuVurus: 0,
  siradakiCanavarVurus: 0,
  savasKayitlari: [],

  // Arayüz durumu (kaydedilmez)
  acikSekme: "character",
  secilenSlot: null,
    // Yardım paneli açık mı, ve hangi sayfaların yardımı görüldü
  yardimAcik: false,
  gorulenYardimlar: [],

  // Kayıttan yüklenen, devam ettirilmesi gereken aksiyon
  devamEdilecekAksiyonId: null,
  devamEdilecekSavasId: null
};

// Savaşta iki saldırı arası süre
// Savaş döngüsü bu sıklıkta kontrol edilir (vuruş hızı ayrı)
export const SAVAS_TIK_MS = 200;
// Savaş dışında kaç milisaniyede bir 1 can yenilenir
export const CAN_YENILENME_MS = 5000;

export function ekipmaniSifirla() {
  state.ekipman = {};
  state.ekipmanAdet = {};
  for (let i = 0; i < ekipmanSlotlari.length; i++) {
    state.ekipman[ekipmanSlotlari[i].id] = null;
    state.ekipmanAdet[ekipmanSlotlari[i].id] = 0;
  }
}

ekipmaniSifirla();