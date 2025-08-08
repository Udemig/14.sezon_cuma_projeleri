// ! Html'den Elemanları Çekme
const nav = document.querySelector("nav");
const menuBtn = document.querySelector("#menu-btn");

// ! menuBtn'e tıklanınca nav kısmını aç-kapa yap

menuBtn.addEventListener("click", () => {
  // nav kısmını aç-kapa yapmak için open-nav classını ekle-çıkar
  nav.classList.toggle("open-nav");
});

document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll("video");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play();
        entry.target.addEventListener("ended", () => {
          entry.target.currentTime = 0;
          entry.target.play();
        });
      } else {
        entry.target.pause();
      }
    });
  });
  videos.forEach((video) => {
    observer.observe(video);
  });
});
