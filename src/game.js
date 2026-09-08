import { tumEkraniCiz, cubuklariGuncelle } from "./ui.js";
import { oyunuKaydet, oyunuYukle } from "./save.js";
import {
  sekmeAc,
  aksiyonBaslat, aksiyonDurdur,
  savasBaslat, savasDurdur,
  slotTikla, ekipmanKusan, ekipmanCikar,
  yemekYe, otomatikYemekDegistir,
  satinAl, sat
} from "./gameplay.js";

// ============================================================
// GİRİŞ NOKTASI
// Bu dosya oyunu KURAR ve BAŞLATIR, mantık içermez.
// ============================================================

// HTML içindeki onclick'lerin bu fonksiyonlara ulaşabilmesi için
// onları window (tarayıcının genel alanı) üzerine koyuyoruz.
window.sekmeAc = sekmeAc;
window.aksiyonBaslat = aksiyonBaslat;
window.aksiyonDurdur = aksiyonDurdur;
window.savasBaslat = savasBaslat;
window.savasDurdur = savasDurdur;
window.slotTikla = slotTikla;
window.ekipmanKusan = ekipmanKusan;
window.ekipmanCikar = ekipmanCikar;
window.yemekYe = yemekYe;
window.otomatikYemekDegistir = otomatikYemekDegistir;
window.satinAl = satinAl;
window.sat = sat;

// Sekme kapanırken son bir kez kaydet
window.addEventListener("beforeunload", oyunuKaydet);

// Sırayla: kaydı yükle, ekranı çiz, döngüleri başlat
oyunuYukle();
tumEkraniCiz();

setInterval(oyunuKaydet, 5000);
setInterval(cubuklariGuncelle, 50);