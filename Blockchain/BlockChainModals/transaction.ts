class Transaction {
    constructor(
      public amount: object,
      public payer: string, // public key
      public payee: string // public key
    ) { }
  
    toString() {
      return JSON.stringify(this);
    }
}

export default Transaction;