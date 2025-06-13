const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
  // 除函数之外，我们也可以暴露变量
});

contextBridge.exposeInMainWorld('systemAPI', {
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  getAppPath: () => ipcRenderer.invoke('get-app-path'), 
  buildFilePath: (fileName) => ipcRenderer.invoke('build-file-path', fileName),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
});