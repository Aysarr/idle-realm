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
  // --- OYUNCU PROFİLİ ---
  // Online'a geçildiğinde bu bilgiler sunucuya taşınacak
  oyuncuAdi: "Maceracı",
  oyuncuId: null,
  oyunBaslangici: 0,

  // --- İSTATİSTİKLER ---
  // Clan katkısı ve başarımlar bunların üstüne kurulacak
  istatistik: {
    toplamOyunSuresiMs: 0,
    oldurulenCanavar: 0,
    toplananKaynak: 0,
    uretilenEsya: 0,
    kazanilanAltin: 0,
    harcananAltin: 0,
    yenenYemek: 0,
    atilanOk: 0,
    olumSayisi: 0,
    ustalikSeviyeAtlama: 0
  },

  // Clan Nişanı - envanterde yer kaplamaz, ayrı sayaçta durur
  clanNisani: 0,

    // --- CLAN ---
  // null ise oyuncu henüz clan kurmamış
  clan: null,

    // Açılan başarımların id listesi
  acilanBasarimlar: [],

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

  // Hangi slotta hangi eşya takılı
  ekipman: {},

  // Yığın slotlarında (ok, yemek) kaç adet var
  ekipmanAdet: {},

  // Aksiyon başına ustalık XP'si: { "chop_normal_tree": 1250, ... }
  ustalikXp: {},

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
  acikBolgeId: "village",
  secilenSlot: null,
    // Yardım paneli açık mı, ve hangi sayfaların yardımı görüldü
  yardimAcik: false,
    // Sıfırlama/içe aktarma sırasında kaydetmeyi kapatır
  kayitKapali: false,
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

// ============================================================
// KAYDEDİLECEK ALANLAR
//
// save.js bu listeyi dolaşarak kaydeder ve yükler.
// Yeni bir kalıcı alan eklediğinde SADECE buraya adını yaz —
// save.js'e dokunmana gerek yok.
//
// Buraya YAZILMAYANLAR kaydedilmez (zamanlayıcı kimlikleri,
// açık sekme gibi geçici arayüz durumları).
// ============================================================

export const KAYDEDILECEK_ALANLAR = [
  // Profil
  "oyuncuAdi",
  "oyuncuId",
  "oyunBaslangici",

  // İlerleme
  "istatistik",
  "ustalikXp",
  "acilanBasarimlar",
  "clan",
  "clanNisani",

  // Envanter
  "envanter",
  "envanterKapasitesi",
  "envanterSekmeleri",
  "maxEnvanterSekmesi",
  "acikEnvanterSekmesi",
  "altin",

  // Karakter
  "oyuncuHp",
  "ekipman",
  "ekipmanAdet",

  // Ayarlar
  "otomatikYemekAcik",
  "otomatikYemekEsigi",
  "savasStili",
  "gorulenYardimlar",

  // Devam eden aktivite
  "acikBolgeId",
  "aktifAksiyonId",
  "aktifSavasMonsterId",
  "aktifSavasMonsterHp"
];

