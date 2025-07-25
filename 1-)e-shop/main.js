// ! Html'deki elemanlara eriş
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

// ! menuBtn elemanına tıklanınca nav ve header elemanına class ekle
menuBtn.addEventListener("click", () => {
  // header'a nav-active classı ekle
  header.classList.add("nav-active");

  // nav elemanına active classı ekle
  nav.classList.add("active");

  // menuBtn'i gizle
  menuBtn.style.display = "none";

  // closeBtn'i aktif et
  closeBtn.style.display = "block";
});

// ! closeBtn elemanına tıklanınca header ce nav elemanından class kaldır
closeBtn.addEventListener("click", () => {
  // headerdan nav-active clasını kaldır
  header.classList.remove("nav-active");

  // nav elemanında active classı kaldır
  nav.classList.remove("active");

  // menuBtn'i aktif et
  menuBtn.style.display = "block";

  // closeBtn'i pasife çek
  closeBtn.style.display = "none";
});
