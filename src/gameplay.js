import { dukkanUrunleri } from "./data/shop.js";
import { state, SAVAS_TIK_MS } from "./state.js";
import {
  itemBul, monsterBul, actionBul,
  xpVer, envanterdekiMiktar, itemEkle, itemCikar,
  toplamMaxHp, gelenHasar,
  oyuncuSaldiriHizi, oyuncuIsabetSansi, canavarIsabetSansi,
  aksiyonAcikMi, aksiyonSeviyeGerekli,
  girdilerYeterliMi, girdileriTuket, ciktilariVer, ciktilarSigarMi,
  okluSilahMi, menzilliMi, slotYiginMi, slotAdedi, slotItemi, slottanTuket,
  itemKusanilabilirMi, eksikGereksinimYazisi, rastgeleMiktar,
  bolgeBul, bolgeAcikMi, ustalikXpVer, aksiyonSuresi,
  canavaraHasar, tipCarpani, istatistikArtir,clanSeviyesi,
  clanAltinCarpani, clanYemekCarpani, nisanDenemesi, nisanPuaniDegeri, maxSekmeSayisi,
  clanDaliBul, clanDalKademesi, clanKalanPuan, clanGunlugeEkle,
  clanDepoKapasitesi, clanDepoKullanilan, depodakiMiktar,
  aletYeterliMi, skillAletTuru, aletKademesi, aletKademeBilgisi, aletTuruBul, skillSeviyesi,
  ustalikXpCarpani, bonusEkle, bonusDegeri, bonusAdi,
  dukkanDaliBul, dukkanKademesi, satisCarpani, okKorumaSansi, canYenilenmeCarpani,
} from "./core.js";
import { kayitAnahtari } from "./save.js";
import { bildirimGoster } from "./notify.js";
import { tumEkraniCiz, esikYazisiGuncelle } from "./ui.js";
import { NISAN_NADIR_BONUS } from "./data/clan.js";
import {
  oyunConfirm, oyunPrompt, oyunPromptSayi, oyunAnlati
} from "./modal.js";
import {
  sesAksiyonTamam, sesVurus, sesIskalama, sesCanavarOldu, sesLoot,
  sesHasarAldin, sesOldun, sesSatinAlma, sesHata, sesYemek, sesDegistir, sesSeviyesiAyarla, sesSeviyeAtladi
} from "./sound.js";
import { ucanSayi, parlat, sarsit } from "./effects.js";
import {
  muzikAcKapat, muzikSeviyesiAyarla, muzikOrnekCal
} from "./music.js";
import {
  bolgeAnlatilari, acilisMetni, kronikKayitlari
} from "./data/lore.js";


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
    sesHata();
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
    sesHata();
    return;
  }

  if (state.oyuncuHp >= toplamMaxHp()) {
    return;
  }

  slottanTuket("food");
  istatistikArtir("yenenYemek", 1);
  state.oyuncuHp = state.oyuncuHp + Math.round(yemek.iyilestirme * clanYemekCarpani());

  if (state.oyuncuHp > toplamMaxHp()) {
    state.oyuncuHp = toplamMaxHp();
  }

  sesYemek();
  ucanSayi("+" + Math.round(yemek.iyilestirme * clanYemekCarpani()),
    "iyilesme", "#oyuncu-karti");

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
  state.oyuncuHp = state.oyuncuHp + Math.round(yemek.iyilestirme * clanYemekCarpani());

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
    sesHata();
    return;
  }

  if (aletYeterliMi(action) === false) {
    let alet = skillAletTuru(action.skillId);
    let gerekli = aletKademeBilgisi(action.gerekliAletKademesi);
    bildirimGoster(
      "<span class='bildirim-baslik'>Alet yetersiz</span>" +
      "<span class='bildirim-icerik'>" +
      (gerekli ? gerekli.isim + " " : "") +
      (alet ? alet.isim : "alet") + " gerekli</span>",
      "hata"
    );
    sesHata();
    return;
  }

  if (girdilerYeterliMi(action) === false) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Malzeme yok</span>" +
      "<span class='bildirim-icerik'>" + action.isim + "</span>",
      "hata"
    );
    sesHata();
    return;
  }

  if (ciktilarSigarMi(action) === false) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Envanter dolu</span>" +
      "<span class='bildirim-icerik'>Yer açman gerekiyor</span>",
      "hata"
    );
    sesHata();
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
      sesHata();
      return;
    }

    if (ciktilarSigarMi(action) === false) {
      bildirimGoster(
        "<span class='bildirim-baslik'>Envanter dolu</span>" +
        "<span class='bildirim-icerik'>" + action.isim + " durdu</span>",
        "hata"
      );
      aksiyonDurdur();
      sesHata();
      return;
    }

    girdileriTuket(action, 1);
    ciktilariVer(action, 1);
    xpVer(action.skillId, Math.round(action.xp * ustalikXpCarpani(action.id)));
    ustalikXpVer(action, 1);
    if (state.aksiyonSesi) {
      sesAksiyonTamam();
    }

    if (action.girdiler) {
      istatistikArtir("uretilenEsya", 1);
      nisanDenemesi("uretim");
    } else {
      istatistikArtir("toplananKaynak", 1);
      nisanDenemesi("toplama");
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

  // Nadir loot düşerse nişan şansı artar
  let nadirDustuMu = false;
  let mesajParcalari = [];

  if (monster.altinOdulu) {
    let altinMiktari = Math.round(monster.altinOdulu *
      clanAltinCarpani() * (1 + bonusDegeri("altin")));
    state.altin = state.altin + altinMiktari;
    istatistikArtir("kazanilanAltin", altinMiktari);
    mesajParcalari.push("🪙 " + altinMiktari);
    ucanSayi("+" + altinMiktari + " 🪙", "altin", "#oyuncu-karti");
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

      // Nadir bir şey düştüyse nişan şansı artar
      if (loot.sans <= 0.15) {
        nadirDustuMu = true;
      }

      mesajParcalari.push(
        item.ikon + " " + item.isim + (miktar > 1 ? " ×" + miktar : "")
      );
    }
  }

  let ekSans = nadirDustuMu ? NISAN_NADIR_BONUS : 0;
  let nisan = nisanDenemesi("savas", ekSans);

  if (nisan > 0) {
    mesajParcalari.push("🎖️ Clan Nişanı");
  }

  savasKaydiEkle("💀 " + monster.isim + " öldü → " + mesajParcalari.join(", "));

  bildirimGoster(
    "<span class='bildirim-baslik'>" + monster.ikon + " " + monster.isim + " öldü</span>" +
    "<span class='bildirim-icerik'>" + mesajParcalari.join("  ") + "</span>"
  );

  if (mesajParcalari.length > 1) {
    sesLoot();
  }
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
    sesHata();
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
    // Cephanelik yükseltmesi bazen oku korur
    if (Math.random() > okKorumaSansi()) {
      slottanTuket("ammo");
      istatistikArtir("atilanOk", 1);
    }
  }

  if (Math.random() > oyuncuIsabetSansi(monster)) {
    savasKaydiEkle("😐 Iskaladın");
    sesIskalama();
    ucanSayi("Iska", "iskala", "#canavar-" + monster.id);
    return false;
  }

  let hasar = canavaraHasar(monster);
  state.aktifSavasMonsterHp = state.aktifSavasMonsterHp - hasar;
  sesVurus();
  ucanSayi("-" + hasar, "hasar", "#canavar-" + monster.id);
  let carpan = tipCarpani(monster);
  let etki = "";
  if (carpan > 1) {
    etki = " (etkili!)";
  } else if (carpan < 1) {
    etki = " (zayıf)";
  }

  savasKaydiEkle("⚔️ " + monster.isim + "'a " + hasar + " hasar" + etki);

  if (state.aktifSavasMonsterHp <= 0) {
    sesCanavarOldu();
    parlat("#canavar-" + monster.id, "#ffb454");
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
    sesIskalama();
    ucanSayi("Iska", "iskala", "#oyuncu-karti");
    return false;
  }

  let hasar = gelenHasar(monster.saldiri);
  state.oyuncuHp = state.oyuncuHp - hasar;
  savasKaydiEkle("💥 " + monster.isim + " sana " + hasar + " hasar verdi");
  sesHasarAldin();
  ucanSayi("-" + hasar, "hasar", "#oyuncu-karti");

  let esikCan = toplamMaxHp() * (state.otomatikYemekEsigi / 100);
  if (state.otomatikYemekAcik && state.oyuncuHp > 0 && state.oyuncuHp < esikCan) {
    otomatikYemekDene();
  }

  if (state.oyuncuHp <= 0) {
    state.oyuncuHp = 1;
    sesOldun();
    sarsit();
    istatistikArtir("olumSayisi", 1);
    bildirimGoster(
      "<span class='bildirim-baslik'>Öldün</span>" +
      "<span class='bildirim-icerik'>Canın 1'e düştü</span>",
      "hata"
    );
    savasDurdur();
    return true;
    sesHata();
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
    sesHata();
    return;
  }

  // Envanterde yer yoksa satın alma
  if (itemEkle(itemId, 1) === false) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Envanter dolu</span>" +
      "<span class='bildirim-icerik'>Önce yer aç</span>",
      "hata"
    );
    sesHata();
    return;
  }

  state.altin = state.altin - urun.fiyat;
  istatistikArtir("harcananAltin", urun.fiyat);

  let item = itemBul(itemId);
  bildirimGoster(
    "<span class='bildirim-baslik'>Satın alındı</span>" +
    "<span class='bildirim-icerik'>" + item.ikon + " " + item.isim + "</span>"
  );
  sesSatinAlma();

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

  let kazanc = Math.round(item.satisFiyati * adet * satisCarpani());
  itemCikar(itemId, adet);
  state.altin = state.altin + kazanc;
  istatistikArtir("kazanilanAltin", kazanc);

  bildirimGoster(
    "<span class='bildirim-baslik'>" + item.ikon + " " + item.isim + " ×" + adet + "</span>" +
    "<span class='bildirim-icerik'>🪙 +" + kazanc + "</span>"
  );
  sesSatinAlma();

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

  state.oyuncuHp = state.oyuncuHp + canYenilenmeCarpani();
 
  if (state.oyuncuHp > toplamMaxHp()) {
    state.oyuncuHp = toplamMaxHp();
  }
  tumEkraniCiz();
}

