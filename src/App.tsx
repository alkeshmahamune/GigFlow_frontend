import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@routing/index';
import { useAuthStore } from '@stores/index';
import { useTheme } from '@hooks/index';

function App(): JSX.Element {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const { theme } = useTheme();

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;