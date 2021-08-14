import * as crypto from 'crypto';
import Transaction from './transaction';
import Chains from './multiChain';

class Wallet {
  public publicKey: string;
  private privateKey: string;
  private TokenHash: string;
  private salt: string;

  constructor(
    private DHpublicKey: string,
    private DHprivateKey: string,
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
  }

  sendMoney(Obj: object,id:string) {
    const transaction = new Transaction(Obj, this.publicKey, this.publicKey);
    const sign = crypto.createSign('SHA256');
    sign.update(transaction.toString()).end();
    const signature = sign.sign(this.privateKey);
    Chains.instance.getChain(id)?.addBlock(transaction, this.publicKey, signature);
  }

  getPrivate(password:string){
    var hash = crypto.pbkdf2Sync(`${password}`,this.salt, 1000, 64, `sha512`).toString(`hex`); 
    if(hash === this.TokenHash){
      return {
        privateKey:this.DHprivateKey,
        publicKey:this.DHpublicKey,
      }
    }
    else return null;
  }

}

export default Wallet;