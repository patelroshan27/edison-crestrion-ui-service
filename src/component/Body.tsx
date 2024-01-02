import React from 'react';
import { useRecoilState } from 'recoil';
import { getConfigs } from 'utils/Configs';
import { pageState } from 'state/navigation';
import Controls from 'component/controls/Controls';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDigitalState, usePublishDigital } from 'utils/hooks';

const configs = getConfigs();

const ScreenOff: React.FC<{ state: string }> = ({ state }) => {
  const isActive = useDigitalState(state);
  const onPublish = usePublishDigital(state);

  return (
    <button
      onClick={() => {
        onPublish();
      }}
      className={classNames(
        'flex gap-2 items-center rounded-md px-3 py-2 text-md font-medium',
        isActive ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500',
      )}>
      <FontAwesomeIcon
        className={classNames(isActive ? 'text-indigo-700' : 'text-slate-700')}
        icon={icon({ name: 'power-off' })}
      />
      Screen Off
    </button>
  );
};

interface Props {
  className?: string;
}

const Body: React.FC<Props> = ({ className }: Props) => {
  const [activePage, setActivePage] = useRecoilState(pageState);
  const activeConfigs = configs.pages[activePage];
  const pages = Object.keys(configs.pages);

  return (
    <div
      className={classNames(
        'bg-slate-100 h-full w-full flex flex-col gap-6 px-8 py-7',
        className,
      )}>
      <div className="flex items-center justify-between">
        {pages.length > 1 ? (
          <nav className="flex space-x-4" aria-label="Tabs">
            {pages.map((pageKey) => {
              const { name, icon } = configs.pages[pageKey];
              const isActive = activePage === pageKey;
              return (
                <button
                  key={pageKey}
                  onClick={() => {
                    setActivePage(pageKey);
                  }}
                  className={classNames(
                    'flex gap-2 items-center rounded-md px-3 py-2 text-md font-medium',
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-slate-500',
                  )}>
                  <FontAwesomeIcon
                    className={classNames(
                      isActive ? 'text-indigo-700' : 'text-slate-700',
                    )}
                    icon={icon}
                  />
                  {name}
                </button>
              );
            })}
          </nav>
        ) : null}
        {configs.screenOff != null ? (
          <ScreenOff state={configs.screenOff} />
        ) : null}
      </div>
      <Controls
        configs={activeConfigs.controls}
        className={activeConfigs.className}
        style={activeConfigs.style}
      />
    </div>
  );
};

export default Body;
