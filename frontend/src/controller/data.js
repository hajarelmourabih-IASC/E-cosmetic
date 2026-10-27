 const seche = document.getElementById("id-seche");
  const gras = document.getElementById("id-grasse");
   const mix = document.getElementById("id-mixte"); 
seche.addEventListener("click", () => {  return window.location.href = "seche.html"; });
gras.addEventListener("click", () => { return  window.location.href = "gras.html"; });
mix.addEventListener("click", () => {  return window.location.href = "mixte.html"; });
const consultButtons = document.querySelectorAll(".btn-consult");

consultButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const productCard = btn.closest(".product-card");

    if (!productCard) return;

    const skinType = productCard.dataset.skin;
    const productId = productCard.dataset.id;

    if (!skinType || !productId) return;

    //  redirection selon le type de peau
    if (skinType === "seche") {
      window.location.href = `/frontend/src/view/seche.html?id=${productId}`;
    } 
    else if (skinType === "grasse") {
      window.location.href = `/frontend/src/view/grasse.html?id=${productId}`;
    } 
    else if (skinType === "mixte") {
      window.location.href = `/frontend/src/view/mixte.html?id=${productId}`;
    }
  });
});
