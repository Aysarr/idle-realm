import { state, CAN_YENILENME_MS } from "./state.js";
import { tumEkraniCiz, cubuklariGuncelle } from "./ui.js";
import {
  oyunuYukle, oyunuKaydet, kayitVarMi, kayitOzeti, kaydiSil
} from "./save.js";
import { aksiyonBaslat, savasBaslat, canYenilenmeTuru } from "./gameplay.js";

// ============================================================
// AÇILIŞ MENÜSÜ
//
// Oyun artık açılır açılmaz başlamıyor. Önce bu menü çıkıyor,
// oyuncu seçim yapınca oyunuBaslat() çalışıyor.
// Bunun bir faydası da şu: offline ilerleme özeti, oyuncu
// hazır olduğunda gösteriliyor.
// ============================================================

function sureMetni(ms) {
  let dakika = Math.floor(ms / 60000);

  if (dakika < 1) {
    return "az önce";
  }
  if (dakika < 60) {
    return dakika + " dakika önce";
  }

  let saat = Math.floor(dakika / 60);
  if (saat < 24) {
    return saat + " saat önce";
  }

  return Math.floor(saat / 24) + " gün önce";
}

export function anaMenuGoster() {
  let ekran = document.getElementById("menu-ekrani");
  if (ekran === null) {
    return;
  }

  let html =
    "<div class='menu-kutu'>" +
    "<div class='menu-logo'>⚔️</div>" +
    "<div class='menu-oyun-adi'>Idle Realm</div>" +
    "<div class='menu-slogan'>Topla · Üret · Savaş</div>";

  let ozet = kayitOzeti();

  if (ozet !== null) {
    html = html +
      "<div class='menu-kayit-bilgi'>" +
      "Toplam seviye <strong>" + ozet.toplamSeviye + "</strong> · " +
      "🪙 <strong>" + ozet.altin + "</strong><br>" +
      "<span class='menu-kucuk'>Son oynama: " +
      sureMetni(Date.now() - ozet.kayitZamani) + "</span>" +
      "</div>";

    html = html +
      "<button class='menu-buton ana' onclick='menuDevamEt()'>Devam Et</button>";
    html = html +
      "<button class='menu-buton' onclick='menuYeniOyun()'>Yeni Oyun</button>";
  } else {
    html = html +
      "<div class='menu-kayit-bilgi'>" +
      "Kaydedilmiş oyun bulunamadı." +
      "</div>";
    html = html +
      "<button class='menu-buton ana' onclick='menuYeniOyun()'>Yeni Oyun</button>";
  }

  html = html +
    "<button class='menu-buton kucuk' onclick='menuYedektenYukle()'>" +
    "Yedekten Yükle</button>";

  html = html + "</div>";

  ekran.innerHTML = html;
  ekran.className = "acik";
}

function menuyuKapat() {
  let ekran = document.getElementById("menu-ekrani");
  if (ekran !== null) {
    ekran.className = "";
  }
}

// Oyunu gerçekten başlatan fonksiyon: kaydı yükler,
// kaldığı aktiviteyi sürdürür, zamanlayıcıları kurar.
function oyunuBaslat(kayitYuklensinMi) {
  if (kayitYuklensinMi) {
    oyunuYukle();

    if (state.devamEdilecekSavasId) {
      savasBaslat(state.devamEdilecekSavasId);
      state.devamEdilecekSavasId = null;
    } else if (state.devamEdilecekAksiyonId) {
      aksiyonBaslat(state.devamEdilecekAksiyonId);
      state.devamEdilecekAksiyonId = null;
    }
  }

  menuyuKapat();
  tumEkraniCiz();

  // Zamanlayıcılar ancak oyun başlayınca kurulur -
  // menüdeyken otomatik kayıt çalışmasın istiyoruz
  window.addEventListener("beforeunload", oyunuKaydet);
  setInterval(oyunuKaydet, 5000);
  setInterval(cubuklariGuncelle, 50);
  setInterval(canYenilenmeTuru, CAN_YENILENME_MS);
}

export function menuDevamEt() {
  oyunuBaslat(true);
}

export function menuYeniOyun() {
  if (kayitVarMi()) {
    let onay = confirm(
      "Kayıtlı bir oyunun var.\n\n" +
      "Yeni oyuna başlarsan o ilerleme silinecek.\n" +
      "Devam edilsin mi?"
    );
    if (onay === false) {
      return;
    }
    kaydiSil();
  }

  oyunuBaslat(false);
}

export function menuYedektenYukle() {
  let metin = prompt("Yedek metnini buraya yapıştır:");

  if (metin === null || metin.trim() === "") {
    return;
  }

  try {
    let test = JSON.parse(metin);
    if (!test.skills) {
      throw new Error("skills yok");
    }
  } catch (hata) {
    alert("Bu metin geçerli bir yedek değil.");
    return;
  }

  localStorage.setItem("idle-realm-kayit", metin);
  location.reload();
}