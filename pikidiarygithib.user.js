// ==UserScript==
// @name         pikidiary-github-thing
// @version      2
// @description  replaces icon for links with pikidiary.lol in like bio thing
// @author       @squirrel on pikidiary
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pikidiary.lol
// @grant        none
// @namespace    http://tampermonkey.net/
// ==/UserScript==
(function() {
    'use strict';
    const iconforpikidiary = 'https://raw.githubusercontent.com/5quirre1/pikidiary-github-thing/refs/heads/main/pikidairy.png';
    function replace() {
        document.querySelectorAll('.vcard-details a.Link--primary.wb-break-all').forEach(link => {
            if (link.href.startsWith('https://pikidiary.lol')) {
                const thing = link.previousElementSibling;
                if (thing && thing.tagName.toLowerCase() === 'svg') {
                    const swagd = document.createElement('img');
                    swagd.src = iconforpikidiary;
                    swagd.alt = 'pikidiary';
                    swagd.title = 'pikidiary';
                    swagd.width = 16;
                    swagd.height = 16;
                    swagd.style.verticalAlign = 'middle';
                    swagd.style.position = 'relative';
                    swagd.style.top = '2px';
                    swagd.style.marginRight = '4px';
                    thing.replaceWith(swagd);
                }
                const match = link.href.match(/https:\/\/pikidiary\.lol\/(?:@)?([\w.-]+)/);
                if (match && match[1]) {
                    link.textContent = `@${match[1]}`;
                }
            }
        });
    }
    replace();
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                replace();
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
