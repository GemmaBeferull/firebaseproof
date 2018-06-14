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
    

    var logoutButton = document.getElementById('logoutButton');
    
    
    logoutButton.addEventListener('click', e => {
        const auth = firebase.auth();
        const promise = auth.signOut();
        window.location = 'bodymain.html'
    
    });
    
    // firebase.auth().onAuthStateChanged(firebaseUser => {
    
    //     if (firebaseUser) {
    //         // window.location = 'form.html';
    //         console.log(firebaseUser);
    //         //logoutButton.classList.remove('hidden');
          
    //         const userReference = firebase.database().ref(`users/${firebaseUser.uid}`);
    //         userReference.once('value', snapshot => {
                
    //             if (!snapshot.val()) {
                    
    //                 // User does not exist, create user entry
    //                 console.log(mailInput.value)
    //                 userReference.set({
    //                     email: mailInput.value
    //                  });
    //             }
    //         });
    //         console.log(firebaseUser.uid)
    //         //setLoggedUserState();
    //         }else {
    //             console.log('no logueado');
    //             //logoutButton.classList.add('hidden');
    //             //setLoggedOutUserState();
    //         }
    //  });