import { skills } from "./data/skills.js";
import { items } from "./data/items.js";
import { actions } from "./data/actions.js";
import { monsters } from "./data/monsters.js";
import { ekipmanSlotlari } from "./data/slots.js";
import { state } from "./state.js";
import { bildirimGoster } from "./notify.js";
import { bolgeler } from "./data/regions.js";
import { canavarTipleri } from "./data/combatTypes.js";
import {
  clanSeviyeIcinPuan, MAX_CLAN_SEVIYESI, clanBonuslari,
  NISAN_PUANI, NISAN_SANSLARI
} from "./data/clan.js";
import { basarimlar } from "./data/achievements.js";
import { aletTurleri, aletKademeleri } from "./data/tools.js";
import { ustalikTaslari, MAX_HIZ_INDIRIMI } from "./data/mastery.js";

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

export function bolgeBul(bolgeId) {
  for (let i = 0; i < bolgeler.length; i++) {
    if (bolgeler[i].id === bolgeId) {
      return bolgeler[i];
    }
  }
  return null;
}

export function bolgeAcikMi(bolge) {
  return savasSeviyesi() >= bolge.gerekliSavasSeviyesi;
}

export function bolgeninCanavarlari(bolgeId) {
  let liste = [];
  for (let i = 0; i < monsters.length; i++) {
    if (monsters[i].bolgeId === bolgeId) {
      liste.push(monsters[i]);
    }
  }
  return liste;
}

// ---------- SAVAŞ ÜÇGENİ ----------

export function canavarTipiBul(tipId) {
  for (let i = 0; i < canavarTipleri.length; i++) {
    if (canavarTipleri[i].id === tipId) {
      return canavarTipleri[i];
    }
  }
  return null;
}

// Bu canavara karşı hasarın kaç katı uygulanıyor?
export function tipCarpani(monster) {
  let tip = canavarTipiBul(monster.tipId);
  if (tip === null) {
    return 1;
  }

  let saldiriTuru = menzilliMi() ? "ranged" : "melee";
  let carpan = tip.carpanlar[saldiriTuru];

  if (carpan === undefined) {
    return 1;
  }

  return carpan;
}

