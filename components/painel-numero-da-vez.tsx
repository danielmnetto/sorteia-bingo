import { HourglassIcon } from "lucide-react";
import { useBingoContext } from "./context/bingo-context";

const PainelNumeroDaVez = () => {
  const { numeroSorteado } = useBingoContext();

  return (
    <div className="w-full h-48 md:h-52 lg:h-60 pt-2 flex flex-col items-center bg-painel-numero-fundo border-4 border-painel-numero-borda border-b-12 border-b-painel-numero-borda-b rounded-lg select-none">
      <p className="font-inter font-bold text-center text-md md:text-lg text-painel-numero-texto drop-shadow-lg/70">
        {numeroSorteado ? "Número da vez" : "Aguardando sorteio..."}
      </p>
      {numeroSorteado ? (
        <p className="font-inter font-bold tabular-nums text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] text-center text-painel-numero-texto drop-shadow-lg/70">
          {numeroSorteado?.toString().padStart(2, "0")}
        </p>
      ) : (
        <HourglassIcon className="size-24 my-auto animate-[spin_30s_linear_infinite] text-painel-numero-texto drop-shadow-lg/70" />
      )}
    </div>
  );
};

export default PainelNumeroDaVez;
