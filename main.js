const { app, BrowserWindow, ipcMain, dialog, ipcRenderer } = require('electron/main')
const fs = require('fs/promises');
const path = require('node:path');
let appPath = null;
ipcMain.handle('show-open-dialog', () => {
  return dialog.showOpenDialogSync({ properties: ['openFile'] });
});

ipcMain.handle('get-app-path', () => {
  appPath = app.getPath('userData'); // Ensure appPath is initialized
  return appPath;
});
ipcMain.handle('build-file-path', async (event, fileName) => {
  if (!appPath) {
    throw new Error('Application path is not initialized. Call getAppPath first.');
  }
  return path.join(appPath, fileName);
});
// In main process
ipcMain.handle('write-file', async (event, filePath, content) => { 
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) reject(err);
      else resolve(`File written successfully to ${filePath}`);
    });
  });
});

ipcMain.handle('read-file', async (event, filePath) => {
  if (!filePath) {
    throw new Error('File path is required');
  }
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (err) {
    throw new Error(`Failed to read file: ${err.message}`);
  }
 
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