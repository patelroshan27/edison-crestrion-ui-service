import React, { useState } from 'react';
import {
  Input,
  Button,
  Textarea,
  Select,
  Checkbox,
  SelectItem,
} from '@nextui-org/react';
import { type Job, type Schedule, type JobAction } from './types';
import { DAYS_OF_WEEK, MONTHS } from './jobUtils';

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

  // Handle adding/removing actions
  const handleAddAction = (): void => {
    const newAction: JobAction = { type: '' }; // Adjust this based on your JobAction schema
    setActions((prev) => [...prev, newAction]);
  };

  const handleRemoveAction = (index: number): void => {
    setActions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleActionChange = (
    index: number,
    key: keyof JobAction,
    value: string,
  ): void => {
    setActions((prev) => {
      const updatedActions = [...prev];
      updatedActions[index] = { ...updatedActions[index], [key]: value };
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
      <div className="flex flex-row gap-2">
        <div className="flex flex-col grow gap-2">
          <h3>Basic Info</h3>
          <Input
            label="Job Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Textarea
            label="Description"
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
            label="Days of Month"
            selectionMode="multiple"
            selectedKeys={schedule.daysOfMonth}
            onSelectionChange={(value) =>
              handleScheduleChange(
                'daysOfMonth',
                Array.from(value as Set<number>),
              )
            }>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((dayOfMonth) => (
              <SelectItem key={dayOfMonth}>{dayOfMonth.toString()}</SelectItem>
            ))}
          </Select>

          <Select
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
            label="Hours"
            selectionMode="multiple"
            selectedKeys={schedule.hours}
            onSelectionChange={(value) =>
              handleScheduleChange('hours', Array.from(value as Set<number>))
            }>
            {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
              <SelectItem key={hour}>{hour.toString()}</SelectItem>
            ))}
          </Select>

          <Select
            label="Minute"
            selectedKeys={schedule.minutes}
            onSelectionChange={(value) =>
              handleScheduleChange('minutes', Array.from(value as Set<number>))
            }>
            {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
              <SelectItem key={minute}>{minute.toString()}</SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-col grow gap-2">
          <h3>Actions</h3>
          {actions.map((action, index) => (
            <div key={index}>
              <Select
                label="Action Type"
                value={action.type}
                onSelectionChange={(value) =>
                  handleActionChange(
                    index,
                    'type',
                    Array.from(value as Set<string>)[0],
                  )
                }>
                {['Pharos', 'Zum'].map((actionType) => (
                  <SelectItem key={actionType}>{actionType}</SelectItem>
                ))}
              </Select>
              <Button onClick={() => handleRemoveAction(index)}>
                Remove Action
              </Button>
            </div>
          ))}
          <Button onClick={handleAddAction}>Add Action</Button>
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        <Button type="submit">{job ? 'Update Job' : 'Create Job'}</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
