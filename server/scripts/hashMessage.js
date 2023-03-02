const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

// accepts string as argument
// returns hashed message (Uint8Array)
async function hashMessage(message) {
  const messageBytes = utf8ToBytes(message);
  const hash = keccak256(messageBytes);
  return hash;
}

module.exports = { hashMessage };
