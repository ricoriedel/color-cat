"use strict";

class Colorizer {
    constructor() {
        this.icons = [];
        this.backgrounds = [];
        this.callbackId = null;
    }

    // Adds a single icon.
    addIcon(icon, img) {
        this.icons.push({icon: icon, img: img});
    }

    // Adds multiple icons with the same image.
    addIcons(icons, img) {
        for (let icon of icons) {
            this.addIcon(icon, img);
        }
    }

    // Clears the list of icons.
    clearIcons() {
        this.icons = [];
    }

    // Adds a single background that colorizes an icon.
    addBackground(node, color) {
        this.backgrounds.push({node: node, color: color});
    }

    // Adds multiple backgrounds with the same color.
    addBackgrounds(nodes, color) {
        for (let node of nodes) {
            this.addBackground(node, color);
        }
    }

    // Clears the list of backgrounds.
    clearBackgrounds() {
        this.backgrounds = [];
    }

    // Starts the animation loop.
    start() {
        if (this.callbackId !== null) {
            console.warn("Start called while running.");
            return;
        }
        let callback = () => {
            this.paintAll();
            this.callbackId = window.requestAnimationFrame(callback);
        };
        callback();
    }

    // Stops the animation loop.
    stop() {
        if (this.callbackId === null) {
            console.warn("Stop called while not running.");
            return;
        }
        window.cancelAnimationFrame(this.callbackId);
        this.callbackId = null;
    }

    // [INTERNAL] Paints all icons.
    paintAll() {
        this.icons.forEach(entry => {
            // Check if image is loaded
            if (entry.img.complete) {
                this.paint(entry);
            }
        });
    }

    // [INTERNAL] Paints a single icon.
    paint(entry) {
        let icon = entry.icon;
        let img = entry.img;

        // Sync canvas size with layout size
        let iconScaleX = icon.width / icon.offsetWidth;
        let iconScaleY = icon.height / icon.offsetHeight;

        // Reverse CSS transformations
        let transform = new DOMMatrix(window.getComputedStyle(icon).transform);
        transform = this.reverseMatrix(transform);
        transform.a *= iconScaleX;
        transform.d *= iconScaleY;

        let ctx = icon.getContext("2d");
        ctx.clearRect(0, 0, icon.width, icon.height);
        ctx.setTransform(transform);

        let iconBounds = icon.getBoundingClientRect();

        // Fill canvas with colored rectangles
        this.backgrounds.forEach(bEntry => {
            let node = bEntry.node;
            let color = bEntry.color;

            let fillBounds = node.getBoundingClientRect();

            let x = fillBounds.x - iconBounds.x;
            let y = fillBounds.y - iconBounds.y;

            ctx.fillStyle = color;
            ctx.fillRect(x, y, fillBounds.width, fillBounds.height);
        });

        ctx.resetTransform();

        // Clip image
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(img, 0, 0, icon.width, icon.height);
        ctx.globalCompositeOperation = "source-over";
    }

    /* [INTERNAL] Returns a matrix which undoes the given matrix. */
    reverseMatrix(m) {
        return new DOMMatrix([1.0 / m.a, -m.b, -m.c, 1.0 / m.d, -m.e, -m.f]);
    }
}