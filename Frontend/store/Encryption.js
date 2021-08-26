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
  return result.toString();
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

const fitto16 = (s) => {
  return s.substring(0, 16);
};

export const encryptGroup = (message, key) => {
  const sharedkey = fitto16(key + fixedBlob);
  const encrypted = crypto.default.AES.encrypt(message, sharedkey).toString();
  return encrypted;
};

export const decryptGroup = (encryptedMessage, key) => {
  const sharedkey = fitto16(key + fixedBlob);
  return crypto.default.AES.decrypt(
    encryptedMessage.toString(),
    sharedkey
  ).toString(crypto.default.enc.Utf8);
};

export const encrypt = (message, key, pk) => {
  var modulo = 2000303;
  const sharedkey = fitto16(KeyGen(key, modulo, pk).toString() + fixedBlob);
  const encrypted = crypto.default.AES.encrypt(
    message.toString(),
    sharedkey.toString()
  ).toString();
  return encrypted;
};

export const decrypt = (encryptedMessage, key, pk) => {
  var modulo = 2000303;
  const sharedkey = fitto16(KeyGen(key, modulo, pk).toString() + fixedBlob);
  const decrypted = crypto.default.AES.decrypt(
    encryptedMessage.toString(),
    sharedkey.toString()
  ).toString(crypto.default.enc.Utf8);
  return decrypted;
};
