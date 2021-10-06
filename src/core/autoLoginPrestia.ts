import type { WebviewTag } from 'electron';

const autoLogin = async (webView: WebviewTag) => {
  const username = process.env.REACT_APP_PRESTIA_USERNAME;
  if (!username) {
    throw new Error('REACT_APP_PRESTIA_USERNAME not set!');
  }
  const password = process.env.REACT_APP_PRESTIA_PASSWORD;
  if (!password) {
    throw new Error('REACT_APP_PRESTIA_PASSWORD not set!');
  }

  await webView.insertText(username);
  await webView.sendInputEvent({
    keyCode: 'Tab',
    type: 'keyDown'
  });
  await webView.sendInputEvent({
    keyCode: 'Tab',
    type: 'keyUp'
  });
  await webView.sendInputEvent({
    keyCode: 'Tab',
    type: 'keyDown'
  });
  await webView.sendInputEvent({
    keyCode: 'Tab',
    type: 'keyUp'
  });
  await webView.insertText(password);
  await webView.sendInputEvent({
    keyCode: 'Tab',
    type: 'keyDown'
  });
  await webView.sendInputEvent({
    keyCode: 'Tab',
    type: 'keyUp'
  });
  await webView.sendInputEvent({
    keyCode: 'Tab',
    type: 'keyDown'
  });
  await webView.sendInputEvent({
    keyCode: 'Tab',
    type: 'keyUp'
  });
  await webView.sendInputEvent({
    keyCode: 'Enter',
    type: 'keyDown'
  });
  await webView.sendInputEvent({
    keyCode: 'Enter',
    type: 'keyUp'
  });
};

export default autoLogin;
