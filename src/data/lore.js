// ============================================================
// HİKAYE VERİSİ
//
// Üç parça:
//   acilisMetni      : yeni oyuna başlayınca gösterilen giriş
//   bolgeAnlatilari  : bir bölge İLK KEZ açıldığında gösterilen metin
//   kronikKayitlari  : ilerledikçe açılan günlük kayıtları
//
// TON: Karanlık bir dünya ama umut var. Sıcak detaylar (ekmek
// kokusu, yanan fener) kasveti dengeliyor.
//
// Oyuncu ADSIZ bir maceracı — kim olduğunu oyuncu hayal ediyor.
// Metinler bu yüzden oyuncuya geçmiş atfetmiyor.
// ============================================================

export let acilisMetni = [
  "Bir zamanlar bu topraklar parlaktı.",

  "Sonra Gölge Diyarı'nın kıyısı yırtıldı ve içinden **Sönüm** sızmaya " +
  "başladı. Bir savaş değil — bir aşınma. Yılda bir tarla, on yılda bir " +
  "yol. Renkler soluyor, demir çabuk paslanıyor, ateş eskisi kadar " +
  "ısıtmıyor.",

  "İnsanlar geri çekildi. Madenciler galerileri bıraktı. Tapınağın " +
  "rahipleri bir sabah ortadan kayboldu. Orman karardı.",

  "Köy bu yolun son yerleşik noktası. Hâlâ ekmek pişiriyorlar. Her akşam " +
  "fenerleri yakıyorlar — Sönüm'ün ışıktan hoşlanmadığını söylüyorlar, " +
  "ama kimse emin değil.",

  "Sen bugün geldin. Kimse neden geldiğini sormadı.",

  "İçeri doğru her adım, kaynağa bir adım daha yakın."
];

// ---------- BÖLGE ANLATILARI ----------
// Bir bölge ilk kez açıldığında bir kez gösterilir.

export let bolgeAnlatilari = {
  village: {
    baslik: "Köy Çevresi",
    satirlar: [
      "Çitler tamir edilmiş, tarlalar sürülmüş. Burada hayat devam ediyor.",
      "Ama kimse gün batımından sonra dışarı çıkmıyor.",
      "Fareler ve goblinler asıl sorun değil — onlar sadece Sönüm'ün " +
      "önünden kaçan şeyler."
    ]
  },

  forest: {
    baslik: "Karanlık Orman",
    satirlar: [
      "Ağaçlar hâlâ ayakta ama yaprakları rengini kaybetmiş. Gri bir yeşil.",
      "Kurtlar buraya yerleşmiş — dışarıda avlanacak bir şey kalmadığı için.",
      "Haydutlar ise insan. Bu onları daha az tehlikeli yapmıyor; " +
      "kaybedecek bir şeyi olmayan insan en tehlikelisidir."
    ]
  },

  mine: {
    baslik: "Terk Edilmiş Maden",
    satirlar: [
      "Girişte hâlâ bir vardiya çizelgesi asılı. Son kayıt on bir yıl önce.",
      "Aletler yerinde bırakılmış — insanlar acele etmiş.",
      "Aşağıda bir şey kazıyor. Ritmi düzenli, bir madencininki gibi. " +
      "Ama kimse o kadar uzun süre çalışamaz."
    ]
  },

  temple: {
    baslik: "Kayıp Tapınak",
    satirlar: [
      "Taş salonlar, adı unutulmuş bir tanrıya adanmış. Duvarlardaki " +
      "yazıtlar hiçbir dile benzemiyor.",
      "Rahipler Sönüm'ü durdurmaya çalışmış. Sunaklardaki izler bunu " +
      "söylüyor — tekrar tekrar denenmiş bir şeyin izleri.",
      "Başaramamışlar. Ama muhafızlar hâlâ nöbette. Onlara kimse " +
      "'artık gerek yok' dememiş."
    ]
  },

  volcano: {
    baslik: "Yanardağ Mağarası",
    satirlar: [
      "Burada Sönüm ilerlemiyor. Isı onu geri itiyor.",
      "Bu yüzden kaçan her şey buraya toplanmış — ve birbirini yemiş. " +
      "Kalanlar en dayanıklı olanlar.",
      "Duvarlardaki kor, dışarıdaki hiçbir ateşin veremediği sıcaklıkta. " +
      "Belki cevap ısıdadır. Belki sadece bir sığınaktır."
    ]
  },

  shadowrealm: {
    baslik: "Gölge Diyarı",
    satirlar: [
      "Yırtığın kendisi. Işık buraya giriyor ama çıkmıyor.",
      "Burada zaman da soluyor. Ne kadar kaldığını bilemezsin.",
      "Bir şey seni bekliyor — aceleyle değil, sabırla. Sönüm'ün " +
      "sabrı var; on bir yıldır bir vadiyi yutmakla meşgul.",
      "Fenerler burada yanmıyor. Ama sen yine de bir tane getirdin, " +
      "değil mi?"
    ]
  }
};

