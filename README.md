# Half-Atwood Machine Simulator
Half-Atwood Machine Simulator for web browser using p5.js

It includes:
- Inertia from pulley (determined by mass and radius);
- Static and kinetic friction on horizontally moving block.

Notes:
- The static friction coefficient must greater or equal to the kinetic friction coefficient. This is hardcoded in the simulator;
- The radius of the pulley must be less than 0.18 m. This is to avoid objects getting out of the canvas.
- Decimals must include a '.'. Comma are not recognized.

To do:
- Include a minimum value for the radius of the pulley. A small radius makes the block disappear and the stopper to behave inappropriately.

Jacques M. Laniel
july 2021
