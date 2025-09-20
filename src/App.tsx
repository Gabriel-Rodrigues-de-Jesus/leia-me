import React, { useState } from 'react';
import { Job } from './types/Job';
import { JobForm } from './components/JobForm';
import { JobList } from './components/JobList';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { Plus, Briefcase, Filter, Users } from 'lucide-react';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; job: Job | null }>({
    isOpen: false,
    job: null
  });
  const [filter, setFilter] = useState<'all' | 'open' | 'filled'>('all');

  const handleSaveJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingJob) {
      setJobs(prev => prev.map(job => 
        job.id === editingJob.id 
          ? { ...jobData, id: editingJob.id, createdAt: editingJob.createdAt, updatedAt: new Date() }
          : job
      ));
      setEditingJob(null);
    } else {
      const newJob: Job = {
        ...jobData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setJobs(prev => [newJob, ...prev]);
    }
    setShowForm(false);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDeleteJob = (id: string) => {
    const job = jobs.find(j => j.id === id);
    if (job) {
      setDeleteConfirm({ isOpen: true, job });
    }
  };

  const confirmDelete = () => {
    if (deleteConfirm.job) {
      setJobs(prev => prev.filter(job => job.id !== deleteConfirm.job!.id));
    }
    setDeleteConfirm({ isOpen: false, job: null });
  };

  const handleToggleStatus = (id: string) => {
    setJobs(prev => prev.map(job =>
      job.id === id 
        ? { ...job, isFilled: !job.isFilled, updatedAt: new Date() }
        : job
    ));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  const openJobs = jobs.filter(job => !job.isFilled).length;
  const filledJobs = jobs.filter(job => job.isFilled).length;

  const filterOptions = [
    { value: 'all', label: 'Todas as Vagas', count: jobs.length },
    { value: 'open', label: 'Em Aberto', count: openJobs },
    { value: 'filled', label: 'Preenchidas', count: filledJobs }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-600 rounded-xl shadow-lg">
              <Briefcase size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sistema de Gestão de Vagas
          </h1>
          <p className="text-gray-600 text-lg">
            Gerencie suas oportunidades de emprego de forma eficiente
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Vagas</p>
                <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
              </div>
              <Briefcase size={32} className="text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vagas Em Aberto</p>
                <p className="text-3xl font-bold text-gray-900">{openJobs}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Users size={28} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vagas Preenchidas</p>
                <p className="text-3xl font-bold text-gray-900">{filledJobs}</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Users size={28} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus size={20} />
            Nova Vaga
          </button>

          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <div className="flex gap-2">
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value as typeof filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === option.value
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <JobList
            jobs={jobs}
            filter={filter}
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </div>

      {/* Modals */}
      {showForm && (
        <JobForm
          job={editingJob}
          onSave={handleSaveJob}
          onCancel={handleCloseForm}
        />
      )}

      <DeleteConfirmModal
        isOpen={deleteConfirm.isOpen}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, job: null })}
        jobTitle={deleteConfirm.job?.description || ''}
      />
    </div>
  );
}

export default App;