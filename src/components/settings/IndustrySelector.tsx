import React from 'react';
import { Building2 } from 'lucide-react';
import { useIndustryProfile } from '../../hooks/useIndustryProfile';
import Card from '../common/Card';

export default function IndustrySelector() {
  const { currentProfile, switchProfile, availableProfiles } = useIndustryProfile();

  return (
    <Card title="Industry Settings" icon={Building2}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry Type
          </label>
          <select
            value={currentProfile.type}
            onChange={(e) => switchProfile(e.target.value as any)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {availableProfiles.map(profile => (
              <option key={profile.id} value={profile.type}>
                {profile.name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            {currentProfile.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Enabled Features</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(currentProfile.features).map(([feature, enabled]) => (
              <div key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  checked={enabled}
                  disabled
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-700">
                  {feature.charAt(0).toUpperCase() + feature.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {currentProfile.type === 'finance' && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Gateways</h3>
            <div className="space-y-2">
              {currentProfile.settings.payment.providers.map(provider => (
                <div key={provider} className="flex items-center">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    {provider.charAt(0).toUpperCase() + provider.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}