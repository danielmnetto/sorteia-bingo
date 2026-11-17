import { useEffect, useState } from "react";
import { useBingoContext } from "../context/bingo-context";

const STORAGE_KEY_NUMEROS = "sorteia-bingo-numeros";
const STORAGE_KEY_CONFIG_LOCAL = "sorteia-bingo-config";

const inicializarFuncoesLocalStorage = () => {
  const {
    minNumbers,
    maxNumbers,
    numerosSorteados,
    numeroSorteado,
    qtdeNumeros,
    vivaVozAtivada,
    setNumerosSorteados,
    setNumeroSorteado,
    setQtdeNumeros,
    setVivaVozAtivada,
  } = useBingoContext();

  const [dadosCarregados, setDadosCarregados] = useState<boolean>(false);

  const salvarNumerosSorteadosNoStorage = () => {
    const data = {
      numerosSorteados,
      numeroSorteado,
    };
    localStorage.setItem(STORAGE_KEY_NUMEROS, JSON.stringify(data));
  };

  const salvarConfigNoStorage = () => {
    const config = {
      qtdeNumeros,
      vivaVozAtivada,
    };
    localStorage.setItem(STORAGE_KEY_CONFIG_LOCAL, JSON.stringify(config));
  };

  const carregarNumerosSorteadosDoStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY_NUMEROS);

    if (data) {
      const { numerosSorteados, numeroSorteado } = JSON.parse(data);
      setNumerosSorteados(numerosSorteados);
      setNumeroSorteado(numeroSorteado);
    }
  };

  const carregarConfigDoStorage = () => {
    const config = localStorage.getItem(STORAGE_KEY_CONFIG_LOCAL);

    if (config) {
      let { qtdeNumeros, vivaVozAtivada } = JSON.parse(config);

      qtdeNumeros = Math.min(Math.max(qtdeNumeros, minNumbers), maxNumbers);
      vivaVozAtivada = Boolean(vivaVozAtivada);

      setQtdeNumeros(qtdeNumeros);
      setVivaVozAtivada(vivaVozAtivada);
    }
  };

  useEffect(() => {
    carregarNumerosSorteadosDoStorage();
    carregarConfigDoStorage();
    setDadosCarregados(true);
  }, []);

  useEffect(() => {
    if (!dadosCarregados) return;
    salvarNumerosSorteadosNoStorage();
    salvarConfigNoStorage();
  }, [
    dadosCarregados,
    numerosSorteados,
    numeroSorteado,
    qtdeNumeros,
    vivaVozAtivada,
  ]);
};

export default inicializarFuncoesLocalStorage;
