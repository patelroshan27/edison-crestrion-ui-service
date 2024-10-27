import React from 'react';
import { Lock } from 'lucide-react';
import { useSetRecoilState } from 'recoil';
import { LOGGED_OUT_USER, loggedInUserState } from 'state/navigation';

export const LockButton: React.FC = () => {
  const setLoggedInUser = useSetRecoilState(loggedInUserState);

  return (
    <div className="absolute right-4 sm:right-5 md:right-6 top-2 sm:top-2 md:top-2">
      <button
        type="button"
        className="border border-neutral-400 bg-secondary flex items-center justify-center rounded-lg text-primary-foreground w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14"
        onClick={() => {
          setLoggedInUser(LOGGED_OUT_USER);
        }}>
        <Lock className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-red-500" />
      </button>
    </div>
  );
};
