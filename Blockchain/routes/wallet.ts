import * as express from 'express';
const router = express.Router();
import Wallet from '../BlockChainModals/wallet';
import Chains from '../BlockChainModals/multiChain';
import * as fs from 'fs';

var wallets = new Map<string,Wallet>();
function jsonReader(path:string){
  fs.readFile(path,'utf-8',(err,data) => {
    if(err){
      console.log(err);
    }else{
      try {
        const object = JSON.parse(data);
        if(object.length){
          for(const obj of object){
            wallets.set(obj.token,Object.assign(new Wallet(''),obj.wallet));
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  })
}
jsonReader('./Data/wallets.json');

function writetoFile(){
  var object = new Array;
    Chains.instance.chains.forEach((chain,key) => {
      const obj = {
        id:key,
        chain:chain
      }
      object.push(obj);
    })
    fs.writeFile('./Data/chain.json',JSON.stringify(object,null,2),error =>{
      if(error)
        console.log(error);
    })
}

router.post('/NewWallet', async (req:any, res:any) => {
  try {
    const token = req.body.token;
    const EncPass = req.body.password;
    
    if(token && EncPass){
      if (wallets.has(token)) return res.status(400).send('Wallet already exists');
      const wallet = new Wallet(EncPass);
      wallets.set(token,wallet);
      fs.readFile('./Data/wallets.json','utf-8',(err,data) => {
        if(err){
          console.log(err);
        }else{
          try {
            var object = JSON.parse(data);
            object.push({
              token:token,
              wallet:wallet
            })
            fs.writeFile('./Data/wallets.json',JSON.stringify(object,null,2),error =>{
              if(error)
                console.log(error);
            })
          } catch (e) {
            console.log(e);
          }
        }
      })
      res.json(wallet.DHpublicKey);
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
    writetoFile();
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
        const result =ch.show();
        Chains.instance.deleteChain(id);
        writetoFile();
        res.json(result);
      }
      else return res.status(400).send("No data exist");
    } else return res.status(400).send("Data Undefined");
  } catch (err) {
    return res.status(400).send(err);
  }
})

module.exports = router;
