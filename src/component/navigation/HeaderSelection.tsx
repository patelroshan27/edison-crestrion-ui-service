import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { HeaderRow } from './HeaderRow';
import classNames from 'classnames';

interface HeaderSelectionProps<T> {
  label: string;
  placeholder: string;
  className?: string;
  items: Array<{ title: string; key: T }>;
  selected?: T;
  onSelect: (value: T) => void;
}

export const HeaderSelection = <T extends string>({
  label,
  placeholder,
  items,
  className,
  selected,
  onSelect,
}: HeaderSelectionProps<T>): JSX.Element => {
  return (
    <>
      <HeaderRow className={`${className ?? ''} mob:hidden`}>
        {items.length > 0 &&
          items.map((item) => {
            return (
              <button
                key={item.key}
                type="button"
                className={classNames(
                  'border border-neutral-400 bg-secondary px-3 py-3 flex items-center rounded-lg text-2xl',
                  item.key === selected
                    ? '!bg-active text-primary-foreground'
                    : 'bg-background text-primary',
                )}
                onClick={() => {
                  onSelect(item.key);
                }}>
                {item.title}
              </button>
            );
          })}
      </HeaderRow>
      <Select
        label={label}
        placeholder={placeholder}
        selectedKeys={selected ? [selected] : []}
        onSelectionChange={(val) => onSelect(Array.from(val)[0] as T)}
        variant="bordered"
        className={`hidden mob:block m-1 w-auto ${className ?? ''}`}>
        {items.map((item) => (
          <SelectItem key={item.key}>{item.title}</SelectItem>
        ))}
      </Select>
    </>
  );
};
