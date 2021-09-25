import type { Param } from '../../../electron/db/eventHandlers/types';
import { v4 as uuidv4 } from 'uuid';

const { ipcRenderer } = window.require('electron');

export default function send<T>(p: Param) {
  const id = uuidv4();

  return new Promise<T>((resolve, reject) => {
    ipcRenderer.once(`repo-ok-${id}`, (_: any, arg: any) => {
      ipcRenderer.removeAllListeners(`repo-error-${id}`);
      resolve(arg);
    });
    ipcRenderer.once(`repo-error-${id}`, (_: any, arg: any) => {
      ipcRenderer.removeAllListeners(`repo-ok-${id}`);
      reject(arg);
    });
    ipcRenderer.send(`repo`, {
      ...p,
      id,
    });
  });
}
