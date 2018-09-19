$(document).ready( function (){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAU6KkP1GaxMgEbGMcoizsiusMF_qHytD4",
    authDomain: "election-info-project.firebaseapp.com",
    databaseURL: "https://election-info-project.firebaseio.com",
    projectId: "election-info-project",
    storageBucket: "election-info-project.appspot.com",
    messagingSenderId: "978592611481"
  };
  firebase.initializeApp(config);

  let database = firebase.database();
  const auth = firebase.auth();


  let loggedIn;
    // Add a realtime listener, this should be used to detect changes in logged in status. firebaseUser === null if not logged in
    // Firebase does not seem to support Auth.Persistence.SESSION in javascript, "when Firebase Auth client library is used in a server environment, 
    // you could have multiple users logging in and you don't have the notion of a currentUser that is persisted on the backend server 
    // (this would cause one user to clobber the other). Session persistence can be modified on the client only."
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log("logged in");
        loggedIn = true;
      } else {
        console.log("logged out");
        loggedIn = false;
      }
    });


  $(".btnLogin").on("click", function() {
    let email = $(".loginEmail").val();
    console.log(email);
    let pass = $(".loginPassword").val();
    const auth = firebase.auth();
    // Sign in
    auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    return firebase.auth().signInWithEmailAndPassword(email, pass);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  })


  // Create new user profiles
  $(".createProfileBtn").on("click", function () {
    console.log("click");
    let newUser = {
      emailAddress: $(".emailEntry").val(),
      password: $(".passwordEntry").val(),
      address1: $(".address1Entry").val(),
      address2: $(".address2Entry").val(),
      city: $(".cityEntry").val(),
      state: $(".stateEntry").val(),
      zip: $(".zipEntry").val()
    };

    database.ref("/users").push(newUser);
    //database.ref("/users").child(newUser.emailAddress).setValue(newUser);
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(newUser.emailAddress, newUser.password);


  });

});