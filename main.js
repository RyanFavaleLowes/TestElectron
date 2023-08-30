require('update-electron-app')()
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()
  
    /*
        macOS apps generally continue running even without any windows open. 
        Activating the app when no windows are available should open a new 
        one.

        To implement this feature, listen for the app module's activate event
        , and call your existing createWindow() method if no BrowserWindows 
        are open.

        Because windows cannot be created before the ready event, you should 
        only listen for activate events after your app is initialized. Do 
        this by only listening for activate events inside your existing 
        whenReady() callback.
    */
    app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') // macOS
        app.quit()
  })