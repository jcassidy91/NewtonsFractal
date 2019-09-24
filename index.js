//Global Variables:
//f is our function, a Polynomial.
//fp, as in f' ("f prime"), is the derivative of our function. Also a Polynomial.
//roots is an array of all of the roots (zeros) of our function.
var f;
var fp;
var roots;

//The value of all points (x,y) on the canvas will be inversly scaled with scalar.
//boundSize makes the prescaled points range from -boundSize to +boundSize.
//canvasScale is how much we want to scale our canvas.
//Leave these alone until the end.
var scalar = 250;
let boundSize = 250;
let canvasScale = 1;

function setup() {
  createCanvas(500,500);
  noStroke();
  colorMode(HSB, 100);

  //Here is where I've set the function to a chosen polynomial whose
  //zeros I already know the value of.
  //z^3 - 1 = 0 is a great function to start with.
  f = new Polynomial([1, 0, 0, -1]);
  fp = f.derivative();
  roots = [
    new Cnum(1,0),
    new Cnum(-0.5, sqrt(3)/2),
    new Cnum(-0.5, -sqrt(3)/2),
  ];

  drawFractal();
}

function drawFractal() {
  push();
    translate(250,250);
    scale(canvasScale);

    //Here we iterate through every point on the canvas (x,y)
    //We inversly scale each point by our scalar
    //Then we apply NewtonsMethods until either a zero is found
    //or until we've tries to find a zero 100 times.
    for (let j = -boundSize; j <= boundSize; j++) {
      for (let i = -boundSize; i <= boundSize; i++) {
        let xx = i/scalar;
        let yy = j/scalar;
        let c = new Cnum(xx,yy);
        let tries = 0;
        while (!foundZero(c, roots) && tries < 100) {
          c = NewtonsMethod(c);
          tries++;
        }
        rect(i,j,1,1);
      }
    }
  pop();
}

//Newtons Method is written x_n+1 = x_n - f(x)/f'(x)
//Here x_n is c because it is a complex number
//We are using the global variables f and fp
function NewtonsMethod(c) {
  return c.minus(f.eval(c).dividedBy(fp.eval(c)));
}

//This function returns true and sets a fill color
//corresponding to the zero that has been found.
//If a zero is not found it will return false and set
//fill color to black.
function foundZero(c, roots) {

  //Resolution lets us control how close a Cnum needs to get
  //in order to say it has reached a root
  //I reccomend you start with a res of 1.0 so that your
  //program takes less time to run while you are testing it
  let res = 0.1;

  let i = 0;
  for (let r of roots) {
    if (c.dist(r) < res) {
      //Since this function should work for any number of zeros
      //the colorMode is set to HSB out of 100 and we just set the
      //hue to a multiple of 100 / (number of roots)
      fill(i * 100 / roots.length,100,100);
      return true;
    }
    i++;
  }
  fill(0);
  return false;
}
