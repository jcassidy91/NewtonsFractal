class Polynomial {
  constructor(coeffs = [0]) {

    this.coes = coeffs;
  }

  derivative() {
    let dcoes = [];
    let coes = this.coes.slice(0);
    coes.pop();

    for (let n = 1; n < this.coes.length; n++) {
      dcoes.push(coes.pop() * n);
    }
    return new Polynomial(dcoes.reverse());
  }

  eval(cnum) {
    let ans = new Cnum(0,0);
    let n = this.coes.length - 1;
    this.coes.forEach((c) => {
      let val = cnum.pow(n).times(new Cnum(c,0));
      ans = ans.plus(val);
      n--;
    })
    return ans;
  }
}
