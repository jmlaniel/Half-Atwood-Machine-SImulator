// Update blocks acceleration
// Update position of Block 1 & 2 and angle of Pulley
// according to motion phase
// And detect for collision between Block 2 and Stopper
function objectUpdate() {
  // Update time
  dt = animSpeedSlider.value() / fps;
  t += dt;

  // --------------------------------------------------------------------------
  // Tests to determine static/kinetic motion and if stopper has been reached
  // --------------------------------------------------------------------------

  // Test static hypothesis
  if (staticTest == "on") {
    let fsmax = mus.value() * block1.mass * g;
    if (block2.mass * g <= fsmax) {
      motionState = "static";
    } else {
      motionState = "kinetic";
    }
    staticTest = "off";
  }

  // Test if stopper has been reached
  if (block2.pos.y <= stopper.pos.y + block2.height / 2 + stopper.height) {
    stopperState = "on";
  } else {
    stopperState = "off";
  }

  // --------------------------------------------------------------------------
  // Update forces magnitudes and accelerations
  // --------------------------------------------------------------------------

  Fg1.dir.set(0, -block1.mass * g);
  n1.dir.set(0, block1.mass * g);
  Fg2.dir.set(0, -block2.mass * g);

  switch (motionState) {
    case "static":
      if (stopperState == "off") {
        // No normal on block 2
        n2.dir.set(0, 0);
        // T1 = T2 = fsc = Fg2
        T1b.dir.set(-Fg2.dir.mag(), 0);
        T1p.dir.set(+Fg2.dir.mag(), 0);
        T2b.dir.set(0, +Fg2.dir.mag());
        T2p.dir.set(0, -Fg2.dir.mag());
        fsc.dir.set(+Fg2.dir.mag(), 0);
      } else if (stopperState == "on") {
        // Normal on block 2
        n2.dir.set(0, Fg2.dir.mag());
        // T1 = T2 = fsc = 0
        T1b.dir.set(0, 0);
        T1p.dir.set(0, 0);
        T2b.dir.set(0, 0);
        T2p.dir.set(0, 0);
        fsc.dir.set(0, 0);
      }
      block1.acc.set(0, 0);
      block2.acc.set(0, 0);
      break;
    case "kinetic":
      if (stopperState == "off") {
        // No normal on block 2
        n2.dir.set(0, 0);
        // T1, T2, fsc
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
        T1b.dir.set(-T1, 0);
        T1p.dir.set(+T1, 0);
        T2b.dir.set(0, +T2);
        T2p.dir.set(0, -T2);
        fsc.dir.set(mucNum * block1.mass * g, 0);
        block1.acc.set((T1b.dir.x + fsc.dir.x) / block1.mass, 0);
        block2.acc.set(0, (T2b.dir.y + Fg2.dir.y) / block2.mass);
      } else if (stopperState == "on") {
        // Normal on block 2
        n2.dir.set(0, block2.mass * g);
        // T1 = T2 = fsc = 0
        T1b.dir.set(0, 0);
        T1p.dir.set(0, 0);
        T2b.dir.set(0, 0);
        T2p.dir.set(0, 0);
        let mucNum = parseFloat(muc.value());
        fsc.dir.set(mucNum * block1.mass * g, 0);
        block1.acc.set(fsc.dir.x / block1.mass, 0);
        block2.acc.set(0, (n2.dir.y + block2.mass * g) / block2.mass);
      }
      break;
  }

  // --------------------------------------------------------------------------
  // Update plots
  // --------------------------------------------------------------------------

  // Acceleration plot
  label =
    t.toFixed(2).toString() +
    "s" +
    ", " +
    -block1.acc.x.toFixed(2).toString() +
    "m/s^2";
  plotAcc.points.push(new GPoint(t, -block1.acc.x.toFixed(4), label));
  // Velocity plot block 1
  label =
    t.toFixed(2).toString() +
    "s" +
    ", " +
    -block1.vel.x.toFixed(2).toString() +
    "m/s";
  plotVel.points.push(new GPoint(t, -block1.vel.x.toFixed(4), label));
  // Position plot block 1
  label =
    t.toFixed(2).toString() +
    "s" +
    ", " +
    -(block1.pos.x - block1.posInit.x).toFixed(2).toString() +
    "m";
  plotPos.points.push(
    new GPoint(t, -(block1.pos.x - block1.posInit.x).toFixed(4), label)
  );

  // --------------------------------------------------------------------------
  // Update positions and velocities of block 1, 2 and the pulley
  // --------------------------------------------------------------------------

  // Update block 1, 2 and pulley positions and velocities
  // test if Block 1 has reached the left end (which means end of movement)
  let block1XLimit = pulley.pos.x + block1.width / 2 + 1.5 * pulley.radius;
  if (block1.pos.x >= block1XLimit) {
    block1.pos0 = block1.pos;
    block1.vel0 = block1.vel;
    block1.pos.set(
      block1.pos0.x + block1.vel0.x * dt + 0.5 * block1.acc.x * dt * dt,
      block1.pos0.y + block1.vel0.y * dt + 0.5 * block1.acc.y * dt * dt
    );
    block1.vel.set(
      block1.vel0.x + block1.acc.x * dt,
      block1.vel0.y + block1.acc.y * dt
    );
    pulley.angle0 = pulley.angle;
    pulley.angle =
      pulley.angle0 +
      (block1.vel.x / pulley.radius) * dt +
      ((0.5 * block1.acc.x) / pulley.radius) * dt * dt;
  } else {
    block1.pos.x = block1XLimit;
    block1.vel.x = 0;
    simPhase = "pause";
  }

  // Test if Block 1 velocity has reach zero
  if (block1.vel.x >= 0) {
    block1.vel.x = 0;
    simPhase = "pause";
  }

  // Test if Block 2 has reached the stopper
  if (stopperState == "off") {
    block2.pos0 = block2.pos;
    block2.vel0 = block2.vel;
    block2.pos.set(
      block2.pos0.x + block2.vel0.x * dt + 0.5 * block2.acc.x * dt * dt,
      block2.pos0.y + block2.vel0.y * dt + 0.5 * block2.acc.y * dt * dt
    );
    block2.vel.set(
      block2.vel0.x + block2.acc.x * dt,
      block2.vel0.y + block2.acc.y * dt
    );
  } else if (stopperState == "on") {
    block2.pos.y = stopper.pos.y + block2.height / 2 + stopper.height;
    block2.vel.y = 0;
  }

  // --------------------------------------------------------------------------
  // Update forces positions
  // --------------------------------------------------------------------------

  Fg1.pos.set(block1.pos.x, block1.pos.y);
  n1.pos.set(block1.pos.x, block1.pos.y);
  Fg2.pos.set(block2.pos.x, block2.pos.y);
  n2.pos.set(block2.pos.x, block2.pos.y);
  T1b.pos.set(block1.pos.x, block1.pos.y);
  T1p.pos.set(pulley.pos.x, pulley.pos.y + pulley.radius);
  T2b.pos.set(block2.pos.x, block2.pos.y);
  T2p.pos.set(pulley.pos.x - pulley.radius, pulley.pos.y);
  fsc.pos.set(block1.pos.x, block1.pos.y);
}
