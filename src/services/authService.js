// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export async function registerWithEmail(email, password, displayName = "") {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    // set displayName on profile
    await updateProfile(userCredential.user, { displayName });
  }
  return userCredential.user;
}

export async function loginWithEmail(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function logout() {
  await signOut(auth);
}

export async function sendResetEmail(email) {
  await sendPasswordResetEmail(auth, email);
}

// Google login popup
export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Setup reCAPTCHA verifier for phone auth.
 * Ensure there is a <div id="recaptcha-container"></div> in your DOM.
 */
export function setupRecaptchaInvisible() {
  // reuse if already set
  if (window.recaptchaVerifier) return window.recaptchaVerifier;
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved - will proceed with signInWithPhoneNumber
      },
    },
    auth
  );
  return window.recaptchaVerifier;
}

/**
 * Start phone sign-in (sends OTP)
 * phoneNumber must be in E.164 format e.g. +947XXXXXXXX
 */
export async function signInWithPhone(phoneNumber) {
  const verifier = setupRecaptchaInvisible();
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
  // confirmationResult.confirm(code) will be used to complete sign in
  return confirmationResult;
}
