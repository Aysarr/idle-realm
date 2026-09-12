import { state, CAN_YENILENME_MS } from "./state.js";
import { tumEkraniCiz, cubuklariGuncelle } from "./ui.js";
import {
  oyunuYukle, oyunuKaydet, kayitVarMi, kayitOzeti, kaydiSil, profilKur,
  kayitAnahtari, aktifSlotAyarla, MAX_SLOT
} from "./save.js";
import {
  aksiyonBaslat, savasBaslat, canYenilenmeTuru, acilisiGoster
} from "./gameplay.js";
import { istatistikArtir } from "./core.js";
import { bolgeler } from "./data/regions.js";
import { oyunPrompt, oyunConfirm, oyunAlert } from "./modal.js";
import {
  sesSistemiKur, sesSeviyesiAyarla, sesDegistir, sesAcikMi
} from "./sound.js";
import { muzikCal, ilkEtkilesimiBekle } from "./music.js";

// ============================================================
// AÇILIŞ MENÜSÜ
//
// İki kolonlu düzen:
//   Sol  — logo, sürüm, oyun hakkında kısa bilgi
//   Sağ  — üç kayıt bölmesi, her biri kendi özetiyle
//
// Oyun menüden seçim yapılınca başlıyor. Bunun bir faydası:
// tarayıcılar kullanıcı etkileşimi olmadan ses çalmaya izin
// vermez; menüdeki butona basıldığı için ses sistemini orada
// güvenle kurabiliyoruz.
// ============================================================

const SURUM = "0.9";

function sureMetni(ms) {
  let dakika = Math.floor(ms / 60000);

  if (dakika < 1) {
    return "az önce";
  }
  if (dakika < 60) {
    return dakika + " dk önce";
  }

  let saat = Math.floor(dakika / 60);
  if (saat < 24) {
    return saat + " saat önce";
  }

  return Math.floor(saat / 24) + " gün önce";
}

function oynamaSuresi(ms) {
  let saat = Math.floor(ms / 3600000);
  let dakika = Math.floor((ms % 3600000) / 60000);

  if (saat > 0) {
    return saat + "s " + dakika + "dk";
  }
  return dakika + " dk";
}

function bolgeAdi(bolgeId) {
  for (let i = 0; i < bolgeler.length; i++) {
    if (bolgeler[i].id === bolgeId) {
      return bolgeler[i].ikon + " " + bolgeler[i].isim;
    }
  }
  return "🏘️ Köy Çevresi";
}

// ---------- TEK BİR KAYIT BÖLMESİ ----------

function slotHtml(slot) {
  let ozet = kayitOzeti(slot);

  // --- Boş bölme ---
  if (ozet === null) {
    return "<div class='slot-kart bos' onclick='menuYeniOyun(" + slot + ")'>" +
      "<div class='slot-no'>" + slot + ". Bölme</div>" +
      "<div class='slot-bos-ic'>" +
      "<div class='slot-bos-ikon'>✦</div>" +
      "<div class='slot-bos-yazi'>Yeni karakter oluştur</div>" +
      "</div></div>";
  }

  // --- Dolu bölme ---
  let html = "<div class='slot-kart dolu'>" +
    "<div class='slot-ust'>" +
    "<span class='slot-no'>" + slot + ". Bölme</span>" +
    "<span class='slot-zaman'>" +
    sureMetni(Date.now() - ozet.kayitZamani) + "</span>" +
    "</div>";

  html = html +
    "<div class='slot-govde'>" +
    "<div class='slot-avatar'>🧙</div>" +
    "<div class='slot-kimlik'>" +
    "<div class='slot-ad'>" + ozet.oyuncuAdi + "</div>" +
    "<div class='slot-alt'>" +
    (ozet.clanAdi !== null
      ? ozet.clanAmblem + " " + ozet.clanAdi
      : "<span class='slot-sonuk'>Clan yok</span>") +
    "</div>" +
    "</div>" +
    "</div>";

  // Dört küçük istatistik
  html = html +
    "<div class='slot-istatistikler'>" +
    "<div class='slot-ist'><span class='slot-ist-etiket'>Toplam Sv</span>" +
    "<span class='slot-ist-deger'>" + ozet.toplamSeviye + "</span></div>" +
    "<div class='slot-ist'><span class='slot-ist-etiket'>Altın</span>" +
    "<span class='slot-ist-deger altin'>" +
    ozet.altin.toLocaleString() + "</span></div>" +
    "<div class='slot-ist'><span class='slot-ist-etiket'>Öldürme</span>" +
    "<span class='slot-ist-deger'>" +
    ozet.oldurulen.toLocaleString() + "</span></div>" +
    "<div class='slot-ist'><span class='slot-ist-etiket'>Süre</span>" +
    "<span class='slot-ist-deger'>" +
    oynamaSuresi(ozet.oyunSuresiMs) + "</span></div>" +
    "</div>";

  html = html +
    "<div class='slot-bolge'>" + bolgeAdi(ozet.bolge) + "</div>";

  html = html +
    "<div class='slot-butonlar'>" +
    "<button class='slot-buton ana' onclick='menuDevamEt(" + slot + ")'>" +
    "Devam Et</button>" +
    "<button class='slot-buton kucuk' onclick='menuSlotSil(" + slot + ")' " +
    "title='Bu bölmeyi sil'>🗑</button>" +
    "</div>";

  return html + "</div>";
}

// ---------- ANA MENÜ ----------

