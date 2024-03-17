import React from 'react';
import classNames from 'classnames';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeConfigState, pageState } from 'state/navigation';

interface Props {
  className?: string;
}

const Navigation: React.FC<Props> = ({ className }: Props) => {
  const activeConfig = useRecoilValue(activeConfigState);
  const [activeTab, setActivePage] = useRecoilState(pageState);
  const pages = Object.keys(activeConfig.pages);

  return (
    <div
      className={classNames(
        'flex justify-between space-x-2 px-6 py-1 w-full items-center border-b border-primary',
        className,
      )}>
      <div className="flex items-center space-x-2">
        {pages.map((page) => {
          const pageData = activeConfig.pages[page];
          const Icon = pageData.icon;
          return (
            <button
              key={page}
              type="button"
              className={classNames(
                'px-4 py-4 flex items-center rounded-lg text-lg',
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
