let currentSlide = 1;
const totalSlides = 4;
const slider = document.querySelector("#slider");

setInterval(() => {
    currentSlide++;
    if (currentSlide > totalSlides) currentSlide = 1;
    const slide = document.getElementById("slide" + currentSlide);
    if (slide) slide.checked = true;
}, 4000);


if (slider) {
    let startX = 0;
    slider.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });
    slider.addEventListener("touchend", e => {
        let endX = e.changedTouches[0].clientX;
        let diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentSlide < totalSlides) {
                currentSlide++;
            } else if (diff < 0 && currentSlide > 1) {
                currentSlide--;
            }
            const slide = document.getElementById("slide" + currentSlide);
            if (slide) slide.checked = true;
        }
    });
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal, .reveal-left, .card").forEach(el => {
    observer.observe(el);
});

window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".carrosel-wrapper").forEach(wrapper => {
        const track = wrapper.querySelector(".track");
        const left = wrapper.querySelector(".arrow.left");
        const right = wrapper.querySelector(".arrow.right");
        if (!track || !left || !right) return;

        let index = 0;
        const cards = track.querySelectorAll(".card");
        const visibleCards = 4;
        const totalCards = cards.length;

        function updatePosition() {
            if (window.innerWidth > 900) {
                const gap = window.innerWidth * 0.02;
                const cardWidth = cards[0].offsetWidth + gap;
                track.style.transform = `translateX(${-index * cardWidth}px)`;
            } else {
                track.style.transform = `none`;
            }
        }

        right.addEventListener("click", () => {
            if (index < totalCards - visibleCards) {
                index++;
                updatePosition();
            }
        });

        left.addEventListener("click", () => {
            if (index > 0) {
                index--;
                updatePosition();
            }
        });

        window.addEventListener("resize", updatePosition);
    });
});

const form = document.getElementById("formContato");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const captcha = document.getElementById("captchaCheck");
        if (!captcha.checked) {
            alert("Confirme que você não é um robô 😉");
            return;
        }
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const assunto = document.getElementById("assunto").value;
        const mensagem = document.getElementById("mensagem").value;

        const texto = `Olá, vim pelo site da IAD Soluções.\n\nNome: ${nome}\nTelefone: ${telefone}\nEmail: ${email}\nAssunto: ${assunto}\n\nMensagem:\n${mensagem}`;
        const numero = "5511959767766";
        window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, "_blank");
    });
}

// Menu Mobile
const btnMobile = document.querySelector(".menu-mobile-btn");
const menuMobile = document.querySelector(".menu-mobile");

if (btnMobile) {
    btnMobile.addEventListener("click", () => menuMobile.classList.toggle("active"));
}

document.querySelectorAll(".menu-mobile a").forEach(link => {
    link.addEventListener("click", () => menuMobile.classList.remove("active"));
});


if (window.innerWidth <= 900) {
    const eletricaTrack = document.querySelector(".eletrica-mobile .track");
    const refrigTrack = document.querySelector(".refrigeracao-mobile .track");

    if (eletricaTrack) {

        document.querySelectorAll(".card.eletrica").forEach(card => {
            const clone = card.cloneNode(true);
            eletricaTrack.appendChild(clone);
        });
    }

    if (refrigTrack) {
        document.querySelectorAll(".card.refrigeracao").forEach(card => {
            const clone = card.cloneNode(true);
            refrigTrack.appendChild(clone);
        });
    }
}

gsap.registerPlugin(ScrollTrigger);
const isMobile = window.innerWidth <= 900;

document.querySelectorAll(".expertise").forEach((section) => {
    const isReverse = section.classList.contains("expertise-reverse");

    gsap.from(section.querySelector(".expertise-container"), {
        xPercent: isReverse ? (isMobile ? -30 : -100) : (isMobile ? 30 : 100),
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top center",
            scrub: 1
        }
    });
});

if (!isMobile) {
    gsap.from(".slider-info", {
        y: 80, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.3
    });

    const scrubAnims = [".titulo-servicos", ".carrosel-servicos", ".quem-somos h1", ".quem-desc", ".quem-cards"];
    scrubAnims.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            gsap.from(el, {
                y: 60,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "top center",
                    scrub: 1
                }
            });
        });
    });

    gsap.fromTo(".beneficios .beneficio",
        { y: 70, scale: 0.95, filter: "grayscale(100%)", opacity: 0.6 },
        {
            y: 0, scale: 1, filter: "grayscale(0%)", opacity: 1,
            duration: 0.6, stagger: 0.35, ease: "back.out(1.6)",
            scrollTrigger: { trigger: ".beneficios-container", start: "top 75%" }
        });

    ScrollTrigger.create({
        trigger: ".beneficios-container",
        start: "top 75%",
        onEnter: () => {
            gsap.timeline().to(".cta-fechar .cta-btn", { y: -18, duration: 0.18, ease: "power2.out" })
                .to(".cta-fechar .cta-btn", { y: 0, duration: 0.25, ease: "bounce.out" })
                .repeat(4);
        }
    });
}

ScrollTrigger.refresh();