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
    <div className="absolute right-5 top-2">
      <button
        type="button"
        className={classNames(
          'px-4 py-[0.57rem] flex items-center rounded-lg text-lg bg-red-700 text-red-200',
        )}
        onClick={() => {
          setLoggedInUser(LOGGED_OUT_USER);
        }}>
        <Lock className="mr-3 h-6 w-6 text-lg" />
        <div className="text-left flex flex-col">
          <span className="leading-none text-md">Lock</span>
          <span className="text-sm">{defaultConfig.authID}</span>
        </div>
      </button>
    </div>
  );
};
