// scripts.js — hero carousel and mobile menu
(function(){
  const hero = document.getElementById('hero');
  const images = [
    'exterior-night.jpg',
    'front%20view%201.jpg',
    'living%20room.jpg',
    'room-modern.jpg'
  ];
  let idx = 0, interval = null, hoverInterval = null;
  function setHero(i){ if(!hero) return; hero.style.backgroundImage = `url("${images[i]}")`; }
  // slower default rotation, and slower hover rollover
  function start(){ setHero(idx); interval = setInterval(()=>{ idx = (idx+1)%images.length; setHero(idx); }, 5000); }
  function stop(){ if(interval){ clearInterval(interval); interval = null } }
  document.addEventListener('DOMContentLoaded', ()=>{
    start();
    if(hero){
      hero.addEventListener('mouseenter', ()=>{ stop(); let hoverIndex=idx; clearInterval(hoverInterval); hoverInterval = setInterval(()=>{ hoverIndex=(hoverIndex+1)%images.length; setHero(hoverIndex); },800); });
      hero.addEventListener('mouseleave', ()=>{ clearInterval(hoverInterval); hoverInterval = null; start(); });
    }

    // mobile menu: keep the trigger and panel state synchronized
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    function setMenuOpen(isOpen){
      if(!hamburger || !mobileMenu) return;
      mobileMenu.classList.toggle('open', isOpen);
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      hamburger.textContent = isOpen ? '×' : '☰';
    }
    if(closeMenu) closeMenu.textContent = '×';
    if(hamburger && mobileMenu){
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.addEventListener('click', ()=> setMenuOpen(hamburger.getAttribute('aria-expanded') !== 'true'));
    }
    if(closeMenu && mobileMenu){
      closeMenu.addEventListener('click', ()=> setMenuOpen(false));
    }

    // close menu when clicking a link (improve UX)
    if(mobileMenu){
      mobileMenu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> setMenuOpen(false)));
    }

    // nav scroll behavior — keep nav dark instead of becoming white
    const nav = document.querySelector('.main-nav');
    function onScroll(){ if(!nav) return; if(window.scrollY > 80) nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); }
    document.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  });
})();
