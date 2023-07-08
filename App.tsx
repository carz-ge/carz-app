import React from 'react';
import {ThemeProvider} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {FontSource} from 'expo-font';
import {useFonts} from 'expo-font';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/api/graphql/client';
import {LightTheme} from './src/styles/themes';
import AuthContextProvider from './src/context/auth-context';
import Navigation from './src/navigation/main-navigation';
import {Provider} from 'react-redux';
import store from './src/store/store';

export default function App() {
  const [fontsLoaded] = useFonts({
    'helv-55': require('./assets/fonts/helv55.otf') as FontSource,
    'helv-65': require('./assets/fonts/helv65.otf') as FontSource,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <GestureHandlerRootView style={{flex: 1}}>
          <ThemeProvider value={LightTheme}>
            <BottomSheetModalProvider>
              <AuthContextProvider>
                <Navigation />
              </AuthContextProvider>
            </BottomSheetModalProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </ApolloProvider>
    </Provider>
  );
}
