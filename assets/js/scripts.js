let current = 1;

setInterval(() => {
    current++;

    if (current > 4) current = 1;

    document.getElementById("slide" + current).checked = true;
}, 4000);

const track = document.querySelector(".track");
const left = document.querySelector(".arrow.left");
const right = document.querySelector(".arrow.right");

right.onclick = () => {
    track.scrollBy({ left: 220, behavior: "smooth" });
};

left.onclick = () => {
    track.scrollBy({ left: -220, behavior: "smooth" });
};