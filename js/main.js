// Kontaktformular via Formspree
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formStatus  = document.getElementById('formStatus');

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  submitBtn.textContent = 'Sender...';
  submitBtn.disabled    = true;
  formStatus.textContent = '';
  formStatus.className   = 'form-status';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      formStatus.textContent = '✓ Besked sendt – tak, vi vender tilbage snarest!';
      formStatus.className   = 'form-status success';
      contactForm.reset();
      submitBtn.textContent = 'Send besked ›';
      submitBtn.disabled    = false;
    } else {
      throw new Error('server error');
    }
  } catch {
    formStatus.textContent = '✗ Noget gik galt. Prøv igen eller skriv direkte til info@vifesport.dk';
    formStatus.className   = 'form-status error';
    submitBtn.textContent  = 'Send besked ›';
    submitBtn.disabled     = false;
  }
});

// Aktiv nav-link ved scroll
const navLinks = document.querySelectorAll('nav ul a');
const sections  = document.querySelectorAll('section[id], header[id]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));
