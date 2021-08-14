import * as crypto from 'crypto';
import Transaction from './transaction';
import Block from './block';

class Chain {
  chain: Block[];

  constructor() {
    this.chain = [
      // Genesis block
      new Block('', new Transaction({}, 'genesis', 'satoshi'))
    ];
  }

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
    const verify = crypto.createVerify('SHA256');
    verify.update(transaction.toString());
    const isValid = verify.verify(senderPublicKey, signature);

    if (isValid) {
      const newBlock = new Block(this.lastBlock.hash, transaction);
      this.chain.push(newBlock);
    }
    else {
      console.log("not valid");
    }
  }
  show(){
    var result = [];
    for(var block of this.chain){
      result.push(block.transaction.amount);
    }
    return result;
  }
}

export default Chain;