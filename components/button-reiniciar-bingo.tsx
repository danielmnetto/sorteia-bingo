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
    defaultNumbers,
    setNovaQtdeNumeros,
    reiniciarSorteio,
  } = useBingoContext();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Reiniciar sorteio</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Reiniciar sorteio?</AlertDialogTitle>
        <AlertDialogDescription>
          Tem certeza que deseja reiniciar o sorteio? Todos os números sorteados
          serão perdidos e a tabela de números será atualizada.
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
            defaultValue={defaultNumbers}
            onChange={(e) =>
              setNovaQtdeNumeros(Number.parseInt(e.target.value))
            }
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