// ---------- ENVANTER SEKMELERİ ----------

export function envanterSekmesiAc(sekmeId) {
  state.acikEnvanterSekmesi = sekmeId;
  tumEkraniCiz();
}

export function envanterSekmesiEkle() {
  if (state.envanterSekmeleri.length >= maxSekmeSayisi()) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Sekme sınırına ulaştın</span>" +
      "<span class='bildirim-icerik'>En fazla " +
      maxSekmeSayisi() + " sekme</span>",
      "hata"
    );
    sesHata();
    return;
  }
 
  oyunPrompt("Yeni Sekme", "Sekmenin adını yaz.", "", function (isim) {
    if (isim.trim() === "") {
      return;
    }
 
    state.envanterSekmeleri.push({
      id: "sekme_" + Date.now(),
      isim: isim.trim(),
      ikon: "📁"
    });
 
    tumEkraniCiz();
  });
}

export function envanterSekmesiSil(sekmeId) {
  if (sekmeId === "genel") {
    return;
  }
 
  oyunConfirm("Sekme Silinsin mi?",
    "İçindeki eşyalar Genel'e taşınır.",
    "Sil",
    function () {
      for (let i = 0; i < state.envanter.length; i++) {
        if (state.envanter[i].sekmeId === sekmeId) {
          state.envanter[i].sekmeId = "genel";
        }
      }
 
      let yeniListe = [];
      for (let i = 0; i < state.envanterSekmeleri.length; i++) {
        if (state.envanterSekmeleri[i].id !== sekmeId) {
          yeniListe.push(state.envanterSekmeleri[i]);
        }
      }
      state.envanterSekmeleri = yeniListe;
 
      state.acikEnvanterSekmesi = "genel";
      tumEkraniCiz();
    });
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
  oyunConfirm("Oyunu Sıfırla",
    "TÜM İLERLEMEN SİLİNECEK.\n\n" +
    "Seviyelerin, eşyaların, altının — hepsi sıfırlanacak.\n" +
    "Bu işlem geri alınamaz.",
    "Sıfırla",
    function () {
      state.kayitKapali = true;
      localStorage.removeItem(kayitAnahtari());
      location.reload();
    });
}

