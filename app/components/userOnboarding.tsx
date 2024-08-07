'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { LazyLoadComponent } from '../../utils/lazyloading';
import ColorPicker from "./colorPicker";
import RoleSelector from './roleSelector';
import useUserServices from "../../hooks/useUserServices";

const SettingsPanel = LazyLoadComponent(() => import('./SettingsPanel'));

const UserOnboarding = () => {
  const router = useRouter();
  const { user, isAdmin, error } = useUserServices();
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);

  const navigateToSettingsPanel = () => {
    setShowSettingsPanel(true);
  };

  const completeOnboarding = () => {
    router.push('/dashboard');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center p-4 transition-all duration-500 ease-in-out" role="main">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full animate-fade-in-up" role="dialog" aria-labelledby="onboarding-title">
        <h1 id="onboarding-title" className="text-2xl font-bold text-gray-800 mb-6">Welcome to DocuComp!</h1>
        {user && user.imageUrl && (
          <img src={user.imageUrl} alt="User Profile" className="h-20 w-20 rounded-full mx-auto" />
        )}
        <ColorPicker />
        {isAdmin && (
          <RoleSelector />
        )}
        <p className="text-gray-600 mb-4">Experience a new level of document collaboration with our unique guided tour.</p>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600">Step 1:</span>
            <p className="ml-2 text-gray-800">Create your first document effortlessly.</p>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">Step 2:</span>
            <p className="ml-2 text-gray-800">Invite your team members in just a few clicks.</p>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">Step 3:</span>
            <p className="ml-2 text-gray-800">Start collaborating with real-time updates and feedback.</p>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">Step 4:</span>
            <p className="ml-2 text-gray-800">Utilize advanced version control to manage document revisions.</p>
          </div>
        </div>
        <button onClick={completeOnboarding} className="mt-6 w-full bg-primary hover:bg-primary-dark text-accent font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Complete Onboarding
        </button>
        <button onClick={navigateToSettingsPanel} className="mt-6 w-full bg-primary hover:bg-primary-dark text-accent font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Configure Your Settings
        </button>
      </div>
      {showSettingsPanel && <SettingsPanel />}
    </div>
  );
};

export default UserOnboarding;