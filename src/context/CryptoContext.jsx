import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    switch (currency) {
      case "inr":
        setSymbol("₹");
        break;
      case "usd":
        setSymbol("$");
        break;
      case "btc":
        setSymbol("₿");
        break;

      case "eur":
        setSymbol("€");
        break;
    }
  }, [currency]);
 

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
