

// ================= BANNER SLIDER =================

let current = 1;

setInterval(() => {
    current++;
    if (current > 4) current = 1;
    document.getElementById("slide" + current).checked = true;
}, 4000);

// ================= SLIDER INFO =================

window.addEventListener("DOMContentLoaded", () => {
    const info = document.querySelector(".slider-info");
    if (info) info.classList.add("active");
});

// ================= SCROLL REVEAL =================

const reveals = document.querySelectorAll(".reveal, .reveal-left");
const cards = document.querySelectorAll(".card");

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) el.classList.add("active");
    });

    cards.forEach(card => {
        const elementTop = card.getBoundingClientRect().top;
        if (elementTop < windowHeight - 80) card.classList.add("active");
    });

}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ================= MULTI CARROSEL INFINITO =================

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

// ================= MODAL DOS CARDS =================

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".card a").forEach(btn => {

    btn.addEventListener("click", e => {

        e.preventDefault();

        const card = btn.closest(".card");

        const img = card.querySelector("img").src;
        const title = card.querySelector("h3").innerText;
        const text = card.querySelector("p").dataset.full;

        modalImg.src = img;
        modalTitle.innerText = title;
        modalText.innerText = text;

        modal.classList.add("active");

    });

});

closeBtn.onclick = () => modal.classList.remove("active");

modal.onclick = e => {
    if (e.target === modal) modal.classList.remove("active");
};