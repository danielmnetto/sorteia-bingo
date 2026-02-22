import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { CogIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import ButtonReiniciarBingo from "./button-reiniciar-bingo";
import { useBingoContext } from "./context/bingo-context";

const ButtonConfiguracoesBingo = () => {
  const {
    vivaVozAtivada,
    alternarVivaVoz,
    configBingoAberto,
    setConfigBingoAberto,
  } = useBingoContext();

  return (
    <Dialog open={configBingoAberto} onOpenChange={setConfigBingoAberto}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline" size="icon">
          <CogIcon className="size-4" />
          <span>Configurações</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurações do Bingo</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center p-2">
            <Switch
              id="ativar-viva-voz"
              checked={vivaVozAtivada}
              onCheckedChange={(checked) => alternarVivaVoz(checked)}
            />
            <Label htmlFor="ativar-viva-voz">Ativar locutor</Label>
          </div>
          <ButtonReiniciarBingo />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonConfiguracoesBingo;
