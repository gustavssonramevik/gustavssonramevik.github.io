(function () {
  'use strict';

  var baseWidth = 1366;
  var page = document.querySelector('.page');
  var textNodes = Array.prototype.slice.call(document.querySelectorAll('.section:not(.section--hero) > .txt'));

  function updateMobileFontSizes() {
    var mobile = window.innerWidth <= 900;
    textNodes.forEach(function (node) {
      if (!node.dataset.baseFontSize) {
        var raw = node.style.fontSize || window.getComputedStyle(node).fontSize;
        var parsed = parseFloat(raw);
        if (!isNaN(parsed)) {
          node.dataset.baseFontSize = String(parsed);
        }
      }
      var base = parseFloat(node.dataset.baseFontSize || '');
      if (isNaN(base)) return;
      if (mobile) {
        node.style.fontSize = Math.max(10, base - 2) + 'px';
      } else {
        node.style.fontSize = base + 'px';
      }
    });
  }

  function fitToViewport() {
    if (!page) return;
    if (window.innerWidth <= 900) {
      page.style.transform = 'none';
      page.style.width = '100%';
      page.style.position = 'relative';
      document.body.style.height = 'auto';
      updateMobileFontSizes();
      return;
    }
    page.style.width = baseWidth + 'px';
    page.style.position = 'absolute';
    var scale = window.innerWidth / baseWidth;
    page.style.transform = 'scale(' + scale + ')';
    document.body.style.height = page.offsetHeight * scale + 'px';
    updateMobileFontSizes();
  }

  var target = Date.parse('2026-09-05T11:00:00Z');
  var node = document.getElementById('countdown');
  function renderCountdown() {
    if (!node) return;
    var sec = Math.max(0, Math.floor((target - Date.now()) / 1000));
    if (sec <= 0) {
      node.textContent = 'Vi gifter oss idag!';
      return;
    }
    var d = Math.floor(sec / 86400);
    var h = Math.floor((sec % 86400) / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = sec % 60;
    node.innerHTML =
      d + ' dagar &middot; ' +
      h + ' timmar &middot; ' +
      m + ' minuter &middot; ' +
      s + ' sekunder';
  }

  fitToViewport();
  renderCountdown();
  setInterval(renderCountdown, 1000);
  window.addEventListener('resize', fitToViewport);
})();
