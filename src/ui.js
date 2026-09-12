import { skills, savasStilleri } from "./data/skills.js";
import { items } from "./data/items.js";
import { actions } from "./data/actions.js";
import { slotDuzeni, ekipmanSlotlari } from "./data/slots.js";
import { dukkanUrunleri } from "./data/shop.js";
import { state, CAN_YENILENME_MS } from "./state.js";
import { bolgeler } from "./data/regions.js";
import { yardimlar, ustalikBolumu } from "./data/help.js";
import { muzikAcikMi, muzikSeviyesiAl } from "./music.js";
import { aktifSlotAl } from "./save.js";
import { clanDallari } from "./data/clan.js";
import { basarimlar } from "./data/achievements.js";
import { aletTurleri } from "./data/tools.js";
import { dukkanYukseltmeleri } from "./data/shopUpgrades.js";
import { kronikKayitlari } from "./data/lore.js";
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
  clanVarMi, clanSeviyeBilgisi, clanSeviyesi,
  clanDalKademesi, clanKalanPuan, clanToplamPuan,
  clanDepoKapasitesi, clanDepoKullanilan, envanterKapasitesi,
  clanHizBonusu, basarimAcikMi, basarimIlerlemesi, gosterilecekBasarimlar,
  nisanPuaniDegeri,aletKademesi, aletKademeBilgisi,
  maxSekmeSayisi, skillAletTuru, aletYeterliMi, ciftUrunSansi,
  sonrakiUstalikTasi, aktifBonusListesi, bonusAdi, bonusIkonu,
  dukkanKademesi, satisCarpani, kronikAcikMi, acilanKronikSayisi,
  itemRengi, itemKademesi, canYenilenmeCarpani
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
  // --- Toplam özet: kaç slot dolu, ne kadar savunma ---
  let doluSayi = 0;
  let toplamSavunma = 0;
  let toplamSaldiriBonus = 0;
  let toplamIsabet = 0;

  for (let i = 0; i < ekipmanSlotlari.length; i++) {
    let sid = ekipmanSlotlari[i].id;
    let tid = state.ekipman[sid];

    if (tid === null || tid === undefined) {
      continue;
    }

    let it = itemBul(tid);
    if (it === null) {
      continue;
    }

    doluSayi = doluSayi + 1;
    if (it.savunmaBonusu) toplamSavunma = toplamSavunma + it.savunmaBonusu;
    if (it.saldiriBonusu) toplamSaldiriBonus = toplamSaldiriBonus + it.saldiriBonusu;
    if (it.isabetBonusu) toplamIsabet = toplamIsabet + it.isabetBonusu;
  }

  let html =
    "<div class='ekipman-ozet'>" +
    "<span class='ekipman-ozet-oge'>" +
    "<span class='ekipman-ozet-etiket'>Dolu</span>" +
    "<span class='ekipman-ozet-deger'>" + doluSayi + " / " +
    ekipmanSlotlari.length + "</span></span>" +
    "<span class='ekipman-ozet-oge'>" +
    "<span class='ekipman-ozet-etiket'>💥 Hasar</span>" +
    "<span class='ekipman-ozet-deger'>+" + toplamSaldiriBonus + "</span></span>" +
    "<span class='ekipman-ozet-oge'>" +
    "<span class='ekipman-ozet-etiket'>🎯 İsabet</span>" +
    "<span class='ekipman-ozet-deger'>+" + toplamIsabet + "</span></span>" +
    "<span class='ekipman-ozet-oge'>" +
    "<span class='ekipman-ozet-etiket'>🛡️ Savunma</span>" +
    "<span class='ekipman-ozet-deger'>+" + toplamSavunma + "</span></span>" +
    "</div>";

  // --- Izgara ---
  html = html + "<div class='ekipman-izgara'>";

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
      let icerik = "";
      let adetRozeti = "";
      let renkStili = "";
      let baslik = slot.isim;

      if (takiliItemId !== null && takiliItemId !== undefined) {
        let item = itemBul(takiliItemId);

        if (item !== null) {
          sinif = sinif + " dolu";
          icerik = "<span class='slot-ikon'>" + item.ikon + "</span>";
          baslik = item.isim;

          // Kademe rengi — oyuncu ekipman seviyesini bir bakışta görür
          let renk = itemRengi(item);
          if (renk !== null) {
            renkStili = " style='--kademe-renk:" + renk + "'";
            sinif = sinif + " kademeli";
          }

          if (slotYiginMi(slotId)) {
            let adet = slotAdedi(slotId);
            let yazi = adet >= 1000
              ? (adet / 1000).toFixed(1) + "B"
              : adet.toString();
            adetRozeti = "<span class='slot-adet'>" + yazi + "</span>";
          }
        }
      } else {
        // Boş slot: türünü anlatan soluk ikon
        icerik = "<span class='slot-ikon bos'>" + slot.bosIkon + "</span>";
        sinif = sinif + " bos-slot";
      }

      if (state.secilenSlot === slotId) {
        sinif = sinif + " secili";
      }

      html = html +
        "<div class='" + sinif + "'" + renkStili +
        " title='" + baslik + "' " +
        "onclick='slotTikla(\"" + slotId + "\")'>" +
        icerik + adetRozeti +
        "<span class='slot-ad'>" + slot.isim + "</span>" +
        "</div>";
    }
  }

  html = html + "</div>";

  // --- Seçili slota takılabilecek eşyalar ---
  if (state.secilenSlot !== null) {
    let slot = slotBul(state.secilenSlot);

    html = html +
      "<div class='kademe-baslik'>" + slot.bosIkon + " " +
      slot.isim + " için eşyalar</div>";

    let bulundu = false;
    let izgara = "";

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

      let kusanabilir = itemKusanilabilirMi(item);
      let renk = itemRengi(item);
      let kademe = itemKademesi(item);

      let bonuslar = [];
      if (item.saldiriBonusu) bonuslar.push("💥 +" + item.saldiriBonusu);
      if (item.isabetBonusu) bonuslar.push("🎯 +" + item.isabetBonusu);
      if (item.savunmaBonusu) bonuslar.push("🛡️ +" + item.savunmaBonusu);
      if (item.iyilestirme) bonuslar.push("❤️ +" + item.iyilestirme);
      if (item.hizMs) bonuslar.push("⏱️ " + (item.hizMs / 1000) + "sn");

      izgara = izgara +
        "<div class='takilacak-kutu" +
        (kusanabilir ? "" : " kilitli") + "'" +
        (renk !== null ? " style='--kademe-renk:" + renk + "'" : "") + ">" +
        "<div class='takilacak-ic'>" +
        (kademe !== null
          ? "<div class='takilacak-kademe'>" + kademe.isim + "</div>"
          : "<div class='takilacak-kademe'>&nbsp;</div>") +
        "<div class='takilacak-gorsel'>" + item.ikon + "</div>" +
        "<div class='takilacak-ad'>" + item.isim + "</div>" +
        (bonuslar.length > 0
          ? "<div class='takilacak-bonus'>" + bonuslar.join(" · ") + "</div>"
          : "") +
        (slotYiginMi(state.secilenSlot)
          ? "<div class='takilacak-adet'>Elinde " + elimdeki +
            " (hepsi takılır)</div>"
          : "") +
        (kusanabilir
          ? ""
          : "<div class='takilacak-kilit'>🔒 " +
            eksikGereksinimYazisi(item) + "</div>") +
        "</div>" +
        "<button class='takilacak-buton' onclick='ekipmanKusan(\"" +
        item.id + "\")'" + (kusanabilir ? "" : " disabled") + ">" +
        (kusanabilir ? "Kuşan" : "Kilitli") +
        "</button>" +
        "</div>";
    }

    if (bulundu === false) {
      html = html +
        "<div class='bos-durum'>" +
        "<div class='bos-durum-ikon'>" + slot.bosIkon + "</div>" +
        "<div class='bos-durum-yazi'>Bu slot için eşyan yok</div>" +
        "<div class='bos-durum-alt'>Üreterek, satın alarak veya " +
        "savaşarak bulabilirsin</div></div>";
    } else {
      html = html + "<div class='takilacak-izgara'>" + izgara + "</div>";
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
    "<div class='menu-oge" + (state.acikSekme === "chronicle" ? " aktif" : "") + "' " +
    "onclick='sekmeAc(\"chronicle\")'>" +
    "<span class='menu-ikon'>📖</span>" +
    "<span class='menu-isim'>Kronik</span>" +
    "<span class='menu-seviye'>" + acilanKronikSayisi() + "</span>" +
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

function aksiyonKutusuHtml(action) {
  let acikMi = aksiyonAcikMi(action);
  let aletVarMi = aletYeterliMi(action);
  let calisiyor = state.aktifAksiyonId === action.id;
  let malzemeVarMi = girdilerYeterliMi(action);
 
  // --- KİLİTLİ ---
  if (acikMi === false || aletVarMi === false) {
    let sartlar = [];
 
    if (acikMi === false) {
      sartlar.push("Seviye " + aksiyonSeviyeGerekli(action));
    }
 
    if (aletVarMi === false) {
      let alet = skillAletTuru(action.skillId);
      let gerekli = aletKademeBilgisi(action.gerekliAletKademesi);
      if (alet !== null && gerekli !== null) {
        sartlar.push(gerekli.isim + " " + alet.isim);
      }
    }
 
    // Kilitliyken ürünün ne olduğunu göster — hedef belli olsun
    let hedefIkon = "❓";
    if (action.ciktilar && action.ciktilar.length > 0) {
      let ci = itemBul(action.ciktilar[0].itemId);
      if (ci !== null) {
        hedefIkon = ci.ikon;
      }
    }
 
    return "<div class='aksiyon-kutu kilitli-kutu'>" +
      "<div class='aksiyon-ic'>" +
      "<div class='aksiyon-ust-yazi'>Kilitli</div>" +
      "<div class='aksiyon-ad'>" + action.isim + "</div>" +
      "<div class='aksiyon-gorsel'>" + hedefIkon + "</div>" +
      "</div>" +
      "<div class='aksiyon-kilit-serit'>🔒 " + sartlar.join(" + ") + "</div>" +
      "</div>";
  }
 
  // --- Ürün ikonu ---
  let urunIkon = "❓";
  let urunAd = "";
  if (action.ciktilar && action.ciktilar.length > 0) {
    let ci = itemBul(action.ciktilar[0].itemId);
    if (ci !== null) {
      urunIkon = ci.ikon;
      urunAd = ci.isim +
        (action.ciktilar[0].miktar > 1 ? " ×" + action.ciktilar[0].miktar : "");
    }
  }
 
  // --- Girdiler ---
  let girdiYazisi = "";
  if (action.girdiler) {
    let parcalar = [];
    for (let i = 0; i < action.girdiler.length; i++) {
      let g = action.girdiler[i];
      let gi = itemBul(g.itemId);
      if (gi === null) {
        continue;
      }
      let elimdeki = envanterdekiMiktar(g.itemId);
      let yeterli = elimdeki >= g.miktar;
      parcalar.push(
        "<span class='" + (yeterli ? "yeterli" : "yetersiz") + "'>" +
        gi.ikon + g.miktar + "</span>"
      );
    }
    girdiYazisi = parcalar.join(" ");
  }
 
  // --- Süre, XP, bonuslar ---
  let gercekSure = aksiyonSuresi(action);
  let ustalikB = ustalikHizBonusu(action.id);
  let clanB = clanHizBonusu();
  let hizB = ustalikB + clanB;
  let ciftSans = ciftUrunSansi(action);
 
  let ustalik = ustalikBilgisi(action.id);
  let sonrakiTas = sonrakiUstalikTasi(action.id);
 
  // --- Durum sınıfı ---
  let durumSinifi = "hazir";
  if (calisiyor) {
    durumSinifi = "calisiyor";
  } else if (malzemeVarMi === false) {
    durumSinifi = "malzeme-yok";
  }
 
  let html = "<div class='aksiyon-kutu " + durumSinifi + "'>" +
    "<div class='aksiyon-ic'>" +
    "<div class='aksiyon-ust-yazi'>" +
    (gercekSure / 1000).toFixed(1) + "sn · +" + action.xp + " XP" +
    "</div>" +
    "<div class='aksiyon-ad'>" + action.isim + "</div>" +
    "<div class='aksiyon-gorsel'>" + urunIkon + "</div>";
 
  if (urunAd !== "") {
    html = html + "<div class='aksiyon-satir'>" + urunAd + "</div>";
  }
 
  if (girdiYazisi !== "") {
    html = html + "<div class='aksiyon-satir'>" + girdiYazisi + "</div>";
  }
 
  // Aktif bonuslar
  let bonuslar = [];
  if (hizB > 0) {
    bonuslar.push("<span class='yeterli'>-%" +
      Math.round(hizB * 100) + " süre</span>");
  }
  if (ciftSans > 0) {
    bonuslar.push("<span class='yeterli'>%" +
      Math.round(ciftSans * 100) + " çift</span>");
  }
  if (bonuslar.length > 0) {
    html = html + "<div class='aksiyon-satir'>" + bonuslar.join(" · ") + "</div>";
  }
 
  // Ustalık
  html = html +
    "<div class='aksiyon-ustalik'>" +
    "<span class='aksiyon-ustalik-rozet'>⭐" + ustalik.seviye + "</span>" +
    "<span class='aksiyon-ustalik-cubuk'>" +
    "<span class='aksiyon-ustalik-dolu' style='width:" +
    ustalik.yuzde + "%'></span></span>" +
    (sonrakiTas !== null
      ? "<span class='aksiyon-ustalik-rozet' title='" +
        sonrakiTas.aciklama + "'>" + sonrakiTas.seviye + "</span>"
      : "<span class='aksiyon-ustalik-rozet'>✦</span>") +
    "</div>";
 
  // İlerleme çubuğu (sadece çalışırken doluyor)
  html = html +
    "<div class='aksiyon-cubuk-yuva'>" +
    "<div class='aksiyon-cubuk-dolu'" +
    (calisiyor ? " id='aksiyon-cubugu'" : "") +
    "></div></div>";
 
  html = html + "</div>";
 
  // --- Buton ---
  html = html +
    "<button class='aksiyon-buton " + (calisiyor ? "durdur" : "baslat") + "' " +
    "onclick='" +
    (calisiyor ? "aksiyonDurdur()" : "aksiyonBaslat(\"" + action.id + "\")") +
    "'" + (malzemeVarMi || calisiyor ? "" : " disabled") + ">" +
    (calisiyor ? "■ Durdur" : (malzemeVarMi ? "▶ Başlat" : "Malzeme yok")) +
    "</button>";
 
  return html + "</div>";
}

// ---------- SKILL EKRANI ----------

function skillEkraniCiz(acikSkill) {
  let bilgi = seviyeBilgisi(acikSkill.xp);
  let renk = acikSkill.renk ? acikSkill.renk : "#6c8cff";
 
  // Sayfanın tamamı bu yeteneğin rengini kullanır
  let html = "<div class='skill-sayfa' style='--skill-renk:" + renk + "'>";
 
  // --- Renkli başlık bandı ---
  html = html +
    "<div class='skill-band' style='--skill-renk:" + renk + "' " +
    "data-ikon='" + acikSkill.ikon + "'>" +
    "<div class='skill-band-ikon'>" + acikSkill.ikon + "</div>" +
    "<div class='skill-band-bilgi'>" +
    "<div class='skill-band-ad'>" + acikSkill.isim + "</div>" +
    "<div class='skill-band-alt'>Seviye " + bilgi.seviye + " / 99 · " +
    (bilgi.maxMi
      ? "MAX"
      : bilgi.seviyedeKazanilan.toLocaleString() + " / " +
        bilgi.seviyedeGereken.toLocaleString() + " XP") +
    "</div>" +
    "<div class='skill-band-cubuk'><div class='skill-band-dolu' style='width:" +
    bilgi.yuzde + "%'></div></div>" +
    "</div>" +
    (yardimlar[acikSkill.id] !== undefined
      ? "<button class='skill-band-yardim' onclick='yardimDegistir()'>" +
        (state.yardimAcik ? "✕" : "?") + "</button>"
      : "") +
    "</div>";
 
  html = html + yardimPaneli(acikSkill.id);
 
  // --- Savaş yeteneklerinin aksiyonu yok ---
  if (acikSkill.kategori === "combat") {
    html = html +
      "<div class='kart'><span class='alt-bilgi'>" +
      "Bu yetenek savaşarak gelişir. Canavarlar sayfasından " +
      "savaş stilini seçip dövüşe gir." +
      "</span><button onclick='sekmeAc(\"combat\")'>Canavarlar</button></div>";
    icerikAlani.innerHTML = html + "</div>";
    return;
  }
 
  // --- Ustalık özeti ---
  let ustalikYuzde = skillUstalikYuzdesi(acikSkill.id);
  let skillAleti = skillAletTuru(acikSkill.id);
 
  html = html + "<div class='stat-satiri'>";
 
  html = html +
    "<div class='stat-kutu'><span class='stat-etiket'>⭐ Ustalık</span>" +
    "<span class='stat-deger'>%" + ustalikYuzde.toFixed(1) + "</span></div>";
 
  if (skillAleti !== null) {
    let kademe = aletKademesi(skillAleti.id);
    let aletBilgi = aletKademeBilgisi(kademe);
    html = html +
      "<div class='stat-kutu'><span class='stat-etiket'>" +
      skillAleti.ikon + " " + skillAleti.isim + "</span>" +
      "<span class='stat-deger' style='font-size:0.95rem'>" +
      aletBilgi.isim + "</span></div>";
  }
 
  html = html +
    "<div class='stat-kutu'><span class='stat-etiket'>Toplam XP</span>" +
    "<span class='stat-deger' style='font-size:1rem'>" +
    acikSkill.xp.toLocaleString() + "</span></div>";
 
  html = html + "</div>";
 
  // --- Aksiyon ızgarası ---
  let izgara = "";
  let aksiyonVarMi = false;
 
  for (let i = 0; i < actions.length; i++) {
    let action = actions[i];
 
    if (action.skillId !== acikSkill.id) {
      continue;
    }
 
    aksiyonVarMi = true;
    izgara = izgara + aksiyonKutusuHtml(action);
  }
 
  if (aksiyonVarMi === false) {
    html = html +
      "<div class='bos-durum'>" +
      "<div class='bos-durum-ikon'>🚧</div>" +
      "<div class='bos-durum-yazi'>Henüz aksiyon yok</div>" +
      "<div class='bos-durum-alt'>Bu yetenek için içerik " +
      "sonra eklenecek</div></div>";
  } else {
    html = html +
      "<div class='kademe-baslik'>Aksiyonlar</div>" +
      "<div class='aksiyon-izgara'>" + izgara + "</div>";
  }
 
  icerikAlani.innerHTML = html + "</div>";
}

// ---------- TEK BİR CANAVAR KARTI ----------
//
// Aksiyon ızgarasıyla aynı kalıp. Fark: can çubuğu ve tip
// rozeti var, çünkü savaşta bu iki bilgi en kritik.
function canavarKutusuHtml(monster, bolgeRenk) {
  let buCanavarAktif = state.aktifSavasMonsterId === monster.id;

  let gosterilecekHp = buCanavarAktif
    ? state.aktifSavasMonsterHp
    : monster.maxHp;

  let hpYuzde = (gosterilecekHp / monster.maxHp) * 100;
  if (hpYuzde < 0) {
    hpYuzde = 0;
  }

  let benimIsabet = Math.round(oyuncuIsabetSansi(monster) * 100);
  let onunIsabet = Math.round(canavarIsabetSansi(monster) * 100);
  let hasarim = canavaraHasar(monster);
  let gelenHasarMiktar = gelenHasar(monster.saldiri);

  // --- Savaş üçgeni rozeti ---
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
      tip.ikon + ok + "</span>";
  }

  let html =
    "<div class='canavar-kutu" + (buCanavarAktif ? " dovusuyor" : "") + "' " +
    "id='canavar-" + monster.id + "' " +
    "style='--bolge-renk:" + bolgeRenk + "'>" +
    "<div class='canavar-ic'>" +
    "<div class='canavar-ust'>" +
    "<span class='canavar-sv'>+" + monster.xpOdulu + " XP</span>" +
    tipRozeti +
    "</div>" +
    "<div class='canavar-ad'>" + monster.isim + "</div>" +
    "<div class='canavar-gorsel'>" + monster.ikon + "</div>" +

    // Can çubuğu + sayı
    "<div class='canavar-can-satiri'>" +
    "<span class='canavar-can-yazi'>" +
    gosterilecekHp + " / " + monster.maxHp + "</span>" +
    "</div>" +
    "<div class='canavar-can-yuva'>" +
    "<div class='canavar-can-dolu' style='width:" + hpYuzde + "%'></div>" +
    "</div>" +

    // Karşılıklı istatistikler
    "<div class='canavar-istatistik'>" +
    "<div class='canavar-ist-satir'>" +
    "<span class='canavar-ist-etiket'>Vurma şansın</span>" +
    "<span class='canavar-ist-deger " +
    (benimIsabet >= 70 ? "iyi" : (benimIsabet >= 45 ? "orta" : "kotu")) +
    "'>%" + benimIsabet + "</span>" +
    "</div>" +
    "<div class='canavar-ist-satir'>" +
    "<span class='canavar-ist-etiket'>Hasarın</span>" +
    "<span class='canavar-ist-deger'>" + hasarim + "</span>" +
    "</div>" +
    "<div class='canavar-ist-satir'>" +
    "<span class='canavar-ist-etiket'>Sana vurma</span>" +
    "<span class='canavar-ist-deger " +
    (onunIsabet <= 30 ? "iyi" : (onunIsabet <= 55 ? "orta" : "kotu")) +
    "'>%" + onunIsabet + "</span>" +
    "</div>" +
    "<div class='canavar-ist-satir'>" +
    "<span class='canavar-ist-etiket'>Vuruşu</span>" +
    "<span class='canavar-ist-deger'>" + gelenHasarMiktar +
    " · " + (monster.saldiriHiziMs / 1000) + "sn</span>" +
    "</div>" +
    "</div>" +

    "</div>";

  // --- Buton ---
  html = html +
    "<button class='canavar-buton " +
    (buCanavarAktif ? "durdur" : "saldir") + "' onclick='" +
    (buCanavarAktif ? "savasDurdur()" : "savasBaslat(\"" + monster.id + "\")") +
    "'>" +
    (buCanavarAktif ? "■ Kaç" : "⚔ Saldır") +
    "</button>";

  return html + "</div>";
}


