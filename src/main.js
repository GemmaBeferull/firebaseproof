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

/* */
var pre = document.getElementById('objeto');
var dbRefObject = firebase.database().ref().child('rita'); 

/*'value' detecta cambios en contenido 
   on()  llama a la funcion cuando pasa el evento (en este caso 'value')
   once() llama a la funcion cuando pasa el evento pero solo una vez
   off() deja de escuchar el evento
 */
dbRefObject.on('value', snap => {
    console.log(snap.val())
    pre.innerHTML = JSON.stringify(snap.val());
});
}())

var mailInput = document.getElementById('mailInput');
var passwordInput = document.getElementById('passwordInput');
var loginButton = document.getElementById('loginButton');
var registerButton = document.getElementById('registerButton');
var logoutButton = document.getElementById('logoutButton');


loginButton.addEventListener('click', e => {
    console.log('entra en login');
    window.location = 'form.html';
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

logoutButton.addEventListener('click', e => {
    const auth = firebase.auth();
    const promise = auth.signOut();
});


firebase.auth().onAuthStateChanged(firebaseUser => {

    if (firebaseUser) {
        console.log(firebaseUser);
        //logoutButton.classList.remove('hidden');
      
        const userReference = firebase.database().ref(`users/${firebaseUser.uid}`);
        userReference.once('value', snapshot => {
            
            if (!snapshot.val()) {
                window.location = 'form.html';
                // User does not exist, create user entry
                console.log(mailInput.value)
                userReference.set({
                    email: mailInput.value
                 });
            }
        });
        console.log(firebaseUser.uid)
        //setLoggedUserState();
        }else {
            console.log('no logueado');
            //logoutButton.classList.add('hidden');
            //setLoggedOutUserState();
        }
 });