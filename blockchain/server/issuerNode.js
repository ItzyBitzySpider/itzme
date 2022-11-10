import * as crypto from 'crypto';
import express from 'express';
import './chain.js';

let issuer;

//express server
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

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

app.get('/requestIdentity', (req, res) => {
    const key = issuer.issueIdentity();
    res.send('Identity issued. Please save your private key.' + JSON.stringify(key));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
