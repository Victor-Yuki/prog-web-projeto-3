import React from "react";

function Conteudo() {
  return (
    <div class="contents">
      <section class="wa-business flex-content">
        <h2>Aplicativo WhatsApp Business</h2>
        <p>
          O{" "}
          <a href="#" class="text-link">
            WhatsApp Business
          </a>{" "}
          é um aplicativo gratuito e desenvolvido para atender às necessidades
          das pequenas empresas. Crie um catálogo para exibir seus produtos e
          serviços. Interaja facilmente com seus clientes usando recursos para
          automatizar, classificar e responder rapidamente a mensagens.
        </p>
        <p>
          O WhatsApp também pode ajudar empresas de médio e grande porte a
          oferecer atendimento e enviar notificações importantes aos clientes.
          Saiba mais sobre a{" "}
          <a href="#" class="text-link">
            API do WhatsApp Business.
          </a>
        </p>

        <img
          src="images/whatsapp-phone-2.png"
          alt="smartphone com whatsapp business"
        />
      </section>
      <section class="wa-seguranca flex-content">
        <img src="images/seguranca.png" alt="uma mensagem" />
        <h4>PROTEGIDO COM A CRIPTOGRAFIA DE PONTA A PONTA</h4>
        <h2>Segurança padrão</h2>
        <p>
          Alguns de seus momentos mais importantes são compartilhados no
          WhatsApp. Por essa razão, implementamos a criptografia de ponta a
          ponta nas últimas versões do nosso aplicativo. Com a proteção da
          criptografia de ponta a ponta, suas mensagens e chamadas permanecem
          seguras, e somente você e a pessoa com quem você está se comunicando
          conseguem ler ou ouvi-las. Ninguém mais conseguirá, nem mesmo o
          WhatsApp.
        </p>
      </section>
    </div>
  );
}

export default Conteudo;
