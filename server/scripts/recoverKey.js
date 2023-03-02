const secp = require("ethereum-cryptography/secp256k1");
const { hashMessage } = require("./hashMessage");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

async function recoverPublicKey(message, signature, recoveryBit) {
  const msgHash = await hashMessage(message);
  return secp.recoverPublicKey(msgHash, signature, recoveryBit);
}

async function recoverAddress(message, signature, recoveryBit) {
  const publicKey = await recoverPublicKey(message, signature, recoveryBit);
  return getAddress(publicKey);
}

// addresses in Ethereum = last 20 bytes of keccak256-hashed public key (minus first byte)
async function getAddress(publicKey) {
  // take off first byte, which indicates format of public key (compressed or not)
  let key = publicKey.slice(1);
  // hash
  let hashedKey = keccak256(key);
  // slice last 20 bytes
  let address = hashedKey.slice(hashedKey.length - 20);
  // convert to hexadecimal
  return toHex(address);
}

module.exports = { recoverPublicKey, recoverAddress };
