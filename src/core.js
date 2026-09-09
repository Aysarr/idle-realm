import { skills } from "./data/skills.js";
import { items } from "./data/items.js";
import { actions } from "./data/actions.js";
import { monsters } from "./data/monsters.js";
import { ekipmanSlotlari } from "./data/slots.js";
import { state } from "./state.js";
import { bildirimGoster } from "./notify.js";

// ============================================================
// ÇEKİRDEK HESAPLAMALAR
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

export function slotYiginMi(slotId) {
  let slot = slotBul(slotId);
  return slot !== null && slot.yiginMi === true;
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

export function skillSeviyesi(skillId) {
  let skill = skillBul(skillId);
  if (skill === null) {
    return 1;
  }
  return seviyeHesapla(skill.xp);
}

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

// Kaç farklı eşya türü var? (kapasite bunu sayar)
export function envanterKullanilan() {
  let sayi = 0;
  for (let i = 0; i < state.envanter.length; i++) {
    if (state.envanter[i].miktar > 0) {
      sayi = sayi + 1;
    }
  }
  return sayi;
}

export function envanterDoluMu() {
  return envanterKullanilan() >= state.envanterKapasitesi;
}

// Bu eşya envantere sığar mı? Zaten varsa her zaman sığar
// (yığına eklenir), yoksa boş slot gerekir.
export function itemSigarMi(itemId) {
  if (envanterdekiMiktar(itemId) > 0) {
    return true;
  }
  return envanterDoluMu() === false;
}

// Artık true/false döndürüyor: eklenebildi mi?
export function itemEkle(itemId, miktar) {
  for (let i = 0; i < state.envanter.length; i++) {
    if (state.envanter[i].itemId === itemId) {
      // Miktarı 0'a düşmüş bir kayıt yeniden doluyorsa
      // kapasite kontrolü gerekir
      if (state.envanter[i].miktar < 1 && envanterDoluMu()) {
        return false;
      }
      state.envanter[i].miktar = state.envanter[i].miktar + miktar;
      return true;
    }
  }

  if (envanterDoluMu()) {
    return false;
  }

  state.envanter.push({
    itemId: itemId,
    miktar: miktar,
    sekmeId: "genel"
  });
  return true;
}

export function itemCikar(itemId, miktar) {
  for (let i = 0; i < state.envanter.length; i++) {
    if (state.envanter[i].itemId === itemId) {
      state.envanter[i].miktar = state.envanter[i].miktar - miktar;
      return;
    }
  }
}

// ---------- TARİF SİSTEMİ ----------

export function aksiyonSeviyeGerekli(action) {
  if (action.seviyeGerekli) {
    return action.seviyeGerekli;
  }
  return 1;
}

export function aksiyonAcikMi(action) {
  return skillSeviyesi(action.skillId) >= aksiyonSeviyeGerekli(action);
}

export function girdilerYeterliMi(action) {
  if (!action.girdiler) {
    return true;
  }

  for (let i = 0; i < action.girdiler.length; i++) {
    let girdi = action.girdiler[i];
    if (envanterdekiMiktar(girdi.itemId) < girdi.miktar) {
      return false;
    }
  }

  return true;
}

export function kacKezYapilabilir(action) {
  if (!action.girdiler) {
    return Number.MAX_SAFE_INTEGER;
  }

  let enAz = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < action.girdiler.length; i++) {
    let girdi = action.girdiler[i];
    let yapilabilir = Math.floor(envanterdekiMiktar(girdi.itemId) / girdi.miktar);
    if (yapilabilir < enAz) {
      enAz = yapilabilir;
    }
  }

  return enAz;
}

export function girdileriTuket(action, kere) {
  if (!action.girdiler) {
    return;
  }

  for (let i = 0; i < action.girdiler.length; i++) {
    let girdi = action.girdiler[i];
    itemCikar(girdi.itemId, girdi.miktar * kere);
  }
}

// Aksiyonun çıktıları envantere sığar mı?
export function ciktilarSigarMi(action) {
  if (!action.ciktilar) {
    return true;
  }

  for (let i = 0; i < action.ciktilar.length; i++) {
    if (itemSigarMi(action.ciktilar[i].itemId) === false) {
      return false;
    }
  }

  return true;
}

export function ciktilariVer(action, kere) {
  if (action.ciktilar) {
    for (let i = 0; i < action.ciktilar.length; i++) {
      let cikti = action.ciktilar[i];
      itemEkle(cikti.itemId, cikti.miktar * kere);
    }
  }

  if (action.sansliCiktilar) {
    for (let i = 0; i < action.sansliCiktilar.length; i++) {
      let cikti = action.sansliCiktilar[i];
      let toplam = 0;

      for (let n = 0; n < kere; n++) {
        if (Math.random() <= cikti.sans) {
          toplam = toplam + cikti.miktar;
        }
      }

      if (toplam > 0) {
        itemEkle(cikti.itemId, toplam);
      }
    }
  }
}

// ---------- YIĞIN SLOTLARI ----------

export function slotAdedi(slotId) {
  if (state.ekipmanAdet[slotId]) {
    return state.ekipmanAdet[slotId];
  }
  return 0;
}

export function slotItemi(slotId) {
  let itemId = state.ekipman[slotId];
  if (itemId === null || itemId === undefined) {
    return null;
  }
  if (slotYiginMi(slotId) && slotAdedi(slotId) < 1) {
    return null;
  }
  return itemBul(itemId);
}

