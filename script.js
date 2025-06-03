
document.getElementById("inscrireButton").addEventListener("click", function() {
    // Your specific function here
    // You can replace the alert with any other function you want to execute

    var loginArea = document.getElementById('loginArea');
    if (loginArea.style.display === 'block') {
        loginArea.style.display = 'none';
    } else {
        loginArea.style.display = 'block';
    }
});

// Password for admin access
const ADMIN_PASSWORD = "admin123"; // Replace with your desired password

// Get elements
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");
const adminContent = document.getElementById("adminContent");

// Handle form submission
loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting

    const enteredPassword = passwordInput.value;

    // Check if the entered password is correct
    if (enteredPassword === ADMIN_PASSWORD) {
        // Hide the login form and show the admin content
        loginForm.style.display = "none";
        errorMessage.textContent = "";
        adminContent.classList.remove("hidden");
    } else {
        // Show error message
        errorMessage.textContent = "Incorrect password. Please try again.";
    }
});
// script.js
document.addEventListener("DOMContentLoaded", function() {
    // Exemple : Ajouter un bouton pour masquer/afficher les sections
    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
        const button = document.createElement("button");
        button.textContent = "Masquer";
        button.style.marginTop = "10px";
        section.appendChild(button);

        button.addEventListener("click", () => {
            if (section.style.display === "none") {
                section.style.display = "block";
                button.textContent = "Masquer";
            } else {
                section.style.display = "none";
                button.textContent = "Afficher";
            }
        });
    });
});
