const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { recoverAddress } = require("./scripts/recoverKey");
app.use(cors());
app.use(express.json());

const balances = {
  c3242ef61f7902a82c7fd84b35968ea9c4463ffb: 100,
  // private key: b5e9b77f8562381c2402d16fe49bf11a358369c6bc5c29e69464617402eae2f0
  "404a72fb22e9a431ba4868c8dfd26e9d3b58493c": 50,
  // private key: 0745100109e6d18165bfbc495843fa3ae2abb96fbcb434b41717fb4490362dec
  "4bf9fccaad0ce8cfe82a88023ba307c3ca0b1ebc": 75,
  // private key: c90e9803050010b8299fcd7d300df9bf6213528fa2c39f84700052ac26ad97d7
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/getUsers", (req, res) => {
  const users = Object.keys(balances);
  res.send({ users });
});

app.post("/send", async (req, res) => {
  const { message, signature, recoveryBit, displayAddress } = req.body;
  const sig = new Uint8Array([...signature]);
  const sender = await recoverAddress(message, sig, recoveryBit);
  const [amount, recipient] = message.split(", ");
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= parseInt(amount);
    balances[recipient] += parseInt(amount);
    res.send({ balance: balances[displayAddress] });
  }
});

app.post("/newWallet", (req, res) => {
  const { address } = req.body;
  balances[address] = 50;
  res.send({ balance: balances[address] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
