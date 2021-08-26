import * as crypto from 'crypto';
import Transaction from './transaction';
import Chains from './multiChain';

function KeyGen(base:any, modulo:any, exponent:any) {
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
class Wallet {
  public publicKey: string;
  private privateKey: string;
  private TokenHash: string;
  private salt: string;
  private DHprivateKey:Number;
  public DHpublicKey:Number;

  constructor(
    EncPass: string, 
  ) {
    const keypair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });
    this.salt = crypto.randomBytes(16).toString('hex');
    this.TokenHash = crypto.pbkdf2Sync(`${EncPass}`, this.salt,1000, 64, `sha512`).toString(`hex`); 
    this.privateKey = keypair.privateKey;
    this.publicKey = keypair.publicKey;
    this.DHprivateKey = Math.floor(
      Math.random() * (9999999999 - 99999999) + 9999999999
    );
    var base=1000151;
    var modulo=2000303;
    this.DHpublicKey=KeyGen(base,modulo,this.DHprivateKey)
  }

  sendMoney(Obj: object,id:string) {
    const transaction = new Transaction(Obj, this.publicKey, this.publicKey);
    const sign = crypto.createSign('SHA256');
    sign.update(transaction.toString()).end();
    const signature = sign.sign(this.privateKey);
    Chains.instance.getChain(id)?.addBlock(transaction, this.publicKey, signature);
  }

  verify(password:string){
    var hash = crypto.pbkdf2Sync(`${password}`,this.salt, 1000, 64, `sha512`).toString(`hex`); 
    if(hash === this.TokenHash){
      return true
    }
    else return false;
  }

  getPrivate(password:string){
    var hash = crypto.pbkdf2Sync(`${password}`,this.salt, 1000, 64, `sha512`).toString(`hex`); 
    if(hash === this.TokenHash){
      return {
        privateKey:this.DHprivateKey,
        publicKey:this.DHpublicKey,
      }
    }
  }
}

export default Wallet;