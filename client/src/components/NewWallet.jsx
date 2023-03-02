import server from "../server";
import { useState } from "react";
import { generateWallet } from "../scripts/generateWallet";
function NewWallet() {
  const [walletGenerated, setWalletGenerated] = useState(false);
  const [address, setAddress] = useState();
  const [privateKey, setPrivateKey] = useState();

  async function getNewWallet() {
    const wallet = await generateWallet();
    setAddress(wallet.address);
    setPrivateKey(wallet.privateKey);
    setWalletGenerated(true);

    // set new account in server and fund with initial balance of 50
    try {
      const {
        data: { balance },
      } = await server.post(`newWallet`, {
        address: wallet.address,
      });
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }
  if (!walletGenerated) {
    return (
      <div className="container wallet">
        <h1>Get New Wallet</h1>
        <p>
          Your wallet will be funded with 50 <span className="money">$BUX</span>{" "}
          to get you started!
        </p>
        <button
          className="button"
          onClick={() => {
            getNewWallet();
          }}
        >
          Request Wallet
        </button>
      </div>
    );
  } else {
    return (
      <div className="container wallet">
        <h1>Your Wallet</h1>
        <p className="info-label">Address</p>
        <div className="info">
          <p>{address}</p>
        </div>
        <p className="info-label">Private Key</p>
        <div className="info">
          <p>{privateKey}</p>
        </div>
      </div>
    );
  }
}

export default NewWallet;
