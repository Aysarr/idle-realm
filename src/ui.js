import { skills } from "./data/skills.js";
import { items } from "./data/items.js";
import { actions } from "./data/actions.js";
import { monsters } from "./data/monsters.js";
import { ekipmanSlotlari, slotDuzeni } from "./data/slots.js";
import { dukkanUrunleri } from "./data/shop.js";
import { state, SAVAS_TUR_SURESI } from "./state.js";
import {
  skillBul, itemBul, actionBul, slotBul,
  seviyeHesapla, seviyeBilgisi,
  envanterdekiMiktar, toplamSaldiri, toplamMaxHp
} from "./core.js";

// ============================================================
// ARAYÜZ
// Bu dosya sadece ÇİZER. Oyun mantığını değiştirmez -
// butonlar window üzerinden gameplay.js'deki fonksiyonları çağırır.
// ============================================================

let menuAlani = document.getElementById("menu");
let icerikAlani = document.getElementById("icerik");

function ilerlemeCubugu(cubukId, renkSinifi, baslangicYuzde) {
  return (
    "<div class='ilerleme'>" +
    "<div class='ilerleme-dolu " + renkSinifi + "' id='" + cubukId + "' " +
    "style='width:" + baslangicYuzde + "%'></div>" +
    "</div>"
  );
}

// Bir eşyanın bonuslarını okunabilir metne çevirir
function bonusYazisi(item) {
  let yazi = "";
  if (item.saldiriBonusu) {
    yazi = yazi + "+" + item.saldiriBonusu + " saldırı ";
  }
  if (item.canBonusu) {
    yazi = yazi + "+" + item.canBonusu + " can ";
  }
  if (item.iyilestirme) {
    yazi = yazi + "+" + item.iyilestirme + " iyileştirme ";
  }
  return yazi;
}

// ---------- MENÜ ----------

function menuCiz() {
  let html = "";

  html = html +
    "<div class='menu-oge" + (state.acikSekme === "character" ? " aktif" : "") + "' " +
    "onclick='sekmeAc(\"character\")'>" +
    "<span class='menu-ikon'>🧙</span>" +
    "<span class='menu-isim'>Karakter</span>" +
    "</div>";

  html = html +
    "<div class='menu-oge" + (state.acikSekme === "inventory" ? " aktif" : "") + "' " +
    "onclick='sekmeAc(\"inventory\")'>" +
    "<span class='menu-ikon'>🎒</span>" +
    "<span class='menu-isim'>Envanter</span>" +
    "</div>";

  html = html +
    "<div class='menu-oge" + (state.acikSekme === "shop" ? " aktif" : "") + "' " +
    "onclick='sekmeAc(\"shop\")'>" +
    "<span class='menu-ikon'>🏪</span>" +
    "<span class='menu-isim'>Dükkân</span>" +
    "<span class='menu-seviye'>" + state.altin + "</span>" +
    "</div>";

  html = html + "<div class='menu-ayirici'></div>";

  let savasSkill = skillBul("attack");
  html = html +
    "<div class='menu-oge" + (state.acikSekme === "combat" ? " aktif" : "") + "' " +
    "onclick='sekmeAc(\"combat\")'>" +
    "<span class='menu-ikon'>⚔️</span>" +
    "<span class='menu-isim'>Savaş" +
    (state.aktifSavasZamanlayici !== null ? " <span class='calisiyor'>●</span>" : "") +
    "</span>" +
    "<span class='menu-seviye'>" + seviyeHesapla(savasSkill.xp) + "</span>" +
    "<div class='menu-xp'><div class='menu-xp-dolu' style='width:" +
    seviyeBilgisi(savasSkill.xp).yuzde + "%'></div></div>" +
    "</div>";

  for (let i = 0; i < skills.length; i++) {
    let skill = skills[i];

    if (skill.id === "attack") {
      continue;
    }

    let calisiyorMu = false;
    if (state.aktifAksiyonId !== null) {
      let aktifAction = actionBul(state.aktifAksiyonId);
      if (aktifAction !== null && aktifAction.skillId === skill.id) {
        calisiyorMu = true;
      }
    }

    html = html +
      "<div class='menu-oge" + (state.acikSekme === skill.id ? " aktif" : "") + "' " +
      "onclick='sekmeAc(\"" + skill.id + "\")'>" +
      "<span class='menu-ikon'>" + skill.ikon + "</span>" +
      "<span class='menu-isim'>" + skill.isim +
      (calisiyorMu ? " <span class='calisiyor'>●</span>" : "") + "</span>" +
      "<span class='menu-seviye'>" + seviyeHesapla(skill.xp) + "</span>" +
      "<div class='menu-xp'><div class='menu-xp-dolu' style='width:" +
      seviyeBilgisi(skill.xp).yuzde + "%'></div></div>" +
      "</div>";
  }

  menuAlani.innerHTML = html;
}

