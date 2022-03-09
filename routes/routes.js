const express = require('express');
const router = express.Router();
const blockchainInstance = require('../blockchain/blockchain');
const block = require('../blockchain/block');

let blockchain;

router.get('/test', (req, res) => {
    res.send('Hello World');
})

router.get('/start/blockchain', (req, res) => {
    blockchain = new blockchainInstance.BlockChain();
    res.send("blockchain created");
})

router.post('/insert/block', (req, res) => {
    const name = req.body.name;
    const count = req.body.count;
    const blockData = {
        "name" : name,
        "count" : count
    }
    blockchain.addNewBlock(blockData);
    res.send("block added");
})

module.exports = router;