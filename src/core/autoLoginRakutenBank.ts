import type { WebviewTag } from 'electron';

const autoLogin = async (_webView: WebviewTag) => {
  const username = process.env.REACT_APP_RAKUTEN_BANK_USERNAME;
  if (!username) {
    throw new Error('REACT_APP_RAKUTEN_BANK_USERNAME not set!');
  }
  const password = process.env.REACT_APP_RAKUTEN_BANK_PASSWORD;
  if (!password) {
    throw new Error('REACT_APP_RAKUTEN_BANK_PASSWORD not set!');
  }

  alert('Not implemented');
};

export default autoLogin;
