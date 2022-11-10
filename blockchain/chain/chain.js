import * as crypto from 'crypto';

class Block {
    constructor(txNo, timestamp, lastHash, data, type, creator, signature) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.data = data;
        this.type = type;
        this.creator = creator;
        this.signature = signature;
        this.txNo = txNo;
    }

    get hash() {
        const str = JSON.stringify(this);
        const hash = crypto.createHash('SHA256');
        hash.update(str).end();
        return hash.digest('hex');
    }

    get blockNo() {
        return this.txNo;
    }
}

class Chain { 
    static instance = new Chain();

    constructor() {
        const genesis = new Block(0, Date.now(),'','','GENISIS','GENISIS','');
        this.chain = [genesis];
    }

    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data, type, creator, signature) {
        const newBlock = new Block(this.chain.length, Date.now(), this.lastBlock.hash, data, type, creator, signature);
        this.chain.push(newBlock);
        return newBlock.txNo;
    }
  
}

export default class Issuer{
    constructor(issuerId, privateKey){
        this.issuerId = issuerId;
        this.privateKey = privateKey;
    }

    async issueIdentity(data){
        const keypair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            }
        });

        //encrypt data with public key
        const encryptedData = crypto.publicEncrypt(keypair.publicKey, Buffer.from(data));
        
        const signature = crypto.sign('sha256', encryptedData, this.privateKey);
        let result = await Chain.instance.addBlock(encryptedData, 'identity', 'id', signature);
        return keypair.privateKey;
    }   
}

const keypair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    },
});

// const testIssuer = new Issuer('id', keypair.privateKey);
// const result = testIssuer.issueIdentity('test data');
// // console.log(keypair);
// console.log(Chain.instance);

// //verify
// const verify = crypto.createVerify('sha256');
// console.log(Chain.instance.lastBlock.signature);
// verify.update(Chain.instance.lastBlock.data);
// console.log(verify.verify(keypair.publicKey, Chain.instance.lastBlock.signature));