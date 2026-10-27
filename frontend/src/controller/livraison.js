window.addEventListener("DOMContentLoaded", async () => {
  const userStr = localStorage.getItem("currentUser");
  if (!userStr) {
    alert("Veuillez vous connecter pour passer une commande !");
    window.location.href = "/frontend/src/View/login.html";
    return;
  }

  const user = JSON.parse(userStr);

  const orderForm = document.getElementById("orderForm");
  const totalSpan = document.getElementById("total");
  const shippingInputs = document.querySelectorAll('input[name="shipping"]');

  
  let cartItems = [];
  try {
    const res = await fetch(`http://localhost:3000/cart/user/${user.id}`);
    cartItems = await res.json();

    if (!cartItems || cartItems.length === 0) {
      alert("Votre panier est vide !");
      window.location.href = "/frontend/src/View/panier.html";
      return;
    }
  } catch (err) {
    console.error("Erreur récupération panier :", err);
    alert("Impossible de récupérer le panier !");
    return;
  }

  // 2️⃣ Calculer total initial
  function calculateTotal() {
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = Number(document.querySelector('input[name="shipping"]:checked').value);
    totalSpan.textContent = (subtotal + shipping).toFixed(2);
    return subtotal + shipping;
  }

  calculateTotal();

  //  Écouter le changement de frais de livraison
  shippingInputs.forEach(input => {
    input.addEventListener("change", () => {
      calculateTotal();
    });
  });

  //  Envoyer la commande
  orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = orderForm.querySelector('input[type="text"]').value.trim();
    const phone = orderForm.querySelector('input[type="tel"]').value.trim();
    const city = orderForm.querySelector('#city').value.trim();
    const address = orderForm.querySelectorAll('input[type="text"]')[1].value.trim();
    const email = orderForm.querySelector('input[type="email"]').value.trim();
    const shippingCost = Number(document.querySelector('input[name="shipping"]:checked').value);

    if (!fullName || !phone || !city || !address) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    // Préparer les données
    /*const orderData = {
      userId: user.id,
      fullName,
      phone,
      city,
      address,
      email: email || null,
      shippingCost
       
    };*/
    const orderData = {
  userId: user.id,
  fullName,
  phone,
  city,
  address,
  email: email || null,
  shippingCost,
  items: cartItems.map(item => ({
    productId: item.product.id,
    quantity: item.quantity,
    price: item.product.price
  }))
};

    try {
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (data.success) {
        alert("Commande passée avec succès ! 🎉");

        // Rediriger vers page de confirmation ou accueil
        window.location.href = "/frontend/src/view/accueil.html";
      } else {
        alert(data.message || "Erreur lors de la commande");
      }
    } catch (err) {
      console.error(err);
      alert("Impossible de passer la commande, réessayez plus tard.");
    }
  });

});

const closeBtn = document.getElementById("btnclose");

closeBtn.addEventListener("click", handleclose);

function handleclose() {
    window.location.href = "/frontend/src/view/panier.html";
}