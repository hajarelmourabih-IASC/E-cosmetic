console.log("panier.js chargé ✅");

const btnAccueil = document.getElementById("btnaccueil");
const btnVisage = document.getElementById("btnvisage");
const btnCorps = document.getElementById("btncorps");

btnAccueil.addEventListener("click", () => {
  window.location.href = "accueil.html";
});
btnVisage.addEventListener("click", () => {
  window.location.href = "visage.html";
});
btnCorps.addEventListener("click", () => {
  window.location.href = "corps.html";
});


window.addEventListener("load", async () => {

  /*  Vérifier utilisateur */
  const userStr = localStorage.getItem("currentUser");
  if (!userStr) {
    alert("Veuillez vous connecter pour accéder au panier !");
    window.location.href = "/frontend/src/view/login.html";
    return;
  }
  const currentUser = JSON.parse(userStr);

  /* Message bienvenue */
  const header = document.querySelector(".main-header");
  const welcome = document.createElement("div");
  welcome.textContent = `Bonjour ${currentUser.name} 💕`;
  welcome.style.color = "rose";
   welcome.style.fontWeight = "bold";
  welcome.style.margin = "20px 0";
  header.prepend(welcome);

  /*  Récupérer panier */
  let cartItems = [];
  try {
    const res = await fetch(`http://localhost:3000/cart/user/${currentUser.id}`);
    cartItems = await res.json();
  } catch (err) {
    alert("Erreur chargement panier");
    return;
  }

  const cartDiv = document.querySelector(".cart");
  const emptyCartDiv = cartDiv.querySelector(".empty-cart");
  const summaryTable = cartDiv.querySelector(".summary-table");

  /* Container produits */
  const productsContainer = document.createElement("div");
  productsContainer.className = "cart-products";
  cartDiv.insertBefore(productsContainer, summaryTable);

  /*  AFFICHER PANIER*/
  function afficherPanier() {
    productsContainer.innerHTML = "";

    if (cartItems.length === 0) {
      emptyCartDiv.style.display = "block";
      summaryTable.style.display = "none";
      return;
    }

    emptyCartDiv.style.display = "none";
    summaryTable.style.display = "block";

    cartItems.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-product";
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.justifyContent = "space-between";
      div.style.marginBottom = "10px";
      div.style.border = "1px solid #ccc";
      div.style.padding = "10px";
      div.style.borderRadius = "8px";

      div.innerHTML = `
        <img src="${item.product.image}" width="60">
        <strong>${item.product.name}</strong>
        <span>${item.product.price} DH</span>
        <input type="number" min="1" value="${item.quantity}" style="width:50px">
        <button style="background:red;color:white;border:none;padding:5px">
          Supprimer
        </button>
      `;

      const inputQty = div.querySelector("input");
      const btnDelete = div.querySelector("button");

      /* Modifier quantité */
      inputQty.addEventListener("change", async () => {
        let qty = parseInt(inputQty.value);
        if (qty < 1) qty = 1;
        inputQty.value = qty;
        item.quantity = qty;

        await fetch(`http://localhost:3000/cart/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: qty })
        });

        updateTotal();
      });

      /* Supprimer produit (BACKEND) */
      btnDelete.addEventListener("click", async () => {
        const res = await fetch(`http://localhost:3000/cart/${item.id}`, {
          method: "DELETE"
        });
        const data = await res.json();

        if (data.success) {
          cartItems.splice(index, 1);
          afficherPanier();
        }
      });

      productsContainer.appendChild(div);
    });

    updateTotal();
  }

  /*  CALCUL TOTAL + LIVRAISON*/
  function updateTotal() {
    let subtotal = 0;

    cartItems.forEach(item => {
      subtotal += item.product.price * item.quantity;
    });

    let shipping = 30;
    if (subtotal >= 1500) {
      shipping = 0;
    }

    summaryTable.querySelector(".summary-row:nth-child(1) span:last-child")
      .textContent = `${subtotal},00 MAD`;

    summaryTable.querySelector(".summary-row:nth-child(2) span:last-child")
      .textContent = shipping === 0 ? "Gratuite" : "30,00 MAD";

    summaryTable.querySelector(".summary-row:nth-child(3) span:last-child")
      .textContent = `${subtotal + shipping},00 MAD`;

    const freeShippingDiv = cartDiv.querySelector(".free-shipping");
    if (subtotal >= 1500) {
      freeShippingDiv.textContent = "🎉 Livraison gratuite !";
    } else {
      freeShippingDiv.textContent =
        `Il ne vous manque plus que ${1500 - subtotal} DH pour livraison gratuite !`;
    }
  }

  afficherPanier();
});

/* =========================
   PASSER COMMANDE
========================= */
const payerBtn = document.getElementById("payer");
payerBtn?.addEventListener("click", () => {
  window.location.href = "/frontend/src/view/livraison.html";
});



// Bouton passer commande


// Étoiles
const stars = document.querySelectorAll("#stars span");
const voteMsg = document.getElementById("voteMsg");

// Quand le client clique sur "passer commande"
payerBtn.addEventListener("click", () => {
  // On sauvegarde que le client a acheté
  localStorage.setItem("hasPurchased", "true");
});

// Gestion du vote
stars.forEach(star => {
  star.addEventListener("click", () => {

    // Vérifier si le client a acheté
    const hasPurchased = localStorage.getItem("hasPurchased");

    if (!hasPurchased) {
      voteMsg.textContent = "❌ Vous devez passer une commande avant de voter.";
      voteMsg.style.color = "red";
      return;
    }

    // Nombre d'étoiles cliquées
    const rating = star.getAttribute("data-star");

    // Colorer les étoiles
    stars.forEach(s => {
      if (s.getAttribute("data-star") <= rating) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });

    voteMsg.textContent = `✅ Merci pour votre avis : ${rating} étoile(s) ⭐`;
    voteMsg.style.color = "green";
  });
});
