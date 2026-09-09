import { dukkanUrunleri } from "./data/shop.js";
import { state, SAVAS_TIK_MS } from "./state.js";
import {
  itemBul, monsterBul, actionBul,
  xpVer, envanterdekiMiktar, itemEkle, itemCikar,
  toplamSaldiri, toplamMaxHp, gelenHasar,
  oyuncuSaldiriHizi, oyuncuIsabetSansi, canavarIsabetSansi,
  aksiyonAcikMi, aksiyonSeviyeGerekli,
  girdilerYeterliMi, girdileriTuket, ciktilariVer, ciktilarSigarMi,
  okluSilahMi, menzilliMi, slotYiginMi, slotAdedi, slotItemi, slottanTuket,
  itemKusanilabilirMi, eksikGereksinimYazisi, rastgeleMiktar,
  bolgeBul, bolgeAcikMi, ustalikXpVer, aksiyonSuresi,
  canavaraHasar, tipCarpani, istatistikArtir,clanSeviyesi,
  clanAltinCarpani
} from "./core.js";
import { bildirimGoster } from "./notify.js";
import { tumEkraniCiz, esikYazisiGuncelle } from "./ui.js";
import { bagisPuani } from "./data/clan.js";

// ============================================================
// OYUN MANTIĞI
// ============================================================

// ---------- SEKME ----------

export function sekmeAc(sekmeId) {
  state.acikSekme = sekmeId;
  state.secilenSlot = null;

  // Bu sayfayı ilk kez açıyorsa yardımı otomatik göster
  let ilkKez = state.gorulenYardimlar.indexOf(sekmeId) === -1;

  if (ilkKez) {
    state.gorulenYardimlar.push(sekmeId);
    state.yardimAcik = true;
  } else {
    state.yardimAcik = false;
  }

  tumEkraniCiz();
}

export function yardimDegistir() {
  state.yardimAcik = !state.yardimAcik;
  tumEkraniCiz();
}

export function savasStiliSec(stilId) {
  state.savasStili = stilId;
  tumEkraniCiz();
}

// ---------- EKİPMAN ----------

function canSinirlaVeCiz() {
  if (state.oyuncuHp > toplamMaxHp()) {
    state.oyuncuHp = toplamMaxHp();
  }
  tumEkraniCiz();
}

export function ekipmanKusan(itemId) {
  let item = itemBul(itemId);
  if (item === null || !item.slot) {
    return;
  }

    if (itemKusanilabilirMi(item) === false) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Seviyen yetersiz</span>" +
      "<span class='bildirim-icerik'>Gerekli: " +
      eksikGereksinimYazisi(item) + "</span>",
      "hata"
    );
    return;
  }

  let slotId = item.slot;

  // --- Yığın slotu (ok, yemek): elindekilerin HEPSİNİ tak ---
  if (slotYiginMi(slotId)) {
    let elimdeki = envanterdekiMiktar(itemId);
    if (elimdeki < 1) {
      return;
    }

    let eskiItemId = state.ekipman[slotId];
    if (eskiItemId !== null && eskiItemId !== undefined && eskiItemId !== itemId) {
      itemEkle(eskiItemId, slotAdedi(slotId));
      state.ekipmanAdet[slotId] = 0;
    }

    itemCikar(itemId, elimdeki);
    state.ekipman[slotId] = itemId;
    state.ekipmanAdet[slotId] = slotAdedi(slotId) + elimdeki;
    state.secilenSlot = null;

    canSinirlaVeCiz();
    return;
  }

  // --- Normal slot: tek parça ---
  let eskiItemId = state.ekipman[slotId];
  if (eskiItemId !== null && eskiItemId !== undefined) {
    itemEkle(eskiItemId, 1);
  }

  itemCikar(itemId, 1);
  state.ekipman[slotId] = itemId;
  state.secilenSlot = null;

  canSinirlaVeCiz();
}

export function ekipmanCikar(slotId) {
  let takiliItemId = state.ekipman[slotId];
  if (takiliItemId === null || takiliItemId === undefined) {
    return;
  }

  if (slotYiginMi(slotId)) {
    itemEkle(takiliItemId, slotAdedi(slotId));
    state.ekipmanAdet[slotId] = 0;
  } else {
    itemEkle(takiliItemId, 1);
  }

  state.ekipman[slotId] = null;
  state.secilenSlot = null;

  canSinirlaVeCiz();
}

