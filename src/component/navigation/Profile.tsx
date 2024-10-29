import React from 'react';
import { Lock, Moon, Sun } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { LOGGED_OUT_USER, loggedInUserState } from 'state/navigation';
import classNames from 'classnames';

interface ProfileProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const Theme: React.FC<ThemeProps> = React.memo(function Theme({
  isDarkTheme,
  toggleTheme,
}: ThemeProps) {
  return (
    <button
      type="button"
      className={classNames(
        'relative inline-flex items-center h-8 sm:h-10 md:h-14 rounded-full w-12 sm:w-14 md:w-20 transition-colors duration-200 ease-in-out focus:outline-none',
        isDarkTheme ? 'bg-gray-700' : 'bg-gray-200',
      )}
      onClick={toggleTheme}>
      <span
        className={classNames(
          'inline-block w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 transform rounded-full transition-transform duration-200 ease-in-out',
          isDarkTheme
            ? 'translate-x-6 sm:translate-x-6 md:translate-x-8 bg-gray-900'
            : 'translate-x-0 bg-white',
        )}>
        {isDarkTheme ? (
          <Moon className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-gray-200 m-1 sm:m-1 md:m-2" />
        ) : (
          <Sun className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-yellow-500 m-1 sm:m-1 md:m-2" />
        )}
      </span>
    </button>
  );
});

Theme.displayName = 'Theme';

interface ThemeProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export const Profile: React.FC<ProfileProps> = ({
  isDarkTheme,
  toggleTheme,
}) => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);

  if (loggedInUser === LOGGED_OUT_USER) return null;

  return (
    <div className="fixed right-2 sm:right-3 md:right-6 top-1 sm:top-2 md:top-2 flex items-center gap-1 sm:gap-2 md:gap-4 z-10">
      <Theme isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      <button
        type="button"
        className="border border-neutral-400 bg-secondary flex items-center justify-center rounded-lg text-primary-foreground w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14"
        onClick={() => {
          setLoggedInUser(LOGGED_OUT_USER);
        }}>
        <Lock className="h-3 w-3 sm:h-5 sm:w-5 md:h-7 md:w-7 text-red-500" />
      </button>
    </div>
  );
};
