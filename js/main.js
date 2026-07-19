// ================================
// Elements
// ================================

const header = document.querySelector(".header");

const menuToggle = document.querySelector(".menu-toggle");

const menuClose = document.querySelector(".menu-close");

const navMenu = document.querySelector(".nav-menu");

const overlay = document.querySelector(".nav-overlay");

const navLinks = document.querySelectorAll(".nav-menu a");

// ================================
// Sticky Navbar
// ================================

window.addEventListener("scroll", () => {

    header?.classList.toggle("sticky", window.scrollY > 30);

});

// ================================
// Open Menu
// ================================

menuToggle?.addEventListener("click", () => {

    navMenu?.classList.add("active");

    overlay?.classList.add("active");

    document.body.style.overflow = "hidden";

});

// ================================
// Close Menu
// ================================

function closeMenu() {

    navMenu?.classList.remove("active");

    overlay?.classList.remove("active");

    document.body.style.overflow = "";

}

menuClose?.addEventListener("click", closeMenu);

overlay?.addEventListener("click", closeMenu);

navLinks.forEach(link => {

    link.addEventListener("click", closeMenu);

});

// ================================
// Dark Mode
// ================================

const desktopTheme = document.getElementById("theme-toggle");
const mobileTheme = document.getElementById("mobile-theme-toggle");

function updateThemeIcons(isDark) {

    [desktopTheme, mobileTheme].forEach(btn => {

        if (!btn) return;

        const icon = btn.querySelector("i");

        if (!icon) return;

        icon.className = isDark
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";

    });

}

function applyTheme(theme) {

    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    updateThemeIcons(isDark);

    localStorage.setItem("theme", theme);

}

function toggleTheme() {

    const theme = document.body.classList.contains("dark-mode")
        ? "light"
        : "dark";

    applyTheme(theme);

}

desktopTheme?.addEventListener("click", toggleTheme);
mobileTheme?.addEventListener("click", toggleTheme);

// Load Saved Theme
applyTheme(localStorage.getItem("theme") || "light");

// ================================
// RTL Mode
// ================================

const desktopRTL = document.getElementById("rtl-toggle");

const mobileRTL = document.getElementById("mobile-rtl-toggle");

function toggleRTL() {

    const html = document.documentElement;

    html.dir = html.dir === "rtl" ? "ltr" : "rtl";

    localStorage.setItem("dir", html.dir);

}

desktopRTL?.addEventListener("click", toggleRTL);

mobileRTL?.addEventListener("click", toggleRTL);

const savedDir = localStorage.getItem("dir");

if (savedDir) {

    document.documentElement.dir = savedDir;

}


const heroSwiper = new Swiper(".hero-slider", {

    loop: true,

    speed: 1000,

    autoplay: {

        delay: 5000,

        disableOnInteraction: false,

    },

    pagination: {

        el: ".swiper-pagination",

        clickable: true,

    },

});


const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            // data-target irundha atha use pannum, illana innerText use pannum
            const target = +(counter.dataset.target || counter.innerText.replace(/,/g, ""));

            let count = 0;

            const update = () => {

                const increment = target / 100;

                if (count < target) {

                    count += increment;

                    counter.innerText = Math.ceil(count).toLocaleString();

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = target.toLocaleString();

                }

            };

            update();

            observer.unobserve(counter);

        }

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => observer.observe(counter));


const faqItems = document.querySelectorAll(".size-guide-faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".size-guide-faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});