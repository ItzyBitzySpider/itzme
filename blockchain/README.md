# It'z Me Blockchain

## Repository Structure

There are 3 relevant folders. 

1. [`chain`](chain/)

This contains the core blockchain code. In there you'll find all the declarations of objects, and methods to maintain the integrity of the blockchain. To enable the P2P features of the blockchain, it will import methods from `server`.  

2. [`scripts`](scripts/)

This folder is not as important. It contains a some test scripts for the whole project. 

3. [`server`](server/)

This server contains all the networking code for the blockchain. Since it integrates closely with the main chain code, it does reference several objects and methods in `./chain/`.


## Getting Started

To deploy a server, you will need to create a `config.yml` file in the `server/` directory. An example is shown below. 

```yaml
txNo: 0
privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEv...YuzjY=\n-----END PRIVATE KEY-----\n"
myAddress: "ws://<remote server address>:3000"
peerAddress: "ws://<peer remote address>:3000"
```

The `txNo` and `privateKey` is required to intialise the Genesis block. If this is not the first node you're deploying, you will need to obtain the `privateKey` and `txNo` from another Issuer Node to be an Issuer. Leaving it blank will mean you only have read access to the blockchain.
The `myAddress` and `peerAddress` fields are required for the P2P functionality. If you deploy multiple nodes on the same server, the nodes might fail to communicate as the IP address is used to differentiate between itself and other nodes. If this is the first node, `peerAddress` can be left empty. 

After filling in these pieces of information, you can run the server with 

```yarn run start```

## Server 

This project implements an API for external applications (like you will see in the [`web-demo`](../web-demo/) folder, and a P2P network. The API has 3 functions

- `/admin/createIssuer`

This creates a new Issuer. For the purposes of demostration, this endpoint is made public. Only a priviledged issuer is able to run this function. The return of this function is the blockNo, and the privateKey used to sign blocks pushed to the chain. 

Method: `GET`  
Parameters:
`name`: `String`  
`createIssuer`: `Boolean`

Method: `GET`

- `/admin/issueIdentity`

This function can only be ran by an issuer. For the purposes of demostration, this endpoint is made public. The issuer should posess a privateKey used to sign the block data before broadcasting it to the P2P network. If the block is not signed, other nodes will not accept the push. If it's signed, but the issuer public key is not found in the hisotry of the chain, then it is also invalid. 

Method: `GET`  
Parameters:
`field`: `String` 
`value`: `String`


- `/getData`

This endpoint can be accesses by anyone. It queries the blockchain by blockNo. 

Method: `GET`  
Parameters:
`blockNo`: `int` 
