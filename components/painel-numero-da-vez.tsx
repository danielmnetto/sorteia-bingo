import { useBingoContext } from "./context/bingo-context";

const PainelNumeroDaVez = () => {
  const { numeroSorteado } = useBingoContext();

  return (
    <div className="flex flex-col items-center bg-linear-to-b from-emerald-500 to-emerald-700 border-2 border-emerald-200 px-4 md:px-6 py-2 shadow-lg">
      <p className="text-lg md:text-xl font-bold text-center text-slate-50 underline">
        Número da vez
      </p>
      <p className="text-4xl md:text-8xl font-bold text-center text-slate-50">
        {numeroSorteado?.toString().padStart(2, "0") ?? "--"}
      </p>
    </div>
  );
};

export default PainelNumeroDaVez;
