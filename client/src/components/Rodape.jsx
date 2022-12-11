import React from "react";

function Rodape() {
  return (
    <footer>
      <div class="footer">
        <span>2022 © WhatsApp LLC</span>
        <button type="button" name="button">
          Privacidade e Termos{" "}
          <svg width="8" height="13" fill="none" class="link-arrow">
            <path
              d="M7.41 1.91L2.83 6.5l4.58 4.59L6 12.5l-6-6 6-6 1.41 1.41z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
    </footer>
  );
}

export default Rodape;
