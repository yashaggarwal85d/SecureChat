import Chain from './blockchain';
import * as fs from 'fs';
class Chains {
    public static instance = new Chains();
    chains: Map<string, Chain> = new Map();
    constructor(){
        fs.readFile('./Data/chain.json','utf-8',(err,data) => {
            if(err){
            console.log(err);
            }else{
                try {
                    const object = JSON.parse(data);
                    if(object.length){
                        for(const obj of object){
                            this.chains.set(obj.id,Object.assign(new Chain(),obj.chain));
                        }
                    } else {
                        this.chains.set("Default",new Chain());
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        })
    }
    addChain(id: string) {
        let NewChain = new Chain();
        this.chains.set(id, NewChain);
        return this.chains.get(id);
    }
    getChain(id: string) {
        if (this.chains.has(id))
            return this.chains.get(id);
        else return this.addChain(id);
    }
    getChainStrict(id:string){
        if (this.chains.has(id))
            return this.chains.get(id);
        else return null;
    }
    deleteChain(id:string){
        if (this.chains.has(id))
            this.chains.delete(id);
    }
}

export default Chains;