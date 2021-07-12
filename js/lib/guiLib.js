// Gui functions
//
//-------------------------------------------------------------------------
// Control functions (running, pause, stop)
//-------------------------------------------------------------------------

// Start Simulation
function simRunning(p) {
  // initialize time
  t = 0;
  simPhase = "running"; // Set phase to running
  staticTest = "on"; // Set static test flag on
  stopperState = "off"; // Set stopperState flag to off
  // Set coordinates and velocities to initial conditions
  objectInit(p);
  // Draw objects
  objectDraw();
}

// Pause simulation
function simPause(p) {
  switch (simPhase) {
    case "pause":
      simPhase = "running"; // Toggle pause for running
      break;
    case "running":
      simPhase = "pause"; // Toggle running for pause
      break;
  }
}

// Stop Simulation
function simStopping(p) {
  simPhase = "setup"; // Set phase to running
}

//-------------------------------------------------------------------------
// Inputs
//-------------------------------------------------------------------------

function guiInputsInit(p) {
  // Upper left corner of GUI text is relative to table pos1
  let r0 = p.createVector(table.pos1.x, table.pos1.y);
  let cr0 = coordConv(p, r0);
  let x0 = cr0.x + textX0Shift;
  let y0 = cr0.y + textY0Shift;
  let dx = 160;
  let dy = 0;
  let yStep = fontSizeBold + 2 * interLine;
  let buttonLength = 70;
  let buttonHeight = 30;
  let sliderLenght = 100;
  let sliderHeight = 30;

  // Block 1 Mass input (initial value defined as global variable)
  dy = -fontSizeRegular;
  inputBlock1Mass = p.createInput("");
  inputBlock1Mass.position(x0 + dx, y0 + dy);
  inputBlock1Mass.size(50, 22);
  inputBlock1Mass.value(block1InitMass);

  // Block 2 Mass input (initial value defined as global variable)
  dy += yStep;
  inputBlock2Mass = p.createInput("");
  inputBlock2Mass.position(x0 + dx, y0 + dy);
  inputBlock2Mass.size(50, 22);
  inputBlock2Mass.value(block2InitMass);

  // Pulley Mass input (initial value defined as global variable)
  dy += yStep;
  inputPulleyMass = p.createInput("");
  inputPulleyMass.position(x0 + dx, y0 + dy);
  inputPulleyMass.size(50, 22);
  inputPulleyMass.value(pulleyInitMass);

  // Pulley Radius input (initial value defined as global variable)
  dy += yStep;
  inputPulleyRadius = p.createInput("");
  inputPulleyRadius.position(x0 + dx, y0 + dy);
  inputPulleyRadius.size(50, 22);
  inputPulleyRadius.value(pulleyInitRadius);

  // Drop height for block 2 input (initial value defined as global variable)
  dy += yStep;
  block2DropHeight = p.createInput("");
  block2DropHeight.position(x0 + dx, y0 + dy);
  block2DropHeight.size(50, 22);
  block2DropHeight.value(block2InitDropHeight);

  // Static friction coefficient between block 1 and table
  dy += yStep;
  mus = p.createInput("");
  mus.position(x0 + dx, y0 + dy);
  mus.size(50, 22);
  mus.value(musInit);

  // Kinetic friction coefficient between block 1 and table
  dy += yStep;
  muc = p.createInput("");
  muc.position(x0 + dx, y0 + dy);
  muc.size(50, 22);
  muc.value(mucInit);

  // Slider for animation speed
  dx += 70;
  dy += 0.8 * yStep;
  animSpeedSlider = p.createSlider(0.1, 1.5, 1.0, 0.1);
  animSpeedSlider.position(x0 + dx, y0 + dy);
  animSpeedSlider.size(sliderLenght, sliderHeight);
  animSpeedSlider.style("accentColor", "black");

  // Setup Run Button
  let dx1 = -150;
  dx = dx1;
  dy = 0;
  runButton = p.createButton("Run");
  runButton.position(x0 + dx, y0 + dy);
  runButton.size(buttonLength, buttonHeight);
  runButton.mousePressed(function () {
    simRunning(p);
  });

  // Setup Pause Button
  dy += 1.5 * buttonHeight;
  pauseButton = p.createButton("Pause");
  pauseButton.position(x0 + dx, y0 + dy);
  pauseButton.size(buttonLength, buttonHeight);
  pauseButton.mousePressed(function () {
    simPause(p);
  });

  // Setup Stop Button
  dy += 1.5 * buttonHeight;
  stopButton = p.createButton("Stop");
  stopButton.position(x0 + dx, y0 + dy);
  stopButton.size(buttonLength, buttonHeight);
  stopButton.mousePressed(function () {
    simStopping(p);
  });
}

