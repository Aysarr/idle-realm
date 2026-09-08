// Ekipman slotlarının tanımı ve ızgaradaki yerleşimi.
// Yeni bir slot eklemek istersen: buraya bir obje ekle,
// sonra slotDuzeni içine yerleştir.

export let ekipmanSlotlari = [
  { id: "helmet", isim: "Kask", bosIkon: "🪖" },
  { id: "cape", isim: "Pelerin", bosIkon: "🧣" },
  { id: "amulet", isim: "Kolye", bosIkon: "📿" },
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
  [null, "helmet", null],
  ["cape", "amulet", null],
  ["weapon", "body", "shield"],
  [null, "legs", null],
  ["gloves", "boots", "ring"]
];