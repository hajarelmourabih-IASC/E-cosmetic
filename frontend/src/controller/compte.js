const userInfo = document.getElementById("userInfo");
const btnLogout = document.getElementById("btnLogout");
const btnpanier = document.getElementById("btnpanier");

//  Vérifier si utilisateur connecté
const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
  window.location.href = "/frontend/src/view/login.html";
}

// Afficher infos utilisateur
const user = JSON.parse(currentUser);

userInfo.innerHTML = `
  <p><b>Nom :</b> ${user.name}</p>
  <p><b>Email :</b> ${user.email}</p>
`;

//  Logout
btnLogout.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/frontend/src/view/login.html";
});

//  Aller au panier
btnPanier.addEventListener("click", () => {
  window.location.href = "/frontend/src/view/panier.html";
});

const ordersDiv = document.getElementById("orders");

async function loadOrders() {
  try {
    const res = await fetch(`http://localhost:3000/orders/user/${user.id}`);
    const orders = await res.json();

    if (!orders.length) {
      ordersDiv.innerHTML = "<p>Aucune commande trouvée.</p>";
      return;
    }

    ordersDiv.innerHTML = orders.map(order => `
      <div class="order-card">
        <p><b>Date :</b> ${new Date(order.createdAt).toLocaleDateString()}</p>
        <p><b>Total :</b> ${order.total} dh</p>
        <ul>
          ${order.items.map(item => `
            <li>
              ${item.product.name} × ${item.quantity}
            </li>
          `).join("")}
        </ul>
      </div>
    `).join("");
  } catch (err) {
    console.error(err);
    ordersDiv.innerHTML = "<p>Erreur chargement commandes</p>";
  }
}

loadOrders();

