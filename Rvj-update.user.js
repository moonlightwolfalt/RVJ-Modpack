// ==UserScript==
// @name         RVJ Modpack v14.3 (Connection Safe)
// @namespace    http://tampermonkey.net/
// @version      14.3
// @match        *://mope.io/*
// @grant        none
// ==/UserScript==

(function() {
'use strict';

let injected = false;

// Wait for FULL connection (not just canvas)
function isFullyConnected() {
    return document.readyState === "complete" &&
           document.querySelector("canvas") &&
           typeof window.WebSocket !== "undefined" &&
           window.hasOwnProperty("game") // key fix (wait for client init)
}

// Inject into page context
function inject(code) {
    const s = document.createElement("script");
    s.textContent = code;
    document.documentElement.appendChild(s);
    s.remove();
}

// Safe injector
function injectMod() {
    if (injected) return;
    injected = true;

    console.log("[RVJ] Injecting AFTER connection...");

    inject(`

        (function() {

            // Delay inside page too (extra safety)
            setTimeout(() => {

                console.log("[RVJ] Running mod safely");

                /* === YOUR ORIGINAL MOD CODE HERE === */

            }, 1000);

        })();

    `);
}

// Wait loop
function wait() {
    if (isFullyConnected()) {
        injectMod();
    } else {
        setTimeout(wait, 300);
    }
}

wait();

})();
