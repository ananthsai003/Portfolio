// --- Mobile menu toggle ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- Active link on scroll (simple scrollspy) ---
const sections = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('.nav-link')];
const setActive = () => {
  const pos = window.scrollY + 120;
  let current = sections[0].id;
  sections.forEach(s => { if (pos >= s.offsetTop) current = s.id; });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
};
window.addEventListener('scroll', setActive);
setActive();

// --- Reveal animations ---
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
},{threshold: 0.14});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- Year + resume mock ---
document.getElementById('yr').textContent = new Date().getFullYear();
document.getElementById('downloadCV').addEventListener('click', (e)=>{
  e.preventDefault();
  alert('Hook this to your PDF résumé URL (e.g., /files/Ananth_Sai_Resume.pdf).');
});

// --- Contact form → Flask backend (adjust URL if needed) ---
const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const formData = new FormData(form);

  try {
    const res = await fetch('http://127.0.0.1:5000/send_email', {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    alert(data.message || 'Sent!');
    if (data.status === 'success') form.reset();
  } catch (err) {
    alert('Error sending message: ' + err.message);
  }
});
