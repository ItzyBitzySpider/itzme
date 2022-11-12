import * as crypto from 'crypto';
import NextCors from 'nextjs-cors';
export default async function decryptIdentity(req, res) {
	await NextCors(req, res, {
		// Options
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	 });
	const blockNo = req.body.blockNo;
    const block = await fetch('http://143.198.209.169:3000/getData?blockNo=' + blockNo);
    const blockData = await block.json();
    const encryptedData = blockData.data.data;
	const privateKey = crypto.createPrivateKey(req.body.privateKey);
	const decryptedData = crypto.privateDecrypt(
		privateKey,
		Buffer.from(encryptedData)
	);
	res.status(200).json(decryptedData.toString());
}
