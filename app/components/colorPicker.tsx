import React, { useState } from 'react';

const colorPicker = () => {
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [accentColor, setAccentColor] = useState('#ffffff');

  const handlePrimaryColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryColor(event.target.value);
    document.documentElement.style.setProperty('--primary-color', event.target.value);
  };

  const handleAccentColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccentColor(event.target.value);
    document.documentElement.style.setProperty('--accent-color', event.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="primaryColorPicker" className="block text-sm font-medium text-gray-700">
        Select Primary Color
      </label>
      <input
        type="color"
        id="primaryColorPicker"
        name="primaryColorPicker"
        value={primaryColor}
        onChange={handlePrimaryColorChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <label htmlFor="accentColorPicker" className="block text-sm font-medium text-gray-700 mt-4">
        Select Accent Color
      </label>
      <input
        type="color"
        id="accentColorPicker"
        name="accentColorPicker"
        value={accentColor}
        onChange={handleAccentColorChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default colorPicker;