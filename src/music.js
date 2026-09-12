// ============================================================
// MÜZİK
//
// Ses efektlerinden (sound.js) AYRI bir sistem:
//   - Uzun dosyalar, HTML5 Audio ile çalınıyor (Web Audio değil)
//   - Döngüye alınıyor
//   - İki parça arası yumuşak geçiş (crossfade)
//   - Kendi ses seviyesi ayarı var
//
// AYARLAR NEREDE SAKLANIYOR:
// Müzik tercihi karaktere değil CİHAZA ait. Sebebi: menü müziği,
// herhangi bir karakter yüklenmeden önce çalıyor. Bu yüzden
// state'te değil, kendi localStorage anahtarında duruyor.
//
// TARAYICI KISITI:
// Tarayıcılar kullanıcı bir şeye tıklamadan ses çalmaya izin
// vermez. Menü sayfa açılır açılmaz görünüyor, yani o anda
// müzik başlatamıyoruz. Çözüm: ilk tıklamayı/tuşa basmayı
// dinleyip müziği o anda başlatıyoruz (bkz. ilkEtkilesimiBekle).
// ============================================================

const AYAR_ANAHTARI = "everforge-muzik";

const PARCALAR = {
  menu: "muzik/menu.mp3",
  oyun: "muzik/oyun.mp3"
};

let ayarlar = { acik: true, seviye: 0.35 };
let calanlar = {};        // { menu: Audio, oyun: Audio }
let aktifParca = null;    // "menu" | "oyun" | null
let beklemedekiParca = null;
let etkilesimOldu = false;

// ---------- AYARLARI OKU / YAZ ----------

function ayarlariOku() {
  try {
    let metin = localStorage.getItem(AYAR_ANAHTARI);
    if (metin === null) {
      return;
    }
    let veri = JSON.parse(metin);
    if (typeof veri.acik === "boolean") {
      ayarlar.acik = veri.acik;
    }
    if (typeof veri.seviye === "number") {
      ayarlar.seviye = veri.seviye;
    }
  } catch (hata) {
    // Bozuk ayar varsa varsayılanla devam et
  }
}

function ayarlariYaz() {
  try {
    localStorage.setItem(AYAR_ANAHTARI, JSON.stringify(ayarlar));
  } catch (hata) {
    // Kayıt başarısızsa sessizce geç — müzik ayarı kritik değil
  }
}

ayarlariOku();

export function muzikAcikMi() {
  return ayarlar.acik;
}

export function muzikSeviyesiAl() {
  return ayarlar.seviye;
}

// ---------- AUDIO NESNELERİ ----------

function sesNesnesi(parcaAdi) {
  if (calanlar[parcaAdi]) {
    return calanlar[parcaAdi];
  }

  let ses = new Audio(PARCALAR[parcaAdi]);
  ses.loop = true;
  ses.volume = 0;
  ses.preload = "auto";

  // Dosya yoksa veya bozuksa sessizce geç — oyun çalışmaya devam etsin
  ses.addEventListener("error", function () {
    console.warn("Müzik dosyası yüklenemedi: " + PARCALAR[parcaAdi]);
  });

  calanlar[parcaAdi] = ses;
  return ses;
}

// ---------- YUMUŞAK GEÇİŞ ----------
//
// Ani başlayan/kesilen müzik rahatsız edici olur.
// Ses seviyesini küçük adımlarla değiştiriyoruz.

function sesiKaydir(ses, hedefSeviye, sureMs, bitinceDurdur) {
  let baslangic = ses.volume;
  let fark = hedefSeviye - baslangic;
  let adimSayisi = Math.max(1, Math.round(sureMs / 50));
  let adim = 0;

  let zamanlayici = setInterval(function () {
    adim = adim + 1;
    let oran = adim / adimSayisi;

    let yeni = baslangic + fark * oran;
    if (yeni < 0) yeni = 0;
    if (yeni > 1) yeni = 1;
    ses.volume = yeni;

    if (adim >= adimSayisi) {
      clearInterval(zamanlayici);
      if (bitinceDurdur) {
        ses.pause();
        ses.currentTime = 0;
      }
    }
  }, 50);
}

