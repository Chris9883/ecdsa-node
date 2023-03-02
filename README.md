# ECDSA Node

Week 1 project submission for the Alchemy University Blockchain Developer Bootcamp.

## [Alchemy University Challenge Description](https://github.com/alchemyplatform/ecdsa-node)

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

## My solution

I have added the following features:

- Generating new private keys through [random private key generation](https://github.com/ethereum/js-ethereum-cryptography#secp256k1-curve)
- Using Ethereum-style 20 Byte addresses derived from the public key
- Balances are public: Anyone can see anyone's balance by typing in their address
- Funds can only be sent by submitting a valid signature to the server. In order to generate a signature, the sender has to use their private key. The server [recovers the signer's address from the signature](https://github.com/paulmillr/noble-secp256k1#recoverpublickeyhash-signature-recovery) and only transfers the amount if signer has enough funds.
- The private key is never submitted to the server

## Run

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!
