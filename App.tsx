import React from 'react';
import {ThemeProvider} from '@react-navigation/native';
import {client} from './src/api/graphql/client';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ApolloProvider} from '@apollo/client';
import {LightTheme} from './src/styles/themes';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import AuthContextProvider from './src/context/auth-context';
import Navigation from './src/navigation/main-navigation';

export default function App() {
  return (
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
  );
}
