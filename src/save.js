import { skills } from "./data/skills.js";
import { ekipmanSlotlari } from "./data/slots.js";
import { state, ekipmaniSifirla } from "./state.js";
import {
  skillBul, itemBul, actionBul, monsterBul, xpVer,
  toplamMaxHp, toplamSaldiri, gelenHasar,
  oyuncuSaldiriHizi, oyuncuIsabetSansi, canavarIsabetSansi,
  okluSilahMi, slotAdedi, slotItemi, menzilliMi,
  kacKezYapilabilir, girdileriTuket, ciktilariVer, itemEkle,
  seviyeHesapla
} from "./core.js";

// ============================================================
// KAYIT / YÜKLEME / OFFLINE İLERLEME
// ============================================================

const KAYIT_ANAHTARI = "idle-realm-kayit";
const MAX_OFFLINE_MS = 12 * 60 * 60 * 1000;

export function oyunuKaydet() {
  let kayit = {
    skills: skills,
    envanter: state.envanter,
    altin: state.altin,
    oyuncuHp: state.oyuncuHp,
    ekipman: state.ekipman,
    ekipmanAdet: state.ekipmanAdet,
    otomatikYemekAcik: state.otomatikYemekAcik,
    otomatikYemekEsigi: state.otomatikYemekEsigi,
    savasStili: state.savasStili,
    aktifAksiyonId: state.aktifAksiyonId,
    aktifSavasMonsterId: state.aktifSavasMonsterId,
    aktifSavasMonsterHp: state.aktifSavasMonsterHp,
    gorulenYardimlar: state.gorulenYardimlar,
    envanterKapasitesi: state.envanterKapasitesi,
    envanterSekmeleri: state.envanterSekmeleri,
    maxEnvanterSekmesi: state.maxEnvanterSekmesi,
    kayitZamani: Date.now()
  };

  try {
    localStorage.setItem(KAYIT_ANAHTARI, JSON.stringify(kayit));
  } catch (hata) {
    console.error("Kayıt başarısız:", hata);
  }
}

export function oyunuYukle() {
  let kayitMetni = localStorage.getItem(KAYIT_ANAHTARI);

  if (kayitMetni === null) {
    return;
  }

  let kayit = JSON.parse(kayitMetni);

  // Skill XP'lerini geri yükle.
  // Tek tek dolaşıyoruz ki oyuna sonradan eklenen skiller kaybolmasın.
  if (kayit.skills) {
    for (let i = 0; i < kayit.skills.length; i++) {
      let kayitliSkill = kayit.skills[i];
      let mevcutSkill = skillBul(kayitliSkill.id);
      if (mevcutSkill !== null) {
        mevcutSkill.xp = kayitliSkill.xp;
      }
    }
  }

  if (kayit.envanter) {
    state.envanter = kayit.envanter;
  }
  if (kayit.envanterKapasitesi) {
    state.envanterKapasitesi = kayit.envanterKapasitesi;
  }
  if (kayit.envanterSekmeleri) {
    state.envanterSekmeleri = kayit.envanterSekmeleri;
  }
  if (kayit.maxEnvanterSekmesi) {
    state.maxEnvanterSekmesi = kayit.maxEnvanterSekmesi;
  }
  if (kayit.altin) {
    state.altin = kayit.altin;
  }
  if (kayit.otomatikYemekAcik) {
    state.otomatikYemekAcik = kayit.otomatikYemekAcik;
  }
  if (kayit.otomatikYemekEsigi) {
    state.otomatikYemekEsigi = kayit.otomatikYemekEsigi;
  }
  if (kayit.savasStili) {
    state.savasStili = kayit.savasStili;
  }
  if (kayit.gorulenYardimlar) {
    state.gorulenYardimlar = kayit.gorulenYardimlar;
  }

  // Ekipman - eski kayıtlarda sadece kusanilanSilahId vardı
  ekipmaniSifirla();

  if (kayit.ekipman) {
    for (let i = 0; i < ekipmanSlotlari.length; i++) {
      let slotId = ekipmanSlotlari[i].id;
      if (kayit.ekipman[slotId]) {
        state.ekipman[slotId] = kayit.ekipman[slotId];
      }
      if (kayit.ekipmanAdet && kayit.ekipmanAdet[slotId]) {
        state.ekipmanAdet[slotId] = kayit.ekipmanAdet[slotId];
      }
    }
  } else if (kayit.kusanilanSilahId) {
    state.ekipman["weapon"] = kayit.kusanilanSilahId;
  }

  if (kayit.oyuncuHp) {
    state.oyuncuHp = kayit.oyuncuHp;
  }
  if (state.oyuncuHp > toplamMaxHp()) {
    state.oyuncuHp = toplamMaxHp();
  }

  if (kayit.aktifSavasMonsterHp) {
    state.aktifSavasMonsterHp = kayit.aktifSavasMonsterHp;
  }

  // game.js bunlara bakıp aktiviteyi devam ettirecek
  state.devamEdilecekAksiyonId = kayit.aktifAksiyonId;
  state.devamEdilecekSavasId = kayit.aktifSavasMonsterId;

  // Offline ilerleme - ya toplama ya savaş çalışıyordu
  if (kayit.aktifSavasMonsterId) {
    offlineSavasHesapla(kayit.kayitZamani, kayit.aktifSavasMonsterId);
  } else if (kayit.aktifAksiyonId) {
    offlineAksiyonHesapla(kayit.kayitZamani, kayit.aktifAksiyonId);
  }
}

