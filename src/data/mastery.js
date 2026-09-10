// ============================================================
// USTALIK KİLOMETRE TAŞLARI
//
// Her AKSİYONUN kendi ustalık seviyesi var. Belirli eşiklerde
// kalıcı bonuslar açılır — sadece o aksiyon için geçerli.
//
// Bu sistem geç oyunun bel kemiği: Sv 99'a ulaşan oyuncunun
// önünde hâlâ 15 aksiyonu ustalaştırma hedefi vardır.
//
// tur alanları:
//   hiz       : aksiyon süresini kısaltır (oran kadar)
//   ciftUrun  : çift ürün şansı ekler
//   xp        : o aksiyondan alınan XP'yi artırır
// ============================================================

export let ustalikTaslari = [
  {
    seviye: 10,
    tur: "hiz",
    deger: 0.05,
    isim: "Alışkanlık",
    aciklama: "Bu aksiyon %5 hızlanır"
  },
  {
    seviye: 25,
    tur: "ciftUrun",
    deger: 0.05,
    isim: "Beceri",
    aciklama: "%5 çift ürün şansı"
  },
  {
    seviye: 40,
    tur: "hiz",
    deger: 0.10,
    isim: "Akıcılık",
    aciklama: "Bu aksiyon %10 daha hızlanır"
  },
  {
    seviye: 60,
    tur: "ciftUrun",
    deger: 0.07,
    isim: "Ustalık",
    aciklama: "Çift ürün şansı %7 daha artar"
  },
  {
    seviye: 80,
    tur: "hiz",
    deger: 0.10,
    isim: "Kusursuzluk",
    aciklama: "Bu aksiyon %10 daha hızlanır"
  },
  {
    seviye: 99,
    tur: "xp",
    deger: 0.25,
    isim: "Efsane",
    aciklama: "Bu aksiyondan %25 ekstra XP"
  }
];

// Hız bonuslarının üst sınırı (ustalık + clan + alet toplamı)
export const MAX_HIZ_INDIRIMI = 0.6;