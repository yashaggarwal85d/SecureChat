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
const crypto = __importStar(require("crypto"));
const transaction_1 = __importDefault(require("./transaction"));
const block_1 = __importDefault(require("./block"));
class Chain {
    constructor() {
        this.chain = [
            // Genesis block
            new block_1.default('', new transaction_1.default({}, 'genesis', 'satoshi'))
        ];
    }
    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(transaction, senderPublicKey, signature) {
        const verify = crypto.createVerify('SHA256');
        verify.update(transaction.toString());
        const isValid = verify.verify(senderPublicKey, signature);
        if (isValid) {
            const newBlock = new block_1.default(this.lastBlock.hash, transaction);
            this.chain.push(newBlock);
        }
        else {
            console.log("not valid");
        }
    }
    show() {
        var result = [];
        for (var block of this.chain) {
            result.push(block.transaction.amount);
        }
        return result;
    }
}
exports.default = Chain;
