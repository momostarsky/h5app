// 系统配置信息.
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
}