export function kaydiDisaAktar() {
  let kayit = localStorage.getItem(kayitAnahtari());

  if (kayit === null) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Kayıt yok</span>" +
      "<span class='bildirim-icerik'>Önce biraz oyna</span>",
      "hata"
    );
    sesHata();
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
    sesHata();
    return;
  }

  oyunConfirm("Kayıt Değiştirilsin mi?",
    "Mevcut ilerlemenin üzerine yazılacak.",
    "Yükle",
    function () {
      localStorage.setItem(kayitAnahtari(), alan.value);
      state.kayitKapali = true;
      location.reload();
    });
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
    sesHata();
    return;
  }

  state.acikBolgeId = bolgeId;

  // Bu bölgeyi ilk kez açıyorsa anlatısını göster
  let ilkKez = state.gorulenBolgeAnlatilari.indexOf(bolgeId) === -1;
  let anlati = bolgeAnlatilari[bolgeId];

  if (ilkKez && anlati !== undefined) {
    state.gorulenBolgeAnlatilari.push(bolgeId);
    tumEkraniCiz();
    oyunAnlati(bolge.ikon + " " + anlati.baslik, anlati.satirlar);
    return;
  }

  tumEkraniCiz();
}

// ---------- PROFİL ----------

export function oyuncuAdiDegistir() {
  oyunPrompt("Karakter Adı", "Diğer oyunculara bu isimle görüneceksin.",
    state.oyuncuAdi, function (yeni) {
      yeni = yeni.trim();
 
      if (yeni.length < 2) {
        bildirimGoster(
          "<span class='bildirim-baslik'>Çok kısa</span>" +
          "<span class='bildirim-icerik'>En az 2 karakter</span>",
          "hata"
        );
        sesHata();
        return;
      }
 
      if (yeni.length > 16) {
        yeni = yeni.substring(0, 16);
      }
 
      state.oyuncuAdi = yeni;
      tumEkraniCiz();
    });
}

