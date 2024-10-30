import React from 'react';
import { useRecoilValue } from 'recoil';
import { activeConfigState, pageState } from 'state/navigation';
import Controls from 'component/controls/Controls';

interface Props {
  className?: string;
}

const Body: React.FC<Props> = ({ className }) => {
  const activeConfig = useRecoilValue(activeConfigState);
  const activePage = useRecoilValue(pageState);
  const page = activeConfig.pages[activePage];

  return (
    <div className="w-full h-full overflow-hidden">
      <Controls
        configs={page.controls}
        className={page.className}
        style={page.style}
      />
    </div>
  );
};

export default Body;
