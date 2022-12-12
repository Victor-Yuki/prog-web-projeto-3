import React, { useState } from "react";
import axios from "axios";

function Login(props) {
  const [email, setEmail] = useState(""),
    [senha, setSenha] = useState("");
  const [cadEmail, setCadEmail] = useState(""),
    [cadSenha, setCadSenha] = useState("");

  function handleLogin(ev) {
    ev.preventDefault();
    if (senha.length < 5) {
      props.showMessage("A senha deve ter ao menos 5 caracteres.");
    } else {
      axios
        .post("https://reqres.in/api/login", {
          email: email,
          password: senha
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem("logado", true);
            props.hideLogin();
          }
        })
        .catch((error) => {
          console.error(error);
          props.showMessage("E-mail inválido.\ntente usar: eve.holt@reqres.in");
        });
    }
  }

  function handleCad(ev) {
    ev.preventDefault();
    if( cadSenha.length < 5) {
      props.showMessage('A senha deve ter ao menos 5 caracteres.');
    } else {
      axios.post('/cadastrar', {
        email: cadEmail,
        senha: cadSenha
      }).then((res) => {
        console.log(res.data);
      });
    }
  }

  return (
    <div hidden={props.hidden}>
      <div>
        <label htmlFor="login-email">E-mail</label>
        <input
          id="login-email"
          type="email"
          onChange={(ev) => setEmail(ev.target.value)}
          minLength={3}
          required={true}
        />
        <label htmlFor="login-senha">Senha</label>
        <input
          id="login-senha"
          type="password"
          onChange={(ev) => setSenha(ev.target.value)}
          minLength={5}
          required={true}
        />
        <button class="botao" onClick={handleLogin}>LOGIN</button>
      </div>
      <hr></hr>
      <div>
        <label htmlFor="cad-email">E-mail</label>
        <input
          id="cad-email"
          type="email"
          onChange={(ev) => setCadEmail(ev.target.value)}
          minLength={3}
          required={true}
        />
        <label htmlFor="cad-senha">Senha</label>
        <input
          id="cad-senha"
          type="password"
          onChange={(ev) => setCadSenha(ev.target.value)}
          minLength={5}
          required={true}
        />
        <button type="submit" class="botao" onClick={handleCad}>CADASTRAR</button>
      </div>
    </div>
  );
}

export default Login;
