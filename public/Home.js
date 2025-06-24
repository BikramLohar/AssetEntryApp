document.addEventListener('DOMContentLoaded', function() {
            const featureCards = document.querySelectorAll('.feature-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            
            featureCards.forEach(card => {
                observer.observe(card);
            });

            // Create additional floating elements dynamically
            const floatingContainer = document.querySelector('.floating-elements');
            for (let i = 0; i < 8; i++) {
                const size = Math.random() * 100 + 50;
                const top = Math.random() * 100;
                const left = Math.random() * 100;
                const delay = Math.random() * 10;
                const duration = Math.random() * 10 + 10;
                
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                element.style.top = `${top}%`;
                element.style.left = `${left}%`;
                element.style.animationDelay = `${delay}s`;
                element.style.animationDuration = `${duration}s`;
                
                floatingContainer.appendChild(element);
            }
        });

    function toggleNav(){
        const toggleNav=document.getElementById('navbar-links');
        toggleNav.classList.toggle('show')

    }

    // const navItems=document.querySelectorAll('.nav-item a');

    // navItems.forEach(item=>{
    //     item.addEventListener('click',()=>{
    //         navItems.forEach(i=>i.classList.remove('active'));
    //         item.classList.add('active');
    //     });
    // });
    
 const links = document.querySelectorAll('.nav-item a');
  const currentPath = window.location.pathname;

  links.forEach(link => {
    if (link.getAttribute('href') === currentPath.split('/').pop()) {
      link.parentElement.classList.add('active');
    }
  });