// ---------- SKILL EKRANI ----------

function skillEkraniCiz(acikSkill) {
  let bilgi = seviyeBilgisi(acikSkill.xp);

  let html =
    "<div class='baslik'>" + acikSkill.ikon + " " + acikSkill.isim + "</div>" +
    "<div class='xp-panel'>" +
    "<div class='xp-ust'>" +
    "<span class='xp-seviye'>Seviye " + bilgi.seviye + "</span>" +
    "<span class='xp-detay'>" + bilgi.seviyedeKazanilan + " / " +
    bilgi.seviyedeGereken + " XP</span>" +
    "</div>" +
    "<div class='ilerleme'><div class='ilerleme-dolu altin' style='width:" +
    bilgi.yuzde + "%'></div></div>" +
    "<div class='xp-alt'>Toplam " + acikSkill.xp + " XP · Sonraki seviyeye " +
    bilgi.sonrakineKalan + " XP</div>" +
    "</div>";

  for (let i = 0; i < actions.length; i++) {
    let action = actions[i];

    if (action.skillId !== acikSkill.id) {
      continue;
    }

    let item = itemBul(action.itemId);
    let sahipOlunanMiktar = envanterdekiMiktar(action.itemId);
    let buAksiyonAktif = state.aktifAksiyonId === action.id;

    let gereklilikYazisi = "";
    if (action.gerekliItemId) {
      let gerekliItem = itemBul(action.gerekliItemId);
      let elimdeki = envanterdekiMiktar(action.gerekliItemId);
      gereklilikYazisi =
        "<span class='alt-bilgi'>Gerekli: " + gerekliItem.ikon + " " +
        gerekliItem.isim + " ×" + action.gerekliMiktar +
        " (elinde: " + elimdeki + ")</span>";
    }

    html = html +
      "<div class='kart " + (buAksiyonAktif ? "aktif-kart" : "") + "'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>" + action.isim + "</strong>" +
      "<span class='alt-bilgi'>" +
      item.ikon + " " + item.isim + ": " + sahipOlunanMiktar +
      " · " + (action.sureMs / 1000) + "sn · +" + action.xp + " XP" +
      "</span>" +
      gereklilikYazisi +
      "</span>" +
      "<button onclick='" +
      (buAksiyonAktif
        ? "aksiyonDurdur()"
        : "aksiyonBaslat(\"" + action.id + "\")") +
      "'>" +
      (buAksiyonAktif ? "Durdur" : "Başlat") +
      "</button>" +
      (buAksiyonAktif ? ilerlemeCubugu("aksiyon-cubugu", "mavi", 0) : "") +
      "</div>";
  }

  icerikAlani.innerHTML = html;
}

// ---------- SAVAŞ EKRANI ----------

