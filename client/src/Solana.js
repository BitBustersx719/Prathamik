"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airdrop = void 0;
const web3_js_1 = require("@solana/web3.js");
const airdrop = async (address, amount) => {
    const connection = new web3_js_1.Connection('https://api.devnet.solana.com', 'confirmed');
    const publicKey = new web3_js_1.PublicKey(address);
    const signature = await connection.requestAirdrop(publicKey, amount * web3_js_1.LAMPORTS_PER_SOL);
    await connection.confirmTransaction(signature);
};
exports.airdrop = airdrop;
(0, exports.airdrop)("46UUxD9r4bxKcC2ctyJEAoX43cpaUFi8XQusFHnQBY57", 1);