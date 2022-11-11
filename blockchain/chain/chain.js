import * as crypto from 'crypto';
import { broadcast } from '../server/p2p.js';

let issuerCache = {};

export class Block {
	constructor(txNo, timestamp, lastHash, data, type, issuerId, signature) {
		this.timestamp = timestamp;
		this.lastHash = lastHash;
		this.data = data;
		this.type = type;
		this.issuerId = issuerId;
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
		const genesis = new Block(
			0,
			Date.now(),
			null,
			{
				issuerName: 'Genesis',
				issuerId: 0,
				createIssuers: true,
				publicKey:
					'-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3/35Km+0qPQFsvIqLDDw\nQy8VoawHvRByuIXGhgUJig7LEelzsBfsDXq0wkU6BDtZ88FnnQXNflWDcUliIpS1\n1TrNBeTDmzPWii3xKc0N5U9HOquPtfVXhNwur9Ot6aPZ8yLOhx75TSpab/BfMye6\nEKBuUFbMIEhXymGtEojld6HOjGpEidDKnLgPu64/qSm1QgLU7Wj5E1Ilhdx7HSCU\nPFgIOvNlbmq9hBQyq2gSCT9gfd9ihOtzjz3/cDZtYOU99B16ku+sUowjmQnKqmy9\naXjWoRwelWtyzRpNZ+igvzAwYoBEYHFc0eWH7VOHvsmOwZTybCgylmnjHwwbmMPo\nOQIDAQAB\n-----END PUBLIC KEY-----\n',
			},
			'ISSUER',
			null,
			null
		);
		issuerCache[genesis.data.issuerId] = genesis.data.publicKey;
		this.chain = [genesis];
	}

	get lastBlock() {
		return this.chain[this.chain.length - 1];
	}

	verify(issuerId, signature, data) {
		const issuerKey = issuerCache[issuerId];
		if (!issuerKey) {
			return false;
		}
		return crypto.verify('sha256', data, issuerKey, signature);
	}

	addBlock(data, type, issuerId, signature) {
		// invalid signature
		if (!this.verify(issuerId, signature, type === "ISSUER" ? JSON.stringify(data) : data.toString('hex'))) {
			return -1;
		}

        // unpriviledged issuer
        if (type === 'ISSUER' && !this.verifyPerms(issuerId)) {
            return -2;
        }

		const newBlock = new Block(
			this.chain.length,
			Date.now(),
			this.lastBlock.hash,
			data,
			type,
			issuerId,
			signature
		);
		if (type === 'ISSUER') {
			issuerCache[newBlock.data.issuerId] = newBlock.data.publicKey;
		}
		this.chain.push(newBlock);
		broadcast("NEW BLOCK", { 
			data: newBlock.data.toString('hex'),
			previousHash: newBlock.previousHash,
			hash: newBlock.hash,
			timestamp: newBlock.timestamp,
			type: newBlock.type,
			signature: newBlock.signature.toString('hex'),
			issuerId: newBlock.issuerId,
			txNo: newBlock.txNo
		 });
		return newBlock.txNo;
	}

	find(blockNo) {
		if (blockNo < 0 || blockNo >= this.chain.length) {
			return null;
		}
		return this.chain[blockNo];
	}

	isValid() {
		for (let i = 2; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const lastBlock = this.chain[i - 1];
			if (currentBlock.lastHash !== lastBlock.hash) {
				return false;
			}
		}
		return true;
	}

	getIssuers() {
		let issuers = [];
		for (let i = 0; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			if (currentBlock.type === 'ISSUER') {
				issuers.push(currentBlock);
			}
		}
		return issuers;
	}
    
    verifyPerms(issuerId) {
        const issuers = this.getIssuers();
        for (let i = 0; i < issuers.length; i++) {
            const issuer = issuers[i];
            if (issuer.data.issuerId === issuerId) {
                return issuer.data.createIssuers;
            }
        }
        return false;
    }
}

export class Issuer {
	constructor(txNo, privateKey) {
		const blockData = Chain.instance.find(txNo);
		this.issuerId = blockData.data.issuerId;
		this.privateKey = privateKey;
	}

	async issueIdentity(data) {
		const userKeypair = crypto.generateKeyPairSync('rsa', {
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

		//encrypt data with public key
		const encryptedData = crypto.publicEncrypt(
			userKeypair.publicKey,
			JSON.stringify(data)
		);

		const signature = crypto.sign('sha256', encryptedData.toString('hex'), this.privateKey);
		let blockNo = await Chain.instance.addBlock(
			encryptedData,
			'IDENTITY',
			this.issuerId,
			signature
		);
        if (blockNo === -1) {
            return [null, -1];
        }
		return [userKeypair.privateKey, blockNo];
	}

	async createIssuer(issuerName, createIssuer) {
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
		const blockData = {
			issuerName: issuerName,
			issuerId: Chain.instance.getIssuers().length,
			createIssuer: createIssuer,
			publicKey: keypair.publicKey,
		};
		const signature = crypto.sign('sha256',JSON.stringify(blockData), this.privateKey);
		let blockNo = await Chain.instance.addBlock(
			blockData,
			'ISSUER',
			this.issuerId,
			signature
		);
        if(blockNo < 0){
            return [null, blockNo];
        }
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
