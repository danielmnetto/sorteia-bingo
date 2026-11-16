import { Button } from "./ui/button";
import { CircleOffIcon, DicesIcon } from "lucide-react";
import { useBingoContext } from "./context/bingo-context";

const ButtonSortearNumero = () => {
  const { sortearNumero, todosNumerosForamSorteados, editarNumerosAtivo } =
    useBingoContext();

  return (
    <Button
      onClick={sortearNumero}
      disabled={todosNumerosForamSorteados || editarNumerosAtivo}
      variant="default"
      size="xl"
    >
      {editarNumerosAtivo ? (
        <CircleOffIcon className="size-6" />
      ) : (
        <DicesIcon className="size-6" />
      )}
      <span>
        {todosNumerosForamSorteados
          ? "Fim do sorteio"
          : editarNumerosAtivo
            ? "Edição de números ativa"
            : "Sortear número"}
      </span>
    </Button>
  );
};

export default ButtonSortearNumero;
