// Hamburger menu for mobile
const hamburger = document.getElementById('hamburger-menu');
const navList = document.getElementById('nav-list');
if (hamburger && navList) {
  function toggleMenu() {
    navList.classList.toggle('open');
  }
  hamburger.addEventListener('click', toggleMenu);
  hamburger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') toggleMenu();
  });
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navList.classList.remove('open'));
  });
}

// Typing animation for hero subtitle
function typeAnimation() {
  const typedText = document.getElementById('typed-text');
  if (!typedText) return;
  const titles = typedText.getAttribute('data-titles').split(',');
  let titleIndex = 0, charIndex = 0, isDeleting = false;
  function type() {
    const current = titles[titleIndex];
    if (isDeleting) {
      charIndex--;
      typedText.textContent = current.substring(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(type, 600);
      } else {
        setTimeout(type, 40);
      }
    } else {
      charIndex++;
      typedText.textContent = current.substring(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 1200);
      } else {
        setTimeout(type, 80);
      }
    }
  }
  type();
}
window.addEventListener('DOMContentLoaded', typeAnimation);

// Smooth scroll for navigation
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll reveal animation for sections
function revealOnScroll() {
  document.querySelectorAll('section').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add('reveal', 'visible');
    } else {
      section.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Animate skill bars when skills section is visible
function animateSkillBars() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    document.querySelectorAll('.skill-level').forEach(bar => {
      const width = bar.getAttribute('style').match(/width: (\d+%)/);
      if (width) {
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.transition = 'width 1.2s cubic-bezier(.4,2,.6,1)';
          bar.style.width = width[1];
        }, 200);
      }
    });
    window.removeEventListener('scroll', animateSkillBars);
  }
}
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('DOMContentLoaded', animateSkillBars);

// Placeholder for contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for reaching out! (Form submission is a placeholder.)');
    contactForm.reset();
  });
}

// Projects Slider Functionality
const projectsList = document.querySelector('.projects-list');
const projectCards = document.querySelectorAll('.project-card');
const prevBtn = document.getElementById('projects-prev');
const nextBtn = document.getElementById('projects-next');

let currentIndex = 0;
let cardsPerView = 3;

function updateCardsPerView() {
  if (window.innerWidth <= 700) {
    cardsPerView = 1;
  } else if (window.innerWidth <= 1100) {
    cardsPerView = 2;
  } else {
    cardsPerView = 3;
  }
}

function updateActiveCard() {
  projectCards.forEach((card, idx) => {
    card.classList.toggle('active', idx === currentIndex);
  });
}

function updateSlider() {
  const slider = document.querySelector('.projects-slider');
  const sliderPadding = window.innerWidth <= 700 ? 8 : 32;
  const cardWidth = projectCards[0].offsetWidth + 32; // card width + gap
  const offset = sliderPadding + currentIndex * cardWidth;
  projectsList.style.transform = `translateX(-${offset}px)`;
  updateActiveCard();
}

function showPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
}

function showNext() {
  if (currentIndex < projectCards.length - cardsPerView) {
    currentIndex++;
    updateSlider();
  }
}

prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

window.addEventListener('resize', () => {
  updateCardsPerView();
  if (currentIndex > projectCards.length - cardsPerView) {
    currentIndex = Math.max(0, projectCards.length - cardsPerView);
  }
  updateSlider();
});

// Initialize
updateCardsPerView();
updateSlider(); 