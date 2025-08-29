import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/cartcontext";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Header from "./components/header";
import Footer from "./components/footer";
import { useState } from "react";

export default function App() {
  const [search, setSearch] = useState(""); 

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen relative">
          <Header onSearch={setSearch} />

          <main className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home search={search} />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
