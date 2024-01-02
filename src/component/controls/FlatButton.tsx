import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

interface Props {
  className?: string;
  label: string;
  iconDef: IconDefinition;
  onClick: () => any;
}

const FlatButton: React.FC<Props> = ({
  className,
  label,
  iconDef,
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
      <FontAwesomeIcon icon={iconDef} />
      <p>{label}</p>
    </button>
  );
};

export default FlatButton;
