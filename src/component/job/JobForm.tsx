import React, { useState } from 'react';
import {
  Input,
  Button,
  Textarea,
  Select,
  Checkbox,
  SelectItem,
  Chip,
  Autocomplete,
  AutocompleteItem,
} from '@nextui-org/react';
import { type Job, type Schedule, type JobAction } from './types';
import {
  DAYS_OF_MONTH,
  DAYS_OF_WEEK,
  HOURS,
  JOB_ACTIONS,
  JOB_ACTIONS_MAP,
  type JobActionItem,
  MINUTES,
  MONTHS,
} from './jobUtils';
import { MediaAction } from './MediaAction';
import { DEFAULT_SELECT_PROPS } from './formUtils';

interface JobFormProps {
  job?: Job | null;
  onSubmit: (job: Job) => void;
  onCancel: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ job, onSubmit, onCancel }) => {
  const [name, setName] = useState<string>(job ? job.name : '');
  const [description, setDescription] = useState<string>(
    job ? job.description : '',
  );
  const [enabled, setEnabled] = useState<boolean>(job ? job.enabled : true);
  // TODO handle string values
  const [schedule, setSchedule] = useState<Schedule>(
    job?.schedule ?? {
      daysOfMonth: [],
      daysOfWeek: [],
      months: [],
      hours: [],
      minutes: [],
    },
  );
  const [actions, setActions] = useState<JobAction[]>(job?.actions ?? []);

  // Handle changes to the schedule
  const handleScheduleChange = (
    field: keyof Schedule,
    value: number[],
  ): void => {
    setSchedule((prev) => ({ ...prev, [field]: value }));
  };

  const handleRemoveAction = (action: JobAction): void => {
    setActions((prev) => prev.filter((x) => x.label !== action.label));
  };

  const handleActionChange = (newAction?: JobActionItem): void => {
    if (!newAction) return;

    setActions((prev) => {
      const updatedActions = [
        ...prev,
        {
          label: `${newAction.authID} ${newAction.target} ${newAction.label}`,
          commands: newAction.commands,
        },
      ];

      return updatedActions;
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const newJob: Job = {
      ...job,
      name,
      description,
      enabled,
      schedule,
      actions,
    };
    onSubmit(newJob);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="flex flex-col grow gap-2">
          <h3>Basic Info</h3>
          <Input
            label="Job Name"
            variant="bordered"
            value={name}
            isRequired
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Textarea
            label="Description"
            variant="bordered"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Checkbox
            isSelected={enabled}
            onChange={(e) => setEnabled(e.target.checked)}>
            Enabled
          </Checkbox>
        </div>

        <div className="flex flex-col grow gap-2">
          <h3>Schedule</h3>
          <Select
            {...DEFAULT_SELECT_PROPS}
            label="Days of Month"
            selectionMode="multiple"
            selectedKeys={schedule.daysOfMonth}
            onSelectionChange={(value) =>
              handleScheduleChange(
                'daysOfMonth',
                Array.from(value as Set<number>),
              )
            }>
            {DAYS_OF_MONTH.map((dayOfMonth) => (
              <SelectItem key={dayOfMonth}>{dayOfMonth.toString()}</SelectItem>
            ))}
          </Select>

          <Select
            {...DEFAULT_SELECT_PROPS}
            label="Days of Week"
            selectionMode="multiple"
            selectedKeys={schedule.daysOfWeek}
            onSelectionChange={(value) =>
              handleScheduleChange(
                'daysOfWeek',
                Array.from(value as Set<number>),
              )
            }>
            {DAYS_OF_WEEK.map((day) => (
              <SelectItem key={day.number}>{day.label}</SelectItem>
            ))}
          </Select>

          <Select
            {...DEFAULT_SELECT_PROPS}
            label="Months"
            selectionMode="multiple"
            selectedKeys={schedule.months}
            onSelectionChange={(value) =>
              handleScheduleChange('months', Array.from(value as Set<number>))
            }>
            {MONTHS.map((month) => (
              <SelectItem key={month.number}>{month.label}</SelectItem>
            ))}
          </Select>

          <Select
            {...DEFAULT_SELECT_PROPS}
            label="Hours"
            selectionMode="multiple"
            selectedKeys={schedule.hours}
            onSelectionChange={(value) =>
              handleScheduleChange('hours', Array.from(value as Set<number>))
            }>
            {HOURS.map((hour) => (
              <SelectItem key={hour}>{hour.toString()}</SelectItem>
            ))}
          </Select>

          <Select
            {...DEFAULT_SELECT_PROPS}
            label="Minute"
            selectedKeys={schedule.minutes}
            onSelectionChange={(value) =>
              handleScheduleChange('minutes', Array.from(value as Set<number>))
            }>
            {MINUTES.map((minute) => (
              <SelectItem key={minute}>{minute.toString()}</SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-col grow gap-2 max-w-[35vw] max-w-xs">
          <h3>Actions</h3>
          <Autocomplete
            variant="bordered"
            label="Add Actions"
            className="max-w-xs"
            onSelectionChange={(value) =>
              value && handleActionChange(JOB_ACTIONS_MAP.get(value.toString()))
            }>
            {JOB_ACTIONS.map((action) => (
              <AutocompleteItem key={action.id}>
                {`${action.authID} ${action.target} ${action.label}`}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <MediaAction handleActionChange={handleActionChange} />
          <div className="flex flex-wrap gap-2 my-1">
            {actions.map((action, i) => (
              <Chip key={i} onClose={() => handleRemoveAction(action)}>
                {action.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        <Button color="primary" type="submit">
          {job ? 'Update Job' : 'Create Job'}
        </Button>
        {job && (
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default JobForm;
