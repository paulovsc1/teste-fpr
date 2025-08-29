import { useState } from "react";

const cardTypes = ["Armadilha", "Counter", "Mágica", "Monstro", "Skill Card", "Token"];

const attributes = [
  "Aqua", "Beast", "Beast Warrior", "Continuos", "Counter", "Creator God", "Cyberse", "Dark",
  "Dinosaur", "Divine Beast", "Divino", "Dragon", "Earth", "Effect", "Equip", "Fairy", "Field", "Friend",
  "Fire", "Fish", "Flip", "Fusion", "Insect", "Light", "Link", "Machine", "Monster", "N/A", "Normal",
  "Pendulum", "Plant", "Psichic", "Pyro", "Quick-Play", "Reptile",
];

export default function Sidebar({ onFilterChange }) {
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [open, setOpen] = useState(false);

  const handleAttributeChange = (attr) => {
    setSelectedAttributes((prev) =>
      prev.includes(attr) ? prev.filter((a) => a !== attr) : [...prev, attr]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedAttributes([]);
    setSelectedTypes([]);
    onFilterChange({ attributes: [], types: [] });
  };

  const applyFilters = () => {
    onFilterChange({ attributes: selectedAttributes, types: selectedTypes });
    setOpen(false);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-600 text-white px-4 py-2"
        onClick={() => setOpen(true)}
      >
        Filtros
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

     <aside
  className={`
    fixed top-0 left-0 w-80 h-full bg-white p-6 z-50
    transform transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:static md:flex md:flex-col
  `}
>

        <div className="flex flex-col h-full overflow-y-auto">
          <div className="mb-2">
            <h2 className="w-[107px] h-[31px] font-inter font-bold text-[26px] text-green-600 pb-1">
              FILTROS
            </h2>
            <div className="border-b-2 border-green-600 w-full" />
          </div>

          <h3 className="font-inter font-bold text-[20px] text-orange-600 mt-3 mb-2">
            TIPO / ATRIBUTO
          </h3>

          {attributes.map((attr) => (
            <label
              key={attr}
              className="flex flex-row items-center mb-2 font-inter font-light text-[16px] text-[#666666]"
            >
              <input
                type="checkbox"
                checked={selectedAttributes.includes(attr)}
                onChange={() => handleAttributeChange(attr)}
                className="peer hidden"
              />
              <div
                className="
            w-5 h-5 mr-2 flex items-center justify-center
            border-2 border-[#F46D1B] 
            peer-checked:border-[#34AC40] peer-checked:bg-[#F46D1B]
          "
              >
                <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-white">
                  <path
                    d="M4 12.6111L8.92308 17.5L20 6.5"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {attr}
            </label>
          ))}


          <h3 className="font-inter font-bold text-[20px] text-orange-600 mt-5 mb-3 border-t border-[#F46D1B] pt-4">
            TIPO CARTA
          </h3>

          {cardTypes.map((type) => (
            <label
              key={type}
              className="flex flex-row items-center mb-2 font-inter font-light text-[16px] text-[#666666]"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="peer hidden"
              />
              <div
                className="
            w-5 h-5 mr-2 flex items-center justify-center
            border-2 border-[#F46D1B] 
            peer-checked:border-[#34AC40] peer-checked:bg-[#F46D1B]
          "
              >
                <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-white">
                  <path
                    d="M4 12.6111L8.92308 17.5L20 6.5"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {type}
            </label>
          ))}

    
          <div className="mt-4 flex gap-2 border-t pt-4 sticky bottom-0 bg-white pb-4">
            <button
              onClick={applyFilters}
              className="w-[147px] h-[53px] bg-green-600 text-white font-inter font-bold text-[16px] transition-colors duration-300 hover:bg-green-700"
            >
              PESQUISAR
            </button>
            <button
              onClick={clearFilters}
              className="w-[147px] h-[53px] bg-orange-500 text-white font-inter font-bold text-[16px] transition-colors duration-300 hover:bg-orange-600"
            >
              LIMPAR FILTROS
            </button>
          </div>

        </div>
      </aside>

    </>
  );
}