export function slotTikla(slotId) {
  if (state.ekipman[slotId] !== null && state.ekipman[slotId] !== undefined) {
    ekipmanCikar(slotId);
    return;
  }

  if (state.secilenSlot === slotId) {
    state.secilenSlot = null;
  } else {
    state.secilenSlot = slotId;
  }

  tumEkraniCiz();
}

// ---------- YEMEK ----------

export function yemekYe() {
  let yemek = slotItemi("food");
  if (yemek === null) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Yemek slotu boş</span>" +
      "<span class='bildirim-icerik'>Karakter ekranından yemek kuşan</span>",
      "hata"
    );
    return;
  }

  if (state.oyuncuHp >= toplamMaxHp()) {
    return;
  }

  slottanTuket("food");
  istatistikArtir("yenenYemek", 1);
  state.oyuncuHp = state.oyuncuHp + yemek.iyilestirme;

  if (state.oyuncuHp > toplamMaxHp()) {
    state.oyuncuHp = toplamMaxHp();
  }

  tumEkraniCiz();
}

export function otomatikYemekDegistir() {
  state.otomatikYemekAcik = !state.otomatikYemekAcik;
  tumEkraniCiz();
}

export function otomatikYemekEsigiAyarla(yuzde) {
  let sayi = parseInt(yuzde);

  if (isNaN(sayi)) {
    return;
  }

  if (sayi < 10) {
    sayi = 10;
  }
  if (sayi > 90) {
    sayi = 90;
  }

  state.otomatikYemekEsigi = sayi;
  esikYazisiGuncelle();
}

function otomatikYemekDene() {
  let yemek = slotItemi("food");
  if (yemek === null) {
    return;
  }

  slottanTuket("food");
  istatistikArtir("yenenYemek", 1);
  state.oyuncuHp = state.oyuncuHp + yemek.iyilestirme;

  if (state.oyuncuHp > toplamMaxHp()) {
    state.oyuncuHp = toplamMaxHp();
  }
}

// ---------- TOPLAMA / ÜRETİM ----------

export function aksiyonBaslat(actionId) {
  let action = actionBul(actionId);
  if (action === null) {
    return;
  }

  if (aksiyonAcikMi(action) === false) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Kilitli</span>" +
      "<span class='bildirim-icerik'>Seviye " +
      aksiyonSeviyeGerekli(action) + " gerekli</span>",
      "hata"
    );
    return;
  }

  if (girdilerYeterliMi(action) === false) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Malzeme yok</span>" +
      "<span class='bildirim-icerik'>" + action.isim + "</span>",
      "hata"
    );
    return;
  }

  if (ciktilarSigarMi(action) === false) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Envanter dolu</span>" +
      "<span class='bildirim-icerik'>Yer açman gerekiyor</span>",
      "hata"
    );
    return;
  }

  if (state.aktifZamanlayici !== null) {
    clearInterval(state.aktifZamanlayici);
  }

  // Aynı anda tek aktivite - savaş varsa durdur
  if (state.aktifSavasZamanlayici !== null) {
    savasDurdur();
  }

  state.aktifAksiyonId = actionId;
  state.aksiyonBaslangicZamani = Date.now();

  state.aktifZamanlayici = setInterval(function () {
    if (girdilerYeterliMi(action) === false) {
      bildirimGoster(
        "<span class='bildirim-baslik'>Malzeme bitti</span>" +
        "<span class='bildirim-icerik'>" + action.isim + " durdu</span>",
        "hata"
      );
      aksiyonDurdur();
      return;
    }

    if (ciktilarSigarMi(action) === false) {
      bildirimGoster(
        "<span class='bildirim-baslik'>Envanter dolu</span>" +
        "<span class='bildirim-icerik'>" + action.isim + " durdu</span>",
        "hata"
      );
      aksiyonDurdur();
      return;
    }

    girdileriTuket(action, 1);
    ciktilariVer(action, 1);
    xpVer(action.skillId, action.xp);
    
        if (action.girdiler) {
      istatistikArtir("uretilenEsya", 1);
    } else {
      istatistikArtir("toplananKaynak", 1);
    }

    state.aksiyonBaslangicZamani = Date.now();
    tumEkraniCiz();
  }, aksiyonSuresi(action));

  tumEkraniCiz();
}

