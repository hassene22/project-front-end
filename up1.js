document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const authBtn = document.getElementById('auth-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtns = document.querySelectorAll('.close');
    const navLinks = document.querySelectorAll('.nav-link');
    const footerLinks = document.querySelectorAll('.footer-link');
    const contentSections = document.querySelectorAll('.content-section');
    const userAvatar = document.querySelector('.user-avatar');
    const usernameDisplay = document.getElementById('username-display');
    const avatarImg = document.getElementById('user-avatar-img');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const signupBtn = document.getElementById('signup-btn');

    const signupModal = document.getElementById('signup-modal');
    // Inputs pour les changements d'images
    const avatarUpload = document.getElementById('avatar-upload');
    const headerBgUpload = document.getElementById('header-bg-upload');
    const bodyBgUpload = document.getElementById('body-bg-upload');
    
    // Options de connexion
    const studentLoginBtn = document.getElementById('student-login');
    const profLoginBtn = document.getElementById('prof-login');
    const adminLoginBtn = document.getElementById('admin-login');
    const loginFormsContainer = document.getElementById('login-forms');
    
    // Liens espace utilisateur
    const espaceEtudiantLink = document.getElementById('espace-etudiant-link');
    const espaceProfLink = document.getElementById('espace-prof-link');
    const espaceAdminLink = document.getElementById('espace-admin-link');

    // Données utilisateur (simulées)
    const users = {
        student: {
            name: "Étudiant Math",
            avatar: "student-avatar.jpg",
            sections: ['etudiant']
        },
        professor: {
            name: "Professeur Math",
            avatar: "prof-avatar.jpg",
            sections: ['professeur']
        },
        admin: {
            name: "Admin Département",
            avatar: "admin-avatar.jpg",
            sections: ['admin']
        }
    };

    // Gestion du menu burger
    burger.addEventListener('click', function() {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Gestion des dropdowns
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-menu').style.opacity = '1';
            this.querySelector('.dropdown-menu').style.visibility = 'visible';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-menu').style.opacity = '0';
            this.querySelector('.dropdown-menu').style.visibility = 'hidden';
        });
    });

    // Gestion de la navigation
    function switchSection(sectionId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });

        const activeSection = document.getElementById(`${sectionId}-section`);
        if (activeSection) {
            activeSection.classList.add('active');
            activeSection.classList.remove('hidden');
        }

        // Mettre à jour le lien actif dans la navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchSection(this.dataset.section);
        });
    });

    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchSection(this.dataset.section);
        });
    });

    // Gestion de l'authentification
    authBtn.addEventListener('click', function() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (isLoggedIn) {
            // Déconnexion
            localStorage.removeItem('userType');
            localStorage.removeItem('isLoggedIn');
            updateAuthUI();
            switchSection('accueil');
        } else {
            // Affichage du modal de connexion
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });

    // Fermer les modales
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Gestion des options de connexion
    function setupLoginOptions() {
        studentLoginBtn.addEventListener('click', function() {
            loginFormsContainer.innerHTML = `
                <form id="student-login-form">
                    <label for="student-email">Email universitaire</label>
                    <input type="email" id="student-email" required>
                    
                    <label for="student-password">Mot de passe</label>
                    <input type="password" id="student-password" required>
                    
                    <button type="submit">Se connecter</button>
                </form>
            `;
            resetLoginOptions();
            this.classList.add('active');
            
            // Gestion de la soumission du formulaire étudiant
            document.getElementById('student-login-form')?.addEventListener('submit', function(e) {
                e.preventDefault();
                loginUser('student');
            });
        });

        profLoginBtn.addEventListener('click', function() {
            loginFormsContainer.innerHTML = `
                <form id="prof-login-form">
                    <label for="prof-email">Email professionnel</label>
                    <input type="email" id="prof-email" required>
                    
                    <label for="prof-password">Mot de passe</label>
                    <input type="password" id="prof-password" required>
                    
                    <button type="submit">Se connecter</button>
                </form>
            `;
            resetLoginOptions();
            this.classList.add('active');
            
            // Gestion de la soumission du formulaire professeur
            document.getElementById('prof-login-form')?.addEventListener('submit', function(e) {
                e.preventDefault();
                loginUser('professor');
            });
        });

        adminLoginBtn.addEventListener('click', function() {
            loginFormsContainer.innerHTML = `
                <form id="admin-login-form">
                    <label for="admin-email">Email administratif</label>
                    <input type="email" id="admin-email" required>
                    
                    <label for="admin-password">Mot de passe</label>
                    <input type="password" id="admin-password" required>
                    
                    <button type="submit">Se connecter</button>
                </form>
            `;
            resetLoginOptions();
            this.classList.add('active');
            
            // Gestion de la soumission du formulaire admin
            document.getElementById('admin-login-form')?.addEventListener('submit', function(e) {
                e.preventDefault();
                loginUser('admin');
            });
        });
    }

    function resetLoginOptions() {
        const options = document.querySelectorAll('.login-option');
        options.forEach(option => {
            option.classList.remove('active');
        });
    }

    function loginUser(userType) {
        localStorage.setItem('userType', userType);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Charger l'avatar et les préférences de l'utilisateur
        const user = users[userType];
        if (localStorage.getItem(`${userType}-avatar`)) {
            avatarImg.src = localStorage.getItem(`${userType}-avatar`);
        } else {
            avatarImg.src = user.avatar;
        }
        
        updateAuthUI();
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        switchSection(user.sections[0]);
    }

    // Gestion du changement d'avatar
    avatarUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const userType = localStorage.getItem('userType');
                if (userType) {
                    localStorage.setItem(`${userType}-avatar`, event.target.result);
                    avatarImg.src = event.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Gestion du changement de background header
    headerBgUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.querySelector('header').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${event.target.result})`;
                localStorage.setItem('headerBg', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Gestion du changement de background body
    bodyBgUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.body.style.backgroundImage = `url(${event.target.result})`;
                localStorage.setItem('bodyBg', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Mise à jour de l'UI en fonction de l'état d'authentification
    function updateAuthUI() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userType = localStorage.getItem('userType');
        
        if (isLoggedIn && userType) {
            // Utilisateur connecté
            authBtn.textContent = 'Se déconnecter';
            userAvatar.classList.remove('hidden');
            
            // Afficher l'avatar et le nom
            const user = users[userType];
            usernameDisplay.textContent = user.name;
            
            // Afficher les sections appropriées
            document.querySelectorAll('.user-nav').forEach(nav => nav.classList.add('hidden'));
            document.querySelector(`.${userType}-nav`).classList.remove('hidden');
        } else {
            // Utilisateur non connecté
            authBtn.textContent = 'Se connecter';
            userAvatar.classList.add('hidden');
            
            // Masquer toutes les sections utilisateur
            document.querySelectorAll('.user-nav').forEach(nav => nav.classList.add('hidden'));
        }
    }

    // Charger les préférences utilisateur
    function loadPreferences() {
        const headerBg = localStorage.getItem('headerBg');
        const bodyBg = localStorage.getItem('bodyBg');
        
        if (headerBg) {
            document.querySelector('header').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${headerBg})`;
        }
        
        if (bodyBg) {
            document.body.style.backgroundImage = `url(${bodyBg})`;
        }
    }

    // Redirection vers les formulaires de connexion depuis le menu déroulant
    espaceEtudiantLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        studentLoginBtn.click();
    });

    espaceProfLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        profLoginBtn.click();
    });

    espaceAdminLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        adminLoginBtn.click();
    });

    // Initialisation
    function init() {
        setupLoginOptions();
        loadPreferences();
        updateAuthUI();
        switchSection('accueil');
        
        // Activer le formulaire étudiant par défaut
        studentLoginBtn.click();
    }

    init();
});
const studentSignupBtn = document.getElementById('student-signup');
const profSignupBtn = document.getElementById('prof-signup');
const adminSignupBtn = document.getElementById('admin-signup');
const signupFormsContainer = document.getElementById('signup-forms');

