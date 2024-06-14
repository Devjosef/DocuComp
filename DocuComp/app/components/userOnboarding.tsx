import React from 'react';
import { useRouter } from 'next/router';
import { LazyLoadComponent } from '../../utils/lazyloading'; // Adjust the path as necessary

// Lazy load the SettingsPanel component using the global lazy loader
const SettingsPanel = LazyLoadComponent(() => import('./SettingsPanel'));

const UserOnboarding = () => {
    const router = useRouter(); // Access the router object

    // Function to navigate to the Settings Panel
    const navigateToSettingsPanel = () => {
        router.push('/settings'); // Navigate to '/settings' route
    };
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center p-4 transition-all duration-500 ease-in-out">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full animate-fade-in-up">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to DocuComp!</h1>
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
                <button onClick={navigateToSettingsPanel} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Configure Your Settings
                </button>
            </div>
        </div>
    );
};

export default UserOnboarding;