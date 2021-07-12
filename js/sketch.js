// p5.js sketch
//
// Jacques M. Laniel, july 2021
//
// Declare vobject variables
let table, block1, block2, pulley, string, stopper;
let n1, Fg2, n2;
// the index b and p (for T1 T2) represents forces at
// block (b) or pulley (p)
let T1b, T2b, T1p, T2p;
// Declare gui objects
let runButton, pauseButton, stopButton, animSpeedSlider;

let sketch = function (p) {
  // p5 setup function
  p.setup = function () {
    // Create canvas using the whole browser window
    canvas = p.createCanvas(canvasWidth, canvasHeight);
    // Compute scene height and scaling factor for the canvas
    sceneDimensions(p);
    // Setup framerate fps = 1/dt
    p.frameRate(fps);
    // Create objects
    objectCreation(p);
    // Create GUI inputs
    guiInputsInit(p);
    // Draw Gui text
    guiInputsText(p);
  };

  // p5 draw function
  p.draw = function () {
    // Set background color
    p.background("LightSkyBlue");
    switch (simPhase) {
      case "setup":
        // Initialize objects
        objectInit();
        // Draw objects
        objectDraw();
        break;
      case "running":
        // Update objects
        objectUpdate();
        // Draw objects
        objectDraw();
        break;
      case "pause":
        // Draw objects
        objectDraw();
    }
    // Draw Gui text
    guiInputsText(p);
  };
};
