import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { useCards } from "../hooks/useCards";
import Card from "../components/card";
import Banner from "../components/banner";

export default function Home({ search }) {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ attributes: [], types: [] });
  const [limit, setLimit] = useState(10);

  const handleFilterChange = (nextFilters) => {
    setPage(1);
    setFilters(nextFilters);
  };

  const { cards, loading } = useCards(page, filters, limit, search);
  const totalPages = 5; 

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar onFilterChange={handleFilterChange} />

      <div className="flex-1 p-4">
        <div className="w-full max-w-[1360px] mx-auto">
          {/* Banner */}
          <div className="mb-8">
            <Banner />
          </div>


          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="border border-gray-300 px-4 py-1"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <label className="text-gray-700">Itens por página</label>
            </div>

            {/* Paginação */}
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="w-[25px] h-[25px] flex items-center justify-center disabled:opacity-40"
                dangerouslySetInnerHTML={{
                  __html: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="21" viewBox="0 0 12 21" fill="none"><path d="M0.675932 9.47589C0.109525 10.0423 0.109525 10.9621 0.675931 11.5285L9.37593 20.2285C9.94234 20.795 10.8622 20.795 11.4286 20.2285C11.995 19.6621 11.995 18.7423 11.4286 18.1759L3.75265 10.5L11.4241 2.82402C11.9905 2.25761 11.9905 1.33777 11.4241 0.771362C10.8577 0.204956 9.93781 0.204956 9.3714 0.771362L0.671401 9.47136L0.675932 9.47589Z" fill="#34AC40"/></svg>`,
                }}
              />

              {[...Array(totalPages)].map((_, i) => {
                const n = i + 1;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-[25px] h-[25px] flex items-center justify-center font-inter font-bold text-[16px] ${page === n
                      ? "bg-[#34AC40] text-white"
                      : "bg-[#D9D9D9] text-black hover:bg-gray-400"
                      }`}
                  >
                    {n}
                  </button>
                );
              })}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="w-[25px] h-[25px] flex items-center justify-center disabled:opacity-40"
                dangerouslySetInnerHTML={{
                  __html: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="21" viewBox="0 0 12 21" fill="none" style="transform: rotate(180deg);"><path d="M0.675932 9.47589C0.109525 10.0423 0.109525 10.9621 0.675931 11.5285L9.37593 20.2285C9.94234 20.795 10.8622 20.795 11.4286 20.2285C11.995 19.6621 11.995 18.7423 11.4286 18.1759L3.75265 10.5L11.4241 2.82402C11.9905 2.25761 11.9905 1.33777 11.4241 0.771362C10.8577 0.204956 9.93781 0.204956 9.3714 0.771362L0.671401 9.47136L0.675932 9.47589Z" fill="#34AC40"/></svg>`,
                }}
              />
            </div>
          </div>

          {loading ? (
            <p>Carregando cards...</p>
          ) : cards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <img
                src="/images/empty.png"
                alt="Nenhum resultado"
                className="w-32 h-32 mb-4 opacity-80"
              />
              <p className="text-lg font-semibold text-gray-700">
                Nenhum card encontrado !!
              </p>
              <p className="text-sm text-gray-500">
                Tente ajustar os filtros ou fazer outra busca.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8 mb-16 pt-8">
              {cards.map((card) => (
                <Card key={card.id} card={card} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