export function slottanTuket(slotId) {
  state.ekipmanAdet[slotId] = slotAdedi(slotId) - 1;

  if (state.ekipmanAdet[slotId] <= 0) {
    state.ekipmanAdet[slotId] = 0;
    state.ekipman[slotId] = null;
  }
}

export function silahItemi() {
  let silahId = state.ekipman["weapon"];
  if (silahId === null || silahId === undefined) {
    return null;
  }
  return itemBul(silahId);
}

export function okluSilahMi() {
  let silah = silahItemi();
  return silah !== null && silah.okGerektirir === true;
}

// ---------- EKİPMAN BONUSLARI ----------

function ekipmanBonusToplami(bonusAdi) {
  let toplam = 0;

  for (let i = 0; i < ekipmanSlotlari.length; i++) {
    let slotId = ekipmanSlotlari[i].id;
    let takiliItemId = state.ekipman[slotId];

    if (takiliItemId === null || takiliItemId === undefined) {
      continue;
    }
    if (slotYiginMi(slotId) && slotAdedi(slotId) < 1) {
      continue;
    }

    let item = itemBul(takiliItemId);
    if (item !== null && item[bonusAdi]) {
      toplam = toplam + item[bonusAdi];
    }
  }

  return toplam;
}

// ---------- SAVAŞ İSTATİSTİKLERİ ----------

export function menzilliMi() {
  return okluSilahMi();
}

// Kaç milisaniyede bir vuruyoruz? Silahsızsan 2600ms.
export function oyuncuSaldiriHizi() {
  let silah = silahItemi();
  if (silah !== null && silah.hizMs) {
    return silah.hizMs;
  }
  return 2600;
}

// SALDIRI (veya Menzilli) = isabet puanı
export function isabetPuani() {
  let ekipmanBonus = ekipmanBonusToplami("isabetBonusu");

  if (menzilliMi()) {
    return 10 + skillSeviyesi("ranged") * 3 + ekipmanBonus;
  }

  return 10 + skillSeviyesi("attack") * 3 + ekipmanBonus;
}

// KUVVET (veya Menzilli) = hasar
export function toplamSaldiri() {
  let ekipmanBonus = ekipmanBonusToplami("saldiriBonusu");

  if (menzilliMi()) {
    return Math.floor(2 + skillSeviyesi("ranged") * 1.2 + ekipmanBonus);
  }

  return Math.floor(2 + skillSeviyesi("strength") * 2 + ekipmanBonus);
}

// SAVUNMA = kaçınma puanı
export function kacinmaPuani() {
  return 8 + skillSeviyesi("defence") * 2 + ekipmanBonusToplami("savunmaBonusu");
}

// Zırh ayrıca gelen hasarı biraz azaltır
export function hasarAzaltma() {
  return Math.floor(ekipmanBonusToplami("savunmaBonusu") / 5);
}

// İki değeri karşılaştırıp 0-1 arası isabet şansı üretir.
// Formül: saldiran / (saldiran + savunan)
// Yani ikisi eşitse %50, saldıran iki katıysa %67 olur.
function isabetSansiHesapla(saldiranPuan, savunanPuan) {
  return saldiranPuan / (saldiranPuan + savunanPuan);
}

export function oyuncuIsabetSansi(monster) {
  return isabetSansiHesapla(isabetPuani(), monster.kacinma);
}

export function canavarIsabetSansi(monster) {
  return isabetSansiHesapla(monster.isabet, kacinmaPuani());
}

export function gelenHasar(monsterSaldiri) {
  let hasar = monsterSaldiri - hasarAzaltma();
  if (hasar < 1) {
    hasar = 1;
  }
  return hasar;
}

export function toplamMaxHp() {
  return 15 + skillSeviyesi("hitpoints") * 3;
}

export function savasSeviyesi() {
  let toplam =
    skillSeviyesi("attack") +
    skillSeviyesi("strength") +
    skillSeviyesi("defence") +
    skillSeviyesi("hitpoints") +
    skillSeviyesi("ranged");

  let ortalama = Math.floor(toplam / 5);

  if (ortalama < 1) {
    return 1;
  }
  return ortalama;
}

// ---------- ENVANTER SIRALAMA ----------
// Eşyaları gruplara ayırıp isme göre sıralar.
// Grup sırası: silah → zırh → ok → yemek → malzeme
 
function itemGrubu(item) {
  if (item.slot === "weapon") {
    return 0;
  }
  if (item.slot && item.slot !== "food" && item.slot !== "ammo") {
    return 1;
  }
  if (item.okMu) {
    return 2;
  }
  if (item.iyilestirme) {
    return 3;
  }
  return 4;
}
 
export function envanterSirali(sekmeId) {
  let liste = [];

  for (let i = 0; i < state.envanter.length; i++) {
    let kayit = state.envanter[i];
    if (kayit.miktar < 1) {
      continue;
    }

    let item = itemBul(kayit.itemId);
    if (item === null) {
      continue;
    }

    // Eski kayıtlarda sekmeId olmayabilir
    let kayitSekmesi = kayit.sekmeId;
    if (!kayitSekmesi) {
      kayitSekmesi = "genel";
    }

    if (sekmeId && kayitSekmesi !== sekmeId) {
      continue;
    }

    liste.push({
      item: item,
      miktar: kayit.miktar,
      sekmeId: kayitSekmesi,
      grup: itemGrubu(item)
    });
  }

  liste.sort(function (a, b) {
    if (a.grup !== b.grup) {
      return a.grup - b.grup;
    }
    return a.item.isim.localeCompare(b.item.isim, "tr");
  });

  return liste;
}