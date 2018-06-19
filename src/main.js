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
console.log('hola');
}())

var mailInput = document.getElementById('mailInput');
var passwordInput = document.getElementById('passwordInput');
var loginButton = document.getElementById('loginButton');
var registerButton = document.getElementById('registerButton');
var userID = '';

loginButton.addEventListener('click', e => {
    console.log('entra en login');
    const mail = mailInput.value;
    const password = passwordInput.value;
    const auth = firebase.auth();
    
    const promise = auth.signInWithEmailAndPassword(mail, password);
    promise.catch (e => console.log (e.message))
    alert('user has logged in');
    showForm();
});

registerButton.addEventListener('click', e => {
    const mail = mailInput.value;
    const password = passwordInput.value;
    const auth = firebase.auth();
    
    const promise = auth.createUserWithEmailAndPassword(mail, password);
    promise.catch (e => console.log (e.message))
    alert('user has been registered');
    showForm()
});

var logoutButton = document.getElementById('logoutButton');
    
    
logoutButton.addEventListener('click', e => {
    const auth = firebase.auth();
    const promise = auth.signOut();

});

var showStuff = document.querySelector('.hide')
function showForm(){
    showStuff.classList.remove('hide');
}
firebase.auth().onAuthStateChanged(firebaseUser => {

    if (firebaseUser) {
        console.log(firebaseUser);
        logoutButton.classList.remove('hide');
        const userReference = firebase.database().ref(`users/${firebaseUser.uid}`);
        userReference.once('value', snapshot => {       
            if (!snapshot.val()) {          
                // User does not exist, create user entry
                console.log(mailInput.value)
                userReference.set({
                    email: mailInput.value
                 });
            }
        });

        console.log(firebaseUser.uid);
        userID = firebaseUser.uid;
        return userID;
        }else {
            console.log('no logueado');
        }

 });

     //Reference messages collection
     var messagesRef = firebase.database().ref('personalData');
     var submitButton = document.getElementById('submit__button');
     submitButton.addEventListener('click', submitForm);
 
     function submitForm(e){
         e.preventDefault();
 
         //Get values
         var name = getInputValue('input__name');
         var surnames = getInputValue('input__surnames');
         var personalPhone = getInputValue('input__personalPhone');
         var professionalPhone = getInputValue('input_professionalPhone');
         var personalEmail = getInputValue('input__personalEmail');
         var professionalEmail = getInputValue('input__professionalEmail');
         var capacity = getInputValue('input__capacity');
         var picture = getInputValue('input__picture');

         //Save fields
         savePersonalData(userID, name,surnames, personalPhone, professionalPhone, personalEmail, professionalEmail, capacity, picture)
             
         //Show alert
         document.querySelector('.alert').style.display = 'block';
         // Hide alert after 3 secs
         setTimeout(function(){
             document.querySelector('.alert').style.display = 'none';
         }, 3000);
         }
 
     function getInputValue(id){
         return document.getElementById(id).value;
     }
 
     //Save messages to firebase
     function savePersonalData(userID, name,surnames, personalPhone, professionalPhone, personalEmail, professionalEmail, capacity, picture){
         var newMessageRef = messagesRef.push();
         newMessageRef.set({
             userID: userID,
             name: name,
             surnames: surnames,
             personalPhone: personalPhone,
             professionalPhone: professionalPhone,
             personalEmail: personalEmail,
             professionalEmail: professionalEmail,
             capacity: capacity,
             picture: picture,
 
         })
     };

