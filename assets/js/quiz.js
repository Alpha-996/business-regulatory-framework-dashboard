(function(){
  var BRF = window.BRF;
  var DATA = window.BRFData || {};
  var bestKey = 'brf.quiz.best.v3';
  var state = { set:null, pool:[], index:0, score:0, answered:false, selected:'', feedback:'', wrong:[], best:{} };
  function loadBest(){ try { state.best = JSON.parse(localStorage.getItem(bestKey) || '{}'); } catch(e){ state.best = {}; } }
  function saveBest(){ localStorage.setItem(bestKey, JSON.stringify(state.best)); }
  function selectedSet(){ var id = BRF.$('#quizSet') && BRF.$('#quizSet').value; return (DATA.quizSets || [])[Math.max(0, (DATA.quizSets || []).findIndex(function(s){return s.id === id;}))] || (DATA.quizSets || [])[0]; }
  function currentPool(){
    var set = selectedSet();
    var unit = BRF.$('#quizUnit') && BRF.$('#quizUnit').value;
    var type = BRF.$('#quizMode') && BRF.$('#quizMode').value;
    return (set && set.questions || []).filter(function(q){ return BRF.matches(q.unit, unit) && BRF.matches(q.type, type); });
  }
  function configureFiltersForSet(){
    var set = selectedSet();
    var qs = set ? set.questions : [];
    BRF.fillSelect(BRF.$('#quizUnit'), qs.map(function(q){return q.unit;}), 'All');
    BRF.fillSelect(BRF.$('#quizMode'), qs.map(function(q){return q.type;}), 'All');
  }
  function restart(){ state.set = selectedSet(); state.pool = currentPool(); state.index = 0; state.score = 0; state.answered = false; state.selected = ''; state.feedback = ''; state.wrong = []; render(); }
  function isCorrect(q, value){
    if (!q) return false;
    if (q.type === 'Short') {
      var text = BRF.normalize(value);
      var keys = (q.keywords || []).map(BRF.normalize).filter(Boolean);
      var hits = keys.filter(function(k){ return text.indexOf(k) !== -1; }).length;
      return hits >= Math.min(2, Math.max(1, keys.length));
    }
    return String(value) === String(q.answer);
  }
  function submitAnswer(){
    var q = state.pool[state.index];
    if (!q || state.answered) return;
    var value = q.type === 'Short' ? (BRF.$('#quizShort') && BRF.$('#quizShort').value) : (BRF.$('input[name="quizOption"]:checked') && BRF.$('input[name="quizOption"]:checked').value);
    if (!value) { state.feedback = 'Choose or type an answer before submitting.'; render(); return; }
    var ok = isCorrect(q, value);
    state.answered = true; state.selected = value;
    if (ok) state.score += 1; else state.wrong.push({question:q.question, chosen:value, answer:q.answer, explanation:q.explanation});
    state.feedback = (ok ? 'Correct. ' : 'Needs review. ') + q.explanation;
    render();
  }
  function nextQuestion(){
    if (state.index < state.pool.length - 1) { state.index += 1; state.answered = false; state.selected = ''; state.feedback = ''; render(); }
    else finish();
  }
  function finish(){
    var setId = state.set ? state.set.id : 'quiz';
    var pct = state.pool.length ? Math.round((state.score / state.pool.length) * 100) : 0;
    state.best[setId] = Math.max(Number(state.best[setId] || 0), pct); saveBest();
    var panel = BRF.$('#quizPanel'); if (!panel) return;
    panel.innerHTML = '<div><h3>Set complete</h3><p><strong>Score:</strong> ' + state.score + '/' + state.pool.length + ' (' + pct + '%)</p><p class="muted"><strong>Best score for this set:</strong> ' + state.best[setId] + '%</p><div class="pill-row"><button class="btn primary" id="quizAgain" type="button">Restart set</button></div>' +
      (state.wrong.length ? '<div class="wrong-review"><h4>Review wrong answers</h4>' + state.wrong.map(function(w){ return '<article class="info-card" style="margin:.75rem 0"><p><strong>Question:</strong> ' + BRF.safe(w.question) + '</p><p><strong>Your answer:</strong> ' + BRF.safe(w.chosen) + '</p><p><strong>Expected:</strong> ' + BRF.safe(w.answer) + '</p><p class="muted">' + BRF.safe(w.explanation) + '</p></article>'; }).join('') + '</div>' : '<p class="feedback good">No wrong answers in this filtered set.</p>') + '</div>';
    var again = BRF.$('#quizAgain'); if (again) again.addEventListener('click', restart);
  }
  function render(){
    var panel = BRF.$('#quizPanel'); if (!panel) return;
    var set = state.set || selectedSet();
    var q = state.pool[state.index];
    if (!q) { panel.innerHTML = '<p class="feedback bad">No quiz questions match the selected filters.</p>'; return; }
    var best = state.best[set.id] || 0;
    var optionsHTML = '';
    if (q.type === 'Short') {
      optionsHTML = '<textarea class="textarea" id="quizShort" placeholder="Type 2-4 keywords or a short answer">' + (state.selected && state.answered ? BRF.safe(state.selected) : '') + '</textarea>';
    } else {
      optionsHTML = '<div class="quiz-options">' + (q.options || []).map(function(opt){
        var checked = state.selected === opt ? 'checked' : '';
        return '<label class="option"><input type="radio" name="quizOption" value="' + BRF.safe(opt) + '" ' + checked + ' ' + (state.answered ? 'disabled' : '') + '> <span>' + BRF.safe(opt) + '</span></label>';
      }).join('') + '</div>';
    }
    var feedbackClass = state.feedback ? (state.feedback.indexOf('Correct') === 0 ? ' good' : (state.feedback.indexOf('Needs') === 0 ? ' bad' : '')) : '';
    panel.innerHTML = '<div class="pill-row">' + BRF.tag(set.title) + BRF.tag(q.unit) + BRF.tag(q.type) + BRF.tag(q.priority) + BRF.tag(q.difficulty) + '</div>' +
      '<p class="muted"><strong>Question ' + (state.index + 1) + ' of ' + state.pool.length + '</strong> | Best score: ' + best + '% | Exam relevance: ' + BRF.safe(q.examRelevance || '') + '</p>' +
      '<h3>' + BRF.safe(q.question) + '</h3>' + optionsHTML +
      '<div class="feedback' + feedbackClass + '" aria-live="polite">' + BRF.safe(state.feedback || 'Answer, then check feedback immediately.') + '</div>' +
      '<div class="pill-row"><button class="btn primary" id="submitQuiz" type="button" ' + (state.answered ? 'disabled' : '') + '>Submit answer</button><button class="btn" id="nextQuiz" type="button">' + (state.index === state.pool.length - 1 ? 'Finish set' : 'Next') + '</button><span class="muted">Score: ' + state.score + '/' + state.pool.length + '</span></div>';
    var submit = BRF.$('#submitQuiz'); if (submit) submit.addEventListener('click', submitAnswer);
    var next = BRF.$('#nextQuiz'); if (next) next.addEventListener('click', function(){ state.answered ? nextQuestion() : submitAnswer(); });
  }
  BRF.initQuiz = function(){
    loadBest();
    var setSelect = BRF.$('#quizSet');
    if (setSelect) { setSelect.innerHTML = (DATA.quizSets || []).map(function(s){ return '<option value="' + BRF.safe(s.id) + '">' + BRF.safe(s.title) + '</option>'; }).join(''); }
    configureFiltersForSet();
    if (setSelect) setSelect.addEventListener('change', function(){ configureFiltersForSet(); restart(); });
    ['#quizUnit','#quizMode'].forEach(function(sel){ var el = BRF.$(sel); if (el) el.addEventListener('change', restart); });
    var r = BRF.$('#restartQuiz'); if (r) r.addEventListener('click', restart);
    restart();
  };
})();
