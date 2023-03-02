import { useState } from "react";
import { signMessage } from "../scripts/signatureMethods";
import server from "../server";

function Transfer({ address, setBalance, userAddresses }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  let selectableAddresses = [];
  for (let i = 0; i < userAddresses.length; i++) {
    selectableAddresses.push(<option value={userAddresses[i]} key={i} />);
  }

  async function transfer(e) {
    e.preventDefault();
    const message = `${sendAmount}, ${recipient}`;
    let signature, recoveryBit;
    try {
      [signature, recoveryBit] = await signMessage(message, privateKey);
    } catch (e) {
      console.error(e);
      alert(e);
    }
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        message: message,
        signature: [...signature],
        recoveryBit: recoveryBit,
        displayAddress: address,
      });
      setBalance(balance);
    } catch (e) {
      console.error(e);
      alert(`${e}\n${e.response.data.message}`);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>
      <p>
        Your private key is needed to sign the transaction. Only the signature,
        not your private key, will be submitted to the server.
      </p>
      <label>
        Enter Private Key
        <input
          placeholder="Get a new wallet and copy over your private key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        ></input>
      </label>
      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          list="selectableAddresses"
          placeholder="Select or type an address"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <datalist id="selectableAddresses">{selectableAddresses}</datalist>
      <input type="submit" className="button" value="Sign transaction" />
    </form>
  );
}

export default Transfer;
