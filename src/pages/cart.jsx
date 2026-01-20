import { useState } from "react";
import { useCart } from "../context/useCart";
import Modal from "../components/modal";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [shipping, setShipping] = useState(20);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const EURO_TO_BRL = 5.4;

  const formatBRL = (value) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const subtotal = cart.reduce((acc, item) => {
    const euroPrice = parseFloat(item.card_prices?.[0]?.cardmarket_price || 0);
    const brlPrice = euroPrice * EURO_TO_BRL;
    return acc + brlPrice * (item.quantity || 1);
  }, 0);

  const totalToPay = subtotal + shipping;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setLoading(true);

    setTimeout(() => {
      setShowModal(true);
      clearCart();
      setLoading(false);
    }, 2000);
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.href = "/";
  };

  return (
    <div className="p-6 lg:p-12">
      {showModal && (
        <Modal
          message={
            <>
              Compra concluída! <br /> <br /> Agora é só aguardar a chegada da
              sua coleção.
            </>
          }
          onClose={closeModal}
        />
      )}

      <h1 className="text-[28px] font-bold text-[#FF6600] uppercase tracking-wide">
        <span className="text-green-700">Carrinho</span>{" "}
        <span className="text-orange-600">de Compras</span>
      </h1>
      <hr className="border border-green-500 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 border-[3px] border-[#D9D9D9] p-6 bg-white shadow">
          {cart.length === 0 ? (
            <p className="text-gray-600">Seu carrinho está vazio.</p>
          ) : (
            <>
              <div className="max-h-[400px] overflow-y-auto md:max-h-none md:overflow-visible pr-2">
                {cart.map((item) => {
                  const euroPrice = parseFloat(
                    item.card_prices?.[0]?.cardmarket_price || 0
                  );
                  const unitPrice = euroPrice * EURO_TO_BRL;
                  const totalPrice = unitPrice * (item.quantity || 1);

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-gray-300 pb-4 mb-4 last:border-none"
                    >
                      <img
                        src={item.card_images?.[0]?.image_url}
                        alt={item.name}
                        className="w-24 h-36 object-contain"
                      />

                      <div className="flex-1">
                        <h2 className="font-bold text-lg">{item.name}</h2>
                        <p className="text-sm text-gray-500">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit.
                        </p>

                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                          <div>
                            <p className="font-inter font-bold text-[16px] text-black">
                              Preço por unidade:
                            </p>
                            <p className="w-[80px] h-[22px] font-inter font-bold text-[18px] text-[#34AC40]">
                              {formatBRL(unitPrice)}
                            </p>
                          </div>

                          <div className="flex flex-col items-start">
                            <span className="font-inter font-bold text-[16px] text-black">
                              Quantidade
                            </span>
                            <p className="w-[9px] h-[22px] font-inter font-bold text-[18px] text-[#34AC40]">
                              {item.quantity || 1}
                            </p>
                          </div>

                          <div className="md:text-right">
                            <p className="font-inter font-bold text-[16px] text-black">
                              Total:
                            </p>
                            <p className="font-inter font-bold text-[18px] text-[#FF6600]">
                              {formatBRL(totalPrice)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 font-bold ml-2"
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>

              <hr className="border-gray-300 my-4" />

              <div className="mt-4 text-right">
                <p className="font-inter font-bold text-[16px] text-black">
                  Subtotal ({cart.length} itens):
                </p>
                <p className="font-inter font-bold text-[18px] text-[#FF6600]">
                  {formatBRL(subtotal)}
                </p>
              </div>

              <hr className="border-gray-300 my-4" />

              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-inter font-bold text-[26px] leading-none">
                    <span className="text-green-600">Formas </span>
                    <span className="text-orange-500">de envio</span>
                  </h3>

                  <div className="text-right">
                    <p className="font-inter font-bold text-[16px] text-black">
                      Custo do Frete:
                    </p>
                    <p className="font-inter font-bold text-[18px] text-[#FF6600]">
                      {formatBRL(shipping)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping === 15}
                      onChange={() => setShipping(15)}
                      className="hidden"
                    />
                    <span
                      className={`w-[27px] h-[27px] rounded-full border-2 flex items-center justify-center ${shipping === 15
                          ? "border-green-600"
                          : "border-[#D9D9D9]"
                        }`}
                    >
                      {shipping === 15 && (
                        <span className="w-[11px] h-[11px] bg-green-600 rounded-full"></span>
                      )}
                    </span>
                    <span className="font-normal">
                      Frete fixo com rastreio (R$ 15,00){" "}
                      <small className="text-gray-500 font-normal">
                        até 15 dias
                      </small>
                    </span>
                  </label>

                  <label className="flex flex-col gap-2 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shipping === 20}
                        onChange={() => setShipping(20)}
                        className="hidden"
                      />
                      <span
                        className={`w-[27px] h-[27px] rounded-full border-2 flex items-center justify-center ${shipping === 20
                            ? "border-green-600"
                            : "border-[#D9D9D9]"
                          }`}
                      >
                        {shipping === 20 && (
                          <span className="w-[11px] h-[11px] bg-green-600 rounded-full"></span>
                        )}
                      </span>
                      <span className="font-normal">
                        Frete combinado com o vendedor
                      </span>
                    </div>

                    {shipping === 20 && (
                      <div className="ml-6 flex items-center gap-2">
                        <span className="text-gray-700">Valor combinado:</span>
                        <span className="border border-gray-300 w-[102px] h-[22px] flex items-center pl-1 text-sm">
                          {formatBRL(shipping)}
                        </span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-[#2D2F2E] text-white p-4 shadow-lg flex flex-col justify-between h-auto w-full md:p-6 md:w-[518px] md:h-[427px]">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 border-b border-green-500 pb-2">
            <span className="text-green-500">Resumo da </span>
            <span className="text-orange-500">compra</span>
          </h2>

          <div className="space-y-4 md:space-y-6 text-base md:text-lg flex-1">
            <div>
              <p>Total dos produtos:</p>
              <p className="text-green-500 text-lg md:text-xl font-bold">
                {formatBRL(subtotal)}
              </p>
            </div>

            <hr className="border-green-500" />

            <div>
              <p>Valor do frete:</p>
              <p className="text-green-500 text-lg md:text-xl font-bold">
                {formatBRL(shipping)}
              </p>
            </div>

            <hr className="border-green-500" />
          </div>

          <div className="mt-[6px]">
            <p className="font-extrabold text-lg md:text-xl uppercase">
              Total a pagar:
            </p>
            <p className="text-orange-500 font-extrabold text-2xl md:text-3xl">
              {formatBRL(totalToPay)}
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading || cart.length === 0}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white font-inter font-bold py-3 px-6 w-full disabled:opacity-50"
          >
            {loading ? "Processando compra..." : "Finalizar Compra"}
          </button>
        </div>
      </div>
    </div>
  );
}
