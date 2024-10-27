import classNames from 'classnames';
import React from 'react';
import { Lock } from 'lucide-react';
import { getConfigs } from 'config/Configs';
import { useSetRecoilState } from 'recoil';
import { LOGGED_OUT_USER, loggedInUserState } from 'state/navigation';

const defaultConfig = getConfigs();

export const LockButton: React.FC = () => {
  const setLoggedInUser = useSetRecoilState(loggedInUserState);

  return (
    <div className="absolute right-2 sm:right-5 top-2">
      <button
        type="button"
        className="border border-neutral-400 bg-secondary px-2 sm:px-3 py-1 sm:py-2 flex items-center justify-center rounded-lg text-xl sm:text-2xl text-primary-foreground w-16 sm:w-24 h-10 sm:h-14"
        onClick={() => {
          setLoggedInUser(LOGGED_OUT_USER);
        }}>
        <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
      </button>
    </div>
  );
};
