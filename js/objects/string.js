// Stopper object
//
function String(p, color) {
  // Initialize String variables
  this.color = color;

  // Draw function
  this.draw = function () {
    // draw horizontal string
    let pos1 = p.createVector(pulley.pos.x, pulley.pos.y + pulley.radius);
    let pos2 = p.createVector(
      block1.pos.x - block1.width / 2,
      pulley.pos.y + pulley.radius
    );
    let cpos1 = coordConv(p, pos1);
    let cpos2 = coordConv(p, pos2);
    p.strokeWeight(0.005 * scaleFactor);
    p.stroke(stringColor);
    p.line(cpos1.x, cpos1.y, cpos2.x, cpos2.y);
    // draw vertical string
    pos1 = p.createVector(pulley.pos.x - pulley.radius, pulley.pos.y);
    pos2 = p.createVector(
      pulley.pos.x - pulley.radius,
      block2.pos.y + block2.height / 2
    );
    cpos1 = coordConv(p, pos1);
    cpos2 = coordConv(p, pos2);
    p.strokeWeight(0.005 * scaleFactor);
    p.stroke(stringColor);
    p.line(cpos1.x, cpos1.y, cpos2.x, cpos2.y);
  };
}
