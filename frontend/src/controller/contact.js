
document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            question.parentElement.classList.toggle('active');
        });
    });

    function sendMail(event) {
    event.preventDefault(); // empêche le formulaire de recharger la page

    const form = event.target;
    const name = form.user_name.value;
    const email = form.user_email.value;
    const phone = form.user_phone.value;
    const company = form.user_company.value;
    const message = form.message.value;

    // Crée le lien mailto
    const mailtoLink = `mailto:storecosmetic183@gmail.com?subject=Question de ${name}&body=
Nom: ${name}%0A
Email: ${email}%0A
Téléphone: ${phone}%0A
Société: ${company}%0A
Message: ${message}`;

    window.location.href = mailtoLink; // ouvre Gmail ou client mail par défaut
}