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
        'aspect-square flex flex-col gap-1 rounded-lg py-3 text-md items-center justify-center h-full',
        className ?? 'bg-black text-primary border border-primary',
      )}
      onClick={() => {
        onClick();
      }}>
      <Icon className="w-6 h-6" />
      <p>{label}</p>
    </button>
  );
};

export default FlatButton;
