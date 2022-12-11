import React from "react";

function Cabecalho() {
  return (
    <nav>
      <div class="navbar">
        <a href="#" class="logo-lg">
          <img src="images/whatsapp-logo-large.svg" alt="whatsapp logo" />
        </a>
        <a href="#" class="logo-md">
          <img src="images/whatsapp-logo-medium.svg" alt="whatsapp logo" />
        </a>

        <a href="#" class="menu">
          <img src="images/menu.png" alt="menu" />
        </a>

        <div class="nav-items">
          <a href="#">WHATSAPP WEB</a>
          <a href="#">RECURSOS</a>
          <a href="#">DOWNLOAD</a>
          <a href="#">SEGURANÇA</a>
          <a href="#">CENTRAL DE AJUDA</a>
          <a href="#" id="ultimo-item">
            <img class="globe-img" src="images/globo128.png" alt="" />

            <span class="text-lang">PT (BR)</span>
            <img src="images/triangulo.png" alt="triangulo" class="triangulo" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Cabecalho;
