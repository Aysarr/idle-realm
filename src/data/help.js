// ============================================================
// YARDIM METİNLERİ
//
// Her sayfanın "?" butonuna basınca açılan bilgi paneli.
// Yeni bir sayfa eklediğinde buraya bir kayıt yaz, arayüz kodu
// değişmesin. Anahtar (character, mining vb.) sekme id'siyle aynı olmalı.
//
// YAZIM KURALI: Metinleri MEKANİK üzerine yaz, mevcut içerik
// listesi üzerine değil. "Bakır kazarsın" yerine "cevher kazarsın"
// de ki yeni cevherler eklendiğinde metin eskimesin.
// ============================================================

export let yardimlar = {
  // ---------- GENEL SAYFALAR ----------

  character: {
    ozet: "Karakterinin gücünü buradan görür ve ekipmanını buradan yönetirsin.",
    bolumler: [
      {
        baslik: "Bu sayfada ne var",
        satirlar: [
          "Üstteki kutular toplam gücünü özetler: isabet, hasar, kaçınma, can.",
          "Savaş yeteneklerinin seviyeleri ve ilerlemeleri listelenir.",
          "Ekipman ızgarasından eşya kuşanır ve çıkarırsın.",
          "Otomatik yemek ayarını buradan yaparsın."
        ]
      },
      {
        baslik: "Ekipman nasıl çalışır",
        satirlar: [
          "Boş bir slota tıkla — o slota takabileceğin eşyalar altta listelenir.",
          "Dolu bir slota tıklarsan eşya çıkar ve envantere döner.",
          "Ok ve Yemek slotları farklıdır: adet tutarlar, kuşandığında elindekilerin hepsi takılır."
        ]
      }
    ],
    ipuclari: [
      "Zırh iki iş birden yapar: kaçınmanı artırır ve gelen hasarı azaltır.",
      "Silahların saldırı hızı farklıdır — yavaş silah daha sert vurur ama daha seyrek."
    ]
  },

  inventory: {
    ozet: "Topladığın, ürettiğin ve düşmanlardan aldığın her şey burada birikir.",
    bolumler: [
      {
        baslik: "Bu sayfada ne var",
        satirlar: [
          "Sahip olduğun tüm eşyalar ve adetleri listelenir.",
          "Eşyanın altındaki yazı ne işe yaradığını söyler (hasar, savunma, iyileştirme gibi).",
          "Kuşanılan eşyalar envanterde görünmez — onlar Karakter sayfasındaki slotlardadır."
        ]
      },

            {
        baslik: "Sekmeler",
        satirlar: [
          "Sekmeler tamamen düzenleme içindir; kapasiteyi etkilemezler.",
          "Bir eşyanın ikonuna dokunup sonra bir sekmeye dokunarak o sekmenin ikonunu değiştirebilirsin.",
          "Açabileceğin sekme sayısı sınırlıdır — ileride bu sınır artırılabilir."
        ]
      }
    ],
    ipuclari: [
      "İşine yaramayan eşyaları Dükkân'da satıp altına çevirebilirsin.",
      "Bir üretim tarifi için malzemen var mı diye bakmak istiyorsan, ilgili yetenek sayfasında zaten yazıyor."
    ]
  },

  shop: {
    ozet: "Altınla eşya alır, işine yaramayanları satarsın.",
    bolumler: [
      {
        baslik: "Bu sayfada ne var",
        satirlar: [
          "Satın Al bölümünde altınla alabileceğin eşyalar listelenir.",
          "Sat bölümünde envanterindeki her şeyi teker teker veya toptan satabilirsin.",
          "Altını çoğunlukla savaştan ve fazla malzeme satarak kazanırsın."
        ]
      },
      {
        baslik: "Aletler",
        satirlar: [
          "Balta, Kazma ve Olta kademeli olarak yükseltilir.",
          "Aletler hız vermez — bazı üst kademe aksiyonları açarlar.",
          "Ayrıca çift ürün şansı verirler: bir aksiyonda iki ürün çıkabilir.",
          "Yükseltmek için hem altın hem ilgili yetenek seviyesi gerekir."
        ]
      }
    ],
    ipuclari: [
      "Satın alma fiyatı satış fiyatından her zaman yüksektir — al-sat yaparak altın kazanamazsın.",
      "Dükkândaki bazı eşyalar üretilemez, sadece satın alınır."
    ]
  },

  settings: {
    ozet: "Kayıt yönetimi ve oyun ayarları.",
    bolumler: [
      {
        baslik: "Kaydın nerede duruyor",
        satirlar: [
          "İlerlemen bu tarayıcının hafızasında saklanır, bir sunucuda değil.",
          "Tarayıcı verilerini temizlersen kaydın da silinir.",
          "Farklı bir tarayıcı veya cihazda oynarsan kaydın orada olmaz."
        ]
      },
      {
        baslik: "Yedekleme",
        satirlar: [
          "Dışa Aktar, tüm ilerlemeni uzun bir metne çevirir.",
          "O metni bir yere kaydedip başka cihazda İçe Aktar ile geri yükleyebilirsin.",
          "İçe aktarma mevcut ilerlemenin üzerine yazar."
        ]
      }
    ],
    ipuclari: [
      "Önemli bir aşamaya geldiğinde yedek almayı alışkanlık edin.",
      "Sıfırlamadan önce yedek al — fikrini değiştirirsen geri dönebilirsin."
    ]
  },

    clan: {
    ozet: "Clan kurup kaynak bağışlayarak tüm üyelere fayda sağlayan bonuslar açarsın.",
    bolumler: [
      {
        baslik: "Nasıl çalışır",
        satirlar: [
          "Envanterindeki fazla malzemeleri clan deposuna bağışlarsın.",
          "Her bağış clan puanı kazandırır, puan birikince clan seviye atlar.",
          "Clan seviyesi belirli eşiklere ulaşınca kalıcı bonuslar açılır.",
          "Ekipmanlar bağışlanamaz — sadece malzemeler."
        ]
      },
      {
        baslik: "Bonuslar hakkında",
        satirlar: [
          "Bonuslar bilinçli olarak mütevazı tutuldu.",
          "Clansız oynayan biri geri kalmaz, sadece biraz yavaş ilerler.",
          "Amaç zorunluluk değil, fazla kaynağa anlam katmak."
        ]
      },
      {
        baslik: "Çevrimiçi durumu",
        satirlar: [
          "Şu an clan sadece sana ait — tek üyesi sensin.",
          "Sunucu altyapısı hazır olduğunda arkadaşların katılabilecek.",
          "Bağışların ve clan seviyen o zaman da korunacak."
        ]
      }
    ],
    ipuclari: [
      "Kemik gibi biriken ama işe yaramayan malzemeler bağış için idealdir.",
      "Satmak mı bağışlamak mı daha iyi? Altına ihtiyacın varsa sat, yoksa bağışla."
    ]
  },

    stats: {
    ozet: "Karakterin ve oyun boyunca yaptıkların.",
    bolumler: [
      {
        baslik: "Ne işe yarar",
        satirlar: [
          "Buradaki sayaçlar oyun boyunca birikir ve hiç sıfırlanmaz.",
          "İleride başarımlar ve clan katkısı bu sayaçların üstüne kurulacak.",
          "Karakter adını buradan değiştirebilirsin."
        ]
      }
    ],
    ipuclari: [
      "Adın ileride online özelliklerde diğer oyunculara görünecek."
    ]
  },

  combat: {
    ozet: "Canavarlarla dövüşerek savaş yeteneklerini geliştirir, altın ve nadir eşya kazanırsın.",
    bolumler: [
      {
        baslik: "Savaş nasıl işler",
        satirlar: [
          "Sen ve canavar, her biri kendi saldırı hızına göre bağımsız vurur.",
          "Her vuruşta önce isabet zarı atılır: isabet puanın canavarın kaçınmasıyla karşılaştırılır.",
          "Vuruş tutarsa hasarın uygulanır. Canavar ölünce yenisi gelir, savaş kendiliğinden sürer.",
          "Canın biterse savaş durur ve canın 1'e düşer."
        ]
      },
      {
        baslik: "Savaş stili",
        satirlar: [
          "Üstteki üç kutudan hangisini seçersen, kazandığın XP o yeteneğe gider.",
          "Sağlık her durumda otomatik olarak biraz XP alır.",
          "Yay kuşanırsan stil otomatik olarak Menzilli'ye geçer ve her vuruş bir ok harcar."
        ]
      },
            {
        baslik: "Savaş üçgeni",
        satirlar: [
          "Her canavarın bir tipi vardır ve senin saldırı türüne farklı tepki verir.",
          "Çevik canavarlar oka zayıf, yakın dövüşe dayanıklıdır.",
          "Zırhlı canavarlar tam tersi: ok sekiyor, ağır darbe işliyor.",
          "Canavar kartındaki yeşil ▲ avantajlı, kırmızı ▼ dezavantajlı olduğunu gösterir.",
          "Bu yüzden yanında hem kılıç hem yay taşımak işine yarar."
        ]
      },

            {
        baslik: "Savaş seviyesi",
        satirlar: [
          "Savunma ve Sağlık her zaman sayılır — dayanıklılık herkesin işine yarar.",
          "Saldırı tarafında ise yakın dövüş ile menzilliden GÜÇLÜ OLANI sayılır.",
          "Yani tek bir yolda uzmanlaşmak seni geride bırakmaz.",
          "Bölge kilitleri savaş seviyesine bakar."
        ]
      },
      {
        baslik: "Hayatta kalmak",
        satirlar: [
          "Yemek slotundaki yiyeceği elle veya otomatik yiyebilirsin.",
          "Savaş dışında canın yavaşça kendiliğinden yenilenir.",
          "Canavar kartında sana kaç hasar vereceği ve isabet şansları yazar — girmeden önce bak."
        ]
      }
    ],
    ipuclari: [
      "Oyunu kapatsan bile savaş arka planda devam eder; döndüğünde ne olduğunun özetini görürsün.",
      "Okun veya yemeğin biterse offline savaş orada durur — gitmeden önce stok yap."
    ]
  },

    achievements: {
    ozet: "Oyun boyunca yaptıklarının karşılığı olan hedefler ve ödüller.",
    bolumler: [
      {
        baslik: "Nasıl çalışır",
        satirlar: [
          "Başarımlar istatistik sayaçlarına bağlıdır — ayrıca uğraşman gerekmez.",
          "Eşiği geçtiğin anda kendiliğinden açılır ve ödülü verilir.",
          "Bir seri tamamlanınca bir sonraki basamak listede belirir."
        ]
      },
      {
        baslik: "Gizli başarımlar",
        satirlar: [
          "Bazı başarımlar açılana kadar '❓' olarak görünür.",
          "Bunlar için özel bir şey yapman gerekmez, oynarken açılırlar."
        ]
      }
    ],
    ipuclari: [
      "Ödüller çoğunlukla altındır — dükkânda işine yarar.",
      "Sebat başarımları sadece oyunda kalmakla açılır."
    ]
  },

  // ---------- SAVAŞ YETENEKLERİ ----------

  attack: {
    ozet: "İSABET. Yakın dövüşte vuruşunun tutma şansını belirler.",
    bolumler: [
      {
        baslik: "Ne işe yarar",
        satirlar: [
          "Her seviye isabet puanını artırır.",
          "İsabet şansın, isabet puanının canavarın kaçınmasıyla oranıdır.",
          "Çevik canavarlara vurabilmek için gerekli — hasarın ne kadar yüksek olursa olsun, ıskalarsan işe yaramaz."
        ]
      }
    ],
    ipuclari: [
      "Saldırı stiliyle dövüşerek XP kazanırsın.",
      "Silahların ve bazı eşyaların isabet bonusu vardır."
    ]
  },

  strength: {
    ozet: "HASAR. Vuruşun tuttuğunda ne kadar acıttığını belirler.",
    bolumler: [
      {
        baslik: "Ne işe yarar",
        satirlar: [
          "Her seviye yakın dövüş hasarını artırır — savaştaki en büyük hasar kaynağıdır.",
          "Tek başına yeterli değildir: isabet edemezsen hasarın hiç uygulanmaz."
        ]
      }
    ],
    ipuclari: [
      "Kuvvet stiliyle dövüşerek XP kazanırsın.",
      "Saldırı ile Kuvvet'i dengeli geliştirmek, tek birine yüklenmekten daha verimlidir."
    ]
  },

  defence: {
    ozet: "KAÇINMA. Canavarın vuruşunu savuşturma şansını artırır.",
    bolumler: [
      {
        baslik: "Ne işe yarar",
        satirlar: [
          "Her seviye kaçınma puanını artırır; kaçınma yükseldikçe canavar daha çok ıskalar.",
          "Zırhların savunma bonusu da kaçınmaya eklenir.",
          "Zırh ayrıca gelen hasarı doğrudan azaltır — bu, kaçınmadan bağımsız ikinci bir korumadır."
        ]
      }
    ],
    ipuclari: [
      "Savunma stiliyle dövüşerek XP kazanırsın.",
      "Savunmaya yatırım yapmak canavarları yavaş öldürtür ama yemek harcamanı ciddi şekilde azaltır."
    ]
  },

  hitpoints: {
    ozet: "CAN. Maksimum canını belirler.",
    bolumler: [
      {
        baslik: "Ne işe yarar",
        satirlar: [
          "Her seviye maksimum canını artırır.",
          "Ayrı bir stil seçmene gerek yok: her canavar öldürdüğünde otomatik XP kazanır."
        ]
      }
    ],
    ipuclari: [
      "Canın yüksekse otomatik yemek eşiğini daha düşük tutabilirsin, yemek tasarrufu olur."
    ]
  },

  ranged: {
    ozet: "MENZİLLİ. Yay kullanırken hem isabetini hem hasarını tek başına belirler.",
    bolumler: [
      {
        baslik: "Ne işe yarar",
        satirlar: [
          "Yay kuşandığında yakın dövüş yetenekleri devre dışı kalır, her şey bu yeteneğe bağlanır.",
          "Yakın dövüşte iki yetenek geliştirmen gerekirken burada bir tane yeterli.",
          "Karşılığında her vuruş bir ok harcar — ıskalasan bile."
        ]
      }
    ],
    ipuclari: [
      "Ok üretimi birden fazla yeteneği birbirine bağlar; okun bitmeden stok yapmayı alışkanlık edin.",
      "Yaylar genelde yavaştır ama vuruş başına daha çok iş görür."
    ]
  },

  // ---------- TOPLAMA YETENEKLERİ ----------

  woodcutting: {
    ozet: "Ağaç keserek odun toplarsın. Odun, birçok üretim zincirinin başlangıcıdır.",
    bolumler: [
      {
        baslik: "Nasıl çalışır",
        satirlar: [
          "Bir aksiyon seç ve Başlat'a bas — durdurana kadar kendiliğinden tekrarlanır.",
          "Malzeme gerektirmez, doğrudan üretir.",
          "Bazı aksiyonlarda şansa bağlı yan ürünler de düşer."
        ]
      },

    ],
    ipuclari: [
      "Odun hem yakıt hem de zanaat malzemesidir; hiçbir zaman fazla gelmez.",
      "Seviye atladıkça daha değerli ağaçlar açılır."
    ]
  },

  mining: {
    ozet: "Cevher kazarsın. Cevherler Demircilik'in ana girdisidir.",
    bolumler: [
      {
        baslik: "Nasıl çalışır",
        satirlar: [
          "Bir aksiyon seç ve Başlat'a bas — durdurana kadar kendiliğinden tekrarlanır.",
          "Malzeme gerektirmez, doğrudan üretir.",
          "Kazdığın cevher, ekipman ve mühimmat üretiminin temelidir."
        ]
      }
    ],
    ipuclari: [
      "Demircilik cevherin yanında yakıt da ister — kazmadan önce yakıt stokunu kontrol et."
    ]
  },

  fishing: {
    ozet: "Balık tutarsın. Balık, Aşçılık'ta pişirilerek yemeğe dönüşür.",
    bolumler: [
      {
        baslik: "Nasıl çalışır",
        satirlar: [
          "Bir aksiyon seç ve Başlat'a bas — durdurana kadar kendiliğinden tekrarlanır.",
          "Çiğ balık doğrudan yenmez; önce pişirilmesi gerekir."
        ]
      }
    ],
    ipuclari: [
      "Savaşa gitmeden önce yemek stoku yapmak, uzun offline savaşların anahtarıdır."
    ]
  },

  // ---------- ÜRETİM YETENEKLERİ ----------

  firemaking: {
    ozet: "Odunu yakarak yakıt üretirsin. Yakıt, metal işlemek için gereklidir.",
    bolumler: [
      {
        baslik: "Nasıl çalışır",
        satirlar: [
          "Bu bir üretim yeteneğidir: girdi tüketir, çıktı üretir.",
          "Elinde yeterli malzeme yoksa aksiyon başlamaz; bittiğinde kendiliğinden durur.",
          "Kartlarda gerekli malzemeler yeşil (yeterli) veya kırmızı (eksik) olarak gösterilir."
        ]
      }
    ],
    ipuclari: [
      "Yakıt üretimi zincirin dar boğazı olabilir; Demircilik yapmadan önce yeterince biriktir."
    ]
  },

  cooking: {
    ozet: "Çiğ yiyecekleri pişirirsin. Pişmiş yemek savaşta canını yeniler.",
    bolumler: [
      {
        baslik: "Nasıl çalışır",
        satirlar: [
          "Bu bir üretim yeteneğidir: girdi tüketir, çıktı üretir.",
          "Ürettiğin yemeği Karakter sayfasındaki Yemek slotuna takman gerekir.",
          "Slottaki yemek elle veya otomatik olarak yenir."
        ]
      }
    ],
    ipuclari: [
      "Otomatik yemek eşiğini Karakter sayfasından ayarlayabilirsin.",
      "Yemek stoğun biterse offline savaş erken durur."
    ]
  },

  smithing: {
    ozet: "Cevher ve yakıtı işleyerek ekipman ve mühimmat üretirsin.",
    bolumler: [
      {
        baslik: "Nasıl çalışır",
        satirlar: [
          "Bu bir üretim yeteneğidir: girdi tüketir, çıktı üretir.",
          "Çoğu tarif hem cevher hem yakıt ister.",
          "Ürettiğin ekipmanı Karakter sayfasından kuşanman gerekir."
        ]
      }
    ],
    ipuclari: [
      "Kilitli tarifler de listede görünür — bir sonraki hedefini oradan görebilirsin.",
      "Ürettiğin bazı parçalar doğrudan kullanılmaz, başka bir yetenekte hammadde olur."
    ]
  },

  fletching: {
    ozet: "Odun ve tüyden yay ve ok üretirsin. Menzilli savaşın temelidir.",
    bolumler: [
      {
        baslik: "Nasıl çalışır",
        satirlar: [
          "Bu bir üretim yeteneğidir: girdi tüketir, çıktı üretir.",
          "Ok üretimi birden fazla adımdan oluşur ve başka yeteneklerden malzeme ister.",
          "Ürettiğin oku Karakter sayfasındaki Ok slotuna takman gerekir."
        ]
      },
      {
        baslik: "Neden birden fazla yetenek",
        satirlar: [
          "Ok gövdesi için odun ve tüy gerekir — tüy hem savaştan hem toplama sırasında düşer.",
          "Ok ucu Demircilik ister.",
          "Bu yüzden menzilli savaş, oyunun en çok yeteneği birbirine bağlayan yoludur."
        ]
      }
    ],
    ipuclari: [
      "Yayla dövüşürken her vuruş ok harcar; uzun bir seansa çıkmadan önce bolca üret."
    ]
  }
};


// ============================================================
// ORTAK BÖLÜMLER
//
// Ustalık her toplama/üretim yeteneğinde aynı şekilde çalışır.
// Metni tek yerde tutup ilgili sayfalara otomatik ekliyoruz —
// böylece yeni bir yetenek eklediğinde açıklamayı unutmuş olmuyorsun.
// ============================================================

export let ustalikBolumu = {
  baslik: "⭐ Ustalık",
  satirlar: [
    "Her aksiyonun, yetenek seviyesinden ayrı bir ustalık seviyesi vardır.",
    "Bir aksiyonu tekrar tekrar yaptıkça o işte ustalaşırsın.",
    "Her 10 ustalık seviyesinde o aksiyon %5 hızlanır, en fazla %40.",
    "Bu yüzden düşük seviyeli aksiyonlar da değerini korur."
  ]
};