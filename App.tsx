import { AuthProvider } from './contexts/auth.context';
import { SettingsProvider } from './contexts/settings.context';
import BottomTabs from './navigation/BottomTabs';

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <BottomTabs />
      </SettingsProvider>
    </AuthProvider>
  );
}