import { skills, savasStilleri } from "./data/skills.js";
import { items } from "./data/items.js";
import { actions } from "./data/actions.js";
import { monsters } from "./data/monsters.js";
import { slotDuzeni } from "./data/slots.js";
import { dukkanUrunleri } from "./data/shop.js";
import { state, CAN_YENILENME_MS } from "./state.js";
import { bolgeler } from "./data/regions.js";
import { yardimlar, ustalikBolumu } from "./data/help.js";
import { clanBonuslari, bagisPuani } from "./data/clan.js";
import { basarimlar } from "./data/achievements.js";
import {
  skillBul, itemBul, actionBul, slotBul,
  seviyeHesapla, seviyeBilgisi, skillSeviyesi,
  envanterdekiMiktar, envanterSirali, envanterKullanilan,
  toplamSaldiri, toplamMaxHp,
  isabetPuani, kacinmaPuani, hasarAzaltma,
  oyuncuIsabetSansi, canavarIsabetSansi,
  oyuncuSaldiriHizi, gelenHasar, savasSeviyesi, menzilliMi,
  aksiyonAcikMi, aksiyonSeviyeGerekli, girdilerYeterliMi,
  okluSilahMi, slotYiginMi, slotAdedi, slotItemi,
  itemKusanilabilirMi, eksikGereksinimYazisi,
  bolgeBul, bolgeAcikMi, bolgeninCanavarlari,
  ustalikBilgisi, ustalikHizBonusu, aksiyonSuresi, skillUstalikYuzdesi,
  canavarTipiBul, tipCarpani, canavaraHasar,
  clanVarMi, clanSeviyeBilgisi, clanSeviyesi, envanterKapasitesi,
  clanHizBonusu, basarimAcikMi, basarimIlerlemesi, gosterilecekBasarimlar
} from "./core.js";

// ============================================================
// ARAYÜZ — sadece çizer
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

// ---------- YARDIM ----------

// Sayfa başlığını "?" butonuyla birlikte üretir.
// Yardım metni yoksa buton hiç çıkmaz.
function sayfaBasligi(sayfaId, baslikMetni) {
  let yardimVarMi = yardimlar[sayfaId] !== undefined;

  return (
    "<div class='baslik baslik-satiri'>" +
    "<span>" + baslikMetni + "</span>" +
    (yardimVarMi
      ? "<button class='yardim-butonu' onclick='yardimDegistir()'>" +
        (state.yardimAcik ? "✕" : "?") + "</button>"
      : "") +
    "</div>" +
    yardimPaneli(sayfaId)
  );
}

function yardimPaneli(sayfaId) {
  if (state.yardimAcik === false) {
    return "";
  }

  let yardim = yardimlar[sayfaId];
  if (yardim === undefined) {
    return "";
  }

  let html = "<div class='yardim-panel'>";
  html = html + "<div class='yardim-ozet'>" + yardim.ozet + "</div>";

    // Toplama/üretim yeteneklerine ustalık bölümünü otomatik ekle
  let bolumler = [];
  if (yardim.bolumler) {
    for (let i = 0; i < yardim.bolumler.length; i++) {
      bolumler.push(yardim.bolumler[i]);
    }
  }

  let skill = skillBul(sayfaId);
  if (skill !== null && skill.kategori === "nonCombat") {
    bolumler.push(ustalikBolumu);
  }
  if (yardim.bolumler) {
      for (let i = 0; i < bolumler.length; i++) {
    let bolum = bolumler[i];
    html = html + "<div class='yardim-bolum-baslik'>" + bolum.baslik + "</div><ul>";

    for (let s = 0; s < bolum.satirlar.length; s++) {
      html = html + "<li>" + bolum.satirlar[s] + "</li>";
    }

    html = html + "</ul>";
  }
  }

  if (yardim.ipuclari && yardim.ipuclari.length > 0) {
    html = html + "<div class='yardim-bolum-baslik'>💡 İpuçları</div><ul>";
    for (let i = 0; i < yardim.ipuclari.length; i++) {
      html = html + "<li>" + yardim.ipuclari[i] + "</li>";
    }
    html = html + "</ul>";
  }

  html = html + "</div>";
  return html;
}

// ---------- ORTAK METİN YARDIMCILARI ----------

function bonusYazisi(item) {
  let yazi = "";
  if (item.saldiriBonusu) {
    yazi = yazi + "+" + item.saldiriBonusu + " hasar ";
  }
  if (item.isabetBonusu) {
    yazi = yazi + "+" + item.isabetBonusu + " isabet ";
  }
  if (item.savunmaBonusu) {
    yazi = yazi + "+" + item.savunmaBonusu + " savunma ";
  }
  if (item.iyilestirme) {
    yazi = yazi + "+" + item.iyilestirme + " iyileştirme ";
  }
  if (item.hizMs) {
    yazi = yazi + "· " + (item.hizMs / 1000) + "sn hız ";
  }
  if (item.okGerektirir) {
    yazi = yazi + "· ok tüketir ";
  }
  return yazi;
}

function malzemeListesi(liste, elimdekiGoster) {
  let parcalar = [];

  for (let i = 0; i < liste.length; i++) {
    let girdi = liste[i];
    let item = itemBul(girdi.itemId);
    if (item === null) {
      continue;
    }

    let metin = item.ikon + " " + item.isim + " ×" + girdi.miktar;

    if (elimdekiGoster) {
      let elimdeki = envanterdekiMiktar(girdi.itemId);
      let yeterliMi = elimdeki >= girdi.miktar;
      metin =
        "<span class='" + (yeterliMi ? "yeterli" : "yetersiz") + "'>" +
        metin + " (" + elimdeki + ")</span>";
    }

    parcalar.push(metin);
  }

  return parcalar.join(", ");
}

// ---------- PAYLAŞILAN: EKİPMAN IZGARASI ----------

