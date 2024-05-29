import React, { useState } from 'react';

const ThemeCustomization = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        // Apply the theme change logic here
    };

    return (
        <div>
            <h2>Customize Your Theme</h2>
            <button onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </div>
    );
};

export default ThemeCustomization;