const studentSignupForm = `
<form id="student-signup-form">
    <label for="student-signup-name">Nom complet</label>
    <input type="text" id="student-signup-name" required>
    
    <label for="student-signup-email">Email universitaire</label>
    <input type="email" id="student-signup-email" required>
    
    <label for="student-signup-matricule">Numéro matricule</label>
    <input type="text" id="student-signup-matricule" required>
    
    <label for="student-signup-password">Mot de passe</label>
    <input type="password" id="student-signup-password" required>
    
    <label for="student-signup-confirm">Confirmer le mot de passe</label>
    <input type="password" id="student-signup-confirm" required>
    
    <button type="submit">S'inscrire</button>
</form>
`;

const profSignupForm = `
<form id="prof-signup-form">
    <label for="prof-signup-name">Nom complet</label>
    <input type="text" id="prof-signup-name" required>
    
    <label for="prof-signup-email">Email professionnel</label>
    <input type="email" id="prof-signup-email" required>
    
    <label for="prof-signup-department">Département</label>
    <input type="text" id="prof-signup-department" required>
    
    <label for="prof-signup-password">Mot de passe</label>
    <input type="password" id="prof-signup-password" required>
    
    <label for="prof-signup-confirm">Confirmer le mot de passe</label>
    <input type="password" id="prof-signup-confirm" required>
    
    <button type="submit">S'inscrire</button>
</form>
`;

