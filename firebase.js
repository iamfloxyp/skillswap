import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCsbdSft6-wuwipsRFCcwALku8t0-028cw",
    authDomain: "skillshare-36e04.firebaseapp.com",
    projectId: "skillshare-36e04",
    storageBucket: "skillshare-36e04.appspot.com",
    messagingSenderId: "895963839368",
    appId: "1:895963839368:web:fffc971ad85d6e8638583d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle sign up
async function signUpWithEmail(email, password, fullName) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);
        alert("A verification email has been sent. Please verify your email to complete the sign-up process.");
        window.location.href = 'login.html';
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Function to handle login
async function loginWithEmail(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = 'profile.html';
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Function to handle password reset
async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent! Check your inbox.");
        window.location.href = 'login.html';
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Event listeners for the forms
document.addEventListener('DOMContentLoaded', () => {
    // Sign Up Form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            await signUpWithEmail(email, password, name);
        });
    }

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            await loginWithEmail(email, password);
        });
    }

    // Forget Password Form
    const forgetPasswordForm = document.getElementById('forget-password-form');
    if (forgetPasswordForm) {
        forgetPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('forget-email').value;
            await resetPassword(email);
        });
    }
});

// Function to toggle password visibility
window.togglePassword = function(passwordFieldId) {
    const passwordField = document.getElementById(passwordFieldId);
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
};