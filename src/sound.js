// ============================================================
// SES EFEKTLERİ
//
// Ses DOSYASI kullanmıyoruz — sesler Web Audio API ile koddan
// üretiliyor. Böylece indirilecek dosya yok (PWA hafif kalıyor)
// ve tonlar kolayca ayarlanabiliyor.
//
// Tarayıcılar, kullanıcı sayfayla etkileşime geçmeden ses
// çalmaya izin vermez. Bu yüzden AudioContext ilk tıklamada
// kuruluyor (bkz. sesSistemiKur).
// ============================================================

let ses = null;
let acikMi = true;
let sesSeviyesi = 0.3;

export function sesSistemiKur() {
  if (ses !== null) {
    return;
  }

  try {
    let AC = window.AudioContext || window.webkitAudioContext;
    ses = new AC();
  } catch (hata) {
    ses = null;
  }
}

export function sesAcikMi() {
  return acikMi;
}

export function sesDegistir() {
  acikMi = !acikMi;
  return acikMi;
}

export function sesSeviyesiAyarla(deger) {
  sesSeviyesi = deger;
}

export function sesSeviyesiAl() {
  return sesSeviyesi;
}

// Tek bir ton çalar.
//   frekans : Hz cinsinden perde (440 = la notası)
//   sure    : saniye
//   tip     : "sine" yumuşak, "square" keskin, "triangle" arası
//   gecikme : kaç saniye sonra başlasın (akor/melodi için)
function ton(frekans, sure, tip, gecikme, hacim) {
  if (ses === null || acikMi === false) {
    return;
  }

  if (ses.state === "suspended") {
    ses.resume();
  }

  let baslangic = ses.currentTime + (gecikme ? gecikme : 0);

  let osc = ses.createOscillator();
  let kazanc = ses.createGain();

  osc.type = tip ? tip : "sine";
  osc.frequency.value = frekans;

  let tepe = sesSeviyesi * (hacim !== undefined ? hacim : 1);

  // Yumuşak giriş-çıkış: ani başlangıç "tık" sesi yapar
  kazanc.gain.setValueAtTime(0, baslangic);
  kazanc.gain.linearRampToValueAtTime(tepe, baslangic + 0.01);
  kazanc.gain.exponentialRampToValueAtTime(0.001, baslangic + sure);

  osc.connect(kazanc);
  kazanc.connect(ses.destination);

  osc.start(baslangic);
  osc.stop(baslangic + sure + 0.02);
}

// Gürültü tabanlı ses (vuruş, ıskalama gibi tok sesler için)
function gurultu(sure, hacim, filtreHz) {
  if (ses === null || acikMi === false) {
    return;
  }

  if (ses.state === "suspended") {
    ses.resume();
  }

  let ornekSayisi = Math.floor(ses.sampleRate * sure);
  let tampon = ses.createBuffer(1, ornekSayisi, ses.sampleRate);
  let veri = tampon.getChannelData(0);

  for (let i = 0; i < ornekSayisi; i++) {
    veri[i] = (Math.random() * 2 - 1) * (1 - i / ornekSayisi);
  }

  let kaynak = ses.createBufferSource();
  kaynak.buffer = tampon;

  let filtre = ses.createBiquadFilter();
  filtre.type = "lowpass";
  filtre.frequency.value = filtreHz ? filtreHz : 1000;

  let kazanc = ses.createGain();
  kazanc.gain.value = sesSeviyesi * (hacim !== undefined ? hacim : 1);

  kaynak.connect(filtre);
  filtre.connect(kazanc);
  kazanc.connect(ses.destination);

  kaynak.start();
}

// ============================================================
// OYUN SESLERİ
// ============================================================

export function sesAksiyonTamam() {
  ton(660, 0.08, "sine", 0, 0.35);
}

export function sesSeviyeAtladi() {
  // Yükselen üç nota — kutlama hissi
  ton(523, 0.12, "triangle", 0, 0.7);
  ton(659, 0.12, "triangle", 0.10, 0.7);
  ton(784, 0.22, "triangle", 0.20, 0.8);
}

export function sesUstalikAtladi() {
  ton(784, 0.10, "sine", 0, 0.5);
  ton(988, 0.16, "sine", 0.09, 0.5);
}

export function sesVurus() {
  gurultu(0.07, 0.5, 1400);
  ton(180, 0.06, "square", 0, 0.25);
}

export function sesIskalama() {
  gurultu(0.05, 0.25, 500);
}

export function sesCanavarOldu() {
  ton(440, 0.09, "triangle", 0, 0.55);
  ton(330, 0.16, "triangle", 0.08, 0.55);
}

export function sesLoot() {
  ton(880, 0.07, "sine", 0, 0.4);
  ton(1175, 0.10, "sine", 0.06, 0.4);
}

export function sesHasarAldin() {
  ton(140, 0.13, "square", 0, 0.35);
}

export function sesOldun() {
  // Alçalan iki nota — kötü haber
  ton(320, 0.18, "sawtooth", 0, 0.5);
  ton(180, 0.35, "sawtooth", 0.16, 0.5);
}

export function sesSatinAlma() {
  ton(700, 0.07, "sine", 0, 0.45);
  ton(1050, 0.11, "sine", 0.06, 0.45);
}

export function sesHata() {
  ton(200, 0.12, "square", 0, 0.3);
}

export function sesYemek() {
  ton(520, 0.09, "sine", 0, 0.4);
  ton(620, 0.09, "sine", 0.07, 0.35);
}

export function sesBasarim() {
  // Dört nota — en görkemli ses
  ton(523, 0.10, "triangle", 0, 0.7);
  ton(659, 0.10, "triangle", 0.09, 0.7);
  ton(784, 0.10, "triangle", 0.18, 0.7);
  ton(1047, 0.28, "triangle", 0.27, 0.8);
}