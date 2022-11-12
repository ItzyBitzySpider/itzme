import * as crypto from 'crypto';

export default function handler(req, res) {
	const encryptedData = req.body.encryptedData;
	const privateKey = crypto.createPrivateKey(req.body.privateKey);
	const decryptedData = crypto.privateDecrypt(
		privateKey,
		Buffer.from(encryptedData)
	);
	res.status(200).json(decryptedData.toString());
}
