import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Panel, Select, Button } from './UIComponents'; // Custom styled components

const UserProfile = () => {
  const [profileType, setProfileType] = useState('individual');
  const [changesMade, setChangesMade] = useState(false);

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

  return (
    <Panel title="User Profile">
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