const adminSignupForm = `
<form id="admin-signup-form">
    <label for="admin-signup-name">Nom complet</label>
    <input type="text" id="admin-signup-name" required>
    
    <label for="admin-signup-email">Email administratif</label>
    <input type="email" id="admin-signup-email" required>
    
    <label for="admin-signup-position">Poste</label>
    <input type="text" id="admin-signup-position" required>
    
    <label for="admin-signup-password">Mot de passe</label>
    <input type="password" id="admin-signup-password" required>
    
    <label for="admin-signup-confirm">Confirmer le mot de passe</label>
    <input type="password" id="admin-signup-confirm" required>
    
    <button type="submit">S'inscrire</button>
</form>
`;
studentSignupBtn.addEventListener('click', function() {
    signupFormsContainer.innerHTML = studentSignupForm;
    resetSignupOptions();
    this.classList.add('active');
    
    // Gestion de la soumission du formulaire étudiant
    document.getElementById('student-signup-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('student-signup-name').value;
        const email = document.getElementById('student-signup-email').value;
        const matricule = document.getElementById('student-signup-matricule').value;
        const password = document.getElementById('student-signup-password').value;
        const confirm = document.getElementById('student-signup-confirm').value;
        
        if (password !== confirm) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        
        if (name && email && matricule && password) {
            alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            alert('Veuillez remplir tous les champs');
        }
    });
});

profSignupBtn.addEventListener('click', function() {
    signupFormsContainer.innerHTML = profSignupForm;
    resetSignupOptions();
    this.classList.add('active');
    
    // Gestion de la soumission du formulaire professeur
    document.getElementById('prof-signup-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('prof-signup-name').value;
        const email = document.getElementById('prof-signup-email').value;
        const department = document.getElementById('prof-signup-department').value;
        const password = document.getElementById('prof-signup-password').value;
        const confirm = document.getElementById('prof-signup-confirm').value;
        
        if (password !== confirm) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        
        if (name && email && department && password) {
            alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            alert('Veuillez remplir tous les champs');
        }
    });
});

adminSignupBtn.addEventListener('click', function() {
    signupFormsContainer.innerHTML = adminSignupForm;
    resetSignupOptions();
    this.classList.add('active');
    
    // Gestion de la soumission du formulaire admin
    document.getElementById('admin-signup-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('admin-signup-name').value;
        const email = document.getElementById('admin-signup-email').value;
        const position = document.getElementById('admin-signup-position').value;
        const password = document.getElementById('admin-signup-password').value;
        const confirm = document.getElementById('admin-signup-confirm').value;
        
        if (password !== confirm) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        
        if (name && email && position && password) {
            alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            alert('Veuillez remplir tous les champs');
        }
    });
});

 // Gestion des clics sur les options d'inscription
 studentSignupBtn.addEventListener('click', function() {
    signupFormsContainer.innerHTML = studentSignupForm;
    resetSignupOptions();
    this.classList.add('active');
    
    // Gestion de la soumission du formulaire étudiant
    document.getElementById('student-signup-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('student-signup-name').value;
        const email = document.getElementById('student-signup-email').value;
        const matricule = document.getElementById('student-signup-matricule').value;
        const password = document.getElementById('student-signup-password').value;
        const confirm = document.getElementById('student-signup-confirm').value;
        
        if (password !== confirm) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        
        if (name && email && matricule && password) {
            alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            alert('Veuillez remplir tous les champs');
        }
    });
});

profSignupBtn.addEventListener('click', function() {
    signupFormsContainer.innerHTML = profSignupForm;
    resetSignupOptions();
    this.classList.add('active');
    
    // Gestion de la soumission du formulaire professeur
    document.getElementById('prof-signup-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('prof-signup-name').value;
        const email = document.getElementById('prof-signup-email').value;
        const department = document.getElementById('prof-signup-department').value;
        const password = document.getElementById('prof-signup-password').value;
        const confirm = document.getElementById('prof-signup-confirm').value;
        
        if (password !== confirm) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        
        if (name && email && department && password) {
            alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            alert('Veuillez remplir tous les champs');
        }
    });
});

adminSignupBtn.addEventListener('click', function() {
    signupFormsContainer.innerHTML = adminSignupForm;
    resetSignupOptions();
    this.classList.add('active');
    
    // Gestion de la soumission du formulaire admin
    document.getElementById('admin-signup-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('admin-signup-name').value;
        const email = document.getElementById('admin-signup-email').value;
        const position = document.getElementById('admin-signup-position').value;
        const password = document.getElementById('admin-signup-password').value;
        const confirm = document.getElementById('admin-signup-confirm').value;
        
        if (password !== confirm) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        
        if (name && email && position && password) {
            alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            alert('Veuillez remplir tous les champs');
        }
    });
});
function resetSignupOptions() {
    const options = document.querySelectorAll('.signup-option');
    options.forEach(option => {
        option.classList.remove('active');
    });
}