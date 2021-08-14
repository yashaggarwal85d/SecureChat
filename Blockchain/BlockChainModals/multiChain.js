"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = __importDefault(require("./blockchain"));
class Chains {
    constructor() {
        this.chains = new Map();
        this.chains.set("Default", new blockchain_1.default());
    }
    addChain(id) {
        let NewChain = new blockchain_1.default();
        this.chains.set(id, NewChain);
        return this.chains.get(id);
    }
    getChain(id) {
        if (this.chains.has(id))
            return this.chains.get(id);
        else
            return this.addChain(id);
    }
    getChainStrict(id) {
        if (this.chains.has(id))
            return this.chains.get(id);
        else
            return null;
    }
    deleteChain(id) {
        if (this.chains.has(id))
            this.chains.delete(id);
    }
}
Chains.instance = new Chains();
exports.default = Chains;
