(function(){
  var BRF = window.BRF;
  BRF.initPrint = function(){ var btn = BRF.$('#printBtn'); if (btn) btn.addEventListener('click', function(){ window.print(); }); };
})();
