(function() {
var config = {
  apiKey: "AIzaSyBrmfNJgvf2uQv8DhczikiNrcj9rzWGDzs",
  authDomain: "pruebadata-fd965.firebaseapp.com",
  databaseURL: "https://pruebadata-fd965.firebaseio.com",
  projectId: "pruebadata-fd965",
  storageBucket: "",
  messagingSenderId: "785154341794"
};
firebase.initializeApp(config);
}())

var mailInput = document.getElementById('mailInput');
var passwordInput = document.getElementById('passwordInput');
var loginButton = document.getElementById('loginButton');
var registerButton = document.getElementById('registerButton');
var formArea = document.getElementById('formulario');
var logginArea = document.querySelector('.loginArea');
var nombre = document.querySelector('.nombre');
var apellido = document.querySelector('.apellido');
var guardarButton = document.getElementById('saveButton');
var visualizar = document.getElementById('visualizar');
var show = document.querySelector('.show');
var input = document.querySelectorAll('input');

var userID = '';


loginButton.addEventListener('click', e => {
    console.log('entra en login');
    const mail = mailInput.value;
    const password = passwordInput.value;
    const auth = firebase.auth();
    
    const promise = auth.signInWithEmailAndPassword(mail, password);
    promise.catch (e => console.log (e.message))
    
});

registerButton.addEventListener('click', e => {
    const mail = mailInput.value;
    const password = passwordInput.value;
    const auth = firebase.auth();
    
    const promise = auth.createUserWithEmailAndPassword(mail, password);
    promise.catch (e => console.log (e.message))
    
});

var logoutButton = document.getElementById('logoutButton');
    
    
logoutButton.addEventListener('click', e => {
    const auth = firebase.auth();
    const promise = auth.signOut();
    logginArea.classList.remove('hidden');
    logoutButton.classList.add('hidden');
    formArea.classList.add('hidden');
    show.classList.add('hidden');

});

var userReference; 

firebase.auth().onAuthStateChanged(firebaseUser => {

    if (firebaseUser) {
        
        console.log(firebaseUser);
        logginArea.classList.add('hidden');
        logoutButton.classList.remove('hidden');
        formArea.classList.remove('hidden');
        show.classList.remove('hidden');

        userID = firebaseUser.uid;
        
      
        userReference = firebase.database().ref(`users/${firebaseUser.uid}`);
        userReference.once('value', snapshot => {
            if (!snapshot.val()) {
                // User does not exist, create user entry
                console.log(mailInput.value)
                userReference.set({
                    email: mailInput.value
                 });
            }
        });
          
                return userID;
        }else {
            console.log('no logueado');
           
        }
 });

 var dbRefObject = firebase.database().ref().child('users');
 var showName = document.querySelector('.showName');
var showSurname = document.querySelector('.showlastname');
var showEmail = document.querySelector('.showEmail');
var showID = document.querySelector('.showID');

for(var i = 0; i < input.length; i++){
    input[i].addEventListener("focus", ()=> {
        saveData();
    });
}

 guardarButton.addEventListener('click', saveData);
 
 function saveData() {
    
            event.preventDefault()
            userReference.on('value', () => {
                userReference.set({
                    email: mailInput.value,
                    nombre: nombre.value,
                    apellido: apellido.value,
                    ID: userID
                });
            });
        var userRef = dbRefObject.child(userID);
            //formArea.classList.add('hidden');
            show.classList.remove('hidden');
            userRef.on('value', snap => {
               console.log(snap.val());
                showName.innerHTML = snap.val().nombre;
                showSurname.innerHTML = snap.val().apellido;
                showEmail.innerHTML = snap.val().email;
                showID.innerHTML = snap.val().userID;
            });
        
    
};

visualizar.addEventListener('click', ()=>{
    event.preventDefault()
    var userRef = dbRefObject.child(userID);
            formArea.classList.add('hidden');
            show.classList.remove('hidden');
            userRef.on('value', snap => {
               console.log(snap.val());
                showName.innerHTML = snap.val().nombre;
                showSurname.innerHTML = snap.val().apellido;
                showEmail.innerHTML = snap.val().email;
                showID.innerHTML = snap.val().userID;
            });
        
})




