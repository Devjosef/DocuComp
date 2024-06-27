import React, { useState } from 'react';
import Panel from './panel';
import ThemeCustomization from './ThemeCustomization';
import AccessibilityEnhancements from './accessbilityEnhancements';

const SettingsPanel = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Panel title="Settings">
      <ThemeCustomization />
      <AccessibilityEnhancements />
      <label>
        Dark Mode:
        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </label>
    </Panel>
  );
};

export default SettingsPanel;