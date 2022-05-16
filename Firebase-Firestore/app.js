import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore , collection , getDocs,addDoc,deleteDoc,doc} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
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
const db = getFirestore(app)
const table = document.getElementById("table") 
const form = document.getElementById("addForm")

async function getEmployees(db){
    const empCol = collection(db,'employees')
    const empSnapshot = await getDocs(empCol)
    return empSnapshot
}

function showData(employee){
    const row = table.insertRow(-1)
    const nameCol = row.insertCell(0)
    const ageCol = row.insertCell(1)
    const deleteCol = row.insertCell(2)
    nameCol.innerHTML = employee.data().name
    ageCol.innerHTML = employee.data().age

    //สร้างปุ่มลบ
    let btn =document.createElement('button')
    btn.textContent="ลบข้อมูล"
    btn.setAttribute('class','btn btn-danger')
    btn.setAttribute('data-id',employee.id)
    deleteCol.appendChild(btn)
    btn.addEventListener('click',(e)=>{
        let id = e.target.getAttribute('data-id');
        deleteDoc(doc(db,'employees',id))
    })
}

//ดึงกลุ่ม document
const data = await getEmployees(db)
data.forEach(employee=>{
    showData(employee)
})

//ดึงข้อมูลจากแบบฟอร์ม
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    addDoc(collection(db,'employees'),{
        name:form.name.value,
        age:form.age.value
    })
    form.name.value=""
    form.age.value=""
    alert("บันทึกข้อมูลเรียบร้อย")
})
