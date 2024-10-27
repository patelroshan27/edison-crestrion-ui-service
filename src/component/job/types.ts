type SchedulePresetType = 'OnSunrise' | 'OnSunset';

interface SchedulePreset {
  type: SchedulePresetType;
  offsetInMinutes?: number;
}

export interface Schedule {
  daysOfMonth: number[];
  daysOfWeek: number[];
  months: number[];
  hours: number[];
  minutes: number[];
  preset?: SchedulePreset;
}

export interface JobAction {
  label: string;
  commands: unknown[];
}

export interface Job {
  _id?: number;
  name: string;
  description: string;
  enabled: boolean;
  schedule: Schedule;
  actions: JobAction[];
  jobExecutions?: JobExecution[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JobExecution {
  jobId: number;
  executionTime: Date;
}
