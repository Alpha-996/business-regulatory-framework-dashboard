(function(){
  var BRF = window.BRF;
  var key = 'brf.theme.v3';
  function apply(theme){ document.documentElement.setAttribute('data-theme', theme); var btn = BRF.$('#themeToggle'); if (btn) btn.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode'; localStorage.setItem(key, theme); }
  BRF.initTheme = function(){ var saved = localStorage.getItem(key) || 'light'; apply(saved); var btn = BRF.$('#themeToggle'); if (btn) btn.addEventListener('click', function(){ apply(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); }); };
})();
