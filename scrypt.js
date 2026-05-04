const titulo = document.querySelector("h1");

titulo.addEventListener("click", () => {
  titulo.textContent = "Você clicou no título!";
});

console.log("O site carregou com sucesso!");

alert("Bem-vindo ao meu site!");

let visitas = localStorage.getItem("visitas");

if (!visitas) {
    visitas = 1;
} else {
    visitas = parseInt(visitas) + 1;
}

localStorage.setItem("visitas", visitas);

document.getElementById("contador").innerText = visitas;

fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });