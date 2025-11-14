"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DicesIcon, RotateCcw } from "lucide-react";

const MINIMO_QTDE_NUMEROS = 5;
const MAXIMO_QTDE_NUMEROS = 300;
const QTDE_PADRAO_NUMEROS = 75;

export default function Home() {
  const [numeroSorteado, setNumeroSorteado] = useState<number | null>(null);
  const [numerosSorteados, setNumerosSorteados] = useState<Array<number>>([]);
  const [novaQtdeNumeros, setNovaQtdeNumeros] =
    useState<number>(QTDE_PADRAO_NUMEROS);
  const [qtdeNumeros, setQtdeNumeros] = useState<number>(novaQtdeNumeros);

  const pegarNumeroAleatorio = (minimo: number, maximo: number) => {
    minimo = Math.ceil(minimo);
    maximo = Math.floor(maximo);
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
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
  };

  const reiniciarSorteio = () => {
    setNumeroSorteado(null);
    setNumerosSorteados([]);
    setQtdeNumeros(novaQtdeNumeros || QTDE_PADRAO_NUMEROS);
  };

  const confirmarReiniciarSorteio = () => {
    const confirmacao = confirm(
      "Você tem certeza que deseja reiniciar o sorteio?"
    );

    if (!confirmacao) return;

    reiniciarSorteio();
  };

  return (
    <main className="relative flex flex-col">
      <div className="flex justify-center gap-6 mx-auto my-2 px-5 py-4 border-2 border-slate-200 rounded-2xl">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-2 h-104 sm:h-128 md:h-full overflow-auto pr-3">
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
          <div className="flex flex-col items-center border-2 border-slate-100 bg-emerald-200 px-4 md:px-6 py-2 md:py-4 md:gap-4 rounded-3xl md:rounded-4xl">
            <p className="text-xl md:text-3xl font-bold text-center">Número:</p>
            <p className="text-4xl md:text-7xl font-bold text-center">
              {numeroSorteado?.toString().padStart(2, "0") ?? "--"}
            </p>
          </div>
          <div className="border-2 bg-slate-50 border-slate-100 p-4 rounded-4xl h-84 md:h-96 flex flex-col">
            <p className="text-sm md:text-lg underline font-bold text-center mb-4">
              Números já sorteados
            </p>
            <div className="flex-col items-center md:gap-2 overflow-auto">
              {numerosSorteados.length === 0 ? (
                <p className="text-xs md:text-sm text-center italic text-slate-950">
                  Nenhum número sorteado
                </p>
              ) : (
                <div className="grid grid-cols-4 gap-1">
                  {numerosSorteados.map((numero, index) => (
                    <p
                      key={`sorteado-${index}-${numero}`}
                      className="text-sm text-center md:text-2xl font-bold text-slate-950"
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
      <div className="sticky bottom-0 bg-slate-300 border-t-2 border-t-slate-300 flex items-center justify-center py-6 gap-3">
        <Button
          onClick={sortearNumero}
          disabled={numerosSorteados.length >= qtdeNumeros}
          variant="default"
          size="lg"
        >
          <DicesIcon className="size-4" />
          <p>Sortear um número</p>
        </Button>
        <Button
          onClick={confirmarReiniciarSorteio}
          variant="destructive"
          size="lg"
        >
          <RotateCcw className="size-4" />
          <p>Reiniciar sorteio</p>
        </Button>
        <Input
          className="w-24 border-slate-600"
          placeholder="Qtde. números"
          type="number"
          min={MINIMO_QTDE_NUMEROS}
          max={MAXIMO_QTDE_NUMEROS}
          defaultValue={QTDE_PADRAO_NUMEROS}
          onChange={(e) => setNovaQtdeNumeros(Number.parseInt(e.target.value))}
        />
      </div>
    </main>
  );
}
