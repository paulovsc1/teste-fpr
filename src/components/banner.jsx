import { useState, useEffect, useCallback } from "react";

function BannerCarousel() {
  const banners = ["/banner1.png", "/banner2.png", "/banner3.png"];
  const [current, setCurrent] = useState(0);

  const nextBanner = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    const interval = setInterval(nextBanner, 8000);
    return () => clearInterval(interval);
  }, [nextBanner]);

  return (
    <div className="flex flex-col items-center mt-4 w-full max-w-[1360px] mx-auto px-2">
      <div className="relative w-full h-32 sm:h-48 md:h-64 lg:h-[350px] overflow-hidden shadow-md">
        {banners.map((banner, idx) => (
          <img
            key={idx}
            src={banner}
            alt={`Banner ${idx + 1}`}
            className={`absolute w-full h-full object-cover object-center transition-opacity duration-1000 ${idx === current ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-3 gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full border transition-all duration-300 ${idx === current
                ? "bg-green-500 border-green-500 scale-110"
                : "bg-gray-300 border-gray-300 hover:border-blue-500"
              }`}
            aria-label={`Ir para banner ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerCarousel;
