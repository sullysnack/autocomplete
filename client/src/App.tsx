import React from 'react';
import Autocomplete from './Autocomplete';
import { config } from './Config';

import './App.css';

function App() {
  return (
    <div className="autocomplete-ux-wrap">
      <h4>Autocomplete UX</h4>
      <Autocomplete
        svcurl={config.url.BASE_API_URL + '/autocomplete/subjects'}
      />
      <div>
        Sample text.
        Sample text.
        Sample text.
        Sample text.
        Sample text.
        Sample text.
        Sample text.
        Sample text.
      </div>
    </div>
  );
}

export default App;
