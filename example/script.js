document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("canvas");

    document.body.addEventListener("mousemove", e =>  {
        canvas.style.left = e.x - canvas.width / 2 + "px";
        canvas.style.top = e.y - canvas.height / 2 + "px";
    });
});