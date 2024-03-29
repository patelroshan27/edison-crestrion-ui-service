import classNames from 'classnames';
import React from 'react';
import { Lock } from 'lucide-react';
import { getConfigs } from 'config/Configs';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from 'state/navigation';

const defaultConfig = getConfigs();

export const LockButton: React.FC = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  return (
    <div className="absolute right-5 top-1">
      <button
        type="button"
        className={classNames(
          'px-4 py-[0.57rem] flex items-center rounded-lg text-lg bg-primary text-primary-foreground',
        )}
        onClick={() => {
          setIsLoggedIn(false);
        }}>
        <Lock className="mr-3 h-6 w-6 text-lg" />
        <div className="text-left flex flex-col">
          <span className="leading-none text-sm">Lock</span>
          <span className="text-md">{defaultConfig.authID}</span>
        </div>
      </button>
    </div>
  );
};
