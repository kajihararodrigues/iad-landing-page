let current = 1;

setInterval(() => {
    current++;
    if (current > 4) current = 1;
    document.getElementById("slide" + current).checked = true;
}, 4000);

window.addEventListener("DOMContentLoaded", () => {
    const info = document.querySelector(".slider-info");
    if (info) info.classList.add("active");
});

/* ================= REVEAL ================= */

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(".reveal, .reveal-left, .card").forEach(el => {
    observer.observe(el);
});

/* ================= CARDS HOVER FIX ================= */

let hoveringCard = false;

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseenter", () => hoveringCard = true);
    card.addEventListener("mouseleave", () => hoveringCard = false);
});

/* ================= CARROSEL ================= */

window.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".carrosel-wrapper").forEach(wrapper => {

        const track = wrapper.querySelector(".track");
        const left = wrapper.querySelector(".arrow.left");
        const right = wrapper.querySelector(".arrow.right");

        let offset = 0;
        let speed = 0.35;
        let manualTimeout;

        const groupWidth = track.scrollWidth / 2;

        function autoplay() {

            offset -= speed;

            if (Math.abs(offset) >= groupWidth) offset = 0;

            track.style.transform = `translateX(${offset}px)`;

            requestAnimationFrame(autoplay);
        }

        autoplay();

        function manualMove(value) {

            offset += value;

            clearTimeout(manualTimeout);

            manualTimeout = setTimeout(() => {
                speed = 0.35;
            }, 1500);
        }

        right.onclick = () => {
            speed = 0;
            manualMove(-220);
        };

        left.onclick = () => {
            speed = 0;
            manualMove(220);
        };

        wrapper.addEventListener("mouseenter", () => speed = 0);
        wrapper.addEventListener("mouseleave", () => speed = 0.35);

    });

});

/* ================= MODAL ================= */

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");

document.querySelectorAll(".card a").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();

        const card = btn.closest(".card");

        modalImg.src = card.querySelector("img").src;
        modalTitle.innerText = card.querySelector("p").innerText;
        modalText.innerText = card.querySelector("p").dataset.full;

        modal.classList.add("active");
    });
});

modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("active");
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") modal.classList.remove("active");
});


/* ================= GSAP + CANVAS ================= */

gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("frame-canvas");
const ctx = canvas.getContext("2d");

const frameCount = 147;

const currentFrame = i =>
    `./assets/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = [];
const seq = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

images[0].onload = () => {
    seq.frame = 0;
    render();
};

function render() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = images[Math.round(seq.frame)];
    if (!img) return;

    const scale = canvas.width / img.width;
    const imgHeight = img.height * scale;

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, canvas.width, imgHeight);
}

gsap.to(seq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",

    scrollTrigger: {
        trigger: ".frame-scroll",
        start: "top bottom",
        end: "top top",
        scrub: true,
        invalidateOnRefresh: true
    },

    onUpdate: () => {
        if (!hoveringCard) render();
    }
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
});