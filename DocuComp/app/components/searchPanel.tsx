import React, { useState } from 'react';
import Panel from './panel';
import updateSearchIndex from '../../lib/searchIndexing';
import AdvancedSearch from './AdvancedSearch';
import { useRouter } from 'next/router';

const SearchPanel = () => {
  const [enableAdvanced, setEnableAdvanced] = useState(false);
  const router = useRouter();

  const handleToggleAdvanced = () => {
    setEnableAdvanced(!enableAdvanced);
  };

  const navigateToSettings = () => {
    router.push('/settings');
  };

  const navigateToFAQ = () => {
    router.push('/help-center'); // Adjust the route as necessary
  };

  return (
    <Panel title="Search">
      <input type="text" placeholder="Search..." onChange={(e) => updateSearchIndex(parseInt(e.target.value), 'incremental')} />
      <button onClick={handleToggleAdvanced}>{enableAdvanced ? 'Basic Search' : 'Advanced Search'}</button>
      {enableAdvanced && <AdvancedSearch />}
      <button onClick={navigateToSettings}>Settings</button>
      <button onClick={navigateToFAQ}>FAQ</button>
    </Panel>
  );
};

export default SearchPanel;