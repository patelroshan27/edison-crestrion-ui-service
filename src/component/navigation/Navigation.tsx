import React from 'react';
import classNames from 'classnames';
import TimeDisplay from 'component/navigation/TimeDisplay';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoggedInState, pageState } from 'state/navigation';
import { getConfigs } from 'utils/Configs';
import { Lock } from 'lucide-react';

const configs = getConfigs();

interface Props {
  className?: string;
}

const Navigation: React.FC<Props> = ({ className }: Props) => {
  const [activeTab, setActivePage] = useRecoilState(pageState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const pages = Object.keys(configs.pages);

  return (
    <div
      className={classNames(
        'flex justify-between px-6 py-4 w-full items-center bg-black border-b border-primary',
        className,
      )}>
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className="px-4 py-3 flex items-center bg-red-500 text-white rounded-lg"
          onClick={() => {
            setIsLoggedIn(false);
          }}>
          <Lock className="mr-3 h-6 w-6 text-lg" />
          <div className="text-left flex flex-col">
            <span className="leading-none text-md">Lock</span>
            <span className="text-xs">#{configs.authID}</span>
          </div>
        </button>
        <TimeDisplay />
      </div>
      <div className="flex items-center space-x-2">
        {pages.map((page) => {
          const pageData = configs.pages[page];
          const Icon = pageData.icon;
          return (
            <button
              key={page}
              type="button"
              className={classNames(
                'px-6 py-4 flex items-center rounded-lg text-lg',
                activeTab === page
                  ? 'bg-primary text-black'
                  : 'bg-white/10 text-white',
              )}
              onClick={() => {
                setActivePage(page);
              }}>
              <Icon className="mr-2 h-6 w-6" />
              {pageData.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
