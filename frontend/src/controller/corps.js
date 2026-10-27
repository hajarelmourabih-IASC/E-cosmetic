// /frontend/src/controller/c.js

// Sélection des liens sidebar
const cremes = document.getElementById("creme");
const mains = document.getElementById("main");
const pieds = document.getElementById("pied");
const dentaire = document.getElementById("dentaire");

// Redirection selon le type de produit
cremes.addEventListener("click", () => { return window.location.href = "creme.html"; });
mains.addEventListener("click", () => { return window.location.href = "mains.html"; });
pieds.addEventListener("click", () => { return window.location.href = "pied.html"; });
dentaire.addEventListener("click", () => { return window.location.href = "smile.html"; });

// Sélection de tous les boutons "Consulter"
const consultButtons = document.querySelectorAll(".btn-consult");

consultButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const productCard = btn.closest(".product-card");
    if (!productCard) return;

    const productId = productCard.dataset.id;
    const sectionType = productCard.closest("section").id; // crèmes, mains, pieds, dentaire

    if (!productId || !sectionType) return;

    //  redirection selon la section
    if (sectionType === "cremes") {
      window.location.href = `/frontend/src/view/creme.html?id=${productId}`;
    } 
    else if (sectionType === "mains") {
      window.location.href = `/frontend/src/view/mains.html?id=${productId}`;
    } 
    else if (sectionType === "pieds") {
      window.location.href = `/frontend/src/view/pied.html?id=${productId}`;
    } 
    else if (sectionType === "dentaire") {
      window.location.href = `/frontend/src/view/smile.html?id=${productId}`;
    }
  });
});

