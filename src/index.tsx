import { Ch5Debug, Ch5Emulator } from '@crestron/ch5-crcomlib';
import * as CrComLib from '@crestron/ch5-crcomlib';
import emulator from 'emulator';

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'react-jss';
import 'index.css';
import App from 'component/app/App';
import { NextUIProvider } from '@nextui-org/react';
import { Moon, Sun } from 'lucide-react';
import classNames from 'classnames';

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

const AppWrapper = (): JSX.Element => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const toggleTheme = (): void => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <NextUIProvider>
        <RecoilRoot>
          <main className={classNames(isDarkTheme ? 'dark' : 'light', 'text-foreground bg-background')}>
            <App />
            <div className="absolute right-20 sm:right-32 top-2">
              <button
                type="button"
                className={classNames(
                  "relative inline-flex items-center h-10 sm:h-14 rounded-full w-16 sm:w-24 transition-colors duration-200 ease-in-out focus:outline-none",
                  isDarkTheme ? "bg-gray-700" : "bg-gray-200"
                )}
                onClick={toggleTheme}
              >
                <span
                  className={classNames(
                    "inline-block w-8 sm:w-12 h-8 sm:h-12 transform rounded-full transition-transform duration-200 ease-in-out",
                    isDarkTheme ? "translate-x-8 sm:translate-x-12 bg-gray-900" : "translate-x-0 bg-white"
                  )}
                >
                  {isDarkTheme ? (
                    <Moon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-200 m-1 sm:m-2" />
                  ) : (
                    <Sun className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 m-1 sm:m-2" />
                  )}
                </span>
              </button>
            </div>
          </main>
        </RecoilRoot>
      </NextUIProvider>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<AppWrapper />);
