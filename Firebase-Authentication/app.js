import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signOut,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyA7-zewvkgi7TSlJ1Q0YwiPtDENaEKXGkU",
  authDomain: "basic-firebase-web.firebaseapp.com",
  projectId: "basic-firebase-web",
  storageBucket: "basic-firebase-web.appspot.com",
  messagingSenderId: "658042343144",
  appId: "1:658042343144:web:664ff1587e79b904c0035d",
  measurementId: "G-KJ9K42ZHNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const form = document.getElementById("registerForm")
const formarea = document.getElementById("form-area")
const profile = document.getElementById("profile")
const welcome = document.getElementById("welcome")
const logout=document.getElementById("logout")
const loginForm = document.getElementById("loginForm")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const email = form.email.value
    const password = form.password.value
    createUserWithEmailAndPassword(auth,email,password)
    .then((result)=>{
        alert("สร้างบัญชีผู้ใช้เรียบร้อย")
    }).catch((error)=>{
        alert(error.message)
    })
})

onAuthStateChanged(auth,(user)=>{
    //login
    if(user){
        profile.style.display="block"
        formarea.style.display="none"
        welcome.innerText=`ยินดีต้อนรับ ${user.email}`
    }else{
        profile.style.display="none"
        formarea.style.display="block"
    }
})
logout.addEventListener("click",(e)=>{
    signOut(auth).then(()=>{
        alert("ออกจากระบบเรียบร้อย")
    }).catch((error)=>{
        alert(error.message)
    })
})

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const email = loginForm.email.value
    const password = loginForm.password.value
    signInWithEmailAndPassword(auth,email,password)
    .then((result)=>{
        alert("ลงชื่อเข้าใช้เรียบร้อย")
    }).catch((error)=>{
        alert(error.message)
    })
})