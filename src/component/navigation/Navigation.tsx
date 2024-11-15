import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  activeConfigState,
  loggedInUserState,
  pageState,
} from 'state/navigation';
import { getAllowedPages } from 'utils/getAllowedPages';
import { HeaderSelection } from './HeaderSelection';

interface Props {
  className?: string;
}

const Navigation: React.FC<Props> = ({ className }: Props) => {
  const activeConfig = useRecoilValue(activeConfigState);
  const [activeTab, setActivePage] = useRecoilState(pageState);
  const loggedInUser = useRecoilValue(loggedInUserState);
  const pages = getAllowedPages(activeConfig, loggedInUser);

  return (
    <HeaderSelection
      className="mb-2 pb-2 border-b-1"
      items={pages.map((p) => ({ title: activeConfig.pages[p].name, key: p }))}
      selected={activeTab}
      onSelect={setActivePage}
      label="Tab"
      placeholder="Select Tab"
    />
  );
};

export default Navigation;
