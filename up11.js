document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const authBtn = document.getElementById('auth-btn');
    const espaceLinks = document.querySelectorAll('.espace-link'); // Liens sous Accueil
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeBtns = document.querySelectorAll('.close');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // Form Templates
    const loginForms = {
        etudiant: `
            <form id="etudiant-login-form" class="auth-form">
                <div class="form-group">
                    <label for="etudiant-email">Email universitaire</label>
                    <input type="email" id="etudiant-email" required>
                </div>
                <div class="form-group">
                    <label for="etudiant-password">Mot de passe</label>
                    <input type="password" id="etudiant-password" required>
                </div>
                <button type="submit" class="submit-btn">Se connecter</button>
            </form>
        `,
        professeur: `
            <form id="professeur-login-form" class="auth-form">
                <div class="form-group">
                    <label for="professeur-email">Email professionnel</label>
                    <input type="email" id="professeur-email" required>
                </div>
                <div class="form-group">
                    <label for="professeur-password">Mot de passe</label>
                    <input type="password" id="professeur-password" required>
                </div>
                <button type="submit" class="submit-btn">Se connecter</button>
            </form>
        `,
        admin: `
            <form id="admin-login-form" class="auth-form">
                <div class="form-group">
                    <label for="admin-email">Email administratif</label>
                    <input type="email" id="admin-email" required>
                </div>
                <div class="form-group">
                    <label for="admin-password">Mot de passe</label>
                    <input type="password" id="admin-password" required>
                </div>
                <button type="submit" class="submit-btn">Se connecter</button>
            </form>
        `
    };
    
    const signupForms = {
        etudiant: `
            <form id="etudiant-signup-form" class="auth-form">
                <div class="form-group">
                    <label for="etudiant-name">Nom complet</label>
                    <input type="text" id="etudiant-name" required>
                </div>
                <div class="form-group">
                    <label for="etudiant-email">Email universitaire</label>
                    <input type="email" id="etudiant-email" required>
                </div>
                <div class="form-group">
                    <label for="etudiant-password">Mot de passe</label>
                    <input type="password" id="etudiant-password" required>
                </div>
                <div class="form-group">
                    <label for="etudiant-confirm-password">Confirmer mot de passe</label>
                    <input type="password" id="etudiant-confirm-password" required>
                </div>
                <button type="submit" class="submit-btn">S'inscrire</button>
            </form>
        `,
        professeur: `
            <form id="professeur-signup-form" class="auth-form">
                <div class="form-group">
                    <label for="professeur-name">Nom complet</label>
                    <input type="text" id="professeur-name" required>
                </div>
                <div class="form-group">
                    <label for="professeur-email">Email professionnel</label>
                    <input type="email" id="professeur-email" required>
                </div>
                <div class="form-group">
                    <label for="professeur-password">Mot de passe</label>
                    <input type="password" id="professeur-password" required>
                </div>
                <div class="form-group">
                    <label for="professeur-confirm-password">Confirmer mot de passe</label>
                    <input type="password" id="professeur-confirm-password" required>
                </div>
                <button type="submit" class="submit-btn">S'inscrire</button>
            </form>
        `,
        admin: `
            <form id="admin-signup-form" class="auth-form">
                <div class="form-group">
                    <label for="admin-name">Nom complet</label>
                    <input type="text" id="admin-name" required>
                </div>
                <div class="form-group">
                    <label for="admin-email">Email administratif</label>
                    <input type="email" id="admin-email" required>
                </div>
                <div class="form-group">
                    <label for="admin-password">Mot de passe</label>
                    <input type="password" id="admin-password" required>
                </div>
                <div class="form-group">
                    <label for="admin-confirm-password">Confirmer mot de passe</label>
                    <input type="password" id="admin-confirm-password" required>
                </div>
                <button type="submit" class="submit-btn">S'inscrire</button>
            </form>
        `
    };
    
    // ------------------ Events ------------------
    
    authBtn?.addEventListener('click', () => openModal(loginModal));
    
    espaceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const espaceType = this.getAttribute('data-espace') || this.getAttribute('data-type');
            if (espaceType) {
                openLoginForEspace(espaceType);
            }
        });
    });
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) closeModal(loginModal);
        if (e.target === signupModal) closeModal(signupModal);
    });
    
    showSignup?.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(loginModal);
        openModal(signupModal);
    });
    
    showLogin?.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(signupModal);
        openModal(loginModal);
    });
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabContainer = this.closest('.login-tabs, .signup-tabs');
            tabContainer.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const formType = this.getAttribute('data-type');
            if (tabContainer.classList.contains('login-tabs')) {
                showLoginForm(formType);
            } else {
                showSignupForm(formType);
            }
        });
    });
    
    // Gestion de connexion/inscription
    document.addEventListener('submit', function(e) {
        if (e.target.closest('.auth-form')) {
            e.preventDefault();
            const formId = e.target.id;
            
            if (formId.includes('login')) {
                handleLogin(formId);
            } else {
                handleSignup(formId);
            }
        }
    });
    
    // ------------------ Fonctions ------------------
    
    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    function openLoginForEspace(type) {
        openModal(loginModal);
        showLoginForm(type);
        
        document.querySelectorAll('.login-tabs .tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-type') === type) {
                btn.classList.add('active');
            }
        });
    }
    
    function showLoginForm(type) {
        document.getElementById('login-forms').innerHTML = loginForms[type];
    }
    
    function showSignupForm(type) {
        document.getElementById('signup-forms').innerHTML = signupForms[type];
    }
    
    function handleLogin(formId) {
        const userType = formId.split('-')[0];
        
        console.log(`Tentative de connexion en tant que ${userType}`);
        
        setTimeout(() => {
            closeModal(loginModal);
            redirectToAccueil();
        }, 1000);
    }
    
    function handleSignup(formId) {
        const userType = formId.split('-')[0];
        const form = document.getElementById(formId);
        const password = form.querySelector('input[type="password"]').value;
        const confirmPassword = form.querySelector('input[type="password"]:last-of-type').value;
        
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas!');
            return;
        }
        
        console.log(`Inscription en tant que ${userType}`);
        
        setTimeout(() => {
            closeModal(signupModal);
            alert('Inscription réussie! Veuillez vous connecter.');
            openModal(loginModal);
            showLoginForm(userType);
        }, 1500);
    }
    
    function redirectToAccueil() {
        window.location.href = 'index.html'; // <- renvoie toujours vers Accueil
    }
    
    // Initialisation
    showLoginForm('etudiant');
    showSignupForm('etudiant');
});