function ekipmanIzgarasiHtml() {
  let html = "<div class='ekipman-izgara'>";

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
      let adetRozeti = "";

      if (takiliItemId !== null && takiliItemId !== undefined) {
        let item = itemBul(takiliItemId);
        if (item !== null) {
          sinif = sinif + " dolu";
          icerik = "<span class='slot-ikon'>" + item.ikon + "</span>";

          if (slotYiginMi(slotId)) {
            adetRozeti = "<span class='slot-adet'>" + slotAdedi(slotId) + "</span>";
          }
        }
      }

      if (state.secilenSlot === slotId) {
        sinif = sinif + " secili";
      }

      html = html +
        "<div class='" + sinif + "' title='" + slot.isim + "' " +
        "onclick='slotTikla(\"" + slotId + "\")'>" +
        icerik + adetRozeti +
        "<span class='slot-ad'>" + slot.isim + "</span>" +
        "</div>";
    }
  }

  html = html + "</div>";

  if (state.secilenSlot !== null) {
    let slot = slotBul(state.secilenSlot);
    html = html + "<div class='baslik'>" + slot.isim + " için eşyalar</div>";

    let bulundu = false;

    for (let i = 0; i < items.length; i++) {
      let item = items[i];

      if (item.slot !== state.secilenSlot) {
        continue;
      }

      let elimdeki = envanterdekiMiktar(item.id);
      if (elimdeki < 1) {
        continue;
      }

      bulundu = true;
      let kusanabilirMi = itemKusanilabilirMi(item);

      let adetYazisi = "";
      if (slotYiginMi(state.secilenSlot)) {
        adetYazisi = "· elinde: " + elimdeki + " (hepsi takılır)";
      }

      html = html +
        "<div class='kart" + (kusanabilirMi ? "" : " kilitli") + "'>" +
        "<span class='aksiyon-bilgi'>" +
        "<strong>" + (kusanabilirMi ? "" : "🔒 ") +
        item.ikon + " " + item.isim + "</strong>" +
        "<span class='alt-bilgi'>" + bonusYazisi(item) + adetYazisi + "</span>" +
        (kusanabilirMi
          ? ""
          : "<span class='alt-bilgi yetersiz'>Gerekli: " +
            eksikGereksinimYazisi(item) + "</span>") +
        "</span>" +
        "<button onclick='ekipmanKusan(\"" + item.id + "\")'" +
        (kusanabilirMi ? "" : " disabled") + ">Kuşan</button></div>";
    }

    if (bulundu === false) {
      html = html +
        "<div class='kart'><span class='alt-bilgi'>" +
        "Bu slota takılabilecek bir eşyan yok.</span></div>";
    }
  }

  return html;
}

// ---------- MENÜ ----------

function skillMenuOgesi(skill) {
  let calisiyorMu = false;
  if (state.aktifAksiyonId !== null) {
    let aktifAction = actionBul(state.aktifAksiyonId);
    if (aktifAction !== null && aktifAction.skillId === skill.id) {
      calisiyorMu = true;
    }
  }

  return (
    "<div class='menu-oge" + (state.acikSekme === skill.id ? " aktif" : "") + "' " +
    "onclick='sekmeAc(\"" + skill.id + "\")'>" +
    "<span class='menu-ikon'>" + skill.ikon + "</span>" +
    "<span class='menu-isim'>" + skill.isim +
    (calisiyorMu ? " <span class='calisiyor'>●</span>" : "") + "</span>" +
    "<span class='menu-seviye'>" + seviyeHesapla(skill.xp) + "</span>" +
    "<div class='menu-xp'><div class='menu-xp-dolu' style='width:" +
    seviyeBilgisi(skill.xp).yuzde + "%'></div></div>" +
    "</div>"
  );
}

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
    "<span class='menu-seviye'>" + envanterKullanilan() + "/" +
    envanterKapasitesi() + "</span>" +
    "</div>";

  html = html +
    "<div class='menu-oge" + (state.acikSekme === "shop" ? " aktif" : "") + "' " +
    "onclick='sekmeAc(\"shop\")'>" +
    "<span class='menu-ikon'>🏪</span>" +
    "<span class='menu-isim'>Dükkân</span>" +
    "<span class='menu-seviye'>" + state.altin + "</span>" +
    "</div>";

  html = html +
    "<div class='menu-oge" + (state.acikSekme === "clan" ? " aktif" : "") + "' " +
    "onclick='sekmeAc(\"clan\")'>" +
    "<span class='menu-ikon'>" +
    (state.clan !== null ? state.clan.amblem : "🛡️") + "</span>" +
    "<span class='menu-isim'>Clan</span>" +
    (state.clan !== null
      ? "<span class='menu-seviye'>" + clanSeviyesi() + "</span>"
      : "") +
    "</div>";

      html = html +
    "<div class='menu-oge" + (state.acikSekme === "achievements" ? " aktif" : "") + "' " +
    "onclick='sekmeAc(\"achievements\")'>" +
    "<span class='menu-ikon'>🏆</span>" +
    "<span class='menu-isim'>Başarımlar</span>" +
    "<span class='menu-seviye'>" + state.acilanBasarimlar.length + "</span>" +
    "</div>";

      html = html +
    "<div class='menu-oge" + (state.acikSekme === "stats" ? " aktif" : "") + "' " +
    "onclick='sekmeAc(\"stats\")'>" +
    "<span class='menu-ikon'>📊</span>" +
    "<span class='menu-isim'>İstatistikler</span>" +
    "</div>";

  html = html +
    "<div class='menu-oge" + (state.acikSekme === "settings" ? " aktif" : "") + "' " +
    "onclick='sekmeAc(\"settings\")'>" +
    "<span class='menu-ikon'>⚙️</span>" +
    "<span class='menu-isim'>Ayarlar</span>" +
    "</div>";

  html = html +
    "<div class='menu-baslik'>Savaş — Sv " + savasSeviyesi() + "</div>";

  html = html +
    "<div class='menu-oge" + (state.acikSekme === "combat" ? " aktif" : "") + "' " +
    "onclick='sekmeAc(\"combat\")'>" +
    "<span class='menu-ikon'>🗺️</span>" +
    "<span class='menu-isim'>Canavarlar" +
    (state.aktifSavasZamanlayici !== null ? " <span class='calisiyor'>●</span>" : "") +
    "</span>" +
    "</div>";

  for (let i = 0; i < skills.length; i++) {
    if (skills[i].kategori === "combat") {
      html = html + skillMenuOgesi(skills[i]);
    }
  }

  html = html + "<div class='menu-baslik'>Savaş Dışı</div>";

  for (let i = 0; i < skills.length; i++) {
    if (skills[i].kategori === "nonCombat") {
      html = html + skillMenuOgesi(skills[i]);
    }
  }

  menuAlani.innerHTML = html;
}

// ---------- SKILL EKRANI ----------

