import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { SettingsIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import ButtonNovoSorteio from "./button-novo-sorteio";
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
        <Button variant="outline" size="xl">
          <SettingsIcon className="size-8 text-primary" />
          <span>Configurações</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurações do Sorteia Bingo</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center justify-between p-2">
              <Label htmlFor="ativar-viva-voz">Voz de locutor</Label>
              <div className="flex gap-2 items-center">
                <p className="select-none text-sm">
                  {vivaVozAtivada ? "Ligado" : "Desligado"}
                </p>
                <Switch
                  id="ativar-viva-voz"
                  checked={vivaVozAtivada}
                  onCheckedChange={(checked) => alternarVivaVoz(checked)}
                />
              </div>
            </div>
            <p className="ml-2 text-sm text-muted-foreground">
              Quando ligado, um locutor irá anunciar os números sorteados.
            </p>
          </div>
          <Separator />
          <ButtonNovoSorteio />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonConfiguracoesBingo;