// ---------- CLAN ----------

export function clanKur() {
  oyunPrompt("Clan Kur", "Clan için bir isim seç (2-20 karakter).",
    "", function (isim) {
      isim = isim.trim();
 
      if (isim.length < 2) {
        bildirimGoster(
          "<span class='bildirim-baslik'>Çok kısa</span>" +
          "<span class='bildirim-icerik'>En az 2 karakter</span>",
          "hata"
        );
        sesHata();
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
        yukseltmeler: {},
        depo: [],
        gunluk: [],
        uyeler: [
          {
            oyuncuId: state.oyuncuId,
            isim: state.oyuncuAdi,
            rol: "lider",
            katki: 0
          }
        ]
      };
 
      clanGunlugeEkle("🛡️ " + isim + " kuruldu");
 
      bildirimGoster(
        "<span class='bildirim-baslik'>🛡️ " + isim + "</span>" +
        "<span class='bildirim-icerik'>Clan kuruldu!</span>"
      );
 
      tumEkraniCiz();
    });
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
 
  oyunConfirm("Clan Dağıtılsın mı?",
    "Clan seviyesi, yükseltmeler ve DEPODAKİ TÜM EŞYALAR kaybolacak.\n" +
    "Bu işlem geri alınamaz.",
    "Dağıt",
    function () {
      state.clan = null;
      tumEkraniCiz();
    });
}

// Biriken nişanları clana bağışlar
export function nisanBagisla(adet) {
  if (state.clan === null) {
    return;
  }

  if (adet > state.clanNisani) {
    adet = state.clanNisani;
  }

  if (adet < 1) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Nişanın yok</span>" +
      "<span class='bildirim-icerik'>Aktivite yaparak kazanırsın</span>",
      "hata"
    );
    sesHata();
    return;
  }

  let puan = adet * nisanPuaniDegeri();
  let eskiSeviye = clanSeviyesi();

  state.clanNisani = state.clanNisani - adet;
  state.clan.puan = state.clan.puan + puan;

  for (let i = 0; i < state.clan.uyeler.length; i++) {
    if (state.clan.uyeler[i].oyuncuId === state.oyuncuId) {
      state.clan.uyeler[i].katki = state.clan.uyeler[i].katki + puan;
      break;
    }
  }

  let yeniSeviye = clanSeviyesi();

  if (yeniSeviye > eskiSeviye) {
    clanGunlugeEkle("⭐ Clan Seviye " + yeniSeviye + " oldu");
    bildirimGoster(
      "<span class='bildirim-baslik'>🛡️ " + state.clan.isim + "</span>" +
      "<span class='bildirim-icerik'>Clan Seviye " + yeniSeviye +
      " · +" + (yeniSeviye - eskiSeviye) + " yükseltme puanı</span>",
      "seviye"
    );
  } else {
    bildirimGoster(
      "<span class='bildirim-baslik'>Bağışlandı</span>" +
      "<span class='bildirim-icerik'>🎖️ ×" + adet + " · +" + puan + " puan</span>"
    );
  }

  clanGunlugeEkle("🎖️ " + adet + " nişan bağışlandı (+" + puan + ")");
  tumEkraniCiz();
}

