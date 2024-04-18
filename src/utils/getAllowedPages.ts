import { type UIConfig } from 'config/Configs';
import { type LOGGED_OUT_USER } from 'state/navigation';

export const getAllowedPages = (
  currConfig: UIConfig,
  currUser: typeof LOGGED_OUT_USER,
): string[] => {
  return Object.keys(currConfig.pages).filter((k) => {
    const requiredRoles = currConfig.pages[k].requiredRoles;

    if (requiredRoles) {
      return requiredRoles.includes(currUser.role);
    }

    return true;
  });
};
