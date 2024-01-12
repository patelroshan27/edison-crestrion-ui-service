// WebXPanel needs to be loaded before CrComLiib file gets loaded!!
import WebXPanel, {
  isActive,
  getVersion,
  getBuildDate,
} from '@crestron/ch5-webxpanel';
import { Ch5Debug, Ch5Emulator } from '@crestron/ch5-crcomlib';
import * as CrComLib from '@crestron/ch5-crcomlib';
import emulator from 'emulator';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'react-jss';
import 'index.css';
import App from 'component/app/App';
import { getConfigs } from 'utils/Configs';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

declare global {
  interface Window {
    CrComLib: any;
    bridgeReceiveIntegerFromNative: any;
    bridgeReceiveBooleanFromNative: any;
    bridgeReceiveStringFromNative: any;
    bridgeReceiveObjectFromNative: any;
  }
}

// We need to ensure that the panel can listen to the controller
window.CrComLib = CrComLib;
window.bridgeReceiveIntegerFromNative = CrComLib.bridgeReceiveIntegerFromNative;
window.bridgeReceiveBooleanFromNative = CrComLib.bridgeReceiveBooleanFromNative;
window.bridgeReceiveStringFromNative = CrComLib.bridgeReceiveStringFromNative;
window.bridgeReceiveObjectFromNative = CrComLib.bridgeReceiveObjectFromNative;

// Initialize emulator
if (process.env.REACT_APP_ENABLE_EMULATOR != null) {
  Ch5Debug.enableAll();
  Ch5Emulator.clear();
  const ch5Emulator = Ch5Emulator.getInstance();
  ch5Emulator.loadScenario(emulator);
  ch5Emulator.run();
}

const { crestronConfigs } = getConfigs();
const isWebXPanelActive: boolean = isActive ?? false;
if (isWebXPanelActive) {
  console.log(`WebXPanel version: ${getVersion()}`);
  console.log(`WebXPanel build date: ${getBuildDate()}`);
  console.log(`WebXPanel isActive: ${isWebXPanelActive ? 'true' : 'false'}`);
  WebXPanel.initialize({
    host: crestronConfigs.host,
    // Decimal. For example, 10 converted to Hex: '0x0A'
    ipId: `0x0${Number(crestronConfigs.ipID)
      .toString(16)
      .slice(-2)
      .toUpperCase()}`,
    port: crestronConfigs.port,
  });
}

const theme = {};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ThemeProvider>,
);