function savasEkraniCiz() {
  let savasSkilli = skillBul("attack");
  let savasVarMi = state.aktifSavasZamanlayici !== null;

  let html =
    "<div class='baslik'>⚔️ Savaş — Seviye " + seviyeHesapla(savasSkilli.xp) + "</div>";

  let oyuncuHpYuzde = (state.oyuncuHp / toplamMaxHp()) * 100;

  html = html +
    "<div class='kart " + (savasVarMi ? "aktif-kart" : "") + "'>" +
    "<span class='aksiyon-bilgi'><strong>🧙 Sen</strong>" +
    "<span class='alt-bilgi'>Saldırı Gücü: " + toplamSaldiri() + "</span></span>" +
    "<span class='deger'>" + state.oyuncuHp + " / " + toplamMaxHp() + "</span>" +
    "<div class='ilerleme'><div class='ilerleme-dolu yesil' style='width:" +
    oyuncuHpYuzde + "%'></div></div>" +
    (savasVarMi ? ilerlemeCubugu("savas-cubugu", "mavi", 0) : "") +
    "</div>";

  for (let i = 0; i < monsters.length; i++) {
    let monster = monsters[i];
    let gosterilecekHp = monster.maxHp;
    let buCanavarAktif = state.aktifSavasMonsterId === monster.id;

    if (buCanavarAktif) {
      gosterilecekHp = state.aktifSavasMonsterHp;
    }

    let hpYuzde = (gosterilecekHp / monster.maxHp) * 100;
    if (hpYuzde < 0) {
      hpYuzde = 0;
    }

    html = html +
      "<div class='kart " + (buCanavarAktif ? "aktif-kart" : "") + "'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>" + monster.ikon + " " + monster.isim + "</strong>" +
      "<span class='alt-bilgi'>Saldırı: " + monster.saldiri +
      " · +" + monster.xpOdulu + " XP</span>" +
      "</span>" +
      "<span class='deger'>" + gosterilecekHp + " / " + monster.maxHp + "</span>" +
      "<button onclick='" +
      (buCanavarAktif
        ? "savasDurdur()"
        : "savasBaslat(\"" + monster.id + "\")") +
      "'>" +
      (buCanavarAktif ? "Durdur" : "Saldır") +
      "</button>" +
      "<div class='ilerleme'><div class='ilerleme-dolu kirmizi' style='width:" +
      hpYuzde + "%'></div></div>" +
      "</div>";
  }

  if (state.savasKayitlari.length > 0) {
    html = html + "<div class='baslik'>📜 Savaş Kaydı</div><div class='savas-log'>";
    for (let i = 0; i < state.savasKayitlari.length; i++) {
      html = html + "<div class='log-satir'>" + state.savasKayitlari[i] + "</div>";
    }
    html = html + "</div>";
  }

  icerikAlani.innerHTML = html;
}

// ---------- KARAKTER EKRANI ----------

