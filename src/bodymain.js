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

loginButton.addEventListener('click', e => {
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




// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if(firebaseUser){
//         console.log(firebaseUser);
//         logoutButton.classList.remove('hidden');
//     } else{
//         console.log('no logueado');
//         logoutButton.classList.add('hidden');
//     }
// })

firebase.auth().onAuthStateChanged(firebaseUser => {

    if (firebaseUser) {
        console.log(firebaseUser);
        //logoutButton.classList.remove('hidden');
       
        const userReference = firebase.database().ref(`users/${firebaseUser.uid}`);
        userReference.once('value', snapshot => {
            
            if (!snapshot.val()) {
                window.location = 'user.html';
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