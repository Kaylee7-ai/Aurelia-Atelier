const stage = document.getElementById('heroStage');
const garment = document.querySelector('.hero-garment');
const orbitOne = document.querySelector('.orbit-one');
const orbitTwo = document.querySelector('.orbit-two');
const markerA = document.querySelector('.marker-a');
const markerB = document.querySelector('.marker-b');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function animateHero(){
  if(reduceMotion.matches) return;
  const rect = stage.getBoundingClientRect();
  const viewportCenter = window.innerHeight * 0.5;
  const distance = (rect.top + rect.height * 0.5) - viewportCenter;
  const progress = Math.max(-1, Math.min(1, distance / (window.innerHeight * .8)));
  const tilt = progress * -4;
  const rise = progress * -32;
  const scale = 1 + Math.abs(progress) * .035;
  garment.style.transform = `translate3d(0, ${rise}px, 0) rotate(${tilt}deg) scale(${scale})`;
  orbitOne.style.transform = `rotate(-16deg) translateY(${progress * 20}px)`;
  orbitTwo.style.transform = `rotate(17deg) translateY(${-progress * 30}px)`;
  markerA.style.transform = `translateY(${progress * -18}px)`;
  markerB.style.transform = `rotate(180deg) translateY(${progress * 22}px)`;
}

let ticking = false;
window.addEventListener('scroll', () => {
  if(!ticking){
    window.requestAnimationFrame(() => { animateHero(); ticking = false; });
    ticking = true;
  }
}, {passive:true});
window.addEventListener('resize', animateHero);
animateHero();
