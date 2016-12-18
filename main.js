var electron = require('electron');
var express = require("express");
var mysql = require("./dbcon.js"); // msql commands will look like mysql.pool.query 
var app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

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
