// Mencegah Inspect Element dan View Source
document.addEventListener("keydown", function (event) {
  if (
    (event.ctrlKey &&
      (event.key === "u" ||
        event.key === "i" ||
        event.key === "j" ||
        event.key === "s")) ||
    (event.ctrlKey &&
      event.shiftKey &&
      (event.key === "I" || event.key === "J" || event.key === "C")) ||
    event.key === "F12"
  ) {
    event.preventDefault();
    console.log("Inspect Element telah dinonaktifkan!"); // Debugging
  }
});
// Mencegah Klik Kanan
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});
// Mencegah Drag & Drop pada Semua Gambar
document.addEventListener("dragstart", function (event) {
  event.preventDefault();
});
// Mencegah Klik Kanan pada Gambar Secara Spesifik
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("contextmenu", (event) => event.preventDefault());
});

// NAVBAR
const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");

menuIcon.addEventListener("click", () => {
  if (menuList.classList.contains("hidden")) {
    menuList.classList.remove("hidden");
    menuList.style.transform = "translateY(-10px)";
    menuList.style.opacity = "0";

    setTimeout(() => {
      menuList.style.transform = "translateY(0)";
      menuList.style.opacity = "1";
    }, 10);
  } else {
    menuList.style.transform = "translateY(-10px)";
    menuList.style.opacity = "0";

    setTimeout(() => {
      menuList.classList.add("hidden");
    }, 300);
  }
});

document.querySelectorAll("#menu-list a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // Jika href dimulai dengan "#" (link ke bagian dalam halaman yang sama)
    if (href.startsWith("#")) {
      e.preventDefault();

      const targetId = href.substring(1); // Mengambil ID tujuan
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Sesuaikan offset agar tidak tertutup navbar
          behavior: "smooth", // Efek transisi scroll
        });
      }
    } 
    // Jika href mengarah ke halaman lain, biarkan browser menanganinya normal (tidak perlu e.preventDefault)

    // Tutup menu setelah diklik di tampilan mobile
    if (window.innerWidth <= 768) {
      menuList.style.transform = "translateY(-10px)";
      menuList.style.opacity = "0";
      setTimeout(() => {
        menuList.classList.add("hidden");
      }, 300);
    }
  });
});

// HERO SECTION
document.addEventListener("DOMContentLoaded", function () {
  let getStartedBtn = document.querySelector(".btn-primary");
  let aboutSection = document.getElementById("about");
  
  // Ketika tombol Get Started diklik, scroll ke bagian About
  getStartedBtn.addEventListener("click", function () {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  });

  let whatDoYouGetBtn = document.querySelector(".btn-secondary");
  let benefitSection = document.getElementById("benefit");

  whatDoYouGetBtn.addEventListener("click", function () {
    benefitSection.scrollIntoView({ behavior: "smooth" });
  });
});

document.getElementById('ajukanNow')?.addEventListener('click', function () {
  // buka kerjasama.html di tab yang sama
  window.location.href = 'kerjasama.html';
});

const showTermsBtn = document.getElementById('showTermsBtn');
if (showTermsBtn) {
  showTermsBtn.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    const scrollDistance = isMobile ? 500 : 400;

    // ambil posisi section collaboration
    const collaborationSection = document.getElementById('kerjasama');
    if (collaborationSection) {
      const collaborationTop = collaborationSection.offsetTop; // posisi dari atas
      const collaborationBottom = collaborationTop + collaborationSection.offsetHeight; // batas bawah
      const currentScroll = window.scrollY;
      const maxScroll = collaborationBottom - window.innerHeight;

      // hitung posisi scroll berikutnya
      let targetScroll = currentScroll + scrollDistance;
      if (targetScroll > maxScroll) {
        targetScroll = maxScroll; // jangan lebih dari batas section
      }

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    } else {
      // fallback kalau section collaboration belum ada
      window.scrollBy({ top: scrollDistance, behavior: 'smooth' });
    }
  });
}



