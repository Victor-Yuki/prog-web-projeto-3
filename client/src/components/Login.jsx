import React, { useState } from "react";
import axios from "axios";

function Login(props) {
  const [email, setEmail] = useState(""),
    [senha, setSenha] = useState("");
  const [cadEmail, setCadEmail] = useState(""),
    [cadSenha, setCadSenha] = useState("");

  function handleLogin(ev) {
    if (email.length == 0 || senha.length == 0) {
      props.showMessage('Preencha os campos vazios de Login.')
    } else {
      if (senha.length < 5) {
        props.showMessage("A senha deve ter ao menos 5 caracteres.");
      } else {
        axios
          .post("/login", {
            email: email,
            senha: senha
          })
          .then((res) => {
            console.log(res.status);
            if (res.status === 200) {
              props.hideLogin();
              window.location.reload();
            }
          })
          .catch((error) => {
            props.showMessage(error.response.data.message);
          });
      }
    }
    
  }

  function handleCad(ev) {
    ev.preventDefault();

    if (cadEmail.length == 0 || cadSenha.length == 0){
      props.showMessage('Preencha os campos vazios de cadastro.')
    } else {
      if( cadSenha.length < 5) {
        props.showMessage('A senha deve ter ao menos 5 caracteres.');
      } else {
        axios.post('/cadastrar', {
          email: cadEmail,
          senha: cadSenha
        }).then((res) => {
          console.log(res.data.message);
          props.showMessage(res.data.message);
          setCadEmail('');
          setCadSenha('');
        }).catch((err) => {
          props.showMessage(err.response.data.message);
        });
      }
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
