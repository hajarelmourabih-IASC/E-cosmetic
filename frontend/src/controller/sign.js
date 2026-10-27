
const inputmail = document.getElementById("mail");
const inputpassword = document.getElementById("pass");
const inputname = document.getElementById("nom");
const confirmerPassword = document.getElementById("cfmo");
const result = document.createElement("p"); 
const signupbtn = document.getElementById("sub");

// On ajoute le message d'erreur dans le formulaire
document.querySelector(".register-container form").appendChild(result);

signupbtn.addEventListener("click", async (e) => {
    e.preventDefault();

    result.textContent = "Vérification…";
    result.style.color = "black";

    const email = inputmail.value.trim();
    const password = inputpassword.value.trim();
    const name = inputname.value.trim();
    const confirmer = confirmerPassword.value.trim();

    // Validation simple
    if (!email || !password || !name || password !== confirmer) {
        result.textContent = "Veuillez remplir tous les champs correctement ou vérifier la confirmation du mot de passe";
        result.style.color = "red";
        return;
    }

    const user = { name, email, password };

    try {
      
        const response = await fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        if (data.success) {
            result.textContent = data.message;
            result.style.color = "green";
            // Stockage temporaire si besoin
            sessionStorage.setItem("currentUser", JSON.stringify(data.user));
            // Redirection après succès
            window.location.href = "login.html"; // Redirige vers login après inscription
        } else {
            result.textContent = data.message || "Erreur lors de l'inscription";
            result.style.color = "red";
        }
    } catch (error) {
        console.error(error);
        result.textContent = "Erreur serveur";
        result.style.color = "red";
    }
});
