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
    // var pre = document.getElementById('objeto');
    // var dbRefObject = firebase.database().ref().child('rita'); 
    
    /*'value' detecta cambios en contenido 
       on()  llama a la funcion cuando pasa el evento (en este caso 'value')
       once() llama a la funcion cuando pasa el evento pero solo una vez
       off() deja de escuchar el evento
     */
    // dbRefObject.on('value', snap => {
    //     console.log(snap.val())
    //     pre.innerHTML = JSON.stringify(snap.val());
    // });
    console.log('ho');
    }())
    
    // var database = firebase.database();

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
        savePersonalData(name,surnames, personalPhone, professionalPhone, personalEmail, professionalEmail, capacity, picture)
            
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
    function savePersonalData(name,surnames, personalPhone, professionalPhone, personalEmail, professionalEmail, capacity, picture){
        var newMessageRef = messagesRef.push();
        newMessageRef.set({
            name: name,
            surnames: surnames,
            personalPhone: personalPhone,
            professionalPhone: professionalPhone,
            personalEmail: personalEmail,
            professionalEmail: professionalEmail,
            capacity: capacity,
            picture: picture,

        })
    }






    
 