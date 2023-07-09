import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import {RootStackParamList} from './types';
import {useAuth} from '../context/auth-context';
import AuthStack from './stacks/auth-stack';
import CustomerInfo from '../screens/customer-info';
import SearchStack from './stacks/search-stack';
import ProductScreen from '../screens/product/product';
import ResultMapScreen from '../screens/map/result';
import CarStack from './stacks/car-stack';
import SplashScreen from '../screens/splash';
import MainTabsNavigation from './tab-navigation';
import Profile from '../screens/profile/profile';
import CheckoutScreen from '../screens/checkout/checkout';
import PaymentScreen from '../screens/payment/payment';
import PaymentStatusScreen from '../screens/payment/payment-status';

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainRouter() {
  const {loggedIn} = useAuth();

  console.log('loggedIn', loggedIn);
  if (loggedIn == null) {
    return <SplashScreen />;
  }
  return (
    <>
      <StatusBar animated />
      <Stack.Navigator initialRouteName={loggedIn ? 'mainTabs' : 'auth'}>
        {!loggedIn && (
          <Stack.Screen
            name="auth"
            options={{headerShown: false}}
            component={AuthStack}
          />
        )}
        {loggedIn && (
          <>
            <Stack.Screen
              name="mainTabs"
              options={{headerShown: false}}
              component={MainTabsNavigation}
            />
            <Stack.Screen
              name="profile"
              options={{title: 'პროფილი'}}
              component={Profile}
            />
            <Stack.Screen
              name="customerInfo"
              component={CustomerInfo}
              options={{
                title: 'შეიყვანე ინფორმაცია',
              }}
            />
            <Stack.Screen
              name="product"
              component={ProductScreen}
              options={{title: 'პროდუქტი', headerShown: false}}
            />
            <Stack.Screen
              name="checkout"
              component={CheckoutScreen}
              options={{title: 'გადახდა', headerShown: false}}
            />
            <Stack.Screen
              name="payment"
              component={PaymentScreen}
              options={{title: 'გადახდა', headerShown: false}}
            />
            <Stack.Screen
              name="paymentStatus"
              component={PaymentStatusScreen}
              options={{title: 'გადახდისშედეგი', headerShown: false}}
            />

            <Stack.Screen
              options={{headerShown: false}}
              name="search"
              component={SearchStack}
            />
            <Stack.Screen
              name="map"
              component={ResultMapScreen}
              options={{headerTitle: 'რუკა', headerBackVisible: true}}
            />
            <Stack.Screen
              name="carStack"
              component={CarStack}
              options={{headerTitle: 'ავტომობილი', headerBackVisible: true}}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

export default MainRouter;
