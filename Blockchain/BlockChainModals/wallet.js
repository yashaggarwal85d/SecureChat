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
const multiChain_1 = __importDefault(require("./multiChain"));
class Wallet {
    constructor(DHpublicKey, DHprivateKey, EncPass) {
        this.DHpublicKey = DHpublicKey;
        this.DHprivateKey = DHprivateKey;
        const keypair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });
        this.salt = crypto.randomBytes(16).toString('hex');
        this.TokenHash = crypto.pbkdf2Sync(`${EncPass}`, this.salt, 1000, 64, `sha512`).toString(`hex`);
        this.privateKey = keypair.privateKey;
        this.publicKey = keypair.publicKey;
    }
    sendMoney(Obj, id) {
        var _a;
        const transaction = new transaction_1.default(Obj, this.publicKey, this.publicKey);
        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();
        const signature = sign.sign(this.privateKey);
        (_a = multiChain_1.default.instance.getChain(id)) === null || _a === void 0 ? void 0 : _a.addBlock(transaction, this.publicKey, signature);
    }
    getPrivate(password) {
        var hash = crypto.pbkdf2Sync(`${password}`, this.salt, 1000, 64, `sha512`).toString(`hex`);
        if (hash === this.TokenHash) {
            return {
                privateKey: this.DHprivateKey,
                publicKey: this.DHpublicKey,
            };
        }
        else
            return null;
    }
}
exports.default = Wallet;
