// Seleciona o título
const titulo = document.querySelector("h1");

if (titulo) {
    titulo.addEventListener("click", () => {
        titulo.textContent = "Você clicou no título!";
    });
}

// Mensagem no console
console.log("O site carregou com sucesso!");

// Contador de visitas
let visitas = localStorage.getItem("visitas");

if (!visitas) {
    visitas = 1;
} else {
    visitas = parseInt(visitas) + 1;
}

localStorage.setItem("visitas", visitas);

// Exibir na tela (se existir elemento)
const contador = document.getElementById("contador");

if (contador) {
    contador.innerText = visitas;
}

// Codigo pro Chatbot
function responder() {
  let inputEl = document.getElementById("input");
  let chat = document.getElementById("chatbox");

  let input = inputEl.value.toLowerCase().trim();

  if (input === "") return; // evita enviar vazio

  chat.innerHTML += "<p class='user'>Você: " + input + "</p>";

  let resposta = "Não entendi 😅";

if (input.includes("oi") || input.includes("olá") || input.includes("ola") || input.includes("Oi") || input.includes("Olá") || input.includes("Ola")) {
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

  chat.innerHTML += "<p class='bot'>Bot: " + resposta + "</p>";

  inputEl.value = "";
  chat.scrollTop = chat.scrollHeight;
}

// Enviar com ENTER
document.getElementById("input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    responder();
  }
});