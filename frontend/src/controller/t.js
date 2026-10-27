document.addEventListener("DOMContentLoaded", () => {

const btnContact = document.getElementById("btnCU");
const btnApropo = document.getElementById("btnPN");
const btnFaqs = document.getElementById("btnFAS");
      
        
const btnAccueil = document.getElementById("btnaccueil");
const btnVisage = document.getElementById("btnvisage");
const btnCorps = document.getElementById("btncorps");


 const rechercheLink = document.getElementById("recherche");
  const btnCompt = document.getElementById("btncompte");
   const btnpanier = document.getElementById("btnPanier");


btnContact.addEventListener("click", () => {
    window.location.href = "contact.html";
});
btnApropo.addEventListener("click", () => {
    window.location.href = "AProposNous.html";
});
btnFaqs.addEventListener("click", () => {
    window.location.href = "faqs.html";
});

btnAccueil.addEventListener("click", () => {
    window.location.href = "accueil.html";
});

btnVisage.addEventListener("click", () => {
    window.location.href = "visage.html";
});

btnCorps.addEventListener("click", () => {
    window.location.href = "corps.html";
});
 


btnCompt.addEventListener("click", (e) => {
  e.preventDefault(); // éviter le comportement par défaut du lien

  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    // Utilisateur non connecté
    alert("❗ Vous devez vous connecter pour accéder au compte !");
    window.location.href = "/frontend/src/view/login.html"; // redirection vers login
  } else {
    //  Utilisateur connecté → aller sur compte
    window.location.href = "compte.html";
  }
});

btnpanier.addEventListener("click", () => {
    window.location.href = "panier.html";
});
 
const searchContainer = document.createElement("div");
searchContainer.style.display = "none";
searchContainer.style.textAlign = "center";
searchContainer.style.margin = "20px 0";

const inputSearch = document.createElement("input");
inputSearch.type = "text";
inputSearch.placeholder = "💖 Entrez le nom du produit...";
inputSearch.style.padding = "10px 15px";
inputSearch.style.width = "250px";
inputSearch.style.border = "2px solid #ff69b4";
inputSearch.style.borderRadius = "20px";
inputSearch.style.outline = "none";
inputSearch.style.marginRight = "10px";

const btnSearch = document.createElement("button");
btnSearch.textContent = "Rechercher";
btnSearch.style.padding = "10px 20px";
btnSearch.style.backgroundColor = "#ff69b4";
btnSearch.style.color = "#fff";
btnSearch.style.border = "none";
btnSearch.style.borderRadius = "20px";
btnSearch.style.cursor = "pointer";

searchContainer.append(inputSearch, btnSearch);
const mainNav = document.querySelector(".main-nav");
if (mainNav) mainNav.after(searchContainer);
else document.body.prepend(searchContainer);

// Résultat texte et container produits
const resultText = document.createElement("div");
resultText.style.fontWeight = "bold";
resultText.style.color = "#ff1493";
resultText.style.fontSize = "20px";
resultText.style.textAlign = "center";
resultText.style.margin = "10px 0";
searchContainer.after(resultText);

const resultsContainer = document.createElement("div");
resultsContainer.style.display = "flex";
resultsContainer.style.flexWrap = "wrap";
resultsContainer.style.justifyContent = "center";
resultsContainer.style.gap = "15px";
resultsContainer.style.marginBottom = "20px";
searchContainer.after(resultsContainer);

// Afficher / cacher barre
rechercheLink?.addEventListener("click", (e) => {
  e.preventDefault();
  searchContainer.style.display = searchContainer.style.display === "none" ? "block" : "none";
  if (searchContainer.style.display === "block") inputSearch.focus();
});

// -------------------- RECHERCHE PRODUITS --------------------
async function handleRecherche(query) {
  btnSearch.style.backgroundColor = "#ff1493";

  if (!query) {
    resultText.textContent = "💖 Veuillez entrer un nom de produit !";
    resultsContainer.innerHTML = "";
    btnSearch.style.backgroundColor = "#ff69b4";
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/products/search?name=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Erreur serveur");
    const products = await res.json();
    resultsContainer.innerHTML = "";

    if (!products.length) {
      resultText.textContent = `💔 Aucun produit trouvé pour : "${query}"`;
      btnSearch.style.backgroundColor = "#ff69b4";
      return;
    }

    resultText.textContent = `💗 Produit(s) trouvé(s) pour : "${query}"`;

    const currentUserStr = localStorage.getItem("currentUser");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    products.forEach((p) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.id = `product-${p.id}`;
      card.style.width = "220px";
      card.style.border = "2px solid #ff69b4";
      card.style.borderRadius = "20px";
      card.style.padding = "15px";
      card.style.textAlign = "center";
      card.style.backgroundColor = "#fff0f5";

      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" style="width:100%; border-radius:15px;">
        <h4>${p.name}</h4>
        <p>${p.description}</p>
        <p style="font-weight:bold; color:#ff1493;">${p.price} DH</p>
      `;

      // ---- Bouton Ajouter au panier ----
      const btnAdd = document.createElement("button");
      btnAdd.textContent = "🛒 Ajouter au panier";
      btnAdd.style.padding = "8px 15px";
      btnAdd.style.marginTop = "10px";
      btnAdd.style.backgroundColor = "#ff69b4";
      btnAdd.style.color = "#fff";
      btnAdd.style.border = "none";
      btnAdd.style.borderRadius = "15px";
      btnAdd.style.cursor = "pointer";

      btnAdd.addEventListener("click", async () => {
        if (!currentUser) {
          alert("Veuillez vous connecter pour ajouter un produit au panier 💕");
          window.location.href = "/frontend/src/view/login.html";
          return;
        }

        // Ajouter produit au panier via backend
        try {
          const resCart = await fetch("http://localhost:3000/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: currentUser.id, productId: p.id, quantity: 1 })
          });
          const data = await resCart.json();
          if (data.success) alert(`Produit ajouté au panier 🛒`);
          else alert("Erreur : " + data.message);
        } catch (err) {
          console.error(err);
          alert("Erreur serveur, veuillez réessayer plus tard.");
        }
      });

      card.appendChild(btnAdd);
      resultsContainer.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    resultText.textContent = "💔 Erreur lors de la recherche";
    resultsContainer.innerHTML = "";
  }

  btnSearch.style.backgroundColor = "#ff69b4";
}

// -------------------- EVENTS --------------------
btnSearch.addEventListener("click", () => handleRecherche(inputSearch.value.trim()));
inputSearch.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleRecherche(inputSearch.value.trim());
});
});