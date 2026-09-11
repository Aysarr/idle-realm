// ============================================================
// BÖLGELER
//
// Canavarlar bölgelere ayrılır. Her bölgenin bir savaş seviyesi
// şartı var — düşük seviyede ileri bölgeler kilitli görünür.
//
// HEDEF EKİPMAN: her bölge belirli bir zırh kademesi için
// tasarlandı. Bir kademe düşükse zorlanırsın, bir kademe
// yüksekse kolay gelir.
//
//   Köy Çevresi      -> Bronz
//   Karanlık Orman   -> Demir
//   Terk Edilmiş Maden -> Çelik
//   Kayıp Tapınak    -> Mithril
//   Yanardağ Mağarası -> Adamantit
//   Gölge Diyarı     -> Obsidyen
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
  },
  {
    id: "temple",
    isim: "Kayıp Tapınak",
    ikon: "🏛️",
    aciklama: "Ormanın derinliğinde, adı unutulmuş bir tanrıya adanmış taş salonlar.",
    gerekliSavasSeviyesi: 38
  },
  {
    id: "volcano",
    isim: "Yanardağ Mağarası",
    ikon: "🌋",
    aciklama: "Duvarlar sıcak, hava kükürt kokuyor. Burada yaşayan şeyler ateşten korkmuyor.",
    gerekliSavasSeviyesi: 52
  },
  {
    id: "shadowrealm",
    isim: "Gölge Diyarı",
    ikon: "🌑",
    aciklama: "Işığın ulaşmadığı bir yer. Buraya gelenlerin çoğu dönmedi.",
    gerekliSavasSeviyesi: 66
  }
];