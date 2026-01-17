"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DicesIcon, RotateCcw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
          (numeroJaSorteado) => numeroSorteado == numeroJaSorteado,
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
    const qtdeNumerosAux = Math.max(
      Math.min(novaQtdeNumeros || QTDE_PADRAO_NUMEROS, MAXIMO_QTDE_NUMEROS),
      MINIMO_QTDE_NUMEROS,
    );

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
      "Você tem certeza que deseja reiniciar o sorteio?",
    );

    if (!confirmacao) return;

    reiniciarSorteio();
  };

  const todosNumerosForamSorteados = numerosSorteados.length >= qtdeNumeros;

  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
    }

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [numerosSorteados]);

  return (
    <main className="h-screen relative flex flex-col bg-linear-to-b from-slate-100 to-slate-300">
      <div className="flex justify-center gap-6 mx-auto mt-2 mb-4 px-5 py-4">
        <div className="grid grid-cols-10 pr-3">
          {Array.from({ length: qtdeNumeros }).map((numero, index) => {
            const numeroJaSorteado = numerosSorteados.some(
              (numero) => numero === index + 1,
            );

            return (
              <div
                key={`lista-${index}-${numero}`}
                className={cn(
                  `flex items-center bg-linear-to-b from-slate-300 to-slate-50 justify-center border border-slate-400 p-4 transition-all`,
                  numeroJaSorteado &&
                    `bg-linear-to-b from-slate-700 to-slate-900 bg-slate-800`,
                )}
              >
                <p
                  className={cn(
                    "text-slate-950 text-center font-bold text-lg md:text-2xl transition-all",
                    numeroJaSorteado && `text-slate-100`,
                  )}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center bg-linear-to-b from-emerald-500 to-emerald-700 border-2 border-emerald-200 px-4 md:px-6 py-2 shadow-lg">
            <p className="text-lg md:text-xl font-bold text-center text-slate-50 underline">
              Número da vez
            </p>
            <p className="text-4xl md:text-8xl font-bold text-center text-slate-50">
              {numeroSorteado?.toString().padStart(2, "0") ?? "--"}
            </p>
          </div>
          <div className="h-full flex flex-col">
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
            <div className="flex flex-col mt-16 bg-linear-to-b from-violet-200 to-violet-400">
              <div className="flex gap-1 items-center justify-center p-2">
                <Switch
                  id="ativar-viva-voz"
                  checked={vivaVozAtivada}
                  onCheckedChange={(checked) => alternarVivaVoz(checked)}
                />
                <Label htmlFor="ativar-viva-voz">Ativar locutor</Label>
              </div>
              <div className="flex gap-2 items-center justify-center p-2  ">
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
            </div>
            <Button
              className="mt-8"
              onClick={confirmarReiniciarSorteio}
              variant="destructive"
              size="lg"
            >
              <RotateCcw className="size-4" />
              <p>Reiniciar sorteio</p>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
