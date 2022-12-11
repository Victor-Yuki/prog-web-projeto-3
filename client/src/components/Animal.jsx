import React from "react";

function Animal({ nome, latim, habitat, url }) {
  if (nome.length > 22) {
    nome = nome.slice(0, 22);
  }
  return (
    <div className="card">
      <p className="card-name">
        <strong>{nome}</strong>
      </p>
      <span className="img-container">
        <img className="card-img" src={url} alt="" />
      </span>

      <div className="card-info">
        <p>{latim}</p>
        <p>{habitat}</p>
      </div>
    </div>
  );
}

export default Animal;
