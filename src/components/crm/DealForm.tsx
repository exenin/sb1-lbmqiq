import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface DealFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  initialData?: any;
}

export default function DealForm({ onSubmit, onCancel, initialData }: DealFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    title: '',
    company: '',
    value: '',
    stage: 'discovery',
    probability: 20,
    expectedCloseDate: '',
    owner: '',
    description: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Deal Title
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 input-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company
        </label>
        <input
          type="text"
          required
          value={formData.company}
          onChange={e => setFormData({ ...formData, company: e.target.value })}
          className="mt-1 input-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deal Value
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              required
              value={formData.value}
              onChange={e => setFormData({ ...formData, value: e.target.value })}
              className="input-primary pl-7"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expected Close Date
          </label>
          <input
            type="date"
            required
            value={formData.expectedCloseDate}
            onChange={e => setFormData({ ...formData, expectedCloseDate: e.target.value })}
            className="mt-1 input-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stage
          </label>
          <select
            value={formData.stage}
            onChange={e => setFormData({ ...formData, stage: e.target.value })}
            className="mt-1 input-primary"
          >
            <option value="discovery">Discovery</option>
            <option value="qualification">Qualification</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Probability (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.probability}
            onChange={e => setFormData({ ...formData, probability: parseInt(e.target.value) })}
            className="mt-1 input-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Deal Owner
        </label>
        <input
          type="text"
          value={formData.owner}
          onChange={e => setFormData({ ...formData, owner: e.target.value })}
          className="mt-1 input-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 input-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          rows={3}
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          className="mt-1 input-primary"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center"
        >
          {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {initialData ? 'Update Deal' : 'Create Deal'}
        </button>
      </div>
    </form>
  );
}