// ---------- OFFLINE: TOPLAMA / ÜRETİM ----------

function offlineAksiyonHesapla(kayitZamani, kayitliAksiyonId) {
  if (!kayitliAksiyonId || !kayitZamani) {
    return;
  }

  let action = actionBul(kayitliAksiyonId);
  if (action === null) {
    return;
  }

  let gecenSureMs = Date.now() - kayitZamani;

  if (gecenSureMs < action.sureMs) {
    return;
  }

  if (gecenSureMs > MAX_OFFLINE_MS) {
    gecenSureMs = MAX_OFFLINE_MS;
  }

  let adet = Math.floor(gecenSureMs / action.sureMs);

  let malzemeSiniri = kacKezYapilabilir(action);
  if (adet > malzemeSiniri) {
    adet = malzemeSiniri;
  }

  if (adet < 1) {
    return;
  }

  girdileriTuket(action, adet);
  ciktilariVer(action, adet);
  xpVer(action.skillId, action.xp * adet);

  ozetGoster(
    sureMetni(gecenSureMs),
    action.isim + " × " + adet + " tamamlandı.\n" +
    "+" + (action.xp * adet) + " XP"
  );
}

// ---------- OFFLINE: SAVAŞ ----------
//
// Geçen süreyi sanal bir saatle baştan sona oynatıyoruz.
// Her adımda "sırada kim var?" diye bakıp o tarafın vuruşunu
// işliyoruz - tıpkı canlı savaştaki gibi, ama beklemeden.
//
// Basitleştirme: istatistikler çıkıştaki değerlerde donuyor.
// Yoksa her vuruşta yeniden hesaplamak gerekirdi.

