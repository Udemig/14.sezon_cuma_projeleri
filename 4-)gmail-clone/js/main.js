import { uiElement, renderMails, updateMail } from "./ui.js";

const mails = JSON.parse(localStorage.getItem("mails")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderMails(uiElement.mailsArea, mails);
});

uiElement.createBtn.addEventListener("click", () => {
  uiElement.modal.classList.add("open");
});

uiElement.closeBtn.addEventListener("click", () => {
  uiElement.modal.classList.remove("open");
});

uiElement.hamburgerMenu.addEventListener("click", () => {
  uiElement.leftAside.classList.toggle("hide");
});

window.addEventListener("resize", (e) => {
  const screenWidth = e.target.innerWidth;

  if (screenWidth < 1100) {
    uiElement.leftAside.classList.add("hide");
  } else {
    uiElement.leftAside.classList.remove("hide");
  }
});

uiElement.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const reciver = e.target[0].value;
  const title = e.target[1].value;
  const message = e.target[2].value;

  if (!reciver && !title && !message) {
    Toastify({
      text: "Formu Doldurunuz",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, red, #464645ff)",
        borderRadius: "10px",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    return;
  }

   const newMail = {
    id: new Date().getTime(),
    reciver,
    title,
    message,
    stared: false,
    date: new Date().toLocaleDateString("tr", {
        day: "2-digit",
        month: "long",
    })
   }

   mails.unshift(newMail);

   localStorage.setItem("mails", JSON.stringify(mails))

   e.target.reset();

   uiElement.modal.classList.remove("open");

   Toastify({
  text: "Mail Gönderildi",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "right", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
    borderRadius: "10px",
  },
  onClick: function(){} // Callback after click
}).showToast();

renderMails(uiElement.mailsArea, mails)

});

uiElement.mailsArea.addEventListener("click", updateMail)

uiElement.navigation.addEventListener("click", (e) => {
    const clickCategory = e.target.closest("a")

    const links = uiElement.navigation.querySelectorAll("a");
    links.forEach((link) => link.classList.remove("active"))

    clickCategory.classList.add("active");

   const categoryName = clickCategory.innerText.trim();

   if(categoryName === "Yıldızlananlar") {
    const staredMails = mails.filter((mail) => mail.stared == true)

    renderMails(uiElement.mailsArea, staredMails)
   }else{
    renderMails(uiElement.mailsArea, mails)
   }
})

uiElement.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = e.target[1].value

    const filtredMails = mails.filter((i) =>
        i.reciver.toLowerCase().includes(query.toLowerCase())
    )

    renderMails(uiElement.mailsArea, filtredMails)
})

export {mails}