// Tip çarpanı uygulanmış nihai hasar
export function canavaraHasar(monster) {
  return Math.max(1, Math.round(toplamSaldiri() * tipCarpani(monster)));
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

// ============================================================
// SEVİYE / XP EĞRİSİ
//
// RuneScape'in klasik eğrisini kullanıyoruz: her seviye bir
// öncekinden ORANSAL olarak daha pahalı. Doğrusal bir eğri
// (50, 60, 70...) idle oyunlar için çok hızlı biterdi.
//
// Tablo bir kez hesaplanıp saklanıyor - her seviye sorgusunda
// yeniden hesaplamak israf olurdu.
// ============================================================

export const MAX_SEVIYE = 99;

// XP_TABLOSU[n] = n. seviyeye ulaşmak için gereken TOPLAM xp
let XP_TABLOSU = [0, 0];

function xpTablosunuKur() {
  let toplam = 0;

  for (let n = 1; n <= MAX_SEVIYE; n++) {
    toplam = toplam + Math.floor(n + 300 * Math.pow(2, n / 6.5));
    XP_TABLOSU[n + 1] = Math.floor(toplam / 4);
  }
}

xpTablosunuKur();

export function seviyeIcinXp(seviye) {
  if (seviye < 1) {
    return 0;
  }
  if (seviye > MAX_SEVIYE) {
    return XP_TABLOSU[MAX_SEVIYE];
  }
  return XP_TABLOSU[seviye];
}

export function seviyeHesapla(xp) {
  // Yüksekten aşağı tarıyoruz: ilk sığdığı seviye cevaptır
  for (let seviye = MAX_SEVIYE; seviye >= 1; seviye--) {
    if (xp >= XP_TABLOSU[seviye]) {
      return seviye;
    }
  }
  return 1;
}

export function seviyeBilgisi(xp) {
  let seviye = seviyeHesapla(xp);

  // Maksimumdaysa çubuk hep dolu görünsün
  if (seviye >= MAX_SEVIYE) {
    return {
      seviye: MAX_SEVIYE,
      mevcutXp: xp,
      seviyedeKazanilan: 0,
      seviyedeGereken: 0,
      sonrakineKalan: 0,
      yuzde: 100,
      maxMi: true
    };
  }

  let seviyeBasiXp = XP_TABLOSU[seviye];
  let sonrakiSeviyeXp = XP_TABLOSU[seviye + 1];

  let kazanilan = xp - seviyeBasiXp;
  let gereken = sonrakiSeviyeXp - seviyeBasiXp;

  return {
    seviye: seviye,
    mevcutXp: xp,
    seviyedeKazanilan: kazanilan,
    seviyedeGereken: gereken,
    sonrakineKalan: sonrakiSeviyeXp - xp,
    yuzde: (kazanilan / gereken) * 100,
    maxMi: false
  };
}




export function skillSeviyesi(skillId) {
  let skill = skillBul(skillId);
  if (skill === null) {
    return 1;
  }
  return seviyeHesapla(skill.xp);
}

// ---------- USTALIK (MASTERY) ----------
//
// Her AKSİYONUN kendi ustalık seviyesi var (yeteneğinkinden ayrı).
// Aynı aksiyonu tekrar tekrar yapınca o işte ustalaşırsın.
//
// Ustalık XP eğrisi, yetenek eğrisinin aynısı - ama aksiyon
// başına kazanç daha az olduğu için doğal olarak daha yavaş ilerler.

export const MAX_USTALIK = 99;

export function ustalikXpi(actionId) {
  if (state.ustalikXp[actionId]) {
    return state.ustalikXp[actionId];
  }
  return 0;
}

export function ustalikSeviyesi(actionId) {
  return seviyeHesapla(ustalikXpi(actionId));
}

export function ustalikBilgisi(actionId) {
  return seviyeBilgisi(ustalikXpi(actionId));
}

// Ustalık seviyesine göre süre indirimi (0 ile 0.40 arası)
// Her 10 seviyede %5, en fazla %40
// Bir aksiyonun ustalığından gelen toplam hız indirimi
export function ustalikHizBonusu(actionId) {
  let seviye = ustalikSeviyesi(actionId);
  let toplam = 0;

  for (let i = 0; i < ustalikTaslari.length; i++) {
    let tas = ustalikTaslari[i];
    if (tas.tur === "hiz" && seviye >= tas.seviye) {
      toplam = toplam + tas.deger;
    }
  }

  return toplam;
}

// Ustalıktan gelen çift ürün şansı
export function ustalikCiftUrunBonusu(actionId) {
  let seviye = ustalikSeviyesi(actionId);
  let toplam = 0;

  for (let i = 0; i < ustalikTaslari.length; i++) {
    let tas = ustalikTaslari[i];
    if (tas.tur === "ciftUrun" && seviye >= tas.seviye) {
      toplam = toplam + tas.deger;
    }
  }

  return toplam;
}

// Ustalıktan gelen XP çarpanı
export function ustalikXpCarpani(actionId) {
  let seviye = ustalikSeviyesi(actionId);
  let carpan = 1;

  for (let i = 0; i < ustalikTaslari.length; i++) {
    let tas = ustalikTaslari[i];
    if (tas.tur === "xp" && seviye >= tas.seviye) {
      carpan = carpan + tas.deger;
    }
  }

  return carpan;
}

// Bir sonraki kilometre taşı (arayüzde göstermek için)
export function sonrakiUstalikTasi(actionId) {
  let seviye = ustalikSeviyesi(actionId);

  for (let i = 0; i < ustalikTaslari.length; i++) {
    if (ustalikTaslari[i].seviye > seviye) {
      return ustalikTaslari[i];
    }
  }

  return null;
}

// Bir aksiyonun ustalık bonusu uygulanmış GERÇEK süresi
export function aksiyonSuresi(action) {
  let indirim = ustalikHizBonusu(action.id) + clanHizBonusu();

  if (indirim > MAX_HIZ_INDIRIMI) {
    indirim = MAX_HIZ_INDIRIMI;
  }

  return Math.round(action.sureMs * (1 - indirim));
}

export function ustalikXpVer(action, kere) {
  let kazanc = Math.ceil(action.xp * 0.5) * kere;

  let eskiSeviye = ustalikSeviyesi(action.id);
  state.ustalikXp[action.id] = ustalikXpi(action.id) + kazanc;
  let yeniSeviye = ustalikSeviyesi(action.id);

  if (yeniSeviye > eskiSeviye) {
    istatistikArtir("ustalikSeviyeAtlama", yeniSeviye - eskiSeviye);

    bildirimGoster(
      "<span class='bildirim-baslik'>⭐ " + action.isim + "</span>" +
      "<span class='bildirim-icerik'>Ustalık " + yeniSeviye + "</span>",
      "ustalik"
    );
  }
}

// Bir yetenekteki toplam ustalık ilerlemesi (yüzde)
export function skillUstalikYuzdesi(skillId) {
  let toplamSeviye = 0;
  let aksiyonSayisi = 0;

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].skillId !== skillId) {
      continue;
    }
    aksiyonSayisi = aksiyonSayisi + 1;
    toplamSeviye = toplamSeviye + ustalikSeviyesi(actions[i].id);
  }

  if (aksiyonSayisi === 0) {
    return 0;
  }

  return (toplamSeviye / (aksiyonSayisi * MAX_USTALIK)) * 100;
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

