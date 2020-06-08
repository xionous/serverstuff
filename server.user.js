// ==UserScript==
// @name Server Stuff
// @namespace all
// @match *://*/*
// @author Matthew Streeter
// @version 0.0.9
// @downloadURL https://github.com/xionous/serverstuff/raw/master/server.user.js
// @updateURL https://github.com/xionous/serverstuff/raw/master/server.user.js
// @grant none
// ==/UserScript==

(function() {
    'use strict';
    function getSelectionText() {
        var selectedText = "";
        if (window.getSelection) {
            selectedText = window.getSelection().toString();
        }
        return selectedText;
    }

    function copyText(text) {
        var el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px', display: 'none'};
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    document.addEventListener('mouseup', function(e) {
        var thetext = getSelectionText().trim()
        if (thetext.length > 0 && e.shiftKey) {
            copyText(thetext);
        } else if (thetext.length > 0 && e.ctrlKey && !e.altKey) {
            var the_URL = "https://shawprod.service-now.com/nav_to.do?uri=%2Fchange_request_list.do%3Fsysparm_query%3D123TEXTQUERY321%253D" + thetext;
            window.open(the_URL);
        } else if (thetext.length > 0 && e.altKey && !e.ctrlKey) {
            var the_URL = "https://shawprod.service-now.com/nav_to.do?uri=%2Fincident_list.do%3Fsysparm_query%3D123TEXTQUERY321%253D" + thetext;
            window.open(the_URL);
        } else if (thetext.length > 0 && e.altKey && e.ctrlKey) {
            var the_URL = "http://"+thetext;
            window.open(the_URL);
        }
    }, false);

    if (window.location.href.indexOf("vSure") > -1) {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                var gettd = document.querySelectorAll('td');
                for (i=0; i < gettd.length; i++) {
                    if (gettd[i].innerHTML.includes('EM Source: ') && gettd[i].innerHTML.includes('EM Source: <a href') == false) {
                        var geturl = gettd[i].innerHTML.split('EM Source: ');
                        var theurl = geturl[1].replace(')', '');
                        var newIt = gettd[i].innerHTML.replace(theurl, '<a href="http://'+theurl+'" target=”_blank”>'+theurl+'</a>');
                        gettd[i].innerHTML = newIt;
                    }
                }
            });    
        });
        var target = document.body;
        observer.observe(target, { attributes: true, childList: true, characterData: true });
      }
})();






