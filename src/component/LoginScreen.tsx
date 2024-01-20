import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { Check, Loader2 } from 'lucide-react';

interface Props {
  authProviderURL: string;
  authID: string;
}

const LoginScreen: React.FC<Props> = ({ authProviderURL, authID }: Props) => {
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const passWordRef = useRef<HTMLDivElement>(null);

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
    await new Promise((resolve, reject) => {
      console.log(authID, pass);
      setTimeout(reject, 1000);
    });
  };

  return (
    <div
      className={classNames(
        'flex items-center justify-center fixed top-0 left-0 h-screen w-screen z-10',
        'bg-black',
      )}>
      {authID} {authProviderURL}
      <div className="flex flex-col items-center justify-center">
        <p className="text-xs">BAPS Shri Swaminarayan Mandir</p>
        <p className="text-5xl font-semibold">Edison, NJ</p>
        <div
          className={classNames(
            'rounded-full px-4 py-1 bg-emerald-300 flex-col items-center justify-center',
            'text-black text-xs font-semibold my-4',
          )}>
          Room #{authID}
        </div>
        <div
          ref={passWordRef}
          className={classNames(
            'my-4 h-12 flex items-center justify-center gap-3',
          )}>
          {password.split('').map((char, index) => {
            return (
              <div
                className="rounded-full bg-white h-4 w-4"
                key={`pass-char-${char}-${index}`}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap max-w-xl gap-3 items-center justify-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -1].map((digit) => {
            let display: React.ReactNode = digit;
            switch (digit) {
              case -1:
                display = isLoading ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  <Check className="h-8 w-8" />
                );
                break;
            }

            return (
              <button
                key={digit}
                className={classNames(
                  'rounded-full h-20 w-20 flex items-center justify-center',
                  'text-3xl font-light active:bg-white/20 hover:bg-white/20',
                  digit === -1 ? 'bg-emerald-600 text-white' : 'bg-white/10',
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
