// ==UserScript==
// @name Server Stuff
// @namespace all
// @match *://*/*
// @author Matthew Streeter
// @version 0.0.6
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
})();