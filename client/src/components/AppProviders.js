import { StrictMode } from 'react';
import { AppProvider } from 'context/contexts/appContext';
import { NotificationsProvider } from 'context/contexts/notificationsContext';
import { ProfileProvider } from 'context/contexts/profileContext';
import { FoodyProvider } from 'context/contexts/foodyContext';

const AppProviders = ({ children }) => {
  return (
    <StrictMode>
      <AppProvider>
        <FoodyProvider>
          <ProfileProvider>
            <NotificationsProvider>{children}</NotificationsProvider>
          </ProfileProvider>
        </FoodyProvider>
      </AppProvider>
    </StrictMode>
  );
};

export default AppProviders;
