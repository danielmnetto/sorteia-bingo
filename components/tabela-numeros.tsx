import { useBingoContext } from "./context/bingo-context";
import { cn } from "@/lib/utils";

const TabelaDeNumeros = () => {
  const { qtdeNumeros, numerosSorteados, numeroSorteado } = useBingoContext();

  return (
    <div className="h-full grid grid-cols-10 gap-1">
      {Array.from({ length: qtdeNumeros }).map((numero, index) => {
        const numeroJaSorteado = numerosSorteados.some(
          (numero) => numero === index + 1,
        );

        return (
          <div
            key={`lista-${index}-${numero}`}
            className={cn(
              `max-w-30 max-h-26 2xl:max-w-56 2xl:max-h-40 flex items-center justify-center p-4 transition-all rounded-md bg-cartela-fundo border-2 border-cartela-borda border-b-5 border-b-cartela-borda-b`,
              numeroJaSorteado && `bg-cartela-fundo-sorteado border-cartela-borda-sorteado border-b-cartela-borda-sorteado-b`,
              numeroSorteado === index + 1 && `bg-cartela-fundo-ultimo-sorteado border-cartela-borda-ultimo-sorteado border-b-cartela-borda-ultimo-sorteado-b`,
            )}
          >
            <p
              className={cn(
                "text-cartela-texto text-center font-inter font-bold tabular-nums text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl transition-all",
                numeroJaSorteado && `text-cartela-texto-sorteado`,
                numeroSorteado === index + 1 && `drop-shadow-lg/70`,
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
