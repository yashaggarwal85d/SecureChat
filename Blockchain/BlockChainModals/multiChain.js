"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = __importDefault(require("./blockchain"));
const fs = __importStar(require("fs"));
class Chains {
    constructor() {
        this.chains = new Map();
        fs.readFile('./Data/chain.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                try {
                    const object = JSON.parse(data);
                    if (object.length) {
                        for (const obj of object) {
                            this.chains.set(obj.id, Object.assign(new blockchain_1.default(), obj.chain));
                        }
                    }
                    else {
                        this.chains.set("Default", new blockchain_1.default());
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
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
