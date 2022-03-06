// Function that computes scene heights and scaling factors for topCanvas
//
// Warning : variables sceneHeight and scaleFactoir must declared as global variables
//
function sceneDimensions(p) {
  // Compute scene dimensions with respect to topCanvas dimension
  sceneHeight = (sceneWidth * canvasHeight) / canvasWidth;
  // Compute scaling factors between meters and pixels
  scaleFactor = canvasWidth / sceneWidth;
}

// function that takes x in meters and convert it to subcanvas scale in pixels
function qtyConv(x) {
  return x * scaleFactor;
}
// Function that takes (x,y) in meters and convert them to subcanvas dimension in pixels
function coordConv(p, pos) {
  let x = pos.x * scaleFactor;
  let y = (sceneHeight - pos.y) * scaleFactor;
  return p.createVector(x, y);
}

// Function that takes (vx,vy) in meters/s and convert them to subcanvas dimension in pixels/s
function velConv(p, vel) {
  let vx = vel.x * scaleFactor;
  let vy = -vel.y * scaleFactor;
  return p.createVector(vx, vy);
}
