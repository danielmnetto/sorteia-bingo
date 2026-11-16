import { useBingoContext } from "./context/bingo-context";

const PainelNumeroDaVez = () => {
  const { numeroSorteado } = useBingoContext();

  return (
    <div className="sm:w-64 md:w-72 lg:w-84 flex flex-col items-center bg-painel-numero-fundo border-4 border-painel-numero-borda border-b-12 border-b-painel-numero-borda-b px-8 py-6 rounded-lg select-none">
      <p className="font-inter font-bold text-center text-md md:text-lg lg:text-xl text-painel-numero-texto drop-shadow-lg/70">
        {numeroSorteado ? "Número da vez" : "Aguardando sorteio..."}
      </p>
      <p className="font-inter font-bold text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] text-center text-painel-numero-texto drop-shadow-lg/70 tabular-nums">
        {numeroSorteado?.toString().padStart(2, "0") ?? "..."}
      </p>
    </div>
  );
};

export default PainelNumeroDaVez;
