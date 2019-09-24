//This class represents Complex numbers of the form a + bi
//We store these as two properties a and b
//We need to create arithmetic functions so that we can use
//Cnums in calculations

//I have chosen to keep Cnums immutable, meaning that performing
//an operation creates and returns an entirely new Cnum, rather
//than modifying the existing Cnum.
//I recommend doing it this way, if you want it is a resonable idea
//to also make alternative functions that do mutate the Cnum
//Ex:
//  plus(other) returns a new Cnum(this.a + other.a, this.b + other.b)
//  add(other) increases this.a by other.a and this.b by other.b
class Cnum {
  constructor(a,b = 0) {
    this.a = a;
    this.b = b;
  }

  plus(other) {
    return new Cnum(this.a + other.a, this.b + other.b);
  }

  minus(other) {
    return new Cnum(this.a - other.a, this.b - other.b);
  }

  //For multiplication you can derive the formula by writing out
  //and expanding (a + bi) * (c + di) by hand
  times(other) {
    let {a,b} = this;
    let c = other.a;
    let d = other.b;

    return new Cnum(a*c - b*d, a*d + b*c);
  }

  pow(n) {
    let result = new Cnum(1,0);
    while(n > 0) {
      result = result.times(this);
      n--;
    }
    return result;
  }

  //Division uses a neat trick to derive. Before you can divide out (a + bi)/(c + di)
  //by hand, you'll want to multiply the numerator and denominator by
  //the complex conjugate (c - di)
  //You can get the formula I used by expanding and simplifying this equation by hand:
  //  (a + bi)   (c - di)
  //  -------- * ---------
  //  (c + di)   (c - di)
  dividedBy(other) {
    let {a,b} = this;
    let c = other.a;
    let d = other.b;

    return new Cnum( (a*c + b*d)/(c*c + d*d), (b*c - a*d)/(c*c + d*d) );
  }

  //Here we use the distance formula c = sqrt(x^2 + y^2) to find the
  //distance formula between two Cnums
  //Here x is the horizontal distance between the two Cnums
  //And y is the vertical distance
  //We use this when finguring out if a Cnum is close enough to a
  //root to say we have found one.
  dist(other) {
    return sqrt(pow(this.a - other.a, 2) + pow(this.b - other.b, 2));
  }
}
