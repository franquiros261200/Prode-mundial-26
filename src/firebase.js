import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZ2ijjaotfBxIFFGnG2fwYi4NTYTeTKfQ",
  authDomain: "prode-mundial-202.firebaseapp.com",
  projectId: "prode-mundial-202",
  storageBucket: "prode-mundial-202.firebasestorage.app",
  messagingSenderId: "641198744773",
  appId: "1:641198744773:web:e2ff6ef13c61e5739a7cac"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function dbGet(key) {
  try {
    const snap = await getDoc(doc(db, "prode", key));
    return snap.exists() ? snap.data().value : null;
  } catch (e) {
    console.error("DB get:", e);
    return null;
  }
}

export async function dbSet(key, value) {
  try {
    await setDoc(doc(db, "prode", key), { value, updatedAt: Date.now() });
  } catch (e) {
    console.error("DB set:", e);
  }
}
