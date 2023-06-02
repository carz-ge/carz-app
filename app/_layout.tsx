import FontAwesome from '@expo/vector-icons/FontAwesome';
import {ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {
  SplashScreen,
  Stack,
  usePathname,
  useSearchParams,
  useSegments,
} from 'expo-router';
import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {client} from '../lib/api/graphql/client';
import {ApolloProvider} from '@apollo/client';
import {DarkTheme, LightTheme} from '../lib/styles/themes';
import AuthContextProvider from '../lib/context/auth-context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function Layouts() {
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{headerShown: false}} />
      <Stack.Screen name="auth" options={{headerShown: false}} />
      <Stack.Screen name="modal" options={{presentation: 'modal'}} />
      <Stack.Screen name="customer-info" options={{headerShown: false}} />
      <Stack.Screen name="search" options={{headerShown: false}} />
      <Stack.Screen name="product" options={{headerShown: false}} />
      <Stack.Screen name="category" options={{headerShown: false}} />
      <Stack.Screen name="map" options={{headerShown: false}} />
      <Stack.Screen name="car" options={{headerShown: false}} />
    </Stack>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const params = useSearchParams();
  const segments = useSegments();

  console.log('RootLayout path:', pathname, JSON.stringify(params), segments);
  return (
    <AuthContextProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : LightTheme}>
        <ApolloProvider client={client}>
          <BottomSheetModalProvider>
            <Layouts />
          </BottomSheetModalProvider>
        </ApolloProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}