// ---------- ANA İŞLEV: PARÇA ÇAL ----------

export function muzikCal(parcaAdi) {
  if (PARCALAR[parcaAdi] === undefined) {
    return;
  }

  // Aynı parça zaten çalıyorsa dokunma
  if (aktifParca === parcaAdi && ayarlar.acik) {
    return;
  }

  // Kullanıcı henüz etkileşime geçmediyse sıraya al
  if (etkilesimOldu === false) {
    beklemedekiParca = parcaAdi;
    return;
  }

  // Öncekini yumuşakça sustur
  if (aktifParca !== null && calanlar[aktifParca]) {
    sesiKaydir(calanlar[aktifParca], 0, 700, true);
  }

  aktifParca = parcaAdi;

  if (ayarlar.acik === false) {
    return;
  }

  let ses = sesNesnesi(parcaAdi);
  ses.volume = 0;

  let sozu = ses.play();

  // play() bir Promise döndürebilir; reddedilirse sessizce geç
  if (sozu !== undefined && sozu.catch) {
    sozu.catch(function () {
      // Tarayıcı izin vermedi — bir sonraki etkileşimde denenecek
      etkilesimOldu = false;
      beklemedekiParca = parcaAdi;
    });
  }

  sesiKaydir(ses, ayarlar.seviye, 1200, false);
}

// ---------- İLK ETKİLEŞİMİ BEKLE ----------
//
// Tarayıcı izni için: ilk tıklama veya tuşa basma anında
// bekleyen parçayı başlatıyoruz. Dinleyici bir kez çalışıp
// kendini kaldırıyor.

export function ilkEtkilesimiBekle() {
  if (etkilesimOldu) {
    return;
  }

  function tetikle() {
    if (etkilesimOldu) {
      return;
    }

    etkilesimOldu = true;
    document.removeEventListener("pointerdown", tetikle);
    document.removeEventListener("keydown", tetikle);

    if (beklemedekiParca !== null) {
      let p = beklemedekiParca;
      beklemedekiParca = null;
      aktifParca = null;   // muzikCal'ın "aynı parça" kontrolünü atla
      muzikCal(p);
    }
  }

  document.addEventListener("pointerdown", tetikle);
  document.addEventListener("keydown", tetikle);
}

// ---------- AYAR DEĞİŞTİRME ----------

export function muzikAcKapat() {
  ayarlar.acik = !ayarlar.acik;
  ayarlariYaz();

  if (ayarlar.acik === false) {
    // Kapatılınca çalanı sustur
    if (aktifParca !== null && calanlar[aktifParca]) {
      sesiKaydir(calanlar[aktifParca], 0, 400, true);
    }
  } else {
    // Açılınca aktif parçayı yeniden başlat
    let p = aktifParca;
    aktifParca = null;
    if (p !== null) {
      muzikCal(p);
    }
  }

  return ayarlar.acik;
}

export function muzikSeviyesiAyarla(deger) {
  if (deger < 0) deger = 0;
  if (deger > 1) deger = 1;

  ayarlar.seviye = deger;
  ayarlariYaz();

  // Çalan parçanın sesini anında güncelle
  if (ayarlar.acik && aktifParca !== null && calanlar[aktifParca]) {
    calanlar[aktifParca].volume = deger;
  }
}

// Ayarlar sayfasındaki "Dinle" butonu için
export function muzikOrnekCal() {
  if (aktifParca === null) {
    muzikCal("oyun");
    return;
  }

  // Zaten çalıyorsa kısa bir ses artışıyla belli et
  let ses = calanlar[aktifParca];
  if (ses) {
    sesiKaydir(ses, Math.min(1, ayarlar.seviye + 0.15), 200, false);
    setTimeout(function () {
      sesiKaydir(ses, ayarlar.seviye, 400, false);
    }, 400);
  }
}
