// Function that creates all objects
function objectCreation(p) {
  // Create table
  table = new Table(p, tableColor);

  // Create pulley and support
  pulley = new Pulley(p, pulleyInitMass, pulleyInitRadius, pulleyColor);

  // Create Block 1
  let height = 2 * (pulley.pos.y + pulley.radius - table.pos1.y);
  let width = (height * 4) / 3;
  block1 = new Block1(
    p,
    block1InitMass,
    p.createVector(sceneWidth - width / 1.5, pulley.pos.y + pulley.radius),
    p.createVector(0, 0),
    width,
    height,
    "1",
    block1Color
  );

  // Create Block 2
  width = 1.8 * (table.pos1.x - pulley.pos.x + pulley.radius);
  height = (3 * width) / 4;
  block2 = new Block2(
    p,
    block2InitMass,
    p.createVector(pulley.pos.x - pulley.radius, pulley.pos.y - 1.5 * height),
    p.createVector(0, 0),
    width,
    height,
    "2",
    block2Color
  );

  // Create block 2 stopper
  stopper = new Stopper(
    p,
    p.createVector(
      block2.pos.x,
      block2.pos.y - block2.height / 2 - block2InitDropHeight - stopperHeight
    ),
    block2.width,
    stopperHeight,
    stopperColor
  );

  // Create string
  string = new String(p, stringColor);

  // Create Forces
  Fg1 = new Force(
    p,
    p.createVector(block1.pos.x, block1.pos.y),
    p.createVector(0, -1 * block1.mass * g),
    weightColor
  );
  n1 = new Force(
    p,
    p.createVector(block1.pos.x, block1.pos.y),
    p.createVector(0, +block1.mass * g),
    normalColor
  );
  Fg2 = new Force(
    p,
    p.createVector(block2.pos.x, block2.pos.y),
    p.createVector(0, -block2.mass * g),
    weightColor
  );
  n2 = new Force(
    p,
    p.createVector(block2.pos.x, block2.pos.y),
    p.createVector(0, +block2.mass * g),
    normalColor
  );
  T1b = new Force(
    p,
    p.createVector(block1.pos.x, block1.pos.y),
    p.createVector(
      -(block1.mass * block2.mass * g) / (block1.mass + block2.mass),
      0
    ),
    tensionColor
  );
  T2b = new Force(
    p,
    p.createVector(block2.pos.x, block2.pos.y),
    p.createVector(
      0,
      (block1.mass * block2.mass * g) / (block1.mass + block2.mass)
    ),
    tensionColor
  );
  T1p = new Force(
    p,
    p.createVector(pulley.pos.x, pulley.pos.y + pulley.radius),
    p.createVector(
      +(block1.mass * block2.mass * g) / (block1.mass + block2.mass),
      0
    ),
    tensionColor
  );
  T2p = new Force(
    p,
    p.createVector(pulley.pos.x - pulley.radius, pulley.pos.y),
    p.createVector(
      0,
      -(block1.mass * block2.mass * g) / (block1.mass + block2.mass)
    ),
    tensionColor
  );
  fsc = new Force(
    p,
    p.createVector(block1.pos.x, block1.pos.y),
    p.createVector(-T1b.dir.x, 0),
    frictionColor
  );

  // Create plots (acc, vel, pos)
  plotAcc = new Plot(
    p,
    plotAccXShift,
    plotAccYShift,
    plotAccWidth,
    plotAccHeight,
    "t (s)",
    "a (m/s^2)",
    "Bloc 1\nacceleration vs temps"
  );
  plotVel = new Plot(
    p,
    plotVelXShift,
    plotVelYShift,
    plotVelWidth,
    plotVelHeight,
    "t (s)",
    "v (m/s)",
    "Bloc 1\nvitesse vs temps"
  );
  plotPos = new Plot(
    p,
    plotPosXShift,
    plotPosYShift,
    plotPosWidth,
    plotPosHeight,
    "t (s)",
    "r (m)",
    "Bloc 1\nposition vs temps"
  );
}
