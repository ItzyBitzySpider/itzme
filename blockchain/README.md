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
The `myAddress` and `peerAddress` fields are required for the P2P functionality. If this is the first node, `peerAddress` can be left empty. 

After filling in these pieces of information, you can run the server with 

```yarn run start```


