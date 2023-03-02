import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

async function generateWallet() {
  // generate random private key
  const privateKey = secp.utils.randomPrivateKey();
  // get public key from private key
  const publicKey = secp.getPublicKey(privateKey);
  // derive address
  const address = getAddress(publicKey);
  const wallet = { address: address, privateKey: toHex(privateKey) };
  return wallet;
}

// addresses in Ethereum = last 20 bytes of keccak256-hashed public key (minus first byte)
function getAddress(publicKey) {
  // take off first byte, which indicates format of public key (compressed or not)
  let key = publicKey.slice(1);
  // hash
  let hashedKey = keccak256(key);
  // slice last 20 bytes
  let address = hashedKey.slice(hashedKey.length - 20);
  // convert to hexadecimal
  return toHex(address);
}

export { generateWallet, getAddress };
