import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { CryptoState } from "./context/CryptoContext";
import { Navbar, Home, Footer, News, SearchCoin } from "./component/index";
import { Signin, Signup, Account, CoinPage } from "./routes/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./api/api";
import "./App.css";

function App() {
  const [exchanges, setExchanges] = useState("");
  const [exchangesList, setExchangesList] = useState("");
  const [global, setGlobal] = useState("");
  const [trending, setTrending] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { currency, symbol } = CryptoState();

  const fetchExchangeCrypto = (currency) => {
    api.getExchangeCrypto(currency).then((resp) => setExchanges(resp.data));
  };

  const fetchExchangesCrypto = (currency, page) => {
    api
      .getExchangeCrypto(currency, page)
      .then((resp) => setExchangesList(resp.data));
  };

  const fetchGlobalCrypto = () => {
    api.getGlobalCrypto().then((resp) => setGlobal(resp.data.data));
  };

  const fetchTrendingCrypto = () => {
    api.getTrending().then((resp) => setTrending(resp.data.coins));
  };

  useEffect(() => {
    fetchGlobalCrypto();
    fetchTrendingCrypto();
    fetchExchangeCrypto(currency);
    fetchExchangesCrypto(currency, currentPage);
  }, [currency, currentPage]);

  return (
    <>
      <AuthContextProvider>
        <Router>
          <header className="bg-black">
            <Navbar />
            <ToastContainer />
          </header>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  exchanges={exchanges}
                  currency={currency}
                  symbol={symbol}
                  global={global}
                  trending={trending}
                />
              }
            />
            <Route
              path="/exchanges"
              element={
                <SearchCoin
                  exchanges={exchangesList}
                  setCurrentPage={setCurrentPage}
                  currency={currency}
                  symbol={symbol}
                  currentPage={currentPage}
                />
              }
            />
            <Route path="/news" element={<News />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/coin/:coinId" element={<CoinPage />}>
              <Route path=":coinId" />
            </Route>
          </Routes>
          <Footer />
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