// ---------- YÜKSELTME AĞACI ----------

export function clanYukseltmeAl(dalId) {
  if (state.clan === null) {
    return;
  }

  let dal = clanDaliBul(dalId);
  if (dal === null) {
    return;
  }

  let kademe = clanDalKademesi(dalId);

  if (kademe >= dal.kademeler.length) {
    bildirimGoster(
      "<span class='bildirim-baslik'>En üst kademe</span>" +
      "<span class='bildirim-icerik'>" + dal.isim + " tamamlandı</span>",
      "hata"
    );
    return;
  }

  let maliyet = dal.kademeler[kademe].maliyet;

  if (clanKalanPuan() < maliyet) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Yetersiz puan</span>" +
      "<span class='bildirim-icerik'>" + maliyet + " puan gerekli</span>",
      "hata"
    );
    sesHata();
    return;
  }

  if (!state.clan.yukseltmeler) {
    state.clan.yukseltmeler = {};
  }

  state.clan.yukseltmeler[dalId] = kademe + 1;

  clanGunlugeEkle(dal.ikon + " " + dal.isim + " " + (kademe + 1) + ". kademe alındı");

  bildirimGoster(
    "<span class='bildirim-baslik'>" + dal.ikon + " " + dal.isim + "</span>" +
    "<span class='bildirim-icerik'>" + dal.kademeler[kademe].metin + "</span>",
    "seviye"
  );

  // Ambar alındıysa can/kapasite değişmiş olabilir
  canSinirlaVeCiz();
}

// ---------- CLAN DEPOSU ----------
//
// Bağıştan farkı: depoya konan eşya KAYBOLMAZ, geri alınabilir.
// Envanterin dolduğunda taşma alanı olarak işe yarar.

export function depoyaKoy(itemId, adet) {
  if (state.clan === null) {
    return;
  }

  let elimdeki = envanterdekiMiktar(itemId);
  if (elimdeki < 1) {
    return;
  }

  if (adet > elimdeki) {
    adet = elimdeki;
  }

  if (!state.clan.depo) {
    state.clan.depo = [];
  }

  // Zaten depodaysa yığına ekle, değilse yeni yer gerekir
  let mevcut = null;
  for (let i = 0; i < state.clan.depo.length; i++) {
    if (state.clan.depo[i].itemId === itemId) {
      mevcut = state.clan.depo[i];
      break;
    }
  }

  if (mevcut === null && clanDepoKullanilan() >= clanDepoKapasitesi()) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Depo dolu</span>" +
      "<span class='bildirim-icerik'>Depo dalını yükseltebilirsin</span>",
      "hata"
    );
    sesHata();
    return;
  }

  itemCikar(itemId, adet);

  if (mevcut === null) {
    state.clan.depo.push({ itemId: itemId, miktar: adet });
  } else {
    mevcut.miktar = mevcut.miktar + adet;
  }

  tumEkraniCiz();
}

export function depodanAl(itemId, adet) {
  if (state.clan === null || !state.clan.depo) {
    return;
  }

  let kayit = null;
  for (let i = 0; i < state.clan.depo.length; i++) {
    if (state.clan.depo[i].itemId === itemId) {
      kayit = state.clan.depo[i];
      break;
    }
  }

  if (kayit === null || kayit.miktar < 1) {
    return;
  }

  if (adet > kayit.miktar) {
    adet = kayit.miktar;
  }

  if (itemEkle(itemId, adet) === false) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Envanter dolu</span>" +
      "<span class='bildirim-icerik'>Önce yer aç</span>",
      "hata"
    );
    sesHata();
    return;
  }

  kayit.miktar = kayit.miktar - adet;

  // Boşalan kaydı listeden çıkar
  if (kayit.miktar <= 0) {
    let yeni = [];
    for (let i = 0; i < state.clan.depo.length; i++) {
      if (state.clan.depo[i].miktar > 0) {
        yeni.push(state.clan.depo[i]);
      }
    }
    state.clan.depo = yeni;
  }

  tumEkraniCiz();
}

