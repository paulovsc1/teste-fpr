import { useState } from "react";
import { useCart } from "../context/useCart";
import Modal from "../components/modal";

function Card({ card }) {
  const { addToCart } = useCart();
  const [modal, setModal] = useState(null);

  const EURO_TO_BRL = 5.40;
  const euroPrice = Number(card.card_prices?.[0]?.cardmarket_price || 0);
  const finalEuroPrice = euroPrice > 0 ? euroPrice : 0.90;

  const priceBRL = (finalEuroPrice * EURO_TO_BRL).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function handleBuy() {
    const result = addToCart(card);
    if (result.success) {
      setModal("success");
    } else {
      setModal("exists");
    }
  }

  return (
    <div className="hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden w-full">
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <img
          src={card.card_images[0].image_url}
          alt={card.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="p-3 flex flex-col gap-2">
        <h2 className="font-inter font-bold text-[16px] text-gray-800 text-center truncate w-[220px] mx-auto">
          {card.name}
        </h2>

        <p className="text-green-600 font-bold text-[16px] font-inter text-center">
          R$ {priceBRL}
        </p>

        <button
          className="
            w-full min-h-[44px]
            sm:w-[233px] sm:h-[31px]
            sm:min-h-0
            mx-auto
            font-bold
            bg-green-600 text-white hover:bg-green-700 transition-colors
            flex items-center justify-center whitespace-nowrap
          "
          onClick={handleBuy}
        >
          Comprar
        </button>
      </div>

      {modal === "success" && (
        <Modal
          message={
            <>
              Produto <span className="text-orange-500">{card.name}</span> <br />
              adicionado ao carrinho com sucesso!
            </>
          }
          onClose={() => setModal(null)}
        />
      )}

      {modal === "exists" && (
        <Modal
          message="Esse produto já está no carrinho!"
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

export default Card;