function offlineSavasHesapla(kayitZamani, monsterId) {
  let monster = monsterBul(monsterId);
  if (monster === null || !kayitZamani) {
    return;
  }

  let gecenSureMs = Date.now() - kayitZamani;

  if (gecenSureMs < 2000) {
    return;
  }

  if (gecenSureMs > MAX_OFFLINE_MS) {
    gecenSureMs = MAX_OFFLINE_MS;
  }

  // --- İstatistik anlık görüntüsü ---
  let hasarim = toplamSaldiri();
  let isabetSansim = oyuncuIsabetSansi(monster);
  let canavarIsabeti = canavarIsabetSansi(monster);
  let canavarHasari = gelenHasar(monster.saldiri);
  let hizim = oyuncuSaldiriHizi();
  let maxHp = toplamMaxHp();
  let okKullaniyorMu = okluSilahMi();

  let yemek = slotItemi("food");
  let yemekIyilestirme = 0;
  if (yemek !== null) {
    yemekIyilestirme = yemek.iyilestirme;
  }

  // --- Simülasyon değişkenleri ---
  let zaman = 0;
  let oyuncuSonrakiVurus = hizim;
  let canavarSonrakiVurus = monster.saldiriHiziMs;

  let canavarHp = state.aktifSavasMonsterHp;
  if (canavarHp <= 0) {
    canavarHp = monster.maxHp;
  }

  let hp = state.oyuncuHp;
  let okKalan = slotAdedi("ammo");
  let yemekKalan = slotAdedi("food");
  let esikCan = maxHp * (state.otomatikYemekEsigi / 100);

  // --- Sayaçlar ---
  let oldurulen = 0;
  let harcananOk = 0;
  let yenenYemek = 0;
  let kazanilanAltin = 0;
  let lootSayaci = {};
  let olduMu = false;
  let okBittiMi = false;

  let guvenlikSayaci = 0;

  while (guvenlikSayaci < 400000) {
    guvenlikSayaci++;

    // Sırada kim var?
    let sonrakiOlay = Math.min(oyuncuSonrakiVurus, canavarSonrakiVurus);
    if (sonrakiOlay > gecenSureMs) {
      break;
    }
    zaman = sonrakiOlay;

    if (oyuncuSonrakiVurus <= canavarSonrakiVurus) {
      // ----- OYUNCUNUN VURUŞU -----
      oyuncuSonrakiVurus = oyuncuSonrakiVurus + hizim;

      if (okKullaniyorMu) {
        if (okKalan < 1) {
          okBittiMi = true;
          break;
        }
        okKalan = okKalan - 1;
        harcananOk = harcananOk + 1;
      }

      if (Math.random() <= isabetSansim) {
        canavarHp = canavarHp - hasarim;

        if (canavarHp <= 0) {
          oldurulen = oldurulen + 1;
          canavarHp = monster.maxHp;

          if (monster.altinOdulu) {
            kazanilanAltin = kazanilanAltin + monster.altinOdulu;
          }

          if (monster.lootTablosu) {
            for (let i = 0; i < monster.lootTablosu.length; i++) {
              let loot = monster.lootTablosu[i];
              if (Math.random() <= loot.sans) {
                if (lootSayaci[loot.itemId]) {
                  lootSayaci[loot.itemId] = lootSayaci[loot.itemId] + 1;
                } else {
                  lootSayaci[loot.itemId] = 1;
                }
              }
            }
          }
        }
      }
    } else {
      // ----- CANAVARIN VURUŞU -----
      canavarSonrakiVurus = canavarSonrakiVurus + monster.saldiriHiziMs;

      if (Math.random() <= canavarIsabeti) {
        hp = hp - canavarHasari;

        // Otomatik yemek
        if (state.otomatikYemekAcik && hp > 0 && hp < esikCan &&
            yemekKalan > 0 && yemekIyilestirme > 0) {
          yemekKalan = yemekKalan - 1;
          yenenYemek = yenenYemek + 1;
          hp = hp + yemekIyilestirme;
          if (hp > maxHp) {
            hp = maxHp;
          }
        }

        if (hp <= 0) {
          hp = 1;
          olduMu = true;
          break;
        }
      }
    }
  }

  // --- Sonuçları uygula ---
  state.oyuncuHp = hp;
  state.aktifSavasMonsterHp = canavarHp;
  state.altin = state.altin + kazanilanAltin;

  if (okKullaniyorMu) {
    state.ekipmanAdet["ammo"] = okKalan;
    if (okKalan < 1) {
      state.ekipman["ammo"] = null;
    }
  }

  if (yemekKalan !== slotAdedi("food")) {
    state.ekipmanAdet["food"] = yemekKalan;
    if (yemekKalan < 1) {
      state.ekipman["food"] = null;
    }
  }

  let lootSatirlari = [];
  for (let itemId in lootSayaci) {
    itemEkle(itemId, lootSayaci[itemId]);
    let item = itemBul(itemId);
    if (item !== null) {
      lootSatirlari.push(item.ikon + " " + item.isim + " ×" + lootSayaci[itemId]);
    }
  }

  // XP'yi tek seferde ver (canlı savaştaki dağıtımın aynısı)
  if (oldurulen > 0) {
    let toplamXp = monster.xpOdulu * oldurulen;

    if (menzilliMi()) {
      xpVer("ranged", toplamXp);
    } else {
      xpVer(state.savasStili, toplamXp);
    }
    xpVer("hitpoints", Math.ceil(toplamXp / 3));
  }

  // Ölünce veya ok bitince savaş devam etmesin
  if (olduMu || okBittiMi) {
    state.devamEdilecekSavasId = null;
  }

  // --- Özet ---
  let satirlar = [];
  satirlar.push(monster.ikon + " " + monster.isim + " × " + oldurulen + " öldürüldü");

  if (kazanilanAltin > 0) {
    satirlar.push("🪙 " + kazanilanAltin + " altın");
  }
  if (lootSatirlari.length > 0) {
    satirlar.push(lootSatirlari.join(", "));
  }
  if (harcananOk > 0) {
    satirlar.push("🏹 " + harcananOk + " ok harcandı");
  }
  if (yenenYemek > 0) {
    satirlar.push("🍤 " + yenenYemek + " yemek yendi");
  }
  if (olduMu) {
    satirlar.push("💀 Bir noktada öldün, savaş orada durdu.");
  }
  if (okBittiMi) {
    satirlar.push("🏹 Okların bitti, savaş orada durdu.");
  }

  ozetGoster(sureMetni(gecenSureMs), satirlar.join("\n"));
}

// ---------- YARDIMCILAR ----------

function sureMetni(ms) {
  let dakika = Math.floor(ms / 60000);

  if (dakika < 60) {
    return dakika + " dakika";
  }

  let saat = Math.floor(dakika / 60);
  let kalanDakika = dakika % 60;
  return saat + " saat " + kalanDakika + " dakika";
}

function ozetGoster(sure, icerik) {
  alert("Hoş geldin! " + sure + " uzaktaydın.\n\n" + icerik);
}

// ---------- MENÜ İÇİN ----------

export function kayitVarMi() {
  return localStorage.getItem(KAYIT_ANAHTARI) !== null;
}

export function kaydiSil() {
  localStorage.removeItem(KAYIT_ANAHTARI);
}

// Kaydı UYGULAMADAN sadece özetini okur (menüde göstermek için)
export function kayitOzeti() {
  let metin = localStorage.getItem(KAYIT_ANAHTARI);
  if (metin === null) {
    return null;
  }

  try {
    let kayit = JSON.parse(metin);

    let toplamSeviye = 0;
    if (kayit.skills) {
      for (let i = 0; i < kayit.skills.length; i++) {
        toplamSeviye = toplamSeviye + seviyeHesapla(kayit.skills[i].xp);
      }
    }

    return {
      toplamSeviye: toplamSeviye,
      altin: kayit.altin ? kayit.altin : 0,
      kayitZamani: kayit.kayitZamani ? kayit.kayitZamani : 0
    };
  } catch (hata) {
    return null;
  }
}