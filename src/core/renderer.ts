const { ipcRenderer } = window.require('electron');

export default function send(message: string) {
  return new Promise((resolve) => {
    ipcRenderer.once('asynchronous-reply', (_: any, arg: any) => {
      resolve(arg);
    });
    ipcRenderer.send('asynchronous-message', message);
    console.log('just sent.....');
  });
}
