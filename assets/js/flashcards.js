(function(){
  var BRF = window.BRF;
  var DATA = window.BRFData || {};
  var key = 'brf.flashcards.mastered.v3';
  var state = { index: 0, filtered: [], flipped: false, mastered: new Set() };
  function load(){ try { state.mastered = new Set(JSON.parse(localStorage.getItem(key) || '[]')); } catch(e){ state.mastered = new Set(); } }
  function save(){ localStorage.setItem(key, JSON.stringify(Array.from(state.mastered))); }
  function getFilters(){ return { unit: BRF.$('#flashUnit') && BRF.$('#flashUnit').value, category: BRF.$('#flashCategory') && BRF.$('#flashCategory').value, priority: BRF.$('#flashPriority') && BRF.$('#flashPriority').value, search: BRF.normalize(BRF.$('#flashSearch') && BRF.$('#flashSearch').value), unmastered: !!(BRF.$('#flashUnmastered') && BRF.$('#flashUnmastered').checked) }; }
  function applyFilters(){
    var f = getFilters();
    state.filtered = (DATA.flashcards || []).filter(function(card){
      if (!BRF.matches(card.unit, f.unit)) return false;
      if (!BRF.matches(card.category, f.category)) return false;
      if (!BRF.matches(card.priority, f.priority)) return false;
      if (f.unmastered && state.mastered.has(card.id)) return false;
      if (f.search && BRF.textBlob(card).indexOf(f.search) === -1) return false;
      return true;
    });
    if (state.index >= state.filtered.length) state.index = 0;
    state.flipped = false;
    render();
  }
  function render(){
    var cardEl = BRF.$('#flashCard');
    var front = BRF.$('#flashFront');
    var back = BRF.$('#flashBack');
    var hint = BRF.$('#flashHint');
    var meta = BRF.$('#flashMeta');
    var status = BRF.$('#flashStatus');
    var master = BRF.$('#masterFlash');
    if (!cardEl || !front || !back) return;
    cardEl.classList.toggle('flipped', state.flipped);
    var card = state.filtered[state.index];
    if (!card) {
      front.textContent = 'No flashcards match the filters';
      back.textContent = 'Clear filters or show mastered cards.';
      if (hint) hint.textContent = '';
      if (meta) meta.textContent = '0 cards';
      if (status) status.textContent = '0 cards shown.';
      if (master) master.disabled = true;
      return;
    }
    front.textContent = card.front;
    back.textContent = card.back;
    if (hint) hint.textContent = card.hint || '';
    if (meta) meta.textContent = card.unit + ' / ' + card.category;
    var mastered = state.mastered.has(card.id);
    if (master) { master.disabled = false; master.textContent = mastered ? 'Unmark mastered' : 'Mark mastered'; }
    if (status) status.textContent = (state.index + 1) + ' of ' + state.filtered.length + ' cards | mastered: ' + state.mastered.size + ' of ' + (DATA.flashcards || []).length + (mastered ? ' | current card mastered' : '');
  }
  function move(delta){ if (!state.filtered.length) return; state.index = (state.index + delta + state.filtered.length) % state.filtered.length; state.flipped = false; render(); }
  function shuffle(){
    for (var i = state.filtered.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = state.filtered[i]; state.filtered[i] = state.filtered[j]; state.filtered[j] = t; }
    state.index = 0; state.flipped = false; render();
  }
  BRF.initFlashcards = function(){
    load();
    var cards = DATA.flashcards || [];
    BRF.fillSelect(BRF.$('#flashUnit'), cards.map(function(c){return c.unit;}), 'All');
    BRF.fillSelect(BRF.$('#flashCategory'), cards.map(function(c){return c.category;}), 'All');
    BRF.fillSelect(BRF.$('#flashPriority'), cards.map(function(c){return c.priority;}), 'All');
    ['#flashUnit','#flashCategory','#flashPriority','#flashSearch','#flashUnmastered'].forEach(function(sel){ var el = BRF.$(sel); if (el) el.addEventListener('input', applyFilters); if (el) el.addEventListener('change', applyFilters); });
    var card = BRF.$('#flashCard'); if (card) card.addEventListener('click', function(){ state.flipped = !state.flipped; render(); });
    var prev = BRF.$('#prevFlash'); if (prev) prev.addEventListener('click', function(){ move(-1); });
    var next = BRF.$('#nextFlash'); if (next) next.addEventListener('click', function(){ move(1); });
    var shuf = BRF.$('#shuffleFlash'); if (shuf) shuf.addEventListener('click', shuffle);
    var master = BRF.$('#masterFlash'); if (master) master.addEventListener('click', function(){ var c = state.filtered[state.index]; if (!c) return; if (state.mastered.has(c.id)) state.mastered.delete(c.id); else state.mastered.add(c.id); save(); applyFilters(); });
    applyFilters();
  };
})();
