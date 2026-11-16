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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useBingoContext } from "./context/bingo-context";

const ButtonReiniciarBingo = () => {
  const {
    minNumbers,
    maxNumbers,
    novaQtdeNumeros,
    setNovaQtdeNumeros,
    reiniciarSorteio,
  } = useBingoContext();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Novo sorteio</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Começar um novo sorteio?</AlertDialogTitle>
        <AlertDialogDescription>
          Toda a tabela de números será redefinida e não será possível desfazer a ação.
        </AlertDialogDescription>
        <div className="flex gap-2 items-center justify-between p-2">
          <Label htmlFor="qtde-numeros">Nova quantidade de números</Label>
          <Input
            id="qtde-numeros"
            className="w-full border-slate-600"
            placeholder="Padrão: 75"
            type="number"
            min={minNumbers}
            max={maxNumbers}
            value={novaQtdeNumeros.toString()}
            onChange={(e) => {

              setNovaQtdeNumeros(Number.parseInt(e.target.value));
            }}
          />
        </div>
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

export default ButtonReiniciarBingo;
