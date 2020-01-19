import React, { Suspense } from 'react';

import Main from './Main';

const App: React.FC = () => (
  <Suspense fallback={<span>Loading...</span>}>
    <div>
      <Main />
    </div>
  </Suspense>
);

export default App;
