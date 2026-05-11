// Importa funções do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ======================================
// CONFIGURAÇÃO DO SEU FIREBASE
// ======================================

const firebaseConfig = {
  apiKey: "AIzaSyDstQICW1xLVitJ0Ifwn-zBd3O3eLM0KUU",
  authDomain: "alemsubs.firebaseapp.com",
  projectId: "alemsubs",
  storageBucket: "alemsubs.firebasestorage.app",
  messagingSenderId: "995915378887",
  appId: "1:995915378887:web:2255df024007d11565cee2",
  measurementId: "G-5K46Z2VEFC"
};

// ======================================
// INICIALIZA FIREBASE
// ======================================

const app = initializeApp(firebaseConfig);

// ======================================
// AUTHENTICATION
// ======================================

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// ======================================
// FIRESTORE DATABASE
// ======================================

const db = getFirestore(app);

// ======================================
// LOGIN COM GOOGLE
// ======================================

async function loginWithGoogle() {

  try {

    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log("Usuário logado:", user);

    // Referência do usuário no banco
    const userRef = doc(db, "users", user.uid);

    // Verifica se usuário já existe
    const userSnap = await getDoc(userRef);

    // Se não existir, cria
    if (!userSnap.exists()) {

    await setDoc(userRef, {

    nome: user.displayName,

    email: user.email,

    xp: 0,

    level: 1,

    criadoEm: new Date(),

    conquistas: [],

    missaoDiaria: {

        videosAssistidos: 0,

        artigosLidos: 0,

        checkinHoje: false

    },

    stats: {

        totalXP: 0,

        loginCount: 1,

        videosAssistidos: 0

    }

    });

      console.log("Usuário criado!");

    } else {

      console.log("Usuário já existe!");

    }

  } catch (error) {

    console.error("Erro no login:", error);

  }

}

// ======================================
// LOGOUT
// ======================================

async function logout() {

  try {

    await signOut(auth);

    console.log("Logout realizado!");

  } catch (error) {

    console.error(error);

  }

}


// ======================================
// GANHAR XP
// ======================================

async function addXP(userId, amount) {

  try {

    const userRef = doc(db, "users", userId);

    // Soma XP
    await updateDoc(userRef, {
      xp: increment(amount)
    });

    console.log(`+${amount} XP`);

  } catch (error) {

    console.error(error);

  }

}

// ======================================
// VERIFICAR USUÁRIO LOGADO
// ======================================

onAuthStateChanged(auth, (user) => {

  if (user) {

    console.log("Usuário autenticado:", user.displayName);

  } else {

    console.log("Nenhum usuário logado");

  }

});

// ======================================
// EXPORTA FUNÇÕES
// ======================================

export {

  auth,
  db,

  loginWithGoogle,
  logout,
  addXP

};