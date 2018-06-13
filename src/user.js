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
    var lista = document.querySelector('.lista');
    var dbRefObject = firebase.database().ref('preguntas2'); 
    var dbRefList = dbRefObject;
    
    /*'value' detecta cambios en contenido 
       on()  llama a la funcion cuando pasa el evento (en este caso 'value')
       once() llama a la funcion cuando pasa el evento pero solo una vez
       off() deja de escuchar el evento
     */
    dbRefObject.on('value', snap => {
        console.log(snap.val())
        pre.innerHTML = JSON.stringify(snap.val());
    });
    
    /*    */
    
    dbRefList.on('child_added', snap => {
        var li = document.createElement('li');
        console.log(snap.val())
        li.innerHTML = snap.val();
        lista.appendChild(li);
    });
    
    }())
    
    var logoutButton = document.getElementById('logoutButton');    
    logoutButton.addEventListener('click', e => {
        const auth = firebase.auth();
        const promise = auth.signOut();
        window.location = 'bodymain.html';
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
            window.location = 'user.html';
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
            console.log(firebaseUser.uid)
            window.location = 'user.html';
            //setLoggedUserState();
            }else {
                console.log('no logueado');
                //logoutButton.classList.add('hidden');
                //setLoggedOutUserState();
            }
    });