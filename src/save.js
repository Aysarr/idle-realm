import { skills } from "./data/skills.js";
import { ekipmanSlotlari } from "./data/slots.js";
import { state, ekipmaniSifirla } from "./state.js";
import {
  skillBul, actionBul, xpVer,
  envanterdekiMiktar, itemEkle, itemCikar, toplamMaxHp
} from "./core.js";

// ============================================================
// KAYIT / YÜKLEME
// ============================================================

const KAYIT_ANAHTARI = "idle-realm-kayit";

export function oyunuKaydet() {
  let kayit = {
    skills: skills,
    envanter: state.envanter,
    altin: state.altin,
    oyuncuHp: state.oyuncuHp,
    ekipman: state.ekipman,
    otomatikYemekAcik: state.otomatikYemekAcik,
    aktifAksiyonId: state.aktifAksiyonId,
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
  if (kayit.altin) {
    state.altin = kayit.altin;
  }
  if (kayit.otomatikYemekAcik) {
    state.otomatikYemekAcik = kayit.otomatikYemekAcik;
  }

  // Ekipman - eski kayıtlarda sadece kusanilanSilahId vardı
  ekipmaniSifirla();

  if (kayit.ekipman) {
    for (let i = 0; i < ekipmanSlotlari.length; i++) {
      let slotId = ekipmanSlotlari[i].id;
      if (kayit.ekipman[slotId]) {
        state.ekipman[slotId] = kayit.ekipman[slotId];
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

  offlineIlerlemeHesapla(kayit.kayitZamani, kayit.aktifAksiyonId);
}

function offlineIlerlemeHesapla(kayitZamani, kayitliAksiyonId) {
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

  // En fazla 12 saatlik offline ilerleme
  let maxSureMs = 12 * 60 * 60 * 1000;
  if (gecenSureMs > maxSureMs) {
    gecenSureMs = maxSureMs;
  }

  let adet = Math.floor(gecenSureMs / action.sureMs);

  // Girdi gerektiren aksiyonsa, elimizdeki malzeme kadarını yapabiliriz
  if (action.gerekliItemId) {
    let elimdeki = envanterdekiMiktar(action.gerekliItemId);
    let malzemeyleYapilabilir = Math.floor(elimdeki / action.gerekliMiktar);
    if (adet > malzemeyleYapilabilir) {
      adet = malzemeyleYapilabilir;
    }
    itemCikar(action.gerekliItemId, adet * action.gerekliMiktar);
  }

  if (adet < 1) {
    return;
  }

  xpVer(action.skillId, action.xp * adet);
  itemEkle(action.itemId, adet);

  let dakika = Math.floor(gecenSureMs / 60000);
  alert(
    "Hoş geldin! " + dakika + " dakika uzaktaydın.\n" +
    action.isim + " × " + adet + " tamamlandı.\n" +
    "+" + (action.xp * adet) + " XP kazandın."
  );
}