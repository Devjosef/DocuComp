'use client';

import React from 'react';
import AccessibilityEnhancements from './accessbilityEnhancements';

// Component for displaying the Help Center page with FAQs and accessibility enhancements.
const HelpCenter = () => {
  return (
    <div>
      <h1>Help Center</h1>
      <AccessibilityEnhancements />  // Include accessibility enhancements
      <section>
        <h2>FAQs</h2>
        <p>How do I enable colorblind mode?</p>
        <p>You can enable colorblind mode by clicking on the 'Enable Colorblind Mode' button in the Accessibility Features section.</p>
        {/* Additional FAQs can be added here */}
      </section>
      {/* Other help center content */}
    </div>
  );
};

export default HelpCenter;