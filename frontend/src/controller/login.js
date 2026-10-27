
if (!localStorage.getItem("currentUser")) {
  console.log("Mode visiteur actif : localStorage vide");
  // localStorage.clear(); // à activer si tu veux forcer visiteur
}

const submitBtn = document.getElementById("submit");
const inputEmail = document.getElementById("mail");
const passwordInput = document.getElementById("pass");

const signupLink = document.getElementById("ins");
signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "sign.html";
});

let result = document.getElementById("result");
if (!result) {
  result = document.createElement("div");
  result.id = "result";
  result.style.marginTop = "10px";
  document.querySelector(".login-container form").appendChild(result);
}

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = inputEmail.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    result.textContent = "Veuillez remplir tous les champs";
    result.style.color = "red";
    return;
  }

  result.textContent = "Connexion en cours...";
  result.style.color = "black";

  try {
    const res = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      // ✅ Stocker l'utilisateur dans localStorage
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        })
      );

      // Redirection après connexion
      window.location.href = "accueil.html";
    } else {
      result.textContent = data.message || "Email ou mot de passe invalide";
      result.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    result.textContent = "Erreur serveur ou problème CORS";
    result.style.color = "red";
  }
});
