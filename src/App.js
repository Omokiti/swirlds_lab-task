
import React from "react";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [account, setAccount] = useState([]);
  const accountId = process.env.REACT_APP_MY_ACCOUNT_ID;
  const publicKey = process.env.REACT_APP_MY_PUBLIC_KEY;

  useEffect(() => {
    const getBalance = async () => {
      const url = `https://testnet.mirrornode.hedera.com/api/v1/balances?account.id=${accountId}`;
      const data = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accountId} ${publicKey}`,
        },
      });
      const jsonData = await data.json();
      let arr = [];
      for (let attrs in jsonData) {
        if (attrs === "balances" || attrs === "timestamp") {
          arr.push(jsonData[attrs]);
        }
      }
      setAccount(arr);
    };
    getBalance();
  }, []);

  const mappedLists = account[1]?.map((item, index) => {
    return (
      <div key={index} className="box">
        <p>Account Id:{item.account}</p>
        <p>Account Balance:{item.balance}HBAR</p>
      </div>
    );
  });
  return (
    <div className="box">
      <p>Timestamp:{account[0]}</p>
      {mappedLists}
    </div>
  );
}

export default App;
