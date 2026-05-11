import {

  auth,
  db,

  loginWithGoogle,
  logout,
  addXP

} from "./firebase.js";

import {

  onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

  doc,
  getDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ======================================
// USUÁRIO ATUAL
// ======================================

let currentUser = null;


// ======================================
// BOTÕES
// ======================================

const loginBtn = document.getElementById("loginBtn");

const logoutBtn = document.getElementById("logoutBtn");

const xpTestBtn = document.getElementById("xpTestBtn");


// ======================================
// ÁREA USUÁRIO
// ======================================

const userInfo = document.getElementById("userInfo");

const userName = document.getElementById("userName");

const userLevel = document.getElementById("userLevel");

const xpBar = document.getElementById("xpBar");

const xpText = document.getElementById("xpText");


// ======================================
// LOGIN
// ======================================

loginBtn.addEventListener("click", async () => {

  try {

    await loginWithGoogle();

  } catch (error) {

    console.error("Erro no login:", error);

  }

});


// ======================================
// LOGOUT
// ======================================

logoutBtn.addEventListener("click", async () => {

  try {

    await logout();

  } catch (error) {

    console.error("Erro no logout:", error);

  }

});


// ======================================
// GANHAR XP
// ======================================

xpTestBtn.addEventListener("click", async () => {

  if (currentUser) {

    try {

      // ADICIONA 10 XP

      await addXP(currentUser.uid, 10);

      // ATUALIZA INTERFACE

      await atualizarUsuario(currentUser);

    } catch (error) {

      console.error("Erro ao adicionar XP:", error);

    }

  }

});


// ======================================
// ATUALIZA INTERFACE USUÁRIO
// ======================================

async function atualizarUsuario(user) {

  try {

    // REFERÊNCIA FIRESTORE

    const userRef = doc(db, "users", user.uid);

    // BUSCA DADOS

    const userSnap = await getDoc(userRef);

    // SE EXISTIR

    if (userSnap.exists()) {

      const data = userSnap.data();

      // ======================================
      // NOME
      // ======================================

      userName.textContent = data.nome;

      // ======================================
      // LEVEL
      // ======================================

      userLevel.textContent =
      `Level ${data.level}`;

      // ======================================
      // XP TOTAL
      // ======================================

      const xpTotal = data.xp;

      // ======================================
      // LEVEL ATUAL
      // ======================================

      const levelAtual = data.level;

      // ======================================
      // XP NECESSÁRIO
      // ======================================

      const xpNecessario = 100;

      // ======================================
      // XP INICIAL DO LEVEL
      // ======================================

      const xpInicioLevel =
      (levelAtual - 1) * 100;

      // ======================================
      // XP ATUAL DO LEVEL
      // ======================================

      const xpAtual =
      xpTotal - xpInicioLevel;

      // ======================================
      // TEXTO DA BARRA
      // ======================================

      xpText.textContent =
      `${xpAtual} / ${xpNecessario} XP`;

      // ======================================
      // PORCENTAGEM
      // ======================================

      const porcentagem =
      (xpAtual / xpNecessario) * 100;

      const porcentagemFinal =
      Math.min(porcentagem, 100);

      // ======================================
      // ATUALIZA BARRA
      // ======================================

      xpBar.style.width =
      `${porcentagemFinal}%`;

    }

  } catch (error) {

    console.error("Erro ao atualizar usuário:", error);

  }

}


// ======================================
// OBSERVA LOGIN
// ======================================

onAuthStateChanged(auth, async (user) => {

  // ======================================
  // LOGADO
  // ======================================

  if (user) {

    console.log("Usuário logado!");

    currentUser = user;

    // ESCONDE LOGIN

    loginBtn.style.display = "none";

    // MOSTRA USUÁRIO

    userInfo.style.display = "flex";

    // MOSTRA LOGOUT

    logoutBtn.style.display = "block";

    // MOSTRA BOTÃO XP

    xpTestBtn.style.display = "block";

    // ATUALIZA INTERFACE

    await atualizarUsuario(user);

  }

  // ======================================
  // DESLOGADO
  // ======================================

  else {

    console.log("Usuário deslogado");

    currentUser = null;

    // MOSTRA LOGIN

    loginBtn.style.display = "block";

    // ESCONDE USUÁRIO

    userInfo.style.display = "none";

    // ESCONDE LOGOUT

    logoutBtn.style.display = "none";

    // ESCONDE BOTÃO XP

    xpTestBtn.style.display = "none";

  }

});