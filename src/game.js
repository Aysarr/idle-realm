import { anaMenuGoster, menuDevamEt, menuYeniOyun, menuYedektenYukle } from "./menu.js";
import {
  sekmeAc, yardimDegistir, savasStiliSec,
  aksiyonBaslat, aksiyonDurdur,
  savasBaslat, savasDurdur,
  slotTikla, ekipmanKusan, ekipmanCikar,
  yemekYe, otomatikYemekDegistir, otomatikYemekEsigiAyarla,
  satinAl, sat,
  envanterSekmesiAc, envanterSekmesiEkle, envanterSekmesiSil, itemSekmeDegistir,
  sekmeTikla, ikonIcinSec, ikonSurukleBasla,
  ikonSurukleUzerinde, ikonBirak, ikonSurukleBitti,
  oyunuSifirla, kaydiDisaAktar, kaydiIceAktar,bolgeSec,
  oyuncuAdiDegistir,  clanKur, clanDagit, clanaBagisla, clanAmblemiDegistir,
} from "./gameplay.js";

// ============================================================
// GİRİŞ NOKTASI
// Butonları bağlar, sonra açılış menüsünü gösterir.
// Oyun, menüden seçim yapılınca başlar (bkz. menu.js).
// ============================================================

window.sekmeAc = sekmeAc;
window.yardimDegistir = yardimDegistir;
window.savasStiliSec = savasStiliSec;
window.aksiyonBaslat = aksiyonBaslat;
window.aksiyonDurdur = aksiyonDurdur;
window.savasBaslat = savasBaslat;
window.savasDurdur = savasDurdur;
window.slotTikla = slotTikla;
window.ekipmanKusan = ekipmanKusan;
window.ekipmanCikar = ekipmanCikar;
window.yemekYe = yemekYe;
window.otomatikYemekDegistir = otomatikYemekDegistir;
window.otomatikYemekEsigiAyarla = otomatikYemekEsigiAyarla;
window.satinAl = satinAl;
window.sat = sat;
window.envanterSekmesiAc = envanterSekmesiAc;
window.envanterSekmesiEkle = envanterSekmesiEkle;
window.envanterSekmesiSil = envanterSekmesiSil;
window.itemSekmeDegistir = itemSekmeDegistir;
window.sekmeTikla = sekmeTikla;
window.ikonIcinSec = ikonIcinSec;
window.ikonSurukleBasla = ikonSurukleBasla;
window.ikonSurukleUzerinde = ikonSurukleUzerinde;
window.ikonBirak = ikonBirak;
window.ikonSurukleBitti = ikonSurukleBitti;
window.oyunuSifirla = oyunuSifirla;
window.kaydiDisaAktar = kaydiDisaAktar;
window.kaydiIceAktar = kaydiIceAktar;
window.bolgeSec = bolgeSec;
window.oyuncuAdiDegistir = oyuncuAdiDegistir;
window.clanKur = clanKur;
window.clanDagit = clanDagit;
window.clanaBagisla = clanaBagisla;
window.clanAmblemiDegistir = clanAmblemiDegistir;

window.menuDevamEt = menuDevamEt;
window.menuYeniOyun = menuYeniOyun;
window.menuYedektenYukle = menuYedektenYukle;

anaMenuGoster();