// Seleciona o título
const titulo = document.querySelector("h1");

if (titulo) {
    titulo.addEventListener("click", () => {
        titulo.textContent = "Você clicou no título!";
    });
}

// Mensagem no console
console.log("O site carregou com sucesso!");

// Alerta inicial
alert("Bem-vindo ao meu site!");

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
