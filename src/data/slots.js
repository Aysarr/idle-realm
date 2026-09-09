// Ekipman slotlarının tanımı ve ızgaradaki yerleşimi.
// yiginMi: true olan slotlar adet tutar (ok, yemek gibi).

export let ekipmanSlotlari = [
  { id: "helmet", isim: "Kask", bosIkon: "🪖" },
  { id: "ammo", isim: "Ok", bosIkon: "🏹", yiginMi: true },
  { id: "cape", isim: "Pelerin", bosIkon: "🧣" },
  { id: "amulet", isim: "Kolye", bosIkon: "📿" },
  { id: "food", isim: "Yemek", bosIkon: "🍖", yiginMi: true },
  { id: "weapon", isim: "Silah", bosIkon: "🗡️" },
  { id: "body", isim: "Gövde", bosIkon: "👕" },
  { id: "shield", isim: "Kalkan", bosIkon: "🛡️" },
  { id: "legs", isim: "Bacak", bosIkon: "👖" },
  { id: "gloves", isim: "Eldiven", bosIkon: "🧤" },
  { id: "boots", isim: "Bot", bosIkon: "🥾" },
  { id: "ring", isim: "Yüzük", bosIkon: "💍" }
];

// Izgaranın görsel düzeni - null = boş hücre
export let slotDuzeni = [
  [null, "helmet", "ammo"],
  ["cape", "amulet", "food"],
  ["weapon", "body", "shield"],
  [null, "legs", null],
  ["gloves", "boots", "ring"]
];