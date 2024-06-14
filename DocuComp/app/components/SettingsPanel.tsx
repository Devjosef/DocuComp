import React, { useState } from 'react';
import styled from 'styled-components';
import ThemeCustomization from './ThemeCustomization';
import AccessibilityEnhancements from './accessbilityEnhancements';

const Panel = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
`;

const SettingsPanel = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Panel>
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