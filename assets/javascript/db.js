"use strict";

$(document).ready(function () {
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

  const database = firebase.database();
  const auth = firebase.auth();
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');



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

  // Check localStorage to see if user is logged in
  if (localStorage.getItem("username") === null) {
    loggedIn = false;
  } else {
    loggedIn = true;
  }


  $(".btnLogin").on("click", function () {
    let email = $(".loginEmail").val();
    console.log(email);
    let pass = $(".loginPassword").val();
    if (checkExistingEmail === true) {
      console.log("existing email check");
    }
    const auth = firebase.auth();
    // Sign in
    auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
      .then(function () {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        return firebase.auth().signInWithEmailAndPassword(email, pass);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    // Set localStorage
    localStorage.setItem("username", email);
  })

  /*
  $(".createGoogleBtn").on("click", function () {
    console.log("google click");
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user)
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });
  */
/*
 $(".createGoogleBtn").on("click", function () {
  console.log("google click");
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
});
*/



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

    //database.ref("/users").push(newUser);
    let emailKey = encodeKey(newUser.emailAddress);

    database.ref("/users").once("value", function (snapshot) {
      if (snapshot.hasChild(emailKey)) {
        alert("username already exists!");
      } else {
        auth.createUserWithEmailAndPassword(newUser.emailAddress, newUser.password)
          .catch(function (error) {
            // Handle Errors here.
            var errorMessage = error.message;
            console.log("error message: " + errorMessage);
          });
        //let newUserRef = database.ref("/users").child(encodeKey(newUser.emailAddress));
        database.ref("/users/" + emailKey).set({
          email: emailKey,
          password: newUser.password,
          address1: newUser.address1,
          address2: newUser.address2,
          city: newUser.city,
          state: newUser.state,
          zip: newUser.zip
        });
        //newUserRef.setItem(newUser);
      }
    });


    //#region subroutines

    /*
    function checkExistingEmail() {
      database.ref("").child('users').orderByChild('emailAddress').equalTo(email).on("value", function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (data) {
          console.log(data.key);
        });
      });
    }
    */

    // Handle using email address as password. Firebase does not support '.' characters in auth 
    function encodeKey(s) { return encodeURIComponent(s).replace('.', '%2E'); }

    function unEncodeKey(s) { return encodeURIComponent(s).replace("%2E", "."); }


    //#end region


  });
});
