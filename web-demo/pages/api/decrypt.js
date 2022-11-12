import * as crypto from 'crypto';
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
	await NextCors(req, res, {
		// Options
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	 });
	const encryptedData = req.body.encryptedData;
	const privateKey = crypto.createPrivateKey(req.body.privateKey);
	const decryptedData = crypto.privateDecrypt(
		privateKey,
		Buffer.from(encryptedData)
	);
	res.status(200).json(decryptedData.toString());
}