// Oyuncuya "kaç tane?" diye sorar, sonra depoya koyar
export function depoyaKoySor(itemId) {
  let item = itemBul(itemId);
  if (item === null) {
    return;
  }
 
  let elimdeki = envanterdekiMiktar(itemId);
  if (elimdeki < 1) {
    return;
  }
 
  oyunPromptSayi("Depoya Koy",
    item.isim + " — kaç tane? (elinde " + elimdeki + " var)",
    elimdeki, 1,
    function (adet) {
      depoyaKoy(itemId, adet);
    });
}

// Oyuncuya "kaç tane?" diye sorar, sonra depodan alır
export function depodanAlSor(itemId) {
  let item = itemBul(itemId);
  if (item === null) {
    return;
  }
 
  let depoda = depodakiMiktar(itemId);
  if (depoda < 1) {
    return;
  }
 
  oyunPromptSayi("Depodan Al",
    item.isim + " — kaç tane? (depoda " + depoda + " var)",
    depoda, 1,
    function (adet) {
      depodanAl(itemId, adet);
    });
}



// ---------- ALET SATIN ALMA ----------

export function aletYukselt(aletId) {
  let alet = aletTuruBul(aletId);
  if (alet === null) {
    return;
  }

  let mevcut = aletKademesi(aletId);
  let hedef = aletKademeBilgisi(mevcut + 1);

  if (hedef === null || hedef.kademe === mevcut) {
    bildirimGoster(
      "<span class='bildirim-baslik'>En üst kademe</span>" +
      "<span class='bildirim-icerik'>Daha iyisi yok</span>",
      "hata"
    );
    sesHata();
    return;
  }

  if (skillSeviyesi(alet.skillId) < hedef.gerekliSeviye) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Seviyen yetersiz</span>" +
      "<span class='bildirim-icerik'>Seviye " +
      hedef.gerekliSeviye + " gerekli</span>",
      "hata"
    );
    sesHata();
    return;
  }

  if (state.altin < hedef.fiyat) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Yetersiz altın</span>" +
      "<span class='bildirim-icerik'>🪙 " +
      hedef.fiyat.toLocaleString() + " gerekli</span>",
      "hata"
    );
    sesHata();
    return;
  }

  state.altin = state.altin - hedef.fiyat;
  istatistikArtir("harcananAltin", hedef.fiyat);
  state.aletler[aletId] = hedef.kademe;

  bildirimGoster(
    "<span class='bildirim-baslik'>" + alet.ikon + " " + hedef.isim +
    " " + alet.isim + "</span>" +
    "<span class='bildirim-icerik'>%" +
    Math.round(hedef.ciftUrunSansi * 100) + " çift ürün</span>",
    "seviye"
  );

  tumEkraniCiz();
}

// ---------- ZİYAFETLER ----------
//
// Ziyafetler yemek slotuna girmez, envanterden doğrudan kullanılır.
// Böylece otomatik yemek pahalı ziyafeti boşa harcamaz.
 
export function ziyafetYe(itemId) {
  let item = itemBul(itemId);
  if (item === null || !item.bonus) {
    return;
  }
 
  if (envanterdekiMiktar(itemId) < 1) {
    return;
  }
 
  itemCikar(itemId, 1);
  istatistikArtir("yenenYemek", 1);
 
  // Can yenile
  if (item.iyilestirme) {
    state.oyuncuHp = state.oyuncuHp +
      Math.round(item.iyilestirme * clanYemekCarpani());
    if (state.oyuncuHp > toplamMaxHp()) {
      state.oyuncuHp = toplamMaxHp();
    }
  }
 
  // Bonusları uygula
  let etkiYazisi = [];
  for (let i = 0; i < item.bonus.etkiler.length; i++) {
    let e = item.bonus.etkiler[i];
    bonusEkle(e.tur, e.deger, item.bonus.sureMs, item.isim);
    etkiYazisi.push("+%" + Math.round(e.deger * 100) + " " + bonusAdi(e.tur));
  }
 
  bildirimGoster(
    "<span class='bildirim-baslik'>" + item.ikon + " " + item.isim + "</span>" +
    "<span class='bildirim-icerik'>" + etkiYazisi.join(" · ") + " (" +
    Math.round(item.bonus.sureMs / 60000) + " dk)</span>",
    "seviye"
  );
  sesYemek();
  ucanSayi("+" + Math.round(item.iyilestirme * clanYemekCarpani()),
    "iyilesme", "#oyuncu-karti");
 
  tumEkraniCiz();
}

// ---------- DÜKKÂN YÜKSELTMELERİ ----------
 