// ---------- SAVAŞ EKRANI ----------

function savasEkraniCiz() {
  let savasVarMi = state.aktifSavasZamanlayici !== null;
  let acikBolge = bolgeBul(state.acikBolgeId);
  let bolgeRenk = (acikBolge !== null && acikBolge.renk)
    ? acikBolge.renk
    : "#6c8cff";

  let html = "<div class='savas-sayfa' style='--bolge-renk:" + bolgeRenk + "'>";

  // ===== BÖLGE BANDI =====
  if (acikBolge !== null) {
    html = html +
      "<div class='skill-band' style='--skill-renk:" + bolgeRenk + "' " +
      "data-ikon='" + acikBolge.ikon + "'>" +
      "<div class='skill-band-ikon'>" + acikBolge.ikon + "</div>" +
      "<div class='skill-band-bilgi'>" +
      "<div class='skill-band-ad'>" + acikBolge.isim + "</div>" +
      "<div class='skill-band-alt'>Savaş Seviyesi " + savasSeviyesi() +
      " · " + bolgeninCanavarlari(acikBolge.id).length + " canavar</div>" +
      "</div>" +
      (yardimlar["combat"] !== undefined
        ? "<button class='skill-band-yardim' onclick='yardimDegistir()'>" +
          (state.yardimAcik ? "✕" : "?") + "</button>"
        : "") +
      "</div>";
  }

  html = html + yardimPaneli("combat");

  // ===== OYUNCU DURUM ŞERİDİ =====
  let oyuncuHpYuzde = (state.oyuncuHp / toplamMaxHp()) * 100;
  let yemek = slotItemi("food");
  let ok = okluSilahMi() ? slotItemi("ammo") : null;

  html = html +
    "<div class='oyuncu-serit" + (savasVarMi ? " dovusuyor" : "") + "' " +
    "id='oyuncu-karti'>" +
    "<div class='oyuncu-serit-ust'>" +
    "<span class='oyuncu-serit-ad'>🧙 " + state.oyuncuAdi + "</span>" +
    "<span class='oyuncu-serit-can'>" +
    state.oyuncuHp + " / " + toplamMaxHp() + "</span>" +
    "</div>" +
    "<div class='oyuncu-can-yuva'>" +
    "<div class='oyuncu-can-dolu' style='width:" + oyuncuHpYuzde + "%'></div>" +
    "</div>" +
    (savasVarMi
      ? "<div class='oyuncu-vurus-yuva'>" +
        "<div class='oyuncu-vurus-dolu' id='savas-cubugu'></div></div>"
      : "") +
    "<div class='oyuncu-serit-alt'>" +
    "<span class='oyuncu-stat'>🎯 " + isabetPuani() + "</span>" +
    "<span class='oyuncu-stat'>💥 " + toplamSaldiri() + "</span>" +
    "<span class='oyuncu-stat'>🛡️ " + kacinmaPuani() + "</span>" +
    "<span class='oyuncu-stat'>⏱️ " +
    (oyuncuSaldiriHizi() / 1000).toFixed(1) + "sn</span>" +
    (okluSilahMi()
      ? (ok === null
          ? "<span class='oyuncu-stat yetersiz'>🏹 Ok yok!</span>"
          : "<span class='oyuncu-stat'>" + ok.ikon + " " +
            slotAdedi("ammo") + "</span>")
      : "") +
    (yemek !== null
      ? "<span class='oyuncu-stat'>" + yemek.ikon + " " +
        slotAdedi("food") + "</span>"
      : "") +
    (yemek !== null && state.oyuncuHp < toplamMaxHp()
      ? "<button class='oyuncu-ye' onclick='yemekYe()'>Ye</button>"
      : "") +
    "</div>" +
    "</div>";

  // ===== SAVAŞ STİLİ =====
  html = html + "<div class='kademe-baslik'>Savaş Stili</div>";
  html = html + "<div class='stil-secici'>";

  if (menzilliMi()) {
    html = html +
      "<div class='stil-oge aktif'>" +
      "<span class='stil-ikon'>🏹</span>" +
      "<span class='stil-isim'>Menzilli</span>" +
      "<span class='stil-aciklama'>Yay kuşandın · Sv " +
      skillSeviyesi("ranged") + "</span>" +
      "</div>";
  } else {
    for (let i = 0; i < savasStilleri.length; i++) {
      let stil = savasStilleri[i];
      html = html +
        "<div class='stil-oge" +
        (state.savasStili === stil.id ? " aktif" : "") + "' " +
        "onclick='savasStiliSec(\"" + stil.id + "\")'>" +
        "<span class='stil-ikon'>" + stil.ikon + "</span>" +
        "<span class='stil-isim'>" + stil.isim + "</span>" +
        "<span class='stil-aciklama'>Sv " + skillSeviyesi(stil.id) + "</span>" +
        "</div>";
    }
  }

  html = html + "</div>";

  // ===== BÖLGE SEÇİCİ =====
  html = html + "<div class='kademe-baslik'>Bölgeler</div>";
  html = html + "<div class='bolge-izgara'>";

  for (let i = 0; i < bolgeler.length; i++) {
    let bolge = bolgeler[i];
    let acikMi = bolgeAcikMi(bolge);
    let secili = state.acikBolgeId === bolge.id;
    let renk = bolge.renk ? bolge.renk : "#6c8cff";

    html = html +
      "<div class='bolge-kutu" +
      (secili ? " secili" : "") +
      (acikMi ? "" : " kilitli") + "' " +
      "style='--bolge-renk:" + renk + "' " +
      "data-ikon='" + (acikMi ? bolge.ikon : "🔒") + "' " +
      "onclick='bolgeSec(\"" + bolge.id + "\")'>" +
      "<span class='bolge-kutu-ikon'>" +
      (acikMi ? bolge.ikon : "🔒") + "</span>" +
      "<span class='bolge-kutu-ad'>" + bolge.isim + "</span>" +
      "<span class='bolge-kutu-alt'>" +
      (acikMi
        ? bolgeninCanavarlari(bolge.id).length + " canavar"
        : "Savaş Sv " + bolge.gerekliSavasSeviyesi) +
      "</span>" +
      "</div>";
  }

  html = html + "</div>";

  // ===== BÖLGE AÇIKLAMASI =====
  if (acikBolge !== null) {
    html = html +
      "<div class='bolge-aciklama'>" + acikBolge.aciklama + "</div>";
  }

  // ===== CANAVAR IZGARASI =====
  let bolgeCanavarlari = bolgeninCanavarlari(state.acikBolgeId);

  if (bolgeCanavarlari.length > 0) {
    html = html + "<div class='kademe-baslik'>Canavarlar</div>";
    html = html + "<div class='canavar-izgara'>";

    for (let i = 0; i < bolgeCanavarlari.length; i++) {
      html = html + canavarKutusuHtml(bolgeCanavarlari[i], bolgeRenk);
    }

    html = html + "</div>";
  }

  // ===== SAVAŞ KAYDI =====
  if (state.savasKayitlari.length > 0) {
    html = html + "<div class='kademe-baslik'>📜 Savaş Kaydı</div>";
    html = html + "<div class='savas-log'>";

    for (let i = 0; i < state.savasKayitlari.length; i++) {
      let kayit = state.savasKayitlari[i];

      // Eski kayıtlar düz metin olabilir — ikisini de destekle
      let metin = typeof kayit === "string" ? kayit : kayit.metin;
      let tur = typeof kayit === "string" ? "" : kayit.tur;

      html = html +
        "<div class='log-satir " + tur + "'>" + metin + "</div>";
    }

    html = html + "</div>";
  }

  // ===== EKİPMAN =====
  html = html + "<div class='kademe-baslik'>Ekipman</div>";
  html = html + ekipmanIzgarasiHtml();

  icerikAlani.innerHTML = html + "</div>";
}

