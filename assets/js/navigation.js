(function(){
  var BRF = window.BRF;
  function closeMenu(){ document.body.classList.remove('nav-open'); }
  BRF.initNavigation = function(){
    var menu = BRF.$('#menuToggle'); var sidebar = BRF.$('.sidebar'); var overlay = BRF.$('#sidebarOverlay');
    if (menu) menu.addEventListener('click', function(){ document.body.classList.toggle('nav-open'); });
    if (overlay) overlay.addEventListener('click', closeMenu);
    BRF.$$('#sideNav a').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); var target = BRF.$(a.getAttribute('href')); if (target) target.scrollIntoView({behavior:'smooth', block:'start'}); closeMenu(); }); });
    var sections = BRF.$$('main section[id]');
    if ('IntersectionObserver' in window) {
      var navObserver = new IntersectionObserver(function(entries){ entries.forEach(function(entry){ if (entry.isIntersecting) { BRF.$$('#sideNav a').forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id); }); } }); }, {rootMargin:'-20% 0px -65% 0px', threshold:0.01});
      sections.forEach(function(s){ navObserver.observe(s); });
      var revealObserver = new IntersectionObserver(function(entries){ entries.forEach(function(entry){ if (entry.isIntersecting) entry.target.classList.add('visible'); }); }, {threshold:0, rootMargin: '0px 0px -50px 0px'});
      BRF.$$('.reveal').forEach(function(s){ revealObserver.observe(s); });
    } else { BRF.$$('.reveal').forEach(function(s){ s.classList.add('visible'); }); }
    var back = BRF.$('#backTop');
    if (back) back.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });
    var expandAll = BRF.$('#expandAll');
    if (expandAll) expandAll.addEventListener('click', function(){ var open = expandAll.dataset.open !== 'true'; BRF.$$('#notesContainer details').forEach(function(d){ d.open = open; }); expandAll.dataset.open = open ? 'true' : 'false'; expandAll.textContent = open ? 'Close notes' : 'Expand notes'; });
    BRF.$$('[data-open-notes]').forEach(function(btn){ btn.addEventListener('click', function(){ var open = btn.getAttribute('data-open-notes') === 'true'; BRF.$$('#notesContainer details').forEach(function(d){ d.open = open; }); }); });
    window.addEventListener('scroll', function(){
      var topbar = BRF.$('#topbar'); if (topbar) topbar.classList.toggle('scrolled', window.scrollY > 8);
      if (back) back.classList.toggle('visible', window.scrollY > 650);
      var progress = BRF.$('#readingProgress'); if (progress) { var max = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%'; }
    }, {passive:true});
  };
})();
