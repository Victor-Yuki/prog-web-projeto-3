import axios from "axios";
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
    async function checkAuth() {
      console.log('checkauth');
      axios.get('/auth')
        .then((res) => {
          if (res.data.auth == true)
            hideLogin();
          else 
            showLogin();
        })
        .catch((e) => {
          console.log('Falha ao tentar verificar a autenticação');
        });
    }
    checkAuth();
  }, []);

  

  function hideLogin() {
    setLoginHidden(true);
    setAPIHidden(false);
  }

  function showLogin() {
    setLoginHidden(false);
    setAPIHidden(true);
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
