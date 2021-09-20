import { ipcMain } from 'electron';

const channels = {
  repo: {
    Send: 'repo',
    Ok: 'repo-ok',
    Error: 'repo-error',
  }
};

type Callback = (arg: any) => Promise<any>;

function subscribe(channel: keyof typeof channels, callback: Callback) {
  const channelEvents = channels[channel];
  ipcMain.on(channelEvents.Send, async (event, arg) => {
    try {
      const result = await callback(arg);
      event.reply(`${channelEvents.Ok}-${arg.id}`, result);
    } catch (error) {
      console.error('error', error);
      event.reply(`${channelEvents.Error}-${arg.id}`, error);
    }
  });
}

export default subscribe;
