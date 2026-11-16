"use client";

import ButtonConfiguracoesBingo from "@/components/button-configuracoes-bingo";
import TabelaDeNumeros from "@/components/tabela-numeros";
import { BingoContextProvider } from "@/components/context/bingo-context";
import PainelNumeroDaVez from "@/components/painel-numero-da-vez";
import ButtonSortearNumero from "@/components/button-sortear-numero";

export default function Home() {
  return (
    <BingoContextProvider>
      <main className="h-screen flex flex-col bg-slate-200">
        <div className="w-full h-full flex gap-6 px-6 py-5">
          <div className="w-full h-full overflow-auto">
            <TabelaDeNumeros />
          </div>
          <div className="w-96 sticky flex flex-col gap-4">
            <PainelNumeroDaVez />
            <div className="h-full flex flex-col gap-4">
              <ButtonSortearNumero />
              <ButtonConfiguracoesBingo />
            </div>
          </div>
        </div>
      </main>
    </BingoContextProvider>
  );
}
