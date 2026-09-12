// ============================================================
// ÖZEL PENCERELER
//
// Tarayıcının çirkin alert()/confirm()/prompt() kutuları yerine
// oyunun kendi tasarımına uygun pencereler.
//
// Senkron değiller (tarayıcı fonksiyonları kodun akışını durdurur,
// bunlar durdurmaz) — bu yüzden callback (devamEt) alıyorlar.
// "Sonra ne olacak?" kısmını callback içine yazıyoruz.
// ============================================================

function modalKapat() {
  let ekran = document.getElementById("modal-ekrani");
  if (ekran !== null) {
    ekran.className = "";
    ekran.innerHTML = "";
  }
}

function modalAc(html) {
  let ekran = document.getElementById("modal-ekrani");
  if (ekran === null) {
    return;
  }
  ekran.innerHTML = html;
  ekran.className = "acik";
}

// ---------- BİLGİ PENCERESİ (alert yerine) ----------

export function oyunAlert(baslik, mesaj, devamEt) {
  window.__modalDevamEt = function () {
    modalKapat();
    if (devamEt) {
      devamEt();
    }
  };

  modalAc(
    "<div class='modal-kutu'>" +
    "<div class='modal-baslik'>" + baslik + "</div>" +
    "<div class='modal-govde'>" + mesaj + "</div>" +
    "<div class='modal-butonlar'>" +
    "<button class='modal-buton ana' onclick='__modalDevamEt()'>Tamam</button>" +
    "</div></div>"
  );
}

// ---------- ONAY PENCERESİ (confirm yerine) ----------

export function oyunConfirm(baslik, mesaj, evetMetni, onEvet) {
  window.__modalEvet = function () {
    modalKapat();
    onEvet();
  };
  window.__modalHayir = function () {
    modalKapat();
  };

  modalAc(
    "<div class='modal-kutu'>" +
    "<div class='modal-baslik'>" + baslik + "</div>" +
    "<div class='modal-govde'>" + mesaj + "</div>" +
    "<div class='modal-butonlar'>" +
    "<button class='modal-buton' onclick='__modalHayir()'>Vazgeç</button>" +
    "<button class='modal-buton tehlike' onclick='__modalEvet()'>" +
    evetMetni + "</button>" +
    "</div></div>"
  );
}

// ---------- METİN GİRİŞİ (prompt yerine) ----------

export function oyunPrompt(baslik, mesaj, varsayilan, onGonder) {
  window.__modalGonder = function () {
    let girdi = document.getElementById("modal-girdi");
    let deger = girdi !== null ? girdi.value : "";
    modalKapat();
    onGonder(deger);
  };
  window.__modalVazgec = function () {
    modalKapat();
  };

  modalAc(
    "<div class='modal-kutu'>" +
    "<div class='modal-baslik'>" + baslik + "</div>" +
    "<div class='modal-govde'>" + mesaj + "</div>" +
    "<input type='text' id='modal-girdi' class='modal-girdi' " +
    "value='" + (varsayilan !== undefined && varsayilan !== null ? varsayilan : "") + "' " +
    "onkeydown='if(event.key===\"Enter\")__modalGonder()' autofocus>" +
    "<div class='modal-butonlar'>" +
    "<button class='modal-buton' onclick='__modalVazgec()'>Vazgeç</button>" +
    "<button class='modal-buton ana' onclick='__modalGonder()'>Tamam</button>" +
    "</div></div>"
  );

  // Metin kutusuna odaklan ve içeriği seçili yap
  setTimeout(function () {
    let girdi = document.getElementById("modal-girdi");
    if (girdi !== null) {
      girdi.focus();
      girdi.select();
    }
  }, 50);
}

// Sayı girişi için kısayol - otomatik doğrular
export function oyunPromptSayi(baslik, mesaj, varsayilan, minDeger, onGonder) {
  oyunPrompt(baslik, mesaj, varsayilan, function (deger) {
    let sayi = parseInt(deger);
    if (isNaN(sayi) || sayi < minDeger) {
      return;
    }
    onGonder(sayi);
  });
}