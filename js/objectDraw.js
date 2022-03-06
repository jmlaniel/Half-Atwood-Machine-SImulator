// Draw function
//
function objectDraw() {
  // Draw Objects
  table.draw();
  pulley.draw();
  block1.draw();
  block2.draw();
  stopper.draw();
  Fg1.draw();
  n1.draw();
  Fg2.draw();
  // Draw tensions if they are not equal to 0
  // Otherwise, assume that block 2 has reached the stopper
  if (T2b.dir.y != 0) {
    string.draw();
    T1b.draw();
    T2b.draw();
    T1p.draw();
    T2p.draw();
  } else {
    n2.draw();
  }
  if (fsc.dir.x != 0) {
    fsc.draw();
  }
  // Update plots
  plotAcc.draw();
  plotVel.draw();
  plotPos.draw();
}
