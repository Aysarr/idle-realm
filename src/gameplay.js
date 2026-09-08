import { items } from "./data/items.js";
import { dukkanUrunleri } from "./data/shop.js";
import { state, SAVAS_TUR_SURESI } from "./state.js";
import {
  skillBul, itemBul, monsterBul, actionBul,
  xpVer, envanterdekiMiktar, itemEkle, itemCikar,
  toplamSaldiri, toplamMaxHp
} from "./core.js";
import { bildirimGoster } from "./notify.js";
import { tumEkraniCiz } from "./ui.js";

// ============================================================
// OYUN MANTIĞI
// Oyuncunun yaptığı her şey (aksiyon başlatma, savaşma,
// kuşanma, alışveriş) burada.
// ============================================================

// ---------- SEKME ----------

export function sekmeAc(sekmeId) {
  state.acikSekme = sekmeId;
  state.secilenSlot = null;
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

  // O slotta zaten bir şey varsa envantere geri koy
  let eskiItemId = state.ekipman[item.slot];
  if (eskiItemId !== null && eskiItemId !== undefined) {
    itemEkle(eskiItemId, 1);
  }

  itemCikar(itemId, 1);
  state.ekipman[item.slot] = itemId;
  state.secilenSlot = null;

  canSinirlaVeCiz();
}

export function ekipmanCikar(slotId) {
  let takiliItemId = state.ekipman[slotId];
  if (takiliItemId === null || takiliItemId === undefined) {
    return;
  }

  itemEkle(takiliItemId, 1);
  state.ekipman[slotId] = null;
  state.secilenSlot = null;

  canSinirlaVeCiz();
}

export function slotTikla(slotId) {
  // Doluysa çıkar, boşsa takılabilecekleri listele
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

export function yemekYe(itemId) {
  if (envanterdekiMiktar(itemId) < 1) {
    return;
  }

  let yemek = itemBul(itemId);
  if (yemek === null || !yemek.iyilestirme) {
    return;
  }

  if (state.oyuncuHp >= toplamMaxHp()) {
    return;
  }

  itemCikar(itemId, 1);
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

// Envanterdeki ilk yenebilir şeyi bulup yer
function otomatikYemekDene() {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (!item.iyilestirme) {
      continue;
    }
    if (envanterdekiMiktar(item.id) > 0) {
      yemekYe(item.id);
      return;
    }
  }
}

// ---------- TOPLAMA / ÜRETİM ----------

export function aksiyonBaslat(actionId) {
  let action = actionBul(actionId);
  if (action === null) {
    return;
  }

  if (action.gerekliItemId) {
    if (envanterdekiMiktar(action.gerekliItemId) < action.gerekliMiktar) {
      bildirimGoster(
        "<span class='bildirim-baslik'>Malzeme yok</span>" +
        "<span class='bildirim-icerik'>" + action.isim + "</span>",
        "hata"
      );
      return;
    }
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
    if (action.gerekliItemId) {
      if (envanterdekiMiktar(action.gerekliItemId) < action.gerekliMiktar) {
        aksiyonDurdur();
        return;
      }
      itemCikar(action.gerekliItemId, action.gerekliMiktar);
    }

    xpVer(action.skillId, action.xp);
    itemEkle(action.itemId, 1);

    state.aksiyonBaslangicZamani = Date.now();
    tumEkraniCiz();
  }, action.sureMs);

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
  if (state.savasKayitlari.length > 6) {
    state.savasKayitlari.pop();
  }
}

function lootDus(monster) {
  let mesajParcalari = [];

  if (monster.altinOdulu) {
    state.altin = state.altin + monster.altinOdulu;
    mesajParcalari.push("🪙 " + monster.altinOdulu);
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

      itemEkle(loot.itemId, 1);
      mesajParcalari.push(item.ikon + " " + item.isim);
    }
  }

  savasKaydiEkle(monster.isim + " öldü → " + mesajParcalari.join(", "));

  bildirimGoster(
    "<span class='bildirim-baslik'>" + monster.ikon + " " + monster.isim + " öldü</span>" +
    "<span class='bildirim-icerik'>" + mesajParcalari.join("  ") + "</span>"
  );
}

export function savasBaslat(monsterId) {
  if (state.aktifSavasZamanlayici !== null) {
    clearInterval(state.aktifSavasZamanlayici);
  }

  // Aynı anda tek aktivite
  if (state.aktifZamanlayici !== null) {
    aksiyonDurdur();
  }

  let monster = monsterBul(monsterId);
  if (monster === null) {
    return;
  }

  state.aktifSavasMonsterId = monsterId;
  state.aktifSavasMonsterHp = monster.maxHp;
  state.oyuncuHp = toplamMaxHp();
  state.savasTuruBaslangicZamani = Date.now();

  state.aktifSavasZamanlayici = setInterval(savasTuru, SAVAS_TUR_SURESI);

  tumEkraniCiz();
}

export function savasDurdur() {
  if (state.aktifSavasZamanlayici !== null) {
    clearInterval(state.aktifSavasZamanlayici);
  }
  state.aktifSavasZamanlayici = null;
  state.aktifSavasMonsterId = null;
  state.oyuncuHp = toplamMaxHp();
  tumEkraniCiz();
}

function savasTuru() {
  let monster = monsterBul(state.aktifSavasMonsterId);
  if (monster === null) {
    savasDurdur();
    return;
  }

  state.savasTuruBaslangicZamani = Date.now();

  // Önce oyuncu vurur
  state.aktifSavasMonsterHp = state.aktifSavasMonsterHp - toplamSaldiri();

  if (state.aktifSavasMonsterHp <= 0) {
    xpVer("attack", monster.xpOdulu);
    lootDus(monster);
    state.aktifSavasMonsterHp = monster.maxHp;
    tumEkraniCiz();
    return;
  }

  // Sonra canavar vurur
  state.oyuncuHp = state.oyuncuHp - monster.saldiri;

  if (state.otomatikYemekAcik && state.oyuncuHp > 0 &&
      state.oyuncuHp < toplamMaxHp() / 2) {
    otomatikYemekDene();
  }

  if (state.oyuncuHp <= 0) {
    bildirimGoster(
      "<span class='bildirim-baslik'>Öldün</span>" +
      "<span class='bildirim-icerik'>Savaş sona erdi</span>",
      "hata"
    );
    state.oyuncuHp = toplamMaxHp();
    savasDurdur();
    return;
  }

  tumEkraniCiz();
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

  state.altin = state.altin - urun.fiyat;
  itemEkle(itemId, 1);

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

  bildirimGoster(
    "<span class='bildirim-baslik'>" + item.ikon + " " + item.isim + " ×" + adet + "</span>" +
    "<span class='bildirim-icerik'>🪙 +" + kazanc + "</span>"
  );

  tumEkraniCiz();
}