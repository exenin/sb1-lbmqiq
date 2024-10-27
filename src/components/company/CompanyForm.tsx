import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface CompanyFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function CompanyForm({ onSubmit, onCancel }: CompanyFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    website: '',
    industry: '',
    size: '',
    admin: {
      useCurrentUser: true,
      name: '',
      email: '',
      role: 'admin'
    }
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
          Company Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 input-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Type
        </label>
        <select
          required
          value={formData.type}
          onChange={e => setFormData({ ...formData, type: e.target.value })}
          className="mt-1 input-primary"
        >
          <option value="">Select type...</option>
          <option value="startup">Startup</option>
          <option value="enterprise">Enterprise</option>
          <option value="agency">Agency</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Website
        </label>
        <input
          type="url"
          value={formData.website}
          onChange={e => setFormData({ ...formData, website: e.target.value })}
          className="mt-1 input-primary"
          placeholder="https://"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Industry
        </label>
        <input
          type="text"
          value={formData.industry}
          onChange={e => setFormData({ ...formData, industry: e.target.value })}
          className="mt-1 input-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Size
        </label>
        <select
          value={formData.size}
          onChange={e => setFormData({ ...formData, size: e.target.value })}
          className="mt-1 input-primary"
        >
          <option value="">Select size...</option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="501+">501+ employees</option>
        </select>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Company Admin</h3>
        
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.admin.useCurrentUser}
              onChange={e => setFormData({
                ...formData,
                admin: {
                  ...formData.admin,
                  useCurrentUser: e.target.checked
                }
              })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">
              I will be the company admin
            </span>
          </label>

          {!formData.admin.useCurrentUser && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Admin Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.admin.name}
                  onChange={e => setFormData({
                    ...formData,
                    admin: { ...formData.admin, name: e.target.value }
                  })}
                  className="mt-1 input-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.admin.email}
                  onChange={e => setFormData({
                    ...formData,
                    admin: { ...formData.admin, email: e.target.value }
                  })}
                  className="mt-1 input-primary"
                />
              </div>
            </>
          )}
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
          className="btn-primary flex items-center"
        >
          {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Create Company
        </button>
      </div>
    </form>
  );
}