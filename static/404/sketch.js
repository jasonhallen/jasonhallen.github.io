let source, overlay;
let tilesX, tilesY, tileW, tileY, sx, sy, sw, sh, dx, dy, dw, dh, wave, x, y, x_component, y_component;
let freeze_status = false;
let pageNotFound;

function setup() {
  var canvas = createCanvas(document.getElementById("page-content").offsetWidth,600);
  canvas.parent("page-content");
  // background(232, 170, 26);
  pixelDensity(1);
  background("white");
  if (window.innerWidth > 600) {
    source = createGraphics(document.getElementById("page-content").offsetWidth,600);
  } else {
    source = createGraphics(window.innerWidth,480);
  }
  // source.background(232, 170, 26);
  source.fill("black");
  source.textSize(document.getElementById("page-content").offsetWidth * 0.5);
  source.push();
  if (window.innerWidth > 500) {
    source.translate(source.width/2,source.height/2);
  } else {
    source.translate(source.width/2 - 50,source.height/2);
  }
  source.textAlign(CENTER,CENTER);
  source.textFont("Gill Sans");
  source.textStyle(NORMAL);
  source.text("404",0,-70);
  // source.textSize(120);
  // source.text("COLLECTIVE",0,90);
  source.pop();
  source.stroke("white");
  source.strokeWeight(2);
  for (x = 0; x < source.width ; x = x + source.width/100) {
    source.line(x,0,x,source.height);
  }
  
  tilesX = 100;
  tilesY = 60;

  tileW = int(source.width/tilesX);
  tileH = int(source.height/tilesY);
  
  frameRate(60);
  // createLoop({duration:44,gif:true,open:true});

  pageNotFound = document.createElement("span");
  pageNotFound.innerHTML = "<h3>PAGE NOT FOUND</h3";
  pageNotFound.setAttribute("id", "page-not-found");
  // pageNotFound.setAttribute("style", "position:absolute;");
  document.getElementById("defaultCanvas0").parentNode.insertBefore(pageNotFound, document.getElementById("defaultCanvas0").nextSibling)

  overlay = createGraphics(500, 100);
  overlay.background("white");
  overlay.fill("black");
  overlay.textSize(40);
  overlay.textFont("Josefin Slab");
  overlay.textStyle(BOLD);
  overlay.text("PAGE NOT FOUND",10,60);
  
}

function draw() {
  if (freeze_status === false) {
    // background(232, 170, 26);
    background("white");
    // image(source,0,0);

    for (x = 0; x < tilesX; x++) {
      for (y = 0; y < tilesY; y++) {

        // WARP
        // wave = int(Math.abs(Math.sin(frameCount * 0.03 - ( 0.04*x+0.04*y ) * 0.07)) * 2800);

        x_component = Math.cos((frameCount + 1860)/2*0.005);
        y_component = Math.sin((frameCount + 1860)/2*0.003);
        wave = int(Math.sin((frameCount + 1860)/2*0.35 - (x_component*x/3 - y_component*y/3)) * (x_component*100));
        wave2 = int(Math.sin((frameCount + 1860)/2*0.5 - (x_component*x/3 - y_component*y/3)) * (y_component*150));
        
        // SOURCE
        sx = x*tileW;
        sy = y*tileH + wave;
        sw = tileW;
        sh = tileH;


        // DESTINATION
        dx = x*tileW + y_component*wave2;
        dy = y*tileH;
        dw = tileW;
        dh = tileH;

        // copy(source, sx, sy, sw, sh, dx, dy, dw, dh);
        drawingContext.drawImage(source.elt, sx, sy, sw, sh, dx, dy, dw, dh);
      }
    }
  }
  // image(overlay, 100, 340);

}

function windowResized() {
  resizeCanvas(document.getElementById("page-content").offsetWidth, 400);
  source.width = document.getElementById("page-content").offsetWidth;
  source.background("white");
  source.fill("black");
  source.textSize(document.getElementById("page-content").offsetWidth * 0.5);
  source.push();
  source.translate(source.width/2,source.height/2);
  source.textAlign(CENTER,CENTER);
  source.textFont("Gill Sans");
  source.textStyle(NORMAL);
  source.text("404",0,-70);
  // source.textSize(120);
  // source.text("COLLECTIVE",0,90);
  source.pop();
  source.stroke("white");
  source.strokeWeight(2);
  for (x = 0; x < source.width ; x = x + source.width/100) {
    source.line(x,0,x,source.height);
  }
}

// function mousePressed() {
//   if (freeze_status === false) {
//     freeze_status = true;
//   } else {
//     freeze_status = false;
//   }
// }