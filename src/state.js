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
  altin: 0,

  // Oyuncu
  oyuncuHp: 30,
  temelMaxHp: 30,
  temelSaldiri: 5,

  // Hangi slotta hangi eşya takılı
  ekipman: {},

  // Ayarlar
  otomatikYemekAcik: false,

  // Aktif toplama/üretim aksiyonu
  aktifAksiyonId: null,
  aktifZamanlayici: null,
  aksiyonBaslangicZamani: 0,

  // Aktif savaş
  aktifSavasMonsterId: null,
  aktifSavasMonsterHp: 0,
  aktifSavasZamanlayici: null,
  savasTuruBaslangicZamani: 0,
  savasKayitlari: [],

  // Arayüz durumu (kaydedilmez)
  acikSekme: "character",
  secilenSlot: null
};

// Savaşta iki saldırı arası süre
export const SAVAS_TUR_SURESI = 2000;

export function ekipmaniSifirla() {
  state.ekipman = {};
  for (let i = 0; i < ekipmanSlotlari.length; i++) {
    state.ekipman[ekipmanSlotlari[i].id] = null;
  }
}

ekipmaniSifirla();