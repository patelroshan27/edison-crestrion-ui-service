import React, { type Key } from 'react';
import classNames from 'classnames';
import TimeDisplay from 'component/navigation/TimeDisplay';
import { Tabs, Tab } from '@nextui-org/react';
import { useRecoilState } from 'recoil';
import { pageState } from 'state/navigation';
import { getConfigs } from 'utils/Configs';
import { capitalCase } from 'change-case';

const configs = getConfigs();

interface Props {
  className?: string;
}

const Navigation: React.FC<Props> = ({ className }: Props) => {
  const [activeTab, setActivePage] = useRecoilState(pageState);
  const pages = Object.keys(configs.pages);

  return (
    <div
      className={classNames(
        'flex justify-between px-6 py-4 w-full items-center bg-black',
        className,
      )}>
      <TimeDisplay />
      <Tabs
        aria-label="Navigation"
        color="primary"
        variant="bordered"
        selectedKey={activeTab}
        onSelectionChange={(key: Key) => {
          setActivePage(key.toString());
        }}>
        {pages.map((page) => {
          const Icon = configs.pages[page].icon;
          return (
            <Tab
              key={page}
              title={
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {capitalCase(page)}
                </div>
              }
            />
          );
        })}
      </Tabs>
    </div>
  );
};

export default Navigation;
