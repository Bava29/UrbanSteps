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
// Scroll Reveal Animations
// ================================

document.documentElement.classList.add("reveal-ready");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealObserver = prefersReducedMotion
    ? null
    : new IntersectionObserver((entries, observerInstance) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observerInstance.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.18,

        rootMargin: "0px 0px -8% 0px"

    });

function setupReveal(targets, effect = "fade-up", stagger = 0) {

    targets.forEach((target, index) => {

        if (!target) return;

        target.classList.add("reveal-item", `reveal-${effect}`);

        if (stagger) {

            target.style.setProperty("--reveal-delay", `${index * stagger}ms`);

        }

        if (prefersReducedMotion) {

            target.classList.add("is-visible");

            return;

        }

        revealObserver?.observe(target);

    });

}

function setupRevealBySelector(selector, effect = "fade-up", stagger = 0, scope = document) {

    setupReveal(Array.from(scope.querySelectorAll(selector)), effect, stagger);

}

setupRevealBySelector(".hero-content", "fade-up");
setupRevealBySelector(".page-hero-content", "fade-up");
setupRevealBySelector(".home2-hero-content", "fade-up");
setupRevealBySelector(".home2-hero-image", "zoom-in");
setupRevealBySelector(".hero-stats", "fade-up");
setupRevealBySelector(".section-title", "fade-up");
setupRevealBySelector(".our-story-image", "fade-left");
setupRevealBySelector(".our-story-content", "fade-right");
setupRevealBySelector(".about-cta-content", "fade-up");
setupRevealBySelector(".team-grid .team-card", "fade-up", 90);
setupRevealBySelector(".why-grid .why-card", "fade-up", 90);
setupRevealBySelector(".collection-tabs .collection-tab", "fade-up", 90);
setupRevealBySelector(".collections-showcase .collection-display", "zoom-in");
setupRevealBySelector(".collections-showcase .collection-display-image", "zoom-in");
setupRevealBySelector(".collections-showcase .collection-display-content", "fade-right");
setupRevealBySelector(".collection-grid .collection-card", "fade-up", 90);
setupRevealBySelector(".products-grid .product-card", "fade-up", 90);
setupRevealBySelector(".features-grid .feature-card", "fade-up", 90);
setupRevealBySelector(".stats-grid .stat-card", "fade-up", 90);
setupRevealBySelector(".testimonial-grid .testimonial-card", "fade-up", 90);
setupRevealBySelector(".faq-grid .faq-item", "fade-up", 90);
setupRevealBySelector(".collections-why-card", "fade-up", 90);
setupRevealBySelector(".size-guide-faq-item", "fade-up", 90);
setupRevealBySelector(".contact-info-grid .contact-info-card", "fade-up", 90);
setupRevealBySelector(".contact-form-content", "fade-up");
setupRevealBySelector(".contact-image", "fade-left");
setupRevealBySelector(".map-wrapper", "zoom-in");
setupRevealBySelector(".bulk-order-enquiry-form", "fade-up");
setupRevealBySelector(".size-guide-chart-wrapper", "zoom-in");
setupRevealBySelector(".size-guide-content", "fade-up");
setupRevealBySelector(".size-guide-measure-image", "fade-left");
setupRevealBySelector(".size-guide-measure-content", "fade-right");
setupRevealBySelector(".size-guide-measure-step", "fade-up", 80);
setupRevealBySelector(".size-support-banner-box", "fade-up");
setupRevealBySelector(".collections-cta-wrapper", "fade-up");
setupRevealBySelector(".lifestyle-card", "fade-up", 90);
setupRevealBySelector(".signature-card", "fade-up", 90);
setupRevealBySelector(".collection-row", "fade-up", 90);
setupRevealBySelector(".brand-card", "zoom-in", 70);
setupRevealBySelector(".trending-card", "fade-up", 90);
setupRevealBySelector(".footer-newsletter", "fade-up");
setupRevealBySelector(".footer-column", "fade-up", 90);
setupRevealBySelector(".footer-bottom", "fade-up");
setupRevealBySelector(".auth-card", "zoom-in");
setupRevealBySelector(".auth-heading", "fade-up");
setupRevealBySelector(".auth-form .form-group", "fade-up", 70);
setupRevealBySelector(".auth-divider", "fade-up");
setupRevealBySelector(".social-login .social-btn", "fade-up", 70);

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
