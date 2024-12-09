// Import modules efficiently
import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'react-jss';
import { NextUIProvider } from '@nextui-org/react';
import classNames from 'classnames';

import App from 'component/app/App';
import { Profile } from 'component/navigation/Profile';
import 'index.css';

import { Ch5Debug, Ch5Emulator } from '@crestron/ch5-crcomlib';
import * as CrComLib from '@crestron/ch5-crcomlib';
import emulator from 'emulator';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

declare global {
  interface Window {
    CrComLib: typeof CrComLib;
    bridgeReceiveIntegerFromNative: typeof CrComLib.bridgeReceiveIntegerFromNative;
    bridgeReceiveBooleanFromNative: typeof CrComLib.bridgeReceiveBooleanFromNative;
    bridgeReceiveStringFromNative: typeof CrComLib.bridgeReceiveStringFromNative;
    bridgeReceiveObjectFromNative: typeof CrComLib.bridgeReceiveObjectFromNative;
  }
}

// Assign CrComLib to window object
Object.assign(window, {
  CrComLib,
  bridgeReceiveIntegerFromNative: CrComLib.bridgeReceiveIntegerFromNative,
  bridgeReceiveBooleanFromNative: CrComLib.bridgeReceiveBooleanFromNative,
  bridgeReceiveStringFromNative: CrComLib.bridgeReceiveStringFromNative,
  bridgeReceiveObjectFromNative: CrComLib.bridgeReceiveObjectFromNative,
});

// Initialize emulator if enabled
const initializeEmulator = (): void => {
  Ch5Debug.enableAll();
  Ch5Emulator.clear();
  const ch5Emulator = Ch5Emulator.getInstance();
  ch5Emulator.loadScenario(emulator);
  ch5Emulator.run();
};

if (process.env.REACT_APP_ENABLE_EMULATOR) initializeEmulator();

const theme = {};

// Main wrapper component
const AppWrapper = (): JSX.Element => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = useCallback(() => setIsDarkTheme((prev) => !prev), []);

  return (
    <ThemeProvider theme={theme}>
      <NextUIProvider>
        <RecoilRoot>
          <main
            className={classNames(
              isDarkTheme ? 'dark' : 'light',
              'text-foreground bg-background',
            )}>
            <Profile isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
            <App />
          </main>
        </RecoilRoot>
      </NextUIProvider>
    </ThemeProvider>
  );
};

// Render the application
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<AppWrapper />);