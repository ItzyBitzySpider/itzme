import * as crypto from 'crypto';
import express from 'express';
import { Issuer, Chain } from '../chain/chain.js';
//import cors
import cors from 'cors';

//read data from config.yml
import * as fs from 'fs';
import * as yaml from 'js-yaml';
const config = yaml.load(fs.readFileSync('./server/config.yml', 'utf8'));
const issuer = new Issuer(
	config.txNo,
	crypto.createPrivateKey(config.privateKey)
);

//express server
const app = express();
app.use(cors());

app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

// Issuer Endpoints
app.get('/admin/issueIdentity', async (req, res) => {
	if (!issuer) {
		res.json({ message: 'No Issuer' });
		return;
	}
	const field = req.query.field;
	const value = req.query.value;
	const result = await issuer.issueIdentity({ field: field, value: value });
	if (result[1] === -1) {
		res.json({ message: 'Error. Signature Invalid.' });
		return;
	}
	if (result[1] === -2) {
		res.json({ message: 'Error. Unpriviledged Issuer.' });
		return;
	}
	if (result[1] === -3) {
		res.json({ message: 'Error. Invalid block.' });
		return;
	}
	res.json({
		message: 'Identity issued. Please save your private key.',
		privateKey: result[0],
		blockNo: result[1],
	});
});

app.get('/admin/createIssuer', async (req, res) => {
	const name = req.query.name;
	const createIssuer = req.query.createIssuer === 'true';
	if (!issuer) {
		res.json({ message: 'No Issuer' });
		return;
	}
	const result = await issuer.createIssuer(name, createIssuer);
	if (result[1] === -1) {
		res.json({ message: 'Error. Signature Invalid.' });
		return;
	}
	if (result[1] === -2) {
		res.json({ message: 'Error. No permission to create Issuer.' });
		return;
	}
	res.json({
		message: 'Issuer created. Please save your private key.',
		privateKey: result[0],
		blockNo: result[1],
	});
});

// General Endpoints
app.get('/getData', async (req, res) => {
	const result = await Chain.instance.find(req.query.blockNo);
	console.log('/getData Endpoint', result);
	console.log(typeof result);
	if (result === null) {
		res.json({ message: 'Block not found' });
		return;
	}
	res.json(result);
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

export { app };
