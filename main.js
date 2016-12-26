var electron = require('electron');
var express = require("express");
// var mysql = require("./dbcon.js"); // msql commands will look like mysql.pool.???
var firebase = require("firebase");
var app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

let config = {
    apiKey: "AIzaSyCpA9IrtjpFZyDtzmkfPlAkPvB1gf4oGJg",
    authDomain: "bubblechamber-f4313.firebaseapp.com",
    databaseURL: "https://bubblechamber-f4313.firebaseio.com",
    storageBucket: "bubblechamber-f4313.appspot.com",
    messagingSenderId: "604263226065"
};
firebase.initializeApp(config);

// USER AUTHENTICATION
var user = firebase.auth().currentUser;


var name, email, photoUrl, uid;
if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid; // DO NOT USE THIS VALUE TO AUTHENTICATE WITH BACKEND
                    // use user.getToken() instead, if you need to.
}

// firebase storage
/* var storage = firebase.storage();
var storageRef = storage.ref();
var imagesRef = storageRef.child('images');
var spaceRef = storageRef.child('images/space.jpg'); */

/* mysql.pool.connect(function(err) {
  if(err){
    console.log('Error connecting to DB');
    return;
  }
  console.log('Connection established');
}); */

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 850,
    height: 950,
  });

  if (process.platform !== 'darwin') {
    mainWindow.icon = 'resources/1024_bcicon.png';
  }
  else {
    mainWindow.icon = 'resources/1024_bcicon.icns';
  }

  // FIXME mofe user authentication if/else here to better manage what pops up?
  /* firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        mainWindow.loadURL(`file://${__dirname}/paint.html`);
      }
      else {

      }
  });
  */
  mainWindow.loadURL(`file://${__dirname}/paint.html`);
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow == null) {
    createWindow();
  }
});
