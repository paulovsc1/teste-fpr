export default function Footer() {
  return (

    <footer
      className="relative w-full h-[90px] bg-[#131A0A] z-20 opacity-100 flex items-center justify-center"
    >
      <p className="font-inter font-normal text-[12px] leading-[100%] tracking-[0%] text-white text-center">
        © {new Date().getFullYear()} FPR Animes - Todos os direitos reservados.
      </p>
      <div className="absolute -top-23 right-0 p-2 ">
        <img
          src="/pineapple.png"
          alt="Mascote Abacaxi"
          width={179}
          height={119}

        />
      </div>
    </footer>
  );
}
