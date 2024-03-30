import classNames from 'classnames';
import { type LucideIcon } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
  label: string;
  iconDef: LucideIcon;
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
        'flex flex-col space-x-1 rounded-lg py-3 text-xl items-center justify-center h-full',
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
