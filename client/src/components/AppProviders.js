import { StrictMode } from 'react';
import { AppProvider } from 'context/appContext';
import { NotificationsProvider } from 'context/contexts/notificationsContext';
import { ProfileProvider } from 'context/contexts/profileContext';

const AppProviders = ({ children }) => {
  return (
    <StrictMode>
      <AppProvider>
        <ProfileProvider>
          <NotificationsProvider>{children}</NotificationsProvider>
        </ProfileProvider>
      </AppProvider>
    </StrictMode>
  );
};

export default AppProviders;
