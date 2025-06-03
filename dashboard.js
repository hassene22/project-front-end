  const ctx = document.getElementById('statsChart').getContext('2d');
  const statsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Structures Recherche', 'Départements', 'Élèves Ingénieurs',
        'Diplômés/an', 'Mastériens', 'Doctorants', 'Permanents',
        'Corps A (%)', 'Contractuels', 'Vacataires', 
        'Experts', 'Ingénieurs', 'Techniciens', 'Administratifs'
      ],
      datasets: [{
        label: 'Effectifs & Répartition',
        data: [7, 6, 930, 250, 120, 250, 150, 32, 8, 11, 2, 2, 10, 42],
        backgroundColor: [
          '#1abc9c', '#2ecc71', '#3498db', '#9b59b6',
          '#f1c40f', '#e67e22', '#e74c3c', '#34495e',
          '#16a085', '#2980b9', '#8e44ad', '#f39c12',
          '#d35400', '#7f8c8d'
        ],
        borderRadius: 5
      }]
    },
    options: {
      animation: {
        duration: 1500,
        easing: 'easeOutBounce'
      },
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Valeurs' }
        },
        x: {
          title: { display: true, text: 'Catégories' }
        }
      }
    }
  });

