const express = require('express');
const router = express.Router();
const blockchainInstance = require('../blockchain/blockchain');

let blockchain = new blockchainInstance.BlockChain();

router.get('/test', (req, res) => {
    res.send('Hello World');
})

router.get('/start/blockchain', (req, res) => {
    res.send(blockchain);
    
})

router.post('/insert/block', (req, res) => {
    const name = req.body.name;
    const count = req.body.count;
    const blockData = {
        "name" : name,
        "count" : count
    }
    const block = new blockchainInstance.Block(blockData);
    blockchain.addNewBlock(block);
    res.send("block added");
})

// 1.Testing blockchain
// 2.Role Authentication
// 3.Kuberneties
// 4.Docker


module.exports = router;