export function dukkanYukseltmeAl(dalId) {
  let dal = dukkanDaliBul(dalId);
  if (dal === null) {
    return;
  }
 
  let kademe = dukkanKademesi(dalId);
 
  if (kademe >= dal.kademeler.length) {
    bildirimGoster(
      "<span class='bildirim-baslik'>En üst kademe</span>" +
      "<span class='bildirim-icerik'>" + dal.isim + " tamamlandı</span>",
      "hata"
    );
    sesHata();
    return;
  }
 
  let sonraki = dal.kademeler[kademe];
 
  if (state.altin < sonraki.fiyat) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Yetersiz altın</span>" +
      "<span class='bildirim-icerik'>🪙 " +
      sonraki.fiyat.toLocaleString() + " gerekli</span>",
      "hata"
    );
    sesHata();
    return;
  }
 
  state.altin = state.altin - sonraki.fiyat;
  istatistikArtir("harcananAltin", sonraki.fiyat);
  state.dukkanYukseltmeleri[dalId] = kademe + 1;
 
  bildirimGoster(
    "<span class='bildirim-baslik'>" + dal.ikon + " " + dal.isim + "</span>" +
    "<span class='bildirim-icerik'>" + sonraki.metin + "</span>",
    "seviye"
  );
 
  tumEkraniCiz();
}
 
// Satarken "kaç tane?" diye sorar
export function satSor(itemId) {
  let item = itemBul(itemId);
  if (item === null) {
    return;
  }
 
  let elimdeki = envanterdekiMiktar(itemId);
  if (elimdeki < 1) {
    return;
  }
 
  oyunPromptSayi("Sat",
    item.isim + " — kaç tane satılsın? (elinde " + elimdeki + " var)",
    elimdeki, 1,
    function (adet) {
      sat(itemId, adet);
    });
}

// ---------- SES AYARLARI ----------
 
export function sesAcKapat() {
  state.sesAcik = sesDegistir();
  tumEkraniCiz();
}
 
export function sesSeviyesiDegistir(deger) {
  let sayi = parseInt(deger);
 
  if (isNaN(sayi)) {
    return;
  }
 
  state.sesSeviyesi = sayi / 100;
  sesSeviyesiAyarla(state.sesSeviyesi);
 
  // Kaydırırken tüm ekranı çizmiyoruz — sadece yazıyı güncelliyoruz
  let etiket = document.getElementById("ses-deger");
  if (etiket !== null) {
    etiket.textContent = "%" + sayi;
  }
}
 

// Aksiyon sesi ayrı tutuluyor: 3-8 saniyede bir çaldığı için
// uzun idle seanslarda rahatsız edici olabiliyor.
export function aksiyonSesiDegistir() {
  state.aksiyonSesi = !state.aksiyonSesi;
  if (state.aksiyonSesi) {
    sesAksiyonTamam();
  }
  tumEkraniCiz();
}

export function sesOrnekCal() {
  sesSeviyeAtladi();
}

// ---------- HİKAYE ----------

// Yeni oyunda bir kez gösterilir
export function acilisiGoster() {
  if (state.acilisGosterildi) {
    return;
  }

  state.acilisGosterildi = true;
  oyunAnlati("🔥 Everforge", acilisMetni);
}

// Kronik kaydını tekrar okumak için
export function kronikOku(kronikId) {
  for (let i = 0; i < kronikKayitlari.length; i++) {
    if (kronikKayitlari[i].id === kronikId) {
      let k = kronikKayitlari[i];
      oyunAnlati(k.ikon + " " + k.baslik, [k.metin]);
      return;
    }
  }
}

// ---------- MÜZİK AYARLARI ----------
//
// Müzik tercihi karaktere değil cihaza ait (menüde de çalıyor),
// bu yüzden state'te tutulmuyor — music.js kendi localStorage
// anahtarında saklıyor.

export function muzikAcKapatBtn() {
  muzikAcKapat();
  tumEkraniCiz();
}

export function muzikSeviyesiDegistir(deger) {
  let sayi = parseInt(deger);

  if (isNaN(sayi)) {
    return;
  }

  muzikSeviyesiAyarla(sayi / 100);

  // Kaydırırken tüm ekranı çizmiyoruz — sadece yazıyı güncelliyoruz
  let etiket = document.getElementById("muzik-deger");
  if (etiket !== null) {
    etiket.textContent = "%" + sayi;
  }
}

export function muzikDinle() {
  muzikOrnekCal();
}
