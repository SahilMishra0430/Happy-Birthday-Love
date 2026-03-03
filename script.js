let currentStep = 1;

// ===== LIGHTS =====
function turnLights() {
    if (currentStep !== 1) return;

    document.body.classList.remove("dark-bg");
    document.body.classList.add("light-bg");

    const btnLights = document.getElementById("btnLights");
    const btnBalloons = document.getElementById("btnBalloons");

    if (!btnLights || !btnBalloons) {
        console.error("Button IDs missing in HTML");
        return;
    }

    btnLights.classList.add("hidden");
    btnBalloons.classList.remove("hidden");

    currentStep = 2;
}

// ===== BALLOONS =====
function putBalloons() {
    if (currentStep !== 2) return;

    const positions = [
        { side: "top", left: "10%" },
        { side: "top", left: "50%" },
        { side: "top", left: "80%" },
        { side: "bottom", left: "20%" },
        { side: "bottom", left: "70%" },
        { side: "left", top: "25%" },
        { side: "left", top: "65%" },
        { side: "right", top: "30%" },
        { side: "right", top: "70%" }
    ];

    positions.forEach(pos => {
        const img = document.createElement("img");
        img.src = "./balloon.png";
        img.className = "balloon-border";

        if (pos.side === "top") {
            img.style.top = "0";
            img.style.left = pos.left;
        }
        if (pos.side === "bottom") {
            img.style.bottom = "0";
            img.style.left = pos.left;
        }
        if (pos.side === "left") {
            img.style.left = "0";
            img.style.top = pos.top;
        }
        if (pos.side === "right") {
            img.style.right = "0";
            img.style.top = pos.top;
        }

        document.body.appendChild(img);
    });

    document.getElementById("btnBalloons").classList.add("hidden");
    document.getElementById("btnMusic").classList.remove("hidden");

    currentStep = 3;
}

// ===== MUSIC =====
function playMusic() {
    if (currentStep !== 3) return;

    const music = document.getElementById("music");
    if (music) music.play().catch(() => { });

    document.getElementById("btnMusic").classList.add("hidden");
    document.getElementById("btnCake").classList.remove("hidden");

    currentStep = 4;
}

// ===== CAKE =====
function showCake() {
    if (currentStep !== 4) return;

    const cakeArea = document.getElementById("cakeArea");
    cakeArea.classList.remove("hidden");

    // restart animation every time (smooth)
    const cake = cakeArea.querySelector(".cake-img");
    if (cake) {
        cake.style.animation = "none";
        cake.offsetHeight; // force reflow
        cake.style.animation = "cakeFadeIn 1s ease forwards";
    }
}

// ===== SPACE =====
document.addEventListener("keydown", function (e) {
    if (e.code === "Space" && currentStep === 4) {
        document.getElementById("finalCard").classList.remove("hidden");
    }
});

// ===== PAGE 2 CARD =====
function openCard(card) {
    const isOpening = !card.classList.contains("open");
    card.classList.toggle("open");

    if (isOpening) {
        startTyping();
        burstHearts();
    }
}

/* ===== TYPING EFFECT ===== */

const message = `I Love You alottt my Shuggaaaa, My Rasmalai, You are the most beautiful part of my life.
Your smile, your voice, your presence…
everything about you makes my world brighter.
I’m so lucky to have you 💖`;

let typed = false;

function startTyping() {
    if (typed) return;
    typed = true;

    const el = document.getElementById("typedText");
    if (!el) return;

    let i = 0;
    el.textContent = "";

    function type() {
        if (i < message.length) {
            el.textContent += message.charAt(i);
            i++;
            setTimeout(type, 28);
        }
    }

    type();
}

/* ===== HEART BURST ===== */

function burstHearts() {
    const container = document.getElementById("heartBurst");
    if (!container) return;

    for (let i = 0; i < 18; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤";

        heart.style.left = Math.random() * 100 + "%";
        heart.style.top = "70%";
        heart.style.animationDelay = (Math.random() * 0.4) + "s";

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 1600);
    }
}

// SPACE → final surprise
document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        triggerFinalSurprise();
    }
});

function triggerFinalSurprise() {
    const cake = document.getElementById("cakeContainer");
    const text = document.getElementById("birthdayText");
    const finalImg = document.getElementById("finalImage");

    // fade out ONLY cake + text
    if (cake) cake.classList.add("fade-out");
    if (text) text.classList.add("fade-out");

    // show final image
    if (finalImg) {
        setTimeout(() => {
            finalImg.classList.add("show");
        }, 700);
    }
}