export function aksiyonDurdur() {
  if (state.aktifZamanlayici !== null) {
    clearInterval(state.aktifZamanlayici);
  }
  state.aktifZamanlayici = null;
  state.aktifAksiyonId = null;
  tumEkraniCiz();
}

// ---------- SAVAŞ ----------

function savasKaydiEkle(mesaj) {
  state.savasKayitlari.unshift(mesaj);
  if (state.savasKayitlari.length > 8) {
    state.savasKayitlari.pop();
  }
}

function lootDus(monster) {
  istatistikArtir("oldurulenCanavar", 1);
  let mesajParcalari = [];

  if (monster.altinOdulu) {
        let altinMiktari = Math.round(monster.altinOdulu * clanAltinCarpani());
    state.altin = state.altin + altinMiktari;
    istatistikArtir("kazanilanAltin", altinMiktari);
    mesajParcalari.push("🪙 " + altinMiktari);
  }

  if (monster.lootTablosu) {
    for (let i = 0; i < monster.lootTablosu.length; i++) {
      let loot = monster.lootTablosu[i];

      if (Math.random() > loot.sans) {
        continue;
      }

      let item = itemBul(loot.itemId);
      if (item === null) {
        continue;
      }

      // Envanter doluysa loot yere düşer
            let miktar = rastgeleMiktar(loot);

      if (itemEkle(loot.itemId, miktar) === false) {
        mesajParcalari.push("⚠️ " + item.isim + " (envanter dolu)");
        continue;
      }

      mesajParcalari.push(
        item.ikon + " " + item.isim + (miktar > 1 ? " ×" + miktar : "")
      );
    }
  }

  savasKaydiEkle("💀 " + monster.isim + " öldü → " + mesajParcalari.join(", "));

  bildirimGoster(
    "<span class='bildirim-baslik'>" + monster.ikon + " " + monster.isim + " öldü</span>" +
    "<span class='bildirim-icerik'>" + mesajParcalari.join("  ") + "</span>"
  );
}

function savasXpDagit(monster) {
  if (menzilliMi()) {
    xpVer("ranged", monster.xpOdulu);
  } else {
    xpVer(state.savasStili, monster.xpOdulu);
  }

  xpVer("hitpoints", Math.ceil(monster.xpOdulu / 3));
}

export function savasBaslat(monsterId) {
  if (state.aktifSavasZamanlayici !== null) {
    clearInterval(state.aktifSavasZamanlayici);
  }

  if (state.aktifZamanlayici !== null) {
    aksiyonDurdur();
  }

  let monster = monsterBul(monsterId);
  if (monster === null) {
    return;
  }

  if (okluSilahMi() && slotItemi("ammo") === null) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Ok slotun boş</span>" +
      "<span class='bildirim-icerik'>Yay ok olmadan çalışmaz</span>",
      "hata"
    );
    return;
  }

  let simdi = Date.now();

  state.aktifSavasMonsterId = monsterId;
  state.aktifSavasMonsterHp = monster.maxHp;
  state.siradakiOyuncuVurus = simdi + oyuncuSaldiriHizi();
  state.siradakiCanavarVurus = simdi + monster.saldiriHiziMs;
  state.savasKayitlari = [];

  // Savaş küçük aralıklarla "tik" atar.
  // İki taraf kendi hızına göre, birbirinden bağımsız vurur.
  state.aktifSavasZamanlayici = setInterval(savasTiki, SAVAS_TIK_MS);

  tumEkraniCiz();
}

export function savasDurdur() {
  if (state.aktifSavasZamanlayici !== null) {
    clearInterval(state.aktifSavasZamanlayici);
  }
  state.aktifSavasZamanlayici = null;
  state.aktifSavasMonsterId = null;
  tumEkraniCiz();
}

