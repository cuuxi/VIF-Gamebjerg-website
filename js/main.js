document.querySelector('.signup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = 'Tak! Vi vender tilbage.';
  btn.disabled = true;
});

const navLinks = document.querySelectorAll('nav ul a');
const sections = document.querySelectorAll('section[id], header[id]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));
