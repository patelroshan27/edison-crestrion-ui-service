import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { type Job } from './types';
import { CheckCircle, CircleIcon, EditIcon, Trash2 } from 'lucide-react';
import JobExecutions from './JobExecutions';

interface JobListProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Description</TableColumn>
        <TableColumn>Enabled</TableColumn>
        <TableColumn>Edit</TableColumn>
        <TableColumn>Delete</TableColumn>
        <TableColumn>History</TableColumn>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job._id}>
            <TableCell>{job.name}</TableCell>
            <TableCell className="overflow-hidden">{job.description}</TableCell>
            <TableCell>
              {job.enabled ? <CheckCircle /> : <CircleIcon />}
            </TableCell>
            <TableCell>
              <Button
                aria-label="Edit"
                isIconOnly
                color="primary"
                onClick={() => onEdit(job)}>
                <EditIcon />
              </Button>
            </TableCell>
            <TableCell>
              <Button
                aria-label="Delete"
                isIconOnly
                color="danger"
                onClick={() => job._id && onDelete(job._id)}>
                <Trash2 />
              </Button>
            </TableCell>
            <TableCell>
              <JobExecutions job={job} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JobList;
