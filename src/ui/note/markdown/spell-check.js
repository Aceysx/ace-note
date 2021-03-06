import Typo from './typo'

const aff = 'https://cdn.rawgit.com/kofifus/Typo.js/312bf158a814dda6eac3bd991e3a133c84472fc8/typo/dictionaries/en_US/en_US.aff';
const dic = 'https://cdn.rawgit.com/kofifus/Typo.js/312bf158a814dda6eac3bd991e3a133c84472fc8/typo/dictionaries/en_US/en_US.dic';

const addIgnoreDict = token => {
  const ignoreDict = JSON.parse(window.localStorage.getItem('ignoreDict') || `{}`)
  ignoreDict[token] = true
  window.localStorage.setItem('ignoreDict', JSON.stringify(ignoreDict))
}

const getIgnoreDict = () => {
  return JSON.parse(window.localStorage.getItem('ignoreDict') || `{}`)
}

export const typoLoaded = (function (affPath, dicPath) {
  return new Promise(function (resolve, reject) {
    let xhr_aff = new XMLHttpRequest();
    xhr_aff.open('GET', affPath, true);
    xhr_aff.onload = function () {
      if (xhr_aff.readyState === 4 && xhr_aff.status === 200) {
        let xhr_dic = new XMLHttpRequest();
        xhr_dic.open('GET', dicPath, true);
        xhr_dic.onload = function () {
          if (xhr_dic.readyState === 4 && xhr_dic.status === 200) {
            resolve(new Typo('en_US', xhr_aff.responseText, xhr_dic.responseText, {platform: 'any'}));
          } else {
            reject();
          }
        };
        xhr_dic.send(null);
      } else {
        reject();
      }
    };
    xhr_aff.send(null);
  });
})(aff, dic)

export const startSpellCheck = (cm, typo) => {
  if (!cm || !typo) return; // sanity
  startSpellCheck.ignoreDict = getIgnoreDict(); // dictionary of ignored words

  let rx_word = '!\'\"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ ；，。（）「」：、《》？——～·#¥%……&*';

  cm.spellcheckOverlay = {
    token: (stream) => {
      let ch = stream.peek();
      let word = "";

      if (rx_word.includes(ch) || ch === '\uE000' || ch === '\uE001') {
        stream.next();
        return null;
      }

      while ((ch = stream.peek()) && !rx_word.includes(ch)) {
        word += ch;
        stream.next();
      }
      if (!/^[a-z]*$/.test(word)) return null; // no letters
      if (startSpellCheck.ignoreDict[word]) return null;
      if (!typo.check(word)) return "spell-error"; // CSS class: cm-spell-error
    }
  }
  cm.addOverlay(cm.spellcheckOverlay);

// initialize the suggestion box
  let sbox = getSuggestionBox(typo);
  cm.getWrapperElement().oncontextmenu = (e => {
    e.preventDefault();
    e.stopPropagation();
    sbox.suggest(cm, e);
    return false;
  });
}

