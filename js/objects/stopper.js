// Stopper object
//
function Stopper(p, pos, width, height, color) {
  // Initialize Stopper variables
  this.color = color;
  this.pos = pos;
  this.width = width;
  this.height = height;

  // Initialize function
  this.init = function () {
    // Determine by block 2 initial position and the drop height
    this.pos.x = block2.pos.x;
    this.pos.y =
      pulley.pos.y -
      2.5 * block2.height -
      block2.height / 2 -
      parseFloat(block2DropHeight.value()) -
      stopperHeight;
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
    p.stroke("Black");
    p.fill(this.color);
    p.rect(cpos.x, cpos.y, cwidth, cheight);
  };
}
