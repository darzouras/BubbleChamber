var electron = require('electron');
var express = require("express");
var mysql = require("./dbcon.js"); // msql commands will look like mysql.pool.???
var app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

mysql.pool.connect(function(err) {
  if(err){
    console.log('Error connecting to DB');
    return;
  }
  console.log('Connection established');
});

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 750,
    height: 950
  });

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
