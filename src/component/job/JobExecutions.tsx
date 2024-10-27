import React, { useState } from 'react';
import { History } from 'lucide-react';
import JobExecutionsHistory from './JobExecutionHistory';
import { Button } from '@nextui-org/react';
import { type Job } from './types';

interface JobExecutionsProps {
  job: Job;
}

const JobExecutions: React.FC<JobExecutionsProps> = ({ job }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <Button
        aria-label="View History"
        isIconOnly
        color="primary"
        onClick={() => openModal()}>
        <History />
      </Button>
      <JobExecutionsHistory
        job={job}
        isOpen={modalVisible}
        onClose={closeModal}
      />
    </>
  );
};

export default JobExecutions;
