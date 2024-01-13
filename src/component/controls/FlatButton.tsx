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
        'flex flex-col gap-1 rounded-lg py-3 text-lg font-semibold items-center justify-center h-full',
        className ?? 'bg-slate-100 text-slate-900',
      )}
      onClick={() => {
        onClick();
      }}>
      <Icon className="w-4 h-4" />
      <p>{label}</p>
    </button>
  );
};

export default FlatButton;
