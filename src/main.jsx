import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

import "react-alice-carousel/lib/alice-carousel.css";
import CryptoContext from "./context/CryptoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

    <CryptoContext>
      <App />
    </CryptoContext>

);
