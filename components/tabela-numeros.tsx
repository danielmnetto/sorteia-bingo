import { useBingoContext } from "./context/bingo-context";
import { cn } from "@/lib/utils";

const TabelaDeNumeros = () => {
  const { qtdeNumeros, numerosSorteados } = useBingoContext();

  return (
    <div className="grid grid-cols-10 pr-3">
      {Array.from({ length: qtdeNumeros }).map((numero, index) => {
        const numeroJaSorteado = numerosSorteados.some(
          (numero) => numero === index + 1,
        );

        return (
          <div
            key={`lista-${index}-${numero}`}
            className={cn(
              `flex items-center bg-linear-to-b from-slate-300 to-slate-50 justify-center border border-slate-400 p-4 transition-all`,
              numeroJaSorteado &&
                `bg-linear-to-b from-slate-700 to-slate-900 bg-slate-800`,
            )}
          >
            <p
              className={cn(
                "text-slate-950 text-center font-bold text-lg md:text-2xl transition-all",
                numeroJaSorteado && `text-slate-100`,
              )}
            >
              {(index + 1).toString().padStart(2, "0")}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TabelaDeNumeros;
