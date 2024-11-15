import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { type Job, type JobExecution } from './types';
import axios from 'axios';
import moment from 'moment';

interface JobExecutionsHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;
const jobsExecutionsUrl = `${baseUrl}/jobs/executions`;

const JobExecutionsHistory: React.FC<JobExecutionsHistoryProps> = ({
  job,
  isOpen,
  onClose,
}) => {
  const [data, setData] = useState<JobExecution[]>([]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const pages = Math.ceil(data.length / rowsPerPage);

  const itemsToShow = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const fetchData = async () => {
    if (!job._id) return;

    try {
      const response = await axios.get(`${jobsExecutionsUrl}/${job._id}`);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData().catch((err) => console.log(err));
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2>Job Executions</h2>
        </ModalHeader>
        <Table
          aria-label="Job Executions Table"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }>
          <TableHeader>
            <TableColumn>Execution Time</TableColumn>
            <TableColumn>Result</TableColumn>
          </TableHeader>
          <TableBody>
            {itemsToShow.map((job, index) => (
              <TableRow key={index}>
                <TableCell>
                  {moment(job.executionTime).format('LLLL')}
                </TableCell>
                <TableCell>{job.error ? 'Failure' : 'Success'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ModalContent>
    </Modal>
  );
};

export default JobExecutionsHistory;
