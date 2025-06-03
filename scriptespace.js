// script.js

// Effet au scroll : les sections apparaissent doucement
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const position = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (position < screenPosition) {
            section.classList.add('active');
        }
    });
});

// Fonction pour créer une animation légère
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('mouseover', function() {
            link.style.transform = 'scale(1.1)';
        });

        link.addEventListener('mouseout', function() {
            link.style.transform = 'scale(1)';
        });
    });
});
