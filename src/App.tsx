import { useFonts } from 'expo-font';
import { FONTS } from './shared/constants/styles';
import Navigator from './components/Navigator';

export default function App() {
  const [loaded] = useFonts({
    [FONTS.IBM_Plex]: require('../assets/fonts/IBM_Plex_Mono/IBMPlexMono-Regular.ttf'),
    [FONTS.IBM_Plex_Bold]: require('../assets/fonts/IBM_Plex_Mono/IBMPlexMono-Bold.ttf'),
    [FONTS.IBM_Plex_MediumItalic]: require('../assets/fonts/IBM_Plex_Mono/IBMPlexMono-MediumItalic.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return <Navigator></Navigator>;
}
