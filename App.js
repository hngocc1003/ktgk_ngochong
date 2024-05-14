// App.js
import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { MyContextControllerProvider } from './src/store';

const App = () => {

  return (
    <MyContextControllerProvider>
      <AppNavigator />
    </MyContextControllerProvider>
  );


};

export default App;
