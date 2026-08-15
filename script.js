const firebaseConfig = {
  apiKey: "AIzaSyBcOoGJTnPZg8wrB_BRb_3GQFtaG_6BEWo",
  authDomain: "kpl-2026.firebaseapp.com",
  projectId: "kpl-2026",
  storageBucket: "kpl-2026.firebasestorage.app",
  messagingSenderId: "660219856516",
  appId: "1:660219856516:web:cb23a915081b9e5c6aa4d1",
  measurementId: "G-VZNHS6KDMR"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function(event) {
  
  event.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const age = Number(document.getElementById("age").value);
  const village = document.getElementById("village").value.trim();
  const role = document.getElementById("role").value;
  const batting = document.getElementById("batting").value;
  const bowling = document.getElementById("bowling").value;
  const jersey = document.getElementById("jersey").value;
  
  if (!/^[0-9]{10}$/.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }
  
  try {
    
    const playerData = {
      name: name,
      mobile: mobile,
      age: age,
      village: village,
      role: role,
      batting: batting,
      bowling: bowling,
      jersey: jersey,
      status: "Registered",
      registeredAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection("players").add(playerData);
    
    successMessage.innerHTML = `
            <h2>✅ Registration Successful!</h2>
            <p>Welcome to <strong>KPL 2026</strong>!</p>
            <p><strong>Registration ID:</strong></p>
            <p>${docRef.id}</p>
        `;
    
    successMessage.style.display = "block";
    
    successMessage.scrollIntoView({
      behavior: "smooth"
    });
    
    form.reset();
    
  } catch (error) {
    
    console.error(error);
    
    alert(
      "Registration failed!\n\n" +
      error.message
    );
  }
});