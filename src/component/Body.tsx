import React from 'react';
import { useRecoilValue } from 'recoil';
import { getConfigs } from 'utils/Configs';
import { pageState } from 'state/navigation';
import Controls from 'component/controls/Controls';
import classNames from 'classnames';

const configs = getConfigs();

interface Props {
  className?: string;
}

const Body: React.FC<Props> = ({ className }: Props) => {
  const activePage = useRecoilValue(pageState);
  const activeConfigs = configs.pages[activePage];

  return (
    <div
      className={classNames(
        'h-full w-full flex flex-col gap-6 px-8 py-6',
        className,
      )}>
      <Controls
        configs={activeConfigs.controls}
        className={activeConfigs.className}
        style={activeConfigs.style}
      />
    </div>
  );
};

export default Body;
