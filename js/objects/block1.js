// Block 1 object
//
function Block1(p, mass, pos0, vel0, width, height, idText, color) {
  // Initialize Block variables
  this.idText = idText;
  this.mass = mass;
  this.color = color;
  this.width = width;
  this.height = height;
  this.posInit = p.createVector(pos0.x, pos0.y);
  this.pos0 = p.createVector(pos0.x, pos0.y);
  this.pos = this.pos0;
  this.vel0 = p.createVector(vel0.x, vel0.y);
  this.vel = this.vel0;
  this.acc = p.createVector(0, 0);

  // Initialize function
  this.init = function () {
    // Initialize mass from GUI input
    this.mass = parseFloat(inputBlock1Mass.value());
    // Initialize pos, vel and acceleration
    this.posInit.set(
      sceneWidth - this.width / 1.5,
      pulley.pos.y + pulley.radius
    );
    this.pos.set(sceneWidth - this.width / 1.5, pulley.pos.y + pulley.radius);
    this.vel.set(0, 0);
    this.acc.set(
      (-1 * block2.mass * g) / (this.mass + block2.mass + pulley.mass / 2),
      0
    );
    // Initialize width/height according to pulley radius
    this.height = 2 * (pulley.pos.y + pulley.radius - table.pos1.y);
    this.width = (this.height * 4) / 3;
  };

  // Draw function
  this.draw = function () {
    // Convert coordinates to canvas
    let cpos = coordConv(p, this.pos);
    // Convert bloc size to canvas
    let cwidth = qtyConv(this.width);
    let cheight = qtyConv(this.height);
    // draw table
    p.rectMode(p.CENTER);
    p.stroke("DarkGreen");
    p.fill(this.color);
    p.rect(cpos.x, cpos.y, cwidth, cheight);
    // Draw block identifier
    p.noStroke();
    p.textFont("Comic Sans MS");
    p.textSize((fontSizeBold * scaleFactor) / 300);
    p.textStyle(p.BOLD);
    p.fill("black");
    p.text(idText, cpos.x - cwidth / 3, cpos.y - cheight / 5);
  };
}
