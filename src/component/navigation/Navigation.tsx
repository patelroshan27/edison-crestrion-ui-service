import React from 'react';
import classNames from 'classnames';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  activeConfigState,
  isLoggedInState,
  pageState,
} from 'state/navigation';
import { getConfigs } from 'utils/Configs';
import { Lock } from 'lucide-react';

const defaultConfig = getConfigs();

interface Props {
  className?: string;
}

const Navigation: React.FC<Props> = ({ className }: Props) => {
  const activeConfig = useRecoilValue(activeConfigState);
  const [activeTab, setActivePage] = useRecoilState(pageState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const pages = Object.keys(activeConfig.pages);

  return (
    <div
      className={classNames(
        'flex justify-between space-x-2 px-6 py-4 w-full items-center border-b border-primary',
        className,
      )}>
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className={classNames(
            'px-4 py-4 flex items-center rounded-lg text-4xl bg-primary text-primary-foreground',
          )}
          onClick={() => {
            setIsLoggedIn(false);
          }}>
          <Lock className="mr-3 h-6 w-6 text-lg" />
          <div className="text-left flex flex-col">
            <span className="leading-none text-xl">Lock</span>
            <span className="text-lg">{defaultConfig.authID}</span>
          </div>
        </button>
      </div>
      <div className="flex items-center space-x-2">
        {pages.map((page) => {
          const pageData = activeConfig.pages[page];
          const Icon = pageData.icon;
          return (
            <button
              key={page}
              type="button"
              className={classNames(
                'px-4 py-4 flex items-center rounded-lg text-4xl',
                activeTab === page
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/10 text-primary',
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
