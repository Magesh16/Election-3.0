const express = require('express');
const router = express.Router();
const blockchainInstance = require('../blockchain/blockchain');
const generateAccessToken = require('../middleware/generateToken');
const jwt = require('jsonwebtoken');

const secretKey = 'l338NMmyd4TUBamPILFABGUgr/CF5ueATatPBybS2yeV79BsgqmVWRkA55apniNO7FpgrrLvvVaM/QyOATOVZA==';

let blockchain = new blockchainInstance.BlockChain();
let testBlockChain = new blockchainInstance.BlockChain();

let count=0;
router.get('/test', (req, res) => {
    res.send('Hello World');
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

router.post('/test/vote', (req, res) => {
    const name = req.body.name;
    const VotingId = req.body.votingId;
    const party = req.body.Party;
    if(blockchain.isValidatingVotingId(VotingId, this.blockchain)){
        res.status(500).send("votingId already exists");
    }
    else{
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        count = count+1;
        const blockData = {
            "name" : name,
            "votingId": VotingId,
            "Party": party,
            "count":count,
            "timestamp": timestamp
        }
        
        const block = new blockchainInstance.Block(blockData);
        blockchain.addNewBlock(block);
        blockchain.display();
        res.send("block added");
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
    const VotingId = req.body.votingId;
    const party = req.body.Party;
    if(blockchain.isValidatingVotingId(VotingId, this.blockchain)){
        res.status(500).send("votingId already exists");
    }
    else{
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        count = count+1;
        const blockData = {
            "name" : name,
            "votingId": VotingId,
            "Party": party,
            "count":count,
            "timestamp": timestamp
        }
        
        const block = new blockchainInstance.Block(blockData);
        blockchain.addNewBlock(block);
        blockchain.display();
        res.send("block added");
    }
    
        
})


// 1.Testing blockchain
// 2.Role Authentication
// 3.Kuberneties
// 4.Docker
module.exports = router;    