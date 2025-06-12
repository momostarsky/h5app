// const information = document.getElementById('info')
// information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`const func = async () => {

const func = async () => {
  try {
    const response = await window.versions.ping();
    console.log(response); // 应该打印 'pong'
  } catch (error) {
    console.error('调用 ping 出错:', error);
  }
};

func();