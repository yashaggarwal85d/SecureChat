import * as express from 'express';
import * as crypto from 'crypto';
const router = express.Router();
import Wallet from '../BlockChainModals/wallet';
import Chains from '../BlockChainModals/multiChain';

var wallets = new Map<string,Wallet>();

router.post('/NewWallet', async (req:any, res:any) => {
  try {
    const token = req.body.token;
    const EncPass = req.body.password;
    
    if(token && EncPass){
      const user = crypto.createECDH('secp256k1');
      user.generateKeys();
      const publicKey = user.getPublicKey().toString('base64');
      const privateKey = user.getPrivateKey().toString('base64');
    
      if (wallets.has(token)) return res.status(400).send('Wallet already exists');
      const wallet = new Wallet(publicKey,privateKey,EncPass);
      wallets.set(token,wallet);
      console.log(wallets);
      res.json("Success");
    }
    else return res.status(400).send("Undefined data");
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post('/getWallet', async (req:any, res:any) => {
  try {
    const token = req.body.token;
    const EncPass = req.body.password;
    if(token && EncPass){
      if (wallets.has(token)) {
        const keys = wallets.get(token)?.getPrivate(EncPass);
        if (keys) {
          res.json(keys);
        } else return res.status(400).send('Password incorrect');
      } else {
        return res.status(400).send('wallet doesnt exists');
      }
    } 
    else return res.status(400).send("Undefined data");
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post('/PushMessages',async(req:any, res:any) => {
  try {
    const messagesObj = req.body.messages;
    const id = req.body.id;
    if(id && messagesObj){
      for(var messageObj of messagesObj){
        if (wallets.has(messageObj.sender_id)) {
          wallets.get(messageObj.sender_id)?.sendMoney(messageObj,id);
        }
        else return res.status(400).send("Error");
      }
    } else return res.status(400).send("Data Undefined");
    res.json("success");
  } catch (err) {
    return res.status(400).send(err);
  }
})

router.post('/PullMessages',async(req:any, res:any) => {
  try {
    const id = req.body.id;
    if(id){
      const ch = Chains.instance.getChainStrict(id);
      if(ch){
        console.log(Chains.instance);
        const result =ch.show();
        Chains.instance.deleteChain(id);
        console.log(Chains.instance);
        res.json(result);
      }
    } else return res.status(400).send("Data Undefined");
  } catch (err) {
    return res.status(400).send(err);
  }
})

module.exports = router;