export function anaMenuGoster() {
  let ekran = document.getElementById("menu-ekrani");
  if (ekran === null) {
    return;
  }

  let html = "<div class='menu-duzen'>";

  // ===== SOL KOLON =====
  html = html +
    "<div class='menu-sol'>" +
    "<img src='logo.png' alt='EVERFORGE' class='menu-logo-resim'>" +
    "<div class='menu-slogan'>Topla · Üret · Savaş</div>" +
    "<div class='menu-surum'>Sürüm " + SURUM + "</div>" +
    "<div class='menu-tanitim'>" +
    "<p>Gölge Diyarı'ndan yayılan <strong>Sönüm</strong>, renkleri ve " +
    "sıcaklığı yavaşça emiyor.</p>" +
    "<p>Köy bu yolun son yerleşik noktası. Hâlâ ekmek pişiriyorlar, " +
    "hâlâ her akşam fenerleri yakıyorlar.</p>" +
    "<p>İçeri doğru her adım, kaynağa bir adım daha yakın.</p>" +
    "</div>" +
    "<div class='menu-ozellikler'>" +
    "<span class='menu-etiket'>12 Yetenek</span>" +
    "<span class='menu-etiket'>6 Bölge</span>" +
    "<span class='menu-etiket'>Çevrimdışı İlerleme</span>" +
    "</div>" +
    "</div>";

  // ===== SAĞ KOLON =====
  html = html +
    "<div class='menu-sag'>" +
    "<div class='menu-sag-baslik'>Karakterini Seç</div>" +
    "<div class='menu-uyari'>⚠️ Kayıtlar bu tarayıcıda saklanır. " +
    "Önemli bir aşamada Ayarlar'dan yedek almayı unutma.</div>" +
    "<div class='slot-listesi'>";

  for (let i = 1; i <= MAX_SLOT; i++) {
    html = html + slotHtml(i);
  }

  html = html + "</div>";

  html = html +
    "<button class='menu-buton kucuk' onclick='menuYedektenYukle()'>" +
    "📋 Yedekten Yükle</button>";

  html = html + "</div></div>";

  ekran.innerHTML = html;
  ekran.className = "acik";

  // Tarayıcı izni için ilk tıklamayı bekle, sonra menü müziğini başlat
  ilkEtkilesimiBekle();
  muzikCal("menu");
}

function menuyuKapat() {
  let ekran = document.getElementById("menu-ekrani");
  if (ekran !== null) {
    ekran.className = "";
  }
}

// ---------- OYUNU BAŞLAT ----------

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

  profilKur();

  // --- SES SİSTEMİ ---
  // Tarayıcı ses çalmaya ancak kullanıcı etkileşiminden sonra
  // izin verir. Menüdeki butona basıldığı için burası güvenli.
  sesSistemiKur();
  sesSeviyesiAyarla(state.sesSeviyesi);

  if (state.sesAcik === false && sesAcikMi() === true) {
    sesDegistir();
  }

  // Oynama süresini say
  setInterval(function () {
    istatistikArtir("toplamOyunSuresiMs", 10000);
  }, 10000);

  // Menü müziğinden oyun müziğine yumuşak geçiş
  muzikCal("oyun");

  menuyuKapat();
  tumEkraniCiz();

  // Zamanlayıcılar ancak oyun başlayınca kurulur —
  // menüdeyken otomatik kayıt çalışmasın istiyoruz
  window.addEventListener("beforeunload", oyunuKaydet);
  setInterval(oyunuKaydet, 5000);
  setInterval(cubuklariGuncelle, 50);
  setInterval(canYenilenmeTuru, CAN_YENILENME_MS);
}

export function menuDevamEt(slot) {
  aktifSlotAyarla(slot);
  oyunuBaslat(true);
}

export function menuYeniOyun(slot) {
  aktifSlotAyarla(slot);

  if (kayitVarMi(slot)) {
    oyunConfirm("Yeni Oyun",
      slot + ". bölmede kayıtlı bir oyun var. Yeni oyuna başlarsan " +
      "o ilerleme silinecek.",
      "Yeni Başla",
      function () {
        kaydiSil(slot);
        oyunuBaslat(false);
        acilisiGoster();
      });
    return;
  }

  oyunuBaslat(false);
  acilisiGoster();
}

export function menuSlotSil(slot) {
  let ozet = kayitOzeti(slot);
  if (ozet === null) {
    return;
  }

  oyunConfirm("Bölme Silinsin mi?",
    "\"" + ozet.oyuncuAdi + "\" karakteri ve tüm ilerlemesi silinecek.\n" +
    "Bu işlem geri alınamaz.",
    "Sil",
    function () {
      kaydiSil(slot);
      anaMenuGoster();
    });
}

export function menuYedektenYukle() {
  oyunPrompt("Yedekten Yükle",
    "Yedek metnini yapıştır. Hangi bölmeye yükleneceğini " +
    "sonra soracağım.", "",
    function (metin) {
      if (metin.trim() === "") {
        return;
      }

      try {
        let test = JSON.parse(metin);
        if (!test.skills) {
          throw new Error("skills yok");
        }
      } catch (hata) {
        oyunAlert("Geçersiz Yedek", "Bu metin geçerli bir yedek değil.");
        return;
      }

      oyunPrompt("Hangi Bölme?",
        "1, 2 veya 3 yaz. O bölmedeki kayıt varsa üzerine yazılır.",
        "1",
        function (cevap) {
          let slot = parseInt(cevap);
          if (isNaN(slot) || slot < 1 || slot > MAX_SLOT) {
            return;
          }

          localStorage.setItem(kayitAnahtari(slot), metin);
          anaMenuGoster();
          oyunAlert("Yüklendi",
            slot + ". bölmeye yazıldı. Devam Et'e basarak oynayabilirsin.");
        });
    });
}
