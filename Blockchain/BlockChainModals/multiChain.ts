import Chain from './blockchain';

class Chains {
    public static instance = new Chains();
    chains: Map<string, Chain> = new Map();
    constructor(){
        this.chains.set("Default",new Chain());
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