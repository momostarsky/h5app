const { app, BrowserWindow,ipcMain,dialog, ipcRenderer } = require('electron/main')
const path = require('node:path')
 
ipcMain.handle('show-open-dialog', () => {
  return dialog.showOpenDialogSync({ properties: ['openFile'] });
});

ipcMain.handle('get-app-path', () => {
  return app.getAppPath();
});

ipcMain.handle('ping', () => 'pong');

const createWindow = () => {
  
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // safer
      contextIsolation: true,
    }
  })

  win.loadFile('index.html');
  
  win.webContents.openDevTools();
}

 


app.whenReady().then(() => {
  createWindow() 
  app.on('activate', () => {
    
    //事件监听器，当应用被“激活”但没有任何窗口时，再次创建窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})