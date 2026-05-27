(function(){
  var BRF = window.BRF = window.BRF || {};
  var DATA = window.BRFData || {};
  BRF.data = DATA;
  BRF.$ = function(sel, root){ return (root || document).querySelector(sel); };
  BRF.$$ = function(sel, root){ return Array.from((root || document).querySelectorAll(sel)); };
  BRF.safe = function(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  };
  BRF.slug = function(value){ return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };
  BRF.normalize = function(value){ return String(value || '').toLowerCase().trim(); };
  BRF.unique = function(values){ return Array.from(new Set((values || []).filter(Boolean))); };
  BRF.list = function(items){ return '<ul>' + (items || []).map(function(x){ return '<li>' + BRF.safe(x) + '</li>'; }).join('') + '</ul>'; };
  BRF.tagClass = function(value){
    var v = BRF.normalize(value).replace(/\s+/g, '-');
    if (v === 'very-high') return 'very-high';
    if (v === 'high' || v === 'must-study') return 'high';
    if (v === 'quick-revision' || v === 'revision') return 'revision';
    return 'medium';
  };
  BRF.tag = function(value){ return value ? '<span class="tag ' + BRF.tagClass(value) + '">' + BRF.safe(value) + '</span>' : ''; };
  BRF.fillSelect = function(select, values, allLabel){
    if (!select) return;
    var current = select.value;
    var opts = [allLabel || 'All'].concat(BRF.unique(values || []).filter(function(v){ return v !== (allLabel || 'All'); }));
    select.innerHTML = opts.map(function(v){ return '<option value="' + BRF.safe(v) + '">' + BRF.safe(v) + '</option>'; }).join('');
    if (opts.indexOf(current) !== -1) select.value = current;
  };
  BRF.matches = function(value, filter){ return !filter || filter === 'All' || String(value) === String(filter); };
  BRF.cardMeta = function(parts){ return '<div class="meta-line">' + (parts || []).filter(Boolean).map(BRF.tag).join('') + '</div>'; };
  BRF.groupBy = function(items, key){
    return (items || []).reduce(function(acc, item){ var k = typeof key === 'function' ? key(item) : item[key]; (acc[k] = acc[k] || []).push(item); return acc; }, {});
  };
  BRF.table = function(headers, rows){
    return '<table><thead><tr>' + headers.map(function(h){ return '<th>' + BRF.safe(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function(row){ return '<tr>' + row.map(function(cell){ return '<td>' + cell + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table>';
  };
  BRF.textBlob = function(obj){ return BRF.normalize(JSON.stringify(obj || {})); };
})();
