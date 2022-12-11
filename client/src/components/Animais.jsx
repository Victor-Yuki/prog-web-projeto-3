import React, { useEffect, useState } from "react";
import API from "./API";
import Janela from "./Janela";
import Login from "./Login";

function Animais() {
  const [isLoginHidden, setLoginHidden] = useState(false),
    [isAPIHidden, setAPIHidden] = useState(true),
    [isJanelaHidden, setJanelaHidden] = useState(true),
    [text, setText] = useState("");

  useEffect(() => {
    var logado = localStorage.getItem("logado");
    if (logado) {
      hideLogin();
    }
  }, []);

  function hideLogin() {
    setLoginHidden(true);
    setAPIHidden(false);
  }

  function showMessage(msg) {
    setJanelaHidden(false);
    setText(msg);
  }

  function hideJanela() {
    setJanelaHidden(true);
  }

  return (
    <div className="animais">
      <Login
        hidden={isLoginHidden}
        hideLogin={hideLogin}
        showMessage={showMessage}
      />
      <API hidden={isAPIHidden} showMessage={showMessage} />
      <Janela hidden={isJanelaHidden} text={text} hideJanela={hideJanela} />
    </div>
  );
}

export default Animais;
