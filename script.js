const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('#navMenu a').forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const roleElement = document.getElementById('typedRole');
const roles = ['Aspiring Full Stack Developer', 'Computer Science Student', 'Problem Solver', 'Technology Enthusiast'];
let roleIndex = 0, charIndex = roles[0].length, deleting = false;
function typeRole() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    roleElement.textContent = current.slice(0, charIndex);
    if (charIndex >= current.length) { deleting = true; setTimeout(typeRole, 1500); return; }
  } else {
    charIndex--;
    roleElement.textContent = current.slice(0, charIndex);
    if (charIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
  }
  setTimeout(typeRole, deleting ? 35 : 65);
}
setTimeout(() => { deleting = true; typeRole(); }, 2200);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 500);
  const sections = [...document.querySelectorAll('main section[id]')];
  let current = 'home';
  sections.forEach(section => { if (window.scrollY >= section.offsetTop - 160) current = section.id; });
  document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
});
backTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
