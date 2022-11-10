import * as crypto from 'crypto';

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

console.log('Public Key: \n', JSON.stringify(keypair.publicKey));
console.log('Private Key: \n', JSON.stringify(keypair.privateKey));