// ---------- İSTATİSTİKLER ----------
// Tek fonksiyondan geçirmek, ileride "başarım kontrolü" gibi
// şeyleri tek yere eklemeyi mümkün kılıyor.

export function istatistikArtir(alan, miktar) {
  if (state.istatistik[alan] === undefined) {
    state.istatistik[alan] = 0;
  }
  state.istatistik[alan] = state.istatistik[alan] + miktar;
    basarimlariKontrolEt();
}


// ---------- BAŞARIMLAR ----------

export function basarimAcikMi(basarimId) {
  return state.acilanBasarimlar.indexOf(basarimId) !== -1;
}

export function basarimIlerlemesi(basarim) {
  let mevcut = state.istatistik[basarim.sayac];
  if (mevcut === undefined) {
    mevcut = 0;
  }

  let yuzde = (mevcut / basarim.esik) * 100;
  if (yuzde > 100) {
    yuzde = 100;
  }

  return { mevcut: mevcut, hedef: basarim.esik, yuzde: yuzde };
}

// Aynı sayaca bağlı başarımlardan gösterilecek olanı bulur:
// açılmamış EN DÜŞÜK eşikli olan. Kademeli görünürlük böyle sağlanıyor.
export function gosterilecekBasarimlar() {
  let sonuc = [];
  let gosterilenSayaclar = {};

  for (let i = 0; i < basarimlar.length; i++) {
    let b = basarimlar[i];

    // Açılmışsa her zaman göster
    if (basarimAcikMi(b.id)) {
      sonuc.push(b);
      continue;
    }

    // Açılmamışsa: bu sayaç için zaten bir tane gösterdiysek atla
    if (gosterilenSayaclar[b.sayac]) {
      continue;
    }

    gosterilenSayaclar[b.sayac] = true;
    sonuc.push(b);
  }

  return sonuc;
}

// Her istatistik değişiminde çağrılır. Eşiği geçen varsa açar.
export function basarimlariKontrolEt() {
  for (let i = 0; i < basarimlar.length; i++) {
    let b = basarimlar[i];

    if (basarimAcikMi(b.id)) {
      continue;
    }

    let mevcut = state.istatistik[b.sayac];
    if (mevcut === undefined) {
      mevcut = 0;
    }

    if (mevcut < b.esik) {
      continue;
    }

    // --- Başarım açıldı ---
    state.acilanBasarimlar.push(b.id);

    let odulYazisi = "";

    if (b.odul) {
      if (b.odul.altin) {
        state.altin = state.altin + b.odul.altin;
        odulYazisi = " · 🪙 " + b.odul.altin;
      }
      if (b.odul.itemId) {
        let item = itemBul(b.odul.itemId);
        if (item !== null) {
          itemEkle(b.odul.itemId, b.odul.miktar);
          odulYazisi = " · " + item.ikon + " ×" + b.odul.miktar;
        }
      }
    }

    bildirimGoster(
      "<span class='bildirim-baslik'>🏆 Başarım Açıldı</span>" +
      "<span class='bildirim-icerik'>" + b.ikon + " " + b.isim +
      odulYazisi + "</span>",
      "basarim"
    );
  }
}

// ---------- CLAN ----------

export function clanVarMi() {
  return state.clan !== null;
}

export function clanSeviyesi() {
  if (state.clan === null) {
    return 0;
  }

  for (let seviye = MAX_CLAN_SEVIYESI; seviye >= 1; seviye--) {
    if (state.clan.puan >= clanSeviyeIcinPuan(seviye)) {
      return seviye;
    }
  }
  return 1;
}

export function clanSeviyeBilgisi() {
  let seviye = clanSeviyesi();

  if (seviye >= MAX_CLAN_SEVIYESI) {
    return {
      seviye: seviye,
      kazanilan: 0,
      gereken: 0,
      yuzde: 100,
      maxMi: true
    };
  }

  let basi = clanSeviyeIcinPuan(seviye);
  let sonraki = clanSeviyeIcinPuan(seviye + 1);

  return {
    seviye: seviye,
    kazanilan: state.clan.puan - basi,
    gereken: sonraki - basi,
    yuzde: ((state.clan.puan - basi) / (sonraki - basi)) * 100,
    maxMi: false
  };
}

