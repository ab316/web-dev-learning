const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu(e) {
  menuBtn.classList.toggle('close');
  menu.classList.toggle('show');
  menuNav.classList.toggle('show');
  menuBranding.classList.toggle('show');
  navItems.forEach(i => i.classList.toggle('show'));
}
