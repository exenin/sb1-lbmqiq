import React, { useState } from 'react';
import { Calendar, Target, DollarSign, Clock } from 'lucide-react';
import { CampaignDraft } from '../../types/marketing';

interface CampaignFormProps {
  onSubmit: (campaign: CampaignDraft) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<CampaignDraft>;
}

export default function CampaignForm({ onSubmit, onCancel, initialData }: CampaignFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CampaignDraft>({
    name: '',
    type: 'email',
    status: 'draft',
    startDate: new Date().toISOString().split('T')[0],
    audience: {
      target: '',
      size: 0,
      segments: []
    },
    content: {
      title: '',
      description: '',
      assets: []
    },
    ...initialData
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
          Campaign Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 input-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Campaign Type
          </label>
          <select
            value={formData.type}
            onChange={e => setFormData({ ...formData, type: e.target.value as any })}
            className="mt-1 input-primary"
          >
            <option value="email">Email Campaign</option>
            <option value="social">Social Media</option>
            <option value="ads">Paid Advertising</option>
            <option value="content">Content Marketing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            required
            value={formData.startDate}
            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
            className="mt-1 input-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Target Audience
        </label>
        <input
          type="text"
          value={formData.audience.target}
          onChange={e => setFormData({
            ...formData,
            audience: { ...formData.audience, target: e.target.value }
          })}
          className="mt-1 input-primary"
          placeholder="e.g., 'Small Business Owners aged 25-45'"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Campaign Content
        </label>
        <div className="space-y-4 mt-1">
          <input
            type="text"
            value={formData.content.title}
            onChange={e => setFormData({
              ...formData,
              content: { ...formData.content, title: e.target.value }
            })}
            className="input-primary"
            placeholder="Campaign Title"
          />
          <textarea
            value={formData.content.description}
            onChange={e => setFormData({
              ...formData,
              content: { ...formData.content, description: e.target.value }
            })}
            className="input-primary"
            rows={4}
            placeholder="Campaign Description"
          />
        </div>
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
          className="btn-primary"
        >
          {loading ? 'Creating...' : 'Create Campaign'}
        </button>
      </div>
    </form>
  );
}