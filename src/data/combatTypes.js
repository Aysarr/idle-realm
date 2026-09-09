// ============================================================
// SAVAŞ TİPLERİ (savaş üçgeni)
//
// Her canavarın bir tipi var. Senin saldırı türün (yakın dövüş
// veya menzilli) o tipe karşı avantajlı, dezavantajlı ya da
// nötr olabilir.
//
// carpanlar: { melee: 1.25, ranged: 0.75 } gibi
//   1.25 = %25 daha çok hasar
//   0.75 = %25 daha az hasar
// ============================================================

export let canavarTipleri = [
  {
    id: "agile",
    isim: "Çevik",
    ikon: "🏃",
    aciklama: "Hızlı ve kaygan. Yakın dövüşte yakalaması zor, ok işler.",
    carpanlar: { melee: 0.8, ranged: 1.3 }
  },
  {
    id: "armored",
    isim: "Zırhlı",
    ikon: "🛡️",
    aciklama: "Kalın zırh. Oklar sekiyor, ağır darbe gerekiyor.",
    carpanlar: { melee: 1.3, ranged: 0.7 }
  },
  {
    id: "beast",
    isim: "Vahşi",
    ikon: "🐾",
    aciklama: "Dengeli bir yaratık. Belirgin bir zayıflığı yok.",
    carpanlar: { melee: 1.0, ranged: 1.0 }
  }
];