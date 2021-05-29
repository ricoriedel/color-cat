"use strict";

class IconMasker {
    constructor() {
        this.icons = null;
        this.masks = null;
        this.backgrounds = null;
        this.callbackId = 0;
    }

    /* Reloads the list of all elements. */
    discover() {
        this.icons = [];
        this.masks = [];
        this.backgrounds = [];
        this.traverse(document.body);
    }

    /* Starts the paint loop. */
    start() {
        let callback = () => {
            this.paintAll();
            this.callbackId = window.requestAnimationFrame(callback);
        };
        this.callbackId = window.requestAnimationFrame(callback);
    }

    /* Stops the paint loop. */
    stop() {
        window.cancelAnimationFrame(this.callbackId);
    }

    /* [INTERNAL] Recursively adds elements to the lists. */
    traverse(element) {
        if (element instanceof HTMLElement) {
            if (element.dataset.icon) {
                let image = new Image();
                image.src = element.dataset.icon;

                this.icons.push(element);
                this.masks.push(image);
            }
            if (element.dataset.iconFill) {
                this.backgrounds.push(element);
            }
            element.childNodes.forEach(child => {
                this.traverse(child);
            });
        }
    }

    /* [INTERNAL] Paints all icons. */
    paintAll() {
        for (let i = 0; i < this.icons.length; i++) {
            this.paint(this.icons[i], this.masks[i]);
        }
    }

    /* [INTERNAL] Paints a single icon. */
    paint(canvas, mask) {
        let ctx = canvas.getContext("2d");
        let iconBounds = canvas.getBoundingClientRect();

        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let transform = new DOMMatrix(window.getComputedStyle(canvas).transform);
        let reversTransform = this.reverseMatrix(transform);

        ctx.setTransform(reversTransform);

        this.backgrounds.forEach(background => {
            let fillBounds = background.getBoundingClientRect();

            let x = fillBounds.x - iconBounds.x;
            let y = fillBounds.y - iconBounds.y;

            ctx.fillStyle = background.dataset.iconFill;
            ctx.fillRect(x, y, fillBounds.width, fillBounds.height);
        });

        ctx.resetTransform();

        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(mask, 0, 0);
    }

    /* [INTERNAL] Returns a matrix the will undo a given matrix. */
    reverseMatrix(m) {
        return new DOMMatrix([1.0 / m.a, -m.b, -m.c, 1.0 / m.d, -m.e, -m.f]);
    }
}