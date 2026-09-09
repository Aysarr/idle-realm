import { skills } from "./data/skills.js";
import { state, ekipmaniSifirla, KAYDEDILECEK_ALANLAR } from "./state.js";
import {
  skillBul, itemBul, actionBul, monsterBul, xpVer,
  toplamMaxHp, gelenHasar, canavaraHasar,
  oyuncuSaldiriHizi, oyuncuIsabetSansi, canavarIsabetSansi,
  okluSilahMi, slotAdedi, slotItemi, menzilliMi,
  kacKezYapilabilir, girdileriTuket, ciktilariVer, itemEkle,
  aksiyonSuresi, ustalikXpVer, rastgeleMiktar, seviyeHesapla,
  nisanDenemesiToplu
} from "./core.js";

// ============================================================
// KAYIT / YÜKLEME / OFFLINE İLERLEME
// ============================================================

const KAYIT_ANAHTARI = "idle-realm-kayit";
const MAX_OFFLINE_MS = 12 * 60 * 60 * 1000;

// Kayıt yapısı değiştiğinde bu sayıyı artır ve kayitGocu()
// içine dönüşümü yaz. Böylece eski kayıtlar bozulmaz.
const KAYIT_SURUMU = 3;

// ---------- KAYDETME ----------

export function oyunuKaydet() {
  // Sıfırlama veya içe aktarma yapılıyorsa kaydetme
  if (state.kayitKapali) {
    return;
  }

  let kayit = {
    surum: KAYIT_SURUMU,
    kayitZamani: Date.now(),
    // Yetenekler state içinde değil, ayrı bir modülde duruyor
    skills: skills
  };

  // Listedeki her alanı otomatik kaydet
  for (let i = 0; i < KAYDEDILECEK_ALANLAR.length; i++) {
    let alan = KAYDEDILECEK_ALANLAR[i];
    kayit[alan] = state[alan];
  }

  try {
    localStorage.setItem(KAYIT_ANAHTARI, JSON.stringify(kayit));
  } catch (hata) {
    console.error("Kayıt başarısız:", hata);
  }
}

// ---------- YÜKLEME ----------

// Kayıtlı değeri mevcut yapının üstüne yazar.
// Objelerde ANAHTAR ANAHTAR birleştirir - böylece oyuna
// sonradan eklenen alanlar (yeni istatistik sayacı, yeni
// ekipman slotu) eski kayıtta yok diye kaybolmaz.
function degeriBirlestir(mevcut, kayitli) {
  // Dizi veya ilkel değer: doğrudan değiştir
  if (Array.isArray(kayitli) || typeof kayitli !== "object" || kayitli === null) {
    return kayitli;
  }

  // Obje: mevcut yapıyı koru, kayıtlı anahtarları üstüne yaz
  let sonuc = mevcut;
  if (typeof sonuc !== "object" || sonuc === null || Array.isArray(sonuc)) {
    sonuc = {};
  }

  for (let anahtar in kayitli) {
    sonuc[anahtar] = kayitli[anahtar];
  }

  return sonuc;
}

// Eski sürümdeki kayıtları güncel yapıya çevirir
function kayitGocu(kayit) {
  let surum = kayit.surum ? kayit.surum : 1;

  // --- Sürüm 1 → 2: envanter sekmeleri ve kapasite eklendi ---
  if (surum < 2) {
    if (kayit.envanter) {
      for (let i = 0; i < kayit.envanter.length; i++) {
        if (!kayit.envanter[i].sekmeId) {
          kayit.envanter[i].sekmeId = "genel";
        }
      }
    }
    if (!kayit.envanterSekmeleri) {
      kayit.envanterSekmeleri = [{ id: "genel", isim: "Genel", ikon: "📦" }];
    }
    surum = 2;
  }

  // --- Sürüm 2 → 3: eski tek silah slotu yeni sisteme taşındı ---
  if (surum < 3) {
    if (!kayit.ekipman && kayit.kusanilanSilahId) {
      kayit.ekipman = { weapon: kayit.kusanilanSilahId };
    }
    surum = 3;
  }

  kayit.surum = surum;
  return kayit;
}

