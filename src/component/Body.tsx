import React from 'react';
import { useRecoilValue } from 'recoil';
import { activeConfigState, pageState } from 'state/navigation';
import Controls from 'component/controls/Controls';
import classNames from 'classnames';

interface Props {
  className?: string;
}

const Body: React.FC<Props> = ({ className }: Props) => {
  const activeConfig = useRecoilValue(activeConfigState);
  const activePage = useRecoilValue(pageState);
  const page = activeConfig.pages[activePage];

  return (
    <div
      className={classNames(
        'h-full w-full flex flex-col gap-6 px-5 py-2',
        className,
      )}>
      <Controls
        configs={page.controls}
        className={page.className}
        style={page.style}
      />
    </div>
  );
};

export default Body;