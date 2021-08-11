// Half-Atwood Machine Simulator
//
// Libraries used : p5.js
//
// Jacques M. Laniel, june 2021
//
//
// Global Variables
//
// Simulation control variable : 'setup', 'running', 'stop'
let simPhase = "setup";
// Test static flag : "on" to test, "off" no test
let staticTest = "on";
// Motion state : "static" or "kinetic"
let motionState = "static";
// Test if stopper has been reached ("on") or not ("off")
let stopperState = "on";
// canvas size (4:3)
canvasWidth = 1024;
canvasHeight = 680;
// Scene dimensions
let sceneWidth = 3; // In meters
let sceneHeight;
let scaleFactor;
// Gui global variables
let fontName = "Comic Sans MS";
let fontSizeBold = 16;
let fontSizeRegular = 14;
let fontSizeSmall = 12;
let interLine = 2;
let textX0Shift = 250;
let textY0Shift = 90;
// Physics constants
let g = 9.81;
// Time variables
let t = 0;
let fps = 50;
let dt = 1 / fps;
// Initialization variables
// Table
let tableFracWidth = 0.85; // Fraction of screen
let tableFracHeight = 0.75; // Fraction of screen
let tableColor = "grey";
// Block 1
let block1InitMass = 0.35; // in kg
let block1Color = "SeaGreen";
let musInit = 0.0;
let mucInit = 0.0;
// Block 2
let block2InitMass = 0.05; // in kg
let block2Color = "SeaGreen";
let block2InitDropHeight = 0.6; // in m
// Pulley
let pulleyInitMass = 0.1; // in kg
let pulleyInitRadius = 0.07; // in m
let pulleyMaxRadius = 0.12; // in m
let pulleyMinRadius = 0.01; // in m
let pulleyColor = "Sienna";
// Stopper
let stopperColor = "Black";
let stopperHeight = 0.01;
// String
let stringColor = "Black";
// Force
let forceNorm = 0.05;
let weightColor = "blue";
let normalColor = "red";
let tensionColor = "yellow";
let frictionColor = "purple";
// Acceleration plot
let plotAccXShift = -0.04; // in m
let plotAccYShift = 0.8;
let plotAccWidth = 0.9; //  in m
let plotAccHeight = 0.7; // in m
// Velocity plot
let plotVelXShift = 0.75; // in m
let plotVelYShift = plotAccYShift; // in px
let plotVelWidth = plotAccWidth; //  in m
let plotVelHeight = plotAccHeight; // in m
// Position plot
let plotPosXShift = 1.55; // in m
let plotPosYShift = plotAccYShift; // in px
let plotPosWidth = plotAccWidth; //  in m
let plotPosHeight = plotAccHeight; // in m

// Create p5 instances for top and bottom sketches
let animP5 = new p5(sketch, "sketch");
