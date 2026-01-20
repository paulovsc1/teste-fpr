import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header({ onSearch }) {
  const { cart } = useCart();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      const cleanQuery = query.trim(); 
      onSearch(cleanQuery);
    }
  };

  return (
    <header className="bg-[#131A0A] w-full h-[100px] md:h-[120px] flex items-center justify-between px-6 md:px-12">
      <Link to="/">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[150px] md:w-[220px] h-auto object-contain"
        />
      </Link>

      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-[494px]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}  
            onBlur={() => setQuery((q) => q.trimStart())} 
            placeholder="Pesquisar"
            className="w-full h-[45px] md:h-[50px] bg-white text-black pl-4 pr-12 rounded-md outline-none border border-gray-300 focus:border-[#34AC40]"
          />
          <svg
            onClick={handleSearch}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 26 26"
            fill="none"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <path
              d="M10.3695 0C4.63673 0 0 4.53044 0 10.1318C0 15.7332 4.63673 20.2636 10.3695 20.2636C12.4162 20.2636 14.3105 19.6769 15.9164 18.6805L23.4076 26L26 23.467L18.6041 16.2593C19.9337 14.5552 20.739 12.4436 20.739 10.1318C20.739 4.53044 16.1023 0 10.3695 0ZM10.3695 2.38395C14.7608 2.38395 18.2991 5.84115 18.2991 10.1318C18.2991 14.4225 14.7608 17.8797 10.3695 17.8797C5.97819 17.8797 2.43988 14.4225 2.43988 10.1318C2.43988 5.84115 5.97819 2.38395 10.3695 2.38395Z"
              fill="#34AC40"
            />
          </svg>
        </div>
      </div>

      <Link to="/cart" className="relative">
        <img
          src="/icons8-carrinho-961.png"
          alt="Carrinho"
          className="w-[40px] md:w-[50px] h-auto"
        />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs md:text-sm rounded-full w-5 h-5 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </Link>
    </header>
  );
}

export default Header;
