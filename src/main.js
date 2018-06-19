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
var show = document.querySelector('.show');
var showName = document.querySelector('.showName');
var showSurname = document.querySelector('.showlastname');
var showEmail = document.querySelector('.showEmail');
var showID = document.querySelector('.showID');
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

 guardarButton.addEventListener('click', ()=>{
    
            event.preventDefault()
            userReference.on('value', snapshot => {
                userReference.set({
                    email: mailInput.value,
                    nombre: nombre.value,
                    apellido: apellido.value,
                    ID: userID
                });
            });
        
            formArea.classList.add('hidden');
            show.classList.remove('hidden');
            var dbRefObject = firebase.database().ref().child(`users/${firebaseUser.uid}`)
            dbRefObject.on('value', snap => {
                console.log(snap.val());
                showName.innerHTML = snap.val().nombre;
                showSurname.innerHTML = snap.val().apellido;
                showEmail.innerHTML = snap.val().email;
                showID.innerHTML = snap.val().userID;
            });
        
    
})






 
    
  
    
    
   
    
    
    
        //  //Reference messages collection
        //  var messagesRef = firebase.database().ref(`users/${userID}`);
        //  var submitButton = document.getElementById('submit__button');
        //  submitButton.addEventListener('click', submitForm);
     
        //  function submitForm(e){
        //      e.preventDefault();
     
        //      //Get values
        //      var name = getInputValue('input__name');
        //      var surnames = getInputValue('input__surnames');
        //      var personalPhone = getInputValue('input__personalPhone');
        //      var professionalPhone = getInputValue('input_professionalPhone');
        //      var personalEmail = getInputValue('input__personalEmail');
        //      var professionalEmail = getInputValue('input__professionalEmail');
        //      var capacity = getInputValue('input__capacity');
        //      var picture = getInputValue('input__picture');
        //      var password = passwordInput.value;
             
    
        //      //Save fields
        //      savePersonalData(userID, password, name, surnames, personalPhone, professionalPhone, personalEmail, professionalEmail, capacity, picture)
                 
        //      //Show alert
        //      document.querySelector('.alert').style.display = 'block';
        //      // Hide alert after 3 secs
        //      setTimeout(function(){
        //          document.querySelector('.alert').style.display = 'none';
        //      }, 3000);
        //      }
     
        //  function getInputValue(id){
        //      return document.getElementById(id).value;
        //  }
     
        //  //Save messages to firebase
        //  function savePersonalData(userID, password, name, surnames, personalPhone, professionalPhone, personalEmail, professionalEmail, capacity, picture){
        //      var newMessageRef = messagesRef.push();
        //      newMessageRef.set({
        //          userID: userID,
        //          password: password,
        //          name: name,
        //          surnames: surnames,
        //          personalPhone: personalPhone,
        //          professionalPhone: professionalPhone,
        //          personalEmail: professionalEmail,
        //          professionalEmail: mailInput.value,
        //          capacity: capacity,
        //          picture: picture,
     
        //      })
        //  };