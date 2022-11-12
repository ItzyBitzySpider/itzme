# It'z Me Blockchain

## Repository Structure

There are 3 relevant folders. 

1. [`chain`](chain/)

This contains the core blockchain code. In there you'll find all the declarations of objects, and methods to maintain the integrity of the blockchain. To enable the P2P features of the blockchain, it will import methods from `./server/`.  

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

```
yarn run start
```

## Chain

The permissioned blockchain functions on the basis of trusted actors. To ensure only trusted issuers can write to the blockchain, all blocks have to be signed by the issuer. The public key to verify the signature exist on the blockchain during the creation of the issuer. 

The structure of each block is as follows:
```
{
    timestamp: int
    lastHash: String
    data: any
    type: "IDENTITY" || "ISSUER"
    issuerId: int
    signature: Buffer
    txNo: int
}
```

#### `timestamp`

This is when the block is created. Not when it was pushed. 

#### `lastHash`

Hash of the previous block. 

#### `data`

Depending on the type of block, this is either a Buffer (array of decimal values) representing the encrypted identity of a user, or a JSON with information pertaining to an issuer. 

#### `type`

There are only 2 possible values for this field. `IDENTITY` or `ISSUER`. An `IDENTITY` block is one created when an Identity is issued to a user, whereas an `ISSUER` block is added when a new issuer is created.

#### `issuerId`

This represents the block location of the Issuer who created the block. Using this, you can query the blockchain for the public key corresponding to the issuer. This is useful to verify the signature of the block. 

#### `signature`

Buffer data type. This signature helps to verify that the `data` is unchanged and created by the original issuer. Only the `data` field is signed. 

#### `txNo`

This is the transaction number of block number. It can be used to query the blockchain. This could be viewed as a block address, but not to be confused with the block hash. The block object contains a method to calculate the current block hash. However it is not stored in the blockchain.  


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


## P2P

The P2P network operates using websockets. When a socket first connects, it will broadcast it's address the connecting node, which will forward it to all it's peers which repeats until all nodes receive the address. This meanst that the network should always be fully connected. There are 4types of messages communicated over the websockets. 

#### `HANDSHAKE`

This indicates that a node is trying to connect. Accompanying this message will be the address of the connecting node. On the reception of this message, the node will broadcast another `HANDSHAKE` message to the network with the connecting node's address and will reply the connecting node with a `HANDSHAKE` message contianing the addresses of its peers. 

#### `NEW BLOCK`

This indicates a new block is to be added to the chain. On the reception of this message, the node will first verify the integrity of this block, checking the `signature`, and the `lastHash` to ensure it is valid before pushing it to its chain. Upon adding, it will forward this message to all its peers. Duplication of message will not impact the integrity of the chain since the `lastHash` would be invalid. 

#### `REQUEST CHAIN`

This message request for the entire chain to be sent. This is usually send when a new node is connecting to the network. It follows shortly after the `HANDSHAKE` messgae. It request the chain history from node it is connecting to. On the reception of this message, the entire chain data will be sent to the requesting node. 

#### `SEND CHAIN`

This message indicates the chain history is being sent. 

