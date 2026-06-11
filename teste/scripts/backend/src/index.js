Chart.defaults.color = 'white';
Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.07)';

const ctx1 = document.getElementById('teste1');

        const myChart = new Chart(ctx1, {
            type: 'bar', 
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                    label: 'Sales ($)',
                    data: [1200, 1900, 3000, 2500, 3200, 4000],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3 
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    colors: {
                        enabled: true
                    },  
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const ctx2 = document.getElementById('teste2');

        const myChart2 = new Chart(ctx2, {
            type: 'doughnut', 
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                    label: 'Sales ($)',
                    data: [1200, 1900, 3000, 2500, 3200, 4000],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3 
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const ctx3 = document.getElementById('teste3');

        const myChart3 = new Chart(ctx3, {
            type: 'line', 
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                    label: 'Sales ($)',
                    data: [1200, 1900, 3000, 2500, 3200, 4000],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3 
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const ctx4 = document.getElementById('teste4');

        const myChart4 = new Chart(ctx4, {
            type: 'bar', 
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                    label: 'Sales ($)',
                    data: [1200, 1900, 3000, 2500, 3200, 4000],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3 
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });