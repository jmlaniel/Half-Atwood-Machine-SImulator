// Pulley object
//
function Pulley(p, pulleyMass, pulleyRadius, color) {
  // Initialize Pulley variables
  this.color = color;
  this.mass = pulleyMass;
  this.radius = pulleyRadius;
  this.angle = 0; // in rad
  // Locate the pulley using pos1 from table object
  this.pos = p.createVector(
    table.pos1.x - (1.0 * this.radius) / Math.SQRT2,
    table.pos1.y + (1.0 * this.radius) / Math.SQRT2
  );

  // Initialize function
  this.init = function () {
    // Initialize mass and radius from GUI inputs
    pulley.mass = parseFloat(inputPulleyMass.value());
    pulley.radius = parseFloat(inputPulleyRadius.value());
    // Limit pulley radius
    if (pulley.radius > pulleyMaxRadius) {
      pulley.radius = pulleyMaxRadius;
      inputPulleyRadius.value(pulleyMaxRadius);
    }
    if (pulley.radius < pulleyMinRadius) {
      pulley.radius = pulleyMinRadius;
      inputPulleyRadius.value(pulleyMinRadius);
    }
    // Initialize angle to 0 rad
    pulley.angle = 0; // in rad
  };

  // Draw function
  this.draw = function () {
    // Locate the pulley using pos1 from table object
    this.pos = p.createVector(
      table.pos1.x - (1.0 * this.radius) / Math.SQRT2,
      table.pos1.y + (1.0 * this.radius) / Math.SQRT2
    );
    // Convert pulley coordinates to canvas
    let cpos = coordConv(p, this.pos);
    // Convert pulley radius to canvas
    let cRadius = qtyConv(this.radius);
    // Convert table pos1 coordinates to canvas
    let cPosTable = coordConv(p, {
      x: table.pos1.x + 0.01 * cRadius,
      y: table.pos1.y - 0.01 * cRadius,
    });
    // draw support between table and pulley
    p.strokeWeight(0.05 * scaleFactor);
    p.stroke(tableColor);
    p.line(cPosTable.x, cPosTable.y, cpos.x, cpos.y);
    // draw pulley
    // Draw pully main body and stroke perimeter
    p.strokeWeight(0.005 * scaleFactor);
    p.stroke("Red");
    p.fill(this.color);
    p.circle(cpos.x, cpos.y, 2 * cRadius);
    // Draw axis showing rotation
    p.push();
    p.translate(cpos.x, cpos.y);
    p.rotate(this.angle);
    p.strokeWeight(0.005 * scaleFactor);
    p.stroke("Red");
    p.line(0, 0, cRadius, 0);
    p.strokeWeight(0.005 * scaleFactor);
    p.stroke("Red");
    p.line(0, 0, -cRadius, 0);
    p.strokeWeight(0.005 * scaleFactor);
    p.stroke("Red");
    p.line(0, 0, 0, cRadius);
    p.strokeWeight(0.005 * scaleFactor);
    p.stroke("Red");
    p.line(0, 0, 0, -cRadius);
    p.pop();
    // Draw shaft
    p.noStroke();
    p.fill("black");
    p.circle(cpos.x, cpos.y, (2 * cRadius) / 8);
  };
}
