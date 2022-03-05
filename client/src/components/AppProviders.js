import { StrictMode } from 'react';
import { AppProvider } from 'context/appContext';
import { NotificationsProvider } from 'context/notificationsContext';

const AppProviders = ({ children }) => {
  return (
    <StrictMode>
      <AppProvider>
        <NotificationsProvider>{children}</NotificationsProvider>
      </AppProvider>
    </StrictMode>
  );
};

export default AppProviders;
