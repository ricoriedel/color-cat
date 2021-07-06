# Color Cat JS
Change the color of icons while scrolling.

This small library adjusts the color of an icon depending on the background.
Make your icon bright on a dark background and dark on a bright background.

## Live demo
The example directory contains a working demo.
Make sure to clone the whole project as the demo links directly to the root folder.

## How to use
Copy the JavaScript file onto your server.
A compressed version can be found in the release section.
```html
<script src="https://www.example.com/color-cat.js"></script>
```

Create a canvas element for the icon.
Note that the width and height does not need to match the onscreen size.
```html
<canvas class="icon" id="icon" width="128" height="128"></canvas>
```

Afterwards, you can configure the colorizer.
```javascript
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
```


## Tested browsers
- [x] Chrome
- [x] Firefox
- [x] Safari
- [x] Opera
- [ ] Edge

## Roadmap
These features will be implemented on request.
- [x] Native refresh rate
- [x] CSS transformed icon
- [ ] CSS transformed background