// Oyuncunun tek vuruşu. Canavar öldüyse true döner.
function oyuncuVurusu(monster) {
  // Yay kullanıyorsak ok harcanır (ıskalasak bile)
  if (okluSilahMi()) {
    if (slotItemi("ammo") === null) {
      bildirimGoster(
        "<span class='bildirim-baslik'>Okun bitti</span>" +
        "<span class='bildirim-icerik'>Savaş durduruldu</span>",
        "hata"
      );
      savasDurdur();
      return false;
    }
    slottanTuket("ammo");
    istatistikArtir("atilanOk", 1);
  }

  if (Math.random() > oyuncuIsabetSansi(monster)) {
    savasKaydiEkle("😐 Iskaladın");
    return false;
  }

  let hasar = canavaraHasar(monster);
  state.aktifSavasMonsterHp = state.aktifSavasMonsterHp - hasar;
  let carpan = tipCarpani(monster);
  let etki = "";
  if (carpan > 1) {
    etki = " (etkili!)";
  } else if (carpan < 1) {
    etki = " (zayıf)";
  }

  savasKaydiEkle("⚔️ " + monster.isim + "'a " + hasar + " hasar" + etki);

  if (state.aktifSavasMonsterHp <= 0) {
    savasXpDagit(monster);
    lootDus(monster);
    state.aktifSavasMonsterHp = monster.maxHp;
    return true;
  }

  return false;
}

// Canavarın tek vuruşu. Oyuncu öldüyse true döner.
function canavarVurusu(monster) {
  if (Math.random() > canavarIsabetSansi(monster)) {
    savasKaydiEkle("🛡️ " + monster.isim + " ıskaladı");
    return false;
  }

  let hasar = gelenHasar(monster.saldiri);
  state.oyuncuHp = state.oyuncuHp - hasar;
  savasKaydiEkle("💥 " + monster.isim + " sana " + hasar + " hasar verdi");

  let esikCan = toplamMaxHp() * (state.otomatikYemekEsigi / 100);
  if (state.otomatikYemekAcik && state.oyuncuHp > 0 && state.oyuncuHp < esikCan) {
    otomatikYemekDene();
  }

  if (state.oyuncuHp <= 0) {
    state.oyuncuHp = 1;
    istatistikArtir("olumSayisi", 1);
    bildirimGoster(
      "<span class='bildirim-baslik'>Öldün</span>" +
      "<span class='bildirim-icerik'>Canın 1'e düştü</span>",
      "hata"
    );
    savasDurdur();
    return true;
  }

  return false;
}

// Her tikte çalışır ama sadece sırası gelen taraf vurur.
function savasTiki() {
  let monster = monsterBul(state.aktifSavasMonsterId);
  if (monster === null) {
    savasDurdur();
    return;
  }

  let simdi = Date.now();
  let birSeyOldu = false;

  // Oyuncunun sırası geldi mi?
  if (simdi >= state.siradakiOyuncuVurus) {
    state.siradakiOyuncuVurus = simdi + oyuncuSaldiriHizi();
    oyuncuVurusu(monster);
    birSeyOldu = true;

    // Savaş bu arada durduysa (ok bitti) devam etme
    if (state.aktifSavasZamanlayici === null) {
      return;
    }
  }

  // Canavarın sırası geldi mi?
  if (simdi >= state.siradakiCanavarVurus) {
    state.siradakiCanavarVurus = simdi + monster.saldiriHiziMs;
    let oyuncuOldu = canavarVurusu(monster);
    birSeyOldu = true;

    if (oyuncuOldu) {
      return;
    }
  }

  if (birSeyOldu) {
    tumEkraniCiz();
  }
}

// ---------- DÜKKÂN ----------

