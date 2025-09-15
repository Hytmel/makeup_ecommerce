import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Optionally load Analytics only in the browser to avoid SSR issues
let analytics

// Read from env if present; otherwise fallback to provided config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBp6UEWiVuzpR7oaLiQ1FUe6Dp-mh3oHLM",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ecommerce-makeup-231db.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ecommerce-makeup-231db",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ecommerce-makeup-231db.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "819270253633",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:819270253633:web:8019de8e318d5b9dfd5ac0",
  // measurementId is optional
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-HLY3WFH4L4",
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

// Export core SDKs
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Guard analytics in the browser
if (typeof window !== "undefined" && firebaseConfig.measurementId) {
  import("firebase/analytics").then(({ getAnalytics }) => {
    try {
      analytics = getAnalytics(app)
    } catch (_) {
      // ignore if not supported (e.g., in unsupported environments)
    }
  })
}

export { app, auth, db, storage, analytics }
