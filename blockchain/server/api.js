import * as crypto from 'crypto';
import express from 'express';
import {Issuer, Chain} from '../chain/chain.js';

//read data from config.yml
import * as fs from 'fs';
import * as yaml from 'js-yaml';
const config = yaml.load(fs.readFileSync('./server/config.yml', 'utf8'));
const issuer = new Issuer(config.txNo, crypto.createPrivateKey(config.privateKey));

//express server
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

// Issuer Endpoints
app.get('/issueIdentity', async (req, res) => {
	if(!issuer){
		res.send({'message':'No Issuer'});
		return;
	}
    const result = await issuer.issueIdentity({'test':'data'});
    res.send({'message':'Identity issued. Please save your private key.', 'privateKey': result[0], 'blockNo': result[1]});
});

// General Endpoints
app.get('/getData', async (req, res) => {
	const result = await Chain.instance.find(req.query.blockNo);
	console.log('/getData Endpoint', result);
	console.log(typeof(result));
	if(result === null){
		res.send({'message':'Block not found'});
		return;
	}
	res.send(result);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
