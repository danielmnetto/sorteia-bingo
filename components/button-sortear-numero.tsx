import { Button } from "./ui/button";
import { DicesIcon } from "lucide-react";
import { useBingoContext } from "./context/bingo-context";

const ButtonSortearNumero = () => {
  const { sortearNumero, todosNumerosForamSorteados } = useBingoContext();

  return (
    <Button
      onClick={sortearNumero}
      disabled={todosNumerosForamSorteados}
      variant="default"
      size="xl"
    >
      <DicesIcon className="size-6" />
      <span>
        {todosNumerosForamSorteados ? "Fim do sorteio" : "Sortear número"}
      </span>
    </Button>
  );
};

export default ButtonSortearNumero;
