import React, { useEffect, useState } from "react";
import Animal from "./Animal";
import axios from "axios";

function API(props) {
  const [numAnimais, setNumAnimais] = useState(0),
    [listAnimais, setListAnimais] = useState([]);

  const [nome, setNome] = useState(''),
    [url, setUrl] = useState(''),
    [habitat, setHabitat] = useState(''),
    [latim, setLatim] = useState(''),
    [hideAdmin, setHideAdmin] = useState(true);


  useEffect(() => {
    async function checkAdmin() {
      axios.get('/admin')
        .then((res) => {
          if (res.data.admin == true) {
            setHideAdmin(false);
          }
        })
        .catch((e) => {
          setHideAdmin(true);
          console.log(hideAdmin);
          console.log(e);
          console.log('Falha ao tentar verificar o admin.')
        });
    }

    checkAdmin();
  }, []);

  function addAnimal() {
    if (nome.length == 0 || url.length == 0 || latim.length == 0 || habitat.length == 0) {
      props.showMessage('Preencha os campos vazios de iserir animal.')
    } else {
      axios.post('/addAnimal', {
        nome: nome,
        url: url,
        latim: latim,
        habitat: habitat
      }).then((res) => {
        if (res.status == 200) {
          setNome('');
          setUrl('');
          setHabitat('');
          setLatim('');
        }
      })
        .catch((e) => {
          console.log(e);
          console.log('Erro em adicionar um animal')
        })
    }
  }

  function gerarAnimal() {
    if (numAnimais <= 0) {
      //alert("O número deve ser maior que 0.");
      props.showMessage("O número deve ser maior que 0.");
    } else if (numAnimais > 10) {
      //alert("O número de animais está limitado em 10 por procura.");
      props.showMessage("O número de animais está limitado em 10 por procura.");
    } else {
      //let endpoint = "https://zoo-animal-api.herokuapp.com/animals/rand/";
      axios
        .post('/getAnimais', { num: numAnimais })
        .then((res) => {
          //console.log(res.data);
          if (res.status == 200)
            listarAnimais(res.data.animais);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function listarAnimais(animais) {
    console.log(animais);
    const new_lista = [];
    for (var i = 0; i < animais.length; i++) {
      let new_animal = {
        nome: animais[i].nome,
        latim: animais[i].latim,
        habitat: animais[i].habitat,
        imagem: animais[i].url
      };
      new_lista.push(new_animal);
    }
    setListAnimais([...listAnimais, ...new_lista]);
    console.log("lista" + listAnimais);
  }

  return (
    <div hidden={props.hidden}>
      <div className="api">
        <div hidden={hideAdmin}>
          <h1>Inserir</h1>
          <div className="admin-box">

            <div className='input-box'>
              <input className="admin-input" type='text' placeholder="nome" value={nome} onChange={(ev) => { setNome(ev.target.value) }} />
              <input className="admin-input" type='text' placeholder="url" value={url} onChange={(ev) => { setUrl(ev.target.value) }} />
              <input className="admin-input" type='text' placeholder="latim" value={latim} onChange={(ev) => { setLatim(ev.target.value) }} />
              <input className="admin-input" type='text' placeholder="habitat" value={habitat} onChange={(ev) => { setHabitat(ev.target.value) }} />
            </div>
            <button className="botao" onClick={addAnimal}>ADD</button>
          </div>
        </div>
        <h1>Buscar</h1>
        <div className="input-field">
          <input
            className="api-input"
            type="number"
            value={numAnimais}
            onChange={(ev) => {
              setNumAnimais(ev.target.value);
            }}
          />
          <button class="botao" onClick={gerarAnimal}>
            GERAR
          </button>
          <button class="botao" onClick={() => { axios.get('/logout'); window.location.reload() }}>
            LOGOUT
          </button>
        </div>
        <div className="lista-animais">
          {listAnimais.map((animal, index) => (
            <div key={index}>
              <Animal
                nome={animal.nome}
                latim={animal.latim}
                habitat={animal.habitat}
                url={animal.imagem}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default API;