export function oyunuYukle() {
  let kayitMetni = localStorage.getItem(KAYIT_ANAHTARI);

  if (kayitMetni === null) {
    return;
  }

  let kayit;
  try {
    kayit = JSON.parse(kayitMetni);
  } catch (hata) {
    console.error("Kayıt okunamadı:", hata);
    return;
  }

  kayit = kayitGocu(kayit);

  // --- Yetenek XP'leri ---
  // Tek tek dolaşıyoruz ki oyuna sonradan eklenen yetenekler kaybolmasın
  if (kayit.skills) {
    for (let i = 0; i < kayit.skills.length; i++) {
      let kayitliSkill = kayit.skills[i];
      let mevcutSkill = skillBul(kayitliSkill.id);
      if (mevcutSkill !== null) {
        mevcutSkill.xp = kayitliSkill.xp;
      }
    }
  }

  // Ekipman slotlarını önce sıfırla, sonra kayıttakini üstüne yaz.
  // Böylece sonradan eklenen slotlar boş ama TANIMLI olur.
  ekipmaniSifirla();

  // --- Listedeki alanları otomatik yükle ---
  for (let i = 0; i < KAYDEDILECEK_ALANLAR.length; i++) {
    let alan = KAYDEDILECEK_ALANLAR[i];

    if (kayit[alan] === undefined || kayit[alan] === null) {
      // clan gibi null olabilen alanlar için: kayıtta açıkça
      // null yazıyorsa onu uygula, hiç yoksa varsayılanı koru
      if (kayit[alan] === null) {
        state[alan] = null;
      }
      continue;
    }

    state[alan] = degeriBirlestir(state[alan], kayit[alan]);
  }

  // Can, güncel maksimumu aşmasın (Sağlık seviyesi değişmiş olabilir)
  if (state.oyuncuHp > toplamMaxHp()) {
    state.oyuncuHp = toplamMaxHp();
  }

  // game.js bunlara bakıp aktiviteyi sürdürecek
  state.devamEdilecekAksiyonId = kayit.aktifAksiyonId;
  state.devamEdilecekSavasId = kayit.aktifSavasMonsterId;

  // --- Offline ilerleme ---
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

  let sure = aksiyonSuresi(action);
  let gecenSureMs = Date.now() - kayitZamani;

  if (gecenSureMs < sure) {
    return;
  }

  if (gecenSureMs > MAX_OFFLINE_MS) {
    gecenSureMs = MAX_OFFLINE_MS;
  }

  let adet = Math.floor(gecenSureMs / sure);

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
  ustalikXpVer(action, adet);

    let nisanTuru = action.girdiler ? "uretim" : "toplama";
  let kazanilanNisan = nisanDenemesiToplu(nisanTuru, adet);

  ozetGoster(
    sureMetni(gecenSureMs),
    action.isim + " × " + adet + " tamamlandı.\n" +
    "+" + (action.xp * adet) + " XP"

    
  );

    ozetGoster(
    sureMetni(gecenSureMs),
    action.isim + " × " + adet + " tamamlandı.\n" +
    "+" + (action.xp * adet) + " XP" +
    (kazanilanNisan > 0 ? "\n🎖️ " + kazanilanNisan + " Clan Nişanı" : "")
  );
}

// ---------- OFFLINE: SAVAŞ ----------
//
// Geçen süreyi sanal bir saatle baştan sona oynatıyoruz.
// Her adımda "sırada kim var?" diye bakıp o tarafın vuruşunu
// işliyoruz - tıpkı canlı savaştaki gibi, ama beklemeden.
//
// Basitleştirme: istatistikler çıkıştaki değerlerde donuyor.

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
  let hasarim = canavaraHasar(monster);
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

    let sonrakiOlay = Math.min(oyuncuSonrakiVurus, canavarSonrakiVurus);
    if (sonrakiOlay > gecenSureMs) {
      break;
    }

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
                let dusen = rastgeleMiktar(loot);
                if (lootSayaci[loot.itemId]) {
                  lootSayaci[loot.itemId] = lootSayaci[loot.itemId] + dusen;
                } else {
                  lootSayaci[loot.itemId] = dusen;
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

  // Nişanları hesapla (özet için sakla)
  let kazanilanNisan = 0;
  if (oldurulen > 0) {
    kazanilanNisan = nisanDenemesiToplu("savas", oldurulen);
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
  if (kazanilanNisan > 0) {
    satirlar.push("🎖️ " + kazanilanNisan + " Clan Nişanı");
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
      oyuncuAdi: kayit.oyuncuAdi ? kayit.oyuncuAdi : "Maceracı",
      toplamSeviye: toplamSeviye,
      altin: kayit.altin ? kayit.altin : 0,
      kayitZamani: kayit.kayitZamani ? kayit.kayitZamani : 0
    };
  } catch (hata) {
    return null;
  }
}

// ---------- PROFİL KURULUMU ----------

// Oyuncuya benzersiz bir kimlik verir.
// Online'a geçildiğinde sunucu bu id'yi tanıyacak.
export function profilKur() {
  if (state.oyuncuId === null) {
    state.oyuncuId =
      "p_" + Date.now().toString(36) +
      "_" + Math.random().toString(36).substring(2, 8);
  }

  if (!state.oyunBaslangici) {
    state.oyunBaslangici = Date.now();
  }
}