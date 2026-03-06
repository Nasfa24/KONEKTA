// firebase-config.js

// Import library Firebase inti
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// IMPORT APP CHECK (Keamanan tak kasat mata reCAPTCHA v3)
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";

// Konfigurasi Project Firebase KONEKTA
const firebaseConfig = {
    apiKey: "AIzaSyA2nV-dKXEl-5ui0WQienkFiQ-XfugDzPE",
    authDomain: "matur-suwon.firebaseapp.com",
    projectId: "matur-suwon",
    storageBucket: "matur-suwon.firebasestorage.app",
    messagingSenderId: "293712183178",
    appId: "1:293712183178:web:c9a8ab1e96e1fd68a91273"
};

// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);

// INISIALISASI APP CHECK (Menggunakan Site Key KONEKTA)
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LdoHIIsAAAAAHffNopoxKMz_FtFZ0FpPHPCUgiE'),
  isTokenAutoRefreshEnabled: true // Otomatis perbarui token agar relawan tidak tiba-tiba logout
});

// Inisialisasi Firestore Database
const db = getFirestore(app);

// Export db agar bisa dipakai di halaman lain (index, member, gm)
export { db };