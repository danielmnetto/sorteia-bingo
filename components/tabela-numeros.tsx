import CartelaNumero from "./cartela-numero";
import { useBingoContext } from "./context/bingo-context";

const TabelaDeNumeros = () => {
  const { qtdeNumeros } = useBingoContext();

  return (
    <div className="h-full grid grid-cols-10 gap-1">
      {Array.from({ length: qtdeNumeros }).map((numero, index) => {
        return (
          <CartelaNumero key={`lista-${index}-${numero}`} numero={index + 1} />
        );
      })}
    </div>
  );
};

export default TabelaDeNumeros;
