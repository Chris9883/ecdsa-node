import * as secp from "ethereum-cryptography/secp256k1";
import { utf8ToBytes, hexToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

// accepts string as argument
// return value: hex string representation of hashed message
async function hashMessage(message) {
  const messageBytes = utf8ToBytes(message);
  const hash = keccak256(messageBytes);
  return hash;
}

// message argument of type string
async function signMessage(message, privateKey) {
  const msgHash = await hashMessage(message);
  // sign the hashed message with the private key
  // set recovered to true to obtain the recovery bit --> needed to recover public key
  let signed = await secp.sign(msgHash, hexToBytes(`0x${privateKey}`), {
    recovered: true,
  });
  return signed;
}

export { hashMessage, signMessage };
