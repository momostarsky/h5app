
const information = document.getElementById('info')
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), 
Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;


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


 