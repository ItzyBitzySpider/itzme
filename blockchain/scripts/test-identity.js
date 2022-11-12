import fetch from 'cross-fetch';
import * as crypto from 'crypto';

const url = "http://localhost:3000"
const result = await fetch(url+'/admin/issueIdentity?field=Name&value=Shin+Yuna')
const json = await result.json()
console.log(json.privateKey)
console.log(json.blockNo)

const privateKey = crypto.createPrivateKey(json.privateKey)
const blockNo = json.blockNo

// get data
const decrypt = await fetch(url+'/getData?blockNo='+blockNo)
const decryptJson = await decrypt.json()
const encryptedData = decryptJson.data.data
const decryptedData = crypto.privateDecrypt(privateKey, Buffer.from(encryptedData))
console.log(Buffer.from(encryptedData))
console.log(decryptedData.toString('utf8'))