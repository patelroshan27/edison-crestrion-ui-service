import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobForm from './JobForm';
import JobList from './JobList';
import { type Job } from './types';

const JobManager: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs().catch((err) => console.log(err));
  }, []);

  const fetchJobs = async (): Promise<void> => {
    const response = await axios.get<Job[]>('http://localhost:4000/jobs'); // Adjust the API URL as needed
    setJobs(response.data);
  };

  const handleCreateJob = async (newJob: Job): Promise<void> => {
    await axios.post('http://localhost:4000/jobs', newJob);
    await fetchJobs();
    setEditingJob(null);
  };

  const handleUpdateJob = async (updatedJob: Job): Promise<void> => {
    if (!updatedJob._id) return;
    await axios.put(`http://localhost:4000/jobs/${updatedJob._id}`, updatedJob);
    await fetchJobs();
    setEditingJob(null);
  };

  const handleDeleteJob = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:4000/jobs/${id}`);
    await fetchJobs();
  };

  return (
    <div className="block">
      {editingJob ? (
        <JobForm
          key={editingJob._id}
          job={editingJob}
          onSubmit={handleUpdateJob}
          onCancel={() => setEditingJob(null)}
        />
      ) : (
        <JobForm
          onSubmit={handleCreateJob}
          onCancel={() => setEditingJob(null)}
        />
      )}
      <JobList jobs={jobs} onEdit={setEditingJob} onDelete={handleDeleteJob} />
    </div>
  );
};

export default JobManager;
