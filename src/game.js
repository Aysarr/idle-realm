import {
  anaMenuGoster, menuDevamEt, menuYeniOyun, menuYedektenYukle, menuSlotSil
} from "./menu.js";
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
   clanKur, clanDagit, nisanBagisla, clanAmblemiDegistir,
  clanYukseltmeAl, depoyaKoy, depodanAl, depoyaKoySor, depodanAlSor,
  aletYukselt, ziyafetYe, dukkanYukseltmeAl, satSor,
  sesAcKapat, sesSeviyesiDegistir, sesOrnekCal, aksiyonSesiDegistir,
  muzikAcKapatBtn, muzikSeviyesiDegistir, muzikDinle,
  kronikOku, envanterEsyaSec, envanterSecimiKapat,
} from "./gameplay.js";
import { bonuslariTemizle } from "./core.js";

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
window.clanKur = clanKur;
window.clanDagit = clanDagit;
window.nisanBagisla = nisanBagisla;
window.clanAmblemiDegistir = clanAmblemiDegistir;
window.clanYukseltmeAl = clanYukseltmeAl;
window.depoyaKoy = depoyaKoy;
window.depodanAl = depodanAl;
window.depoyaKoySor = depoyaKoySor;
window.depodanAlSor = depodanAlSor;
window.aletYukselt = aletYukselt;
window.ziyafetYe = ziyafetYe;
window.dukkanYukseltmeAl = dukkanYukseltmeAl;
window.satSor = satSor;
window.sesAcKapat = sesAcKapat;
window.sesSeviyesiDegistir = sesSeviyesiDegistir;
window.sesOrnekCal = sesOrnekCal;
window.aksiyonSesiDegistir = aksiyonSesiDegistir;
window.muzikAcKapatBtn = muzikAcKapatBtn;
window.muzikSeviyesiDegistir = muzikSeviyesiDegistir;
window.muzikDinle = muzikDinle;
window.kronikOku = kronikOku;
window.envanterEsyaSec = envanterEsyaSec;
window.envanterSecimiKapat = envanterSecimiKapat;

window.menuDevamEt = menuDevamEt;
window.menuYeniOyun = menuYeniOyun;
window.menuYedektenYukle = menuYedektenYukle;
window.menuSlotSil = menuSlotSil;

anaMenuGoster();

// Süresi dolan bonusları temizle ve ekranı tazele
setInterval(function () {
  if (bonuslariTemizle()) {
    tumEkraniCiz();
  }
}, 2000);