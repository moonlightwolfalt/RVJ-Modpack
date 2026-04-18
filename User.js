// ==UserScript==
// @name         RVJ Modpack v15 (Connection FIXED)
// @namespace    http://tampermonkey.net/
// @version      15.0
// @match        *://mope.io/*
// @grant        none
// ==/UserScript==

(function() {
'use strict';

let injected = false;

// Wait for TRUE game readiness
function isReady() {
    return document.readyState === "complete" &&
           document.querySelector("canvas") &&
           typeof window.WebSocket !== "undefined" &&
           document.body &&
           document.querySelectorAll("canvas").length > 0;
}

// Inject into PAGE (not sandbox)
function inject(code) {
    const s = document.createElement("script");
    s.textContent = code;
    document.documentElement.appendChild(s);
    s.remove();
}

// MAIN SAFE INJECTION
function injectMod() {
    if (injected) return;
    injected = true;

    console.log("[RVJ] Waiting extra safety delay...");

    // CRITICAL: delay AFTER ready
    setTimeout(() => {

        inject(`

            (function() {

                console.log("[RVJ] Injected into page safely");

                // EXTRA delay to avoid breaking connection
                setTimeout(() => {

                    console.log("[RVJ] Running mod AFTER connection");

                    /* =========================
                       PASTE YOUR MOD CODE HERE
                       ========================= */

                }, 1500);

            })();

        `);

    }, 1500);
}

// Wait loop
function waitLoop() {
    if (isReady()) {
        injectMod();
    } else {
        setTimeout(waitLoop, 300);
    }
}

waitLoop();

})();
