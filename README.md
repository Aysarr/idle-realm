# Everforge

Melvor Idle / IdleRPG tarzı, tarayıcıda çalışan bir idle RPG.
Saf HTML + CSS + JavaScript — derleme aracı, bağımlılık yok.

## Çalıştırma

VS Code'da **Live Server** eklentisiyle `index.html`'i aç.
(Doğrudan çift tıklamak çalışmaz — `import`/`export` bir sunucu gerektirir.)

## Klasör Yapısı

```
everforge/
  index.html          Sayfa iskeleti
  style.css           Tüm görsel tasarım
  manifest.json       PWA ayarları (telefona kurulabilmesi için)
  icon.png            Uygulama ikonu

  src/
    game.js           Giriş noktası — butonları bağlar, menüyü açar
    menu.js           Açılış menüsü, oyunu başlatma
    state.js          Oyunun DEĞİŞEN tüm verisi (tek obje)
    core.js           Hesaplamalar — ekrana hiç dokunmaz
    gameplay.js       Oyuncunun yaptıkları (aksiyon, savaş, alışveriş)
    ui.js             Ekran çizimi — oyun mantığını değiştirmez
    save.js           Kayıt, yükleme, offline ilerleme
    notify.js         Bildirimler

    data/             SAF VERİ — buraya yazarak içerik eklenir
      skills.js       Yetenekler
      actions.js      Aksiyonlar (tarifler)
      items.js        Eşyalar
      monsters.js     Canavarlar
      regions.js      Bölgeler
      combatTypes.js  Savaş üçgeni tipleri
      slots.js        Ekipman slotları
      shop.js         Dükkân ürünleri
      clan.js         Clan ayarları ve bonusları
      achievements.js Başarımlar
      help.js         Yardım metinleri
```

## Mimari Kuralı

Bağımlılıklar **tek yönlü** akar:

```
data/  →  state.js  →  core.js  →  ui.js  →  gameplay.js  →  game.js
                          ↑                        │
                          └────────────────────────┘
```

- `core.js` ekrana dokunmaz, `ui.js` oyun mantığını değiştirmez.
- Butonlar `window` üzerinden çalışır (`game.js`'te bağlanır) — bu sayede
  `ui.js` `gameplay.js`'i import etmek zorunda kalmaz, döngüsel bağımlılık olmaz.

## İçerik Eklemek

Çoğu şey için **sadece `data/` klasörüne yazman yeterli**, kod değişmez:

| Ne eklemek istiyorsun | Nereye |
|---|---|
| Yeni yetenek | `skills.js` + `help.js` |
| Yeni aksiyon/tarif | `actions.js` |
| Yeni eşya | `items.js` |
| Yeni canavar | `monsters.js` |
| Yeni bölge | `regions.js` |
| Yeni başarım | `achievements.js` |
| Yeni dükkân ürünü | `shop.js` |

### Aksiyon formatı

```javascript
{
  id: "benzersiz_id",
  isim: "Ekranda görünecek ad",
  skillId: "woodcutting",
  seviyeGerekli: 10,              // yazılmazsa 1
  sureMs: 3000,
  xp: 10,
  girdiler: [                      // yazılmazsa bedava toplama
    { itemId: "log_normal", miktar: 2 }
  ],
  ciktilar: [
    { itemId: "coal", miktar: 1 }
  ],
  sansliCiktilar: [                // isteğe bağlı yan ürün
    { itemId: "feather", miktar: 1, sans: 0.05 }
  ]
}
```

### Eşya formatı

```javascript
{
  id: "bronze_sword",
  isim: "Bronz Kılıç",
  ikon: "🗡️",
  slot: "weapon",                  // kuşanılabilirse
  saldiriBonusu: 4,
  isabetBonusu: 6,
  savunmaBonusu: 0,
  hizMs: 2400,                     // silahsa
  okGerektirir: true,              // yaysa
  iyilestirme: 8,                  // yemekse
  gereksinimler: [                 // seviye şartı
    { skillId: "ranged", seviye: 5 }
  ],
  satisFiyati: 12
}
```

## Kalıcı Veri Eklemek

1. `state.js` içinde alanı tanımla
2. `state.js` sonundaki `KAYDEDILECEK_ALANLAR` listesine adını yaz

Bu kadar. `save.js` listeyi otomatik dolaşıyor.

## Sistemler

**XP eğrisi** — RuneScape formülü. 99. seviye 13 milyon XP.

**Ustalık** — Her aksiyonun ayrı seviyesi. Her 10 seviyede %5 hız, en fazla %40.

**Savaş** — İsabet/kaçınma oranı `saldıran / (saldıran + savunan)`. İki taraf
kendi hızına göre bağımsız vurur. Savaş üçgeni hasarı çarpanla değiştirir.

**Savaş seviyesi** — Savunma+Sağlık temeli, artı yakın dövüş ile menzilliden
güçlü olanı. Uzmanlaşmak cezalandırılmaz.

**Envanter** — Kapasite eşya *çeşidini* sayar, yığın boyutu sınırsız.
Sekmeler sadece düzenleme içindir, kapasiteyi etkilemez.

**Clan** — Aktivite yaparken düşen Clan Nişanı bağışlanır, clan seviyesi artar,
tüm üyelere pasif bonus verir. Şu an tek kişilik; sunucu altyapısı hazır olunca
gerçek üyeler katılacak.

**Offline** — Hem toplama hem savaş arka planda ilerler. Savaş, olay tabanlı
bir simülasyonla hesaplanır (ıskalama, ok/yemek tüketimi, ölüm dahil).

## Notlar

- Kayıt `localStorage`'da tutulur. Ayarlar sayfasından yedek alınabilir.
- `KAYIT_SURUMU` değiştiğinde `kayitGocu()` içine dönüşüm yazılmalı.
- Denge sayıları tamamen `data/` klasöründedir; kod değiştirmeden ayarlanabilir.
