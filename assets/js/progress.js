(function(){
  var BRF = window.BRF;
  var DATA = window.BRFData || {};
  var key = 'brf.progress.v3';
  var done = {};
  function load(){ try { done = JSON.parse(localStorage.getItem(key) || '{}'); } catch(e){ done = {}; } }
  function save(){ localStorage.setItem(key, JSON.stringify(done)); }
  function update(){
    var boxes = BRF.$$('#checklist input[type="checkbox"]');
    var checked = boxes.filter(function(b){ return b.checked; }).length;
    var pct = boxes.length ? Math.round((checked / boxes.length) * 100) : 0;
    var fill = BRF.$('#progressFill'); if (fill) fill.style.width = pct + '%';
    var label = BRF.$('#progressLabel'); if (label) label.textContent = pct + '% complete (' + checked + '/' + boxes.length + ' tasks)';
  }
  BRF.initProgress = function(){
    load();
    var root = BRF.$('#checklist'); if (!root) return;
    root.innerHTML = (DATA.progressTasks || []).map(function(dayPair, dayIndex){
      var day = dayPair[0], tasks = dayPair[1] || [];
      return '<article class="check-card"><h3>' + BRF.safe(day) + '</h3>' + tasks.map(function(task, taskIndex){
        var id = 'd' + dayIndex + '-t' + taskIndex;
        var checked = done[id] ? 'checked' : '';
        return '<label><input type="checkbox" data-task="' + id + '" ' + checked + '> <span>' + BRF.safe(task) + '</span></label>';
      }).join('') + '</article>';
    }).join('');
    root.addEventListener('change', function(e){ if (e.target.matches('input[type="checkbox"]')) { done[e.target.dataset.task] = e.target.checked; save(); update(); } });
    var reset = BRF.$('#resetProgress'); if (reset) reset.addEventListener('click', function(){ done = {}; save(); BRF.$$('#checklist input[type="checkbox"]').forEach(function(b){ b.checked = false; }); update(); });
    update();
  };
})();