function skillEkraniCiz(acikSkill) {
  let bilgi = seviyeBilgisi(acikSkill.xp);

  let html =
    sayfaBasligi(acikSkill.id, acikSkill.ikon + " " + acikSkill.isim) +
    "<div class='xp-panel'>" +
    "<div class='xp-ust'>" +
    "<span class='xp-seviye'>Seviye " + bilgi.seviye + "</span>" +
    "<span class='xp-detay'>" +
    (bilgi.maxMi
      ? "MAX"
      : bilgi.seviyedeKazanilan.toLocaleString() + " / " +
        bilgi.seviyedeGereken.toLocaleString() + " XP") +
    "</span>" +
    "</div>" +
    "<div class='ilerleme'><div class='ilerleme-dolu altin' style='width:" +
    bilgi.yuzde + "%'></div></div>" +
    "<div class='xp-alt'>Toplam " + acikSkill.xp.toLocaleString() + " XP" +
    (bilgi.maxMi
      ? " · ⭐ Maksimum seviye!"
      : " · Sonraki seviyeye " + bilgi.sonrakineKalan.toLocaleString() + " XP") +
    "</div>" +
    "</div>";

  if (acikSkill.kategori !== "combat") {
    let ustalikYuzde = skillUstalikYuzdesi(acikSkill.id);
    html = html +
      "<div class='xp-panel'>" +
      "<div class='xp-ust'>" +
      "<span class='xp-seviye'>⭐ Ustalık İlerlemesi</span>" +
      "<span class='xp-detay'>%" + ustalikYuzde.toFixed(1) + "</span>" +
      "</div>" +
      "<div class='ilerleme'><div class='ilerleme-dolu mor' style='width:" +
      ustalikYuzde + "%'></div></div>" +
      "<div class='xp-alt'>Her aksiyonun ayrı ustalığı var. " +
      "Ustalık arttıkça o aksiyon hızlanır (her 10 seviyede %5, en fazla %40).</div>" +
      "</div>";
  }

  // Savaş yeteneklerinin kendi aksiyonu yok - açıklaması yardım panelinde
  if (acikSkill.kategori === "combat") {
    icerikAlani.innerHTML = html;
    return;
  }

  let aksiyonVarMi = false;

  for (let i = 0; i < actions.length; i++) {
    let action = actions[i];

    if (action.skillId !== acikSkill.id) {
      continue;
    }

    aksiyonVarMi = true;

    let acikMi = aksiyonAcikMi(action);
    let buAksiyonAktif = state.aktifAksiyonId === action.id;
    let malzemeVarMi = girdilerYeterliMi(action);

    if (acikMi === false) {
      html = html +
        "<div class='kart kilitli'>" +
        "<span class='aksiyon-bilgi'>" +
        "<strong>🔒 " + action.isim + "</strong>" +
        "<span class='alt-bilgi'>Seviye " + aksiyonSeviyeGerekli(action) +
        " gerekli</span>" +
        "</span>" +
        "<button disabled>Kilitli</button>" +
        "</div>";
      continue;
    }

    let ciktiYazisi = "";
    if (action.ciktilar) {
      ciktiYazisi = malzemeListesi(action.ciktilar, false);
    }

    let sansliYazisi = "";
    if (action.sansliCiktilar) {
      let parcalar = [];
      for (let s = 0; s < action.sansliCiktilar.length; s++) {
        let sc = action.sansliCiktilar[s];
        let scItem = itemBul(sc.itemId);
        if (scItem !== null) {
          parcalar.push(
            scItem.ikon + " " + scItem.isim + " %" + Math.round(sc.sans * 100)
          );
        }
      }
      if (parcalar.length > 0) {
        sansliYazisi =
          "<span class='alt-bilgi'>Şansa bağlı: " + parcalar.join(", ") + "</span>";
      }
    }

    let girdiYazisi = "";
    if (action.girdiler) {
      girdiYazisi =
        "<span class='alt-bilgi'>Gerekli: " +
        malzemeListesi(action.girdiler, true) + "</span>";
    }

    let stokYazisi = "";
    if (action.ciktilar && action.ciktilar.length > 0) {
      let anaCikti = itemBul(action.ciktilar[0].itemId);
      if (anaCikti !== null) {
        stokYazisi = " · elinde: " + envanterdekiMiktar(anaCikti.id);
      }
    }

    let ustalik = ustalikBilgisi(action.id);
    let ustalikBonusu = ustalikHizBonusu(action.id);
    let clanBonusu = clanHizBonusu();
    let hizBonusu = ustalikBonusu + clanBonusu;
    let gercekSure = aksiyonSuresi(action);

    html = html +
      "<div class='kart " + (buAksiyonAktif ? "aktif-kart" : "") + "'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>" + action.isim + "</strong>" +
      "<span class='alt-bilgi'>Üretir: " + ciktiYazisi +
      " · " + (gercekSure / 1000).toFixed(1) + "sn" +
            (hizBonusu > 0
        ? " <span class='yeterli' title='" +
          "Ustalık: %" + Math.round(ustalikBonusu * 100) +
          " · Clan: %" + Math.round(clanBonusu * 100) +
          "'>(-%" + Math.round(hizBonusu * 100) + ")</span>"
        : "") +
      " · +" + action.xp + " XP" +
      stokYazisi + "</span>" +
      girdiYazisi +
      sansliYazisi +
      "<span class='ustalik-satiri'>" +
      "<span class='ustalik-etiket'>⭐ Ustalık " + ustalik.seviye + "</span>" +
      "<span class='ustalik-cubuk'><span class='ustalik-dolu' style='width:" +
      ustalik.yuzde + "%'></span></span>" +
      "</span>" +
      "</span>" +
      "<button onclick='" +
      (buAksiyonAktif
        ? "aksiyonDurdur()"
        : "aksiyonBaslat(\"" + action.id + "\")") +
      "'" + (malzemeVarMi || buAksiyonAktif ? "" : " disabled") + ">" +
      (buAksiyonAktif ? "Durdur" : "Başlat") +
      "</button>" +
      (buAksiyonAktif ? ilerlemeCubugu("aksiyon-cubugu", "mavi", 0) : "") +
      "</div>";
  }

  if (aksiyonVarMi === false) {
    html = html +
      "<div class='kart'><span class='alt-bilgi'>" +
      "Bu yetenek için henüz aksiyon yok.</span></div>";
  }

  icerikAlani.innerHTML = html;
}

// ---------- SAVAŞ EKRANI ----------

