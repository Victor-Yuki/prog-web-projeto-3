import React, { useState } from "react";
import axios from "axios";

function Login(props) {
  const [email, setEmail] = useState(""),
    [senha, setSenha] = useState("");

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

  return (
    <div hidden={props.hidden}>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="eve.holt@reqres.in"
          onChange={(ev) => setEmail(ev.target.value)}
          minLength={3}
          required={true}
        />
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          onChange={(ev) => setSenha(ev.target.value)}
          minLength={5}
          required={true}
        />
        <button type="submit" class="botao" onClick={handleLogin}>
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Login;
