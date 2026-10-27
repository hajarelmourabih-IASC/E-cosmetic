const messageElement = document.getElementById("message");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

nextBtn.addEventListener("click", () => {
    // On échange le texte avec l'attribut data-alt
    const temp = messageElement.textContent;
    messageElement.textContent = messageElement.getAttribute("data-alt");
    messageElement.setAttribute("data-alt", temp);
});

prevBtn.addEventListener("click", () => {
    // Même logique pour le précédent
    const temp = messageElement.textContent;
    messageElement.textContent = messageElement.getAttribute("data-alt");
    messageElement.setAttribute("data-alt", temp);
});
let i = 0;

// On récupère toutes les images du slider
const slides = document.querySelectorAll(".slide");

// Change d'image toutes les 5 secondes
setInterval(() => {
    // On cache l'image actuelle
    slides[i].style.display = "none";

    // On passe à la suivante
    i = (i + 1) % slides.length;

    // On affiche la nouvelle image
    slides[i].style.display = "block";
}, 5000); // 5000ms = 5 secondes

 const contactBtn = document.getElementById("btnCU");

contactBtn.addEventListener("click", handleCU);

function handleCU() {
    window.location.href = "/frontend/src/view/contact.html";
}
const aProposBtn = document.getElementById("btnPN");

aProposBtn.addEventListener("click", handlePN);

function handlePN() {
    window.location.href = "/frontend/src/view/AproposNous.html";
}
const faqsBtn = document.getElementById("btnFAS");

faqsBtn.addEventListener("click", handleFAS);

function handleFAS() {
    window.location.href = "/frontend/src/view/faqs.html";
}

const panierBtn = document.getElementById("btnPanier");

panierBtn.addEventListener("click", handlePanier);

function handlePanier() {
    window.location.href = "/frontend/src/view/panier.html";
}
const loginBtn = document.getElementById("btnlogin");

loginBtn.addEventListener("click", handlelogin);

function handlelogin() {
    window.location.href = "/frontend/src/view/login.html";
}
const accueilBtn = document.getElementById("btnaccueil");

accueilBtn.addEventListener("click", handleaccueil);

function handleaccueil() {
    window.location.href = "/frontend/src/view/accueil.html";
}
const visageBtn = document.getElementById("btnvisage");

visageBtn.addEventListener("click", handlevisage);

function handlevisage() {
    window.location.href = "/frontend/src/view/visage.html";
}
const corpsBtn = document.getElementById("btncorps");

corpsBtn.addEventListener("click", handlecorps);

function handlecorps() {
    window.location.href = "/frontend/src/view/corps.html";
}