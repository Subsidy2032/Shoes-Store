import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./Components/CartContext";
import AppRouter from "./AppRouter";

function App() {
  return (
    <CartProvider><Router><AppRouter /></Router></CartProvider>
  );
}

export default App;