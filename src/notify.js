// ============================================================
// BİLDİRİMLER
//
// İki seviye var:
//
//   bildirimGoster  — sağ altta küçük kutu. Sık olaylar için:
//                     loot, alışveriş, hata, malzeme bitti.
//
//   bildirimBuyuk   — ekran ortasında büyük gösterim. Nadir ve
//                     önemli anlar için: başarım, clan seviyesi,
//                     yeni bölge, 10'un katı yetenek seviyesi.
//
// Ayrım önemli: her seviye atlamada ekranın ortasına bir şey
// çıkarsa erken oyunda (saniyede bir seviye) rahatsız edici olur.
//
// Bu dosya hiçbir şey import etmez — bu yüzden her yerden
// güvenle çağrılabilir, döngüsel bağımlılık riski yok.
// ============================================================

export function bildirimGoster(mesaj, tur) {
  let kap = document.getElementById("bildirimler");
  if (kap === null) {
    return;
  }

  let kutu = document.createElement("div");
  kutu.className = "bildirim";

  if (tur) {
    kutu.className = kutu.className + " " + tur;
  }

  kutu.innerHTML = mesaj;
  kap.appendChild(kutu);

  setTimeout(function () {
    kutu.remove();
  }, 3000);
}

// ---------- BÜYÜK BİLDİRİM ----------
//
// tur: "seviye" | "basarim" | "bolge" | "clan"
// Her tür kendi rengini ve ikon çerçevesini alıyor.

export function bildirimBuyuk(ikon, baslik, altYazi, tur) {
  let kap = document.getElementById("buyuk-bildirim");
  if (kap === null) {
    return;
  }

  // Önceki gösterim hâlâ duruyorsa temizle — üst üste binmesin
  kap.innerHTML = "";

  let kutu = document.createElement("div");
  kutu.className = "buyuk-kutu " + (tur ? tur : "");

  kutu.innerHTML =
    "<div class='buyuk-parlama'></div>" +
    "<div class='buyuk-ikon'>" + ikon + "</div>" +
    "<div class='buyuk-baslik'>" + baslik + "</div>" +
    (altYazi ? "<div class='buyuk-alt'>" + altYazi + "</div>" : "");

  kap.appendChild(kutu);
  kap.className = "acik";

  setTimeout(function () {
    kutu.className = kutu.className + " cikiyor";
  }, 1700);

  setTimeout(function () {
    kutu.remove();
    if (kap.children.length === 0) {
      kap.className = "";
    }
  }, 2300);
}
