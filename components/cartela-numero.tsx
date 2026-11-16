import { cn } from "@/lib/utils";
import { useBingoContext } from "./context/bingo-context";

type CartelaNumeroProps = {
  numero: number;
};

const CartelaNumero = ({ numero }: CartelaNumeroProps) => {
  const {
    numerosSorteados,
    numeroSorteado,
    editarNumerosAtivo,
    alternarNumeroSorteado,
  } = useBingoContext();

  const numeroJaSorteado = numerosSorteados.some(
    (numeroSorteado) => numero === numeroSorteado,
  );

  const onClick = () => {
    if (!editarNumerosAtivo) return;
    alternarNumeroSorteado(numero);
  };

  return (
    <div
      className={cn(
        `max-w-30 max-h-26 2xl:max-w-56 2xl:max-h-40 flex items-center justify-center p-4 transition-all select-none rounded-md bg-cartela-fundo border-2 border-cartela-borda border-b-5 border-b-cartela-borda-b`,
        numeroJaSorteado &&
          `bg-cartela-fundo-sorteado border-cartela-borda-sorteado border-b-cartela-borda-sorteado-b`,
        numeroSorteado === numero &&
          `bg-cartela-fundo-ultimo-sorteado border-cartela-borda-ultimo-sorteado border-b-cartela-borda-ultimo-sorteado-b`,
        editarNumerosAtivo && `cursor-pointer`,
      )}
      onClick={onClick}
    >
      <p
        className={cn(
          "text-cartela-texto text-center font-inter font-bold tabular-nums text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl transition-all",
          numeroJaSorteado && `text-cartela-texto-sorteado`,
          numeroSorteado === numero && `drop-shadow-lg/70`,
        )}
      >
        {numero.toString().padStart(2, "0")}
      </p>
    </div>
  );
};

export default CartelaNumero;