function savasEkraniCiz() {
  let savasVarMi = state.aktifSavasZamanlayici !== null;

  let html = sayfaBasligi("combat",
    "🗺️ Canavarlar — Savaş Seviyesi " + savasSeviyesi());

  // --- Savaş stili seçici ---
  html = html + "<div class='stil-secici'>";

  if (menzilliMi()) {
    html = html +
      "<div class='stil-oge aktif'>" +
      "<span class='stil-ikon'>🏹</span>" +
      "<span class='stil-isim'>Menzilli</span>" +
      "<span class='stil-aciklama'>Sv " + skillSeviyesi("ranged") + "</span>" +
      "</div>";
  } else {
    for (let i = 0; i < savasStilleri.length; i++) {
      let stil = savasStilleri[i];
      html = html +
        "<div class='stil-oge" + (state.savasStili === stil.id ? " aktif" : "") + "' " +
        "onclick='savasStiliSec(\"" + stil.id + "\")'>" +
        "<span class='stil-ikon'>" + stil.ikon + "</span>" +
        "<span class='stil-isim'>" + stil.isim + "</span>" +
        "<span class='stil-aciklama'>Sv " + skillSeviyesi(stil.id) + "</span>" +
        "</div>";
    }
  }

  html = html + "</div>";

  // --- Oyuncu kartı ---
  let oyuncuHpYuzde = (state.oyuncuHp / toplamMaxHp()) * 100;

  let ekBilgi = "";
  if (okluSilahMi()) {
    let ok = slotItemi("ammo");
    if (ok === null) {
      ekBilgi = ekBilgi + " · <span class='yetersiz'>🏹 Ok yok!</span>";
    } else {
      ekBilgi = ekBilgi + " · " + ok.ikon + " " + slotAdedi("ammo");
    }
  }

  let yemek = slotItemi("food");
  if (yemek !== null) {
    ekBilgi = ekBilgi + " · " + yemek.ikon + " " + slotAdedi("food");
  }

  html = html +
    "<div class='kart " + (savasVarMi ? "aktif-kart" : "") + "'>" +
    "<span class='aksiyon-bilgi'><strong>🧙 Sen</strong>" +
    "<span class='alt-bilgi'>" +
    "🎯 " + isabetPuani() + " isabet · " +
    "💥 " + toplamSaldiri() + " hasar · " +
    "🛡️ " + kacinmaPuani() + " kaçınma · " +
    "⏱️ " + (oyuncuSaldiriHizi() / 1000) + "sn" +
    ekBilgi + "</span></span>" +
    "<span class='deger'>" + state.oyuncuHp + " / " + toplamMaxHp() + "</span>" +
    (yemek !== null && state.oyuncuHp < toplamMaxHp()
      ? "<button onclick='yemekYe()'>Ye</button>"
      : "") +
    "<div class='ilerleme'><div class='ilerleme-dolu yesil' style='width:" +
    oyuncuHpYuzde + "%'></div></div>" +
    (savasVarMi ? ilerlemeCubugu("savas-cubugu", "mavi", 0) : "") +
    "</div>";

  // --- Canavarlar ---
    // --- Bölge seçici ---
  html = html + "<div class='baslik'>Bölgeler</div><div class='bolge-secici'>";

  for (let i = 0; i < bolgeler.length; i++) {
    let bolge = bolgeler[i];
    let acikMi = bolgeAcikMi(bolge);

    html = html +
      "<div class='bolge-oge" +
      (state.acikBolgeId === bolge.id ? " aktif" : "") +
      (acikMi ? "" : " kilitli") + "' " +
      "onclick='bolgeSec(\"" + bolge.id + "\")'>" +
      "<span class='bolge-ikon'>" + (acikMi ? bolge.ikon : "🔒") + "</span>" +
      "<span class='bolge-isim'>" + bolge.isim + "</span>" +
      "<span class='bolge-alt'>" +
      (acikMi
        ? bolgeninCanavarlari(bolge.id).length + " canavar"
        : "Savaş Sv " + bolge.gerekliSavasSeviyesi) +
      "</span>" +
      "</div>";
  }

  html = html + "</div>";

  // --- Seçili bölgenin canavarları ---
  let acikBolge = bolgeBul(state.acikBolgeId);

  if (acikBolge !== null) {
    html = html +
      "<div class='bolge-aciklama'>" + acikBolge.ikon + " " +
      acikBolge.aciklama + "</div>";
  }

  let bolgeCanavarlari = bolgeninCanavarlari(state.acikBolgeId);

  for (let i = 0; i < bolgeCanavarlari.length; i++) {
    let monster = bolgeCanavarlari[i];
    let gosterilecekHp = monster.maxHp;
    let buCanavarAktif = state.aktifSavasMonsterId === monster.id;

    if (buCanavarAktif) {
      gosterilecekHp = state.aktifSavasMonsterHp;
    }

    let hpYuzde = (gosterilecekHp / monster.maxHp) * 100;
    if (hpYuzde < 0) {
      hpYuzde = 0;
    }

    let benimIsabet = Math.round(oyuncuIsabetSansi(monster) * 100);
    let onunIsabet = Math.round(canavarIsabetSansi(monster) * 100);
    let tip = canavarTipiBul(monster.tipId);
    let carpan = tipCarpani(monster);

    let tipRozeti = "";
    if (tip !== null) {
      let sinif = "notr";
      let ok = "";
      if (carpan > 1) {
        sinif = "avantaj";
        ok = " ▲";
      } else if (carpan < 1) {
        sinif = "dezavantaj";
        ok = " ▼";
      }

      tipRozeti =
        "<span class='tip-rozeti " + sinif + "' title='" + tip.aciklama + "'>" +
        tip.ikon + " " + tip.isim + ok + "</span>";
    }

    html = html +
      "<div class='kart " + (buCanavarAktif ? "aktif-kart" : "") + "'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>" + monster.ikon + " " + monster.isim + " " + tipRozeti + "</strong>" +
      "<span class='alt-bilgi'>" +
      "Vurma şansın %" + benimIsabet +
      " · sana vurma şansı %" + onunIsabet +
      "</span>" +
      "<span class='alt-bilgi'>" +
      "Ona " + canavaraHasar(monster) + " hasar verirsin · " +
      "sana " + gelenHasar(monster.saldiri) + " hasar · " +
      "her " + (monster.saldiriHiziMs / 1000) + "sn'de bir · " +
      "+" + monster.xpOdulu + " XP</span>" +
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

  html = html + "<div class='baslik'>Ekipman</div>" + ekipmanIzgarasiHtml();

  icerikAlani.innerHTML = html;
}

// ---------- KARAKTER EKRANI ----------

function karakterEkraniCiz() {
  let html = sayfaBasligi("character", "🧙 Karakter");

  html = html +
    "<div class='stat-satiri'>" +
    "<div class='stat-kutu'><span class='stat-etiket'>Savaş Sv.</span>" +
    "<span class='stat-deger'>" + savasSeviyesi() + "</span></div>" +
    "<div class='stat-kutu'><span class='stat-etiket'>Can</span>" +
    "<span class='stat-deger'>" + state.oyuncuHp + " / " + toplamMaxHp() + "</span></div>" +
    "<div class='stat-kutu'><span class='stat-etiket'>İsabet</span>" +
    "<span class='stat-deger'>" + isabetPuani() + "</span></div>" +
    "<div class='stat-kutu'><span class='stat-etiket'>Hasar</span>" +
    "<span class='stat-deger'>" + toplamSaldiri() + "</span></div>" +
    "<div class='stat-kutu'><span class='stat-etiket'>Kaçınma</span>" +
    "<span class='stat-deger'>" + kacinmaPuani() + "</span></div>" +
    "<div class='stat-kutu'><span class='stat-etiket'>Altın</span>" +
    "<span class='stat-deger'>" + state.altin + "</span></div>" +
    "</div>";

  html = html +
    "<div class='kart'><span class='alt-bilgi'>" +
    "⏱️ Saldırı hızın: her " + (oyuncuSaldiriHizi() / 1000) + " saniyede bir vuruş · " +
    "🛡️ Zırhın gelen hasarı " + hasarAzaltma() + " azaltıyor" +
    "</span></div>";

  html = html + "<div class='baslik'>Savaş Yetenekleri</div>";

  for (let i = 0; i < skills.length; i++) {
    let skill = skills[i];
    if (skill.kategori !== "combat") {
      continue;
    }

    let bilgi = seviyeBilgisi(skill.xp);

    html = html +
      "<div class='kart'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>" + skill.ikon + " " + skill.isim + "</strong>" +
      "<span class='alt-bilgi'>" + bilgi.seviyedeKazanilan + " / " +
      bilgi.seviyedeGereken + " XP</span>" +
      "</span>" +
      "<span class='deger'>" + bilgi.seviye + "</span>" +
      "<div class='ilerleme'><div class='ilerleme-dolu altin' style='width:" +
      bilgi.yuzde + "%'></div></div>" +
      "</div>";
  }

  if (state.oyuncuHp < toplamMaxHp()) {
    html = html +
      "<div class='kart'><span class='alt-bilgi'>" +
      "❤️ Savaş dışında her " + (CAN_YENILENME_MS / 1000) +
      " saniyede 1 can yenilenir. Daha hızlısı için yemek ye." +
      "</span>" +
      (slotItemi("food") !== null
        ? "<button onclick='yemekYe()'>Ye</button>"
        : "") +
      "</div>";
  }

  html = html + "<div class='baslik'>Ekipman</div>" + ekipmanIzgarasiHtml();

  html = html + "<div class='baslik'>🍤 Yemek Ayarı</div>";

  let yemek = slotItemi("food");
  let esikCan = Math.floor(toplamMaxHp() * (state.otomatikYemekEsigi / 100));

  html = html +
    "<div class='kart'><span class='aksiyon-bilgi'><strong>Otomatik Yemek</strong>" +
    "<span class='alt-bilgi' id='esik-aciklama'>Can %" + state.otomatikYemekEsigi +
    " altına düşünce ye (" + esikCan + " canın altında)</span>" +
    (yemek === null
      ? "<span class='alt-bilgi yetersiz'>Yemek slotu boş</span>"
      : "") +
    "</span>" +
    "<button onclick='otomatikYemekDegistir()'>" +
    (state.otomatikYemekAcik ? "AÇIK" : "KAPALI") +
    "</button>" +
    "<div class='esik-satiri'>" +
    "<input type='range' min='10' max='90' step='1' value='" +
    state.otomatikYemekEsigi + "' " +
    "oninput='otomatikYemekEsigiAyarla(this.value)'>" +
    "<span class='esik-deger' id='esik-deger'>%" + state.otomatikYemekEsigi + "</span>" +
    "</div>" +
    "</div>";

  icerikAlani.innerHTML = html;
}

// ---------- ENVANTER EKRANI ----------

function envanterEkraniCiz() {
  let kullanilan = envanterKullanilan();
  let kapasite = envanterKapasitesi();
  let doluluk = (kullanilan / kapasite) * 100;

  let html = sayfaBasligi("inventory", "🎒 Envanter");

  // --- Kapasite göstergesi ---
  html = html +
    "<div class='xp-panel'>" +
    "<div class='xp-ust'>" +
    "<span class='xp-seviye'>Çanta Doluluğu</span>" +
    "<span class='xp-detay'>" + kullanilan + " / " + kapasite + " çeşit</span>" +
    "</div>" +
    "<div class='ilerleme'><div class='ilerleme-dolu " +
    (doluluk >= 100 ? "kirmizi" : "altin") +
    "' style='width:" + Math.min(doluluk, 100) + "%'></div></div>" +
    "<div class='xp-alt'>Kapasite eşya çeşidini sayar — " +
    "aynı eşyadan kaç tane olduğu önemli değil.</div>" +
    "</div>";

  // --- İkon seçimi aktifse yönlendirme kartı ---
  let ikonSeciliyor = state.tasinanItemId !== null;

  if (ikonSeciliyor) {
    let secilenItem = itemBul(state.tasinanItemId);
    html = html +
      "<div class='kart aktif-kart'><span class='aksiyon-bilgi'>" +
      "<strong>" + (secilenItem !== null ? secilenItem.ikon : "") +
      " ikon olarak seçildi</strong>" +
      "<span class='alt-bilgi'>Şimdi bir sekmeye dokun (veya sürükleyip bırak). " +
      "Vazgeçmek için eşyaya tekrar dokun.</span></span></div>";
  }

  // --- Sekme çubuğu ---
  html = html + "<div class='env-sekmeler'>";

  for (let i = 0; i < state.envanterSekmeleri.length; i++) {
    let sekme = state.envanterSekmeleri[i];
    let adet = envanterSirali(sekme.id).length;

    html = html +
      "<div class='env-sekme" +
      (state.acikEnvanterSekmesi === sekme.id ? " aktif" : "") +
      (ikonSeciliyor ? " hedef" : "") + "' " +
      "onclick='sekmeTikla(\"" + sekme.id + "\")' " +
      "ondragover='ikonSurukleUzerinde(event)' " +
      "ondrop='ikonBirak(event, \"" + sekme.id + "\")'>" +
      sekme.ikon + " " + sekme.isim +
      "<span class='env-sekme-adet'>" + adet + "</span>" +
      "</div>";
  }

    let sekmeEklenebilir =
    state.envanterSekmeleri.length < state.maxEnvanterSekmesi;

  if (sekmeEklenebilir) {
    html = html +
      "<div class='env-sekme ekle' onclick='envanterSekmesiEkle()' " +
      "title='Yeni sekme ekle'>+</div>";
  } else {
    html = html +
      "<div class='env-sekme ekle pasif' " +
      "title='Sekme sınırına ulaştın'>+</div>";
  }

  html = html + "</div>";

  html = html +
    "<div class='sekme-sayaci'>Sekme: " + state.envanterSekmeleri.length +
    " / " + state.maxEnvanterSekmesi + "</div>";

  // --- Sekme silme (Genel hariç) ---
  if (state.acikEnvanterSekmesi !== "genel") {
    html = html +
      "<div class='kart'>" +
      "<span class='aksiyon-bilgi'><span class='alt-bilgi'>" +
      "Bu sekmeyi silersen içindeki eşyalar Genel'e taşınır.</span></span>" +
      "<button onclick='envanterSekmesiSil(\"" +
      state.acikEnvanterSekmesi + "\")'>Sekmeyi Sil</button>" +
      "</div>";
  }

  // --- Eşyalar ---
  let liste = envanterSirali(state.acikEnvanterSekmesi);

  if (liste.length === 0) {
    html = html +
      "<div class='kart'><span class='alt-bilgi'>Bu sekme boş.</span></div>";
    icerikAlani.innerHTML = html;
    return;
  }

  for (let i = 0; i < liste.length; i++) {
    let kayit = liste[i];

    // Eşyayı başka sekmeye taşıma menüsü
    let secenekler = "";
    for (let s = 0; s < state.envanterSekmeleri.length; s++) {
      let sekme = state.envanterSekmeleri[s];
      secenekler = secenekler +
        "<option value='" + sekme.id + "'" +
        (kayit.sekmeId === sekme.id ? " selected" : "") + ">" +
        sekme.isim + "</option>";
    }

    let ikonSecili = state.tasinanItemId === kayit.item.id;

    html = html +
      "<div class='kart' draggable='true' " +
      "ondragstart='ikonSurukleBasla(event, \"" + kayit.item.id + "\")' " +
      "ondragend='ikonSurukleBitti()'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>" +
      "<span class='item-ikon" + (ikonSecili ? " secili" : "") + "' " +
      "onclick='ikonIcinSec(\"" + kayit.item.id + "\")' " +
      "title='Sekme ikonu yapmak için dokun veya sürükle'>" +
      kayit.item.ikon + "</span> " +
      kayit.item.isim + "</strong>" +
      "<span class='alt-bilgi'>" + bonusYazisi(kayit.item) + "</span>" +
      "</span>" +
      "<select class='sekme-secici' " +
      "onchange='itemSekmeDegistir(\"" + kayit.item.id + "\", this.value)'>" +
      secenekler + "</select>" +
      "<span class='deger'>" + kayit.miktar + "</span></div>";
  }

  icerikAlani.innerHTML = html;
}

// ---------- DÜKKÂN EKRANI ----------

function dukkanEkraniCiz() {
  let html =
    sayfaBasligi("shop", "🏪 Dükkân") +
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

// ---------- İSTATİSTİK EKRANI ----------

function sureBicimle(ms) {
  let saniye = Math.floor(ms / 1000);
  let dakika = Math.floor(saniye / 60);
  let saat = Math.floor(dakika / 60);

  if (saat > 0) {
    return saat + " saat " + (dakika % 60) + " dk";
  }
  if (dakika > 0) {
    return dakika + " dakika";
  }
  return saniye + " saniye";
}

function istatistikSatiri(ikon, etiket, deger) {
  return (
    "<div class='kart'><span class='aksiyon-bilgi'>" +
    "<strong>" + ikon + " " + etiket + "</strong></span>" +
    "<span class='deger'>" + deger + "</span></div>"
  );
}

function istatistikEkraniCiz() {
  let ist = state.istatistik;

  let html = sayfaBasligi("stats", "📊 İstatistikler");

  // --- Profil ---
  let toplamSeviye = 0;
  let toplamXp = 0;
  for (let i = 0; i < skills.length; i++) {
    toplamSeviye = toplamSeviye + seviyeHesapla(skills[i].xp);
    toplamXp = toplamXp + skills[i].xp;
  }

  html = html +
    "<div class='profil-karti'>" +
    "<div class='profil-avatar'>🧙</div>" +
    "<div class='profil-bilgi'>" +
    "<div class='profil-ad'>" + state.oyuncuAdi + "</div>" +
    "<div class='profil-alt'>Toplam Seviye " + toplamSeviye +
    " · " + toplamXp.toLocaleString() + " XP</div>" +
    "</div>" +
    "<button onclick='oyuncuAdiDegistir()'>Adı Değiştir</button>" +
    "</div>";

  html = html + "<div class='baslik'>Genel</div>";
  html = html + istatistikSatiri("⏱️", "Oynama süresi",
    sureBicimle(ist.toplamOyunSuresiMs));
  html = html + istatistikSatiri("📅", "Oyuna başlama",
    new Date(state.oyunBaslangici).toLocaleDateString("tr-TR"));

  html = html + "<div class='baslik'>Üretim</div>";
  html = html + istatistikSatiri("🌿", "Toplanan kaynak",
    ist.toplananKaynak.toLocaleString());
  html = html + istatistikSatiri("🔨", "Üretilen eşya",
    ist.uretilenEsya.toLocaleString());
  html = html + istatistikSatiri("⭐", "Ustalık seviyesi atlama",
    ist.ustalikSeviyeAtlama.toLocaleString());

  html = html + "<div class='baslik'>Savaş</div>";
  html = html + istatistikSatiri("💀", "Öldürülen canavar",
    ist.oldurulenCanavar.toLocaleString());
  html = html + istatistikSatiri("🏹", "Atılan ok",
    ist.atilanOk.toLocaleString());
  html = html + istatistikSatiri("🍤", "Yenen yemek",
    ist.yenenYemek.toLocaleString());
  html = html + istatistikSatiri("⚰️", "Ölüm sayısı",
    ist.olumSayisi.toLocaleString());

  html = html + "<div class='baslik'>Ekonomi</div>";
  html = html + istatistikSatiri("🪙", "Kazanılan altın",
    ist.kazanilanAltin.toLocaleString());
  html = html + istatistikSatiri("💸", "Harcanan altın",
    ist.harcananAltin.toLocaleString());

  icerikAlani.innerHTML = html;
}

// ---------- CLAN EKRANI ----------

function clanEkraniCiz() {
  let html = sayfaBasligi("clan", "🛡️ Clan");

  // --- Clan yoksa kurulum ekranı ---
  if (clanVarMi() === false) {
    html = html +
      "<div class='kart'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>Henüz bir clanın yok</strong>" +
      "<span class='alt-bilgi'>Clan kurup kaynak bağışlayarak clan seviyeni " +
      "yükseltebilirsin. Clan seviyesi tüm üyelere kalıcı bonuslar verir.</span>" +
      "</span>" +
      "<button onclick='clanKur()'>Clan Kur</button>" +
      "</div>";

    // Neler kazanacağını göster - motivasyon
    html = html + "<div class='baslik'>Clan Bonusları</div>";

    for (let i = 0; i < clanBonuslari.length; i++) {
      let bonus = clanBonuslari[i];
      html = html +
        "<div class='kart kilitli'>" +
        "<span class='aksiyon-bilgi'>" +
        "<strong>" + bonus.ikon + " " + bonus.isim + "</strong>" +
        "<span class='alt-bilgi'>" + bonus.aciklama + "</span>" +
        "</span>" +
        "<span class='deger'>Sv " + bonus.seviye + "</span>" +
        "</div>";
    }

    icerikAlani.innerHTML = html;
    return;
  }

  // --- Clan varsa ana panel ---
  let clan = state.clan;
  let bilgi = clanSeviyeBilgisi();

  html = html +
    "<div class='clan-karti'>" +
    "<div class='clan-amblem'>" + clan.amblem + "</div>" +
    "<div class='clan-bilgi'>" +
    "<div class='clan-ad'>" + clan.isim + "</div>" +
    "<div class='clan-alt'>Seviye " + bilgi.seviye + " · " +
    clan.uyeler.length + " üye · " +
    clan.puan.toLocaleString() + " puan</div>" +
    "</div>" +
    "</div>";

  // Seviye çubuğu
  html = html +
    "<div class='xp-panel'>" +
    "<div class='xp-ust'>" +
    "<span class='xp-seviye'>Clan Seviyesi " + bilgi.seviye + "</span>" +
    "<span class='xp-detay'>" +
    (bilgi.maxMi
      ? "MAX"
      : bilgi.kazanilan.toLocaleString() + " / " +
        bilgi.gereken.toLocaleString()) +
    "</span></div>" +
    "<div class='ilerleme'><div class='ilerleme-dolu altin' style='width:" +
    bilgi.yuzde + "%'></div></div>" +
    "<div class='xp-alt'>Kaynak bağışlayarak clan seviyesini yükselt. " +
    "Her seviye tüm üyelere fayda sağlar.</div>" +
    "</div>";

  // --- Bonuslar ---
  html = html + "<div class='baslik'>Bonuslar</div>";

  for (let i = 0; i < clanBonuslari.length; i++) {
    let bonus = clanBonuslari[i];
    let acikMi = bilgi.seviye >= bonus.seviye;

    html = html +
      "<div class='kart" + (acikMi ? "" : " kilitli") + "'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>" + (acikMi ? bonus.ikon : "🔒") + " " + bonus.isim + "</strong>" +
      "<span class='alt-bilgi'>" + bonus.aciklama + "</span>" +
      "</span>" +
      "<span class='deger'>" + (acikMi ? "AÇIK" : "Sv " + bonus.seviye) + "</span>" +
      "</div>";
  }

  // --- Bağış ---
  html = html + "<div class='baslik'>Bağış</div>";

  let bagislanabilir = envanterSirali(null);
  let bagisVarMi = false;

  for (let i = 0; i < bagislanabilir.length; i++) {
    let kayit = bagislanabilir[i];
    let puanBirim = bagisPuani(kayit.item);

    // Kuşanılabilir eşyaları bağış listesinde göstermiyoruz -
    // yanlışlıkla değerli ekipmanını vermesin
    if (kayit.item.slot) {
      continue;
    }

    bagisVarMi = true;

    html = html +
      "<div class='kart'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>" + kayit.item.ikon + " " + kayit.item.isim + "</strong>" +
      "<span class='alt-bilgi'>Elinde " + kayit.miktar +
      " · tanesi " + puanBirim + " puan</span>" +
      "</span>" +
      "<button onclick='clanaBagisla(\"" + kayit.item.id + "\", 1)'>1</button>" +
      "<button onclick='clanaBagisla(\"" + kayit.item.id + "\", " +
      kayit.miktar + ")'>Hepsi (+" + (puanBirim * kayit.miktar) + ")</button>" +
      "</div>";
  }

  if (bagisVarMi === false) {
    html = html +
      "<div class='kart'><span class='alt-bilgi'>" +
      "Bağışlanacak malzemen yok. Ekipmanlar bağışlanamaz.</span></div>";
  }

  // --- Üyeler ---
  html = html + "<div class='baslik'>Üyeler</div>";

  for (let i = 0; i < clan.uyeler.length; i++) {
    let uye = clan.uyeler[i];

    html = html +
      "<div class='kart'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>🧙 " + uye.isim +
      (uye.rol === "lider" ? " <span class='rol-rozeti'>Lider</span>" : "") +
      "</strong>" +
      "<span class='alt-bilgi'>Katkı: " + uye.katki.toLocaleString() +
      " puan</span>" +
      "</span></div>";
  }

  html = html +
    "<div class='kart'><span class='alt-bilgi'>" +
    "🌐 Çevrimiçi özellikler henüz hazır değil. Şimdilik clan sadece senin. " +
    "Sunucu geldiğinde arkadaşların katılabilecek ve birlikte bağış yapabileceksiniz." +
    "</span></div>";

  // --- Amblem seçimi ---
  html = html + "<div class='baslik'>Amblem</div><div class='amblem-secici'>";

  let amblemler = ["🛡️", "⚔️", "🐺", "🔥", "🌲", "⭐", "🐉", "👑", "🦅", "⚡"];

  for (let i = 0; i < amblemler.length; i++) {
    html = html +
      "<div class='amblem-oge" +
      (clan.amblem === amblemler[i] ? " aktif" : "") + "' " +
      "onclick='clanAmblemiDegistir(\"" + amblemler[i] + "\")'>" +
      amblemler[i] + "</div>";
  }

  html = html + "</div>";

  // --- Dağıtma ---
  html = html +
    "<div class='kart tehlike'>" +
    "<span class='aksiyon-bilgi'><strong>Clanı Dağıt</strong>" +
    "<span class='alt-bilgi'>Tüm bağışlar ve clan seviyesi silinir. " +
    "Geri alınamaz.</span></span>" +
    "<button onclick='clanDagit()'>Dağıt</button>" +
    "</div>";

  icerikAlani.innerHTML = html;
}

// ---------- BAŞARIM EKRANI ----------

function basarimEkraniCiz() {
  let html = sayfaBasligi("achievements", "🏆 Başarımlar");

  let toplam = basarimlar.length;
  let acilan = state.acilanBasarimlar.length;
  let yuzde = (acilan / toplam) * 100;

  html = html +
    "<div class='xp-panel'>" +
    "<div class='xp-ust'>" +
    "<span class='xp-seviye'>Tamamlanan</span>" +
    "<span class='xp-detay'>" + acilan + " / " + toplam + "</span>" +
    "</div>" +
    "<div class='ilerleme'><div class='ilerleme-dolu altin' style='width:" +
    yuzde + "%'></div></div>" +
    "<div class='xp-alt'>Her başarımdan sonrakiler sırayla açılır. " +
    "Bazıları gizlidir.</div>" +
    "</div>";

  let liste = gosterilecekBasarimlar();
  let sonGrup = "";

  for (let i = 0; i < liste.length; i++) {
    let b = liste[i];
    let acikMi = basarimAcikMi(b.id);
    let gizliMi = b.gizli && acikMi === false;

    if (b.grup !== sonGrup) {
      html = html + "<div class='baslik'>" + b.grup + "</div>";
      sonGrup = b.grup;
    }

    // Gizli ve henüz açılmamışsa detay verme
    if (gizliMi) {
      html = html +
        "<div class='kart kilitli'>" +
        "<span class='aksiyon-bilgi'>" +
        "<strong>❓ Gizli Başarım</strong>" +
        "<span class='alt-bilgi'>Oynarken kendiliğinden açılacak</span>" +
        "</span></div>";
      continue;
    }

    let ilerleme = basarimIlerlemesi(b);

    let odulYazisi = "";
    if (b.odul) {
      if (b.odul.altin) {
        odulYazisi = "🪙 " + b.odul.altin;
      }
      if (b.odul.itemId) {
        let item = itemBul(b.odul.itemId);
        if (item !== null) {
          odulYazisi = item.ikon + " ×" + b.odul.miktar;
        }
      }
    }

    html = html +
      "<div class='kart" + (acikMi ? " basarim-acik" : "") + "'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>" + (acikMi ? "🏆" : b.ikon) + " " + b.isim + "</strong>" +
      "<span class='alt-bilgi'>" + b.aciklama +
      (odulYazisi !== "" ? " · Ödül: " + odulYazisi : "") + "</span>" +
      (acikMi
        ? "<span class='alt-bilgi yeterli'>✓ Tamamlandı</span>"
        : "<span class='alt-bilgi'>" +
          ilerleme.mevcut.toLocaleString() + " / " +
          ilerleme.hedef.toLocaleString() + "</span>") +
      "</span>" +
      (acikMi
        ? ""
        : "<div class='ilerleme'><div class='ilerleme-dolu mavi' style='width:" +
          ilerleme.yuzde + "%'></div></div>") +
      "</div>";
  }

  icerikAlani.innerHTML = html;
}

// ---------- AYARLAR EKRANI ----------

function ayarlarEkraniCiz() {
  let html = sayfaBasligi("settings", "⚙️ Ayarlar");

  html = html + "<div class='baslik'>Kayıt</div>";

  html = html +
    "<div class='kart'><span class='aksiyon-bilgi'>" +
    "<strong>Otomatik kayıt</strong>" +
    "<span class='alt-bilgi'>İlerlemen her 5 saniyede bir ve sekmeyi " +
    "kapatırken otomatik kaydedilir. Kayıt bu tarayıcıda saklanır.</span>" +
    "</span></div>";

  html = html +
    "<div class='kart'><span class='aksiyon-bilgi'>" +
    "<strong>Yedekle / Geri yükle</strong>" +
    "<span class='alt-bilgi'>Dışa Aktar'a bas, çıkan metni bir yere kaydet. " +
    "Başka cihazda o metni kutuya yapıştırıp İçe Aktar'a bas.</span>" +
    "</span></div>";

  html = html +
    "<textarea id='yedek-alani' class='yedek-kutusu' " +
    "placeholder='Yedek metni buraya gelir / buraya yapıştır'></textarea>";

  html = html +
    "<div class='kart'>" +
    "<span class='aksiyon-bilgi'><strong>Kayıt işlemleri</strong></span>" +
    "<button onclick='kaydiDisaAktar()'>Dışa Aktar</button>" +
    "<button onclick='kaydiIceAktar()'>İçe Aktar</button>" +
    "</div>";

  html = html + "<div class='baslik'>Tehlikeli Bölge</div>";

  html = html +
    "<div class='kart tehlike'>" +
    "<span class='aksiyon-bilgi'><strong>Oyunu Sıfırla</strong>" +
    "<span class='alt-bilgi'>Tüm ilerlemen silinir ve oyun baştan başlar. " +
    "Geri alınamaz — önce yedek almak isteyebilirsin.</span></span>" +
    "<button onclick='oyunuSifirla()'>Sıfırla</button>" +
    "</div>";

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
  if (state.acikSekme === "settings") {
    ayarlarEkraniCiz();
    return;
  }
    if (state.acikSekme === "stats") {
    istatistikEkraniCiz();
    return;
  }
  if (state.acikSekme === "clan") {
    clanEkraniCiz();
    return;
  }

  let acikSkill = skillBul(state.acikSekme);
  if (acikSkill !== null) {
    skillEkraniCiz(acikSkill);
  }

    if (state.acikSekme === "achievements") {
    basarimEkraniCiz();
    return;
  }
}

export function tumEkraniCiz() {
  menuCiz();
  icerikCiz();
}

// ---------- HEDEFLİ GÜNCELLEMELER ----------
// Tüm ekranı yeniden çizmeden, sadece belirli bir parçayı günceller.

export function esikYazisiGuncelle() {
  let deger = document.getElementById("esik-deger");
  if (deger !== null) {
    deger.textContent = "%" + state.otomatikYemekEsigi;
  }

  let aciklama = document.getElementById("esik-aciklama");
  if (aciklama !== null) {
    let esikCan = Math.floor(toplamMaxHp() * (state.otomatikYemekEsigi / 100));
    aciklama.textContent =
      "Can %" + state.otomatikYemekEsigi + " altına düşünce ye (" +
      esikCan + " canın altında)";
  }
}

export function cubuklariGuncelle() {
  let aksiyonCubugu = document.getElementById("aksiyon-cubugu");
  if (aksiyonCubugu !== null && state.aktifAksiyonId !== null) {
    let action = actionBul(state.aktifAksiyonId);
    if (action !== null) {
    let yuzde = ((Date.now() - state.aksiyonBaslangicZamani) /
        aksiyonSuresi(action)) * 100;
      if (yuzde > 100) {
        yuzde = 100;
      }
      aksiyonCubugu.style.width = yuzde + "%";
    }
  }

  // Savaş çubuğu oyuncunun kendi saldırı hızına göre dolar
  let savasCubugu = document.getElementById("savas-cubugu");
  if (savasCubugu !== null && state.aktifSavasZamanlayici !== null) {
    let hiz = oyuncuSaldiriHizi();
    let kalan = state.siradakiOyuncuVurus - Date.now();
    let yuzde = ((hiz - kalan) / hiz) * 100;

    if (yuzde > 100) {
      yuzde = 100;
    }
    if (yuzde < 0) {
      yuzde = 0;
    }

    savasCubugu.style.width = yuzde + "%";
  }
}