function karakterEkraniCiz() {
  let html = sayfaBasligi("character", "🧙 Karakter");

  // ---------- PROFİL KARTI ----------
  let toplamSeviye = 0;
  for (let i = 0; i < skills.length; i++) {
    toplamSeviye = toplamSeviye + seviyeHesapla(skills[i].xp);
  }

  let acikBolge = bolgeBul(state.acikBolgeId);

  html = html +
    "<div class='karakter-karti'>" +
    "<div class='karakter-kimlik'>" +
    "<div class='karakter-ad'>" + state.oyuncuAdi + "</div>" +
    "<div class='karakter-alt'>" +
    (clanVarMi()
      ? state.clan.amblem + " " + state.clan.isim
      : "<span class='karakter-sonuk'>Clan yok</span>") +
    (acikBolge !== null
      ? " · " + acikBolge.ikon + " " + acikBolge.isim
      : "") +
    "</div>" +
    "</div>" +
    "<div class='karakter-savas'>" +
    "<div class='karakter-savas-etiket'>Savaş Sv.</div>" +
    "<div class='karakter-savas-deger'>" + savasSeviyesi() + "</div>" +
    "</div>" +
    "</div>";

  // ---------- CAN ÇUBUĞU ----------
  let canYuzde = (state.oyuncuHp / toplamMaxHp()) * 100;

  html = html +
    "<div class='karakter-can'>" +
    "<div class='karakter-can-ust'>" +
    "<span class='karakter-can-etiket'>❤️ Can</span>" +
    "<span class='karakter-can-deger'>" +
    state.oyuncuHp + " / " + toplamMaxHp() + "</span>" +
    "</div>" +
    "<div class='oyuncu-can-yuva'>" +
    "<div class='oyuncu-can-dolu' style='width:" + canYuzde + "%'></div>" +
    "</div>" +
    (state.oyuncuHp < toplamMaxHp()
      ? "<div class='karakter-can-alt'>Savaş dışında her " +
        (CAN_YENILENME_MS / 1000) + " saniyede " +
        canYenilenmeCarpani() + " can yenilenir" +
        (slotItemi("food") !== null
          ? " <button class='karakter-ye' onclick='yemekYe()'>Ye</button>"
          : "") +
        "</div>"
      : "") +
    "</div>";

  // ---------- SAVAŞ İSTATİSTİKLERİ ----------
  html = html + "<div class='stat-satiri'>" +
    "<div class='stat-kutu'><span class='stat-etiket'>🎯 İsabet</span>" +
    "<span class='stat-deger'>" + isabetPuani() + "</span></div>" +
    "<div class='stat-kutu'><span class='stat-etiket'>💥 Hasar</span>" +
    "<span class='stat-deger'>" + toplamSaldiri() + "</span></div>" +
    "<div class='stat-kutu'><span class='stat-etiket'>🛡️ Kaçınma</span>" +
    "<span class='stat-deger'>" + kacinmaPuani() + "</span></div>" +
    "<div class='stat-kutu'><span class='stat-etiket'>⏱️ Hız</span>" +
    "<span class='stat-deger'>" +
    (oyuncuSaldiriHizi() / 1000).toFixed(1) + "sn</span></div>" +
    "<div class='stat-kutu'><span class='stat-etiket'>🪙 Altın</span>" +
    "<span class='stat-deger altin'>" +
    state.altin.toLocaleString() + "</span></div>" +
    "<div class='stat-kutu'><span class='stat-etiket'>📊 Toplam Sv</span>" +
    "<span class='stat-deger'>" + toplamSeviye + "</span></div>" +
    "</div>";

  // Zırh bilgisi
  html = html +
    "<div class='kart'><span class='alt-bilgi'>" +
    "🛡️ Zırhın gelen hasarı " + hasarAzaltma() + " azaltıyor" +
    (menzilliMi()
      ? " · 🏹 Yay kuşandın, hasar ve isabet Menzilli yeteneğinden geliyor"
      : "") +
    "</span></div>";

  // ---------- SAVAŞ YETENEKLERİ IZGARASI ----------
  html = html + "<div class='kademe-baslik'>Savaş Yetenekleri</div>";
  html = html + "<div class='yetenek-izgara'>";

  for (let i = 0; i < skills.length; i++) {
    let skill = skills[i];
    if (skill.kategori !== "combat") {
      continue;
    }

    let bilgi = seviyeBilgisi(skill.xp);
    let renk = skill.renk ? skill.renk : "#6c8cff";

    html = html +
      "<div class='yetenek-kutu' style='--yetenek-renk:" + renk + "' " +
      "onclick='sekmeAc(\"" + skill.id + "\")'>" +
      "<div class='yetenek-ust'>" +
      "<span class='yetenek-ikon'>" + skill.ikon + "</span>" +
      "<span class='yetenek-sv'>" + bilgi.seviye + "</span>" +
      "</div>" +
      "<div class='yetenek-ad'>" + skill.isim + "</div>" +
      "<div class='yetenek-xp'>" +
      (bilgi.maxMi
        ? "MAX"
        : bilgi.seviyedeKazanilan.toLocaleString() + " / " +
          bilgi.seviyedeGereken.toLocaleString()) +
      "</div>" +
      "<div class='yetenek-cubuk'>" +
      "<div class='yetenek-dolu' style='width:" + bilgi.yuzde + "%'></div>" +
      "</div>" +
      "</div>";
  }

  html = html + "</div>";

  // ---------- ZİYAFETLER ----------
  let ziyafetHtml = "";
  let ziyafetVarMi = false;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    if (!item.bonus) {
      continue;
    }

    let sahipOlunan = envanterdekiMiktar(item.id);
    if (sahipOlunan < 1) {
      continue;
    }

    ziyafetVarMi = true;

    let etkiler = [];
    for (let e = 0; e < item.bonus.etkiler.length; e++) {
      let et = item.bonus.etkiler[e];
      etkiler.push(bonusIkonu(et.tur) + " +%" +
        Math.round(et.deger * 100));
    }

    ziyafetHtml = ziyafetHtml +
      "<div class='magaza-kutu alinabilir' style='--kutu-renk:#c49a3a'>" +
      "<div class='magaza-ic'>" +
      "<div class='magaza-ust'>Elinde " + sahipOlunan + "</div>" +
      "<div class='magaza-gorsel'>" + item.ikon + "</div>" +
      "<div class='magaza-ad'>" + item.isim + "</div>" +
      "<div class='magaza-satir vurgu'>" + etkiler.join(" · ") + "</div>" +
      "<div class='magaza-satir'>" +
      Math.round(item.bonus.sureMs / 60000) + " dk · ❤️ +" +
      item.iyilestirme + "</div>" +
      "</div>" +
      "<button class='magaza-buton' onclick='ziyafetYe(\"" +
      item.id + "\")'>Kullan</button>" +
      "</div>";
  }

  if (ziyafetVarMi) {
    html = html + "<div class='kademe-baslik'>🍲 Ziyafetler</div>";
    html = html + "<div class='magaza-izgara'>" + ziyafetHtml + "</div>";
  }

  // ---------- EKİPMAN ----------
  html = html + "<div class='kademe-baslik'>Ekipman</div>";
  html = html + ekipmanIzgarasiHtml();

  // ---------- YEMEK AYARI ----------
  html = html + "<div class='kademe-baslik'>🍤 Otomatik Yemek</div>";

  let yemek = slotItemi("food");
  let esikCan = Math.floor(toplamMaxHp() * (state.otomatikYemekEsigi / 100));

  html = html +
    "<div class='kart'><span class='aksiyon-bilgi'>" +
    "<strong>Otomatik Yemek</strong>" +
    "<span class='alt-bilgi' id='esik-aciklama'>Can %" +
    state.otomatikYemekEsigi + " altına düşünce ye (" +
    esikCan + " canın altında)</span>" +
    (yemek === null
      ? "<span class='alt-bilgi yetersiz'>Yemek slotu boş</span>"
      : "<span class='alt-bilgi'>Slotta: " + yemek.ikon + " " +
        yemek.isim + " ×" + slotAdedi("food") + "</span>") +
    "</span>" +
    "<button onclick='otomatikYemekDegistir()'>" +
    (state.otomatikYemekAcik ? "AÇIK" : "KAPALI") +
    "</button>" +
    "<div class='esik-satiri'>" +
    "<input type='range' min='10' max='90' step='1' value='" +
    state.otomatikYemekEsigi + "' " +
    "oninput='otomatikYemekEsigiAyarla(this.value)'>" +
    "<span class='esik-deger' id='esik-deger'>%" +
    state.otomatikYemekEsigi + "</span>" +
    "</div>" +
    "</div>";

  icerikAlani.innerHTML = html;
}

