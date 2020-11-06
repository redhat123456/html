!function(){

  function updateNormativeDecl() {
    var is = document.querySelectorAll('i');
    is.forEach(function(i) {
      if (i.innerHTML === 'This section is non-normative.') {
        i.innerHTML = '本节是非规范的。';
      }
    });
  }

  function updateTitle() {
    var update = document.querySelector('#living-standard');
    var titleEl = update.childNodes[0];
    titleEl.textContent = 'Living Standard - 更新于';
    var dateEl = update.querySelector('.pubdate');
    var date_zh = {
      'January': 1,
      'February': 2,
      'March': 3,
      'April': 4,
      'May': 5,
      'June': 6,
      'July': 7,
      'August': 8,
      'September': 9,
      'October': 10,
      'November': 11,
      'December': 12
    };
    var date = dateEl.innerHTML.trim().split(/\s+/).reverse();
    dateEl.innerHTML = date[0] + '年' + date_zh[date[1]] + '月' + date[2] + '日';
  }

  function updateTOC() {
    var as = document.querySelectorAll('nav a');
    as.forEach(function(a){
        if(a.innerHTML.trim() === 'Table of Contents'){
            a.innerHTML = '目录';
        }
    });
  }

  function addTranslateInfo() {
    document.querySelectorAll('.translate-info').forEach(function(popup) {
      var header = popup.previousElementSibling;
      if (header.classList.contains('no-toc')) {
        popup.remove();
        return;
      }
      header.appendChild(popup);
      var selfLink = header.querySelector('a.self-link');
      if (!selfLink) {
        popup.remove();
        return;
      }
      var selfHash = extractHash(popup.dataset.enFile) || selfLink.hash;

      var enHref = 'https://html.spec.whatwg.org' + location.pathname.replace(/^\/html/, '') + location.search + selfHash;
      var zhDate = popup.dataset.zhDate ? new Date(popup.dataset.zhDate).toLocaleString() : '尚未翻译';
      var enDate = new Date(popup.dataset.enDate).toLocaleString();

      header.classList.add('zh-' + getTransateStatus(popup.dataset.zhDate, popup.dataset.enDate));

      popup.innerHTML =
        '<p class="guide">' +
        '  <a target="_blank" href="' + enHref + '" class="btn-link">查看原文</a>' +
        '  <a target="_blank" href="' + popup.dataset.zhFile + '" class="btn-link">我来翻译</a>' +
        '  <a target="_blank" href="https://github.com/whatwg-cn/html/wiki/翻译指南" class="btn-link">翻译指南</a>' +
        '  <a target="_blank" href="' + popup.dataset.enFile + '" class="btn-link">英文源码</a>' +
        '</p>' +
        '<hr/>' +
        '<p class="meta">' +
        '  <span class="title">原文更新</span>' +
        '  <span class="date">' + enDate + '</span>' +
        '</p>' +
        '<p class="meta translate">' +
        '  <span class="title">中文翻译</span>' +
        '  <span class="date">' + zhDate + '</span>' +
        '</p>';
    });

    function createLink(href, content, title) {
      var a = document.createElement('a');
      a.href = href;
      a.innerText = content;
      a.title = title;
      return a;
    }

    function getTransateStatus(zhDate, enDate) {
      if (!zhDate) {
        return 'untranslated';
      }
      zhDate = new Date(zhDate);
      enDate = new Date(enDate);
      if (zhDate >= enDate) {
        return 'translated';
      } else {
        return 'outdated';
      }
    }

    function extractHash(enFile) {
      var m = /([^\/]+)\/([^\/]+)\.en\.html$/.exec(enFile);
      if (!m) {
        return null
      }
      if (m[2] === 'index') {
        return '#' + m[1]
      } else {
        return '#' + m[2]
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    updateNormativeDecl();
    updateTitle();
    updateTOC();
    addTranslateInfo();
  });
}();
