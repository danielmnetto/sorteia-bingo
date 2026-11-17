"use client";

import ButtonConfiguracoesBingo from "@/components/button-configuracoes-bingo";
import TabelaDeNumeros from "@/components/tabela-numeros";
import { BingoContextProvider } from "@/components/context/bingo-context";
import PainelNumeroDaVez from "@/components/painel-numero-da-vez";
import ButtonSortearNumero from "@/components/button-sortear-numero";
import ButtonReiniciarSorteio from "@/components/button-reiniciar-sorteio";
import ButtonNovoSorteio from "@/components/button-novo-sorteio";
import ButtonEditarNumeros from "@/components/button-editar-numeros";

export default function Home() {
  return (
    <BingoContextProvider>
      <main className="h-dvh flex flex-col bg-slate-200">
        <div className="w-full h-full flex gap-6 px-8 py-4">
          <div className="w-full h-full overflow-auto">
            <TabelaDeNumeros />
          </div>
          <div className="w-96 sticky flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-4">
              <PainelNumeroDaVez />
              <ButtonSortearNumero />
            </div>
            <div className="flex flex-col gap-4">
              <ButtonEditarNumeros />
              <div className="flex gap-2 items-center justify-between">
                <ButtonReiniciarSorteio />
                <ButtonConfiguracoesBingo />
              </div>
              <ButtonNovoSorteio />
            </div>
          </div>
        </div>
      </main>
    </BingoContextProvider>
  );
}
