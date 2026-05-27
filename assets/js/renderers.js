(function(){
  var BRF = window.BRF;
  var DATA = window.BRFData || {};
  function setHTML(id, html){ var el = document.getElementById(id); if (el) el.innerHTML = html; }
  function renderSyllabus(){
    var total = (DATA.syllabus || []).reduce(function(sum,u){ return sum + Number(u.hours || 0); }, 0) || 60;
    var rows = (DATA.syllabus || []).map(function(u){
      return [BRF.safe(u.unit), BRF.safe(u.hours), BRF.safe(((u.hours / total) * 100).toFixed(1) + '%'), BRF.safe(u.subtopics), BRF.safe(u.nature), BRF.tag(u.scoring), BRF.safe(u.why)];
    });
    setHTML('syllabusTable', BRF.table(['Unit','Lecture Hours','Weightage %','Subtopics','Nature','Scoring Potential','Why Important'], rows));
    setHTML('topicBuckets', (DATA.topicBuckets || []).map(function(b){ return '<div class="info-card"><h3>' + BRF.safe(b.title) + '</h3>' + BRF.list(b.items) + '</div>'; }).join(''));
  }
  function renderPYQ(){
    var rows = (DATA.pyq || []).map(function(q){ return [BRF.safe(q.q), BRF.safe(q.marks), BRF.safe(q.question), BRF.safe(q.unit), BRF.safe(q.subtopic), BRF.safe(q.type), BRF.safe(q.difficulty), BRF.safe(q.strategy)]; });
    setHTML('pyqTable', BRF.table(['Q.No.','Marks','Question','Unit','Subtopic','Question Type','Difficulty','Scoring Strategy'], rows));
    var byUnitMarks = {}, byUnitCount = {}, byType = {};
    (DATA.pyq || []).forEach(function(q){ byUnitMarks[q.unit] = (byUnitMarks[q.unit] || 0) + Number(q.marks || 0); byUnitCount[q.unit] = (byUnitCount[q.unit] || 0) + 1; byType[q.type] = (byType[q.type] || 0) + 1; });
    function bars(title, obj, suffix){
      var max = Math.max.apply(null, Object.values(obj).concat([1]));
      return '<div class="info-card"><h3>' + BRF.safe(title) + '</h3>' + Object.keys(obj).map(function(k){
        var w = Math.round((obj[k] / max) * 100);
        return '<div class="bar-row"><span>' + BRF.safe(k) + '</span><span class="bar-track"><span class="bar-fill" style="--w:' + w + '%"></span></span><strong>' + BRF.safe(obj[k] + (suffix || '')) + '</strong></div>';
      }).join('') + '</div>';
    }
    setHTML('pyqCharts', bars('Marks by Unit', byUnitMarks, 'm') + bars('Question Frequency', byUnitCount, '') + bars('Question Type', byType, ''));
  }
  function renderPriority(){
    var html = Object.keys(DATA.priorities || {}).map(function(title){
      return '<div class="info-card"><h3>' + BRF.safe(title) + '</h3>' + (DATA.priorities[title] || []).map(function(item){
        return '<div class="priority-item" style="margin:.75rem 0"><strong>' + BRF.safe(item[0]) + '</strong><p class="muted" style="margin:.35rem 0 0">' + BRF.safe(item[1]) + '</p></div>';
      }).join('') + '</div>';
    }).join('');
    setHTML('priorityColumns', html);
  }
  function renderStudyPlan(){
    var rows = (DATA.studyPlan || []).map(function(d){ return [d.day,d.goal,d.blocks,d.topics,d.time,d.learn,d.memorize,d.practice,d.pyq,d.revision,d.test].map(BRF.safe); });
    setHTML('studyPlanTable', BRF.table(['Day','Main Goal','Study Blocks','Topics','Time','Learn','Memorize','Practice','PYQ Task','Revision Task','Self-Test'], rows));
  }
  function renderNotes(){
    var grouped = BRF.groupBy(DATA.notes || [], 'unit');
    var order = ['Unit I','Unit II','Unit III','Unit IV','Unit V'];
    var html = order.map(function(unit, idx){
      var notes = grouped[unit] || [];
      return '<details ' + (idx === 0 ? 'open' : '') + '><summary>' + BRF.safe(unit) + ' - ' + notes.length + ' summary cards</summary><div class="details-body notes-grid">' +
        notes.map(function(n){
          return '<article class="note-card"><div class="pill-row">' + BRF.tag(n.priority) + BRF.tag(n.probability) + BRF.tag(n.type) + '</div><h3>' + BRF.safe(n.topic || n.title) + '</h3>' +
            '<p>' + BRF.safe(n.beginnerExplanation || n.meaning) + '</p>' +
            '<p><strong>Exam keywords:</strong> ' + BRF.safe((n.examKeywords || []).join ? n.examKeywords.join(', ') : (n.keywords || '')) + '</p>' +
            '<p><strong>Example:</strong> ' + BRF.safe(n.example || '') + '</p>' +
            '<p><strong>5-mark angle:</strong> ' + BRF.safe(n.likely5 || n.five || '') + '</p>' +
            '<p><strong>10-mark angle:</strong> ' + BRF.safe(n.likely10 || n.ten || '') + '</p>' +
            '<p class="muted"><strong>Hook:</strong> ' + BRF.safe(n.revisionHook || '') + '</p></article>';
        }).join('') + '</div></details>';
    }).join('');
    setHTML('notesContainer', html);
  }
  function renderDefinitions(){
    setHTML('definitionCards', (DATA.definitions || []).map(function(d){
      return '<article class="definition-card"><div class="pill-row">' + BRF.tag(d.unit) + BRF.tag(d.priority) + BRF.tag(d.probability) + '</div><h3>' + BRF.safe(d.term) + '</h3>' +
        '<p><strong>Simple:</strong> ' + BRF.safe(d.simpleMeaning) + '</p><p><strong>Exam-style:</strong> ' + BRF.safe(d.examDefinition) + '</p>' +
        '<p><strong>Example:</strong> ' + BRF.safe(d.example) + '</p><p><strong>Likely format:</strong> ' + BRF.safe(d.likelyFormat) + '</p><p class="muted"><strong>Marks use:</strong> ' + BRF.safe(d.marksUse) + '</p></article>';
    }).join(''));
  }
  function renderDifferences(){
    setHTML('differenceTables', (DATA.differences || []).map(function(d, idx){
      var rows = (d.rows || []).map(function(r){ return r.map(BRF.safe); });
      return '<details ' + (idx < 3 ? 'open' : '') + '><summary>' + BRF.safe(d.title) + ' ' + BRF.tag(d.priority) + ' ' + BRF.tag(d.probability) + '</summary><div class="details-body"><p class="muted"><strong>Unit:</strong> ' + BRF.safe(d.unit) + ' | <strong>Likely use:</strong> ' + BRF.safe(d.marksUse) + '</p><div class="table-wrap">' + BRF.table(d.heads || ['Point','A','B'], rows) + '</div></div></details>';
    }).join(''));
  }
  function renderProcedures(){
    setHTML('procedureCards', (DATA.procedures || []).map(function(p){
      return '<article class="info-card"><div class="pill-row">' + BRF.tag(p.unit) + BRF.tag(p.priority) + BRF.tag(p.probability) + '</div><h3>' + BRF.safe(p.title) + '</h3>' +
        '<p><strong>Likely question:</strong> ' + BRF.safe(p.likelyQuestion) + '</p><p><strong>5-mark approach:</strong> ' + BRF.safe(p.fiveMarkApproach) + '</p><p><strong>10-mark approach:</strong> ' + BRF.safe(p.tenMarkApproach) + '</p>' + BRF.list(p.points) + '</article>';
    }).join(''));
  }
  function renderTemplates(){
    setHTML('templateCards', (DATA.templates || []).map(function(t){
      return '<article class="template-card"><div class="pill-row">' + BRF.tag(t.priority) + '</div><h3>' + BRF.safe(t.title) + '</h3>' +
        '<p><strong>Opening:</strong> ' + BRF.safe(t.openingLine) + '</p><p><strong>Time:</strong> 5 marks - ' + BRF.safe(t.timeAllocation && t.timeAllocation.fiveMark) + '; 10 marks - ' + BRF.safe(t.timeAllocation && t.timeAllocation.tenMark) + '</p>' +
        '<p><strong>Ideal length:</strong> 5 marks - ' + BRF.safe(t.idealLength && t.idealLength.fiveMark) + '; 10 marks - ' + BRF.safe(t.idealLength && t.idealLength.tenMark) + '</p><h4>Body structure</h4>' + BRF.list(t.bodyStructure) +
        '<p><strong>Conclusion:</strong> ' + BRF.safe(t.conclusionLine) + '</p><h4>Common mistakes</h4>' + BRF.list(t.commonMistakes) + '<p class="muted"><strong>Mini example:</strong> ' + BRF.safe(t.miniExample) + '</p></article>';
    }).join(''));
  }
  function renderRevisionAndStrategy(){
    setHTML('revisionCards', (DATA.revision || []).map(function(c){ return '<div class="info-card"><h3>' + BRF.safe(c.title) + '</h3>' + BRF.list(c.items) + '</div>'; }).join(''));
    setHTML('strategyCards', (DATA.strategy || []).map(function(c){ return '<div class="info-card"><h3>' + BRF.safe(c.title) + '</h3>' + BRF.list(c.items) + '</div>'; }).join(''));
  }
  BRF.renderStatic = function(){ renderSyllabus(); renderPYQ(); renderPriority(); renderStudyPlan(); renderNotes(); renderDefinitions(); renderDifferences(); renderProcedures(); renderTemplates(); renderRevisionAndStrategy(); };
})();
