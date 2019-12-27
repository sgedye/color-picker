/* This file is: app.js */

class UI {
  constructor() {
    this.CANVAS = document.getElementById("canvas");
    this.DATA = document.getElementById("data");
    
    this.redInput = document.getElementById("red-input");
    this.greenInput = document.getElementById("green-input");
    this.blueInput = document.getElementById("blue-input");
    
    this.RGB_ARR = [];
  }

  /*****************/
  /***** BOX 2 *****/
  /*****************/

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

  /* 'Paint' a specific color */
  specificColor() {
    let r = Number(this.redInput.value);
    let g = Number(this.greenInput.value);
    let b = Number(this.blueInput.value);
    this.CANVAS.style.backgroundColor = `rgb(${r},${g},${b})`;
    this.RGB_ARR[0] = r;
    this.RGB_ARR[1] = g;
    this.RGB_ARR[2] = b;
  }

  /*****************/
  /***** BOX 1 *****/
  /*****************/

  /* Set the values of the selector inputs to the current background */
  setInputs() {
    this.redInput.value = this.RGB_ARR[0];
    this.greenInput.value = this.RGB_ARR[1];
    this.blueInput.value = this.RGB_ARR[2];
  }
  /* Set the values of the sliders to the current background */
  setSliders() {
    for (let i=0; i<256; i++) {
      document.getElementById(`rMarker-${i}`).classList.remove("show", "marker-selected");
      document.getElementById(`gMarker-${i}`).classList.remove("show", "marker-selected");
      document.getElementById(`bMarker-${i}`).classList.remove("show", "marker-selected");
    }
    let rMarker = document.getElementById(`rMarker-${this.RGB_ARR[0]}`)
    let gMarker = document.getElementById(`gMarker-${this.RGB_ARR[1]}`)
    let bMarker = document.getElementById(`bMarker-${this.RGB_ARR[2]}`)
    rMarker.classList.add("show", "marker-selected");
    gMarker.classList.add("show", "marker-selected");
    bMarker.classList.add("show", "marker-selected"); 
  }

  /*****************/
  /***** BOX 3 *****/
  /*****************/

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
    rgb.innerHTML = "RGB Code: ";
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
    HEX.innerHTML = "HEX Code: ";
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
    HSL.innerHTML = "HSL Code: ";
    this.DATA.appendChild(HSL);
    const HSL_DIV = document.createElement("div");
    HSL_DIV.innerHTML = `hsl(${H}, ${S}%, ${L}%)`;
    this.DATA.appendChild(HSL_DIV);
  }
}
/*** END OF CLASS ***/
/*** STAND ALONES ***/

