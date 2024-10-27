import React from 'react';
import { useIndustryProfile } from '../../hooks/useIndustryProfile';

export default function ProfileBar() {
  const { currentProfile } = useIndustryProfile();

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-900 text-gray-300 py-1 px-4 text-sm flex items-center justify-end z-50">
      <span>Current Profile: {currentProfile.name}</span>
    </div>
  );
}