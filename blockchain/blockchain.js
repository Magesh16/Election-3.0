const crypto = require('crypto'); 
const voteSchema = require ('../models/voteSchema');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.secretKey;
class Block { 
    constructor(data, prevHash = "") {
        this.timestamp = Date.now();
        this.date = new Date();
        this.data = data;
        this.prevHash = prevHash; 
        this.hash = this.computeHash();
    }  
    computeHash() { 
        let strBlock = this.prevHash + this.timestamp +JSON.stringify(this.data) + this.date;
        return crypto.createHash("sha256").update(strBlock).digest("hex");
    }

}

class BlockChain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()]
    }
    startGenesisBlock() {
        return new Block({})
    }
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1]
    }
    isValidatingVotingId (votingId){
        
        for(let i=0;i<this.blockchain.length;i++){
            if(this.blockchain[i].data.votingId === votingId){
                return true;
            }
        }
        return false;
    }
    addNewBlock(newBlock) { // Add a new block
        newBlock.prevHash = this.obtainLatestBlock().hash; 
        newBlock.hash = newBlock.computeHash() ;
        this.blockchain.push(newBlock);
    }
    checkChainValidity() { 
        for(let i = 1; i < this.blockchain.length; i++) { 
            const currBlock = this.blockchain[i]
            const prevBlock = this.blockchain[i -1]
            
            
            if(currBlock.hash !== currBlock.computeHash()) { 
                return false
            }
          
            
            if(currBlock.prevHash !== prevBlock.hash) {                 
              return false
            }
            
        }
        return true;
    }

    display(){
        for(let i = 0; i < this.blockchain.length; i++){
            console.log(this.blockchain[i].data);
        }
    }
    syncDatabase = async () => {
        const dbData = await voteSchema.find();
        console.log(dbData);
        if(dbData.length >0){
            let decryptedData = dbData[0].blockchain.blockchain;
            jwt.verify(decryptedData, secretKey, (err, user) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(user);
                    for(let i=0;i<user.length;i++){
                        let block = new Block(user[i]);
                        this.blockchain.addNewBlock(block);
                        console.log(JSON.parse(JSON.stringify(block)));
                    }
                }
            }
            );
    }
}


// let a = new Block({name:"Magesh",count:"1000"});
// let b = new Block({name:"kishore",count:"700"});
// let c = new Block({name:"Buji",count:"900"});
// let d = new Block({name:"Avi",count:"676"});

 
// let chain = new BlockChain() // Init our chain
// chain.addNewBlock(a); 
// chain.addNewBlock(b); 
// chain.addNewBlock(c);
// chain.addNewBlock(d);
// console.log(chain);
// chain.display();
// console.log("Validity: " + chain.checkChainValidity())
}
module.exports = { Block, BlockChain };