/* Update the red slider function */
function updateRSlider() {
  const INPUT = document.getElementById("red-input");
  if (((Number(INPUT.value)) >= 0) && ((Number(INPUT.value)) < 256)) {
    INPUT.style.backgroundColor = "#ffffff";
    for (let i=0; i<256; i++) {
      document.getElementById(`rMarker-${i}`).classList.remove("show", "marker-selected");
    }
    let rMarker = document.getElementById(`rMarker-${Number(INPUT.value)}`)
    rMarker.classList.add("show", "marker-selected");
  } else {
    INPUT.style.backgroundColor = "#ff0000";
  }
}
/* Update the green slider function */
function updateGSlider() {
  const INPUT = document.getElementById("green-input");
  if (((Number(INPUT.value)) >= 0) && ((Number(INPUT.value)) < 256)) {
    INPUT.style.backgroundColor = "#ffffff";
    for (let i=0; i<256; i++) {
      document.getElementById(`gMarker-${i}`).classList.remove("show", "marker-selected");
    }
    let gMarker = document.getElementById(`gMarker-${Number(INPUT.value)}`)
    gMarker.classList.add("show", "marker-selected");
  } else {
    INPUT.style.backgroundColor = "#ff0000";
  }
}
/* Update the blue slider function */
function updateBSlider() {
  const INPUT = document.getElementById("blue-input");
  if (((Number(INPUT.value)) >= 0) && ((Number(INPUT.value)) < 256)) {
    INPUT.style.backgroundColor = "#ffffff";
    for (let i=0; i<256; i++) {
      document.getElementById(`bMarker-${i}`).classList.remove("show", "marker-selected");
    }
    let bMarker = document.getElementById(`bMarker-${Number(INPUT.value)}`)
    bMarker.classList.add("show", "marker-selected");
  } else {
    INPUT.style.backgroundColor = "#ff0000";
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
        <input id="red-input" value="" placeholder="Enter a value between 0-255" onfocusout="updateRSlider()" />
      </div>
      <div class="grid-slider">
        <table id="red-slider" class="slider">
          <tr id="red-slider-row">
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
        <input id="green-input" value="" placeholder="Enter a value between 0-255" onfocusout="updateGSlider()" />
      </div>
      <div class="grid-slider">
        <table id="green-slider" class="slider">
          <tr id="green-slider-row">
        `;
  for (let i=0; i<256; i++) {
    greenSelectorHtml += `
    <td id="green-${i}" style="background-color:rgb(0,${i},0);">
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
        <input id="blue-input" value="" placeholder="Enter a value between 0-255" onfocusout="updateBSlider()" />
      </div>
      <div class="grid-slider">
        <table id="blue-slider" class="slider">
          <tr id="blue-slider-row">
        `;
  for (let i=0; i<256; i++) {
    blueSelectorHtml += `
    <td id="blue-${i}" style="background-color:rgb(0,0,${i});">
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
    // Box 2
    ui.randomColor();
    // Box 1
    ui.setInputs();
    ui.setSliders();
    // Box 3
    ui.clearData();
    ui.getData();
  });

  // Updating the Red Slider
  const rSlide = document.getElementById("red-slider-row");
  rSlide.addEventListener("click", (event) => {
    let rMarker = event.target.children[0];
    if (!rMarker.classList.contains("show")) {
      for (let i=0; i<256; i++) {
        if (rMarker === document.getElementById(`rMarker-${i}`)) {
          rMarker.classList.add("show", "marker-selected");
          document.getElementById("red-input").value = i;
        } else {
          document.getElementById(`rMarker-${i}`).classList.remove("show", "marker-selected");
        }
      }
    }
  });
  // Updating the Green Slider
  const gSlide = document.getElementById("green-slider-row");
  gSlide.addEventListener("click", (event) => {
    let gMarker = event.target.children[0];
    if (!gMarker.classList.contains("show")) {
      for (let i=0; i<256; i++) {
        if (gMarker === document.getElementById(`gMarker-${i}`)) {
          gMarker.classList.add("show", "marker-selected");
          document.getElementById("green-input").value = i;
        } else {
          document.getElementById(`gMarker-${i}`).classList.remove("show", "marker-selected");
        }
      }
    }
  });
  // Updating the Blue Slider
  const bSlide = document.getElementById("blue-slider-row");
  bSlide.addEventListener("click", (event) => {
    let bMarker = event.target.children[0];
    if (!bMarker.classList.contains("show")) {
      for (let i=0; i<256; i++) {
        if (bMarker === document.getElementById(`bMarker-${i}`)) {
          bMarker.classList.add("show", "marker-selected");
          document.getElementById("blue-input").value = i;
        } else {
          document.getElementById(`bMarker-${i}`).classList.remove("show", "marker-selected");
        }
      }
    }
  });

  /* Redraw Button Functionaility */
  const btnRedraw = document.getElementById("paint-canvas");
  btnRedraw.addEventListener("click", () => {
    const R_VAL = Number(document.getElementById("red-input").value);
    const G_VAL = Number(document.getElementById("green-input").value);
    const B_VAL = Number(document.getElementById("blue-input").value);
    if ((R_VAL >= 0) && (R_VAL < 256)) {
      if ((G_VAL >= 0) && (G_VAL < 256)) {
        if ((B_VAL >= 0) && (B_VAL < 256)) {
          ui.specificColor();
          ui.clearData();
          ui.getData();
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createSelectors();
  eventListeners();
});