import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDFKZ4NypQjASAXRxYINQg0o1kI_yGUEYI",
  authDomain: "electionflow-bm.firebaseapp.com",
  projectId: "electionflow-bm",
  storageBucket: "electionflow-bm.firebasestorage.app",
  messagingSenderId: "234620844856",
  appId: "1:234620844856:web:11a1ce1757808abbee5fcd",
  measurementId: "G-ELMP1BGPDS"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

export const initAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};
