import * as crypto from 'crypto';
import express from 'express';
import {Issuer, Chain} from '../chain/chain.js';

let issuer;

//express server
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

// Issuer Endpoints
app.get('/createIssuer', (req, res) => {
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

	issuer = new Issuer(keypair.publicKey, keypair.privateKey);

	res.send('Issuer ' + JSON.stringify(issuer));
});

app.get('/createIdentity', async (req, res) => {
	if(!issuer){
		res.send('No Issuer');
		return;
	}
    const result = await issuer.issueIdentity('test');
    res.send({'message':'Identity issued. Please save your private key.', 'privateKey': result[0], 'blockNo': result[1]});
});

// General Endpoints
app.get('/getData', async (req, res) => {
	const result = await Chain.instance.find(req.query.blockNo);
	console.log(result);
	console.log('hi')
	res.send(result);
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
