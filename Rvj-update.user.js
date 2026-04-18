// ==UserScript==
// @name         RVJ Modpack v14 FINAL (Server Safe)
// @namespace    http://tampermonkey.net/
// @version      14.2
// @description  Stable loader + server-safe injection + Stay support
// @match        *://mope.io/*
// @grant        none
// ==/UserScript==

(function() {
'use strict';

let injected = false;

// Wait for actual game readiness
function isGameReady() {
    return document.readyState === "complete" &&
           document.querySelector("canvas") &&
           window.WebSocket;
}

// Inject into PAGE CONTEXT (this is the key fix)
function injectToPage(code) {
    const script = document.createElement("script");
    script.textContent = code;
    document.documentElement.appendChild(script);
    script.remove();
}

// Main injector
function injectMod() {
    if (injected) return;
    injected = true;

    console.log("[RVJ] Injecting (server-safe)...");

    injectToPage(`

        (function() {
            console.log("[RVJ] Running inside page context");

            // ===== YOUR ORIGINAL MOD CODE STARTS HERE =====


            /* PASTE YOUR ORIGINAL MOD CODE BELOW THIS LINE */



            // ===== YOUR ORIGINAL MOD CODE ENDS HERE =====

        })();

    `);
}

// Reinjection system
function watchDOM() {
    const observer = new MutationObserver(() => {
        if (!injected && isGameReady()) {
            console.log("[RVJ] Reinjection triggered");
            injectMod();
        }
    });

    observer.observe(document, { childList: true, subtree: true });
}

// Manual inject button
function createButton() {
    const btn = document.createElement("button");
    btn.innerText = "Inject RVJ";
    btn.style.position = "fixed";
    btn.style.top = "20px";
    btn.style.right = "20px";
    btn.style.zIndex = "9999";
    btn.style.padding = "10px";
    btn.style.background = "black";
    btn.style.color = "white";
    btn.style.border = "1px solid white";

    btn.onclick = () => {
        injected = false;
        injectMod();
    };

    document.body.appendChild(btn);
}

// Wait loop
function waitLoop() {
    if (isGameReady()) {
        injectMod();
    } else {
        setTimeout(waitLoop, 200);
    }
}

// Start
createButton();
watchDOM();
waitLoop();

})();
