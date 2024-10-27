import React from 'react';
import classNames from 'classnames';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  activeConfigState,
  loggedInUserState,
  pageState,
} from 'state/navigation';
import { getAllowedPages } from 'utils/getAllowedPages';

interface Props {
  className?: string;
}

const Navigation: React.FC<Props> = ({ className }: Props) => {
  const activeConfig = useRecoilValue(activeConfigState);
  const [activeTab, setActivePage] = useRecoilState(pageState);
  const loggedInUser = useRecoilValue(loggedInUserState);
  const pages = getAllowedPages(activeConfig, loggedInUser);

  return (
    <div
      className={classNames(
        'flex flex-wrap justify-between space-x-2 px-4 sm:px-5 md:px-6 pt-2 pb-2 mb-2 w-full items-center border-b border-neutral-400',
        className,
      )}>
      <div className="flex flex-wrap items-center space-x-2">
        {pages.map((page) => {
          const pageData = activeConfig.pages[page];
          return (
            <button
              key={page}
              type="button"
              className={classNames(
                'border border-neutral-400 bg-secondary px-2 sm:px-3 py-2 sm:py-3 flex items-center rounded-lg text-lg sm:text-xl md:text-2xl mb-2',
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
