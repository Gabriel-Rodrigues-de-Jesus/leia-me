import React from 'react';
import { Job } from '../types/Job';
import { JobCard } from './JobCard';
import { Briefcase } from 'lucide-react';

interface JobListProps {
  jobs: Job[];
  filter: 'all' | 'open' | 'filled';
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function JobList({ jobs, filter, onEdit, onDelete, onToggleStatus }: JobListProps) {
  const filteredJobs = jobs.filter(job => {
    if (filter === 'open') return !job.isFilled;
    if (filter === 'filled') return job.isFilled;
    return true;
  });

  if (filteredJobs.length === 0) {
    const message = filter === 'open' 
      ? 'Nenhuma vaga em aberto encontrada'
      : filter === 'filled'
      ? 'Nenhuma vaga preenchida encontrada'
      : 'Nenhuma vaga cadastrada ainda';

    return (
      <div className="text-center py-16">
        <Briefcase size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">{message}</h3>
        <p className="text-gray-500">
          {jobs.length === 0 && 'Comece criando sua primeira vaga de emprego!'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {filteredJobs.map(job => (
        <JobCard
          key={job.id}
          job={job}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}