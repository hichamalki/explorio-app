import { Header } from '../../components/Header';
import { useStorage } from '../../contexts/storage.context';
import { HomeHeader } from './HomeHeader';

export const HomeScreen = () => {

  const { settings } = useStorage();

  return <>
    <Header>
      <HomeHeader />
    </Header>
  </>
}