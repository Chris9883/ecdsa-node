import WalletBalances from "./components/WalletBalances";
import Transfer from "./components/Transfer";
import NewWallet from "./components/NewWallet";
import "./App.scss";
import { useState, useEffect } from "react";
import server from "./server";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [userAddresses, setUserAddresses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { users },
        } = await server.get(`getUsers`, {});
        setUserAddresses(users);
      } catch (ex) {
        alert(ex.response.data.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <WalletBalances
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        userAddresses={userAddresses}
      />
      <NewWallet />
      <Transfer
        setBalance={setBalance}
        address={address}
        userAddresses={userAddresses}
      />
    </div>
  );
}

export default App;
