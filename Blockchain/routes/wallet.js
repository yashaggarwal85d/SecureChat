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
const express = __importStar(require("express"));
const router = express.Router();
const wallet_1 = __importDefault(require("../BlockChainModals/wallet"));
const multiChain_1 = __importDefault(require("../BlockChainModals/multiChain"));
var wallets = new Map();
router.post('/NewWallet', async (req, res) => {
    try {
        const token = req.body.token;
        const EncPass = req.body.password;
        if (token && EncPass) {
            if (wallets.has(token))
                return res.status(400).send('Wallet already exists');
            const wallet = new wallet_1.default(EncPass);
            wallets.set(token, wallet);
            console.log(wallets);
            res.json(wallet.DHpublicKey);
        }
        else
            return res.status(400).send("Undefined data");
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
router.post('/getWallet', async (req, res) => {
    var _a;
    try {
        const token = req.body.token;
        const EncPass = req.body.password;
        if (token && EncPass) {
            if (wallets.has(token)) {
                const keys = (_a = wallets.get(token)) === null || _a === void 0 ? void 0 : _a.getPrivate(EncPass);
                if (keys) {
                    res.json(keys);
                }
                else
                    return res.status(400).send('Password incorrect');
            }
            else {
                return res.status(400).send('wallet doesnt exists');
            }
        }
        else
            return res.status(400).send("Undefined data");
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
router.post('/PushMessages', async (req, res) => {
    var _a;
    try {
        const messagesObj = req.body.messages;
        const id = req.body.id;
        if (id && messagesObj) {
            for (var messageObj of messagesObj) {
                if (wallets.has(messageObj.sender_id)) {
                    (_a = wallets.get(messageObj.sender_id)) === null || _a === void 0 ? void 0 : _a.sendMoney(messageObj, id);
                }
                else
                    return res.status(400).send("Error");
            }
        }
        else
            return res.status(400).send("Data Undefined");
        res.json("success");
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
router.post('/PullMessages', async (req, res) => {
    try {
        const id = req.body.id;
        if (id) {
            const ch = multiChain_1.default.instance.getChainStrict(id);
            if (ch) {
                console.log(multiChain_1.default.instance);
                const result = ch.show();
                multiChain_1.default.instance.deleteChain(id);
                console.log(multiChain_1.default.instance);
                res.json(result);
            }
        }
        else
            return res.status(400).send("Data Undefined");
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
module.exports = router;
