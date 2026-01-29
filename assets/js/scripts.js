let current = 1;

setInterval(() => {
    current++;

    if (current > 4) current = 1;

    document.getElementById("slide" + current).checked = true;
}, 4000);

window.addEventListener("DOMContentLoaded", () => {
    const info = document.querySelector(".slider-info");

    if (info) {
        info.classList.add("active");
    }
});
