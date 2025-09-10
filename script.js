document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 10000); // Change every 10 seconds
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    // Initialize carousel
    startCarousel();

    // Add click functionality to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
            stopCarousel();
            startCarousel(); // Restart the timer
        });
    });

    // Pause carousel on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarousel);
        carouselContainer.addEventListener('mouseleave', startCarousel);
    }

    // Cultivos selection functionality
    const cultivoBtns = document.querySelectorAll('.cultivo-btn');
    const sectionTitle = document.querySelector('.section-title');
    
    cultivoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            cultivoBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update section title
            const cultivoName = this.querySelector('.cultivo-name').textContent;
            sectionTitle.textContent = `Cultivos - Seleccionado: ${cultivoName}`;
            
            // Update market data based on selected crop
            updateMarketData(cultivoName);
        });
    });
    
    // Período selection functionality
    const periodoBtns = document.querySelectorAll('.periodo-btn:not(.currency)');
    
    periodoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all período buttons
            periodoBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Theme toggle functionality
    const themeBtn = document.querySelector('.theme-btn');
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark';
        } else {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light';
        }
    });
    
    // Update now button functionality
    const updateBtn = document.querySelector('.update-btn');
    const statusInfo = document.querySelector('.status-info');
    
    updateBtn.addEventListener('click', function() {
        // Show loading state
        updateBtn.textContent = 'Actualizando...';
        updateBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            const now = new Date();
            const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
            
            statusInfo.textContent = `Cultivo: Maíz | Última actualización: ${dateStr}`;
            updateBtn.textContent = 'Actualizar ahora';
            updateBtn.disabled = false;
            
            // Add success animation
            updateBtn.style.background = '#4CAF50';
            setTimeout(() => {
                updateBtn.style.background = '#2196F3';
            }, 1000);
        }, 2000);
    });
    
    // Market card eye button functionality
    const marketActions = document.querySelectorAll('.market-action');
    
    marketActions.forEach(action => {
        action.addEventListener('click', function() {
            const card = this.closest('.market-card');
            const title = card.querySelector('.market-title').textContent;
            
            // Simple modal simulation
            alert(`Mostrando detalles para ${title}`);
        });
    });
    
    // Function to update market data based on selected crop
    function updateMarketData(crop) {
        const marketData = {
            'Maíz': {
                'ROSARIO': { price: '205.000', status: 'NEG.ÚLTIMA RUEDA', statusClass: 'neg' },
                'BAHÍA BLANCA': { price: '220.000', status: 'A TRABAJAR', statusClass: 'work' },
                'QUEQUÉN': { price: '187.000', status: 'ABIERTO', statusClass: 'open' },
                'TIMBUES': { price: '145.000', status: 'NEGOCIADO', statusClass: 'negotiated' },
                'JUNÍN': { price: '199.000', status: 'NEG.ÚLTIMA RUEDA', statusClass: 'neg' }
            },
            'Trigo': {
                'ROSARIO': { price: '185.000', status: 'ABIERTO', statusClass: 'open' },
                'BAHÍA BLANCA': { price: '190.000', status: 'NEGOCIADO', statusClass: 'negotiated' },
                'QUEQUÉN': { price: '175.000', status: 'A TRABAJAR', statusClass: 'work' },
                'TIMBUES': { price: '180.000', status: 'ABIERTO', statusClass: 'open' },
                'JUNÍN': { price: '178.000', status: 'NEG.ÚLTIMA RUEDA', statusClass: 'neg' }
            },
            'Soja': {
                'ROSARIO': { price: '315.000', status: 'NEGOCIADO', statusClass: 'negotiated' },
                'BAHÍA BLANCA': { price: '320.000', status: 'ABIERTO', statusClass: 'open' },
                'QUEQUÉN': { price: '310.000', status: 'A TRABAJAR', statusClass: 'work' },
                'TIMBUES': { price: '318.000', status: 'NEGOCIADO', statusClass: 'negotiated' },
                'JUNÍN': { price: '312.000', status: 'NEG.ÚLTIMA RUEDA', statusClass: 'neg' }
            },
            'Girasol': {
                'ROSARIO': { price: '425.000', status: 'ABIERTO', statusClass: 'open' },
                'BAHÍA BLANCA': { price: '430.000', status: 'NEGOCIADO', statusClass: 'negotiated' },
                'QUEQUÉN': { price: '420.000', status: 'A TRABAJAR', statusClass: 'work' },
                'TIMBUES': { price: '428.000', status: 'ABIERTO', statusClass: 'open' },
                'JUNÍN': { price: '422.000', status: 'NEG.ÚLTIMA RUEDA', statusClass: 'neg' }
            },
            'Sorgo': {
                'ROSARIO': { price: '165.000', status: 'NEGOCIADO', statusClass: 'negotiated' },
                'BAHÍA BLANCA': { price: '170.000', status: 'ABIERTO', statusClass: 'open' },
                'QUEQUÉN': { price: '160.000', status: 'A TRABAJAR', statusClass: 'work' },
                'TIMBUES': { price: '168.000', status: 'NEGOCIADO', statusClass: 'negotiated' },
                'JUNÍN': { price: '162.000', status: 'NEG.ÚLTIMA RUEDA', statusClass: 'neg' }
            },
            'Cebada': {
                'ROSARIO': { price: '195.000', status: 'ABIERTO', statusClass: 'open' },
                'BAHÍA BLANCA': { price: '200.000', status: 'NEGOCIADO', statusClass: 'negotiated' },
                'QUEQUÉN': { price: '190.000', status: 'A TRABAJAR', statusClass: 'work' },
                'TIMBUES': { price: '198.000', status: 'ABIERTO', statusClass: 'open' },
                'JUNÍN': { price: '192.000', status: 'NEG.ÚLTIMA RUEDA', statusClass: 'neg' }
            }
        };
        
        const data = marketData[crop];
        if (data) {
            const marketCards = document.querySelectorAll('.market-card');
            
            marketCards.forEach(card => {
                const title = card.querySelector('.market-title').textContent;
                const price = card.querySelector('.market-price');
                const status = card.querySelector('.market-status');
                
                if (data[title]) {
                    price.textContent = `$ ${data[title].price}`;
                    status.textContent = data[title].status;
                    status.className = `market-status ${data[title].statusClass}`;
                }
            });
            
            // Update status info
            statusInfo.textContent = `Cultivo: ${crop} | Última actualización: 19/2025, 04:04:17`;
        }
    }
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Add loading animation for market cards
    const marketCards = document.querySelectorAll('.market-card');
    marketCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add CSS for light theme
const lightThemeCSS = `
.light-theme {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    color: #333;
}

.light-theme .header {
    background: rgba(255, 255, 255, 0.95);
}

.light-theme .nav-link {
    color: #666;
}

.light-theme .nav-link:hover,
.light-theme .nav-link.active {
    color: #007bff;
    background: rgba(0, 123, 255, 0.1);
}

.light-theme .market-card {
    background: rgba(255, 255, 255, 0.9);
    color: #333;
}

.light-theme .cultivo-btn {
    background: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.1);
    color: #333;
}

.light-theme .periodo-btn {
    background: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.1);
    color: #333;
}

.light-theme .filter-select {
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(0, 0, 0, 0.1);
    color: #333;
}

.light-theme .data-status {
    background: rgba(0, 0, 0, 0.05);
}

.light-theme .section-title,
.light-theme .periodo-title,
.light-theme .granos-title {
    color: #333;
}
`;

// Inject light theme CSS
const style = document.createElement('style');
style.textContent = lightThemeCSS;
document.head.appendChild(style);
