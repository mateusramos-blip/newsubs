console.log("O site carregou com sucesso!");


// CONTADOR DE VISITAS
let visitas = localStorage.getItem("visitas");

if (!visitas) {
    visitas = 1;
} else {
    visitas = parseInt(visitas) + 1;
}

localStorage.setItem("visitas", visitas);

function atualizarContador() {
    const contador = document.getElementById("contador");

    if (contador) {
        contador.innerText = visitas;
    }
}

atualizarContador();


// NAVEGAÇÃO
const links = document.querySelectorAll("[data-page]");
const conteudo = document.getElementById("conteudo-principal");

async function carregarPagina(nomePagina) {
    try {
        const resposta = await fetch(`paginas/${nomePagina}.html`);
        const html = await resposta.text();

        conteudo.innerHTML = html;

        atualizarContador();
        ativarChat();
        ativarVoltar();

    } catch (erro) {
        conteudo.innerHTML = "<h2>Erro ao carregar página</h2>";
        console.error(erro);
    }
}


// BOTÃO VOLTAR
function ativarVoltar() {
    const btnVoltar = document.getElementById("btnVoltar");

            if (btnVoltar) {
                btnVoltar.addEventListener("click", () => {
                    location.href = "index.html";
                });
            }
}


// CHAT
function ativarChat() {
    const input = document.getElementById("input");

    if (!input) return;

    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            responder();
        }
    });
}

function responder() {
    const inputEl = document.getElementById("input");
    const chat = document.getElementById("chatbox");

    if (!inputEl || !chat) return;

    const texto = inputEl.value.toLowerCase().trim();

    if (texto === "") return;

    chat.innerHTML += `<p class="user">Você: ${texto}</p>`;

    let resposta = "Não entendi";

    if (texto.includes("oi") || texto.includes("olá") || texto.includes("ola")) {
        resposta = "Olá! Digite horário, preço ou contato.";
    } else if (texto.includes("horário") || texto.includes("horario")) {
        resposta = "Funcionamos das 8h às 18h.";
    } else if (texto.includes("preço") || texto.includes("preco")) {
        resposta = "Os preços variam.";
    } else if (texto.includes("contato")) {
        resposta = "Nosso WhatsApp é (xx) xxxx-xxxx";
    }

    chat.innerHTML += `<p class="bot">Bot: ${resposta}</p>`;

    inputEl.value = "";
    chat.scrollTop = chat.scrollHeight;
}


// MENU
links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const pagina = link.dataset.page;

        carregarPagina(pagina);

        history.pushState({}, "", `#${pagina}`);
    });
});