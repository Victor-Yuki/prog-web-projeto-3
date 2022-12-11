import Animais from "./components/Animais";
import Cabecalho from "./components/Cabecalho";
import Conteudo from "./components/Conteudo";
import Principal from "./components/Principal";
import Rodape from "./components/Rodape";
import "./original.css";
import "./projeto2.css";

export default function App() {
  return (
    <div className="App">
      <Cabecalho />
      <Principal />
      <Animais />
      <Conteudo />
      <Rodape />
    </div>
  );
}
