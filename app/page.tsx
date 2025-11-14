"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DicesIcon, RotateCcw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const MINIMO_QTDE_NUMEROS = 2;
const MAXIMO_QTDE_NUMEROS = 999;
const QTDE_PADRAO_NUMEROS = 75;

export default function Home() {
  const [numeroSorteado, setNumeroSorteado] = useState<number | null>(null);
  const [numerosSorteados, setNumerosSorteados] = useState<Array<number>>([]);
  const [novaQtdeNumeros, setNovaQtdeNumeros] =
    useState<number>(QTDE_PADRAO_NUMEROS);
  const [qtdeNumeros, setQtdeNumeros] = useState<number>(novaQtdeNumeros);
  const [vivaVozAtivada, setVivaVozAtivada] = useState<boolean>(false);

  const pegarNumeroAleatorio = (minimo: number, maximo: number) => {
    minimo = Math.ceil(minimo);
    maximo = Math.floor(maximo);
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
  };

  const falarNumeroVozAlta = (numero: number) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance();

    utterance.text = String(numero);
    speechSynthesis.speak(utterance);
  };

  const sortearNumero = () => {
    if (numerosSorteados.length >= qtdeNumeros) {
      return;
    }

    let numeroSorteado = 0;
    let achouNumeroJaSorteado = true;

    while (achouNumeroJaSorteado) {
      numeroSorteado = pegarNumeroAleatorio(1, qtdeNumeros);

      if (
        !numerosSorteados.some(
          (numeroJaSorteado) => numeroSorteado == numeroJaSorteado
        )
      ) {
        achouNumeroJaSorteado = false;
      }
    }
    setNumeroSorteado(numeroSorteado);
    setNumerosSorteados([numeroSorteado, ...numerosSorteados]);
    if (vivaVozAtivada) falarNumeroVozAlta(numeroSorteado);
  };

  const reiniciarSorteio = () => {
    const qtdeNumerosAux = Math.max(Math.min(novaQtdeNumeros || QTDE_PADRAO_NUMEROS, MAXIMO_QTDE_NUMEROS), MINIMO_QTDE_NUMEROS);

    setNumeroSorteado(null);
    setNumerosSorteados([]);
    setQtdeNumeros(qtdeNumerosAux);
  };

  const alternarVivaVoz = (estado: boolean) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    setVivaVozAtivada(estado);
  };

  const confirmarReiniciarSorteio = () => {
    const confirmacao = confirm(
      "Você tem certeza que deseja reiniciar o sorteio?"
    );

    if (!confirmacao) return;

    reiniciarSorteio();
  };

  const todosNumerosForamSorteados = numerosSorteados.length >= qtdeNumeros;

  return (
    <main className="relative flex flex-col">
      <div className="flex justify-center gap-6 mx-auto mt-2 mb-4 px-5 py-4 border-2 border-slate-200 rounded-2xl">
        <div className="grid grid-cols-3 md:grid-cols-7 gap-1 md:gap-2 h-132 overflow-auto pr-3">
          {Array.from({ length: qtdeNumeros }).map((numero, index) => {
            const numeroJaSorteado = numerosSorteados.some(
              (numero) => numero === index + 1
            );

            return (
              <div
                key={`lista-${index}-${numero}`}
                className={cn(
                  `flex items-center justify-center rounded-lg bg-slate-300 sm:px-4 md:px-8 py-0.5 md:py-1.5 transition-all`,
                  numeroJaSorteado && `bg-slate-800`
                )}
              >
                <p
                  className={cn(
                    "text-slate-950 text-center font-bold text-md md:text-xl transition-all",
                    numeroJaSorteado && `text-slate-100`
                  )}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center border-2 border-emerald-200 bg-emerald-700 px-4 md:px-6 py-2 md:py-4 rounded-3xl md:rounded-4xl shadow-lg">
            <p className="text-lg md:text-xl font-bold text-center text-slate-50 underline">
              Número da vez
            </p>
            <p className="text-4xl md:text-8xl font-bold text-center text-slate-50">
              {numeroSorteado?.toString().padStart(2, "0") ?? "--"}
            </p>
          </div>
          <div className="w-60 h-76 border-2 bg-slate-100 border-slate-300 p-4 rounded-4xl flex flex-col shadow-lg">
            <p className="text-sm md:text-lg underline font-bold text-center mb-4">
              Números já sorteados
            </p>
            <div className="flex-col items-center md:gap-2 overflow-auto pr-1">
              {numerosSorteados.length === 0 ? (
                <p className="text-xs md:text-sm text-center italic text-slate-950">
                  Nenhum número sorteado
                </p>
              ) : (
                <div className="grid grid-cols-4 gap-1">
                  {numerosSorteados.map((numero, index) => (
                    <p
                      key={`sorteado-${index}-${numero}`}
                      className="text-sm md:text-xl text-center font-bold text-slate-950"
                    >
                      {numero.toString().padStart(2, "0")}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 bg-slate-300 border-t border-t-slate-300 flex flex-col items-center justify-center py-3 gap-3">
        <div className="flex gap-2 justify-center">
          <Button
            onClick={sortearNumero}
            disabled={todosNumerosForamSorteados}
            variant="default"
            size="xl"
          >
            <DicesIcon className="size-4" />
            <p>
              {todosNumerosForamSorteados
                ? "Todos os números foram sorteados"
                : "Sortear um número"}
            </p>
          </Button>
        </div>
        <Separator className="bg-slate-400" />
        <div className="flex gap-2 justify-center">
          <div className="flex gap-2 items-center">
            <Label htmlFor="qtde-numeros">Qtde. Números</Label>
            <Input
              id="qtde-numeros"
              className="w-18 border-slate-600"
              placeholder="Qtde. números"
              type="number"
              min={MINIMO_QTDE_NUMEROS}
              max={MAXIMO_QTDE_NUMEROS}
              defaultValue={QTDE_PADRAO_NUMEROS}
              onChange={(e) =>
                setNovaQtdeNumeros(Number.parseInt(e.target.value))
              }
            />
          </div>
          <Separator className="bg-slate-400" orientation="vertical" />
          <div className="flex gap-1 items-center">
            <Switch
              id="ativar-viva-voz"
              checked={vivaVozAtivada}
              onCheckedChange={(checked) => alternarVivaVoz(checked)}
            />
            <Label htmlFor="ativar-viva-voz">Viva-voz</Label>
          </div>
          <Separator className="bg-slate-400" orientation="vertical" />
          <Button
            onClick={confirmarReiniciarSorteio}
            variant="destructive"
            size="lg"
          >
            <RotateCcw className="size-4" />
            <p>Reiniciar sorteio</p>
          </Button>
        </div>
      </div>
    </main>
  );
}
