gsap.registerPlugin(ScrollTrigger);

/* ── Custom Cursor ────────────────────── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  gsap.to(cursor, { x: mx, y: my, duration: 0.1 });
});

gsap.ticker.add(() => {
  fx += (mx - fx) * 0.1;
  fy += (my - fy) * 0.1;
  gsap.set(follower, { x: fx, y: fy });
});

document.querySelectorAll('a, button, .cat-card, .product-card, .blog-card, .polaroid').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursor, { width: 6, height: 6, duration: 0.3 });
    gsap.to(follower, { width: 56, height: 56, opacity: 0.8, duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursor, { width: 10, height: 10, duration: 0.3 });
    gsap.to(follower, { width: 36, height: 36, opacity: 0.5, duration: 0.3 });
  });
});

/* ── Navbar scroll ────────────────────── */
ScrollTrigger.create({
  start: 'top -80',
  onUpdate: self => {
    document.getElementById('navbar').classList.toggle('scrolled', self.progress > 0);
  }
});

/* ── Hero Animations ──────────────────── */
const heroTl = gsap.timeline({ delay: 0.3 });
heroTl
  .to('#heroEyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
  .to('#heroTitle',   { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }, '-=0.4')
  .to('#heroSub',     { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6')
  .to('#heroScroll',  { opacity: 1, duration: 0.6 }, '-=0.2');

/* ── About Section ────────────────────── */
gsap.timeline({
  scrollTrigger: { trigger: '#about', start: 'top bottom', once: true }
})
  .to('.about-label', { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' })
  .to('.about-title', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
  .to('.about-text',  { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
  .to('.about-left .btn', { opacity: 1, duration: 0.5 }, '-=0.3')
  .to('.about-image', { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=0.8');

/* ── Services / Polaroids ─────────────── */
gsap.timeline({
  scrollTrigger: { trigger: '#services', start: 'top bottom', once: true }
})
  .to('.services-label', { opacity: 1, duration: 0.6 })
  .to('.services-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.3')
  .to('.polaroid',       {
      opacity: 1, y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'back.out(1.2)'
    }, '-=0.4')
  .to('.services-cta',   { opacity: 1, duration: 0.5 }, '-=0.2');

/* Polaroid hover wiggle */
document.querySelectorAll('.polaroid').forEach(p => {
  const rot = parseFloat(getComputedStyle(p).getPropertyValue('--rot')) || 0;
  p.addEventListener('mouseenter', () => gsap.to(p, { rotation: rot * 1.5, scale: 1.06, duration: 0.3 }));
  p.addEventListener('mouseleave', () => gsap.to(p, { rotation: rot, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }));
});

/* ── Categories ───────────────────────── */
gsap.timeline({
  scrollTrigger: { trigger: '#categories', start: 'top bottom', once: true }
})
  .to('.section-label', { opacity: 1, duration: 0.6 })
  .to('.section-title', { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
  .to('.cat-card', {
      opacity: 1, y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.3');

/* ── Products ─────────────────────────── */
gsap.timeline({
  scrollTrigger: { trigger: '#products', start: 'top bottom', once: true }
})
  .to('.products-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
  .to('.products-link',  { opacity: 1, duration: 0.5 }, '-=0.4')
  .to('.product-card',   {
      opacity: 1, y: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power2.out'
    }, '-=0.2');

/* ── Blog ─────────────────────────────── */
gsap.timeline({
  scrollTrigger: { trigger: '#blog', start: 'top bottom', once: true }
})
  .to('.blog-title', { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
  .to('.blog-card',  {
      opacity: 1, y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');

/* ── Made with Love ───────────────────── */
gsap.timeline({
  scrollTrigger: { trigger: '#love', start: 'top bottom', once: true }
})
  .to('.love-hr',      { opacity: 1, scaleX: 1, duration: 0.6, transformOrigin: 'center' })
  .to('.love-title',   { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.2')
  .to('.love-tagline', { opacity: 1, duration: 0.6 }, '-=0.4');

/* ── Parallax on hero (after entrance anim) ── */
ScrollTrigger.create({
  trigger: '#hero',
  start: 'top top',
  end: 'bottom top',
  scrub: true,
  onUpdate: self => {
    gsap.set('.hero-shape',  { yPercent: self.progress * 20 });
    gsap.set('#heroTitle',   { yPercent: self.progress * 25 });
    gsap.set('#heroSub',     { yPercent: self.progress * 15 });
    gsap.set('#heroEyebrow', { yPercent: self.progress * 10 });
  }
});

/* ── Smooth page load ─────────────────── */
gsap.from('nav', { y: -80, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1 });
