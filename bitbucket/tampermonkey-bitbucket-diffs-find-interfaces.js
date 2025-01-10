// ==UserScript==
// @name         Find C# interfaces in BitBucket diffs
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Applies the CSS class 'interface' on BitBucket pages to spans with CSS class 'class-name' and inner text starting with "I".
// @author       You
// @match        https://bitbucket.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let debounceTimer;

    // Function to process spans
    function processSpans() {
        const elements = document.querySelectorAll('span.class-name');
        elements.forEach(element => {
            if (element.textContent.trim().startsWith('I')) {
                if (!element.classList.contains('interface')) { // Avoid reapplying the class
                    element.classList.add('interface');
                }
            }
        });
    }

    // Debounced function
    function debounceProcessSpans(delay) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            processSpans();
            console.log('Processed spans after debounce.');
        }, delay);
    }

    // Set up a MutationObserver to detect DOM changes
    const observer = new MutationObserver(mutations => {
        // Debounce DOM updates
        debounceProcessSpans(1000); // Adjust debounce delay as needed
    });

    // Start observing the entire document for DOM changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial run to handle already-rendered content
    processSpans();

    console.log('MutationObserver with debouncing set up. Script is watching for DOM changes.');
})();
