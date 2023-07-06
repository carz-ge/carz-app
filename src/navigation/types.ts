import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CarType} from '../graphql/operations';

export interface RootStackParamList extends ParamListBase {
  customerInfo: undefined;
  chooseCar: {
    categoryId: string;
  };
  map: {
    carType: CarType;
    categoryId: string;
    date: string;
    time: string;
  };
  product: {
    productId: string;
  };
  checkout: {
    productId: string;
    packageId: string;
  };
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export interface DrawerParamList extends ParamListBase {
  tabs: undefined;
}

export type AppDrawerScreenProps<T extends keyof DrawerParamList> =
  DrawerScreenProps<DrawerParamList, T>;

export interface SearchStackParamList extends ParamListBase {
  chooseCar: {
    categoryId: string;
  };
  pickDateTime: {
    carId: string;
    categoryId: string;
    carType: CarType;
  };
}
export type SearchStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<SearchStackParamList, T>;

export interface AuthStackParamList extends ParamListBase {
  signIn: undefined;
  authenticate: {
    phone: string;
    isRegistered: boolean;
    expiresAt: string;
  };
}

export type AuthStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export interface MainTabParamList extends ParamListBase {
  home: undefined;
  bookings: undefined;
  map: undefined;
}

export type MainTabStackScreenProps<T extends keyof RootStackParamList> =
  BottomTabScreenProps<MainTabParamList, T>;

export interface CarStackParamList extends ParamListBase {
  add: undefined;
  car: undefined;
  techCardQrScan: undefined;
}

export type CarStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<CarStackParamList, T>;
