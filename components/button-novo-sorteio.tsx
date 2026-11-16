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
import { BroomSparklesIcon } from "lucide-react";

const ButtonNovoSorteio = () => {
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
        <Button variant="destructive" size="xl">
          <BroomSparklesIcon className="size-6" />
          <span>Novo sorteio</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Começar um novo sorteio?</AlertDialogTitle>
        <AlertDialogDescription>
          Defina uma quantidade de números para o novo sorteio. Ao criar um
          sorteio, toda a tabela de números será redefinida e não será possível
          desfazer a ação.
        </AlertDialogDescription>
        <div className="flex gap-2 items-center justify-between p-2">
          <Label htmlFor="qtde-numeros">Nova quantidade de números</Label>
          <Input
            id="qtde-numeros"
            className="w-24 border-slate-600"
            placeholder="Escolha a quantidade de números desejada"
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
            Criar sorteio
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonNovoSorteio;
