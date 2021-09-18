import { ipcMain } from 'electron';

type Repo = {
  Send: 'repo';
  Ok: 'repo-ok';
  Error: 'repo-error';
};

export type Channel = Repo;

const channels: Record<'repo', Channel> = {
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
      event.reply(channelEvents.Ok, result);
    } catch (error) {
      console.log('error', error);
      event.reply(channelEvents.Error, error);
    }
  });
}

export default subscribe;
