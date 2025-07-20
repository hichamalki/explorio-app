import { StorageProvider } from './contexts/storage.context';
import BottomTabs from './navigation/BottomTabs';

export default function App() {
  return (
    <StorageProvider>
      <BottomTabs />
    </StorageProvider>
  );
}