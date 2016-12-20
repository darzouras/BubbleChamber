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
// var storage = firebase.storage();
// var storageRef = storage.ref();

/* mysql.pool.connect(function(err) {
  if(err){
    console.log('Error connecting to DB');
    return;
  }
  console.log('Connection established');
}); */

function createWindow () {
  mainWindow = new BrowserWindow({
    // FIXME on smaller resolutions the controls extend further than the window allows, but there is no scrolling
    width: 750,
    height: 950,
  });

  if (process.platform !== 'darwin') {
    mainWindow.icon = 'resources/1024_bcicon.png';
  }
  else {
    mainWindow.icon = 'resources/1024_bcicon.icns';
  }

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
