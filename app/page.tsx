"use client";

import ButtonConfiguracoesBingo from "@/components/button-configuracoes-bingo";
import TabelaDeNumeros from "@/components/tabela-numeros";
import { BingoContextProvider } from "@/components/context/bingo-context";
import PainelNumeroDaVez from "@/components/painel-numero-da-vez";
import ButtonSortearNumero from "@/components/button-sortear-numero";

export default function Home() {
  return (
    <BingoContextProvider>
      <main className="h-screen relative flex flex-col bg-linear-to-b from-slate-100 to-slate-300">
        <div className="flex justify-center gap-6 mx-auto mt-2 mb-4 px-5 py-4">
          <TabelaDeNumeros />
          <div className="flex flex-col gap-4">
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
