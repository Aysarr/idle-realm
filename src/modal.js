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

// ---------- ANLATI PENCERESİ ----------
//
// Hikaye metinleri için. Normal alert'ten farkı: paragraflar
// ayrı ayrı gösteriliyor ve **kalın** yazım destekliyor.
 
export function oyunAnlati(baslik, paragraflar) {
  window.__modalDevamEt = function () {
    let ekran = document.getElementById("modal-ekrani");
    if (ekran !== null) {
      ekran.className = "";
      ekran.innerHTML = "";
    }
  };
 
  let govde = "";
  for (let i = 0; i < paragraflar.length; i++) {
    // **kalın** yazımı <strong> yap
    let metin = paragraflar[i].replace(
      /\*\*(.+?)\*\*/g,
      "<strong>$1</strong>"
    );
    govde = govde + "<p class='anlati-paragraf'>" + metin + "</p>";
  }
 
  let ekran = document.getElementById("modal-ekrani");
  if (ekran === null) {
    return;
  }
 
  ekran.innerHTML =
    "<div class='modal-kutu anlati'>" +
    "<div class='anlati-baslik'>" + baslik + "</div>" +
    "<div class='anlati-govde'>" + govde + "</div>" +
    "<div class='modal-butonlar'>" +
    "<button class='modal-buton ana' onclick='__modalDevamEt()'>Devam</button>" +
    "</div></div>";
  ekran.className = "acik";
}