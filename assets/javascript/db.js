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


  // Create new user profiles
  $(".createProfileBtn").on("click", function () {
    $(".bannerArea").empty();
    console.log("click");
    let newUser = {
      firstName: $(".firstNameRegister").val(),
      middleName: $(".middleNameRegister").val(),
      lastName: $(".lastNameRegister").val(),
      emailAddress: $(".emailRegister").val(),
      password: $(".passwordRegister").val(),
      DOB: $(".DOBRegister").val(),
      address1: $(".address1Register").val(),
      address2: $(".address2Register").val(),
      city: $(".cityRegister").val(),
      state: $(".stateRegister").val(),
      zip: $(".zipRegister").val(),
    };

    let emailKey = encodeKey(newUser.emailAddress);

    database.ref("/users").once("value", function (snapshot) {
      let errorMessage = "";
      console.log($(".emailRegister").val());
      auth.createUserWithEmailAndPassword(newUser.emailAddress, newUser.password)
        .catch(function (error) {
          // Handle Errors here.
          errorMessage = error.message;
          console.log("error message: " + errorMessage);
          $(".bannerArea").html(`<div class="alert-danger text-center">${errorMessage}</div>`);
          return errorMessage;
        });
      if (errorMessage === "") {
        console.log(errorMessage)
        $(".bannerArea").html(`<div class="alert-success text-center">Registration successful! Please log in on the front page.</div>`);
      }
      database.ref("/users/" + emailKey).set({
        firstName: newUser.firstName,
        middleName: newUser.middleName,
        lastName: newUser.lastName,
        email: emailKey,
        password: newUser.password,
        DOB: newUser.DOB,
        address1: newUser.address1,
        address2: newUser.address2,
        city: newUser.city,
        state: newUser.state,
        zip: newUser.zip
      });


      /*
Code is here for implementing google account login. Currently not in use because it was not as convenient for tracking user 
address information as email/pass, but could implement it later if time permits
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
