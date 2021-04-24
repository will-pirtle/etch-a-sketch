let size = 16;
let penColor = 'grayscale';
const grid = document.querySelector('.grid');

fillGrid(size);

const resetBtn = document.querySelector('#reset-btn');
const grayscale = document.querySelector('#grayscale');
const rainbow = document.querySelector('#rainbow');

resetBtn.addEventListener('click', changeSize);
grayscale.addEventListener('click', () => {
  penColor = 'grayscale';
});
rainbow.addEventListener('click', () => {
  penColor = 'rainbow';
});


// Helper Functions
function fillGrid(size) {
  for (let i = 0; i < size; i++) {
    const gridCol = document.createElement('div');
    gridCol.classList.add('grid-col');
    grid.appendChild(gridCol);

    for (let j = 0; j < size; j++) {
      const gridBox = document.createElement('div');
      gridBox.classList.add('grid-box');
      gridBox.setAttribute('style', 'background-color: rgb(255, 255, 255);');
      gridBox.addEventListener('mouseover', changeColor);
      gridCol.appendChild(gridBox);
    }
  }
}

function changeSize() {
  newSize = parseInt(prompt("Enter new size for box: ", `${size}`));
  
  if (!newSize) {
    return;
  } else if (newSize > 64 || newSize < 1) {
    alert("Please enter a number from 1-64!");
  } else {
    clearGrid();
    fillGrid(newSize);
  }
}

function changeColor(e) {
  if (penColor == 'grayscale') {
    let hslArray = rgbToHSL(e.target.style.backgroundColor);
    if (hslArray[2] > 0) {
      hslArray[2] -= 15;
    }

    e.target.style.backgroundColor = hslToRGB(hslArray);
  } else if (penColor == 'rainbow') {
    let hslArray = getRandomColor();

    e.target.style.backgroundColor = hslToRGB(hslArray);
  }
}

function getRandomColor() {
  let h = Math.floor(Math.random() * 356);
  let s = 100;
  let l = Math.floor(Math.random() * (75 - 50) + 50);
  return [h, s, l];
}

function clearGrid() {
  const cols = document.querySelectorAll('.grid-col');
  cols.forEach((col) => {
    grid.removeChild(col);
  });
}

function rgbToHSL(rgbString) {
  // turn "rgb(r, g, b)" into ["r", "g", "b"]
  let rgb = rgbString.substr(4).split(")")[0].split(", ");

  // convert r,g,b values to number between 0 and 1
  let red = parseInt(rgb[0]) / 255;
  let green = parseInt(rgb[1]) / 255;
  let blue = parseInt(rgb[2]) / 255;

  let colorMin = Math.min(red, green, blue),
      colorMax = Math.max(red, green, blue),
      delta = colorMax - colorMin,
      h = 0,
      s = 0,
      l = 0;

  // calculate hue
  if (delta == 0) {
    h = 0;
  } else if (colorMax == red) {
    h = ((green - blue) / delta) % 6;
  } else if (colorMax == green) {
    h = (blue - red) / delta + 2;
  } else {
    h = (red - green) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  // calculate lightness and saturation
  l = (colorMax + colorMin) / 2;
  if (delta == 0) {
    s = 0;
  } else {
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

function hslToRGB(hslArray) {
  let h = hslArray[0],
      s = hslArray[1],
      l = hslArray[2];

  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let chroma = (1 - Math.abs(2 * l - 1)) * s,
      x = chroma * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - chroma/2,
      red = 0,
      green = 0,
      blue = 0;
  
  if (0 <= h && h < 60) {
    red = chroma; green = x; blue = 0;  
  } else if (60 <= h && h < 120) {
    red = x; green = chroma; blue = 0;
  } else if (120 <= h && h < 180) {
    red = 0; green = chroma; blue = x;
  } else if (180 <= h && h < 240) {
    red = 0; green = x; blue = chroma;
  } else if (240 <= h && h < 300) {
    red = x; green = 0; blue = chroma;
  } else if (300 <= h && h < 360) {
    red = chroma; green = 0; blue = x;
  }
  red = Math.round((red + m) * 255);
  green = Math.round((green + m) * 255);
  blue = Math.round((blue + m) * 255);

  return "rgb(" + red + "," + green + "," + blue + ")";
}