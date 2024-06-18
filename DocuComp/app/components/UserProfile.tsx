import React, { useState } from 'react';
import useUserServices from '../../hooks/useUserServices';

const UserProfile = () => {
  const [profileType, setProfileType] = useState('individual');
  const { error } = useUserServices();

  return (
    <div className="flex flex-col gap-4">
      {error && <div className="text-red-500">{error}</div>}
      <select className="border p-2" value={profileType} onChange={(e) => setProfileType(e.target.value)}>
        <option value="individual">Individual</option>
        <option value="company">Company</option>
      </select>
      {profileType === 'company' && <CompanyProfile />}
      <UserProfileActions />
    </div>
  );
};

export const CompanyProfile = () => {
  return (
    <div>
      <p>Company-specific information here</p>
    </div>
  );
};

export const UserProfileActions = () => {
  return (
    <div>
      <button>Upload Picture</button>
      <button>Reset Password</button>
    </div>
  );
};