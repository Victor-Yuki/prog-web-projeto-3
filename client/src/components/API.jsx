import React, { useEffect, useState } from "react";
import Animal from "./Animal";
import axios from "axios";

function API(props) {
  const [numAnimais, setNumAnimais] = useState(0),
    [listAnimais, setListAnimais] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('/pato')
  //     .then((res) => {
  //       console.log(res);
  //     });
  // }, []);

  function gerarAnimal() {
    if (numAnimais <= 0) {
      //alert("O número deve ser maior que 0.");
      props.showMessage("O número deve ser maior que 0.");
    } else if (numAnimais > 10) {
      //alert("O número de animais está limitado em 10 por procura.");
      props.showMessage("O número de animais está limitado em 10 por procura.");
    } else {
      let endpoint = "https://zoo-animal-api.herokuapp.com/animals/rand/";
      axios
        .get(endpoint + numAnimais)
        .then((res) => {
          //console.log(res.data);
          listarAnimais(res.data);
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
        nome: animais[i].name,
        latim: animais[i].latin_name,
        habitat: animais[i].habitat,
        imagem: animais[i].image_link
      };
      new_lista.push(new_animal);
    }
    setListAnimais([...listAnimais, ...new_lista]);
    console.log("lista" + listAnimais);
  }

  return (
    <div hidden={props.hidden}>
      <div className="api">
        <div className="input-field">
          <input
            type="number"
            value={numAnimais}
            onChange={(ev) => {
              setNumAnimais(ev.target.value);
            }}
          />
          <button class="botao" onClick={gerarAnimal}>
            GERAR
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
