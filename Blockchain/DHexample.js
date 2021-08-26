function KeyGen(base, modulo, exponent) {
  var result = 1;
  while (exponent > 0) {
    if (exponent % 2 == 1) {
      result = (result * base) % modulo;
    }
    base = (base * base) % modulo;
    exponent = exponent >>> 1;
  }
  return result;
}

var base = 1000151;
var modulo = 2000303;
var aliceprivatekey = 928348534988985945;
var alicepublickey = KeyGen(base, modulo, aliceprivatekey);
var bobprivatekey = 4853495485349509090;
var bobpublickey = KeyGen(base, modulo, bobprivatekey);
var alicesharedkey = KeyGen(bobpublickey, modulo, aliceprivatekey);
var bobsharedkey = KeyGen(alicepublickey, modulo, bobprivatekey);
console.log(bobpublickey.toString() + '9999999999999999');
