import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Panel from '../components/panel';
import Select from '../components/select';
import Button from '../components/Button';
import useUserServices from '../../hooks/useUserServices';

const UserProfile = () => {
  const [profileType, setProfileType] = useState('individual');
  const [changesMade, setChangesMade] = useState(false);
  const router = useRouter();
  const { user, error } = useUserServices();

  const saveChanges = () => {
    // Logic to save changes
    console.log('Changes saved');
    setChangesMade(false);
  };

  const discardChanges = () => {
    // Logic to discard changes
    console.log('Changes discarded');
    setChangesMade(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Panel title="User Profile">
      <div className="flex items-center mb-4">
        <button onClick={() => router.push('/userActivityDashboard')} className="mr-4">
          → User Activity
        </button>
      </div>
      {user && user.imageUrl && (
        <img src={user.imageUrl} alt="Profile" className="h-16 w-16 rounded-full" />
      )}
      <Select options={['individual', 'company']} selected={profileType} onChange={setProfileType} />
      {profileType === 'company' && (
        <div>
          {/* Add company-specific components here */}
        </div>
      )}
      <Button onClick={saveChanges} disabled={!changesMade}>Save Changes</Button>
      <Button onClick={discardChanges} disabled={!changesMade}>Discard Changes</Button>
    </Panel>
  );
};

export default UserProfile;