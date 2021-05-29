"use strict";

document.addEventListener("DOMContentLoaded", () => {
    let masker = new IconMasker();
    masker.discover();
    masker.start();
});