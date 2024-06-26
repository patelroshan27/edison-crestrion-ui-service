import classNames from 'classnames';
import React from 'react';
import { type SvgIcon } from 'types/appState';

interface Props {
  className?: string;
  label: string;
  iconDef: SvgIcon;
  onClick: () => any;
}

const FlatButton: React.FC<Props> = ({
  className,
  label,
  iconDef: Icon,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      className={classNames(
        'flex flex-col space-x-1 rounded-lg text-xl items-center justify-center h-full',
        'outline-none focus:outline-none',
        className ?? 'text-primary border border-neutral-400 bg-secondary',
      )}
      onClick={() => {
        onClick();
      }}>
      <Icon className="w-14 h-14" />
      <p>{label}</p>
    </button>
  );
};

export default FlatButton;
