// Force object
//
// pos : origin of force (in meters)
// dir : force vector (in newton)
//
function Force(p, pos, dir, color) {
  // Dynamical position of vector
  this.pos = p.createVector(pos.x, pos.y);
  this.dir = p.createVector(dir.x, dir.y);
  this.color = color;

  // Initialize force
  this.init = function (posx, posy, dirx, diry) {
    this.pos.set(posx, posy);
    this.dir.set(dirx, diry);
  };

  // Draw Function
  this.draw = function () {
    // Convert pos to pixels and dir to pixels/s
    let cpos = coordConv(p, this.pos);
    let cdir = velConv(p, this.dir);
    // Draw arrow using function
    this.drawArrow(
      cpos,
      cdir.copy().mult((100 * forceNorm) / scaleFactor),
      color
    );
  };

  // draw an arrow for a vector at a given base position
  //
  // Taken from https://p5js.org/reference/#/p5.Vector/magSq
  //
  // base = base position in pixels (must be a p5.vector)
  // vec = vector in pixels (must be a p5.vector)
  //
  this.drawArrow = function (base, vec, myColor) {
    p.push();
    p.stroke(myColor);
    p.strokeWeight(scaleFactor / 100);
    p.fill(myColor);
    p.translate(base.x, base.y);
    p.line(0, 0, vec.x, vec.y);
    p.rotate(vec.heading());
    let arrowSize = scaleFactor / 50;
    p.translate(vec.mag() - arrowSize, 0);
    p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    p.pop();
  };
}
