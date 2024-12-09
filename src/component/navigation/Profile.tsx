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
        'relative inline-flex items-center rounded-lg transition-colors duration-200 ease-in-out focus:outline-none',
        'px-5 py-3',
        'text-2xl',
        'border border-neutral-400',
        isDarkTheme ? 'bg-gray-700' : 'bg-gray-200',
      )}
      onClick={toggleTheme}>
      {isDarkTheme ? (
        <Moon className="h-7 w-7 text-gray-200" />
      ) : (
        <Sun className="h-7 w-7 text-yellow-500" />
      )}
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
    <div className="fixed right-2 sm:right-3 md:right-4 top-2 sm:top-3 md:top-4 flex items-center gap-2 sm:gap-3 md:gap-4 z-10">
      <Theme isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      <button
        type="button"
        className={classNames(
          'border border-neutral-400 bg-secondary flex items-center justify-center rounded-lg text-primary-foreground',
          'px-5 py-3',
          'text-2xl'
        )}
        onClick={() => setLoggedInUser(LOGGED_OUT_USER)}>
        <Lock className="h-7 w-7 text-red-500" />
      </button>
    </div>
  );
};
