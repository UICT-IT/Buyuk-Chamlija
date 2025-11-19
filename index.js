import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { enableScreens } from 'react-native-screens';

import App from './App';

// 2. Add the crucial fix: call enableScreens(true)
// This ensures the native Android environment receives a proper Boolean value 
// for the screens configuration, preventing the casting error.
enableScreens(true);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
