import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Profile Updated:', { name, email });
  };

  return (
    <ProfileForm onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button type="submit">Update Profile</button>
    </ProfileForm>
  );
};

export default UserProfile;