function karakterEkraniCiz() {
  let savasSkill = skillBul("attack");
  let savasBilgi = seviyeBilgisi(savasSkill.xp);

  let html = "<div class='baslik'>🧙 Karakter</div>";

  html = html +
    "<div class='stat-satiri'>" +
    "<div class='stat-kutu'><span class='stat-etiket'>Savaş Sv.</span>" +
    "<span class='stat-deger'>" + savasBilgi.seviye + "</span></div>" +
    "<div class='stat-kutu'><span class='stat-etiket'>Can</span>" +
    "<span class='stat-deger'>" + state.oyuncuHp + " / " + toplamMaxHp() + "</span></div>" +
    "<div class='stat-kutu'><span class='stat-etiket'>Saldırı</span>" +
    "<span class='stat-deger'>" + toplamSaldiri() + "</span></div>" +
    "<div class='stat-kutu'><span class='stat-etiket'>Altın</span>" +
    "<span class='stat-deger'>" + state.altin + "</span></div>" +
    "</div>";

  html = html +
    "<div class='xp-panel'>" +
    "<div class='xp-ust'>" +
    "<span class='xp-seviye'>⚔️ Savaş Seviye " + savasBilgi.seviye + "</span>" +
    "<span class='xp-detay'>" + savasBilgi.seviyedeKazanilan + " / " +
    savasBilgi.seviyedeGereken + " XP</span>" +
    "</div>" +
    "<div class='ilerleme'><div class='ilerleme-dolu altin' style='width:" +
    savasBilgi.yuzde + "%'></div></div>" +
    "</div>";

  // --- Ekipman ızgarası ---
  html = html + "<div class='baslik'>Ekipman</div><div class='ekipman-izgara'>";

  for (let satir = 0; satir < slotDuzeni.length; satir++) {
    for (let sutun = 0; sutun < slotDuzeni[satir].length; sutun++) {
      let slotId = slotDuzeni[satir][sutun];

      if (slotId === null) {
        html = html + "<div class='slot-bos-hucre'></div>";
        continue;
      }

      let slot = slotBul(slotId);
      let takiliItemId = state.ekipman[slotId];

      let sinif = "slot";
      let icerik = "<span class='slot-ikon bos'>" + slot.bosIkon + "</span>";

      if (takiliItemId !== null && takiliItemId !== undefined) {
        let item = itemBul(takiliItemId);
        if (item !== null) {
          sinif = sinif + " dolu";
          icerik = "<span class='slot-ikon'>" + item.ikon + "</span>";
        }
      }

      if (state.secilenSlot === slotId) {
        sinif = sinif + " secili";
      }

      html = html +
        "<div class='" + sinif + "' title='" + slot.isim + "' " +
        "onclick='slotTikla(\"" + slotId + "\")'>" +
        icerik +
        "<span class='slot-ad'>" + slot.isim + "</span>" +
        "</div>";
    }
  }

  html = html + "</div>";

  // --- Seçili slota takılabilecekler ---
  if (state.secilenSlot !== null) {
    let slot = slotBul(state.secilenSlot);
    html = html + "<div class='baslik'>" + slot.isim + " için eşyalar</div>";

    let bulundu = false;

    for (let i = 0; i < items.length; i++) {
      let item = items[i];

      if (item.slot !== state.secilenSlot) {
        continue;
      }
      if (envanterdekiMiktar(item.id) < 1) {
        continue;
      }

      bulundu = true;

      html = html +
        "<div class='kart'><span class='aksiyon-bilgi'>" +
        "<strong>" + item.ikon + " " + item.isim + "</strong>" +
        "<span class='alt-bilgi'>" + bonusYazisi(item) + "</span>" +
        "</span>" +
        "<button onclick='ekipmanKusan(\"" + item.id + "\")'>Kuşan</button></div>";
    }

    if (bulundu === false) {
      html = html +
        "<div class='kart'><span class='alt-bilgi'>" +
        "Bu slota takılabilecek bir eşyan yok.</span></div>";
    }
  }

  // --- Yemek ---
  html = html + "<div class='baslik'>🍤 Yemek</div>";

  html = html +
    "<div class='kart'><span class='aksiyon-bilgi'><strong>Otomatik Yemek</strong>" +
    "<span class='alt-bilgi'>Can yarının altına düşünce otomatik ye</span></span>" +
    "<button onclick='otomatikYemekDegistir()'>" +
    (state.otomatikYemekAcik ? "AÇIK" : "KAPALI") +
    "</button></div>";

  let yemekVarMi = false;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    if (!item.iyilestirme) {
      continue;
    }

    let sahipOlunan = envanterdekiMiktar(item.id);
    if (sahipOlunan < 1) {
      continue;
    }

    yemekVarMi = true;

    html = html +
      "<div class='kart'><span class='aksiyon-bilgi'>" +
      "<strong>" + item.ikon + " " + item.isim + "</strong>" +
      "<span class='alt-bilgi'>+" + item.iyilestirme +
      " can · elinde: " + sahipOlunan + "</span>" +
      "</span>" +
      "<button onclick='yemekYe(\"" + item.id + "\")'>Ye</button></div>";
  }

  if (yemekVarMi === false) {
    html = html +
      "<div class='kart'><span class='alt-bilgi'>" +
      "Yemeğin yok. Balık tutup pişirebilirsin.</span></div>";
  }

  icerikAlani.innerHTML = html;
}

// ---------- ENVANTER EKRANI ----------

function envanterEkraniCiz() {
  let html = "<div class='baslik'>🎒 Envanter</div>";
  let doluMu = false;

  for (let i = 0; i < state.envanter.length; i++) {
    let kayit = state.envanter[i];

    if (kayit.miktar < 1) {
      continue;
    }

    let item = itemBul(kayit.itemId);
    if (item === null) {
      continue;
    }

    doluMu = true;

    html = html +
      "<div class='kart'><span class='aksiyon-bilgi'>" +
      "<strong>" + item.ikon + " " + item.isim + "</strong>" +
      "<span class='alt-bilgi'>" + bonusYazisi(item) + "</span>" +
      "</span>" +
      "<span class='deger'>" + kayit.miktar + "</span></div>";
  }

  if (doluMu === false) {
    html = html + "<div class='kart'><span class='alt-bilgi'>Envanterin boş.</span></div>";
  }

  icerikAlani.innerHTML = html;
}

// ---------- DÜKKÂN EKRANI ----------

