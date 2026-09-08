import { skills } from "./data/skills.js";
import { items } from "./data/items.js";
import { actions } from "./data/actions.js";
import { monsters } from "./data/monsters.js";
import { ekipmanSlotlari } from "./data/slots.js";
import { state } from "./state.js";
import { bildirimGoster } from "./notify.js";

// ============================================================
// ÇEKİRDEK HESAPLAMALAR
// Bu dosyadaki fonksiyonlar ekrana hiç dokunmaz - sadece
// veriyi arar, hesaplar, günceller.
// ============================================================

// ---------- ARAMA ----------

export function skillBul(skillId) {
  for (let i = 0; i < skills.length; i++) {
    if (skills[i].id === skillId) {
      return skills[i];
    }
  }
  return null;
}

export function itemBul(itemId) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === itemId) {
      return items[i];
    }
  }
  return null;
}

export function monsterBul(monsterId) {
  for (let i = 0; i < monsters.length; i++) {
    if (monsters[i].id === monsterId) {
      return monsters[i];
    }
  }
  return null;
}

export function actionBul(actionId) {
  for (let i = 0; i < actions.length; i++) {
    if (actions[i].id === actionId) {
      return actions[i];
    }
  }
  return null;
}

export function slotBul(slotId) {
  for (let i = 0; i < ekipmanSlotlari.length; i++) {
    if (ekipmanSlotlari[i].id === slotId) {
      return ekipmanSlotlari[i];
    }
  }
  return null;
}

// ---------- SEVİYE ----------

export function seviyeHesapla(xp) {
  let seviye = 1;
  let gerekenXp = 0;
  let artis = 50;

  while (xp >= gerekenXp + artis) {
    gerekenXp = gerekenXp + artis;
    artis = artis + 10;
    seviye = seviye + 1;
  }

  return seviye;
}

export function seviyeBilgisi(xp) {
  let seviye = 1;
  let seviyeBasiXp = 0;
  let artis = 50;

  while (xp >= seviyeBasiXp + artis) {
    seviyeBasiXp = seviyeBasiXp + artis;
    artis = artis + 10;
    seviye = seviye + 1;
  }

  let sonrakiSeviyeXp = seviyeBasiXp + artis;
  let buSeviyedeKazanilan = xp - seviyeBasiXp;
  let buSeviyeIcinGereken = sonrakiSeviyeXp - seviyeBasiXp;

  return {
    seviye: seviye,
    mevcutXp: xp,
    seviyedeKazanilan: buSeviyedeKazanilan,
    seviyedeGereken: buSeviyeIcinGereken,
    sonrakineKalan: sonrakiSeviyeXp - xp,
    yuzde: (buSeviyedeKazanilan / buSeviyeIcinGereken) * 100
  };
}

// XP vermenin TEK yolu bu fonksiyon. Seviye atlama kontrolü
// burada olduğu için, XP veren yeni bir şey eklediğinde
// bildirim otomatik çalışır.
export function xpVer(skillId, miktar) {
  let skill = skillBul(skillId);
  if (skill === null) {
    return;
  }

  let eskiSeviye = seviyeHesapla(skill.xp);
  skill.xp = skill.xp + miktar;
  let yeniSeviye = seviyeHesapla(skill.xp);

  if (yeniSeviye > eskiSeviye) {
    bildirimGoster(
      "<span class='bildirim-baslik'>" + skill.ikon + " " + skill.isim + "</span>" +
      "<span class='bildirim-icerik'>Seviye " + yeniSeviye + "! 🎉</span>",
      "seviye"
    );
  }
}

// ---------- ENVANTER ----------

export function envanterdekiMiktar(itemId) {
  for (let i = 0; i < state.envanter.length; i++) {
    if (state.envanter[i].itemId === itemId) {
      return state.envanter[i].miktar;
    }
  }
  return 0;
}

export function itemEkle(itemId, miktar) {
  for (let i = 0; i < state.envanter.length; i++) {
    if (state.envanter[i].itemId === itemId) {
      state.envanter[i].miktar = state.envanter[i].miktar + miktar;
      return;
    }
  }
  state.envanter.push({ itemId: itemId, miktar: miktar });
}

export function itemCikar(itemId, miktar) {
  for (let i = 0; i < state.envanter.length; i++) {
    if (state.envanter[i].itemId === itemId) {
      state.envanter[i].miktar = state.envanter[i].miktar - miktar;
      return;
    }
  }
}

// ---------- EKİPMAN İSTATİSTİKLERİ ----------

export function toplamSaldiri() {
  let toplam = state.temelSaldiri;

  for (let i = 0; i < ekipmanSlotlari.length; i++) {
    let takiliItemId = state.ekipman[ekipmanSlotlari[i].id];
    if (takiliItemId === null || takiliItemId === undefined) {
      continue;
    }
    let item = itemBul(takiliItemId);
    if (item !== null && item.saldiriBonusu) {
      toplam = toplam + item.saldiriBonusu;
    }
  }

  return toplam;
}

export function toplamMaxHp() {
  let toplam = state.temelMaxHp;

  for (let i = 0; i < ekipmanSlotlari.length; i++) {
    let takiliItemId = state.ekipman[ekipmanSlotlari[i].id];
    if (takiliItemId === null || takiliItemId === undefined) {
      continue;
    }
    let item = itemBul(takiliItemId);
    if (item !== null && item.canBonusu) {
      toplam = toplam + item.canBonusu;
    }
  }

  return toplam;
}