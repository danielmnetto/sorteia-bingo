import { RotateCcw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useBingoContext } from "./context/bingo-context";

const ButtonReiniciarSorteio = () => {
  const { reiniciarSorteio } = useBingoContext();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon-xl">
          <RotateCcw className="size-6" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Reiniciar sorteio?</AlertDialogTitle>
        <AlertDialogDescription>
          Toda a tabela de números será redefinida e não será possível desfazer
          a ação.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={reiniciarSorteio}>
            Reiniciar sorteio
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonReiniciarSorteio;
