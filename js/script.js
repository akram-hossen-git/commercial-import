// Enhanced sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar with animation
    const menuToggle = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            wrapper.classList.toggle('toggled');
            
            // Add animation class
            const sidebar = document.getElementById('sidebar-wrapper');
            sidebar.classList.add('sidebar-animation');
            
            // Change icon
            const icon = this.querySelector('i');
            if (wrapper.classList.contains('toggled')) {
                icon.className = 'bi bi-x-lg';
            } else {
                icon.className = 'bi bi-list';
            }
        });
    }
    
    // Active menu highlighting
    const currentPage = window.location.pathname;
    const menuItems = document.querySelectorAll('.list-group-item');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPage.includes(href)) {
            item.classList.add('active');
        }
    });
    
    // Remove active class from all items when one is clicked
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Auto-expand accordion based on current page
    const piPages = ['pi-create.html', 'pi-view.html'];
    const ciPages = ['ci-create.html', 'ci-view.html'];
    const lcPages = ['lc-create.html', 'lc-view.html'];
    
    const pageName = currentPage.split('/').pop();
    
    if (piPages.includes(pageName)) {
        const piCollapse = new bootstrap.Collapse(document.getElementById('piCollapse'), {
            toggle: true
        });
    } else if (ciPages.includes(pageName)) {
        const ciCollapse = new bootstrap.Collapse(document.getElementById('ciCollapse'), {
            toggle: true
        });
    } else if (lcPages.includes(pageName)) {
        const lcCollapse = new bootstrap.Collapse(document.getElementById('lcCollapse'), {
            toggle: true
        });
    }
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Update notification badges randomly (demo purpose)
    setInterval(() => {
        const badges = document.querySelectorAll('.notification-badge');
        badges.forEach(badge => {
            const randomNum = Math.floor(Math.random() * 10);
            if (randomNum > 0) {
                badge.textContent = randomNum;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        });
    }, 10000); // Update every 10 seconds
    
    // Search functionality
    const searchInput = document.querySelector('input[placeholder="Search documents..."]');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                alert(`Searching for: ${this.value}`);
                this.value = '';
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Update current time in sidebar
    function updateSidebarTime() {
        const now = new Date();
        const options = { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const timeElement = document.querySelector('.sidebar-time');
        if (timeElement) {
            timeElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }
    
    // Call initially and update every minute
    updateSidebarTime();
    setInterval(updateSidebarTime, 60000);
});