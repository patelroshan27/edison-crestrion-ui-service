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
        'flex justify-between space-x-2 px-6 p-2 mb-2 w-full items-center border-b border-neutral-400',
        className,
      )}>
      <div className="flex items-center space-x-2">
        {pages.map((page) => {
          const pageData = activeConfig.pages[page];
          return (
            <button
              key={page}
              type="button"
              className={classNames(
                'border border-neutral-400 bg-secondary px-3 py-3 flex items-center rounded-lg text-2xl',
                activeTab === page
                  ? '!bg-active text-primary-foreground'
                  : 'bg-background text-primary',
              )}
              onClick={() => {
                setActivePage(page);
              }}>
              {pageData.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
