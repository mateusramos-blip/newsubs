// Espera o HTML carregar completamente
document.addEventListener("DOMContentLoaded", function () {

  // ===== TÍTULO =====
  const titulo = document.querySelector("h1");

  if (titulo) {
    titulo.addEventListener("click", () => {
      titulo.textContent = "Você clicou no título!";
    });
  }

  // ===== CONSOLE =====
  console.log("O site carregou com sucesso!");

  // ===== CONTADOR (local) =====
  let visitas = localStorage.getItem("visitas");

  if (!visitas) {
    visitas = 1;
  } else {
    visitas = parseInt(visitas) + 1;
  }

  localStorage.setItem("visitas", visitas);

  const contador = document.getElementById("contador");

  if (contador) {
    contador.innerText = visitas;
  }

  // ===== CHATBOT =====
  function responder() {
    let inputEl = document.getElementById("input");
    let chat = document.getElementById("chatbox");

    if (!inputEl || !chat) return; // segurança

    let input = inputEl.value.toLowerCase().trim();

    if (input === "") return;

    chat.innerHTML += `<p class='user'>Você: ${input}</p>`;

    let resposta = "Não entendi 😅";

    if (input.includes("oi") || input.includes("olá") || input.includes("ola")) {
      resposta = `Olá! 👋

Posso te ajudar com algumas informações:

👉 Digite "horário" para ver quando abrimos  
👉 Digite "preço" para saber valores  
👉 Digite "contato" para falar com a gente`;
    } else if (input.includes("horário") || input.includes("horario")) {
      resposta = "Funcionamos das 8h às 18h.";
    } else if (input.includes("preço") || input.includes("preco")) {
      resposta = "Os preços variam, me diga o produto 😉";
    } else if (input.includes("contato")) {
      resposta = "Nosso WhatsApp é (xx) xxxx-xxxx";
    }

    chat.innerHTML += `<p class='bot'>Bot: ${resposta}</p>`;

    inputEl.value = "";
    chat.scrollTop = chat.scrollHeight;
  }

  // deixa a função global (pro botão funcionar)
  window.responder = responder;

  // ===== ENTER PRA ENVIAR =====
  const inputCampo = document.getElementById("input");

const inputCampo = document.getElementById("input");

if (inputCampo && typeof responder === "function") {
  inputCampo.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      responder();
    }
  });
}

});
