import { CheckIcon, PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useBingoContext } from "./context/bingo-context";

const ButtonEditarNumeros = () => {
  const { editarNumerosAtivo, setEditarNumerosAtivo } = useBingoContext();

  const onClick = () => {
    setEditarNumerosAtivo(!editarNumerosAtivo);
  };

  return (
    <Button variant="outline" size="xl" onClick={onClick}>
      {editarNumerosAtivo ? (
        <>
          <CheckIcon className="size-6" />
          <span>Fechar edição de números</span>
        </>
      ) : (
        <>
          <PencilIcon className="size-6" />
          <span>Editar números</span>
        </>
      )}
    </Button>
  );
};

export default ButtonEditarNumeros;