export function satinAl(itemId) {
  let urun = null;
  for (let i = 0; i < dukkanUrunleri.length; i++) {
    if (dukkanUrunleri[i].itemId === itemId) {
      urun = dukkanUrunleri[i];
    }
  }

  if (urun === null) {
    return;
  }

  if (state.altin < urun.fiyat) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Yetersiz altın</span>" +
      "<span class='bildirim-icerik'>🪙 " + urun.fiyat + " gerekli</span>",
      "hata"
    );
    return;
  }

  // Envanterde yer yoksa satın alma
  if (itemEkle(itemId, 1) === false) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Envanter dolu</span>" +
      "<span class='bildirim-icerik'>Önce yer aç</span>",
      "hata"
    );
    return;
  }

  state.altin = state.altin - urun.fiyat;
  istatistikArtir("harcananAltin", urun.fiyat);

  let item = itemBul(itemId);
  bildirimGoster(
    "<span class='bildirim-baslik'>Satın alındı</span>" +
    "<span class='bildirim-icerik'>" + item.ikon + " " + item.isim + "</span>"
  );

  tumEkraniCiz();
}

export function sat(itemId, adet) {
  let item = itemBul(itemId);
  if (item === null || !item.satisFiyati) {
    return;
  }

  let elimdeki = envanterdekiMiktar(itemId);
  if (elimdeki < 1) {
    return;
  }

  if (adet > elimdeki) {
    adet = elimdeki;
  }

  let kazanc = item.satisFiyati * adet;
  itemCikar(itemId, adet);
  state.altin = state.altin + kazanc;
  istatistikArtir("kazanilanAltin", kazanc);

  bildirimGoster(
    "<span class='bildirim-baslik'>" + item.ikon + " " + item.isim + " ×" + adet + "</span>" +
    "<span class='bildirim-icerik'>🪙 +" + kazanc + "</span>"
  );

  tumEkraniCiz();
}

// ---------- CAN YENİLENMESİ ----------

export function canYenilenmeTuru() {
  if (state.aktifSavasZamanlayici !== null) {
    return;
  }

  if (state.oyuncuHp >= toplamMaxHp()) {
    return;
  }

  state.oyuncuHp = state.oyuncuHp + 1;
  tumEkraniCiz();
}

// ---------- ENVANTER SEKMELERİ ----------

export function envanterSekmesiAc(sekmeId) {
  state.acikEnvanterSekmesi = sekmeId;
  tumEkraniCiz();
}

export function envanterSekmesiEkle() {
  if (state.envanterSekmeleri.length >= state.maxEnvanterSekmesi + clanSekmeBonusu()) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Sekme sınırına ulaştın</span>" +
      "<span class='bildirim-icerik'>En fazla " +
      (state.maxEnvanterSekmesi + clanSekmeBonusu()) + " sekme</span>",
      "hata"
    );
    return;
  }

  let isim = prompt("Yeni sekmenin adı:");

  if (isim === null || isim.trim() === "") {
    return;
  }

  state.envanterSekmeleri.push({
    id: "sekme_" + Date.now(),
    isim: isim.trim(),
    ikon: "📁"
  });

  tumEkraniCiz();
}

export function envanterSekmesiSil(sekmeId) {
  if (sekmeId === "genel") {
    return;
  }

  let onay = confirm("Bu sekme silinsin mi? İçindeki eşyalar Genel'e taşınır.");
  if (onay === false) {
    return;
  }

  // Eşyaları Genel'e taşı
  for (let i = 0; i < state.envanter.length; i++) {
    if (state.envanter[i].sekmeId === sekmeId) {
      state.envanter[i].sekmeId = "genel";
    }
  }

  // Sekmeyi listeden çıkar
  let yeniListe = [];
  for (let i = 0; i < state.envanterSekmeleri.length; i++) {
    if (state.envanterSekmeleri[i].id !== sekmeId) {
      yeniListe.push(state.envanterSekmeleri[i]);
    }
  }
  state.envanterSekmeleri = yeniListe;

  state.acikEnvanterSekmesi = "genel";
  tumEkraniCiz();
}

export function itemSekmeDegistir(itemId, sekmeId) {
  for (let i = 0; i < state.envanter.length; i++) {
    if (state.envanter[i].itemId === itemId) {
      state.envanter[i].sekmeId = sekmeId;
      tumEkraniCiz();
      return;
    }
  }
}

// ---------- SEKME İKONU (sürükle-bırak + dokunma) ----------

