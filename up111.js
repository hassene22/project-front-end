document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const authBtn = document.getElementById('auth-btn');
    const etudiantLink = document.getElementById('espace-etudiant-link');
    const profLink = document.getElementById('espace-prof-link');
    const adminLink = document.getElementById('espace-admin-link');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close');

    // Configuration des interfaces et redirections
    const interfaces = {
        etudiant: {
            formId: 'etudiant-form',
            title: 'Connexion Étudiant',
            emailLabel: 'Email Institutionnel',
            placeholder: 'prenom.nom@ensit.rnu.tn',
            redirectUrl: 'E-etudient.html'
        },
        professeur: {
            formId: 'professeur-form',
            title: 'Connexion Professeur',
            emailLabel: 'Email Professionnel',
            placeholder: 'prof.adr@ensit.rnu.tn',
            redirectUrl: 'E-prof.html'
        },
        admin: {
            formId: 'admin-form',
            title: 'Connexion Administration',
            emailLabel: 'Email Administratif',
            placeholder: 'admin.adr@ensit.rnu.tn',
            redirectUrl: 'E-adm.html'
        }
    };

    // Afficher une interface spécifique
    function showInterface(type) {
        // Masquer tous les formulaires
        document.querySelectorAll('.login-form').forEach(form => {
            form.style.display = 'none';
        });

        // Afficher le formulaire correspondant
        const form = document.getElementById(interfaces[type].formId);
        if (form) {
            form.style.display = 'block';
            
            // Mettre à jour les textes spécifiques
            document.getElementById('modal-title').textContent = interfaces[type].title;
            
            const emailLabel = form.querySelector('label[for^="email-"]');
            const emailInput = form.querySelector('input[type="email"]');
            
            if (emailLabel) emailLabel.textContent = interfaces[type].emailLabel;
            if (emailInput) emailInput.placeholder = interfaces[type].placeholder;
        }

        // Afficher le modal
        loginModal.style.display = 'block';
    }

    // Gestion des clics sur les liens
    etudiantLink.addEventListener('click', function(e) {
        e.preventDefault();
        showInterface('etudiant');
    });

    profLink.addEventListener('click', function(e) {
        e.preventDefault();
        showInterface('professeur');
    });

    adminLink.addEventListener('click', function(e) {
        e.preventDefault();
        showInterface('admin');
    });

    // Bouton "Se connecter" principal (par défaut: étudiant)
    authBtn.addEventListener('click', function() {
        showInterface('etudiant');
    });

    // Fermeture du modal
    closeBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });
    // Ajoutez cette partie à votre code existant (à la fin par exemple)

// Gestion de la touche Échap pour fermer le modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && loginModal.style.display === 'block') {
        loginModal.style.display = 'none';
    }
});

    // Gestion de la soumission des formulaires
    document.querySelectorAll('.login-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formId = e.target.id;
            const userType = formId.split('-')[0];
            const config = interfaces[userType];
            
            // Récupérer les valeurs
            const email = e.target.querySelector('input[type="email"]').value;
            const password = e.target.querySelector('input[type="password"]').value;
            
            // Validation
            if (!email || !password) {
                alert('Veuillez remplir tous les champs');
                return;
            }
            
            // Ici vous pouvez ajouter la vérification des identifiants
            
            // Fermer le modal
            loginModal.style.display = 'none';
            
            // Redirection vers la page spécifique
            window.location.href = config.redirectUrl;
        });
    });

    // Fermer en cliquant à l'extérieur
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
});
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });
});