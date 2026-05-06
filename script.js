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

// ===== MOSTRAR CONTADOR =====
const contador = document.getElementById("contador");

if (contador) {
  contador.innerText = visitas;
}