// Bir sekmenin ikonunu, verilen eşyanın ikonu yapar
function sekmeIkonuAyarla(sekmeId, itemId) {
  let item = itemBul(itemId);
  if (item === null) {
    return;
  }

  for (let i = 0; i < state.envanterSekmeleri.length; i++) {
    if (state.envanterSekmeleri[i].id === sekmeId) {
      state.envanterSekmeleri[i].ikon = item.ikon;
      break;
    }
  }

  state.tasinanItemId = null;
  tumEkraniCiz();
}

// --- Masaüstü: sürükleme ---

export function ikonSurukleBasla(event, itemId) {
  event.dataTransfer.setData("text/plain", itemId);
  event.dataTransfer.effectAllowed = "copy";
  state.tasinanItemId = itemId;
  tumEkraniCiz();
}

export function ikonSurukleUzerinde(event) {
  // Bunu engellememek gerekiyor, yoksa tarayıcı bırakmaya izin vermiyor
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
}

export function ikonBirak(event, sekmeId) {
  event.preventDefault();

  let itemId = event.dataTransfer.getData("text/plain");
  if (!itemId) {
    itemId = state.tasinanItemId;
  }

  sekmeIkonuAyarla(sekmeId, itemId);
}

export function ikonSurukleBitti() {
  state.tasinanItemId = null;
  tumEkraniCiz();
}

// --- Dokunmatik: seç sonra dokun ---

export function ikonIcinSec(itemId) {
  if (state.tasinanItemId === itemId) {
    state.tasinanItemId = null;
  } else {
    state.tasinanItemId = itemId;
  }
  tumEkraniCiz();
}

// Sekmeye tıklama: bir eşya seçiliyse ikonu değiştirir,
// değilse normal sekme geçişi yapar
export function sekmeTikla(sekmeId) {
  if (state.tasinanItemId !== null) {
    sekmeIkonuAyarla(sekmeId, state.tasinanItemId);
    return;
  }
  envanterSekmesiAc(sekmeId);
}

// ---------- AYARLAR ----------

export function oyunuSifirla() {
  let onay = confirm(
    "TÜM İLERLEMEN SİLİNECEK.\n\n" +
    "Seviyelerin, eşyaların, altının — hepsi sıfırlanacak.\n" +
    "Bu işlem geri alınamaz.\n\nEmin misin?"
  );

  if (onay === false) {
    return;
  }

  localStorage.removeItem("idle-realm-kayit");

  // Kapanış kaydı araya girip geri yazmasın diye dinleyiciyi kaldırıyoruz
  state.kayitKapali = true;
  location.reload();
}

export function kaydiDisaAktar() {
  let kayit = localStorage.getItem("idle-realm-kayit");

  if (kayit === null) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Kayıt yok</span>" +
      "<span class='bildirim-icerik'>Önce biraz oyna</span>",
      "hata"
    );
    return;
  }

  let alan = document.getElementById("yedek-alani");
  if (alan !== null) {
    alan.value = kayit;
    alan.select();
  }

  bildirimGoster(
    "<span class='bildirim-baslik'>Yedek hazır</span>" +
    "<span class='bildirim-icerik'>Metni kopyala ve sakla</span>"
  );
}

export function kaydiIceAktar() {
  let alan = document.getElementById("yedek-alani");
  if (alan === null || alan.value.trim() === "") {
    bildirimGoster(
      "<span class='bildirim-baslik'>Kutu boş</span>" +
      "<span class='bildirim-icerik'>Yedek metnini yapıştır</span>",
      "hata"
    );
    return;
  }

  // Metin geçerli bir kayıt mı? Bozuk veriyle oyunu bozmayalım.
  try {
    let test = JSON.parse(alan.value);
    if (!test.skills) {
      throw new Error("skills yok");
    }
  } catch (hata) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Geçersiz yedek</span>" +
      "<span class='bildirim-icerik'>Metin bozuk görünüyor</span>",
      "hata"
    );
    return;
  }

  let onay = confirm("Mevcut ilerlemenin üzerine yazılacak. Emin misin?");
  if (onay === false) {
    return;
  }

  localStorage.setItem("idle-realm-kayit", alan.value);
  state.kayitKapali = true;
  location.reload();
}

