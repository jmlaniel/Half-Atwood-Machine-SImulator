// Object initialization function
//
function objectInit(p) {
  // No initialization for table

  // Initialize pulley
  pulley.init();

  // Initialize Block 1
  block1.init();

  // Initialize Block 2
  block2.init();

  // Initialize stopper position
  stopper.init();

  // No initialization for string

  // Initialize force (parameters are: posx, posy, dirx, diry)
  Fg1.init(block1.pos.x, block1.pos.y, 0, -block1.mass * g);
  n1.init(block1.pos.x, block1.pos.y, 0, block1.mass * g);
  Fg2.init(block2.pos.x, block2.pos.y, 0, -block2.mass * g);
  n2.init(block2.pos.x, block2.pos.y, 0, 0);

  // Check that µs > µc
  if (mus.value() < muc.value()) {
    muc.value(mus.value());
  }

  // Test static hypothesis
  let fsmax = mus.value() * block1.mass * g;
  if (block2.mass * g <= fsmax) {
    motionState = "static";
  } else {
    motionState = "kinetic";
  }

  // Initialize tension and friction as a function of motion state (static or kinetic)
  switch (motionState) {
    case "static":
      T1b.init(block1.pos.x, block1.pos.y, -Fg2.dir.mag(), 0);
      T1p.init(pulley.pos.x, pulley.pos.y + pulley.radius, +Fg2.dir.mag(), 0);
      T2b.init(block2.pos.x, block2.pos.y, 0, +Fg2.dir.mag());
      T2p.init(pulley.pos.x - pulley.radius, pulley.pos.y, 0, -Fg2.dir.mag());
      fsc.init(block1.pos.x, block1.pos.y, +Fg2.dir.mag(), 0);
      break;
    case "kinetic":
      let mucNum = parseFloat(muc.value());
      let T1 =
        (block1.mass *
          block2.mass *
          g *
          (1 + mucNum + (mucNum * pulley.mass) / (2 + block2.mass))) /
        (block1.mass + block2.mass + pulley.mass / 2);
      let T2 =
        (block1.mass *
          block2.mass *
          g *
          (1 + mucNum + (mucNum * pulley.mass) / 2 / block1.mass)) /
        (block1.mass + block2.mass + pulley.mass / 2);
      T1b.init(block1.pos.x, block1.pos.y, -T1, 0);
      T1p.init(pulley.pos.x, pulley.pos.y + pulley.radius, +T1, 0);
      T2b.init(block2.pos.x, block2.pos.y, 0, +T2);
      T2p.init(pulley.pos.x - pulley.radius, pulley.pos.y, 0, -T2);
      fsc.init(block1.pos.x, block1.pos.y, mucNum * block1.mass * g, 0);
  }

  // Reset Force normalization constant based on weights (block 1 or 2)
  if (block1.mass >= block2.mass) {
    forceNorm = 1 / Fg1.dir.mag();
  } else {
    forceNorm = 1 / Fg2.dir.mag();
  }

  // Initialize plots
  plotAcc.init();
  plotVel.init();
  plotPos.init();
}
