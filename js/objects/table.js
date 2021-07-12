// Table object
//
function Table(p, color) {
  // Initialize Table variables
  this.color = color;
  // Define corner of rectangle in meters
  this.pos1 = p.createVector(
    (1 - tableFracWidth) * sceneWidth,
    tableFracHeight * sceneHeight
  );
  this.pos2 = p.createVector(sceneWidth, 0);
  // Convert coordinates to canvas unit px
  let cpos1 = coordConv(p, this.pos1);
  let cpos2 = coordConv(p, this.pos2);

  // Draw function
  this.draw = function () {
    // draw table
    p.rectMode(p.CORNERS);
    p.noStroke();
    p.fill(this.color);
    p.rect(cpos1.x, cpos1.y, cpos2.x, cpos2.y);
  };
}
