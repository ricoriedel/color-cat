"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Load the actual icon
    let img = new Image();
    img.src = "icon.svg";

    // Get all required HTML nodes
    let icon = document.getElementById("icon");
    let yellowNodes = document.getElementsByClassName("yellow");
    let blueNodes = document.getElementsByClassName("blue");

    // Configure and start the colorizer
    let colorizer = new Colorizer();
    colorizer.addIcon(icon, img);
    colorizer.addBackgrounds(yellowNodes, "#fde956");
    colorizer.addBackgrounds(blueNodes, "#30ace4");
    colorizer.start();

    // For the demo:
    // Move the icon to the curser position
    document.body.addEventListener("mousemove", e =>  {
        icon.style.left = e.x - icon.offsetWidth / 2 + "px";
        icon.style.top = e.y - icon.offsetHeight / 2 + "px";
    });
});