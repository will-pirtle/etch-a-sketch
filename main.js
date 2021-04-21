let size = 16;
const grid = document.querySelector('.grid');

console.log(grid.clientWidth);

for (let i = 0; i < size; i++) {
  const gridCol = document.createElement('div');
  gridCol.classList.add('grid-col');
  grid.appendChild(gridCol);

  for (let j = 0; j < size; j++) {
    const gridBox = document.createElement('div');
    gridBox.classList.add('grid-box');
    gridCol.appendChild(gridBox);
  }
}