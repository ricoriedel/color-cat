# Icon Mask
Dynamically change the color of icons on your website.

This small JavaScript library allows you to change the color of icons when a user scrolls above a certain section of your webpage.

## Live demo
An example is located in the <code>example</code> directory.
Simply clone this project and open the HTML file.

## How to use
### Link the library
Copy the JavaScript file onto your server.
A compressed version can be found in the release section.
```
<script src="https://www.example.com/icon-mask.js"></script>
```

You will have to execute a small payload once your Website is ready.
This can be done by linking the auto script or by executing the payload your self.

**Auto script**
```
<script src="https://www.example.com/icon-mask-auto.js"></script>
```
**Payload**
```
let masker = new IconMasker();
masker.discover(); // <-- Execute this method every time your website changes.
masker.start();
```

### Add your icon
Icons are implemented using a canvas.
```
<canvas width="64" height="64" data-icon="icon.svg"></canvas>
```

### Add backgrounds
```
<div data-icon-fill="red"></div>
<div data-icon-fill="#00FF00"></div>
<div data-icon-fill="#00F"></div>
```

## Tested browsers
- [x] Chrome
- [x] Firefox
- [ ] Safari
- [x] Opera
- [ ] Edge

## Roadmap
This features will be implemented on request.
- [x] Native refresh rate
- [x] CSS transformed icon
- [ ] CSS transformed background
- [ ] Background z-index
