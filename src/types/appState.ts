import { type LucideIcon } from 'lucide-react';

export interface LoggedInUser {
  name: string;
  passcode: string;
  role: string;
}

export type SvgIcon = LucideIcon | React.FC<{ className: string }>;
