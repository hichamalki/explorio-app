import { AuthProvider } from './contexts/auth.context';
import { SettingsProvider } from './contexts/settings.context';
import { SplashScreen } from './screens/Splash/SplashScreen';

export default function App() {

  return (
    <AuthProvider>
      <SettingsProvider>
        <SplashScreen />
      </SettingsProvider>
    </AuthProvider>
  )
}