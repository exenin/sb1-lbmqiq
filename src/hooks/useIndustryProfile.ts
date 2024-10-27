import { useState, useEffect } from 'react';
import { IndustryProfile, IndustryType } from '../types/industry';
import { defaultProfile } from '../config/industryProfiles/default';
import { financeProfile } from '../config/industryProfiles/finance';

const profiles: Record<string, IndustryProfile> = {
  default: defaultProfile,
  finance: financeProfile,
};

export function useIndustryProfile() {
  const [currentProfile, setCurrentProfile] = useState<IndustryProfile>(defaultProfile);
  const [loading, setLoading] = useState(false);

  const switchProfile = async (type: IndustryType) => {
    setLoading(true);
    try {
      const profile = profiles[type];
      if (profile) {
        setCurrentProfile(profile);
        localStorage.setItem('selectedIndustryProfile', type);
      }
    } catch (error) {
      console.error('Failed to switch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem('selectedIndustryProfile');
    if (savedProfile && profiles[savedProfile]) {
      setCurrentProfile(profiles[savedProfile]);
    }
    document.body.classList.add('designer-bar-active');
    
    return () => {
      document.body.classList.remove('designer-bar-active');
    };
  }, []);

  return {
    currentProfile,
    switchProfile,
    loading,
    availableProfiles: Object.values(profiles)
  };
}