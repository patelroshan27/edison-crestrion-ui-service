import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Delete } from 'lucide-react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { loggedInUserState } from 'state/navigation';

interface Props {
  authProviderURL: string;
  authID: string;
}

const LoginScreen: React.FC<Props> = ({ authProviderURL, authID }: Props) => {
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const passWordRef = useRef<HTMLDivElement>(null);
  const setLoggedInUser = useSetRecoilState(loggedInUserState);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL as string;

  const handleInvalidPassword = useCallback((): void => {
    passWordRef.current?.classList.add('animate-once', 'animate-shake');
    setTimeout(() => {
      passWordRef.current?.classList.remove('animate-once', 'animate-shake');
      setPassword('');
    }, 200);
  }, [setPassword]);

  const handleDigitClick = async (digit: number): Promise<void> => {
    // Don't do anything if we are already checking password
    if (isLoading) {
      return;
    }

    if (digit === -1 && password.length > 0) {
      setPassword((prevPass) => prevPass.slice(0, -1));
    } else if (digit !== -1) {
      setPassword((prevPass) => `${prevPass}${digit}`);
    }
  };

  const handlePasswordCheck = useCallback(
    async (authID: string, pass: string) => {
      const response = await axios.get(
        `${apiBaseUrl}${authProviderURL}?name=${authID}&passcode=${pass}`,
      );
      if (response.status === 200) {
        setIsLoading(false);
        setLoggedInUser(response.data);
      }
    },
    [setIsLoading, setLoggedInUser],
  );

  useEffect(() => {
    if (password.length < 4) return;

    setIsLoading(true);
    // Validate with API to ensure that the password
    // is correct
    handlePasswordCheck(authID, password)
      .catch(() => handleInvalidPassword())
      .finally(() => setIsLoading(false));
  }, [password, setIsLoading, handlePasswordCheck, handleInvalidPassword]);

  return (
    <div className="flex items-center justify-center bg-background fixed top-0 left-0 h-screen w-screen z-10">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4">
        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold border border-neutral-700 bg-neutral-400 rounded-full !bg-secondary-foreground text-primary px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 text-center mb-4">
          BAPS Shri Swaminarayan Mandir, Edison, NJ
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center w-full space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
          <div className="rounded-full px-4 py-2 border border-neutral-700 bg-neutral-400 !bg-secondary-foreground text-primary text-xl sm:text-2xl md:text-3xl font-semibold">
            {authID}
          </div>
          <div
            ref={passWordRef}
            className="flex items-center justify-center space-x-2 sm:space-x-3">
            {new Array(4).fill(1).map((_, index) => (
              <div
                className={`rounded-full h-3 w-3 sm:h-4 sm:w-4 border border-black ${
                  password.length > index ? 'bg-active' : ''
                }`}
                key={`pass-char-${index}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full max-w-sm">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <button
              key={digit}
              className="outline-none focus:outline-none flex items-center justify-center rounded-full h-14 w-14 sm:h-18 sm:w-18 md:h-24 md:w-24 text-2xl sm:text-3xl md:text-4xl border-2 border-neutral-700 bg-neutral-400 opacity-80 font-medium active:opacity-100 hover:opacity-100 !bg-secondary-foreground text-primary"
              disabled={isLoading}
              onClick={() => {
                void handleDigitClick(digit);
              }}>
              {digit}
            </button>
          ))}

          <div className="col-span-3 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            <button
              className="invisible outline-none focus:outline-none flex items-center justify-center rounded-full h-14 w-14 sm:h-18 sm:w-18 md:h-24 md:w-24 border-2 border-neutral-700 bg-neutral-400 opacity-80 font-medium active:opacity-100 hover:opacity-100 !bg-secondary-foreground text-primary"
              disabled={isLoading}></button>
            <button
              className="outline-none focus:outline-none flex items-center justify-center rounded-full h-14 w-14 sm:h-18 sm:w-18 md:h-24 md:w-24 text-2xl sm:text-3xl md:text-4xl border-2 border-neutral-700 bg-neutral-400 opacity-80 font-medium active:opacity-100 hover:opacity-100 !bg-secondary-foreground text-primary"
              disabled={isLoading}
              onClick={() => {
                void handleDigitClick(0);
              }}>
              0
            </button>
            <button
              className="outline-none focus:outline-none flex items-center justify-center rounded-full h-14 w-14 sm:h-18 sm:w-18 md:h-24 md:w-24 border-2 border-neutral-700 bg-neutral-400 opacity-80 font-medium active:opacity-100 hover:opacity-100 !bg-secondary-foreground text-primary"
              disabled={isLoading}
              onClick={() => {
                void handleDigitClick(-1);
              }}>
              <Delete className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
