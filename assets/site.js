'use strict';
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menü +';
}
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Schließen −' : 'Menü +';
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
const cards = [...document.querySelectorAll('.gallery-grid .project')];
const filters = document.querySelector('.filters');
if (filters) {
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const category = button.dataset.filter;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach(card => { card.hidden = category !== 'Alle' && card.dataset.category !== category; });
    document.querySelector('.gallery-count').textContent = `${cards.filter(card => !card.hidden).length} von ${cards.length} Bildern`;
  });
}
const dialog = document.querySelector('.lightbox');
const largeImage = dialog.querySelector('.lightbox-image');
const lightboxTitle = dialog.querySelector('#lightbox-title');
const lightboxDescription = dialog.querySelector('#lightbox-description');
const lightboxCounter = dialog.querySelector('#lightbox-counter');
let currentImages = [];
let currentIndex = 0;
let opener;
function displayImage(index) {
  currentIndex = (index + currentImages.length) % currentImages.length;
  const link = currentImages[currentIndex];
  largeImage.src = link.href;
  largeImage.alt = link.querySelector('img').alt;
  lightboxTitle.textContent = link.dataset.title;
  lightboxDescription.textContent = link.dataset.description;
  lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
}
document.addEventListener('click', event => {
  const link = event.target.closest('[data-lightbox]');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
  if (typeof dialog.showModal !== 'function') return;
  event.preventDefault();
  opener = link;
  const availableImages = [...document.querySelectorAll('[data-lightbox]')].filter(item => !item.closest('[hidden]'));
  currentImages = [...new Map(availableImages.map(item => [item.href, item])).values()];
  displayImage(currentImages.findIndex(item => item.href === link.href));
  dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.querySelector('[data-close]').focus();
});
dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
dialog.querySelector('[data-prev]').addEventListener('click', () => displayImage(currentIndex - 1));
dialog.querySelector('[data-next]').addEventListener('click', () => displayImage(currentIndex + 1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    displayImage(currentIndex + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  largeImage.removeAttribute('src');
  opener?.focus();
});

const slideshow = document.querySelector('.hero-slideshow');
if (slideshow) {
  const slides = [...slideshow.querySelectorAll('.hero-slide')];
  const counter = slideshow.querySelector('[data-slide-counter]');
  const pauseButton = slideshow.querySelector('[data-slide-pause]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeSlide = 0;
  let paused = reducedMotion.matches;
  let hovered = false;
  let timer;
  let request = 0;

  function updatePauseButton() {
    pauseButton.textContent = paused ? '▷' : 'Ⅱ';
    pauseButton.setAttribute('aria-label', paused ? 'Automatischen Bildwechsel starten' : 'Automatischen Bildwechsel pausieren');
  }
  function scheduleSlide() {
    clearTimeout(timer);
    if (!paused && !hovered && !document.hidden && !dialog.open) {
      timer = setTimeout(() => {
        if (!dialog.open) showSlide(activeSlide + 1);
      }, 5500);
    }
  }
  async function showSlide(index) {
    clearTimeout(timer);
    const next = (index + slides.length) % slides.length;
    const version = ++request;
    const nextImage = slides[next].querySelector('img');
    try { await nextImage.decode(); } catch {
      // Keep the current photo visible if the next one cannot load.
      scheduleSlide();
      return;
    }
    if (version !== request) return;
    activeSlide = next;
    counter.textContent = `${String(next + 1).padStart(2, '0')} / ${slides.length}`;
    counter.setAttribute('aria-label', `Bild ${next + 1} von ${slides.length}`);
    slides.forEach((slide, i) => {
      const active = i === next;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.tabIndex = active ? 0 : -1;
      slide.inert = !active;

    });
    scheduleSlide();
  }
  function manualSlide(index) {
    paused = true;
    updatePauseButton();
    showSlide(index);
  }
  slideshow.querySelector('[data-slide-prev]').addEventListener('click', () => manualSlide(activeSlide - 1));
  slideshow.querySelector('[data-slide-next]').addEventListener('click', () => manualSlide(activeSlide + 1));
  pauseButton.addEventListener('click', () => {
    paused = !paused;
    updatePauseButton();
    scheduleSlide();
  });
  // Keyboard focus stops rotation until the visitor explicitly restarts it.
  slideshow.addEventListener('focusin', event => {
    if (slideshow.contains(event.relatedTarget)) return;
    paused = true;
    updatePauseButton();
    scheduleSlide();
  });
  slideshow.addEventListener('mouseenter', () => { hovered = true; scheduleSlide(); });
  slideshow.addEventListener('mouseleave', () => { hovered = false; scheduleSlide(); });
  document.addEventListener('visibilitychange', scheduleSlide);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) paused = true;
    updatePauseButton();
    scheduleSlide();
  });
  dialog.addEventListener('close', scheduleSlide);
  slideshow.querySelector('.slideshow-controls').hidden = false;
  updatePauseButton();
  scheduleSlide();
}