const getSuggestionBox = (typo) => {
  const sboxShow = (cm, sbox, items, x, y, hourglass) => {
    let selwidget = sbox.children[0];

    let isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && !navigator.userAgent.match('CriOS');
    let separator = (!isSafari && (hourglass || items.length > 0)); // separator line does not work well on safari

    let options = '';
    items.forEach(s => options += '<option value="' + s + '">' + s + '</option>');
    if (hourglass) options += '<option disabled="disabled">&nbsp;&nbsp;&nbsp;&#8987;</option>';
    if (separator) options += '<option style="min-height:1px; max-height:1px; padding:0; background-color: #000000;" disabled>&nbsp;</option>';
    options += '<option value="##ignoreall##" style="font-style: italic">Ignore all</option>';

    let indexInParent = [].slice.call(selwidget.parentElement.children).indexOf(selwidget);
    selwidget.innerHTML = options;
    selwidget = selwidget.parentElement.children[indexInParent];

    let fontSize = window.getComputedStyle(cm.getWrapperElement(), null).getPropertyValue('font-size');
    selwidget.style.fontSize = fontSize;
    selwidget.size = selwidget.length;
    if (separator) selwidget.size--;
    selwidget.value = -1;

// position widget inside cm
    let yOffset = 12;
    let cmrect = cm.getWrapperElement().getBoundingClientRect();
    sbox.style.left = x + 'px';
    sbox.style.top = (y - sbox.offsetHeight / 2 + yOffset) + 'px';
    let widgetRect = sbox.getBoundingClientRect();
    if (widgetRect.top < cmrect.top) sbox.style.top = (cmrect.top + 2 + yOffset) + 'px';
    if (widgetRect.right > cmrect.right) sbox.style.left = (cmrect.right - widgetRect.width - 2) + 'px';
    if (widgetRect.bottom > cmrect.bottom) sbox.style.top = (cmrect.bottom - widgetRect.height - 2 + yOffset) + 'px';
  }

  const sboxHide = (sbox) => {
    sbox.style.top = sbox.style.left = '-1000px';
    typo.suggest(); // disable any running suggeations search
  }

// create suggestions widget
  let sbox = document.getElementById('suggestBox');
  if (!sbox) {
    sbox = document.createElement('div');
    sbox.style.zIndex = 100000;
    sbox.id = 'suggestBox';
    sbox.style.position = 'fixed';
    sboxHide(sbox);

    let selwidget = document.createElement('select');
    selwidget.multiple = 'yes';
    sbox.appendChild(selwidget);

    sbox.suggest = ((cm, e) => { // e is the event from cm contextmenu event
      if (!e.target.classList.contains('cm-spell-error')) return false; // not on typo

      let token = e.target.innerText;
      if (!token) return false; // sanity

// save cm instance, token, token coordinates in sbox
      sbox.codeMirror = cm;
      sbox.token = token;
      sbox.screenPos = {x: e.pageX, y: e.pageY}
      let tokenRect = e.target.getBoundingClientRect();
      let start = cm.coordsChar({left: tokenRect.left + 1, top: tokenRect.top + 1});
      let end = cm.coordsChar({left: tokenRect.right - 1, top: tokenRect.top + 1});
      sbox.cmpos = {line: start.line, start: start.ch, end: end.ch};

// show hourglass
      sboxShow(cm, sbox, [], e.pageX, e.pageY, true);

      let results = [];
// async
      typo.suggest(token, null, all => {
        sboxShow(cm, sbox, results, e.pageX, e.pageY);
      }, next => {
        results.push(next);
        sboxShow(cm, sbox, results, e.pageX, e.pageY, true);
      });
// non async
//sboxShow(cm, sbox, typo.suggest(token), e.pageX, e.pageY);
      e.preventDefault();
      return false;
    });

    sbox.onmouseout = (e => {
      let related = (e.relatedTarget ? e.relatedTarget.tagName : null);
      if (related !== 'SELECT' && related !== 'OPTION') sboxHide(sbox)
    });

    selwidget.onchange = (e => {
      sboxHide(sbox)
      let cm = sbox.codeMirror, correction = e.target.value;
      if (correction === '##ignoreall##') {
        startSpellCheck.ignoreDict[sbox.token] = true;

        addIgnoreDict(sbox.token)
        cm.setOption('maxHighlightLength', (--cm.options.maxHighlightLength) + 1); // ugly hack to rerun overlays
      } else {
        cm.replaceRange(correction, {line: sbox.cmpos.line, ch: sbox.cmpos.start}, {
          line: sbox.cmpos.line,
          ch: sbox.cmpos.end
        });
        cm.focus();
        cm.setCursor({line: sbox.cmpos.line, ch: sbox.cmpos.start + correction.length});
      }
    });

    document.body.appendChild(sbox);
  }
  return sbox;
}

