import { Ch5Debug, Ch5Emulator } from '@crestron/ch5-crcomlib';
import * as CrComLib from '@crestron/ch5-crcomlib';
import emulator from 'emulator';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'react-jss';
import 'index.css';
import App from 'component/app/App';
import { NextUIProvider } from '@nextui-org/react';

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

const theme = {};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <ThemeProvider theme={theme}>
    <NextUIProvider>
      <RecoilRoot>
        <main className="dark text-foreground bg-background">
          <App />
        </main>
      </RecoilRoot>
    </NextUIProvider>
  </ThemeProvider>,
);
