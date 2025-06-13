import { AppConfig } from './app_config.js';
const appConfig = new AppConfig();
const initAppInfo = async () => {
  try {
    const appPath = await appConfig.getAppPath();
    console.log('应用路径:', appPath);

    const information = document.getElementById('info');
    information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), 
Node.js (v${versions.node()}), 和 Electron (v${versions.electron()}), and Directory is: ${appPath}`;

    // You can safely continue other dependent logic here
    console.log('继续执行依赖于 appPath 的逻辑', appPath);

  } catch (error) {
    console.error('获取应用路径失败:', error);
  }
};

initAppInfo();

document.getElementById('save').addEventListener('click', async (event) => {
  event.preventDefault();
  console.log('save clicked');

  try {
    const result = await window.systemAPI.invoke('show-open-dialog');
    console.log('Selected file:', result);
  } catch (err) {
    console.error('Error showing dialog:', err);
  }
});






const func = async () => {
  try {
    const response = await window.versions.ping();
    console.log(response); // 应该打印 'pong'
  } catch (error) {
    console.error('调用 ping 出错:', error);
  }
};

func();


 