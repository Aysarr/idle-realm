// Ekranın sağ altında beliren geçici bildirimler.
// Hiçbir şeyi import etmez - bu yüzden her yerden güvenle çağrılabilir.

export function bildirimGoster(mesaj, tur) {
  let kap = document.getElementById("bildirimler");
  if (kap === null) {
    return;
  }

  let kutu = document.createElement("div");
  kutu.className = "bildirim";

  if (tur) {
    kutu.className = kutu.className + " " + tur;
  }

  kutu.innerHTML = mesaj;
  kap.appendChild(kutu);

  setTimeout(function () {
    kutu.remove();
  }, 3000);
}