// ---------- SEÇİLİ EŞYANIN DETAY PANELİ ----------
//
// Eskiden satma Dükkân'da, depoya koyma Clan'da, kuşanma
// Karakter'deydi. Artık hepsi eşyaya tıklayınca tek yerde.
function esyaDetayHtml() {
  if (state.secilenEnvanterItemId === null) {
    return "";
  }

  let item = itemBul(state.secilenEnvanterItemId);
  if (item === null) {
    return "";
  }

  let adet = envanterdekiMiktar(item.id);
  if (adet < 1) {
    return "";
  }

  let html =
    "<div class='esya-detay'>" +
    "<button class='esya-detay-kapat' onclick='envanterSecimiKapat()'>✕</button>" +
    "<div class='esya-detay-ust'>" +
    "<div class='esya-detay-ikon'>" + item.ikon + "</div>" +
    "<div class='esya-detay-bilgi'>" +
    "<div class='esya-detay-ad'>" + item.isim + "</div>" +
    "<div class='esya-detay-adet'>Elinde " + adet.toLocaleString() + "</div>" +
    "</div></div>";

  // --- Bonuslar ---
  let bonus = bonusYazisi(item);
  if (bonus.trim() !== "") {
    html = html + "<div class='esya-detay-satir'>" + bonus + "</div>";
  }

  // --- Kuşanma şartı ---
  if (item.slot) {
    let kusanabilir = itemKusanilabilirMi(item);
    if (kusanabilir === false) {
      html = html +
        "<div class='esya-detay-satir yetersiz'>🔒 Gerekli: " +
        eksikGereksinimYazisi(item) + "</div>";
    }
  }

  // --- Geçici bonus (ziyafet) ---
  if (item.bonus) {
    let etkiler = [];
    for (let i = 0; i < item.bonus.etkiler.length; i++) {
      let e = item.bonus.etkiler[i];
      etkiler.push(bonusIkonu(e.tur) + " +%" +
        Math.round(e.deger * 100) + " " + bonusAdi(e.tur));
    }
    html = html +
      "<div class='esya-detay-satir'>" + etkiler.join(" · ") + " · " +
      Math.round(item.bonus.sureMs / 60000) + " dk</div>";
  }

  // --- Satış değeri ---
  if (item.satisFiyati) {
    html = html +
      "<div class='esya-detay-satir'>Tanesi 🪙 " +
      Math.round(item.satisFiyati * satisCarpani()) + "</div>";
  }

  // --- İŞLEMLER ---
  html = html + "<div class='esya-islemler'>";

  // Kuşan
  if (item.slot && itemKusanilabilirMi(item)) {
    html = html +
      "<button class='esya-islem ana' onclick='ekipmanKusan(\"" +
      item.id + "\")'>Kuşan</button>";
  }

  // Ziyafet kullan
  if (item.bonus) {
    html = html +
      "<button class='esya-islem ana' onclick='ziyafetYe(\"" +
      item.id + "\")'>Kullan</button>";
  }

  // Sat
  if (item.satisFiyati) {
    html = html +
      "<button class='esya-islem' onclick='sat(\"" + item.id + "\", 1)'>" +
      "Sat 1</button>" +
      "<button class='esya-islem' onclick='satSor(\"" + item.id + "\")'>" +
      "Sat…</button>";
  }

  // Clan deposuna koy
  if (clanVarMi()) {
    html = html +
      "<button class='esya-islem' onclick='depoyaKoySor(\"" +
      item.id + "\")'>Depoya</button>";
  }

  // Sekme ikonu yap
  html = html +
    "<button class='esya-islem' onclick='ikonIcinSec(\"" + item.id + "\")'>" +
    "Sekme ikonu</button>";

  html = html + "</div>";

  // --- Sekme değiştirici ---
  if (state.envanterSekmeleri.length > 1) {
    let secenekler = "";
    let kayitSekmesi = "genel";

    for (let i = 0; i < state.envanter.length; i++) {
      if (state.envanter[i].itemId === item.id) {
        kayitSekmesi = state.envanter[i].sekmeId ?
          state.envanter[i].sekmeId : "genel";
        break;
      }
    }

    for (let s = 0; s < state.envanterSekmeleri.length; s++) {
      let sekme = state.envanterSekmeleri[s];
      secenekler = secenekler +
        "<option value='" + sekme.id + "'" +
        (kayitSekmesi === sekme.id ? " selected" : "") + ">" +
        sekme.ikon + " " + sekme.isim + "</option>";
    }

    html = html +
      "<div class='esya-detay-satir'>Sekme: " +
      "<select class='sekme-secici' onchange='itemSekmeDegistir(\"" +
      item.id + "\", this.value)'>" + secenekler + "</select></div>";
  }

  return html + "</div>";
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
    "<span class='xp-detay'>" + kullanilan + " / " + kapasite +
    " çeşit</span>" +
    "</div>" +
    "<div class='ilerleme'><div class='ilerleme-dolu " +
    (doluluk >= 100 ? "kirmizi" : (doluluk >= 80 ? "altin" : "yesil")) +
    "' style='width:" + Math.min(doluluk, 100) + "%'></div></div>" +
    "<div class='xp-alt'>Kapasite eşya <em>çeşidini</em> sayar — " +
    "aynı eşyadan kaç tane olduğu önemli değil.</div>" +
    "</div>";

  // --- İkon seçimi aktifse yönlendirme ---
  let ikonSeciliyor = state.tasinanItemId !== null;

  if (ikonSeciliyor) {
    let secilenItem = itemBul(state.tasinanItemId);
    html = html +
      "<div class='kart aktif-kart'><span class='aksiyon-bilgi'>" +
      "<strong>" + (secilenItem !== null ? secilenItem.ikon : "") +
      " ikon olarak seçildi</strong>" +
      "<span class='alt-bilgi'>Şimdi bir sekmeye dokun. " +
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
    state.envanterSekmeleri.length < maxSekmeSayisi();

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
    "<div class='sekme-sayaci'>Sekme: " +
    state.envanterSekmeleri.length + " / " + maxSekmeSayisi() + "</div>";

  // --- Sekme silme (Genel hariç) ---
  if (state.acikEnvanterSekmesi !== "genel") {
    html = html +
      "<div class='kart'>" +
      "<span class='aksiyon-bilgi'><span class='alt-bilgi'>" +
      "Bu sekmeyi silersen içindeki eşyalar Genel'e taşınır." +
      "</span></span>" +
      "<button onclick='envanterSekmesiSil(\"" +
      state.acikEnvanterSekmesi + "\")'>Sekmeyi Sil</button>" +
      "</div>";
  }

  // --- Seçili eşyanın detayı ---
  html = html + esyaDetayHtml();

  // --- EŞYA IZGARASI ---
  let liste = envanterSirali(state.acikEnvanterSekmesi);

  if (liste.length === 0) {
    html = html +
      "<div class='bos-durum'>" +
      "<div class='bos-durum-ikon'>🎒</div>" +
      "<div class='bos-durum-yazi'>Bu sekme boş</div>" +
      "<div class='bos-durum-alt'>Eşyaları sekmelere ayırmak için " +
      "bir eşyaya tıkla</div></div>";
    icerikAlani.innerHTML = html;
    return;
  }

  html = html + "<div class='esya-izgara'>";

  for (let i = 0; i < liste.length; i++) {
    let kayit = liste[i];
    let item = kayit.item;
    let secili = state.secilenEnvanterItemId === item.id;
    let ikonSecili = state.tasinanItemId === item.id;

    // Kuşanılabilir ama seviye yetmiyorsa işaretle
    let kilitli = item.slot && itemKusanilabilirMi(item) === false;

    // Miktarı kısalt: 1250 -> 1.2B
    let adetYazi = kayit.miktar.toString();
    if (kayit.miktar >= 10000) {
      adetYazi = (kayit.miktar / 1000).toFixed(0) + "B";
    } else if (kayit.miktar >= 1000) {
      adetYazi = (kayit.miktar / 1000).toFixed(1) + "B";
    }

    html = html +
      "<div class='esya-hucre" +
      (secili ? " secili" : "") +
      (ikonSecili ? " ikon-secili" : "") +
      (kilitli ? " kilitli" : "") + "' " +
      "draggable='true' " +
      "ondragstart='ikonSurukleBasla(event, \"" + item.id + "\")' " +
      "ondragend='ikonSurukleBitti()' " +
      "onclick='envanterEsyaSec(\"" + item.id + "\")' " +
      "title='" + item.isim + "'>" +
      "<span class='esya-hucre-ikon'>" + item.ikon + "</span>" +
      "<span class='esya-hucre-adet'>" + adetYazi + "</span>" +
      (kilitli ? "<span class='esya-hucre-kilit'>🔒</span>" : "") +
      "</div>";
  }

  html = html + "</div>";

  icerikAlani.innerHTML = html;
}

// ---------- KADEME NOKTALARI ----------
// Bir yükseltmenin kaç kademesi alındığını gösteren nokta dizisi.
// Hem alet hem dükkân yükseltmeleri için kullanılıyor.
function kademeNoktalariHtml(mevcut, toplam) {
  let html = "<span class='kademe-noktalar'>";

  for (let k = 0; k < toplam; k++) {
    html = html +
      "<span class='kademe-nokta" + (k < mevcut ? " dolu" : "") + "'></span>";
  }

  return html + "</span>";
}


// ---------- TEK BİR ALET KARTI ----------
function aletKutusuHtml(alet) {
  let mevcutKademe = aletKademesi(alet.id);
  let mevcut = aletKademeBilgisi(mevcutKademe);
  let sonraki = aletKademeBilgisi(mevcutKademe + 1);

  let skill = skillBul(alet.skillId);
  let skillAdi = skill !== null ? skill.isim : "";
  let skillRenk = (skill !== null && skill.renk) ? skill.renk : "#6c8cff";

  let toplamKademe = 6;

  // --- En üst kademe ---
  if (sonraki === null || sonraki.kademe === mevcutKademe) {
    return "<div class='magaza-kutu tamam' " +
      "style='--kutu-renk:" + skillRenk + "'>" +
      "<div class='magaza-ic'>" +
      "<div class='magaza-ust'>" + skillAdi + "</div>" +
      "<div class='magaza-gorsel'>" + alet.ikon + "</div>" +
      "<div class='magaza-ad'>" + mevcut.isim + " " + alet.isim + "</div>" +
      kademeNoktalariHtml(mevcutKademe, toplamKademe) +
      "<div class='magaza-satir yeterli'>⭐ En üst kademe</div>" +
      "<div class='magaza-satir'>%" +
      Math.round(mevcut.ciftUrunSansi * 100) + " çift ürün</div>" +
      "</div></div>";
  }

  let seviyeYeterli = skillSeviyesi(alet.skillId) >= sonraki.gerekliSeviye;
  let altinYeterli = state.altin >= sonraki.fiyat;
  let alinabilir = seviyeYeterli && altinYeterli;

  let html = "<div class='magaza-kutu" +
    (alinabilir ? " alinabilir" : "") + "' " +
    "style='--kutu-renk:" + skillRenk + "'>" +
    "<div class='magaza-ic'>" +
    "<div class='magaza-ust'>" + skillAdi + "</div>" +
    "<div class='magaza-gorsel'>" + alet.ikon + "</div>" +
    "<div class='magaza-ad'>" + mevcut.isim + " " + alet.isim + "</div>" +
    kademeNoktalariHtml(mevcutKademe, toplamKademe) +
    "<div class='magaza-satir'>Şu an %" +
    Math.round(mevcut.ciftUrunSansi * 100) + " çift ürün</div>" +
    "<div class='magaza-satir vurgu'>→ " + sonraki.isim + ": %" +
    Math.round(sonraki.ciftUrunSansi * 100) + "</div>";

  if (seviyeYeterli === false) {
    html = html +
      "<div class='magaza-satir yetersiz'>🔒 " + skillAdi + " " +
      sonraki.gerekliSeviye + "</div>";
  }

  html = html + "</div>";

  html = html +
    "<button class='magaza-buton' onclick='aletYukselt(\"" +
    alet.id + "\")'" + (alinabilir ? "" : " disabled") + ">" +
    "🪙 " + sonraki.fiyat.toLocaleString() +
    "</button>";

  return html + "</div>";
}


// ---------- DÜKKÂN EKRANI ----------

function dukkanEkraniCiz() {
  let html = sayfaBasligi("shop", "🏪 Dükkân");

  // --- Altın göstergesi ---
  html = html +
    "<div class='altin-panel'>" +
    "<span class='altin-ikon'>🪙</span>" +
    "<span class='altin-miktar'>" + state.altin.toLocaleString() + "</span>" +
    "<span class='altin-etiket'>altın</span>" +
    "</div>";

  // ===================== ALETLER =====================
  html = html + "<div class='kademe-baslik'>🔧 Aletler</div>";

  html = html +
    "<div class='kart'><span class='alt-bilgi'>" +
    "Aletler hız vermez — üst kademe aksiyonları açar ve " +
    "çift ürün şansı kazandırır." +
    "</span></div>";

  html = html + "<div class='magaza-izgara'>";

  for (let i = 0; i < aletTurleri.length; i++) {
    html = html + aletKutusuHtml(aletTurleri[i]);
  }

  html = html + "</div>";

  // ============ KALICI YÜKSELTMELER ============
  html = html + "<div class='kademe-baslik'>⚙️ Kalıcı Yükseltmeler</div>";

  html = html +
    "<div class='kart'><span class='alt-bilgi'>" +
    "Bir kez alınır, kalıcıdır. Clan yükseltmeleriyle çakışmaz — " +
    "ikisi farklı şeyler verir." +
    "</span></div>";

  html = html + "<div class='magaza-izgara'>";

  for (let i = 0; i < dukkanYukseltmeleri.length; i++) {
    let dal = dukkanYukseltmeleri[i];
    let kademe = dukkanKademesi(dal.id);
    let sonMu = kademe >= dal.kademeler.length;

    if (sonMu) {
      html = html +
        "<div class='magaza-kutu tamam' style='--kutu-renk:#c9a227'>" +
        "<div class='magaza-ic'>" +
        "<div class='magaza-ust'>Tamamlandı</div>" +
        "<div class='magaza-gorsel'>" + dal.ikon + "</div>" +
        "<div class='magaza-ad'>" + dal.isim + "</div>" +
        kademeNoktalariHtml(kademe, dal.kademeler.length) +
        "<div class='magaza-satir yeterli'>⭐ " +
        dal.kademeler[kademe - 1].metin + "</div>" +
        "</div></div>";
      continue;
    }

    let sonraki = dal.kademeler[kademe];
    let alinabilir = state.altin >= sonraki.fiyat;

    html = html +
      "<div class='magaza-kutu" + (alinabilir ? " alinabilir" : "") + "' " +
      "style='--kutu-renk:#6c8cff'>" +
      "<div class='magaza-ic'>" +
      "<div class='magaza-ust'>" + (kademe + 1) + ". kademe</div>" +
      "<div class='magaza-gorsel'>" + dal.ikon + "</div>" +
      "<div class='magaza-ad'>" + dal.isim + "</div>" +
      kademeNoktalariHtml(kademe, dal.kademeler.length) +
      (kademe > 0
        ? "<div class='magaza-satir yeterli'>Şu an: " +
          dal.kademeler[kademe - 1].metin + "</div>"
        : "<div class='magaza-satir'>" + dal.aciklama + "</div>") +
      "<div class='magaza-satir vurgu'>→ " + sonraki.metin + "</div>" +
      "</div>" +
      "<button class='magaza-buton' onclick='dukkanYukseltmeAl(\"" +
      dal.id + "\")'" + (alinabilir ? "" : " disabled") + ">" +
      "🪙 " + sonraki.fiyat.toLocaleString() +
      "</button>" +
      "</div>";
  }

  html = html + "</div>";

  // ===================== SATIN AL =====================
  html = html + "<div class='kademe-baslik'>🛒 Satın Al</div>";
  html = html + "<div class='magaza-izgara'>";

  for (let i = 0; i < dukkanUrunleri.length; i++) {
    let urun = dukkanUrunleri[i];
    let item = itemBul(urun.itemId);
    if (item === null) {
      continue;
    }

    let alabilirMi = state.altin >= urun.fiyat;
    let renk = itemRengi(item);

    let bonuslar = [];
    if (item.saldiriBonusu) bonuslar.push("💥 +" + item.saldiriBonusu);
    if (item.isabetBonusu) bonuslar.push("🎯 +" + item.isabetBonusu);
    if (item.savunmaBonusu) bonuslar.push("🛡️ +" + item.savunmaBonusu);
    if (item.iyilestirme) bonuslar.push("❤️ +" + item.iyilestirme);

    html = html +
      "<div class='magaza-kutu" + (alabilirMi ? " alinabilir" : "") + "' " +
      "style='--kutu-renk:" + (renk !== null ? renk : "#6a7080") + "'>" +
      "<div class='magaza-ic'>" +
      "<div class='magaza-ust'>Elinde " +
      envanterdekiMiktar(urun.itemId) + "</div>" +
      "<div class='magaza-gorsel'>" + item.ikon + "</div>" +
      "<div class='magaza-ad'>" + item.isim + "</div>" +
      (bonuslar.length > 0
        ? "<div class='magaza-satir'>" + bonuslar.join(" · ") + "</div>"
        : "") +
      "</div>" +
      "<button class='magaza-buton' onclick='satinAl(\"" +
      urun.itemId + "\")'" + (alabilirMi ? "" : " disabled") + ">" +
      "🪙 " + urun.fiyat.toLocaleString() +
      "</button>" +
      "</div>";
  }

  html = html + "</div>";

  // ===================== SAT =====================
  html = html + "<div class='kademe-baslik'>💰 Sat</div>";

  let satilabilir = [];

  for (let i = 0; i < state.envanter.length; i++) {
    let kayit = state.envanter[i];
    if (kayit.miktar < 1) {
      continue;
    }

    let item = itemBul(kayit.itemId);
    if (item === null || !item.satisFiyati) {
      continue;
    }

    satilabilir.push({ item: item, miktar: kayit.miktar });
  }

  if (satilabilir.length === 0) {
    html = html +
      "<div class='bos-durum'>" +
      "<div class='bos-durum-ikon'>💰</div>" +
      "<div class='bos-durum-yazi'>Satacak bir şeyin yok</div>" +
      "<div class='bos-durum-alt'>Toplama yaparak veya savaşarak " +
      "eşya biriktir</div>" +
      "</div>";
  } else {
    html = html + "<div class='magaza-izgara'>";

    for (let i = 0; i < satilabilir.length; i++) {
      let item = satilabilir[i].item;
      let miktar = satilabilir[i].miktar;
      let birim = Math.round(item.satisFiyati * satisCarpani());
      let renk = itemRengi(item);

      html = html +
        "<div class='magaza-kutu satilik' " +
        "style='--kutu-renk:" + (renk !== null ? renk : "#8a7a4a") + "'>" +
        "<div class='magaza-ic'>" +
        "<div class='magaza-ust'>×" + miktar.toLocaleString() + "</div>" +
        "<div class='magaza-gorsel'>" + item.ikon + "</div>" +
        "<div class='magaza-ad'>" + item.isim + "</div>" +
        "<div class='magaza-satir'>Tanesi 🪙 " + birim + "</div>" +
        "<div class='magaza-satir vurgu'>Tümü 🪙 " +
        (birim * miktar).toLocaleString() + "</div>" +
        "</div>" +
        "<div class='magaza-sat-butonlar'>" +
        "<button class='magaza-sat' onclick='sat(\"" +
        item.id + "\", 1)'>1</button>" +
        (miktar >= 10
          ? "<button class='magaza-sat' onclick='sat(\"" +
            item.id + "\", 10)'>10</button>"
          : "") +
        "<button class='magaza-sat' onclick='satSor(\"" +
        item.id + "\")'>…</button>" +
        "<button class='magaza-sat tumu' onclick='sat(\"" +
        item.id + "\", " + miktar + ")'>Tümü</button>" +
        "</div>" +
        "</div>";
    }

    html = html + "</div>";
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
    "<div class='profil-bilgi'>" +
    "<div class='profil-ad'>" + state.oyuncuAdi + "</div>" +
    "<div class='profil-alt'>Toplam Seviye " + toplamSeviye +
    " · " + toplamXp.toLocaleString() + " XP</div>" +
    "</div>" +
    "<div class='profil-bolme'>" +
    "<span class='profil-bolme-etiket'>Bölme</span>" +
    "<span class='profil-bolme-deger'>" + aktifSlotAl() + "</span>" +
    "</div>" +
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

function clanZamanMetni(ms) {
  let dk = Math.floor((Date.now() - ms) / 60000);
  if (dk < 1) return "az önce";
  if (dk < 60) return dk + " dk önce";
  let saat = Math.floor(dk / 60);
  if (saat < 24) return saat + " saat önce";
  return Math.floor(saat / 24) + " gün önce";
}

function clanEkraniCiz() {
  let html = sayfaBasligi("clan", "🛡️ Clan");

  // --- Clan yoksa kurulum ekranı ---
  if (clanVarMi() === false) {
    html = html +
      "<div class='kart'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>Henüz bir clanın yok</strong>" +
      "<span class='alt-bilgi'>Aktivite yaparken düşen Clan Nişanlarını " +
      "bağışlayarak clan seviyeni yükseltir, kazandığın puanlarla " +
      "kalıcı yükseltmeler açarsın.</span>" +
      "</span>" +
      "<button onclick='clanKur()'>Clan Kur</button>" +
      "</div>";

    html = html + "<div class='baslik'>Yükseltme Dalları</div>";

    for (let i = 0; i < clanDallari.length; i++) {
      let dal = clanDallari[i];
      html = html +
        "<div class='kart kilitli'>" +
        "<span class='aksiyon-bilgi'>" +
        "<strong>" + dal.ikon + " " + dal.isim + "</strong>" +
        "<span class='alt-bilgi'>" + dal.aciklama + "</span>" +
        "</span>" +
        "<span class='deger'>" + dal.kademeler.length + " kademe</span>" +
        "</div>";
    }

    icerikAlani.innerHTML = html;
    return;
  }

  let clan = state.clan;
  let bilgi = clanSeviyeBilgisi();

  // --- Başlık kartı ---
  html = html +
    "<div class='clan-karti'>" +
    "<div class='clan-amblem'>" + clan.amblem + "</div>" +
    "<div class='clan-bilgi'>" +
    "<div class='clan-ad'>" + clan.isim + "</div>" +
    "<div class='clan-alt'>Seviye " + bilgi.seviye + " · " +
    clan.uyeler.length + " üye · kuruluş " +
    clanZamanMetni(clan.kurulusTarihi) + "</div>" +
    "</div>" +
    "</div>";

  // --- Seviye çubuğu ---
  html = html +
    "<div class='xp-panel'>" +
    "<div class='xp-ust'>" +
    "<span class='xp-seviye'>Clan Seviyesi " + bilgi.seviye + "</span>" +
    "<span class='xp-detay'>" +
    (bilgi.maxMi ? "MAX" :
      bilgi.kazanilan.toLocaleString() + " / " + bilgi.gereken.toLocaleString()) +
    "</span></div>" +
    "<div class='ilerleme'><div class='ilerleme-dolu altin' style='width:" +
    bilgi.yuzde + "%'></div></div>" +
    "<div class='xp-alt'>Toplam " + clan.puan.toLocaleString() +
    " puan bağışlandı · her seviye 1 yükseltme puanı verir</div>" +
    "</div>";

  // --- Bağış ---
  html = html + "<div class='baslik'>🎖️ Bağış</div>";

  html = html +
    "<div class='nisan-karti'>" +
    "<div class='nisan-ikon'>🎖️</div>" +
    "<div class='nisan-bilgi'>" +
    "<div class='nisan-adet'>" + state.clanNisani.toLocaleString() + "</div>" +
    "<div class='nisan-alt'>Clan Nişanı · tanesi " +
    nisanPuaniDegeri() + " puan</div>" +
    "</div>" +
    (state.clanNisani > 0
      ? "<button onclick='nisanBagisla(" + state.clanNisani + ")'>Hepsini Ver</button>"
      : "") +
    "</div>";

  if (state.clanNisani < 1) {
    html = html +
      "<div class='kart'><span class='alt-bilgi'>" +
      "Nişanlar toplama, üretim ve savaş yaparken şansa bağlı düşer — " +
      "savaşta daha sık." +
      "</span></div>";
  }

  // --- Yükseltme ağacı ---
  let kalan = clanKalanPuan();

  html = html +
    "<div class='kademe-baslik'>⚙️ Yükseltmeler</div>" +
    "<div class='puan-satiri'>Harcanabilir puan: <strong>" + kalan +
    "</strong> / " + clanToplamPuan() + "</div>";

  html = html + "<div class='magaza-izgara'>";

  for (let i = 0; i < clanDallari.length; i++) {
    let dal = clanDallari[i];
    let kademe = clanDalKademesi(dal.id);
    let sonMu = kademe >= dal.kademeler.length;

    // Kademe göstergesi (dolu/boş noktalar)
    let noktalar = "";
    for (let k = 0; k < dal.kademeler.length; k++) {
      noktalar = noktalar +
        "<span class='kademe-nokta" + (k < kademe ? " dolu" : "") + "'></span>";
    }

    let durumYazisi;
    let buton = "";

    if (sonMu) {
      durumYazisi = "<div class='magaza-satir yeterli'>⭐ " +
        dal.kademeler[kademe - 1].metin + "</div>";
    } else {
      let sonraki = dal.kademeler[kademe];
      durumYazisi =
        (kademe > 0
          ? "<div class='magaza-satir yeterli'>Şu an: " +
            dal.kademeler[kademe - 1].metin + "</div>"
          : "<div class='magaza-satir'>" + dal.aciklama + "</div>") +
        "<div class='magaza-satir vurgu'>→ " + sonraki.metin + "</div>";

      let alinabilir = kalan >= sonraki.maliyet;
      buton =
        "<button class='magaza-buton' onclick='clanYukseltmeAl(\"" +
        dal.id + "\")'" + (alinabilir ? "" : " disabled") + ">" +
        "⚙️ " + sonraki.maliyet + " puan</button>";
    }

    html = html +
      "<div class='magaza-kutu" + (sonMu ? " tamam" : "") +
      (sonMu === false && kalan >= dal.kademeler[kademe].maliyet
        ? " alinabilir" : "") + "' " +
      "style='--kutu-renk:#b07cff'>" +
      "<div class='magaza-ic'>" +
      "<div class='magaza-ust'>" +
      (sonMu ? "Tamamlandı" : (kademe + 1) + ". kademe") + "</div>" +
      "<div class='magaza-gorsel'>" + dal.ikon + "</div>" +
      "<div class='magaza-ad'>" + dal.isim + "</div>" +
      "<span class='kademe-noktalar'>" + noktalar + "</span>" +
      durumYazisi +
      "</div>" + buton +
      "</div>";
  }

  html = html + "</div>";

  // --- Clan deposu ---
  let depoKullanilan = clanDepoKullanilan();
  let depoKap = clanDepoKapasitesi();

  html = html +
    "<div class='baslik'>📦 Clan Deposu</div>" +
    "<div class='kart'><span class='alt-bilgi'>" +
    "Depoya koyduğun eşyalar kaybolmaz, istediğin zaman geri alırsın. " +
    "Envanterin dolduğunda taşma alanı olarak kullanabilirsin." +
    "</span><span class='deger'>" + depoKullanilan + " / " + depoKap + "</span></div>";

  if (clan.depo && clan.depo.length > 0) {
    for (let i = 0; i < clan.depo.length; i++) {
      let kayit = clan.depo[i];
      if (kayit.miktar < 1) {
        continue;
      }

      let item = itemBul(kayit.itemId);
      if (item === null) {
        continue;
      }

      html = html +
        "<div class='kart'>" +
        "<span class='aksiyon-bilgi'>" +
        "<strong>" + item.ikon + " " + item.isim + "</strong>" +
        "<span class='alt-bilgi'>Depoda: " + kayit.miktar + "</span>" +
        "</span>" +
        "<button onclick='depodanAl(\"" + kayit.itemId + "\", 1)'>1</button>" +
        (kayit.miktar >= 10
          ? "<button onclick='depodanAl(\"" + kayit.itemId + "\", 10)'>10</button>"
          : "") +
        "<button onclick='depodanAlSor(\"" + kayit.itemId + "\")'>Miktar…</button>" +
        "<button onclick='depodanAl(\"" + kayit.itemId + "\", " +
        kayit.miktar + ")'>Hepsi</button>" +
        "</div>";
    }
  } else {
    html = html +
      "<div class='bos-durum'>" +
      "<div class='bos-durum-ikon'>📦</div>" +
      "<div class='bos-durum-yazi'>Depo boş</div>" +
      "<div class='bos-durum-alt'>Envanterinden eşya koyabilirsin — " +
      "kaybolmaz, geri alınır</div></div>";
  }

  // Envanterden depoya koyma
  let envListe = envanterSirali(null);
  if (envListe.length > 0) {
    html = html + "<div class='baslik'>Depoya Koy</div>";

    for (let i = 0; i < envListe.length; i++) {
      let kayit = envListe[i];

      html = html +
        "<div class='kart'>" +
        "<span class='aksiyon-bilgi'>" +
        "<strong>" + kayit.item.ikon + " " + kayit.item.isim + "</strong>" +
        "<span class='alt-bilgi'>Envanterde: " + kayit.miktar + "</span>" +
        "</span>" +
        "<button onclick='depoyaKoy(\"" + kayit.item.id + "\", 1)'>1</button>" +
        (kayit.miktar >= 10
          ? "<button onclick='depoyaKoy(\"" + kayit.item.id + "\", 10)'>10</button>"
          : "") +
        "<button onclick='depoyaKoySor(\"" + kayit.item.id + "\")'>Miktar…</button>" +
        "<button onclick='depoyaKoy(\"" + kayit.item.id + "\", " +
        kayit.miktar + ")'>Hepsi</button>" +
        "</div>";
    }
  }

  // --- Üyeler ---
  html = html + "<div class='baslik'>👥 Üyeler</div>";

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
    "🌐 Çevrimiçi özellikler henüz hazır değil. Sunucu geldiğinde " +
    "arkadaşların katılabilecek ve birlikte bağış yapabileceksiniz." +
    "</span></div>";

  // --- Günlük ---
  if (clan.gunluk && clan.gunluk.length > 0) {
    html = html + "<div class='baslik'>📜 Clan Günlüğü</div><div class='savas-log'>";

    for (let i = 0; i < clan.gunluk.length; i++) {
      let kayit = clan.gunluk[i];
      html = html +
        "<div class='log-satir'>" + kayit.metin +
        "<span class='log-zaman'>" + clanZamanMetni(kayit.zaman) + "</span>" +
        "</div>";
    }

    html = html + "</div>";
  }

  // --- Amblem ---
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
    "<span class='alt-bilgi'>Seviye, yükseltmeler ve depodaki eşyalar silinir. " +
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

// ---------- KRONİK EKRANI ----------
 
function kronikEkraniCiz() {
  let html = sayfaBasligi("chronicle", "📖 Kronik");
 
  let acilan = acilanKronikSayisi();
  let toplam = kronikKayitlari.length;
 
  html = html +
    "<div class='xp-panel'>" +
    "<div class='xp-ust'>" +
    "<span class='xp-seviye'>Keşfedilen</span>" +
    "<span class='xp-detay'>" + acilan + " / " + toplam + "</span>" +
    "</div>" +
    "<div class='ilerleme'><div class='ilerleme-dolu altin' style='width:" +
    (acilan / toplam) * 100 + "%'></div></div>" +
    "<div class='xp-alt'>Oynarken dünya hakkında yeni şeyler öğrenirsin. " +
    "Kayıtlara tıklayarak tekrar okuyabilirsin.</div>" +
    "</div>";
 
  for (let i = 0; i < kronikKayitlari.length; i++) {
    let k = kronikKayitlari[i];
    let acikMi = kronikAcikMi(k.id);
 
    if (acikMi === false) {
      html = html +
        "<div class='kart kilitli'>" +
        "<span class='aksiyon-bilgi'>" +
        "<strong>🔒 ???</strong>" +
        "<span class='alt-bilgi'>Henüz keşfedilmedi</span>" +
        "</span></div>";
      continue;
    }
 
    // Metnin ilk satırını önizleme olarak göster
    let onizleme = k.metin.split("\n")[0];
    if (onizleme.length > 70) {
      onizleme = onizleme.substring(0, 70) + "…";
    }
 
    html = html +
      "<div class='kart kronik-kart' onclick='kronikOku(\"" + k.id + "\")'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>" + k.ikon + " " + k.baslik + "</strong>" +
      "<span class='alt-bilgi'>" + onizleme + "</span>" +
      "</span>" +
      "<span class='deger'>›</span>" +
      "</div>";
  }
 
  icerikAlani.innerHTML = html;
}

// ---------- AYARLAR EKRANI ----------

function ayarlarEkraniCiz() {
  let html = sayfaBasligi("settings", "⚙️ Ayarlar");
  
  html = html + "<div class='baslik'>🎵 Müzik</div>";

  html = html +
    "<div class='kart'>" +
    "<span class='aksiyon-bilgi'><strong>Arka Plan Müziği</strong>" +
    "<span class='alt-bilgi'>Menüde ve oyun içinde farklı parçalar çalar. " +
    "Bu ayar cihaza aittir, karaktere göre değişmez.</span></span>" +
    "<button onclick='muzikAcKapatBtn()'>" +
    (muzikAcikMi() ? "AÇIK" : "KAPALI") +
    "</button></div>";

  if (muzikAcikMi()) {
    html = html +
      "<div class='kart'>" +
      "<span class='aksiyon-bilgi'><strong>Müzik Seviyesi</strong>" +
      "<span class='alt-bilgi'>Ses efektlerinden bağımsız</span></span>" +
      "<button onclick='muzikDinle()'>Dinle</button>" +
      "<div class='esik-satiri'>" +
      "<input type='range' min='0' max='100' step='5' value='" +
      Math.round(muzikSeviyesiAl() * 100) + "' " +
      "oninput='muzikSeviyesiDegistir(this.value)'>" +
      "<span class='esik-deger' id='muzik-deger'>%" +
      Math.round(muzikSeviyesiAl() * 100) + "</span>" +
      "</div></div>";
  }

  html = html + "<div class='baslik'>🔊 Ses</div>";

  html = html +
    "<div class='kart'>" +
    "<span class='aksiyon-bilgi'><strong>Ses Efektleri</strong>" +
    "<span class='alt-bilgi'>Vuruş, seviye atlama, loot ve alışveriş " +
    "sesleri</span></span>" +
    "<button onclick='sesAcKapat()'>" +
    (state.sesAcik ? "AÇIK" : "KAPALI") +
    "</button></div>";

  if (state.sesAcik) {
    html = html +
      "<div class='kart'>" +
      "<span class='aksiyon-bilgi'><strong>Aksiyon Sesi</strong>" +
      "<span class='alt-bilgi'>Her toplama/üretim tamamlandığında kısa bir ton. " +
      "Uzun seanslarda rahatsız edici olabilir.</span></span>" +
      "<button onclick='aksiyonSesiDegistir()'>" +
      (state.aksiyonSesi ? "AÇIK" : "KAPALI") +
      "</button></div>";

    html = html +
      "<div class='kart'>" +
      "<span class='aksiyon-bilgi'><strong>Ses Seviyesi</strong>" +
      "<span class='alt-bilgi'>Örnek dinlemek için butona bas</span></span>" +
      "<button onclick='sesOrnekCal()'>Dinle</button>" +
      "<div class='esik-satiri'>" +
      "<input type='range' min='0' max='100' step='5' value='" +
      Math.round(state.sesSeviyesi * 100) + "' " +
      "oninput='sesSeviyesiDegistir(this.value)'>" +
      "<span class='esik-deger' id='ses-deger'>%" +
      Math.round(state.sesSeviyesi * 100) + "</span>" +
      "</div></div>";
  }

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

  if (state.acikSekme === "chronicle") {
    kronikEkraniCiz();
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

// Aktif bonusları gösteren şerit. Bonus yoksa hiç çizilmez.
function bonusSeridiHtml() {
  let liste = aktifBonusListesi();
 
  if (liste.length === 0) {
    return "";
  }
 
  let html = "<div class='bonus-serit'>";
 
  for (let i = 0; i < liste.length; i++) {
    let b = liste[i];
    let kalanSn = Math.max(0, Math.round((b.bitis - Date.now()) / 1000));
    let dk = Math.floor(kalanSn / 60);
    let sn = kalanSn % 60;
 
    html = html +
      "<span class='bonus-rozet' title='" + b.kaynak + "'>" +
      bonusIkonu(b.tur) + " +%" + Math.round(b.deger * 100) + " " +
      bonusAdi(b.tur) +
      "<span class='bonus-sure' data-bitis='" + b.bitis + "'>" +
      dk + ":" + (sn < 10 ? "0" : "") + sn +
      "</span></span>";
  }
 
  return html + "</div>";
}

function ustCubukCiz() {
  let alan = document.getElementById("ust-cubuk");
  if (alan === null) {
    return;
  }
 
  let can = state.oyuncuHp;
  let maxCan = toplamMaxHp();
 
  // Yazı logosu. Resim yüklenemezse (dosya eksikse) alt metin
  // devreye girer — oyun yine de çalışır.
  let html =
    "<span class='ust-marka'>" +
    "<img src='logo-yazi.png' alt='EVERFORGE' class='ust-logo'>" +
    "</span>";
 
  html = html +
    "<span class='ust-rozet can'>❤️ " + can + " / " + maxCan + "</span>";
 
  html = html +
    "<span class='ust-rozet altin'>🪙 <span class='sayan' " +
    "id='ust-altin'>" + state.altin.toLocaleString() + "</span></span>";
 
  if (state.clanNisani > 0) {
    html = html +
      "<span class='ust-rozet nisan'>🎖️ " +
      state.clanNisani.toLocaleString() + "</span>";
  }
 
  html = html +
    "<span class='ust-rozet'><span class='ust-rozet-etiket'>Savaş</span> " +
    savasSeviyesi() + "</span>";
 
  alan.innerHTML = html;

  // Altın sıçramak yerine sayarak değişsin
  sayiAnimasyonu("ust-altin", state.altin);
}

export function tumEkraniCiz() {
  ustCubukCiz();
  menuCiz();
  icerikCiz();
 
  // Bonus şeridi içeriğin en üstüne eklenir
  let serit = bonusSeridiHtml();
  if (serit !== "") {
    icerikAlani.innerHTML = serit + icerikAlani.innerHTML;
  }
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
  
  // Bonus sürelerini güncelle
  let sureler = document.querySelectorAll(".bonus-sure");
  for (let i = 0; i < sureler.length; i++) {
    let bitis = parseInt(sureler[i].getAttribute("data-bitis"));
    let kalan = Math.max(0, Math.round((bitis - Date.now()) / 1000));
    let dk = Math.floor(kalan / 60);
    let sn = kalan % 60;
    sureler[i].textContent = dk + ":" + (sn < 10 ? "0" : "") + sn;
  }

}

// ============================================================
// SAYAN SAYILAR
//
// Altın 500'den 3500'e sıçramak yerine sayarak artıyor.
// Küçük bir detay ama "pahalı oyun" hissi veriyor.
//
// Her sayı için son gösterilen değeri hatırlıyoruz; böylece
// tumEkraniCiz her çağrıldığında baştan saymıyor.
// ============================================================

let sonGosterilenler = {};

export function sayiAnimasyonu(elemanId, hedefDeger) {
  let el = document.getElementById(elemanId);
  if (el === null) {
    return;
  }

  let onceki = sonGosterilenler[elemanId];

  // İlk kez gösteriliyorsa animasyon yapma, doğrudan yaz
  if (onceki === undefined) {
    sonGosterilenler[elemanId] = hedefDeger;
    el.textContent = hedefDeger.toLocaleString();
    return;
  }

  if (onceki === hedefDeger) {
    el.textContent = hedefDeger.toLocaleString();
    return;
  }

  // Fark çok küçükse veya çok büyükse animasyon yapma
  let fark = hedefDeger - onceki;
  if (Math.abs(fark) < 2 || Math.abs(fark) > 1000000) {
    sonGosterilenler[elemanId] = hedefDeger;
    el.textContent = hedefDeger.toLocaleString();
    return;
  }

  sonGosterilenler[elemanId] = hedefDeger;

  el.className = el.className.replace(/ (artiyor|azaliyor)/g, "");
  el.className = el.className + (fark > 0 ? " artiyor" : " azaliyor");

  let adimSayisi = 18;
  let adim = 0;

  let zamanlayici = setInterval(function () {
    adim = adim + 1;

    // Yumuşak yavaşlama: sona doğru adımlar küçülür
    let oran = 1 - Math.pow(1 - adim / adimSayisi, 3);
    let deger = Math.round(onceki + fark * oran);

    el.textContent = deger.toLocaleString();

    if (adim >= adimSayisi) {
      clearInterval(zamanlayici);
      el.textContent = hedefDeger.toLocaleString();
      el.className = el.className.replace(/ (artiyor|azaliyor)/g, "");
    }
  }, 28);
}
