                 
                             
                           
console.log("produits.js chargé ✅");


var currentUser = null;

// Récupérer currentUser depuis localStorage
var userStr = localStorage.getItem("currentUser");

if (userStr) {
  currentUser = JSON.parse(userStr);
  console.log("Utilisateur connecté :", currentUser.name);

  // Afficher un message de bienvenue
  var header = document.querySelector(".main-header");
  if (header) {
    var welcome = document.createElement("span");
    welcome.style.marginLeft = "20px";
    welcome.style.fontWeight = "bold";
    welcome.textContent = "Bienvenue " + currentUser.name + " 💕";
    header.appendChild(welcome);
  }
} else {
  console.log("Visiteur non connecté");
}


// Gestion du bouton Ajouter au panier

var addCartButtons = document.querySelectorAll(".btn-cart");

for (var i = 0; i < addCartButtons.length; i++) {
  addCartButtons[i].onclick = function(e) {
    e.preventDefault();

    // Vérifier si l'utilisateur est connecté
    if (!currentUser) {
      alert("Veuillez vous connecter pour ajouter un produit au panier 💕");
      redirect("login.html");
      return;
    }

    // Récupérer l'id du produit
    var productCard = this.closest(".product-card");
    if (!productCard) return;

    var productId = Number(productCard.id.replace("product-", ""));

    // Envoyer la requête POST
    fetch("http://localhost:3000/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: currentUser.id,
        productId: productId,
        quantity: 1
      })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.success) {
        alert("Produit ajouté au panier 🛒");
      } else {
        alert("Erreur : " + data.message);
      }
    })
    .catch(function(err) {
      console.error(err);
      alert("Erreur serveur, veuillez réessayer plus tard.");
    });
  };
}