// Bu bonus açık mı?
export function clanBonusuAcikMi(bonusId) {
  if (state.clan === null) {
    return false;
  }

  let seviye = clanSeviyesi();

  for (let i = 0; i < clanBonuslari.length; i++) {
    if (clanBonuslari[i].id === bonusId) {
      return seviye >= clanBonuslari[i].seviye;
    }
  }
  return false;
}

// Toplama/üretim hız indirimi (0 - 0.08 arası)
export function clanHizBonusu() {
  if (clanBonusuAcikMi("toplama_hiz_3")) {
    return 0.08;
  }
  if (clanBonusuAcikMi("toplama_hiz_2")) {
    return 0.05;
  }
  if (clanBonusuAcikMi("toplama_hiz_1")) {
    return 0.03;
  }
  return 0;
}

export function clanEnvanterBonusu() {
  if (clanBonusuAcikMi("envanter_2")) {
    return 10;
  }
  if (clanBonusuAcikMi("envanter_1")) {
    return 5;
  }
  return 0;
}

export function clanSekmeBonusu() {
  if (clanBonusuAcikMi("envanter_2")) {
    return 1;
  }
  return 0;
}


// Sekme siniri (clan bonusu dahil) - hem arayuz hem mantik bunu kullansin
export function maxSekmeSayisi() {
  return state.maxEnvanterSekmesi + clanSekmeBonusu();
}

export function clanAltinCarpani() {
  if (clanBonusuAcikMi("altin_1")) {
    return 1.1;
  }
  return 1;
}

// Bir aktivite sonrası nişan düşürme denemesi.
// tur: "toplama" | "uretim" | "savas"
export function nisanDenemesi(tur, ekSans) {
  let sans = NISAN_SANSLARI[tur];
  if (sans === undefined) {
    return 0;
  }

  if (ekSans) {
    sans = sans + ekSans;
  }

  if (Math.random() > sans) {
    return 0;
  }

  state.clanNisani = state.clanNisani + 1;
  return 1;
}

// Offline hesaplama için: n kez denemenin toplam sonucu
export function nisanDenemesiToplu(tur, kere) {
  let sans = NISAN_SANSLARI[tur];
  if (sans === undefined || kere < 1) {
    return 0;
  }

  let toplam = 0;
  for (let i = 0; i < kere; i++) {
    if (Math.random() <= sans) {
      toplam = toplam + 1;
    }
  }

  state.clanNisani = state.clanNisani + toplam;
  return toplam;
}