function guiInputsText(p) {
  // Variables (textX0Shift & textY0Shift are defined globally)
  // Upper left corner of GUI text is relative to table pos1
  let r0 = p.createVector(table.pos1.x, table.pos1.y);
  let cr0 = coordConv(p, r0);
  let x0 = cr0.x + textX0Shift;
  let y0 = cr0.y + textY0Shift;
  let dx = 0;
  let dy = 0;
  let yStep = fontSizeBold + 2 * interLine;

  // Title
  p.noStroke();
  p.textFont(fontName);
  p.textSize(fontSizeBold);
  p.textStyle(p.BOLD);
  p.fill("black");
  p.text("Half-Atwood Machine", 10, 20);
  p.textSize(fontSizeRegular);
  p.textStyle(p.NORMAL);
  p.text("JML 2021", 20, 40);

  // Block 1 Mass input
  dx = 20;
  dy = 0;
  p.textSize(fontSizeRegular);
  p.textStyle(p.NORMAL);
  p.fill("black");
  p.text("Mass of Block 1 (kg):", x0 + dx, y0 + dy);

  // Block 2 Mass input
  dy += yStep;
  p.text("Mass of Block 2 (kg):", x0 + dx, y0 + dy);

  // Pulley Mass input
  dy += yStep;
  p.text("Mass of Pulley (kg):", x0 + dx, y0 + dy);

  // Pulley Radius input
  dy += yStep;
  p.text("Radius of Pulley (m):", x0 + dx, y0 + dy);

  // Drop height of block 2 input
  dy += yStep;
  p.text("Drop height (m):", x0 + dx, y0 + dy);

  // Static frictionnal coefficient
  dy += yStep;
  p.text("Static friction µs:", x0 + dx, y0 + dy);

  // Kinetic frictionnal coefficient
  dy += yStep;
  p.text("Kinetic friction µc:", x0 + dx, y0 + dy);

  // Kinetic frictionnal coefficient
  dy += yStep;
  p.text("Animation Speed (1 = realtime):", x0 + dx, y0 + dy);

  // Notes
  dy += yStep;
  p.text(
    "Note : µc < µs, Max radius of pulley = " +
      pulleyMaxRadius +
      "m, " +
      " Decimal separator must be : '.'",
    x0 + dx,
    y0 + dy
  );

  // Description of forces
  let dx1 = 230;
  let dx2 = 350;
  dx = dx1;
  dy = 0;
  p.stroke(5);
  p.textSize(fontSizeRegular);
  p.textStyle(p.NORMAL);
  p.fill(weightColor);
  p.text("Weight Block 1 :", x0 + dx, y0 + dy);
  dx = dx2;
  p.stroke(5);
  p.textSize(fontSizeRegular);
  p.textStyle(p.NORMAL);
  p.fill(weightColor);
  p.text(Fg1.dir.mag().toFixed(2) + " N ", x0 + dx, y0 + dy);

  dx = dx1;
  dy += yStep;
  p.stroke(5);
  p.textSize(fontSizeRegular);
  p.textStyle(p.NORMAL);
  p.fill(weightColor);
  p.text("Weight Block 2 :", x0 + dx, y0 + dy);
  dx = dx2;
  p.stroke(5);
  p.textSize(fontSizeRegular);
  p.textStyle(p.NORMAL);
  p.fill(weightColor);
  p.text(Fg2.dir.mag().toFixed(2) + " N ", x0 + dx, y0 + dy);

  dx = dx1;
  dy += yStep;
  p.stroke(5);
  p.textSize(fontSizeRegular);
  p.textStyle(p.NORMAL);
  p.fill(normalColor);
  p.text("Normal Block 1 :", x0 + dx, y0 + dy);
  dx = dx2;
  // p.fill(weightColor);
  p.text(n1.dir.mag().toFixed(2) + " N ", x0 + dx, y0 + dy);

  dx = dx1;
  dy += yStep;
  p.stroke(5);
  p.textSize(fontSizeRegular);
  p.textStyle(p.NORMAL);
  p.fill(normalColor);
  p.text("Normal Block 2 :", x0 + dx, y0 + dy);
  dx = dx2;
  p.text(n2.dir.mag().toFixed(2) + " N ", x0 + dx, y0 + dy);

  dx = dx1;
  dy += yStep;
  p.stroke(5);
  p.textSize(fontSizeRegular);
  p.textStyle(p.NORMAL);
  p.fill(tensionColor);
  p.text("Tension 1 :", x0 + dx, y0 + dy);
  dx = dx2;
  p.text(T1b.dir.mag().toFixed(2) + " N ", x0 + dx, y0 + dy);

  dx = dx1;
  dy += yStep;
  p.stroke(5);
  p.textSize(fontSizeRegular);
  p.textStyle(p.NORMAL);
  p.fill(tensionColor);
  p.text("Tension 2 :", x0 + dx, y0 + dy);
  dx = dx2;
  p.text(T2b.dir.mag().toFixed(2) + " N ", x0 + dx, y0 + dy);

  dx = dx1;
  dy += yStep;
  p.stroke(5);
  p.textSize(fontSizeRegular);
  p.textStyle(p.NORMAL);
  p.fill(frictionColor);
  p.text("Friction :", x0 + dx, y0 + dy);
  dx = dx2;
  p.text(fsc.dir.mag().toFixed(2) + " N ", x0 + dx, y0 + dy);

  dx = 5 * dx1;
  dy += yStep;
  p.stroke(5);
  p.textSize(fontSizeRegular);
  p.textStyle(p.NORMAL);
  p.fill("black");
  p.text("Friction :", x0 + dx, y0 + dy);
  dx = dx2;
  p.text(animSpeedSlider.value().toFixed(1), x0 + dx, y0 + dy);
}
