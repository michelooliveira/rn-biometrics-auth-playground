/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { useColorScheme } from 'react-native';
import BiometricsContainer from './src/components/BiometricsContainer';
import BiometricsState from './src/states/BiometricsState';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <BiometricsState>
      <BiometricsContainer />
    </BiometricsState>
  );
};



export default App;
