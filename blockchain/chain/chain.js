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

export class Chain { 
    static instance = new Chain();

    constructor() {
        const genesis = new Block(0, Date.now(),null,{
            "issuerName": "Genesis",
            "issuerId": 1,
            "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3/35Km+0qPQFsvIqLDDw\nQy8VoawHvRByuIXGhgUJig7LEelzsBfsDXq0wkU6BDtZ88FnnQXNflWDcUliIpS1\n1TrNBeTDmzPWii3xKc0N5U9HOquPtfVXhNwur9Ot6aPZ8yLOhx75TSpab/BfMye6\nEKBuUFbMIEhXymGtEojld6HOjGpEidDKnLgPu64/qSm1QgLU7Wj5E1Ilhdx7HSCU\nPFgIOvNlbmq9hBQyq2gSCT9gfd9ihOtzjz3/cDZtYOU99B16ku+sUowjmQnKqmy9\naXjWoRwelWtyzRpNZ+igvzAwYoBEYHFc0eWH7VOHvsmOwZTybCgylmnjHwwbmMPo\nOQIDAQAB\n-----END PUBLIC KEY-----\n",
        },'ISSUER','GENISIS','');
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

    find(blockNo) {
        return this.chain[blockNo];
    }  
}

export class Issuer{
    constructor(txNo, privateKey){
        const blockData = Chain.instance.find(txNo);
        this.issuerId = blockData.data.issuerId;
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
        let blockNo = await Chain.instance.addBlock(encryptedData, 'IDENTITY', this.issuerId, signature);
        return [keypair.privateKey, blockNo];
    }   

    async createIssuer(data){
        const keypair = crypto.generateKeyPairSync('dsa', {
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
        const blockData = {...data, publicKey: keypair.publicKey};
        const signature = crypto.sign('sha256', blockData, this.privateKey);
        console.log(blockData);
        let blockNo = await Chain.instance.addBlock(blockData, 'ISSUER', this.issuerId, signature);
        return [keypair.privateKey, blockNo];
    }
}


// const testIssuer = new Issuer('id', keypair.privateKey);
// const result = testIssuer.issueIdentity('test data');
// // console.log(keypair);
// console.log(Chain.instance.find(0));

// //verify
// const verify = crypto.createVerify('sha256');
// console.log(Chain.instance.lastBlock.signature);
// verify.update(Chain.instance.lastBlock.data);
// console.log(verify.verify(keypair.publicKey, Chain.instance.lastBlock.signature));