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



    $(".logoutBtn").on("click", function () {
        firebase.auth().signOut().then(function () {
            window.location.href = "index.html";
        }).catch(function (error) {
            console.log(error);
        });
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            loggedIn = true;
            //localStorage.setItem("username", email);
        } else {
            console.log("logged out");
            loggedIn = false;
            window.location.href = "Auth.html";
        }
    });
});