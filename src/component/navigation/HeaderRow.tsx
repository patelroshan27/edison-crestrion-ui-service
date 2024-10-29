import React, {
  type ReactNode,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HeaderRowProps {
  className?: string;
  children: ReactNode;
  label?: string;
}

export const HeaderRow: React.FC<HeaderRowProps> = ({
  className,
  children,
  label = 'Select Option',
}: HeaderRowProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  // Calculate and store the maximum width needed
  useEffect(() => {
    if (buttonRef.current) {
      const currentWidth = buttonRef.current.offsetWidth;
      setMaxWidth((prev) => Math.max(prev, currentWidth));
    }
  }, [label]);

  if (!children) return null;

  return (
    <div
      className={classNames(
        'flex px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-2 w-full items-center border-b border-neutral-400',
        className,
      )}>
      {/* Regular view for TSW 760 (≥1024px) */}
      <div className="hidden md:flex md:items-center md:gap-1 md:pr-28 md:w-full md:overflow-x-auto no-scrollbar">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(
              child as React.ReactElement<{ className?: string }>,
              {
                className: classNames(
                  'border border-neutral-400 bg-secondary px-2 sm:px-2 md:px-3 py-1 sm:py-2 md:py-3 flex items-center rounded-lg text-base sm:text-lg md:text-2xl whitespace-nowrap shrink-0',
                  child.props.className,
                ),
              },
            );
          }
          return child;
        })}
      </div>

      {/* Dropdown for smaller screens (<1024px) */}
      <div className="md:hidden inline-block relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleDropdown}
          style={{ minWidth: `${maxWidth}px` }}
          className="flex items-center justify-between border border-neutral-400 bg-secondary px-2 py-1 rounded-lg">
          <span className="text-base whitespace-nowrap">{label}</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 ml-1" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-1" />
          )}
        </button>

        {isOpen && (
          <div
            className="absolute z-50 mt-1 bg-background border border-neutral-400 rounded-lg shadow-lg"
            style={{
              width: maxWidth * 1.2,
              left: -(maxWidth * 0.1),
            }}>
            <div className="py-1">
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(
                    child as React.ReactElement<{
                      className?: string;
                      onClick?: (e: React.MouseEvent) => void;
                    }>,
                    {
                      className: classNames(
                        'w-full px-2 py-1 text-left hover:bg-secondary whitespace-nowrap text-base truncate',
                        child.props.className,
                      ),
                      onClick: (e: React.MouseEvent) => {
                        child.props.onClick?.(e);
                        setIsOpen(false);
                      },
                    },
                  );
                }
                return child;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
