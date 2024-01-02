import type { CustomControlData } from 'utils/Configs';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  className?: string;
  config: CustomControlData;
}

const CustomControl: React.FC<Props> = ({ className, config }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  useEffect(() => {
    async function fetchState(): Promise<void> {
      const newIsActive = await config.isActive();
      setIsActive(newIsActive);
    }

    const intervalID = setInterval(() => {
      fetchState().catch(console.error);
    }, 1000 * 30);

    fetchState().catch(console.error);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <button
      className={classNames(
        'aspect-square rounded-2xl flex flex-col p-6 justify-between',
        isActive
          ? 'bg-slate-900 text-slate-100'
          : 'bg-slate-200 text-slate-900',
        className,
      )}
      onClick={() => {
        if (isActive) {
          config.onToggleOff().catch(console.error);
        } else {
          config.onToggleOn().catch(console.error);
        }
      }}>
      <div className="flex justify-between items-center w-full">
        <div
          className={classNames(
            'flex w-14 aspect-square items-center justify-center text-2xl rounded-full',
            isActive
              ? 'bg-indigo-500 text-slate-100'
              : 'bg-slate-100 text-slate-900',
          )}>
          <FontAwesomeIcon icon={config.icon} />
        </div>
      </div>
      <div className={classNames('w-full text-start flex flex-col gap-1.5')}>
        <p className="text-sm leading-none font-semibold text-slate-500">
          {config.title ?? 'Button'}
        </p>
        <p
          className={classNames(
            'text-2xl leading-none',
            isActive ? 'text-slate-200' : 'text-slate-900',
          )}>
          {config.label}
        </p>
      </div>
    </button>
  );
};

export default CustomControl;
