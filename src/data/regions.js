// ============================================================
// BÖLGELER
//
// Canavarlar bölgelere ayrılır. Her bölgenin bir savaş seviyesi
// şartı var — düşük seviyede ileri bölgeler kilitli görünür.
//
// Yeni bölge eklemek: buraya bir kayıt yaz, sonra
// monsters.js'te canavarlara o bölgenin id'sini ver.
// ============================================================

export let bolgeler = [
  {
    id: "village",
    isim: "Köy Çevresi",
    ikon: "🏘️",
    aciklama: "Tarlalar ve çitler. Zararsız görünen ama sinsi yaratıklar.",
    gerekliSavasSeviyesi: 1
  },
  {
    id: "forest",
    isim: "Karanlık Orman",
    ikon: "🌲",
    aciklama: "Ağaçların arasında gözler var. Daha güçlü, daha ödüllü.",
    gerekliSavasSeviyesi: 8
  },
  {
    id: "mine",
    isim: "Terk Edilmiş Maden",
    ikon: "🕳️",
    aciklama: "Yıllar önce boşaltılmış galeriler. Karanlıkta bir şeyler kazıyor.",
    gerekliSavasSeviyesi: 20
  }
];