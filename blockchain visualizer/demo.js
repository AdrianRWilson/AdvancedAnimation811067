const Blockchain = require('./blockChain');
const Block = require('./block');

let demoCoin = new Blockchain();

demoCoin.addBlock(new Block(1, new Date().toString(), { amount: 4 }));
demoCoin.addBlock(new Block(2, new Date().toString(), { amount: 10 }));

console.log(JSON.stringify(demoCoin, null, 4));
