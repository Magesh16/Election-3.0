const express = require('express');
const router = express.Router();
const blockchainInstance = require('../blockchain/blockchain');
const generateAccessToken = require('../middleware/generateToken');
const jwt = require('jsonwebtoken');

const secretKey = 'l338NMmyd4TUBamPILFABGUgr/CF5ueATatPBybS2yeV79BsgqmVWRkA55apniNO7FpgrrLvvVaM/QyOATOVZA==';

let blockchain = new blockchainInstance.BlockChain();
let testBlockChain = new blockchainInstance.BlockChain();

router.get('/test', (req, res) => {
    res.send('Hello World');
})

router.get('/start/blockchain', (req, res) => {
    res.send(blockchain);
    
})

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username === 'admin' && password === 'admin'){
        const payload = {
            "username" : username,
            "password" : password
        }
        const accessToken = generateAccessToken(payload);
        res.status(200).json({ accessToken: accessToken });
    }
    else{
        res.status(500).send("invalid credentials");
    }
})

router.post('/verifyToken', (req, res) => {
    const token = req.body.accessToken;
    jwt.verify(token, secretKey, (err, user) => {
        if(err){
            res.status(500).send("token verification failed");
        }
        else{
            res.status(200).send("token succesfully verified");
        }
    })
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