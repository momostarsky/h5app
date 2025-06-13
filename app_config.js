export class AppConfig {
  constructor() {
    this.appPath = null;
  }
  // 获取应用路径.
  async getAppPath() {
    if (this.appPath) {
      return this.appPath;
    }
    this.appPath = await window.systemAPI.getAppPath();
    return this.appPath;
  }

  // 修复后的 writeFile 方法（实例方法） 
  async writeFile(fileName, content) {
    const filePath = await window.systemAPI.buildFilePath(fileName);
    const result = await window.systemAPI.writeFile(filePath, content);
    console.log(result);
  }
  async readFile(fileName) {
    const filePath = await window.systemAPI.buildFilePath(fileName);
    const result = await window.systemAPI.readFile(filePath);
    console.log(result);
  }

}