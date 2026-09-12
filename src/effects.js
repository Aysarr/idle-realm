// ============================================================
// GÖRSEL EFEKTLER
//
// Uçuşan hasar sayıları, parlamalar gibi kısa ömürlü görseller.
//
// Bunlar normal arayüz akışının DIŞINDA çalışır: tumEkraniCiz()
// her şeyi yeniden çizdiği için, efektler ayrı bir katmanda
// (#efekt-katmani) durur ve kendi zamanlayıcısıyla silinir.
// ============================================================

function efektKatmani() {
  return document.getElementById("efekt-katmani");
}

// Bir elemanın ekrandaki konumunu bulur
function elemanKonumu(secici) {
  let eleman = document.querySelector(secici);
  if (eleman === null) {
    return null;
  }

  let k = eleman.getBoundingClientRect();
  return {
    x: k.left + k.width / 2,
    y: k.top + k.height / 2,
    genislik: k.width,
    yukseklik: k.height
  };
}

// ---------- UÇUŞAN SAYI ----------
//
// tur: "hasar" (kırmızı), "iyilesme" (yeşil), "iskala" (gri),
//      "altin" (altın sarısı), "xp" (mavi)

export function ucanSayi(metin, tur, secici) {
  let katman = efektKatmani();
  if (katman === null) {
    return;
  }

  let konum = elemanKonumu(secici);
  if (konum === null) {
    return;
  }

  let el = document.createElement("div");
  el.className = "ucan-sayi " + tur;
  el.textContent = metin;

  // Aynı anda birkaç sayı çıkarsa üst üste binmesin
  let sapma = (Math.random() - 0.5) * konum.genislik * 0.5;
  el.style.left = (konum.x + sapma) + "px";
  el.style.top = konum.y + "px";

  katman.appendChild(el);

  setTimeout(function () {
    el.remove();
  }, 1100);
}

// ---------- PARLAMA ----------
// Bir elemanı kısa süre parlatır (seviye atlama gibi anlar)

export function parlat(secici, renk) {
  let eleman = document.querySelector(secici);
  if (eleman === null) {
    return;
  }

  eleman.classList.remove("parlama");
  // Tarayıcıyı sınıfı yeniden işlemeye zorlar; yoksa arka arkaya
  // çağrılarda animasyon tekrar başlamaz
  void eleman.offsetWidth;

  if (renk) {
    eleman.style.setProperty("--parlama-renk", renk);
  }

  eleman.classList.add("parlama");

  setTimeout(function () {
    eleman.classList.remove("parlama");
  }, 700);
}

// ---------- EKRAN SARSINTISI ----------
// Ölüm gibi sert anlarda

export function sarsit() {
  let govde = document.getElementById("uygulama");
  if (govde === null) {
    return;
  }

  govde.classList.remove("sarsinti");
  void govde.offsetWidth;
  govde.classList.add("sarsinti");

  setTimeout(function () {
    govde.classList.remove("sarsinti");
  }, 400);
}