function dukkanEkraniCiz() {
  let html =
    "<div class='baslik'>🏪 Dükkân</div>" +
    "<div class='altin-satiri'>🪙 Altının: <strong>" + state.altin + "</strong></div>" +
    "<div class='baslik'>Satın Al</div>";

  for (let i = 0; i < dukkanUrunleri.length; i++) {
    let urun = dukkanUrunleri[i];
    let item = itemBul(urun.itemId);
    if (item === null) {
      continue;
    }

    let alabilirMi = state.altin >= urun.fiyat;

    html = html +
      "<div class='kart'><span class='aksiyon-bilgi'>" +
      "<strong>" + item.ikon + " " + item.isim + "</strong>" +
      "<span class='alt-bilgi'>" + bonusYazisi(item) + "· elinde: " +
      envanterdekiMiktar(urun.itemId) + "</span>" +
      "</span>" +
      "<span class='deger'>🪙 " + urun.fiyat + "</span>" +
      "<button onclick='satinAl(\"" + urun.itemId + "\")'" +
      (alabilirMi ? "" : " disabled") + ">Al</button>" +
      "</div>";
  }

  html = html + "<div class='baslik'>Sat</div>";

  let satilabilirVarMi = false;

  for (let i = 0; i < state.envanter.length; i++) {
    let kayit = state.envanter[i];
    if (kayit.miktar < 1) {
      continue;
    }

    let item = itemBul(kayit.itemId);
    if (item === null || !item.satisFiyati) {
      continue;
    }

    satilabilirVarMi = true;

    html = html +
      "<div class='kart'><span class='aksiyon-bilgi'>" +
      "<strong>" + item.ikon + " " + item.isim + "</strong>" +
      "<span class='alt-bilgi'>Adet: " + kayit.miktar +
      " · tanesi 🪙 " + item.satisFiyati + "</span>" +
      "</span>" +
      "<button onclick='sat(\"" + kayit.itemId + "\", 1)'>Sat 1</button>" +
      "<button onclick='sat(\"" + kayit.itemId + "\", " + kayit.miktar + ")'>" +
      "Hepsi (🪙 " + (item.satisFiyati * kayit.miktar) + ")</button>" +
      "</div>";
  }

  if (satilabilirVarMi === false) {
    html = html +
      "<div class='kart'><span class='alt-bilgi'>Satacak bir şeyin yok.</span></div>";
  }

  icerikAlani.innerHTML = html;
}

// ---------- YÖNLENDİRME ----------

function icerikCiz() {
  if (state.acikSekme === "combat") {
    savasEkraniCiz();
    return;
  }
  if (state.acikSekme === "character") {
    karakterEkraniCiz();
    return;
  }
  if (state.acikSekme === "inventory") {
    envanterEkraniCiz();
    return;
  }
  if (state.acikSekme === "shop") {
    dukkanEkraniCiz();
    return;
  }

  let acikSkill = skillBul(state.acikSekme);
  if (acikSkill !== null) {
    skillEkraniCiz(acikSkill);
  }
}

export function tumEkraniCiz() {
  menuCiz();
  icerikCiz();
}

// ---------- İLERLEME ÇUBUKLARI ----------
// Saniyede ~20 kez çalışır ama ekranı yeniden ÇİZMEZ -
// sadece var olan çubukların genişliğini değiştirir.

export function cubuklariGuncelle() {
  let aksiyonCubugu = document.getElementById("aksiyon-cubugu");
  if (aksiyonCubugu !== null && state.aktifAksiyonId !== null) {
    let action = actionBul(state.aktifAksiyonId);
    if (action !== null) {
      let yuzde = ((Date.now() - state.aksiyonBaslangicZamani) / action.sureMs) * 100;
      if (yuzde > 100) {
        yuzde = 100;
      }
      aksiyonCubugu.style.width = yuzde + "%";
    }
  }

  let savasCubugu = document.getElementById("savas-cubugu");
  if (savasCubugu !== null && state.aktifSavasZamanlayici !== null) {
    let yuzde = ((Date.now() - state.savasTuruBaslangicZamani) / SAVAS_TUR_SURESI) * 100;
    if (yuzde > 100) {
      yuzde = 100;
    }
    savasCubugu.style.width = yuzde + "%";
  }
}