export function nisanPuaniDegeri() {
  return NISAN_PUANI;
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

export function envanterKapasitesi() {
  return state.envanterKapasitesi + clanEnvanterBonusu();
}

export function envanterDoluMu() {
  return envanterKullanilan() >= envanterKapasitesi();
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

// ---------- ALETLER ----------

export function aletTuruBul(aletId) {
  for (let i = 0; i < aletTurleri.length; i++) {
    if (aletTurleri[i].id === aletId) {
      return aletTurleri[i];
    }
  }
  return null;
}

// Bir yeteneğin aleti hangisi? (üretim yeteneklerinde alet yok)
export function skillAletTuru(skillId) {
  for (let i = 0; i < aletTurleri.length; i++) {
    if (aletTurleri[i].skillId === skillId) {
      return aletTurleri[i];
    }
  }
  return null;
}

export function aletKademesi(aletId) {
  if (state.aletler[aletId]) {
    return state.aletler[aletId];
  }
  return 1;
}

export function aletKademeBilgisi(kademe) {
  for (let i = 0; i < aletKademeleri.length; i++) {
    if (aletKademeleri[i].kademe === kademe) {
      return aletKademeleri[i];
    }
  }
  return aletKademeleri[0];
}

// Aksiyonun istediği alet kademesi var mı?
export function aletYeterliMi(action) {
  if (!action.gerekliAletKademesi) {
    return true;
  }

  let alet = skillAletTuru(action.skillId);
  if (alet === null) {
    return true;
  }

  return aletKademesi(alet.id) >= action.gerekliAletKademesi;
}

// Bu aksiyonda çift ürün şansı ne? (aletten gelir)
export function ciftUrunSansi(action) {
  let toplam = ustalikCiftUrunBonusu(action.id);

  let alet = skillAletTuru(action.skillId);
  if (alet !== null) {
    toplam = toplam + aletKademeBilgisi(aletKademesi(alet.id)).ciftUrunSansi;
  }

  return toplam;
}

// ---------- EŞYA SEVİYE ŞARTI ----------
// Bir eşya "gereksinimler" alanı taşıyabilir:
//   gereksinimler: [{ skillId: "attack", seviye: 10 }, ...]
// Yazılmazsa herkes kuşanabilir.

export function itemGereksinimleri(item) {
  if (item.gereksinimler) {
    return item.gereksinimler;
  }
  return [];
}

export function itemKusanilabilirMi(item) {
  let gerekli = itemGereksinimleri(item);

  for (let i = 0; i < gerekli.length; i++) {
    if (skillSeviyesi(gerekli[i].skillId) < gerekli[i].seviye) {
      return false;
    }
  }

  return true;
}

// Karşılanmayan şartları metin olarak döndürür (arayüzde göstermek için)
export function eksikGereksinimYazisi(item) {
  let gerekli = itemGereksinimleri(item);
  let eksikler = [];

  for (let i = 0; i < gerekli.length; i++) {
    let sart = gerekli[i];
    let skill = skillBul(sart.skillId);
    if (skill === null) {
      continue;
    }

    if (skillSeviyesi(sart.skillId) < sart.seviye) {
      eksikler.push(skill.ikon + " " + skill.isim + " " + sart.seviye);
    }
  }

  return eksikler.join(", ");
}

// ---------- RASTGELE MİKTAR ----------
// Loot tabloları artık "3-7 kemik" gibi aralık verebilir.

export function rastgeleMiktar(loot) {
  // Aralık verilmişse
  if (loot.minMiktar !== undefined && loot.maxMiktar !== undefined) {
    let fark = loot.maxMiktar - loot.minMiktar;
    return loot.minMiktar + Math.floor(Math.random() * (fark + 1));
  }

  // Sabit miktar verilmişse
  if (loot.miktar !== undefined) {
    return loot.miktar;
  }

  // Hiçbiri yoksa 1
  return 1;
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
  let ciftSans = ciftUrunSansi(action);

  if (action.ciktilar) {
    for (let i = 0; i < action.ciktilar.length; i++) {
      let cikti = action.ciktilar[i];
      let toplam = cikti.miktar * kere;

      // Alet çift ürün şansı — her tekrar için ayrı zar
      if (ciftSans > 0) {
        for (let n = 0; n < kere; n++) {
          if (Math.random() <= ciftSans) {
            toplam = toplam + cikti.miktar;
          }
        }
      }

      itemEkle(cikti.itemId, toplam);
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
    return 10 + skillSeviyesi("ranged") * 2 + ekipmanBonus;
  }

  return 10 + skillSeviyesi("attack") * 2 + ekipmanBonus;
}

// KUVVET (veya Menzilli) = hasar
export function toplamSaldiri() {
  let ekipmanBonus = ekipmanBonusToplami("saldiriBonusu");

  if (menzilliMi()) {
    // Menzilli tek yetenekle hem isabet hem hasar verdiği için
    // hasar katsayısı biraz düşük — ayrıca ok maliyeti var
    return Math.floor((5 + ekipmanBonus) * (1 + skillSeviyesi("ranged") * 0.042));
  }

  return Math.floor((5 + ekipmanBonus) * (1 + skillSeviyesi("strength") * 0.05));
}

// SAVUNMA = kaçınma puanı
export function kacinmaPuani() {
  return Math.floor(8 + skillSeviyesi("defence") * 1.2 +
    ekipmanBonusToplami("savunmaBonusu"));
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

// Savaş seviyesi = savunma temeli + saldırı tarzının en güçlüsü
//
// Yakın dövüş ile menzilliden hangisi yüksekse o sayılır.
// Böylece uzmanlaşmak cezalandırılmaz: sadece yay kullanan biri,
// hiç geliştirmediği Kuvvet yüzünden geride kalmaz.
export function savasSeviyesi() {
  // Herkesin ihtiyacı olan temel: dayanıklılık
  let temel = (skillSeviyesi("defence") + skillSeviyesi("hitpoints")) * 0.25;

  // Yakın dövüş yolu
  let yakinDovus = (skillSeviyesi("attack") + skillSeviyesi("strength")) * 0.325;

  // Menzilli yolu (tek yetenek olduğu için katsayısı yüksek)
  let menzilli = skillSeviyesi("ranged") * 0.65;

  // Hangi yolda daha güçlüysen o sayılır
  let saldiriGucu = Math.max(yakinDovus, menzilli);

  let sonuc = Math.floor(temel + saldiriGucu);

  if (sonuc < 1) {
    return 1;
  }
  return sonuc;
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