export function bolgeSec(bolgeId) {
  let bolge = bolgeBul(bolgeId);
  if (bolge === null) {
    return;
  }

  if (bolgeAcikMi(bolge) === false) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Bölge kilitli</span>" +
      "<span class='bildirim-icerik'>Savaş seviyesi " +
      bolge.gerekliSavasSeviyesi + " gerekli</span>",
      "hata"
    );
    return;
  }

  state.acikBolgeId = bolgeId;
  tumEkraniCiz();
}

// ---------- PROFİL ----------

export function oyuncuAdiDegistir() {
  let yeni = prompt("Karakter adın:", state.oyuncuAdi);

  if (yeni === null) {
    return;
  }

  yeni = yeni.trim();

  if (yeni.length < 2) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Çok kısa</span>" +
      "<span class='bildirim-icerik'>En az 2 karakter</span>",
      "hata"
    );
    return;
  }

  if (yeni.length > 16) {
    yeni = yeni.substring(0, 16);
  }

  state.oyuncuAdi = yeni;
  tumEkraniCiz();
}

// ---------- CLAN ----------

export function clanKur() {
  let isim = prompt("Clan adı (2-20 karakter):");

  if (isim === null) {
    return;
  }

  isim = isim.trim();

  if (isim.length < 2) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Çok kısa</span>" +
      "<span class='bildirim-icerik'>En az 2 karakter</span>",
      "hata"
    );
    return;
  }

  if (isim.length > 20) {
    isim = isim.substring(0, 20);
  }

  state.clan = {
    id: "c_" + Date.now().toString(36),
    isim: isim,
    amblem: "🛡️",
    puan: 0,
    kurulusTarihi: Date.now(),
    // Online'a geçince bu liste sunucudan gelecek
    uyeler: [
      {
        oyuncuId: state.oyuncuId,
        isim: state.oyuncuAdi,
        rol: "lider",
        katki: 0
      }
    ]
  };

  bildirimGoster(
    "<span class='bildirim-baslik'>🛡️ " + isim + "</span>" +
    "<span class='bildirim-icerik'>Clan kuruldu!</span>"
  );

  tumEkraniCiz();
}

export function clanAmblemiDegistir(amblem) {
  if (state.clan === null) {
    return;
  }
  state.clan.amblem = amblem;
  tumEkraniCiz();
}

export function clanDagit() {
  if (state.clan === null) {
    return;
  }

  let onay = confirm(
    "Clan dağıtılsın mı?\n\n" +
    "Bağışladığın her şey ve clan seviyesi kaybolacak.\n" +
    "Bu işlem geri alınamaz."
  );

  if (onay === false) {
    return;
  }

  state.clan = null;
  tumEkraniCiz();
}

// Bir eşyanın tamamını veya bir kısmını clana bağışlar
export function clanaBagisla(itemId, adet) {
  if (state.clan === null) {
    return;
  }

  let item = itemBul(itemId);
  if (item === null) {
    return;
  }

  let elimdeki = envanterdekiMiktar(itemId);
  if (elimdeki < 1) {
    return;
  }

  if (adet > elimdeki) {
    adet = elimdeki;
  }

  let puan = bagisPuani(item) * adet;

  let eskiSeviye = clanSeviyesi();
  itemCikar(itemId, adet);
  state.clan.puan = state.clan.puan + puan;

  // Üyenin katkısını da kaydet (online'da sıralama için kullanılacak)
  for (let i = 0; i < state.clan.uyeler.length; i++) {
    if (state.clan.uyeler[i].oyuncuId === state.oyuncuId) {
      state.clan.uyeler[i].katki = state.clan.uyeler[i].katki + puan;
      break;
    }
  }

  let yeniSeviye = clanSeviyesi();

  if (yeniSeviye > eskiSeviye) {
    bildirimGoster(
      "<span class='bildirim-baslik'>🛡️ " + state.clan.isim + "</span>" +
      "<span class='bildirim-icerik'>Clan Seviye " + yeniSeviye + "!</span>",
      "seviye"
    );
  } else {
    bildirimGoster(
      "<span class='bildirim-baslik'>Bağışlandı</span>" +
      "<span class='bildirim-icerik'>" + item.ikon + " ×" + adet +
      " · +" + puan + " puan</span>"
    );
  }

  tumEkraniCiz();
}