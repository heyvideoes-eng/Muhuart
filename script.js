document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(
        entries,
        observer
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Form submission mock
    const form = document.querySelector('.minimal-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-primary');
            const originalText = btn.textContent;
            btn.textContent = 'Inquiry Sent';
            setTimeout(() => {
                btn.textContent = originalText;
                form.reset();
            }, 3000);
        });
    }
});
