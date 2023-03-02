import server from "../server";

function WalletBalances({
  address,
  setAddress,
  balance,
  setBalance,
  userAddresses,
}) {
  let selectableAddresses = [];
  for (let i = 0; i < userAddresses.length; i++) {
    selectableAddresses.push(<option value={userAddresses[i]} key={i} />);
  }

  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>See Wallet Balances</h1>

      <label>
        Wallet Address
        <input
          list="selectableAddresses"
          placeholder="Select or type an address"
          value={address}
          onChange={onChange}
        ></input>
      </label>
      <datalist id="selectableAddresses">{selectableAddresses}</datalist>

      <div className="balance">
        <p>
          Balance: {balance} <span className="money">$BUX</span>
        </p>
      </div>
    </div>
  );
}

export default WalletBalances;
