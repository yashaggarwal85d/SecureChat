import { Cipher } from 'js-cipher';
import * as crypto from 'crypto-es';

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

const fixedBlob = '1234567812345678';

export const cypherServer = (password) => {
  const cipher = new Cipher();
  return cipher.encrypt(password, 13);
};

export const cypherChain = (password) => {
  const cipher = new Cipher();
  return cipher.encrypt(password, 10);
};

export const encrypt = (message, key) => {
  const sharedkey = key + fixedBlob;
  const encrypted = crypto.default.AES.encrypt(message, sharedkey).toString();
  console.log(encrypted);
  return encrypted;
};

export const decrypt = (encryptedMessage, key) => {
  const sharedkey = key + fixedBlob;
  return crypto.default.AES.decrypt(
    encryptedMessage.toString(),
    sharedkey
  ).toString(crypto.default.enc.Utf8);
};
