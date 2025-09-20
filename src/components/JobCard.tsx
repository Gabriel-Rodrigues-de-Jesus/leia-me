import React from 'react';
import { Job } from '../types/Job';
import { MapPin, DollarSign, Edit3, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function JobCard({ job, onEdit, onDelete, onToggleStatus }: JobCardProps) {
  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border-l-4 p-6 hover:shadow-xl transition-all duration-300 ${
      job.isFilled ? 'border-l-gray-400 opacity-75' : 'border-l-blue-600'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{job.description}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.isFilled 
                ? 'bg-gray-100 text-gray-600 border border-gray-300' 
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}>
              {job.isFilled ? 'Preenchida' : 'Em Aberto'}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span className="text-sm">{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={16} />
              <span className="text-sm font-medium">{formatSalary(job.monthlySalary)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onToggleStatus(job.id)}
            className={`p-2 rounded-lg transition-colors ${
              job.isFilled 
                ? 'text-gray-500 hover:text-green-600 hover:bg-green-50' 
                : 'text-green-600 hover:text-gray-500 hover:bg-gray-50'
            }`}
            title={job.isFilled ? 'Marcar como aberta' : 'Marcar como preenchida'}
          >
            {job.isFilled ? <XCircle size={20} /> : <CheckCircle size={20} />}
          </button>
          <button
            onClick={() => onEdit(job)}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar vaga"
          >
            <Edit3 size={20} />
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
            title="Excluir vaga"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-gray-700 mb-1">Requisitos Obrigatórios</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{job.requiredSkills}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-1">Requisitos Desejáveis</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{job.desiredSkills}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-1">Benefícios</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{job.benefits}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
        Criado em {job.createdAt.toLocaleDateString('pt-BR')}
        {job.updatedAt.getTime() !== job.createdAt.getTime() && (
          <span> • Atualizado em {job.updatedAt.toLocaleDateString('pt-BR')}</span>
        )}
      </div>
    </div>
  );
}