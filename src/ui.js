import { skills, savasStilleri } from "./data/skills.js";
import { items } from "./data/items.js";
import { actions } from "./data/actions.js";
import { monsters } from "./data/monsters.js";
import { slotDuzeni } from "./data/slots.js";
import { dukkanUrunleri } from "./data/shop.js";
import { yardimlar } from "./data/help.js";
import { state, CAN_YENILENME_MS } from "./state.js";
import {
  skillBul, itemBul, actionBul, slotBul,
  seviyeHesapla, seviyeBilgisi, skillSeviyesi,
  envanterdekiMiktar, envanterSirali, envanterKullanilan,
  toplamSaldiri, toplamMaxHp,
  isabetPuani, kacinmaPuani, hasarAzaltma,
  oyuncuIsabetSansi, canavarIsabetSansi,
  oyuncuSaldiriHizi, gelenHasar, savasSeviyesi, menzilliMi,
  aksiyonAcikMi, aksiyonSeviyeGerekli, girdilerYeterliMi,
  okluSilahMi, slotYiginMi, slotAdedi, slotItemi
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

  if (yardim.bolumler) {
    for (let i = 0; i < yardim.bolumler.length; i++) {
      let bolum = yardim.bolumler[i];
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

      let adetYazisi = "";
      if (slotYiginMi(state.secilenSlot)) {
        adetYazisi = "· elinde: " + elimdeki + " (hepsi takılır)";
      }

      html = html +
        "<div class='kart'><span class='aksiyon-bilgi'>" +
        "<strong>" + item.ikon + " " + item.isim + "</strong>" +
        "<span class='alt-bilgi'>" + bonusYazisi(item) + adetYazisi + "</span>" +
        "</span>" +
        "<button onclick='ekipmanKusan(\"" + item.id + "\")'>Kuşan</button></div>";
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
    state.envanterKapasitesi + "</span>" +
    "</div>";

  html = html +
    "<div class='menu-oge" + (state.acikSekme === "shop" ? " aktif" : "") + "' " +
    "onclick='sekmeAc(\"shop\")'>" +
    "<span class='menu-ikon'>🏪</span>" +
    "<span class='menu-isim'>Dükkân</span>" +
    "<span class='menu-seviye'>" + state.altin + "</span>" +
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
    "<span class='xp-detay'>" + bilgi.seviyedeKazanilan + " / " +
    bilgi.seviyedeGereken + " XP</span>" +
    "</div>" +
    "<div class='ilerleme'><div class='ilerleme-dolu altin' style='width:" +
    bilgi.yuzde + "%'></div></div>" +
    "<div class='xp-alt'>Toplam " + acikSkill.xp + " XP · Sonraki seviyeye " +
    bilgi.sonrakineKalan + " XP</div>" +
    "</div>";

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

    html = html +
      "<div class='kart " + (buAksiyonAktif ? "aktif-kart" : "") + "'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>" + action.isim + "</strong>" +
      "<span class='alt-bilgi'>Üretir: " + ciktiYazisi +
      " · " + (action.sureMs / 1000) + "sn · +" + action.xp + " XP" +
      stokYazisi + "</span>" +
      girdiYazisi +
      sansliYazisi +
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

    let benimIsabet = Math.round(oyuncuIsabetSansi(monster) * 100);
    let onunIsabet = Math.round(canavarIsabetSansi(monster) * 100);

    html = html +
      "<div class='kart " + (buCanavarAktif ? "aktif-kart" : "") + "'>" +
      "<span class='aksiyon-bilgi'>" +
      "<strong>" + monster.ikon + " " + monster.isim + "</strong>" +
      "<span class='alt-bilgi'>" +
      "Vurma şansın %" + benimIsabet +
      " · sana vurma şansı %" + onunIsabet +
      "</span>" +
      "<span class='alt-bilgi'>" +
      "Vuruşu " + gelenHasar(monster.saldiri) + " hasar · " +
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
  let kapasite = state.envanterKapasitesi;
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

  let acikSkill = skillBul(state.acikSekme);
  if (acikSkill !== null) {
    skillEkraniCiz(acikSkill);
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
      let yuzde = ((Date.now() - state.aksiyonBaslangicZamani) / action.sureMs) * 100;
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