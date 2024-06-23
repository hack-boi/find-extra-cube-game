const leftBox = document.getElementById('left');
const rightBox = document.getElementById('right');

// Main parameters
const margin = 110;
const cubeSize = 50; // 50x50 px

let level = 1;
let cubeStartNo = 5;

// sound variables
const welcomeSound = new Audio('.\\assets\\sounds\\welcomeSound.mp3')
const moveSound = new Audio('.\\assets\\sounds\\move.mp3')

// generating the cubes
function generateCubes(cubeNum) {
  // clearing the cubes before new level started or for new game
  clearCubes();

  // fixing the boundary of cubes inside the boxes
  let boundaryWidth = leftBox.offsetWidth - 2*margin - cubeSize;
  let boundaryHeight = leftBox.offsetHeight - 2*margin - cubeSize;

  for (let i = 0; i < cubeNum; i++) {
    let cube = document.createElement('div');
    cube.setAttribute('class', 'cube');
    cube.style.width = `${cubeSize}px`;
    cube.style.height = `${cubeSize}px`;

    let leftMovement = generatePosition(boundaryWidth, margin);
    cube.style.left = leftMovement + "px";

    let topMovement = generatePosition(boundaryHeight, margin);
    cube.style.top = topMovement + "px";

    cube.onclick = wrongClick;
    leftBox.appendChild(cube);
  }

  // copy these cubes in right box
  copyToRightBox();
}

function clearCubes() {
  while(leftBox.firstChild) {
    leftBox.removeChild(leftBox.firstChild);
  }
  while(rightBox.firstChild) {
    rightBox.removeChild(rightBox.firstChild);
  }
}

// generating the random position of cubes
function generatePosition(max, min) {
  return Math.random() * (max - min) + min;
}

// copying the cubes in the right box except the last cube
function copyToRightBox() {
  let leftSideCubes = leftBox.cloneNode(true);
  leftSideCubes.removeChild(leftSideCubes.lastChild);
  rightBox.appendChild(leftSideCubes);
  console.log(leftSideCubes);

  createActions();

  // hiding the left box component
  leftSideCubes.removeAttribute('id');
}

// start workin on the functionality
function createActions() {
  let lastCube = document.getElementById('left').lastChild;
  let status = document.getElementById('status');

  lastCube.onclick = function nextLevel(event) {
    moveSound.play();
    event.stopPropagation();

    cubeStartNo += 5;
    level += 1;

    status.innerHTML = level;
    startGame();
  }
}

function wrongClick() {
  alert('Game Over! Your level is: ' + level);
  cubeStartNo = 5;
  level = 1;
  clearCubes();

  if(confirm("Do you want to start over?")) {
    generateCubes(cubeStartNo);
    welcomeSound.play();
  }
}

function startGame() {
  generateCubes(cubeStartNo);
}

window.onload = function () {
  startGame();
}

// YOUR TASK IS TO RECTIFY THE POSITION OF THE CUBES INSIDE THE BOXES OK.....
// I'm WAITING FOR THE RESPONSES IN THE COMMENT SECTIONNNNNNNNNNNNN.

// THANKS A LOT.........
