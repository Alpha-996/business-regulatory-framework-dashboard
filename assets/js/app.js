(function(){
  document.addEventListener('DOMContentLoaded', function(){
    if (!window.BRF || !window.BRFData) return;
    window.BRF.renderStatic();
    window.BRF.initTheme();
    window.BRF.initQuestionBank();
    window.BRF.initFlashcards();
    window.BRF.initQuiz();
    window.BRF.initProgress();
    window.BRF.initPrint();
    window.BRF.initNavigation();
  });
})();
