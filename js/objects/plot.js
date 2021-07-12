// plotSketch
//
// Jacques M. Laniel, July 2021
//
function Plot(p, xShift, yShift, width, height, xlabel, ylabel, title) {
  let plot = [];
  let pointSize = 4;
  this.xShift = xShift;
  this.yShift = yShift;
  this.width = width;
  this.height = height;
  this.xlabel = xlabel;
  this.ylabel = ylabel;
  this.title = title;
  this.points = [];

  let r0 = p.createVector(
    (1 - tableFracWidth) * sceneWidth,
    tableFracHeight * sceneHeight
  );

  // Create the plot
  plot = new GPlot(p);

  //Set points size
  plot.setPointSize(pointSize);
  // Activate point labels
  plot.activatePointLabels();

  // Setup title
  plot.setTitleText(this.title);
  plot.title.fontColor = "white";
  plot.title.fontSize = fontSizeRegular;
  plot.title.fontName = fontName;
  // Setup x-axis
  plot.xAxis.setAxisLabelText(this.xlabel);
  plot.xAxis.fontColor = "white";
  plot.xAxis.lab.fontColor = "white";
  plot.xAxis.lab.fontSize = fontSizeSmall;
  plot.xAxis.lab.fontName = fontName;
  plot.xAxis.lineColor = "white";
  // Setup y-axis
  plot.yAxis.setAxisLabelText(this.ylabel);
  plot.yAxis.fontColor = "white";
  plot.yAxis.lineColor = "white";
  plot.yAxis.lab.fontSize = fontSizeSmall;
  plot.yAxis.lab.fontName = fontName;
  plot.yAxis.lab.fontColor = "white";
  // Upper left corner of plot
  let cr0 = coordConv(p, r0);
  let x0 = cr0.x + qtyConv(this.xShift);
  let y0 = cr0.y + qtyConv(this.yShift);
  // Width and Height of plot
  let cwidth = qtyConv(this.width);
  let cheight = qtyConv(this.height);

  // Initialize function
  this.init = function () {
    this.points = [];
  };

  // Draw Function
  this.draw = function () {
    // Set plot outer dimension to fit canvas
    plot.setOuterDim(cwidth, cheight);
    // Set position
    plot.setPos(x0, y0);
    // Set the points
    plot.setPoints(this.points);
    // Draw plot
    plot.beginDraw();
    plot.drawBox();
    plot.drawXAxis();
    plot.drawYAxis();
    plot.drawTitle();
    plot.drawGridLines(GPlot.BOTH);
    plot.drawLabels();
    plot.drawPoints();
    plot.endDraw();
  };
}
