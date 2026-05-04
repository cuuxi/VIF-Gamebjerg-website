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
const navHeight = document.querySelector('nav').offsetHeight;

function updateActiveLink() {
  const scrollY = window.scrollY + navHeight + 8;
  let current = sections[0].id;

  sections.forEach(section => {
    if (section.offsetTop <= scrollY) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
