/* This file is: app.js */

class UI {
  constructor() {
    this.CANVAS = document.getElementById("canvas");
    this.DATA = document.getElementById("data");
    this.RGB_ARR = [];
  }

  /* 'Paint' a random color */
  randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    this.CANVAS.style.backgroundColor = `rgb(${r},${g},${b})`;
    this.RGB_ARR[0] = r;
    this.RGB_ARR[1] = g;
    this.RGB_ARR[2] = b;
  }

  /* Set the values of the selector to the current background */
  setSelector() {
    // Fill in the colour input
		let redInput = document.getElementById("red-input");
    let greenInput = document.getElementById("green-input");
    let blueInput = document.getElementById("blue-input");
    redInput.value = this.RGB_ARR[0];
    greenInput.value = this.RGB_ARR[1];
    blueInput.value = this.RGB_ARR[2];
    
    // Show the markers
    let rMarker = document.getElementById(`rMarker-${this.RGB_ARR[0]}`)
    let gMarker = document.getElementById(`gMarker-${this.RGB_ARR[1]}`)
    let bMarker = document.getElementById(`bMarker-${this.RGB_ARR[2]}`)
    for (let i=0; i<256; i++) {
      document.getElementById(`rMarker-${i}`).classList.remove("show", "marker-selected");
      document.getElementById(`gMarker-${i}`).classList.remove("show", "marker-selected");
      document.getElementById(`bMarker-${i}`).classList.remove("show", "marker-selected");
    }
    rMarker.classList.add("show", "marker-selected");
    gMarker.classList.add("show", "marker-selected");
    bMarker.classList.add("show", "marker-selected"); 
  }

  /* Clear data */
  clearData() {
    this.DATA.classList.remove("show");
    while (this.DATA.hasChildNodes()) {
      this.DATA.removeChild(this.DATA.childNodes[0]);
    }
	}
	
  /* Show the DATA box and call the functions to fill in the data */
  getData() {
    this.DATA.classList.add("show");
    this.getRgbData();
    this.getHexData();
    this.getHslData();
  }
  
  /* Displaying the RGB value */
  getRgbData() {
    let rgb = document.createElement("strong");
    rgb.innerHTML = "RGB: ";
    this.DATA.appendChild(rgb);
    const RGB_DIV = document.createElement("div");
    RGB_DIV.innerHTML = this.CANVAS.style.backgroundColor;
    this.DATA.appendChild(RGB_DIV);
	}

  /* Displaying the HEX value (converted from RGB) */
  getHexData() {
    let rHex = this.RGB_ARR[0].toString(16).toUpperCase();
    if (rHex.length === 1) {
      rHex = "0" + rHex;
    }
    let gHex = this.RGB_ARR[1].toString(16).toUpperCase();
    if (gHex.length === 1) {
      gHex = "0" + gHex;
    }
    let bHex = this.RGB_ARR[2].toString(16).toUpperCase();
    if (bHex.length === 1) {
      bHex = "0" + bHex;
    }
    const HEX = document.createElement("strong");
    HEX.innerHTML = "HEX: ";
    this.DATA.appendChild(HEX);
    const HEX_DIV = document.createElement("div");
    HEX_DIV.innerHTML = "#" + rHex + gHex + bHex;
    this.DATA.appendChild(HEX_DIV);
  }

  /* Displaying the HSL value (converted from RGB) */
  getHslData() {
    //Hue (h)
    const R = this.RGB_ARR[0] / 255;
    const G = this.RGB_ARR[1] / 255;
    const B = this.RGB_ARR[2] / 255;
    const C_MAX = Math.max(R, G, B);
    const C_MIN = Math.min(R, G, B);
    const DIFF = C_MAX - C_MIN;
    let h;
    if (DIFF === 0) {
      h = 0;
    } else {
      if (C_MAX === R) {
        h = (((G-B)/DIFF)%6)*60;
        if (h < 0) { 
          h += 360; 
        }
      } else if (C_MAX === G) {
        h = (((B-R)/DIFF)+2)*60;
        if (h < 0) { 
          h += 360; 
        }
      } else {
        h = (((R-G)/DIFF)+4)*60;
        if (h < 0) { 
          h += 360; 
        }
      }
    }

    //Lightness (l)
    let l = (C_MAX+C_MIN)/2;

    //Saturation (s)
    let s;
    if (DIFF === 0) {
      s = 0;
    } else {
      s = DIFF / (1-(Math.abs(2*l-1)));
    }
    const H = h.toFixed(0);
    const S = (s*100).toFixed(0);
    const L = (l*100).toFixed(0);
    const HSL = document.createElement("strong");
    HSL.innerHTML = "HSL: ";
    this.DATA.appendChild(HSL);
    const HSL_DIV = document.createElement("div");
    HSL_DIV.innerHTML = `hsl(${H}, ${S}%, ${L}%)`;
    this.DATA.appendChild(HSL_DIV);
  }
}

/* Create the Selectors */
function createSelectors() {
  //Creating the red selector
  const redSelector = document.getElementById("red-selector");	
  let redSelectorHtml = `
    <div class="grid-wrapper">
      <div class="grid-title">
        <strong>Red:</strong>
      </div>
      <div class="grid-input">
        <input id="red-input" value="" placeholder="Enter a value between 0-255" />
      </div>
      <div class="grid-slider">
        <table id="red-slider" class="slider">
          <tr>
  `;
  for (let i=0; i<256; i++) {
    redSelectorHtml += `
      <td id="red-${i}" style="background-color:rgb(${i},0,0);">
        <div id="rMarker-${i}" class="marker"></div>
      </td>`;
  }
  redSelectorHtml += `</tr></table></div></div>`;
  redSelector.innerHTML = redSelectorHtml;

  /* Creating the green selector */
  const greenSelector = document.getElementById("green-selector");	
  let greenSelectorHtml = `
    <div class="grid-wrapper">
      <div class="grid-title">
        <strong>Green:</strong>
      </div>
      <div class="grid-input">
        <input id="green-input" value="" placeholder="Enter a value between 0-255" />
      </div>
      <div class="grid-slider">
        <table id="green-slider" class="slider">
          <tr>
  `;
  for (let i=0; i<256; i++) {
    greenSelectorHtml += 
      `<td style="background-color:rgb(0,${i},0);">
        <div id="gMarker-${i}" class="marker"></div>
      </td>`;
  }
  greenSelectorHtml += `</tr></table></div></div>`;
  greenSelector.innerHTML = greenSelectorHtml;

  /* Creating the blue selector */
  const blueSelector = document.getElementById("blue-selector");	
  let blueSelectorHtml = `
    <div class="grid-wrapper">
      <div class="grid-title">
        <strong>Blue:</strong>
      </div>
      <div class="grid-input">
        <input id="blue-input" value="" placeholder="Enter a value between 0-255" />
      </div>
      <div class="grid-slider">
        <table id="green-slider" class="slider">
          <tr>
  `;
  for (let i=0; i<256; i++) {
    blueSelectorHtml += `
    <td style="background-color:rgb(0,0,${i});">
      <div id="bMarker-${i}" class="marker"></div>
    </td>`;
  }
  blueSelectorHtml += `</tr></table></div></div>`;
  blueSelector.innerHTML = blueSelectorHtml;
}

/* Event Listeners */
function eventListeners() {
  const BTN = document.getElementById("canvas");
  const ui = new UI();

  BTN.addEventListener("click", () => {
    ui.randomColor();
		ui.setSelector();
    ui.clearData();
    ui.getData();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createSelectors();
  eventListeners();
});