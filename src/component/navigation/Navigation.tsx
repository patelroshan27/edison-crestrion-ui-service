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
        'flex px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-2 w-full items-center border-b border-neutral-400',
        className,
      )}>
      <div className="flex items-center gap-1 sm:gap-2 md:gap-2 pr-24 sm:pr-28 md:pr-28 w-full">
        {pages.map((page) => {
          const pageData = activeConfig.pages[page];
          return (
            <button
              key={page}
              type="button"
              className={classNames(
                'border border-neutral-400 bg-secondary px-2 sm:px-2 md:px-3 py-1 sm:py-2 md:py-3 flex items-center rounded-lg text-base sm:text-lg md:text-2xl whitespace-nowrap shrink-0',
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
