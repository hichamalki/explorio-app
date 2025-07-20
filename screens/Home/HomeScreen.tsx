import { Header } from '../../components/Header';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { HomeHeader } from './HomeHeader';

export const HomeScreen = () => {
  const location = useCurrentLocation();

  return <Header>
    <HomeHeader />
  </Header>
}