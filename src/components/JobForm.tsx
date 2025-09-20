import React, { useState, useEffect } from 'react';
import { Job } from '../types/Job';
import { X, Save } from 'lucide-react';

interface JobFormProps {
  job?: Job | null;
  onSave: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function JobForm({ job, onSave, onCancel }: JobFormProps) {
  const [formData, setFormData] = useState({
    description: '',
    requiredSkills: '',
    desiredSkills: '',
    monthlySalary: '',
    benefits: '',
    location: '',
    isFilled: false
  });

  useEffect(() => {
    if (job) {
      setFormData({
        description: job.description,
        requiredSkills: job.requiredSkills,
        desiredSkills: job.desiredSkills,
        monthlySalary: job.monthlySalary.toString(),
        benefits: job.benefits,
        location: job.location,
        isFilled: job.isFilled
      });
    }
  }, [job]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      description: formData.description,
      requiredSkills: formData.requiredSkills,
      desiredSkills: formData.desiredSkills,
      monthlySalary: parseFloat(formData.monthlySalary),
      benefits: formData.benefits,
      location: formData.location,
      isFilled: formData.isFilled
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {job ? 'Editar Vaga' : 'Nova Vaga de Emprego'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição do Cargo *
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ex: Desenvolvedor Full Stack Sênior"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remuneração Mensal (R$) *
              </label>
              <input
                type="number"
                name="monthlySalary"
                value={formData.monthlySalary}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="5000.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local de Trabalho *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="São Paulo, SP - Remoto"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requisitos Obrigatórios *
            </label>
            <textarea
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="Descreva os conhecimentos e experiências obrigatórias..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requisitos Desejáveis
            </label>
            <textarea
              name="desiredSkills"
              value={formData.desiredSkills}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="Descreva os conhecimentos desejáveis mas não obrigatórios..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Benefícios *
            </label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="Vale refeição, plano de saúde, home office..."
            />
          </div>

          {job && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isFilled"
                name="isFilled"
                checked={formData.isFilled}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isFilled" className="ml-2 block text-sm text-gray-700">
                Vaga preenchida
              </label>
            </div>
          )}

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {job ? 'Atualizar Vaga' : 'Criar Vaga'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}