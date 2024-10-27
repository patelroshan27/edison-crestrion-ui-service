// Import modules efficiently
import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'react-jss';
import { NextUIProvider } from '@nextui-org/react';
import { Moon, Sun } from 'lucide-react';
import classNames from 'classnames';

import App from 'component/app/App';
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

// Theme toggle button component optimized with React.memo
const ThemeToggleButton: React.FC<{
  isDarkTheme: boolean;
  toggleTheme: () => void;
}> = React.memo(
  ({
    isDarkTheme,
    toggleTheme,
  }: {
    isDarkTheme: boolean;
    toggleTheme: () => void;
  }) => (
    <button
      type="button"
      className={classNames(
        'relative inline-flex items-center h-10 sm:h-12 md:h-14 rounded-full w-14 sm:w-16 md:w-20 transition-colors duration-200 ease-in-out focus:outline-none',
        isDarkTheme ? 'bg-gray-700' : 'bg-gray-200',
      )}
      onClick={toggleTheme}>
      <span
        className={classNames(
          'inline-block w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 transform rounded-full transition-transform duration-200 ease-in-out',
          isDarkTheme
            ? 'translate-x-6 sm:translate-x-6 md:translate-x-8 bg-gray-900'
            : 'translate-x-0 bg-white',
        )}>
        {isDarkTheme ? (
          <Moon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-gray-200 m-1 sm:m-1.5 md:m-2" />
        ) : (
          <Sun className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-500 m-1 sm:m-1.5 md:m-2" />
        )}
      </span>
    </button>
  ),
);

ThemeToggleButton.displayName = 'ThemeToggleButton';

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
            <App />
            <div className="absolute right-16 sm:right-20 md:right-24 top-2 sm:top-2 md:top-2">
              <ThemeToggleButton
                isDarkTheme={isDarkTheme}
                toggleTheme={toggleTheme}
              />
            </div>
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