// ---------- KRONİK KAYITLARI ----------
//
// İlerledikçe açılan günlük. Her kaydın bir açılma koşulu var.
//
// kosul türleri:
//   savasSeviyesi  : savaş seviyesi >= deger
//   skillSeviyesi  : skillId seviyesi >= deger
//   istatistik     : state.istatistik[alan] >= deger
//   bolge          : o bölge açılmış mı
//   clan           : clan seviyesi >= deger

export let kronikKayitlari = [
  {
    id: "k_varis",
    baslik: "Varış",
    ikon: "🚪",
    kosul: { tur: "istatistik", alan: "toplananKaynak", deger: 1 },
    metin:
      "Köyün girişinde bir tabela var: 'Yolcu, buradan sonrası senin " +
      "sorumluluğunda.'\n\n" +
      "Altına biri kömürle eklemiş: 'Burası da öyle.'"
  },
  {
    id: "k_fenerler",
    baslik: "Fenerciler",
    ikon: "🏮",
    kosul: { tur: "istatistik", alan: "toplananKaynak", deger: 100 },
    metin:
      "Köyde üç kişi her akşam fenerleri yakmakla görevli. Sırayla " +
      "nöbet tutuyorlar, yirmi yıldır aksatmadan.\n\n" +
      "Sönüm'ün ışıktan çekindiğine dair hiçbir kanıt yok. Ama " +
      "fenerler yandığı sürece köy de duruyor. Belki kanıt bu."
  },
  {
    id: "k_ilk_kan",
    baslik: "İlk Kan",
    ikon: "🗡️",
    kosul: { tur: "istatistik", alan: "oldurulenCanavar", deger: 10 },
    metin:
      "Goblinlerin zırhları ilginç: paslı, ama bizim demirimizden değil. " +
      "Daha eski bir metal, daha iyi işlenmiş.\n\n" +
      "Onlar da bir yerden kaçıyor. Bizden önce ve bizden daha uzun " +
      "süredir."
  },
  {
    id: "k_solmus_orman",
    baslik: "Solmuş Orman",
    ikon: "🌲",
    kosul: { tur: "skillSeviyesi", skillId: "woodcutting", deger: 16 },
    metin:
      "Meşenin içi hâlâ sağlam. Dış kabuk gri ama çekirdek canlı.\n\n" +
      "Oduncular buna 'inat' diyor. Ağaç en dışını kurban ediyor ki " +
      "içi yaşasın. Bazı insanlar da böyle yapıyor."
  },
  {
    id: "k_vardiya",
    baslik: "Son Vardiya",
    ikon: "⛏️",
    kosul: { tur: "bolge", bolgeId: "mine" },
    metin:
      "Madenin girişindeki çizelgede son vardiyanın adları yazılı. " +
      "Yirmi iki isim. On bir yıl önce.\n\n" +
      "Yirmi biri köye dönmüş. Biri dönmemiş. Adı silinmiş — " +
      "ama kazıyarak değil, kendiliğinden solmuş gibi."
  },
  {
    id: "k_golge_madenci",
    baslik: "Aşağıdaki",
    ikon: "🌑",
    kosul: { tur: "istatistik", alan: "oldurulenCanavar", deger: 300 },
    metin:
      "Aşağıdaki hâlâ kazıyor. Kazmasını bırakmıyor, savaşırken bile.\n\n" +
      "Belki hiç fark etmedi. Belki vardiyası bitmedi diye düşünüyor. " +
      "Bu ikisi arasında pek fark yok."
  },
  {
    id: "k_zanaat",
    baslik: "Zanaatın Değeri",
    ikon: "🔨",
    kosul: { tur: "skillSeviyesi", skillId: "smithing", deger: 30 },
    metin:
      "Çeliği dövmek demiri dövmekten farklı. Daha çok ısı, daha çok " +
      "vuruş, daha çok sabır.\n\n" +
      "Köyün demircisi şöyle diyor: 'Sönüm her şeyi yavaşça bozuyor. " +
      "Biz de her şeyi yavaşça yapıyoruz. Görelim kim daha sabırlı.'"
  },
  {
    id: "k_tapinak",
    baslik: "Boş Sunaklar",
    ikon: "🏛️",
    kosul: { tur: "bolge", bolgeId: "temple" },
    metin:
      "Tapınakta on iki sunak var. Hepsinin üzerinde aynı iz: bir şey " +
      "tekrar tekrar yakılmış, her seferinde daha büyüğü.\n\n" +
      "Sonuncusu bir insan boyundaydı. Ondan sonra iz yok.\n\n" +
      "Ya işe yaradı ya da denemeye devam edecek kimse kalmadı."
  },
  {
    id: "k_bekci",
    baslik: "Nöbetçi",
    ikon: "🛡️",
    kosul: { tur: "savasSeviyesi", deger: 45 },
    metin:
      "Tapınak Bekçisi sana saldırmadan önce bir şey söylüyor. " +
      "Anlamıyorsun — o dil öldü.\n\n" +
      "Ama tonu tanıdık: bir uyarı. Belki 'geri dön'. Belki " +
      "'sen de mi'. Belki sadece bir şifre, cevabını bilmediğin."
  },
  {
    id: "k_atesin_siniri",
    baslik: "Ateşin Sınırı",
    ikon: "🌋",
    kosul: { tur: "bolge", bolgeId: "volcano" },
    metin:
      "Yanardağın ağzında Sönüm duruyor. İleri gitmiyor. " +
      "İlk kez bir şeyin onu durdurduğunu görüyorsun.\n\n" +
      "Isı mı, derinlik mi, yoksa buranın çok eski olması mı — " +
      "bilinmiyor. Ama bir zayıflık var.\n\n" +
      "Bunu köye anlatmalısın. Eğer dönersen."
  },
  {
    id: "k_clan",
    baslik: "Kalanlar",
    ikon: "🛡️",
    kosul: { tur: "clan", deger: 3 },
    metin:
      "Bir clan kurmak burada ne demek: aynı depoyu paylaşmak, " +
      "aynı fenerden yakmak, birinin dönmediğini fark etmek.\n\n" +
      "Sönüm yavaş. İnsanlar hızlı unutuyor. Clan, unutmamak için " +
      "kurulan şeydir."
  },
  {
    id: "k_ustalik",
    baslik: "Tekrarın Hikmeti",
    ikon: "⭐",
    kosul: { tur: "istatistik", alan: "ustalikSeviyeAtlama", deger: 50 },
    metin:
      "Aynı ağacı bin kez kesince bir şey oluyor: artık düşünmüyorsun. " +
      "El biliyor.\n\n" +
      "Yaşlı bir balıkçı bunu şöyle açıkladı: 'Sönüm dikkati emiyor. " +
      "Düşünerek yaptığın iş yavaşlar. Elin bildiği iş yavaşlamaz.'\n\n" +
      "Bilimsel değil. Ama işe yarıyor gibi."
  },
  {
    id: "k_golge_diyari",
    baslik: "Yırtık",
    ikon: "🌑",
    kosul: { tur: "bolge", bolgeId: "shadowrealm" },
    metin:
      "Yırtığın kenarında durunca anlıyorsun: bu bir delik değil, " +
      "bir yara. Ve yaralar kapanır.\n\n" +
      "Kapanmıyorsa, bir şey açık tutuyordur."
  },
  {
    id: "k_lord",
    baslik: "Sabır",
    ikon: "👤",
    kosul: { tur: "savasSeviyesi", deger: 75 },
    metin:
      "Gölge Lordu acele etmiyor. Hiç etmemiş.\n\n" +
      "On bir yılda bir vadi. Yüz yılda bir krallık. Zamanı var — " +
      "ya da zamanın dışında.\n\n" +
      "Ama sen buraya on bir yılda gelmedin. Daha hızlısın. " +
      "Belki tek avantajın bu."
  },
  {
    id: "k_fener",
    baslik: "Getirdiğin Fener",
    ikon: "🏮",
    kosul: { tur: "savasSeviyesi", deger: 90 },
    metin:
      "Köyden çıkarken yanına bir fener aldın. Kimse söylemedi, " +
      "kendin aldın.\n\n" +
      "Burada yanmıyor. Ama sönmüyor da.\n\n" +
      "Fenercilerin yirmi yıldır bildiği şey buydu belki: " +
      "önemli olan ışık değil, taşımaya devam etmek."
  }
];