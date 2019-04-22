const {app, BrowserWindow} = require('electron')
const fs = require('fs');
const hidefile = require('hidefile');

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 949,
    height: 600,
    minHeight: 305,
    minWidth: 628,
    webPreferences: {
      nodeIntegration: true
    }
  })

  var content = "";
  var encoding = "utf8";
  
  fs.writeFile('.key.dd', content, encoding, (err) => {
      if (err) throw err;
  });

  hidefile.hide(".key.dd", function(err, newpath) {
    if (err == null) console.log(newpath);  //-> "path/to/.file.ext"
  });

  // and load the index.html of the app.
  mainWindow.loadFile('login.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})