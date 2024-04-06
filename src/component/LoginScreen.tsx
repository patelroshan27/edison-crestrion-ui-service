import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { Check, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from 'state/navigation';

interface Props {
  authProviderURL: string;
  authID: string;
}

const LoginScreen: React.FC<Props> = ({ authProviderURL, authID }: Props) => {
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const passWordRef = useRef<HTMLDivElement>(null);
  const [, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL as string;

  const handleInvalidPassword = (): void => {
    passWordRef.current?.classList.add('animate-once', 'animate-shake');
    setTimeout(() => {
      passWordRef.current?.classList.remove('animate-once', 'animate-shake');
      setPassword('');
    }, 250);
  };

  const handleDigitClick = async (digit: number): Promise<void> => {
    // Don't do anything if we are already checking password
    if (isLoading) {
      return;
    }

    if (digit !== -1) {
      // Update password on every tap
      setPassword((prevPass) => `${prevPass}${digit}`);
    } else {
      try {
        setIsLoading(true);
        // Validate with API to ensure that the password
        // is correct
        await handlePasswordCheck(authID, password);
      } catch {
        handleInvalidPassword();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePasswordCheck = async (
    authID: string,
    pass: string,
  ): Promise<void> => {
    const response = await axios.get(
      `${apiBaseUrl}${authProviderURL}?name=${authID}&passcode=${pass}`,
    );
    if (response.status === 200) {
      setIsLoading(false);
      setIsLoggedIn(true);
    }
  };

  return (
    <div
      className={classNames(
        'flex items-center justify-center bg-background fixed top-0 left-0 h-screen w-screen z-10',
        '',
      )}>
      <div className="flex flex-col items-center justify-center space-x-1">
        <p className="text-4xl font-semibold  border border-neutral-700 bg-neutral-400 rounded-full !bg-secondary-foreground text-primary px-5 py-5">
          BAPS Shri Swaminarayan Mandir, Edison, NJ
        </p>
        <div className="flex flex-row items-center justify-center space-x-1">
          <div
            className={classNames(
              'rounded-full px-6 py-2 border border-neutral-700 bg-neutral-400 rounded-full !bg-secondary-foreground text-primary flex-col items-center justify-center',
              'text-3xl font-semibold my-4 mx-4',
            )}>
            {authID}
          </div>
          <div
            ref={passWordRef}
            className={classNames(
              'h-5 flex items-center justify-center space-x-3',
            )}>
            {password.split('').map((char, index) => {
              return (
                <div
                  className="rounded-full h-4 w-4 !bg-active"
                  key={`pass-char-${char}-${index}`}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap max-w-[40%] space-x-3 space-y-3 items-center justify-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -1].map((digit) => {
            let display: React.ReactNode = digit;
            switch (digit) {
              case -1:
                display = isLoading ? (
                  <Loader2 className="h-12 w-12 animate-spin" />
                ) : (
                  <Check className="h-12 w-12" />
                );
                break;
            }

            return (
              <button
                key={digit}
                className={classNames(
                  'outline-none focus:outline-none rounded-full h-32 w-32 flex items-center justify-center',
                  'text-5xl border-2 border-neutral-700 bg-neutral-400 rounded-full opacity-80 font-medium active:opacity-100 hover:opacity-100',
                  digit === -1 ? '!bg-green-500 text-background' : '!bg-secondary-foreground text-primary',
                )}
                disabled={isLoading}
                onClick={() => {
                  handleDigitClick(digit).catch(console.log);
                }}>
                {display}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
