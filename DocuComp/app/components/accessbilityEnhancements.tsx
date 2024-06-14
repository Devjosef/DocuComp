import React, { useState } from 'react';

const AccessibilityEnhancements = () => {
    const [colorBlindMode, setColorBlindMode] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleToggleColorBlindMode = () => {
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        setColorBlindMode(!colorBlindMode);
        setShowConfirm(false);
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    return (
        <div>
            <h2>Accessibility Features</h2>
            <button aria-label="Increase text size">Increase Text Size</button>
            <button aria-label="Decrease text size">Decrease Text Size</button>
            <button onClick={handleToggleColorBlindMode} aria-label="Toggle colorblind mode">
                {colorBlindMode ? 'Disable Colorblind Mode' : 'Enable Colorblind Mode'}
            </button>
            {showConfirm && (
                <div className="flex space-x-2 mt-2">
                    <button onClick={handleConfirm} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        OK
                    </button>
                    <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                    </div>
            )}
        </div>
    );
};

export default AccessibilityEnhancements;