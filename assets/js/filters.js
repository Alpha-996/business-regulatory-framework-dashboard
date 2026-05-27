(function(){
  var BRF = window.BRF;
  var DATA = window.BRFData || {};
  function renderQuestionCards(){
    var search = BRF.normalize(BRF.$('#qbSearch') && BRF.$('#qbSearch').value);
    var unit = BRF.$('#qbUnit') && BRF.$('#qbUnit').value;
    var marks = BRF.$('#qbMarks') && BRF.$('#qbMarks').value;
    var type = BRF.$('#qbType') && BRF.$('#qbType').value;
    var prob = BRF.$('#qbProb') && BRF.$('#qbProb').value;
    var priority = BRF.$('#qbPriority') && BRF.$('#qbPriority').value;
    var source = BRF.$('#qbSource') && BRF.$('#qbSource').value;
    var items = (DATA.questions || []).filter(function(q){
      if (!BRF.matches(q.unit, unit)) return false;
      if (!BRF.matches(String(q.marks), marks)) return false;
      if (!BRF.matches(q.type, type)) return false;
      if (!BRF.matches(q.probability, prob)) return false;
      if (!BRF.matches(q.priority, priority)) return false;
      if (!BRF.matches(q.source, source)) return false;
      if (search && BRF.textBlob(q).indexOf(search) === -1) return false;
      return true;
    });
    var count = BRF.$('#qbCount');
    if (count) count.textContent = items.length + ' questions shown from ' + (DATA.questions || []).length + ' total.';
    var cards = BRF.$('#questionCards');
    if (!cards) return;
    cards.innerHTML = items.map(function(q){
      return '<article class="question-card"><div class="pill-row">' + BRF.tag(q.unit) + BRF.tag(q.marks + ' marks') + BRF.tag(q.type) + BRF.tag(q.priority) + BRF.tag(q.probability) + BRF.tag(q.source) + '</div>' +
        '<h3>' + BRF.safe(q.question) + '</h3><p class="muted"><strong>Subtopic:</strong> ' + BRF.safe(q.subtopic) + ' | <strong>Length:</strong> ' + BRF.safe(q.suggestedLength) + '</p>' +
        '<h4>Model answer outline</h4>' + BRF.list(q.outline) + '<p><strong>Key headings:</strong> ' + BRF.safe((q.headings || []).join(', ')) + '</p>' +
        '<p><strong>Keywords:</strong> ' + BRF.safe((q.keywords || []).join(', ')) + '</p></article>';
    }).join('');
  }
  BRF.initQuestionBank = function(){
    var qs = DATA.questions || [];
    BRF.fillSelect(BRF.$('#qbUnit'), qs.map(function(q){return q.unit;}), 'All');
    BRF.fillSelect(BRF.$('#qbType'), qs.map(function(q){return q.type;}), 'All');
    BRF.fillSelect(BRF.$('#qbProb'), qs.map(function(q){return q.probability;}), 'All');
    BRF.fillSelect(BRF.$('#qbPriority'), qs.map(function(q){return q.priority;}), 'All');
    BRF.fillSelect(BRF.$('#qbSource'), qs.map(function(q){return q.source;}), 'All');
    ['#qbSearch','#qbUnit','#qbMarks','#qbType','#qbProb','#qbPriority','#qbSource'].forEach(function(sel){ var el = BRF.$(sel); if (el) el.addEventListener('input', renderQuestionCards); if (el) el.addEventListener('change', renderQuestionCards); });
    renderQuestionCards();
  };
})();
