import React from "react";

function Janela(props) {
  return (
    <div hidden={props.hidden}>
      <div className="fundo"></div>
      <div className="janela">
        <p className="mensagem">{props.text}</p>
        <button className="botao botao-fechar" onClick={props.hideJanela}>
          fechar
        </button>
      </div>
    </div>
  );
}

export default Janela;
