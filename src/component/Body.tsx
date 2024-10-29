import React from 'react';
import { useRecoilValue } from 'recoil';
import { activeConfigState, pageState } from 'state/navigation';
import Controls from 'component/controls/Controls';
import classNames from 'classnames';

interface Props {
  className?: string;
}

const Body: React.FC<Props> = ({ className }) => {
  const activeConfig = useRecoilValue(activeConfigState);
  const activePage = useRecoilValue(pageState);
  const page = activeConfig.pages[activePage];

  return (
    <div
      className={classNames(
        'h-full w-full flex flex-col',
        'gap-4 md:gap-5 lg:gap-6',
        'px-0 sm:px-0 md:px-0 pt-4 pb-4',
        'overflow-hidden',
        className,
      )}>
      <div className="w-full h-full overflow-hidden">
        <Controls
          configs={page.controls}
          className={page.className}
          style={page.style}
        />
      </div>
    </div>
  );
};

export default Body;
