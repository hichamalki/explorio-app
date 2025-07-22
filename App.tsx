import { AuthProvider } from './contexts/auth.context';
import { PreferencesProvider } from './contexts/preferences.context';
import { SplashScreen } from './screens/Splash/SplashScreen';

export default function App() {

  return (
    <AuthProvider>
      <PreferencesProvider>
        <SplashScreen />
      </PreferencesProvider>
    </AuthProvider>
  )
}