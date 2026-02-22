import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const MINIMO_QTDE_NUMEROS = 5;
const MAXIMO_QTDE_NUMEROS = 500;
const QTDE_PADRAO_NUMEROS = 75;

type BingoContextType = {
  minNumbers: number;
  maxNumbers: number;
  defaultNumbers: number;
  numeroSorteado: number | null;
  setNumeroSorteado: React.Dispatch<React.SetStateAction<number | null>>;
  numerosSorteados: Array<number>;
  setNumerosSorteados: React.Dispatch<React.SetStateAction<Array<number>>>;
  novaQtdeNumeros: number;
  setNovaQtdeNumeros: React.Dispatch<React.SetStateAction<number>>;
  qtdeNumeros: number;
  setQtdeNumeros: React.Dispatch<React.SetStateAction<number>>;
  vivaVozAtivada: boolean;
  setVivaVozAtivada: React.Dispatch<React.SetStateAction<boolean>>;
  pegarNumeroAleatorio: (minimo: number, maximo: number) => number;
  falarNumeroVozAlta: (numero: number) => void;
  sortearNumero: () => void;
  reiniciarSorteio: () => void;
  alternarVivaVoz: (estado: boolean) => void;
  confirmarReiniciarSorteio: () => void;
  todosNumerosForamSorteados: boolean;
  configBingoAberto: boolean;
  setConfigBingoAberto: Dispatch<SetStateAction<boolean>>;
};

const BingoContext = createContext<BingoContextType | null>(null);

const useBingoContext = () => {
  const context = useContext(BingoContext);
  if (!context) {
    throw new Error(
      "useBingoContext must be used within a BingoContextProvider",
    );
  }
  return context;
};

const BingoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numeroSorteado, setNumeroSorteado] = useState<number | null>(null);
  const [numerosSorteados, setNumerosSorteados] = useState<Array<number>>([]);
  const [novaQtdeNumeros, setNovaQtdeNumeros] =
    useState<number>(QTDE_PADRAO_NUMEROS);
  const [qtdeNumeros, setQtdeNumeros] = useState<number>(novaQtdeNumeros);
  const [vivaVozAtivada, setVivaVozAtivada] = useState<boolean>(false);
  const [configBingoAberto, setConfigBingoAberto] = useState<boolean>(false);

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
    setConfigBingoAberto(false);
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

  return (
    <BingoContext.Provider
      value={{
        minNumbers: MINIMO_QTDE_NUMEROS,
        maxNumbers: MAXIMO_QTDE_NUMEROS,
        defaultNumbers: QTDE_PADRAO_NUMEROS,
        numeroSorteado,
        setNumeroSorteado,
        numerosSorteados,
        setNumerosSorteados,
        novaQtdeNumeros,
        setNovaQtdeNumeros,
        qtdeNumeros,
        setQtdeNumeros,
        vivaVozAtivada,
        setVivaVozAtivada,
        pegarNumeroAleatorio,
        falarNumeroVozAlta,
        sortearNumero,
        reiniciarSorteio,
        alternarVivaVoz,
        confirmarReiniciarSorteio,
        todosNumerosForamSorteados,
        configBingoAberto,
        setConfigBingoAberto,
      }}
    >
      {children}
    </BingoContext.Provider>
  );
};

export { BingoContext, BingoContextProvider, useBingoContext };
