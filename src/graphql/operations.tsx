import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {[key: string]: unknown}, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | {[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: {input: string; output: string};
  String: {input: string; output: string};
  Boolean: {input: boolean; output: boolean};
  Int: {input: number; output: number};
  Float: {input: number; output: number};
};

export type AddDeviceTokenInput = {
  deviceToken: Scalars['String']['input'];
  platform: Scalars['String']['input'];
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  district: Scalars['String']['output'];
  street: Scalars['String']['output'];
};

export type AddressInput = {
  city: Scalars['String']['input'];
  district: Scalars['String']['input'];
  street: Scalars['String']['input'];
};

export type AuthenticationInput = {
  otp: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type AuthenticationOutput = {
  __typename?: 'AuthenticationOutput';
  accessToken: Scalars['String']['output'];
  refreshToken: Maybe<Scalars['String']['output']>;
};

export type Car = {
  __typename?: 'Car';
  carType: Maybe<CarType>;
  createdAt: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  make: Maybe<Scalars['String']['output']>;
  model: Maybe<Scalars['String']['output']>;
  plateNumber: Scalars['String']['output'];
  techPassportNumber: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['String']['output']>;
  vin: Maybe<Scalars['String']['output']>;
  year: Maybe<Scalars['Int']['output']>;
};

export type CarInput = {
  carType: InputMaybe<CarType>;
  make: InputMaybe<Scalars['String']['input']>;
  model: InputMaybe<Scalars['String']['input']>;
  plateNumber: Scalars['String']['input'];
  techPassportNumber: InputMaybe<Scalars['String']['input']>;
  vin: InputMaybe<Scalars['String']['input']>;
  year: InputMaybe<Scalars['Int']['input']>;
};

export enum CarType {
  All = 'ALL',
  Hatchback = 'HATCHBACK',
  Motorcycle = 'MOTORCYCLE',
  Other = 'OTHER',
  Sedan = 'SEDAN',
  Suv = 'SUV',
  Truck = 'TRUCK',
  Van = 'VAN',
}

export type Card = {
  __typename?: 'Card';
  cardType: Scalars['String']['output'];
  expirationDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  pan: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  active: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  image: Maybe<Scalars['String']['output']>;
  internalName: Scalars['String']['output'];
  name: LingualString;
  priority: Scalars['Int']['output'];
};

export type CategoryInput = {
  active: InputMaybe<Scalars['Boolean']['input']>;
  image: InputMaybe<Scalars['String']['input']>;
  internalName: Scalars['String']['input'];
  name: LingualStringInput;
  priority: InputMaybe<Scalars['Int']['input']>;
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isAnswer: Scalars['Boolean']['output'];
  status: Maybe<ChatMessageStatus>;
  text: Scalars['String']['output'];
};

export enum ChatMessageStatus {
  Fail = 'FAIL',
  InProgress = 'IN_PROGRESS',
  Sent = 'SENT',
  Success = 'SUCCESS',
}

export type Commission = {
  __typename?: 'Commission';
  commission: Scalars['Int']['output'];
  commissionToShow: Scalars['String']['output'];
};

export type Coordinates = {
  __typename?: 'Coordinates';
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
};

export type CoordinatesInput = {
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
};

export enum Currency {
  Eur = 'EUR',
  Gel = 'GEL',
  Usd = 'USD',
}

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
}

export type InitializePaymentInput = {
  idempotencyKey: Scalars['String']['input'];
  isAutomatic: Scalars['Boolean']['input'];
  saveCard: Scalars['Boolean']['input'];
  totalAmount: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type InitializePaymentWithSavedCardsInput = {
  idempotencyKey: Scalars['String']['input'];
  isAutomatic: Scalars['Boolean']['input'];
  orderId: Scalars['ID']['input'];
  totalAmount: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
};

export enum Language {
  En = 'EN',
  Ka = 'KA',
}

export type LingualString = {
  __typename?: 'LingualString';
  en: Scalars['String']['output'];
  ka: Scalars['String']['output'];
};

export type LingualStringInput = {
  en: Scalars['String']['input'];
  ka: Scalars['String']['input'];
};

export type Location = {
  __typename?: 'Location';
  address: Address;
  coordinates: Coordinates;
};

export type LocationInput = {
  address: AddressInput;
  coordinates: CoordinatesInput;
};

export type ManagersOrderResponseInput = {
  accepted: Scalars['Boolean']['input'];
  orderId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  providerId: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCar: Car;
  addDeviceToken: Maybe<Scalars['Boolean']['output']>;
  authenticateManager: AuthenticationOutput;
  authorize: AuthenticationOutput;
  checkPhoneForManger: SendOptOutput;
  confirmPreAuthorization: Maybe<Scalars['Boolean']['output']>;
  createCategory: Category;
  createOrder: OrderInitializationResponse;
  createOrderBySavedCard: OrderProcessingResponse;
  createProduct: Product;
  createProductDetails: ProductDetails;
  createProvider: Provider;
  deactivateUser: Maybe<Scalars['Boolean']['output']>;
  initPayment: OrderProcessingResponse;
  refund: Maybe<Scalars['Boolean']['output']>;
  rejectPreAuthorization: Maybe<Scalars['Boolean']['output']>;
  removeCar: Scalars['Boolean']['output'];
  removeCard: Maybe<Scalars['Boolean']['output']>;
  removeCategory: Scalars['Boolean']['output'];
  removeProduct: Scalars['Boolean']['output'];
  removeProductDetails: Scalars['Boolean']['output'];
  removeProvider: Scalars['Boolean']['output'];
  removeUser: Maybe<Scalars['Boolean']['output']>;
  respondToOrder: Maybe<Scalars['Boolean']['output']>;
  saveCard: Maybe<Scalars['Boolean']['output']>;
  scheduleCarForService: Maybe<Array<Maybe<ScheduledTimeSlotSchema>>>;
  sendOtp: SendOptOutput;
  sendPushNotification: Maybe<Scalars['Boolean']['output']>;
  sendSmsNotification: Maybe<Scalars['Boolean']['output']>;
  updateCar: Car;
  updateCategory: Category;
  updateProduct: Product;
  updateProductDetails: ProductDetails;
  updateProvider: Provider;
  updateUser: User;
};

export type MutationAddCarArgs = {
  carInput: CarInput;
};

export type MutationAddDeviceTokenArgs = {
  input: AddDeviceTokenInput;
};

export type MutationAuthenticateManagerArgs = {
  input: AuthenticationInput;
};

export type MutationAuthorizeArgs = {
  input: AuthenticationInput;
};

export type MutationCheckPhoneForMangerArgs = {
  phone: Scalars['String']['input'];
};

export type MutationConfirmPreAuthorizationArgs = {
  orderId: Scalars['ID']['input'];
};

export type MutationCreateCategoryArgs = {
  input: CategoryInput;
};

export type MutationCreateOrderArgs = {
  order: OrderInput;
};

export type MutationCreateOrderBySavedCardArgs = {
  input: InitializePaymentWithSavedCardsInput;
};

export type MutationCreateProductArgs = {
  input: ProductInput;
};

export type MutationCreateProductDetailsArgs = {
  input: ProductDetailsInput;
};

export type MutationCreateProviderArgs = {
  input: ProviderInput;
};

export type MutationInitPaymentArgs = {
  input: InitializePaymentInput;
};

export type MutationRefundArgs = {
  orderId: Scalars['ID']['input'];
  refundAmount: Scalars['String']['input'];
};

export type MutationRejectPreAuthorizationArgs = {
  orderId: Scalars['ID']['input'];
};

export type MutationRemoveCarArgs = {
  carId: Scalars['ID']['input'];
};

export type MutationRemoveCardArgs = {
  orderId: Scalars['ID']['input'];
};

export type MutationRemoveCategoryArgs = {
  categoryId: Scalars['ID']['input'];
};

export type MutationRemoveProductArgs = {
  productId: Scalars['ID']['input'];
};

export type MutationRemoveProductDetailsArgs = {
  productDetailsId: Scalars['ID']['input'];
};

export type MutationRemoveProviderArgs = {
  providerId: Scalars['ID']['input'];
};

export type MutationRespondToOrderArgs = {
  managersOrderResponse: ManagersOrderResponseInput;
};

export type MutationSaveCardArgs = {
  orderId: Scalars['ID']['input'];
};

export type MutationScheduleCarForServiceArgs = {
  input: InputMaybe<ScheduleCarForServiceInput>;
};

export type MutationSendOtpArgs = {
  phone: Scalars['String']['input'];
};

export type MutationSendPushNotificationArgs = {
  input: PushNotificationInput;
};

export type MutationSendSmsNotificationArgs = {
  input: SmsNotification;
};

export type MutationUpdateCarArgs = {
  carId: Scalars['ID']['input'];
  carInput: CarInput;
};

export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['ID']['input'];
  input: CategoryInput;
};

export type MutationUpdateProductArgs = {
  input: ProductInput;
  productId: Scalars['ID']['input'];
};

export type MutationUpdateProductDetailsArgs = {
  input: ProductDetailsInput;
  productDetailsId: Scalars['ID']['input'];
};

export type MutationUpdateProviderArgs = {
  input: ProviderInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Order = {
  __typename?: 'Order';
  carPlateNumber: Maybe<Scalars['String']['output']>;
  carType: Maybe<CarType>;
  categoryId: Scalars['ID']['output'];
  commission: Scalars['Int']['output'];
  createdAt: Maybe<Scalars['String']['output']>;
  errorMessage: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  packageId: Scalars['ID']['output'];
  productId: Scalars['ID']['output'];
  providerId: Maybe<Scalars['ID']['output']>;
  schedulingDay: Maybe<Scalars['String']['output']>;
  schedulingTime: Maybe<Scalars['String']['output']>;
  status: Maybe<OrderStatus>;
  totalPrice: Scalars['Int']['output'];
  updatedAt: Maybe<Scalars['String']['output']>;
};

export type OrderInitializationResponse = {
  __typename?: 'OrderInitializationResponse';
  carPlateNumber: Maybe<Scalars['String']['output']>;
  carType: Maybe<CarType>;
  categoryId: Scalars['ID']['output'];
  commission: Scalars['Int']['output'];
  createdAt: Maybe<Scalars['String']['output']>;
  errorMessage: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  idempotencyKey: Scalars['String']['output'];
  packageId: Scalars['ID']['output'];
  productId: Scalars['ID']['output'];
  providerId: Scalars['ID']['output'];
  redirectLink: Scalars['String']['output'];
  schedulingDay: Maybe<Scalars['String']['output']>;
  schedulingTime: Maybe<Scalars['String']['output']>;
  status: Maybe<OrderStatus>;
  totalPrice: Scalars['Int']['output'];
};

export type OrderInput = {
  carId: InputMaybe<Scalars['ID']['input']>;
  carPlateNumber: InputMaybe<Scalars['String']['input']>;
  carType: InputMaybe<CarType>;
  comment: InputMaybe<Scalars['String']['input']>;
  idempotencyKey: Scalars['String']['input'];
  packageId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  schedulingDay: InputMaybe<Scalars['String']['input']>;
  schedulingTime: InputMaybe<Scalars['String']['input']>;
};

export type OrderProcessingResponse = {
  __typename?: 'OrderProcessingResponse';
  idempotencyKey: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  redirectLink: Scalars['String']['output'];
};

export enum OrderStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  New = 'NEW',
  Payed = 'PAYED',
  Processing = 'PROCESSING',
  Reimbursed = 'REIMBURSED',
  Rejected = 'REJECTED',
  WaitingManager = 'WAITING_MANAGER',
}

export type OrderedProduct = {
  __typename?: 'OrderedProduct';
  packageId: Scalars['ID']['output'];
  productId: Scalars['ID']['output'];
  schedulingDay: Maybe<Scalars['String']['output']>;
  schedulingTime: Maybe<Scalars['String']['output']>;
};

export type OrderedProductInput = {
  packageId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  schedulingDay: InputMaybe<Scalars['String']['input']>;
  schedulingTime: InputMaybe<Scalars['String']['input']>;
};

export type Product = {
  __typename?: 'Product';
  categoryId: Scalars['ID']['output'];
  description: Maybe<LingualString>;
  id: Scalars['ID']['output'];
  images: Maybe<Array<Scalars['String']['output']>>;
  location: Maybe<Location>;
  mainImage: Scalars['String']['output'];
  name: LingualString;
  packages: Maybe<Array<ProductDetails>>;
  provider: Provider;
  providerId: Scalars['ID']['output'];
  tags: Maybe<Array<Scalars['String']['output']>>;
};

export type ProductDetails = {
  __typename?: 'ProductDetails';
  availableServices: Maybe<Array<LingualString>>;
  averageDurationMinutes: Maybe<Scalars['Int']['output']>;
  currency: Maybe<Currency>;
  description: Maybe<LingualString>;
  id: Scalars['ID']['output'];
  name: LingualString;
  notAvailableServices: Maybe<Array<Maybe<LingualString>>>;
  pricesForCarTypes: Maybe<Array<ProductDetailsCarPrice>>;
  productId: Scalars['ID']['output'];
};

export type ProductDetailsCarPrice = {
  __typename?: 'ProductDetailsCarPrice';
  carType: CarType;
  order: Maybe<Scalars['ID']['output']>;
  price: Maybe<Scalars['Int']['output']>;
};

export type ProductDetailsCarPriceInput = {
  carType: CarType;
  price: Scalars['Int']['input'];
};

export type ProductDetailsInput = {
  availableServices: InputMaybe<Array<LingualStringInput>>;
  averageDurationMinutes: InputMaybe<Scalars['Int']['input']>;
  currency: InputMaybe<Currency>;
  description: InputMaybe<LingualStringInput>;
  name: LingualStringInput;
  notAvailableServices: InputMaybe<Array<InputMaybe<LingualStringInput>>>;
  pricesForCarTypes: Array<ProductDetailsCarPriceInput>;
  productId: Scalars['ID']['input'];
};

export type ProductFilterInput = {
  carType: InputMaybe<CarType>;
  categoryId: InputMaybe<Scalars['ID']['input']>;
  date: InputMaybe<Scalars['String']['input']>;
  time: InputMaybe<Scalars['String']['input']>;
};

export type ProductInput = {
  categoryId: Scalars['ID']['input'];
  description: InputMaybe<LingualStringInput>;
  images: InputMaybe<Array<Scalars['String']['input']>>;
  location: InputMaybe<LocationInput>;
  mainImage: Scalars['String']['input'];
  name: LingualStringInput;
  providerId: Scalars['ID']['input'];
  tags: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Provider = {
  __typename?: 'Provider';
  email: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  logo: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone: Maybe<Scalars['String']['output']>;
  website: Maybe<Scalars['String']['output']>;
};

export type ProviderInput = {
  email: InputMaybe<Scalars['String']['input']>;
  logo: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone: InputMaybe<Scalars['String']['input']>;
  website: InputMaybe<Scalars['String']['input']>;
};

export type PushNotificationInput = {
  deviceToken: Scalars['String']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  checkPhone: Scalars['Boolean']['output'];
  echo: Maybe<Scalars['String']['output']>;
  echoAuthorized: Maybe<Scalars['String']['output']>;
  echoFlux: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  echoMono: Maybe<Scalars['String']['output']>;
  getCommission: Commission;
  getMe: User;
  getOrder: Order;
  getPaymentInfo: Maybe<Scalars['String']['output']>;
  getProduct: Product;
  getUserById: User;
  listCards: Array<Card>;
  listCars: Array<Car>;
  listCategories: Array<Category>;
  listChatMessages: Array<ChatMessage>;
  listOrders: Array<Order>;
  listOrdersByManager: Array<Order>;
  listProductByCategoryId: Array<Product>;
  listProductByProviderId: Array<Product>;
  listProductDetailsByProductId: Array<ProductDetails>;
  listProducts: Array<Product>;
  listProviders: Array<Provider>;
  listQueue: Maybe<Array<Maybe<ScheduledTimeSlotSchema>>>;
  searchProducts: Array<Product>;
};

export type QueryCheckPhoneArgs = {
  phone: Scalars['String']['input'];
};

export type QueryEchoArgs = {
  message: InputMaybe<Scalars['String']['input']>;
};

export type QueryEchoAuthorizedArgs = {
  message: InputMaybe<Scalars['String']['input']>;
};

export type QueryEchoFluxArgs = {
  message: InputMaybe<Scalars['String']['input']>;
};

export type QueryEchoMonoArgs = {
  message: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetCommissionArgs = {
  packageId: InputMaybe<Scalars['ID']['input']>;
  productId: Scalars['ID']['input'];
};

export type QueryGetOrderArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetPaymentInfoArgs = {
  orderId: Scalars['ID']['input'];
};

export type QueryGetProductArgs = {
  productId: Scalars['ID']['input'];
};

export type QueryGetUserByIdArgs = {
  userId: Scalars['ID']['input'];
};

export type QueryListProductByCategoryIdArgs = {
  categoryId: Scalars['ID']['input'];
};

export type QueryListProductByProviderIdArgs = {
  providerId: Scalars['ID']['input'];
};

export type QueryListProductDetailsByProductIdArgs = {
  productId: Scalars['ID']['input'];
};

export type QueryListQueueArgs = {
  providerId: InputMaybe<Scalars['ID']['input']>;
};

export type QuerySearchProductsArgs = {
  filter: ProductFilterInput;
};

export type ScheduleCarForServiceInput = {
  carPlateNumber: InputMaybe<Scalars['String']['input']>;
  customerPhoneNumber: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  schedulingDay: InputMaybe<Scalars['String']['input']>;
  schedulingTime: InputMaybe<Scalars['String']['input']>;
};

export type ScheduledTimeSlotSchema = {
  __typename?: 'ScheduledTimeSlotSchema';
  carPlateNumber: Maybe<Scalars['String']['output']>;
  orderNumber: Maybe<Scalars['String']['output']>;
  timeSlot: Maybe<Scalars['String']['output']>;
};

export type SendOptOutput = {
  __typename?: 'SendOptOutput';
  expiresAt: Maybe<Scalars['String']['output']>;
  isRegistered: Maybe<Scalars['Boolean']['output']>;
  sent: Scalars['Boolean']['output'];
};

export type SmsNotification = {
  phone: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subscribeToQueue: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type SubscriptionSubscribeToQueueArgs = {
  providerId: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateUserInput = {
  email: InputMaybe<Scalars['String']['input']>;
  firstname: Scalars['String']['input'];
  language: InputMaybe<Language>;
  lastname: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Maybe<Scalars['String']['output']>;
  deactivated: Maybe<Scalars['Boolean']['output']>;
  email: Maybe<Scalars['String']['output']>;
  firstname: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language: Language;
  lastname: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  removed: Maybe<Scalars['Boolean']['output']>;
  role: UserRole;
  updatedAt: Maybe<Scalars['String']['output']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  User = 'USER',
}

export type WorkingHours = {
  __typename?: 'WorkingHours';
  dayOfWeek: DayOfWeek;
  endTime: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
};

export type WorkingHoursInput = {
  dayOfWeek: DayOfWeek;
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};

export type AddCarVariables = Exact<{
  carInput: CarInput;
}>;

export type AddCar = {
  __typename?: 'Mutation';
  addCar: {
    __typename?: 'Car';
    id: string;
    plateNumber: string;
    carType: CarType | null;
    techPassportNumber: string | null;
    vin: string | null;
    make: string | null;
    model: string | null;
    year: number | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
};

export type AddDeviceTokenVariables = Exact<{
  input: AddDeviceTokenInput;
}>;

export type AddDeviceToken = {
  __typename?: 'Mutation';
  addDeviceToken: boolean | null;
};

export type AuthenticateManagerVariables = Exact<{
  input: AuthenticationInput;
}>;

export type AuthenticateManager = {
  __typename?: 'Mutation';
  authenticateManager: {
    __typename?: 'AuthenticationOutput';
    accessToken: string;
    refreshToken: string | null;
  };
};

export type AuthorizeVariables = Exact<{
  input: AuthenticationInput;
}>;

export type Authorize = {
  __typename?: 'Mutation';
  authorize: {
    __typename?: 'AuthenticationOutput';
    accessToken: string;
    refreshToken: string | null;
  };
};

export type CheckPhoneForMangerVariables = Exact<{
  phone: Scalars['String']['input'];
}>;

export type CheckPhoneForManger = {
  __typename?: 'Mutation';
  checkPhoneForManger: {
    __typename?: 'SendOptOutput';
    sent: boolean;
    expiresAt: string | null;
    isRegistered: boolean | null;
  };
};

export type ConfirmPreAuthorizationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type ConfirmPreAuthorization = {
  __typename?: 'Mutation';
  confirmPreAuthorization: boolean | null;
};

export type CreateCategoryVariables = Exact<{
  input: CategoryInput;
}>;

export type CreateCategory = {
  __typename?: 'Mutation';
  createCategory: {
    __typename?: 'Category';
    id: string;
    internalName: string;
    image: string | null;
    priority: number;
    active: boolean;
    name: {__typename?: 'LingualString'; ka: string; en: string};
  };
};

export type CreateOrderVariables = Exact<{
  order: OrderInput;
}>;

export type CreateOrder = {
  __typename?: 'Mutation';
  createOrder: {
    __typename?: 'OrderInitializationResponse';
    id: string;
    idempotencyKey: string;
    redirectLink: string;
    totalPrice: number;
    commission: number;
    productId: string;
    packageId: string;
    categoryId: string;
    providerId: string;
    schedulingDay: string | null;
    schedulingTime: string | null;
    status: OrderStatus | null;
    carType: CarType | null;
    carPlateNumber: string | null;
    errorMessage: string | null;
    createdAt: string | null;
  };
};

export type CreateOrderBySavedCardVariables = Exact<{
  input: InitializePaymentWithSavedCardsInput;
}>;

export type CreateOrderBySavedCard = {
  __typename?: 'Mutation';
  createOrderBySavedCard: {
    __typename?: 'OrderProcessingResponse';
    idempotencyKey: string;
    orderId: string;
    redirectLink: string;
  };
};

export type CreateProductVariables = Exact<{
  input: ProductInput;
}>;

export type CreateProduct = {
  __typename?: 'Mutation';
  createProduct: {
    __typename?: 'Product';
    id: string;
    providerId: string;
    categoryId: string;
    mainImage: string;
    images: Array<string> | null;
    tags: Array<string> | null;
    name: {__typename?: 'LingualString'; ka: string; en: string};
    description: {__typename?: 'LingualString'; ka: string; en: string} | null;
    packages: Array<{
      __typename?: 'ProductDetails';
      id: string;
      productId: string;
      currency: Currency | null;
      averageDurationMinutes: number | null;
      name: {__typename?: 'LingualString'; ka: string; en: string};
      description: {
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null;
      pricesForCarTypes: Array<{
        __typename?: 'ProductDetailsCarPrice';
        order: string | null;
        carType: CarType;
        price: number | null;
      }> | null;
      availableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      }> | null;
      notAvailableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null> | null;
    }> | null;
    provider: {
      __typename?: 'Provider';
      id: string;
      name: string;
      phone: string | null;
      email: string | null;
      logo: string | null;
      website: string | null;
    };
    location: {
      __typename?: 'Location';
      address: {
        __typename?: 'Address';
        street: string;
        district: string;
        city: string;
      };
      coordinates: {__typename?: 'Coordinates'; lat: number; lng: number};
    } | null;
  };
};

export type CreateProductDetailsVariables = Exact<{
  input: ProductDetailsInput;
}>;

export type CreateProductDetails = {
  __typename?: 'Mutation';
  createProductDetails: {
    __typename?: 'ProductDetails';
    id: string;
    productId: string;
    currency: Currency | null;
    averageDurationMinutes: number | null;
    name: {__typename?: 'LingualString'; ka: string; en: string};
    description: {__typename?: 'LingualString'; ka: string; en: string} | null;
    pricesForCarTypes: Array<{
      __typename?: 'ProductDetailsCarPrice';
      order: string | null;
      carType: CarType;
      price: number | null;
    }> | null;
    availableServices: Array<{
      __typename?: 'LingualString';
      ka: string;
      en: string;
    }> | null;
    notAvailableServices: Array<{
      __typename?: 'LingualString';
      ka: string;
      en: string;
    } | null> | null;
  };
};

export type CreateProviderVariables = Exact<{
  input: ProviderInput;
}>;

export type CreateProvider = {
  __typename?: 'Mutation';
  createProvider: {
    __typename?: 'Provider';
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    logo: string | null;
    website: string | null;
  };
};

export type DeactivateUserVariables = Exact<{[key: string]: never}>;

export type DeactivateUser = {
  __typename?: 'Mutation';
  deactivateUser: boolean | null;
};

export type InitPaymentVariables = Exact<{
  input: InitializePaymentInput;
}>;

export type InitPayment = {
  __typename?: 'Mutation';
  initPayment: {
    __typename?: 'OrderProcessingResponse';
    idempotencyKey: string;
    orderId: string;
    redirectLink: string;
  };
};

export type RefundVariables = Exact<{
  orderId: Scalars['ID']['input'];
  refundAmount: Scalars['String']['input'];
}>;

export type Refund = {__typename?: 'Mutation'; refund: boolean | null};

export type RejectPreAuthorizationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type RejectPreAuthorization = {
  __typename?: 'Mutation';
  rejectPreAuthorization: boolean | null;
};

export type RemoveCarVariables = Exact<{
  carId: Scalars['ID']['input'];
}>;

export type RemoveCar = {__typename?: 'Mutation'; removeCar: boolean};

export type RemoveCardVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type RemoveCard = {__typename?: 'Mutation'; removeCard: boolean | null};

export type RemoveCategoryVariables = Exact<{
  categoryId: Scalars['ID']['input'];
}>;

export type RemoveCategory = {__typename?: 'Mutation'; removeCategory: boolean};

export type RemoveProductVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type RemoveProduct = {__typename?: 'Mutation'; removeProduct: boolean};

export type RemoveProductDetailsVariables = Exact<{
  productDetailsId: Scalars['ID']['input'];
}>;

export type RemoveProductDetails = {
  __typename?: 'Mutation';
  removeProductDetails: boolean;
};

export type RemoveProviderVariables = Exact<{
  providerId: Scalars['ID']['input'];
}>;

export type RemoveProvider = {__typename?: 'Mutation'; removeProvider: boolean};

export type RemoveUserVariables = Exact<{[key: string]: never}>;

export type RemoveUser = {__typename?: 'Mutation'; removeUser: boolean | null};

export type RespondToOrderVariables = Exact<{
  managersOrderResponse: ManagersOrderResponseInput;
}>;

export type RespondToOrder = {
  __typename?: 'Mutation';
  respondToOrder: boolean | null;
};

export type SaveCardVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type SaveCard = {__typename?: 'Mutation'; saveCard: boolean | null};

export type ScheduleCarForServiceVariables = Exact<{
  input: InputMaybe<ScheduleCarForServiceInput>;
}>;

export type ScheduleCarForService = {
  __typename?: 'Mutation';
  scheduleCarForService: Array<{
    __typename?: 'ScheduledTimeSlotSchema';
    orderNumber: string | null;
    carPlateNumber: string | null;
    timeSlot: string | null;
  } | null> | null;
};

export type SendOtpVariables = Exact<{
  phone: Scalars['String']['input'];
}>;

export type SendOtp = {
  __typename?: 'Mutation';
  sendOtp: {
    __typename?: 'SendOptOutput';
    sent: boolean;
    expiresAt: string | null;
    isRegistered: boolean | null;
  };
};

export type SendPushNotificationVariables = Exact<{
  input: PushNotificationInput;
}>;

export type SendPushNotification = {
  __typename?: 'Mutation';
  sendPushNotification: boolean | null;
};

export type SendSmsNotificationVariables = Exact<{
  input: SmsNotification;
}>;

export type SendSmsNotification = {
  __typename?: 'Mutation';
  sendSmsNotification: boolean | null;
};

export type UpdateCarVariables = Exact<{
  carId: Scalars['ID']['input'];
  carInput: CarInput;
}>;

export type UpdateCar = {
  __typename?: 'Mutation';
  updateCar: {
    __typename?: 'Car';
    id: string;
    plateNumber: string;
    carType: CarType | null;
    techPassportNumber: string | null;
    vin: string | null;
    make: string | null;
    model: string | null;
    year: number | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
};

export type UpdateCategoryVariables = Exact<{
  categoryId: Scalars['ID']['input'];
  input: CategoryInput;
}>;

export type UpdateCategory = {
  __typename?: 'Mutation';
  updateCategory: {
    __typename?: 'Category';
    id: string;
    internalName: string;
    image: string | null;
    priority: number;
    active: boolean;
    name: {__typename?: 'LingualString'; ka: string; en: string};
  };
};

export type UpdateProductVariables = Exact<{
  productId: Scalars['ID']['input'];
  input: ProductInput;
}>;

export type UpdateProduct = {
  __typename?: 'Mutation';
  updateProduct: {
    __typename?: 'Product';
    id: string;
    providerId: string;
    categoryId: string;
    mainImage: string;
    images: Array<string> | null;
    tags: Array<string> | null;
    name: {__typename?: 'LingualString'; ka: string; en: string};
    description: {__typename?: 'LingualString'; ka: string; en: string} | null;
    packages: Array<{
      __typename?: 'ProductDetails';
      id: string;
      productId: string;
      currency: Currency | null;
      averageDurationMinutes: number | null;
      name: {__typename?: 'LingualString'; ka: string; en: string};
      description: {
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null;
      pricesForCarTypes: Array<{
        __typename?: 'ProductDetailsCarPrice';
        order: string | null;
        carType: CarType;
        price: number | null;
      }> | null;
      availableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      }> | null;
      notAvailableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null> | null;
    }> | null;
    provider: {
      __typename?: 'Provider';
      id: string;
      name: string;
      phone: string | null;
      email: string | null;
      logo: string | null;
      website: string | null;
    };
    location: {
      __typename?: 'Location';
      address: {
        __typename?: 'Address';
        street: string;
        district: string;
        city: string;
      };
      coordinates: {__typename?: 'Coordinates'; lat: number; lng: number};
    } | null;
  };
};

export type UpdateProductDetailsVariables = Exact<{
  productDetailsId: Scalars['ID']['input'];
  input: ProductDetailsInput;
}>;

export type UpdateProductDetails = {
  __typename?: 'Mutation';
  updateProductDetails: {
    __typename?: 'ProductDetails';
    id: string;
    productId: string;
    currency: Currency | null;
    averageDurationMinutes: number | null;
    name: {__typename?: 'LingualString'; ka: string; en: string};
    description: {__typename?: 'LingualString'; ka: string; en: string} | null;
    pricesForCarTypes: Array<{
      __typename?: 'ProductDetailsCarPrice';
      order: string | null;
      carType: CarType;
      price: number | null;
    }> | null;
    availableServices: Array<{
      __typename?: 'LingualString';
      ka: string;
      en: string;
    }> | null;
    notAvailableServices: Array<{
      __typename?: 'LingualString';
      ka: string;
      en: string;
    } | null> | null;
  };
};

export type UpdateProviderVariables = Exact<{
  input: ProviderInput;
}>;

export type UpdateProvider = {
  __typename?: 'Mutation';
  updateProvider: {
    __typename?: 'Provider';
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    logo: string | null;
    website: string | null;
  };
};

export type UpdateUserVariables = Exact<{
  input: UpdateUserInput;
}>;

export type UpdateUser = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'User';
    id: string;
    phone: string;
    email: string | null;
    role: UserRole;
    firstname: string | null;
    lastname: string | null;
    language: Language;
    deactivated: boolean | null;
    removed: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
};

export type CheckPhoneVariables = Exact<{
  phone: Scalars['String']['input'];
}>;

export type CheckPhone = {__typename?: 'Query'; checkPhone: boolean};

export type EchoVariables = Exact<{
  message: InputMaybe<Scalars['String']['input']>;
}>;

export type Echo = {__typename?: 'Query'; echo: string | null};

export type EchoAuthorizedVariables = Exact<{
  message: InputMaybe<Scalars['String']['input']>;
}>;

export type EchoAuthorized = {
  __typename?: 'Query';
  echoAuthorized: string | null;
};

export type EchoFluxVariables = Exact<{
  message: InputMaybe<Scalars['String']['input']>;
}>;

export type EchoFlux = {
  __typename?: 'Query';
  echoFlux: Array<string | null> | null;
};

export type EchoMonoVariables = Exact<{
  message: InputMaybe<Scalars['String']['input']>;
}>;

export type EchoMono = {__typename?: 'Query'; echoMono: string | null};

export type GetCommissionVariables = Exact<{
  productId: Scalars['ID']['input'];
  packageId: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetCommission = {
  __typename?: 'Query';
  getCommission: {
    __typename?: 'Commission';
    commission: number;
    commissionToShow: string;
  };
};

export type GetMeVariables = Exact<{[key: string]: never}>;

export type GetMe = {
  __typename?: 'Query';
  getMe: {
    __typename?: 'User';
    id: string;
    phone: string;
    email: string | null;
    role: UserRole;
    firstname: string | null;
    lastname: string | null;
    language: Language;
    deactivated: boolean | null;
    removed: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
};

export type GetOrderVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetOrder = {
  __typename?: 'Query';
  getOrder: {
    __typename?: 'Order';
    id: string;
    totalPrice: number;
    commission: number;
    status: OrderStatus | null;
    productId: string;
    packageId: string;
    categoryId: string;
    providerId: string | null;
    schedulingDay: string | null;
    schedulingTime: string | null;
    carType: CarType | null;
    carPlateNumber: string | null;
    errorMessage: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
};

export type GetPaymentInfoVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type GetPaymentInfo = {
  __typename?: 'Query';
  getPaymentInfo: string | null;
};

export type GetProductVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type GetProduct = {
  __typename?: 'Query';
  getProduct: {
    __typename?: 'Product';
    id: string;
    providerId: string;
    categoryId: string;
    mainImage: string;
    images: Array<string> | null;
    tags: Array<string> | null;
    name: {__typename?: 'LingualString'; ka: string; en: string};
    description: {__typename?: 'LingualString'; ka: string; en: string} | null;
    packages: Array<{
      __typename?: 'ProductDetails';
      id: string;
      productId: string;
      currency: Currency | null;
      averageDurationMinutes: number | null;
      name: {__typename?: 'LingualString'; ka: string; en: string};
      description: {
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null;
      pricesForCarTypes: Array<{
        __typename?: 'ProductDetailsCarPrice';
        order: string | null;
        carType: CarType;
        price: number | null;
      }> | null;
      availableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      }> | null;
      notAvailableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null> | null;
    }> | null;
    provider: {
      __typename?: 'Provider';
      id: string;
      name: string;
      phone: string | null;
      email: string | null;
      logo: string | null;
      website: string | null;
    };
    location: {
      __typename?: 'Location';
      address: {
        __typename?: 'Address';
        street: string;
        district: string;
        city: string;
      };
      coordinates: {__typename?: 'Coordinates'; lat: number; lng: number};
    } | null;
  };
};

export type GetUserByIdVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;

export type GetUserById = {
  __typename?: 'Query';
  getUserById: {
    __typename?: 'User';
    id: string;
    phone: string;
    email: string | null;
    role: UserRole;
    firstname: string | null;
    lastname: string | null;
    language: Language;
    deactivated: boolean | null;
    removed: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
};

export type ListCardsVariables = Exact<{[key: string]: never}>;

export type ListCards = {
  __typename?: 'Query';
  listCards: Array<{
    __typename?: 'Card';
    id: string;
    pan: string;
    cardType: string;
    expirationDate: string;
  }>;
};

export type ListCarsVariables = Exact<{[key: string]: never}>;

export type ListCars = {
  __typename?: 'Query';
  listCars: Array<{
    __typename?: 'Car';
    id: string;
    plateNumber: string;
    carType: CarType | null;
    techPassportNumber: string | null;
    vin: string | null;
    make: string | null;
    model: string | null;
    year: number | null;
    createdAt: string | null;
    updatedAt: string | null;
  }>;
};

export type ListCategoriesVariables = Exact<{[key: string]: never}>;

export type ListCategories = {
  __typename?: 'Query';
  listCategories: Array<{
    __typename?: 'Category';
    id: string;
    internalName: string;
    image: string | null;
    priority: number;
    active: boolean;
    name: {__typename?: 'LingualString'; ka: string; en: string};
  }>;
};

export type ListChatMessagesVariables = Exact<{[key: string]: never}>;

export type ListChatMessages = {
  __typename?: 'Query';
  listChatMessages: Array<{
    __typename?: 'ChatMessage';
    id: string;
    createdAt: string;
    text: string;
    isAnswer: boolean;
    status: ChatMessageStatus | null;
  }>;
};

export type ListOrdersVariables = Exact<{[key: string]: never}>;

export type ListOrders = {
  __typename?: 'Query';
  listOrders: Array<{
    __typename?: 'Order';
    id: string;
    totalPrice: number;
    commission: number;
    status: OrderStatus | null;
    productId: string;
    packageId: string;
    categoryId: string;
    providerId: string | null;
    schedulingDay: string | null;
    schedulingTime: string | null;
    carType: CarType | null;
    carPlateNumber: string | null;
    errorMessage: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  }>;
};

export type ListOrdersByManagerVariables = Exact<{[key: string]: never}>;

export type ListOrdersByManager = {
  __typename?: 'Query';
  listOrdersByManager: Array<{
    __typename?: 'Order';
    id: string;
    totalPrice: number;
    commission: number;
    status: OrderStatus | null;
    productId: string;
    packageId: string;
    categoryId: string;
    providerId: string | null;
    schedulingDay: string | null;
    schedulingTime: string | null;
    carType: CarType | null;
    carPlateNumber: string | null;
    errorMessage: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  }>;
};

export type ListProductByCategoryIdVariables = Exact<{
  categoryId: Scalars['ID']['input'];
}>;

export type ListProductByCategoryId = {
  __typename?: 'Query';
  listProductByCategoryId: Array<{
    __typename?: 'Product';
    id: string;
    providerId: string;
    categoryId: string;
    mainImage: string;
    images: Array<string> | null;
    tags: Array<string> | null;
    name: {__typename?: 'LingualString'; ka: string; en: string};
    description: {__typename?: 'LingualString'; ka: string; en: string} | null;
    packages: Array<{
      __typename?: 'ProductDetails';
      id: string;
      productId: string;
      currency: Currency | null;
      averageDurationMinutes: number | null;
      name: {__typename?: 'LingualString'; ka: string; en: string};
      description: {
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null;
      pricesForCarTypes: Array<{
        __typename?: 'ProductDetailsCarPrice';
        order: string | null;
        carType: CarType;
        price: number | null;
      }> | null;
      availableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      }> | null;
      notAvailableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null> | null;
    }> | null;
    provider: {
      __typename?: 'Provider';
      id: string;
      name: string;
      phone: string | null;
      email: string | null;
      logo: string | null;
      website: string | null;
    };
    location: {
      __typename?: 'Location';
      address: {
        __typename?: 'Address';
        street: string;
        district: string;
        city: string;
      };
      coordinates: {__typename?: 'Coordinates'; lat: number; lng: number};
    } | null;
  }>;
};

export type ListProductByProviderIdVariables = Exact<{
  providerId: Scalars['ID']['input'];
}>;

export type ListProductByProviderId = {
  __typename?: 'Query';
  listProductByProviderId: Array<{
    __typename?: 'Product';
    id: string;
    providerId: string;
    categoryId: string;
    mainImage: string;
    images: Array<string> | null;
    tags: Array<string> | null;
    name: {__typename?: 'LingualString'; ka: string; en: string};
    description: {__typename?: 'LingualString'; ka: string; en: string} | null;
    packages: Array<{
      __typename?: 'ProductDetails';
      id: string;
      productId: string;
      currency: Currency | null;
      averageDurationMinutes: number | null;
      name: {__typename?: 'LingualString'; ka: string; en: string};
      description: {
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null;
      pricesForCarTypes: Array<{
        __typename?: 'ProductDetailsCarPrice';
        order: string | null;
        carType: CarType;
        price: number | null;
      }> | null;
      availableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      }> | null;
      notAvailableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null> | null;
    }> | null;
    provider: {
      __typename?: 'Provider';
      id: string;
      name: string;
      phone: string | null;
      email: string | null;
      logo: string | null;
      website: string | null;
    };
    location: {
      __typename?: 'Location';
      address: {
        __typename?: 'Address';
        street: string;
        district: string;
        city: string;
      };
      coordinates: {__typename?: 'Coordinates'; lat: number; lng: number};
    } | null;
  }>;
};

export type ListProductDetailsByProductIdVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type ListProductDetailsByProductId = {
  __typename?: 'Query';
  listProductDetailsByProductId: Array<{
    __typename?: 'ProductDetails';
    id: string;
    productId: string;
    currency: Currency | null;
    averageDurationMinutes: number | null;
    name: {__typename?: 'LingualString'; ka: string; en: string};
    description: {__typename?: 'LingualString'; ka: string; en: string} | null;
    pricesForCarTypes: Array<{
      __typename?: 'ProductDetailsCarPrice';
      order: string | null;
      carType: CarType;
      price: number | null;
    }> | null;
    availableServices: Array<{
      __typename?: 'LingualString';
      ka: string;
      en: string;
    }> | null;
    notAvailableServices: Array<{
      __typename?: 'LingualString';
      ka: string;
      en: string;
    } | null> | null;
  }>;
};

export type ListProductsVariables = Exact<{[key: string]: never}>;

export type ListProducts = {
  __typename?: 'Query';
  listProducts: Array<{
    __typename?: 'Product';
    id: string;
    providerId: string;
    categoryId: string;
    mainImage: string;
    images: Array<string> | null;
    tags: Array<string> | null;
    name: {__typename?: 'LingualString'; ka: string; en: string};
    description: {__typename?: 'LingualString'; ka: string; en: string} | null;
    packages: Array<{
      __typename?: 'ProductDetails';
      id: string;
      productId: string;
      currency: Currency | null;
      averageDurationMinutes: number | null;
      name: {__typename?: 'LingualString'; ka: string; en: string};
      description: {
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null;
      pricesForCarTypes: Array<{
        __typename?: 'ProductDetailsCarPrice';
        order: string | null;
        carType: CarType;
        price: number | null;
      }> | null;
      availableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      }> | null;
      notAvailableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null> | null;
    }> | null;
    provider: {
      __typename?: 'Provider';
      id: string;
      name: string;
      phone: string | null;
      email: string | null;
      logo: string | null;
      website: string | null;
    };
    location: {
      __typename?: 'Location';
      address: {
        __typename?: 'Address';
        street: string;
        district: string;
        city: string;
      };
      coordinates: {__typename?: 'Coordinates'; lat: number; lng: number};
    } | null;
  }>;
};

export type ListProvidersVariables = Exact<{[key: string]: never}>;

export type ListProviders = {
  __typename?: 'Query';
  listProviders: Array<{
    __typename?: 'Provider';
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    logo: string | null;
    website: string | null;
  }>;
};

export type ListQueueVariables = Exact<{
  providerId: InputMaybe<Scalars['ID']['input']>;
}>;

export type ListQueue = {
  __typename?: 'Query';
  listQueue: Array<{
    __typename?: 'ScheduledTimeSlotSchema';
    orderNumber: string | null;
    carPlateNumber: string | null;
    timeSlot: string | null;
  } | null> | null;
};

export type SearchProductsVariables = Exact<{
  filter: ProductFilterInput;
}>;

export type SearchProducts = {
  __typename?: 'Query';
  searchProducts: Array<{
    __typename?: 'Product';
    id: string;
    providerId: string;
    categoryId: string;
    mainImage: string;
    images: Array<string> | null;
    tags: Array<string> | null;
    name: {__typename?: 'LingualString'; ka: string; en: string};
    description: {__typename?: 'LingualString'; ka: string; en: string} | null;
    packages: Array<{
      __typename?: 'ProductDetails';
      id: string;
      productId: string;
      currency: Currency | null;
      averageDurationMinutes: number | null;
      name: {__typename?: 'LingualString'; ka: string; en: string};
      description: {
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null;
      pricesForCarTypes: Array<{
        __typename?: 'ProductDetailsCarPrice';
        order: string | null;
        carType: CarType;
        price: number | null;
      }> | null;
      availableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      }> | null;
      notAvailableServices: Array<{
        __typename?: 'LingualString';
        ka: string;
        en: string;
      } | null> | null;
    }> | null;
    provider: {
      __typename?: 'Provider';
      id: string;
      name: string;
      phone: string | null;
      email: string | null;
      logo: string | null;
      website: string | null;
    };
    location: {
      __typename?: 'Location';
      address: {
        __typename?: 'Address';
        street: string;
        district: string;
        city: string;
      };
      coordinates: {__typename?: 'Coordinates'; lat: number; lng: number};
    } | null;
  }>;
};

export type SubscribeToQueueVariables = Exact<{
  providerId: InputMaybe<Scalars['ID']['input']>;
}>;

export type SubscribeToQueue = {
  __typename?: 'Subscription';
  subscribeToQueue: Array<string | null> | null;
};

export const AddCarDocument = gql`
  mutation addCar($carInput: CarInput!) {
    addCar(carInput: $carInput) {
      id
      plateNumber
      carType
      techPassportNumber
      vin
      make
      model
      year
      createdAt
      updatedAt
    }
  }
`;
export type AddCarMutationFn = Apollo.MutationFunction<AddCar, AddCarVariables>;

/**
 * __useAddCar__
 *
 * To run a mutation, you first call `useAddCar` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCar` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCar, { data, loading, error }] = useAddCar({
 *   variables: {
 *      carInput: // value for 'carInput'
 *   },
 * });
 */
export function useAddCar(
  baseOptions?: Apollo.MutationHookOptions<AddCar, AddCarVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<AddCar, AddCarVariables>(AddCarDocument, options);
}
export type AddCarHookResult = ReturnType<typeof useAddCar>;
export type AddCarMutationResult = Apollo.MutationResult<AddCar>;
export type AddCarMutationOptions = Apollo.BaseMutationOptions<
  AddCar,
  AddCarVariables
>;
export const AddDeviceTokenDocument = gql`
  mutation addDeviceToken($input: AddDeviceTokenInput!) {
    addDeviceToken(input: $input)
  }
`;
export type AddDeviceTokenMutationFn = Apollo.MutationFunction<
  AddDeviceToken,
  AddDeviceTokenVariables
>;

/**
 * __useAddDeviceToken__
 *
 * To run a mutation, you first call `useAddDeviceToken` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDeviceToken` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDeviceToken, { data, loading, error }] = useAddDeviceToken({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddDeviceToken(
  baseOptions?: Apollo.MutationHookOptions<
    AddDeviceToken,
    AddDeviceTokenVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<AddDeviceToken, AddDeviceTokenVariables>(
    AddDeviceTokenDocument,
    options,
  );
}
export type AddDeviceTokenHookResult = ReturnType<typeof useAddDeviceToken>;
export type AddDeviceTokenMutationResult =
  Apollo.MutationResult<AddDeviceToken>;
export type AddDeviceTokenMutationOptions = Apollo.BaseMutationOptions<
  AddDeviceToken,
  AddDeviceTokenVariables
>;
export const AuthenticateManagerDocument = gql`
  mutation authenticateManager($input: AuthenticationInput!) {
    authenticateManager(input: $input) {
      accessToken
      refreshToken
    }
  }
`;
export type AuthenticateManagerMutationFn = Apollo.MutationFunction<
  AuthenticateManager,
  AuthenticateManagerVariables
>;

/**
 * __useAuthenticateManager__
 *
 * To run a mutation, you first call `useAuthenticateManager` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateManager` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateManager, { data, loading, error }] = useAuthenticateManager({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthenticateManager(
  baseOptions?: Apollo.MutationHookOptions<
    AuthenticateManager,
    AuthenticateManagerVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<AuthenticateManager, AuthenticateManagerVariables>(
    AuthenticateManagerDocument,
    options,
  );
}
export type AuthenticateManagerHookResult = ReturnType<
  typeof useAuthenticateManager
>;
export type AuthenticateManagerMutationResult =
  Apollo.MutationResult<AuthenticateManager>;
export type AuthenticateManagerMutationOptions = Apollo.BaseMutationOptions<
  AuthenticateManager,
  AuthenticateManagerVariables
>;
export const AuthorizeDocument = gql`
  mutation authorize($input: AuthenticationInput!) {
    authorize(input: $input) {
      accessToken
      refreshToken
    }
  }
`;
export type AuthorizeMutationFn = Apollo.MutationFunction<
  Authorize,
  AuthorizeVariables
>;

/**
 * __useAuthorize__
 *
 * To run a mutation, you first call `useAuthorize` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthorize` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authorize, { data, loading, error }] = useAuthorize({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthorize(
  baseOptions?: Apollo.MutationHookOptions<Authorize, AuthorizeVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<Authorize, AuthorizeVariables>(
    AuthorizeDocument,
    options,
  );
}
export type AuthorizeHookResult = ReturnType<typeof useAuthorize>;
export type AuthorizeMutationResult = Apollo.MutationResult<Authorize>;
export type AuthorizeMutationOptions = Apollo.BaseMutationOptions<
  Authorize,
  AuthorizeVariables
>;
export const CheckPhoneForMangerDocument = gql`
  mutation checkPhoneForManger($phone: String!) {
    checkPhoneForManger(phone: $phone) {
      sent
      expiresAt
      isRegistered
    }
  }
`;
export type CheckPhoneForMangerMutationFn = Apollo.MutationFunction<
  CheckPhoneForManger,
  CheckPhoneForMangerVariables
>;

/**
 * __useCheckPhoneForManger__
 *
 * To run a mutation, you first call `useCheckPhoneForManger` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckPhoneForManger` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkPhoneForManger, { data, loading, error }] = useCheckPhoneForManger({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useCheckPhoneForManger(
  baseOptions?: Apollo.MutationHookOptions<
    CheckPhoneForManger,
    CheckPhoneForMangerVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<CheckPhoneForManger, CheckPhoneForMangerVariables>(
    CheckPhoneForMangerDocument,
    options,
  );
}
export type CheckPhoneForMangerHookResult = ReturnType<
  typeof useCheckPhoneForManger
>;
export type CheckPhoneForMangerMutationResult =
  Apollo.MutationResult<CheckPhoneForManger>;
export type CheckPhoneForMangerMutationOptions = Apollo.BaseMutationOptions<
  CheckPhoneForManger,
  CheckPhoneForMangerVariables
>;
export const ConfirmPreAuthorizationDocument = gql`
  mutation confirmPreAuthorization($orderId: ID!) {
    confirmPreAuthorization(orderId: $orderId)
  }
`;
export type ConfirmPreAuthorizationMutationFn = Apollo.MutationFunction<
  ConfirmPreAuthorization,
  ConfirmPreAuthorizationVariables
>;

/**
 * __useConfirmPreAuthorization__
 *
 * To run a mutation, you first call `useConfirmPreAuthorization` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmPreAuthorization` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmPreAuthorization, { data, loading, error }] = useConfirmPreAuthorization({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useConfirmPreAuthorization(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmPreAuthorization,
    ConfirmPreAuthorizationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    ConfirmPreAuthorization,
    ConfirmPreAuthorizationVariables
  >(ConfirmPreAuthorizationDocument, options);
}
export type ConfirmPreAuthorizationHookResult = ReturnType<
  typeof useConfirmPreAuthorization
>;
export type ConfirmPreAuthorizationMutationResult =
  Apollo.MutationResult<ConfirmPreAuthorization>;
export type ConfirmPreAuthorizationMutationOptions = Apollo.BaseMutationOptions<
  ConfirmPreAuthorization,
  ConfirmPreAuthorizationVariables
>;
export const CreateCategoryDocument = gql`
  mutation createCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      id
      name {
        ka
        en
      }
      internalName
      image
      priority
      active
    }
  }
`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<
  CreateCategory,
  CreateCategoryVariables
>;

/**
 * __useCreateCategory__
 *
 * To run a mutation, you first call `useCreateCategory` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategory` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategory, { data, loading, error }] = useCreateCategory({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategory(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCategory,
    CreateCategoryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<CreateCategory, CreateCategoryVariables>(
    CreateCategoryDocument,
    options,
  );
}
export type CreateCategoryHookResult = ReturnType<typeof useCreateCategory>;
export type CreateCategoryMutationResult =
  Apollo.MutationResult<CreateCategory>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  CreateCategory,
  CreateCategoryVariables
>;
export const CreateOrderDocument = gql`
  mutation createOrder($order: OrderInput!) {
    createOrder(order: $order) {
      id
      idempotencyKey
      redirectLink
      totalPrice
      commission
      productId
      packageId
      categoryId
      providerId
      schedulingDay
      schedulingTime
      status
      carType
      carPlateNumber
      errorMessage
      createdAt
    }
  }
`;
export type CreateOrderMutationFn = Apollo.MutationFunction<
  CreateOrder,
  CreateOrderVariables
>;

/**
 * __useCreateOrder__
 *
 * To run a mutation, you first call `useCreateOrder` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrder` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrder, { data, loading, error }] = useCreateOrder({
 *   variables: {
 *      order: // value for 'order'
 *   },
 * });
 */
export function useCreateOrder(
  baseOptions?: Apollo.MutationHookOptions<CreateOrder, CreateOrderVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<CreateOrder, CreateOrderVariables>(
    CreateOrderDocument,
    options,
  );
}
export type CreateOrderHookResult = ReturnType<typeof useCreateOrder>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrder>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<
  CreateOrder,
  CreateOrderVariables
>;
export const CreateOrderBySavedCardDocument = gql`
  mutation createOrderBySavedCard(
    $input: InitializePaymentWithSavedCardsInput!
  ) {
    createOrderBySavedCard(input: $input) {
      idempotencyKey
      orderId
      redirectLink
    }
  }
`;
export type CreateOrderBySavedCardMutationFn = Apollo.MutationFunction<
  CreateOrderBySavedCard,
  CreateOrderBySavedCardVariables
>;

/**
 * __useCreateOrderBySavedCard__
 *
 * To run a mutation, you first call `useCreateOrderBySavedCard` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderBySavedCard` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderBySavedCard, { data, loading, error }] = useCreateOrderBySavedCard({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderBySavedCard(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrderBySavedCard,
    CreateOrderBySavedCardVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    CreateOrderBySavedCard,
    CreateOrderBySavedCardVariables
  >(CreateOrderBySavedCardDocument, options);
}
export type CreateOrderBySavedCardHookResult = ReturnType<
  typeof useCreateOrderBySavedCard
>;
export type CreateOrderBySavedCardMutationResult =
  Apollo.MutationResult<CreateOrderBySavedCard>;
export type CreateOrderBySavedCardMutationOptions = Apollo.BaseMutationOptions<
  CreateOrderBySavedCard,
  CreateOrderBySavedCardVariables
>;
export const CreateProductDocument = gql`
  mutation createProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name {
        ka
        en
      }
      providerId
      categoryId
      description {
        ka
        en
      }
      packages {
        id
        productId
        name {
          ka
          en
        }
        description {
          ka
          en
        }
        pricesForCarTypes {
          order
          carType
          price
        }
        availableServices {
          ka
          en
        }
        notAvailableServices {
          ka
          en
        }
        currency
        averageDurationMinutes
      }
      provider {
        id
        name
        phone
        email
        logo
        website
      }
      location {
        address {
          street
          district
          city
        }
        coordinates {
          lat
          lng
        }
      }
      mainImage
      images
      tags
    }
  }
`;
export type CreateProductMutationFn = Apollo.MutationFunction<
  CreateProduct,
  CreateProductVariables
>;

/**
 * __useCreateProduct__
 *
 * To run a mutation, you first call `useCreateProduct` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProduct` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProduct, { data, loading, error }] = useCreateProduct({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProduct(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProduct,
    CreateProductVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<CreateProduct, CreateProductVariables>(
    CreateProductDocument,
    options,
  );
}
export type CreateProductHookResult = ReturnType<typeof useCreateProduct>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProduct>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<
  CreateProduct,
  CreateProductVariables
>;
export const CreateProductDetailsDocument = gql`
  mutation createProductDetails($input: ProductDetailsInput!) {
    createProductDetails(input: $input) {
      id
      productId
      name {
        ka
        en
      }
      description {
        ka
        en
      }
      pricesForCarTypes {
        order
        carType
        price
      }
      availableServices {
        ka
        en
      }
      notAvailableServices {
        ka
        en
      }
      currency
      averageDurationMinutes
    }
  }
`;
export type CreateProductDetailsMutationFn = Apollo.MutationFunction<
  CreateProductDetails,
  CreateProductDetailsVariables
>;

/**
 * __useCreateProductDetails__
 *
 * To run a mutation, you first call `useCreateProductDetails` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductDetails` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductDetails, { data, loading, error }] = useCreateProductDetails({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductDetails(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProductDetails,
    CreateProductDetailsVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    CreateProductDetails,
    CreateProductDetailsVariables
  >(CreateProductDetailsDocument, options);
}
export type CreateProductDetailsHookResult = ReturnType<
  typeof useCreateProductDetails
>;
export type CreateProductDetailsMutationResult =
  Apollo.MutationResult<CreateProductDetails>;
export type CreateProductDetailsMutationOptions = Apollo.BaseMutationOptions<
  CreateProductDetails,
  CreateProductDetailsVariables
>;
export const CreateProviderDocument = gql`
  mutation createProvider($input: ProviderInput!) {
    createProvider(input: $input) {
      id
      name
      phone
      email
      logo
      website
    }
  }
`;
export type CreateProviderMutationFn = Apollo.MutationFunction<
  CreateProvider,
  CreateProviderVariables
>;

/**
 * __useCreateProvider__
 *
 * To run a mutation, you first call `useCreateProvider` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProvider` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProvider, { data, loading, error }] = useCreateProvider({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProvider(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProvider,
    CreateProviderVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<CreateProvider, CreateProviderVariables>(
    CreateProviderDocument,
    options,
  );
}
export type CreateProviderHookResult = ReturnType<typeof useCreateProvider>;
export type CreateProviderMutationResult =
  Apollo.MutationResult<CreateProvider>;
export type CreateProviderMutationOptions = Apollo.BaseMutationOptions<
  CreateProvider,
  CreateProviderVariables
>;
export const DeactivateUserDocument = gql`
  mutation deactivateUser {
    deactivateUser
  }
`;
export type DeactivateUserMutationFn = Apollo.MutationFunction<
  DeactivateUser,
  DeactivateUserVariables
>;

/**
 * __useDeactivateUser__
 *
 * To run a mutation, you first call `useDeactivateUser` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateUser` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateUser, { data, loading, error }] = useDeactivateUser({
 *   variables: {
 *   },
 * });
 */
export function useDeactivateUser(
  baseOptions?: Apollo.MutationHookOptions<
    DeactivateUser,
    DeactivateUserVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<DeactivateUser, DeactivateUserVariables>(
    DeactivateUserDocument,
    options,
  );
}
export type DeactivateUserHookResult = ReturnType<typeof useDeactivateUser>;
export type DeactivateUserMutationResult =
  Apollo.MutationResult<DeactivateUser>;
export type DeactivateUserMutationOptions = Apollo.BaseMutationOptions<
  DeactivateUser,
  DeactivateUserVariables
>;
export const InitPaymentDocument = gql`
  mutation initPayment($input: InitializePaymentInput!) {
    initPayment(input: $input) {
      idempotencyKey
      orderId
      redirectLink
    }
  }
`;
export type InitPaymentMutationFn = Apollo.MutationFunction<
  InitPayment,
  InitPaymentVariables
>;

/**
 * __useInitPayment__
 *
 * To run a mutation, you first call `useInitPayment` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitPayment` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initPayment, { data, loading, error }] = useInitPayment({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInitPayment(
  baseOptions?: Apollo.MutationHookOptions<InitPayment, InitPaymentVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<InitPayment, InitPaymentVariables>(
    InitPaymentDocument,
    options,
  );
}
export type InitPaymentHookResult = ReturnType<typeof useInitPayment>;
export type InitPaymentMutationResult = Apollo.MutationResult<InitPayment>;
export type InitPaymentMutationOptions = Apollo.BaseMutationOptions<
  InitPayment,
  InitPaymentVariables
>;
export const RefundDocument = gql`
  mutation refund($orderId: ID!, $refundAmount: String!) {
    refund(orderId: $orderId, refundAmount: $refundAmount)
  }
`;
export type RefundMutationFn = Apollo.MutationFunction<Refund, RefundVariables>;

/**
 * __useRefund__
 *
 * To run a mutation, you first call `useRefund` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefund` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refund, { data, loading, error }] = useRefund({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      refundAmount: // value for 'refundAmount'
 *   },
 * });
 */
export function useRefund(
  baseOptions?: Apollo.MutationHookOptions<Refund, RefundVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<Refund, RefundVariables>(RefundDocument, options);
}
export type RefundHookResult = ReturnType<typeof useRefund>;
export type RefundMutationResult = Apollo.MutationResult<Refund>;
export type RefundMutationOptions = Apollo.BaseMutationOptions<
  Refund,
  RefundVariables
>;
export const RejectPreAuthorizationDocument = gql`
  mutation rejectPreAuthorization($orderId: ID!) {
    rejectPreAuthorization(orderId: $orderId)
  }
`;
export type RejectPreAuthorizationMutationFn = Apollo.MutationFunction<
  RejectPreAuthorization,
  RejectPreAuthorizationVariables
>;

/**
 * __useRejectPreAuthorization__
 *
 * To run a mutation, you first call `useRejectPreAuthorization` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectPreAuthorization` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectPreAuthorization, { data, loading, error }] = useRejectPreAuthorization({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useRejectPreAuthorization(
  baseOptions?: Apollo.MutationHookOptions<
    RejectPreAuthorization,
    RejectPreAuthorizationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    RejectPreAuthorization,
    RejectPreAuthorizationVariables
  >(RejectPreAuthorizationDocument, options);
}
export type RejectPreAuthorizationHookResult = ReturnType<
  typeof useRejectPreAuthorization
>;
export type RejectPreAuthorizationMutationResult =
  Apollo.MutationResult<RejectPreAuthorization>;
export type RejectPreAuthorizationMutationOptions = Apollo.BaseMutationOptions<
  RejectPreAuthorization,
  RejectPreAuthorizationVariables
>;
export const RemoveCarDocument = gql`
  mutation removeCar($carId: ID!) {
    removeCar(carId: $carId)
  }
`;
export type RemoveCarMutationFn = Apollo.MutationFunction<
  RemoveCar,
  RemoveCarVariables
>;

/**
 * __useRemoveCar__
 *
 * To run a mutation, you first call `useRemoveCar` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCar` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCar, { data, loading, error }] = useRemoveCar({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useRemoveCar(
  baseOptions?: Apollo.MutationHookOptions<RemoveCar, RemoveCarVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<RemoveCar, RemoveCarVariables>(
    RemoveCarDocument,
    options,
  );
}
export type RemoveCarHookResult = ReturnType<typeof useRemoveCar>;
export type RemoveCarMutationResult = Apollo.MutationResult<RemoveCar>;
export type RemoveCarMutationOptions = Apollo.BaseMutationOptions<
  RemoveCar,
  RemoveCarVariables
>;
export const RemoveCardDocument = gql`
  mutation removeCard($orderId: ID!) {
    removeCard(orderId: $orderId)
  }
`;
export type RemoveCardMutationFn = Apollo.MutationFunction<
  RemoveCard,
  RemoveCardVariables
>;

/**
 * __useRemoveCard__
 *
 * To run a mutation, you first call `useRemoveCard` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCard` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCard, { data, loading, error }] = useRemoveCard({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useRemoveCard(
  baseOptions?: Apollo.MutationHookOptions<RemoveCard, RemoveCardVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<RemoveCard, RemoveCardVariables>(
    RemoveCardDocument,
    options,
  );
}
export type RemoveCardHookResult = ReturnType<typeof useRemoveCard>;
export type RemoveCardMutationResult = Apollo.MutationResult<RemoveCard>;
export type RemoveCardMutationOptions = Apollo.BaseMutationOptions<
  RemoveCard,
  RemoveCardVariables
>;
export const RemoveCategoryDocument = gql`
  mutation removeCategory($categoryId: ID!) {
    removeCategory(categoryId: $categoryId)
  }
`;
export type RemoveCategoryMutationFn = Apollo.MutationFunction<
  RemoveCategory,
  RemoveCategoryVariables
>;

/**
 * __useRemoveCategory__
 *
 * To run a mutation, you first call `useRemoveCategory` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCategory` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCategory, { data, loading, error }] = useRemoveCategory({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useRemoveCategory(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveCategory,
    RemoveCategoryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<RemoveCategory, RemoveCategoryVariables>(
    RemoveCategoryDocument,
    options,
  );
}
export type RemoveCategoryHookResult = ReturnType<typeof useRemoveCategory>;
export type RemoveCategoryMutationResult =
  Apollo.MutationResult<RemoveCategory>;
export type RemoveCategoryMutationOptions = Apollo.BaseMutationOptions<
  RemoveCategory,
  RemoveCategoryVariables
>;
export const RemoveProductDocument = gql`
  mutation removeProduct($productId: ID!) {
    removeProduct(productId: $productId)
  }
`;
export type RemoveProductMutationFn = Apollo.MutationFunction<
  RemoveProduct,
  RemoveProductVariables
>;

/**
 * __useRemoveProduct__
 *
 * To run a mutation, you first call `useRemoveProduct` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProduct` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProduct, { data, loading, error }] = useRemoveProduct({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRemoveProduct(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveProduct,
    RemoveProductVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<RemoveProduct, RemoveProductVariables>(
    RemoveProductDocument,
    options,
  );
}
export type RemoveProductHookResult = ReturnType<typeof useRemoveProduct>;
export type RemoveProductMutationResult = Apollo.MutationResult<RemoveProduct>;
export type RemoveProductMutationOptions = Apollo.BaseMutationOptions<
  RemoveProduct,
  RemoveProductVariables
>;
export const RemoveProductDetailsDocument = gql`
  mutation removeProductDetails($productDetailsId: ID!) {
    removeProductDetails(productDetailsId: $productDetailsId)
  }
`;
export type RemoveProductDetailsMutationFn = Apollo.MutationFunction<
  RemoveProductDetails,
  RemoveProductDetailsVariables
>;

/**
 * __useRemoveProductDetails__
 *
 * To run a mutation, you first call `useRemoveProductDetails` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductDetails` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductDetails, { data, loading, error }] = useRemoveProductDetails({
 *   variables: {
 *      productDetailsId: // value for 'productDetailsId'
 *   },
 * });
 */
export function useRemoveProductDetails(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveProductDetails,
    RemoveProductDetailsVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    RemoveProductDetails,
    RemoveProductDetailsVariables
  >(RemoveProductDetailsDocument, options);
}
export type RemoveProductDetailsHookResult = ReturnType<
  typeof useRemoveProductDetails
>;
export type RemoveProductDetailsMutationResult =
  Apollo.MutationResult<RemoveProductDetails>;
export type RemoveProductDetailsMutationOptions = Apollo.BaseMutationOptions<
  RemoveProductDetails,
  RemoveProductDetailsVariables
>;
export const RemoveProviderDocument = gql`
  mutation removeProvider($providerId: ID!) {
    removeProvider(providerId: $providerId)
  }
`;
export type RemoveProviderMutationFn = Apollo.MutationFunction<
  RemoveProvider,
  RemoveProviderVariables
>;

/**
 * __useRemoveProvider__
 *
 * To run a mutation, you first call `useRemoveProvider` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProvider` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProvider, { data, loading, error }] = useRemoveProvider({
 *   variables: {
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
export function useRemoveProvider(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveProvider,
    RemoveProviderVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<RemoveProvider, RemoveProviderVariables>(
    RemoveProviderDocument,
    options,
  );
}
export type RemoveProviderHookResult = ReturnType<typeof useRemoveProvider>;
export type RemoveProviderMutationResult =
  Apollo.MutationResult<RemoveProvider>;
export type RemoveProviderMutationOptions = Apollo.BaseMutationOptions<
  RemoveProvider,
  RemoveProviderVariables
>;
export const RemoveUserDocument = gql`
  mutation removeUser {
    removeUser
  }
`;
export type RemoveUserMutationFn = Apollo.MutationFunction<
  RemoveUser,
  RemoveUserVariables
>;

/**
 * __useRemoveUser__
 *
 * To run a mutation, you first call `useRemoveUser` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUser` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUser, { data, loading, error }] = useRemoveUser({
 *   variables: {
 *   },
 * });
 */
export function useRemoveUser(
  baseOptions?: Apollo.MutationHookOptions<RemoveUser, RemoveUserVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<RemoveUser, RemoveUserVariables>(
    RemoveUserDocument,
    options,
  );
}
export type RemoveUserHookResult = ReturnType<typeof useRemoveUser>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUser>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<
  RemoveUser,
  RemoveUserVariables
>;
export const RespondToOrderDocument = gql`
  mutation respondToOrder($managersOrderResponse: ManagersOrderResponseInput!) {
    respondToOrder(managersOrderResponse: $managersOrderResponse)
  }
`;
export type RespondToOrderMutationFn = Apollo.MutationFunction<
  RespondToOrder,
  RespondToOrderVariables
>;

/**
 * __useRespondToOrder__
 *
 * To run a mutation, you first call `useRespondToOrder` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRespondToOrder` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [respondToOrder, { data, loading, error }] = useRespondToOrder({
 *   variables: {
 *      managersOrderResponse: // value for 'managersOrderResponse'
 *   },
 * });
 */
export function useRespondToOrder(
  baseOptions?: Apollo.MutationHookOptions<
    RespondToOrder,
    RespondToOrderVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<RespondToOrder, RespondToOrderVariables>(
    RespondToOrderDocument,
    options,
  );
}
export type RespondToOrderHookResult = ReturnType<typeof useRespondToOrder>;
export type RespondToOrderMutationResult =
  Apollo.MutationResult<RespondToOrder>;
export type RespondToOrderMutationOptions = Apollo.BaseMutationOptions<
  RespondToOrder,
  RespondToOrderVariables
>;
export const SaveCardDocument = gql`
  mutation saveCard($orderId: ID!) {
    saveCard(orderId: $orderId)
  }
`;
export type SaveCardMutationFn = Apollo.MutationFunction<
  SaveCard,
  SaveCardVariables
>;

/**
 * __useSaveCard__
 *
 * To run a mutation, you first call `useSaveCard` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveCard` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCard, { data, loading, error }] = useSaveCard({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useSaveCard(
  baseOptions?: Apollo.MutationHookOptions<SaveCard, SaveCardVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<SaveCard, SaveCardVariables>(
    SaveCardDocument,
    options,
  );
}
export type SaveCardHookResult = ReturnType<typeof useSaveCard>;
export type SaveCardMutationResult = Apollo.MutationResult<SaveCard>;
export type SaveCardMutationOptions = Apollo.BaseMutationOptions<
  SaveCard,
  SaveCardVariables
>;
export const ScheduleCarForServiceDocument = gql`
  mutation scheduleCarForService($input: ScheduleCarForServiceInput) {
    scheduleCarForService(input: $input) {
      orderNumber
      carPlateNumber
      timeSlot
    }
  }
`;
export type ScheduleCarForServiceMutationFn = Apollo.MutationFunction<
  ScheduleCarForService,
  ScheduleCarForServiceVariables
>;

/**
 * __useScheduleCarForService__
 *
 * To run a mutation, you first call `useScheduleCarForService` within a React component and pass it any options that fit your needs.
 * When your component renders, `useScheduleCarForService` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [scheduleCarForService, { data, loading, error }] = useScheduleCarForService({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useScheduleCarForService(
  baseOptions?: Apollo.MutationHookOptions<
    ScheduleCarForService,
    ScheduleCarForServiceVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    ScheduleCarForService,
    ScheduleCarForServiceVariables
  >(ScheduleCarForServiceDocument, options);
}
export type ScheduleCarForServiceHookResult = ReturnType<
  typeof useScheduleCarForService
>;
export type ScheduleCarForServiceMutationResult =
  Apollo.MutationResult<ScheduleCarForService>;
export type ScheduleCarForServiceMutationOptions = Apollo.BaseMutationOptions<
  ScheduleCarForService,
  ScheduleCarForServiceVariables
>;
export const SendOtpDocument = gql`
  mutation sendOtp($phone: String!) {
    sendOtp(phone: $phone) {
      sent
      expiresAt
      isRegistered
    }
  }
`;
export type SendOtpMutationFn = Apollo.MutationFunction<
  SendOtp,
  SendOtpVariables
>;

/**
 * __useSendOtp__
 *
 * To run a mutation, you first call `useSendOtp` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOtp` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOtp, { data, loading, error }] = useSendOtp({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useSendOtp(
  baseOptions?: Apollo.MutationHookOptions<SendOtp, SendOtpVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<SendOtp, SendOtpVariables>(
    SendOtpDocument,
    options,
  );
}
export type SendOtpHookResult = ReturnType<typeof useSendOtp>;
export type SendOtpMutationResult = Apollo.MutationResult<SendOtp>;
export type SendOtpMutationOptions = Apollo.BaseMutationOptions<
  SendOtp,
  SendOtpVariables
>;
export const SendPushNotificationDocument = gql`
  mutation sendPushNotification($input: PushNotificationInput!) {
    sendPushNotification(input: $input)
  }
`;
export type SendPushNotificationMutationFn = Apollo.MutationFunction<
  SendPushNotification,
  SendPushNotificationVariables
>;

/**
 * __useSendPushNotification__
 *
 * To run a mutation, you first call `useSendPushNotification` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPushNotification` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPushNotification, { data, loading, error }] = useSendPushNotification({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendPushNotification(
  baseOptions?: Apollo.MutationHookOptions<
    SendPushNotification,
    SendPushNotificationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    SendPushNotification,
    SendPushNotificationVariables
  >(SendPushNotificationDocument, options);
}
export type SendPushNotificationHookResult = ReturnType<
  typeof useSendPushNotification
>;
export type SendPushNotificationMutationResult =
  Apollo.MutationResult<SendPushNotification>;
export type SendPushNotificationMutationOptions = Apollo.BaseMutationOptions<
  SendPushNotification,
  SendPushNotificationVariables
>;
export const SendSmsNotificationDocument = gql`
  mutation sendSmsNotification($input: SmsNotification!) {
    sendSmsNotification(input: $input)
  }
`;
export type SendSmsNotificationMutationFn = Apollo.MutationFunction<
  SendSmsNotification,
  SendSmsNotificationVariables
>;

/**
 * __useSendSmsNotification__
 *
 * To run a mutation, you first call `useSendSmsNotification` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendSmsNotification` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendSmsNotification, { data, loading, error }] = useSendSmsNotification({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendSmsNotification(
  baseOptions?: Apollo.MutationHookOptions<
    SendSmsNotification,
    SendSmsNotificationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<SendSmsNotification, SendSmsNotificationVariables>(
    SendSmsNotificationDocument,
    options,
  );
}
export type SendSmsNotificationHookResult = ReturnType<
  typeof useSendSmsNotification
>;
export type SendSmsNotificationMutationResult =
  Apollo.MutationResult<SendSmsNotification>;
export type SendSmsNotificationMutationOptions = Apollo.BaseMutationOptions<
  SendSmsNotification,
  SendSmsNotificationVariables
>;
export const UpdateCarDocument = gql`
  mutation updateCar($carId: ID!, $carInput: CarInput!) {
    updateCar(carId: $carId, carInput: $carInput) {
      id
      plateNumber
      carType
      techPassportNumber
      vin
      make
      model
      year
      createdAt
      updatedAt
    }
  }
`;
export type UpdateCarMutationFn = Apollo.MutationFunction<
  UpdateCar,
  UpdateCarVariables
>;

/**
 * __useUpdateCar__
 *
 * To run a mutation, you first call `useUpdateCar` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCar` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCar, { data, loading, error }] = useUpdateCar({
 *   variables: {
 *      carId: // value for 'carId'
 *      carInput: // value for 'carInput'
 *   },
 * });
 */
export function useUpdateCar(
  baseOptions?: Apollo.MutationHookOptions<UpdateCar, UpdateCarVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<UpdateCar, UpdateCarVariables>(
    UpdateCarDocument,
    options,
  );
}
export type UpdateCarHookResult = ReturnType<typeof useUpdateCar>;
export type UpdateCarMutationResult = Apollo.MutationResult<UpdateCar>;
export type UpdateCarMutationOptions = Apollo.BaseMutationOptions<
  UpdateCar,
  UpdateCarVariables
>;
export const UpdateCategoryDocument = gql`
  mutation updateCategory($categoryId: ID!, $input: CategoryInput!) {
    updateCategory(categoryId: $categoryId, input: $input) {
      id
      name {
        ka
        en
      }
      internalName
      image
      priority
      active
    }
  }
`;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<
  UpdateCategory,
  UpdateCategoryVariables
>;

/**
 * __useUpdateCategory__
 *
 * To run a mutation, you first call `useUpdateCategory` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategory` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategory, { data, loading, error }] = useUpdateCategory({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategory(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCategory,
    UpdateCategoryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<UpdateCategory, UpdateCategoryVariables>(
    UpdateCategoryDocument,
    options,
  );
}
export type UpdateCategoryHookResult = ReturnType<typeof useUpdateCategory>;
export type UpdateCategoryMutationResult =
  Apollo.MutationResult<UpdateCategory>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateCategory,
  UpdateCategoryVariables
>;
export const UpdateProductDocument = gql`
  mutation updateProduct($productId: ID!, $input: ProductInput!) {
    updateProduct(productId: $productId, input: $input) {
      id
      name {
        ka
        en
      }
      providerId
      categoryId
      description {
        ka
        en
      }
      packages {
        id
        productId
        name {
          ka
          en
        }
        description {
          ka
          en
        }
        pricesForCarTypes {
          order
          carType
          price
        }
        availableServices {
          ka
          en
        }
        notAvailableServices {
          ka
          en
        }
        currency
        averageDurationMinutes
      }
      provider {
        id
        name
        phone
        email
        logo
        website
      }
      location {
        address {
          street
          district
          city
        }
        coordinates {
          lat
          lng
        }
      }
      mainImage
      images
      tags
    }
  }
`;
export type UpdateProductMutationFn = Apollo.MutationFunction<
  UpdateProduct,
  UpdateProductVariables
>;

/**
 * __useUpdateProduct__
 *
 * To run a mutation, you first call `useUpdateProduct` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProduct` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProduct, { data, loading, error }] = useUpdateProduct({
 *   variables: {
 *      productId: // value for 'productId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProduct(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProduct,
    UpdateProductVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<UpdateProduct, UpdateProductVariables>(
    UpdateProductDocument,
    options,
  );
}
export type UpdateProductHookResult = ReturnType<typeof useUpdateProduct>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProduct>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<
  UpdateProduct,
  UpdateProductVariables
>;
export const UpdateProductDetailsDocument = gql`
  mutation updateProductDetails(
    $productDetailsId: ID!
    $input: ProductDetailsInput!
  ) {
    updateProductDetails(productDetailsId: $productDetailsId, input: $input) {
      id
      productId
      name {
        ka
        en
      }
      description {
        ka
        en
      }
      pricesForCarTypes {
        order
        carType
        price
      }
      availableServices {
        ka
        en
      }
      notAvailableServices {
        ka
        en
      }
      currency
      averageDurationMinutes
    }
  }
`;
export type UpdateProductDetailsMutationFn = Apollo.MutationFunction<
  UpdateProductDetails,
  UpdateProductDetailsVariables
>;

/**
 * __useUpdateProductDetails__
 *
 * To run a mutation, you first call `useUpdateProductDetails` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductDetails` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductDetails, { data, loading, error }] = useUpdateProductDetails({
 *   variables: {
 *      productDetailsId: // value for 'productDetailsId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductDetails(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProductDetails,
    UpdateProductDetailsVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    UpdateProductDetails,
    UpdateProductDetailsVariables
  >(UpdateProductDetailsDocument, options);
}
export type UpdateProductDetailsHookResult = ReturnType<
  typeof useUpdateProductDetails
>;
export type UpdateProductDetailsMutationResult =
  Apollo.MutationResult<UpdateProductDetails>;
export type UpdateProductDetailsMutationOptions = Apollo.BaseMutationOptions<
  UpdateProductDetails,
  UpdateProductDetailsVariables
>;
export const UpdateProviderDocument = gql`
  mutation updateProvider($input: ProviderInput!) {
    updateProvider(input: $input) {
      id
      name
      phone
      email
      logo
      website
    }
  }
`;
export type UpdateProviderMutationFn = Apollo.MutationFunction<
  UpdateProvider,
  UpdateProviderVariables
>;

/**
 * __useUpdateProvider__
 *
 * To run a mutation, you first call `useUpdateProvider` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProvider` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProvider, { data, loading, error }] = useUpdateProvider({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProvider(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProvider,
    UpdateProviderVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<UpdateProvider, UpdateProviderVariables>(
    UpdateProviderDocument,
    options,
  );
}
export type UpdateProviderHookResult = ReturnType<typeof useUpdateProvider>;
export type UpdateProviderMutationResult =
  Apollo.MutationResult<UpdateProvider>;
export type UpdateProviderMutationOptions = Apollo.BaseMutationOptions<
  UpdateProvider,
  UpdateProviderVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      phone
      email
      role
      firstname
      lastname
      language
      deactivated
      removed
      createdAt
      updatedAt
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUser,
  UpdateUserVariables
>;

/**
 * __useUpdateUser__
 *
 * To run a mutation, you first call `useUpdateUser` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUser` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUser, { data, loading, error }] = useUpdateUser({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUser(
  baseOptions?: Apollo.MutationHookOptions<UpdateUser, UpdateUserVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<UpdateUser, UpdateUserVariables>(
    UpdateUserDocument,
    options,
  );
}
export type UpdateUserHookResult = ReturnType<typeof useUpdateUser>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUser>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUser,
  UpdateUserVariables
>;
export const CheckPhoneDocument = gql`
  query checkPhone($phone: String!) {
    checkPhone(phone: $phone)
  }
`;

/**
 * __useCheckPhone__
 *
 * To run a query within a React component, call `useCheckPhone` and pass it any options that fit your needs.
 * When your component renders, `useCheckPhone` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckPhone({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useCheckPhone(
  baseOptions: Apollo.QueryHookOptions<CheckPhone, CheckPhoneVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<CheckPhone, CheckPhoneVariables>(
    CheckPhoneDocument,
    options,
  );
}
export function useCheckPhoneLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CheckPhone, CheckPhoneVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<CheckPhone, CheckPhoneVariables>(
    CheckPhoneDocument,
    options,
  );
}
export type CheckPhoneHookResult = ReturnType<typeof useCheckPhone>;
export type CheckPhoneLazyQueryHookResult = ReturnType<
  typeof useCheckPhoneLazyQuery
>;
export type CheckPhoneQueryResult = Apollo.QueryResult<
  CheckPhone,
  CheckPhoneVariables
>;
export const EchoDocument = gql`
  query echo($message: String) {
    echo(message: $message)
  }
`;

/**
 * __useEcho__
 *
 * To run a query within a React component, call `useEcho` and pass it any options that fit your needs.
 * When your component renders, `useEcho` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEcho({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useEcho(
  baseOptions?: Apollo.QueryHookOptions<Echo, EchoVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<Echo, EchoVariables>(EchoDocument, options);
}
export function useEchoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Echo, EchoVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<Echo, EchoVariables>(EchoDocument, options);
}
export type EchoHookResult = ReturnType<typeof useEcho>;
export type EchoLazyQueryHookResult = ReturnType<typeof useEchoLazyQuery>;
export type EchoQueryResult = Apollo.QueryResult<Echo, EchoVariables>;
export const EchoAuthorizedDocument = gql`
  query echoAuthorized($message: String) {
    echoAuthorized(message: $message)
  }
`;

/**
 * __useEchoAuthorized__
 *
 * To run a query within a React component, call `useEchoAuthorized` and pass it any options that fit your needs.
 * When your component renders, `useEchoAuthorized` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEchoAuthorized({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useEchoAuthorized(
  baseOptions?: Apollo.QueryHookOptions<
    EchoAuthorized,
    EchoAuthorizedVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<EchoAuthorized, EchoAuthorizedVariables>(
    EchoAuthorizedDocument,
    options,
  );
}
export function useEchoAuthorizedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EchoAuthorized,
    EchoAuthorizedVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<EchoAuthorized, EchoAuthorizedVariables>(
    EchoAuthorizedDocument,
    options,
  );
}
export type EchoAuthorizedHookResult = ReturnType<typeof useEchoAuthorized>;
export type EchoAuthorizedLazyQueryHookResult = ReturnType<
  typeof useEchoAuthorizedLazyQuery
>;
export type EchoAuthorizedQueryResult = Apollo.QueryResult<
  EchoAuthorized,
  EchoAuthorizedVariables
>;
export const EchoFluxDocument = gql`
  query echoFlux($message: String) {
    echoFlux(message: $message)
  }
`;

/**
 * __useEchoFlux__
 *
 * To run a query within a React component, call `useEchoFlux` and pass it any options that fit your needs.
 * When your component renders, `useEchoFlux` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEchoFlux({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useEchoFlux(
  baseOptions?: Apollo.QueryHookOptions<EchoFlux, EchoFluxVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<EchoFlux, EchoFluxVariables>(
    EchoFluxDocument,
    options,
  );
}
export function useEchoFluxLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EchoFlux, EchoFluxVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<EchoFlux, EchoFluxVariables>(
    EchoFluxDocument,
    options,
  );
}
export type EchoFluxHookResult = ReturnType<typeof useEchoFlux>;
export type EchoFluxLazyQueryHookResult = ReturnType<
  typeof useEchoFluxLazyQuery
>;
export type EchoFluxQueryResult = Apollo.QueryResult<
  EchoFlux,
  EchoFluxVariables
>;
export const EchoMonoDocument = gql`
  query echoMono($message: String) {
    echoMono(message: $message)
  }
`;

/**
 * __useEchoMono__
 *
 * To run a query within a React component, call `useEchoMono` and pass it any options that fit your needs.
 * When your component renders, `useEchoMono` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEchoMono({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useEchoMono(
  baseOptions?: Apollo.QueryHookOptions<EchoMono, EchoMonoVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<EchoMono, EchoMonoVariables>(
    EchoMonoDocument,
    options,
  );
}
export function useEchoMonoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EchoMono, EchoMonoVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<EchoMono, EchoMonoVariables>(
    EchoMonoDocument,
    options,
  );
}
export type EchoMonoHookResult = ReturnType<typeof useEchoMono>;
export type EchoMonoLazyQueryHookResult = ReturnType<
  typeof useEchoMonoLazyQuery
>;
export type EchoMonoQueryResult = Apollo.QueryResult<
  EchoMono,
  EchoMonoVariables
>;
export const GetCommissionDocument = gql`
  query getCommission($productId: ID!, $packageId: ID) {
    getCommission(productId: $productId, packageId: $packageId) {
      commission
      commissionToShow
    }
  }
`;

/**
 * __useGetCommission__
 *
 * To run a query within a React component, call `useGetCommission` and pass it any options that fit your needs.
 * When your component renders, `useGetCommission` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommission({
 *   variables: {
 *      productId: // value for 'productId'
 *      packageId: // value for 'packageId'
 *   },
 * });
 */
export function useGetCommission(
  baseOptions: Apollo.QueryHookOptions<GetCommission, GetCommissionVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<GetCommission, GetCommissionVariables>(
    GetCommissionDocument,
    options,
  );
}
export function useGetCommissionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCommission,
    GetCommissionVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<GetCommission, GetCommissionVariables>(
    GetCommissionDocument,
    options,
  );
}
export type GetCommissionHookResult = ReturnType<typeof useGetCommission>;
export type GetCommissionLazyQueryHookResult = ReturnType<
  typeof useGetCommissionLazyQuery
>;
export type GetCommissionQueryResult = Apollo.QueryResult<
  GetCommission,
  GetCommissionVariables
>;
export const GetMeDocument = gql`
  query getMe {
    getMe {
      id
      phone
      email
      role
      firstname
      lastname
      language
      deactivated
      removed
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetMe__
 *
 * To run a query within a React component, call `useGetMe` and pass it any options that fit your needs.
 * When your component renders, `useGetMe` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMe({
 *   variables: {
 *   },
 * });
 */
export function useGetMe(
  baseOptions?: Apollo.QueryHookOptions<GetMe, GetMeVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<GetMe, GetMeVariables>(GetMeDocument, options);
}
export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMe, GetMeVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<GetMe, GetMeVariables>(GetMeDocument, options);
}
export type GetMeHookResult = ReturnType<typeof useGetMe>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMe, GetMeVariables>;
export const GetOrderDocument = gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) {
      id
      totalPrice
      commission
      status
      productId
      packageId
      categoryId
      providerId
      schedulingDay
      schedulingTime
      carType
      carPlateNumber
      errorMessage
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetOrder__
 *
 * To run a query within a React component, call `useGetOrder` and pass it any options that fit your needs.
 * When your component renders, `useGetOrder` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrder({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrder(
  baseOptions: Apollo.QueryHookOptions<GetOrder, GetOrderVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<GetOrder, GetOrderVariables>(
    GetOrderDocument,
    options,
  );
}
export function useGetOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetOrder, GetOrderVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<GetOrder, GetOrderVariables>(
    GetOrderDocument,
    options,
  );
}
export type GetOrderHookResult = ReturnType<typeof useGetOrder>;
export type GetOrderLazyQueryHookResult = ReturnType<
  typeof useGetOrderLazyQuery
>;
export type GetOrderQueryResult = Apollo.QueryResult<
  GetOrder,
  GetOrderVariables
>;
export const GetPaymentInfoDocument = gql`
  query getPaymentInfo($orderId: ID!) {
    getPaymentInfo(orderId: $orderId)
  }
`;

/**
 * __useGetPaymentInfo__
 *
 * To run a query within a React component, call `useGetPaymentInfo` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentInfo` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentInfo({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetPaymentInfo(
  baseOptions: Apollo.QueryHookOptions<GetPaymentInfo, GetPaymentInfoVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<GetPaymentInfo, GetPaymentInfoVariables>(
    GetPaymentInfoDocument,
    options,
  );
}
export function useGetPaymentInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPaymentInfo,
    GetPaymentInfoVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<GetPaymentInfo, GetPaymentInfoVariables>(
    GetPaymentInfoDocument,
    options,
  );
}
export type GetPaymentInfoHookResult = ReturnType<typeof useGetPaymentInfo>;
export type GetPaymentInfoLazyQueryHookResult = ReturnType<
  typeof useGetPaymentInfoLazyQuery
>;
export type GetPaymentInfoQueryResult = Apollo.QueryResult<
  GetPaymentInfo,
  GetPaymentInfoVariables
>;
export const GetProductDocument = gql`
  query getProduct($productId: ID!) {
    getProduct(productId: $productId) {
      id
      name {
        ka
        en
      }
      providerId
      categoryId
      description {
        ka
        en
      }
      packages {
        id
        productId
        name {
          ka
          en
        }
        description {
          ka
          en
        }
        pricesForCarTypes {
          order
          carType
          price
        }
        availableServices {
          ka
          en
        }
        notAvailableServices {
          ka
          en
        }
        currency
        averageDurationMinutes
      }
      provider {
        id
        name
        phone
        email
        logo
        website
      }
      location {
        address {
          street
          district
          city
        }
        coordinates {
          lat
          lng
        }
      }
      mainImage
      images
      tags
    }
  }
`;

/**
 * __useGetProduct__
 *
 * To run a query within a React component, call `useGetProduct` and pass it any options that fit your needs.
 * When your component renders, `useGetProduct` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProduct({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProduct(
  baseOptions: Apollo.QueryHookOptions<GetProduct, GetProductVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<GetProduct, GetProductVariables>(
    GetProductDocument,
    options,
  );
}
export function useGetProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProduct, GetProductVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<GetProduct, GetProductVariables>(
    GetProductDocument,
    options,
  );
}
export type GetProductHookResult = ReturnType<typeof useGetProduct>;
export type GetProductLazyQueryHookResult = ReturnType<
  typeof useGetProductLazyQuery
>;
export type GetProductQueryResult = Apollo.QueryResult<
  GetProduct,
  GetProductVariables
>;
export const GetUserByIdDocument = gql`
  query getUserById($userId: ID!) {
    getUserById(userId: $userId) {
      id
      phone
      email
      role
      firstname
      lastname
      language
      deactivated
      removed
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetUserById__
 *
 * To run a query within a React component, call `useGetUserById` and pass it any options that fit your needs.
 * When your component renders, `useGetUserById` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserById({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserById(
  baseOptions: Apollo.QueryHookOptions<GetUserById, GetUserByIdVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<GetUserById, GetUserByIdVariables>(
    GetUserByIdDocument,
    options,
  );
}
export function useGetUserByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserById, GetUserByIdVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<GetUserById, GetUserByIdVariables>(
    GetUserByIdDocument,
    options,
  );
}
export type GetUserByIdHookResult = ReturnType<typeof useGetUserById>;
export type GetUserByIdLazyQueryHookResult = ReturnType<
  typeof useGetUserByIdLazyQuery
>;
export type GetUserByIdQueryResult = Apollo.QueryResult<
  GetUserById,
  GetUserByIdVariables
>;
export const ListCardsDocument = gql`
  query listCards {
    listCards {
      id
      pan
      cardType
      expirationDate
    }
  }
`;

/**
 * __useListCards__
 *
 * To run a query within a React component, call `useListCards` and pass it any options that fit your needs.
 * When your component renders, `useListCards` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCards({
 *   variables: {
 *   },
 * });
 */
export function useListCards(
  baseOptions?: Apollo.QueryHookOptions<ListCards, ListCardsVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ListCards, ListCardsVariables>(
    ListCardsDocument,
    options,
  );
}
export function useListCardsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListCards, ListCardsVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ListCards, ListCardsVariables>(
    ListCardsDocument,
    options,
  );
}
export type ListCardsHookResult = ReturnType<typeof useListCards>;
export type ListCardsLazyQueryHookResult = ReturnType<
  typeof useListCardsLazyQuery
>;
export type ListCardsQueryResult = Apollo.QueryResult<
  ListCards,
  ListCardsVariables
>;
export const ListCarsDocument = gql`
  query listCars {
    listCars {
      id
      plateNumber
      carType
      techPassportNumber
      vin
      make
      model
      year
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useListCars__
 *
 * To run a query within a React component, call `useListCars` and pass it any options that fit your needs.
 * When your component renders, `useListCars` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCars({
 *   variables: {
 *   },
 * });
 */
export function useListCars(
  baseOptions?: Apollo.QueryHookOptions<ListCars, ListCarsVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ListCars, ListCarsVariables>(
    ListCarsDocument,
    options,
  );
}
export function useListCarsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListCars, ListCarsVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ListCars, ListCarsVariables>(
    ListCarsDocument,
    options,
  );
}
export type ListCarsHookResult = ReturnType<typeof useListCars>;
export type ListCarsLazyQueryHookResult = ReturnType<
  typeof useListCarsLazyQuery
>;
export type ListCarsQueryResult = Apollo.QueryResult<
  ListCars,
  ListCarsVariables
>;
export const ListCategoriesDocument = gql`
  query listCategories {
    listCategories {
      id
      name {
        ka
        en
      }
      internalName
      image
      priority
      active
    }
  }
`;

/**
 * __useListCategories__
 *
 * To run a query within a React component, call `useListCategories` and pass it any options that fit your needs.
 * When your component renders, `useListCategories` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCategories({
 *   variables: {
 *   },
 * });
 */
export function useListCategories(
  baseOptions?: Apollo.QueryHookOptions<
    ListCategories,
    ListCategoriesVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ListCategories, ListCategoriesVariables>(
    ListCategoriesDocument,
    options,
  );
}
export function useListCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListCategories,
    ListCategoriesVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ListCategories, ListCategoriesVariables>(
    ListCategoriesDocument,
    options,
  );
}
export type ListCategoriesHookResult = ReturnType<typeof useListCategories>;
export type ListCategoriesLazyQueryHookResult = ReturnType<
  typeof useListCategoriesLazyQuery
>;
export type ListCategoriesQueryResult = Apollo.QueryResult<
  ListCategories,
  ListCategoriesVariables
>;
export const ListChatMessagesDocument = gql`
  query listChatMessages {
    listChatMessages {
      id
      createdAt
      text
      isAnswer
      status
    }
  }
`;

/**
 * __useListChatMessages__
 *
 * To run a query within a React component, call `useListChatMessages` and pass it any options that fit your needs.
 * When your component renders, `useListChatMessages` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListChatMessages({
 *   variables: {
 *   },
 * });
 */
export function useListChatMessages(
  baseOptions?: Apollo.QueryHookOptions<
    ListChatMessages,
    ListChatMessagesVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ListChatMessages, ListChatMessagesVariables>(
    ListChatMessagesDocument,
    options,
  );
}
export function useListChatMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListChatMessages,
    ListChatMessagesVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ListChatMessages, ListChatMessagesVariables>(
    ListChatMessagesDocument,
    options,
  );
}
export type ListChatMessagesHookResult = ReturnType<typeof useListChatMessages>;
export type ListChatMessagesLazyQueryHookResult = ReturnType<
  typeof useListChatMessagesLazyQuery
>;
export type ListChatMessagesQueryResult = Apollo.QueryResult<
  ListChatMessages,
  ListChatMessagesVariables
>;
export const ListOrdersDocument = gql`
  query listOrders {
    listOrders {
      id
      totalPrice
      commission
      status
      productId
      packageId
      categoryId
      providerId
      schedulingDay
      schedulingTime
      carType
      carPlateNumber
      errorMessage
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useListOrders__
 *
 * To run a query within a React component, call `useListOrders` and pass it any options that fit your needs.
 * When your component renders, `useListOrders` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOrders({
 *   variables: {
 *   },
 * });
 */
export function useListOrders(
  baseOptions?: Apollo.QueryHookOptions<ListOrders, ListOrdersVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ListOrders, ListOrdersVariables>(
    ListOrdersDocument,
    options,
  );
}
export function useListOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListOrders, ListOrdersVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ListOrders, ListOrdersVariables>(
    ListOrdersDocument,
    options,
  );
}
export type ListOrdersHookResult = ReturnType<typeof useListOrders>;
export type ListOrdersLazyQueryHookResult = ReturnType<
  typeof useListOrdersLazyQuery
>;
export type ListOrdersQueryResult = Apollo.QueryResult<
  ListOrders,
  ListOrdersVariables
>;
export const ListOrdersByManagerDocument = gql`
  query listOrdersByManager {
    listOrdersByManager {
      id
      totalPrice
      commission
      status
      productId
      packageId
      categoryId
      providerId
      schedulingDay
      schedulingTime
      carType
      carPlateNumber
      errorMessage
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useListOrdersByManager__
 *
 * To run a query within a React component, call `useListOrdersByManager` and pass it any options that fit your needs.
 * When your component renders, `useListOrdersByManager` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOrdersByManager({
 *   variables: {
 *   },
 * });
 */
export function useListOrdersByManager(
  baseOptions?: Apollo.QueryHookOptions<
    ListOrdersByManager,
    ListOrdersByManagerVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ListOrdersByManager, ListOrdersByManagerVariables>(
    ListOrdersByManagerDocument,
    options,
  );
}
export function useListOrdersByManagerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListOrdersByManager,
    ListOrdersByManagerVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ListOrdersByManager, ListOrdersByManagerVariables>(
    ListOrdersByManagerDocument,
    options,
  );
}
export type ListOrdersByManagerHookResult = ReturnType<
  typeof useListOrdersByManager
>;
export type ListOrdersByManagerLazyQueryHookResult = ReturnType<
  typeof useListOrdersByManagerLazyQuery
>;
export type ListOrdersByManagerQueryResult = Apollo.QueryResult<
  ListOrdersByManager,
  ListOrdersByManagerVariables
>;
export const ListProductByCategoryIdDocument = gql`
  query listProductByCategoryId($categoryId: ID!) {
    listProductByCategoryId(categoryId: $categoryId) {
      id
      name {
        ka
        en
      }
      providerId
      categoryId
      description {
        ka
        en
      }
      packages {
        id
        productId
        name {
          ka
          en
        }
        description {
          ka
          en
        }
        pricesForCarTypes {
          order
          carType
          price
        }
        availableServices {
          ka
          en
        }
        notAvailableServices {
          ka
          en
        }
        currency
        averageDurationMinutes
      }
      provider {
        id
        name
        phone
        email
        logo
        website
      }
      location {
        address {
          street
          district
          city
        }
        coordinates {
          lat
          lng
        }
      }
      mainImage
      images
      tags
    }
  }
`;

/**
 * __useListProductByCategoryId__
 *
 * To run a query within a React component, call `useListProductByCategoryId` and pass it any options that fit your needs.
 * When your component renders, `useListProductByCategoryId` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProductByCategoryId({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useListProductByCategoryId(
  baseOptions: Apollo.QueryHookOptions<
    ListProductByCategoryId,
    ListProductByCategoryIdVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<
    ListProductByCategoryId,
    ListProductByCategoryIdVariables
  >(ListProductByCategoryIdDocument, options);
}
export function useListProductByCategoryIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListProductByCategoryId,
    ListProductByCategoryIdVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    ListProductByCategoryId,
    ListProductByCategoryIdVariables
  >(ListProductByCategoryIdDocument, options);
}
export type ListProductByCategoryIdHookResult = ReturnType<
  typeof useListProductByCategoryId
>;
export type ListProductByCategoryIdLazyQueryHookResult = ReturnType<
  typeof useListProductByCategoryIdLazyQuery
>;
export type ListProductByCategoryIdQueryResult = Apollo.QueryResult<
  ListProductByCategoryId,
  ListProductByCategoryIdVariables
>;
export const ListProductByProviderIdDocument = gql`
  query listProductByProviderId($providerId: ID!) {
    listProductByProviderId(providerId: $providerId) {
      id
      name {
        ka
        en
      }
      providerId
      categoryId
      description {
        ka
        en
      }
      packages {
        id
        productId
        name {
          ka
          en
        }
        description {
          ka
          en
        }
        pricesForCarTypes {
          order
          carType
          price
        }
        availableServices {
          ka
          en
        }
        notAvailableServices {
          ka
          en
        }
        currency
        averageDurationMinutes
      }
      provider {
        id
        name
        phone
        email
        logo
        website
      }
      location {
        address {
          street
          district
          city
        }
        coordinates {
          lat
          lng
        }
      }
      mainImage
      images
      tags
    }
  }
`;

/**
 * __useListProductByProviderId__
 *
 * To run a query within a React component, call `useListProductByProviderId` and pass it any options that fit your needs.
 * When your component renders, `useListProductByProviderId` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProductByProviderId({
 *   variables: {
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
export function useListProductByProviderId(
  baseOptions: Apollo.QueryHookOptions<
    ListProductByProviderId,
    ListProductByProviderIdVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<
    ListProductByProviderId,
    ListProductByProviderIdVariables
  >(ListProductByProviderIdDocument, options);
}
export function useListProductByProviderIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListProductByProviderId,
    ListProductByProviderIdVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    ListProductByProviderId,
    ListProductByProviderIdVariables
  >(ListProductByProviderIdDocument, options);
}
export type ListProductByProviderIdHookResult = ReturnType<
  typeof useListProductByProviderId
>;
export type ListProductByProviderIdLazyQueryHookResult = ReturnType<
  typeof useListProductByProviderIdLazyQuery
>;
export type ListProductByProviderIdQueryResult = Apollo.QueryResult<
  ListProductByProviderId,
  ListProductByProviderIdVariables
>;
export const ListProductDetailsByProductIdDocument = gql`
  query listProductDetailsByProductId($productId: ID!) {
    listProductDetailsByProductId(productId: $productId) {
      id
      productId
      name {
        ka
        en
      }
      description {
        ka
        en
      }
      pricesForCarTypes {
        order
        carType
        price
      }
      availableServices {
        ka
        en
      }
      notAvailableServices {
        ka
        en
      }
      currency
      averageDurationMinutes
    }
  }
`;

/**
 * __useListProductDetailsByProductId__
 *
 * To run a query within a React component, call `useListProductDetailsByProductId` and pass it any options that fit your needs.
 * When your component renders, `useListProductDetailsByProductId` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProductDetailsByProductId({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useListProductDetailsByProductId(
  baseOptions: Apollo.QueryHookOptions<
    ListProductDetailsByProductId,
    ListProductDetailsByProductIdVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<
    ListProductDetailsByProductId,
    ListProductDetailsByProductIdVariables
  >(ListProductDetailsByProductIdDocument, options);
}
export function useListProductDetailsByProductIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListProductDetailsByProductId,
    ListProductDetailsByProductIdVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    ListProductDetailsByProductId,
    ListProductDetailsByProductIdVariables
  >(ListProductDetailsByProductIdDocument, options);
}
export type ListProductDetailsByProductIdHookResult = ReturnType<
  typeof useListProductDetailsByProductId
>;
export type ListProductDetailsByProductIdLazyQueryHookResult = ReturnType<
  typeof useListProductDetailsByProductIdLazyQuery
>;
export type ListProductDetailsByProductIdQueryResult = Apollo.QueryResult<
  ListProductDetailsByProductId,
  ListProductDetailsByProductIdVariables
>;
export const ListProductsDocument = gql`
  query listProducts {
    listProducts {
      id
      name {
        ka
        en
      }
      providerId
      categoryId
      description {
        ka
        en
      }
      packages {
        id
        productId
        name {
          ka
          en
        }
        description {
          ka
          en
        }
        pricesForCarTypes {
          order
          carType
          price
        }
        availableServices {
          ka
          en
        }
        notAvailableServices {
          ka
          en
        }
        currency
        averageDurationMinutes
      }
      provider {
        id
        name
        phone
        email
        logo
        website
      }
      location {
        address {
          street
          district
          city
        }
        coordinates {
          lat
          lng
        }
      }
      mainImage
      images
      tags
    }
  }
`;

/**
 * __useListProducts__
 *
 * To run a query within a React component, call `useListProducts` and pass it any options that fit your needs.
 * When your component renders, `useListProducts` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProducts({
 *   variables: {
 *   },
 * });
 */
export function useListProducts(
  baseOptions?: Apollo.QueryHookOptions<ListProducts, ListProductsVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ListProducts, ListProductsVariables>(
    ListProductsDocument,
    options,
  );
}
export function useListProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListProducts,
    ListProductsVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ListProducts, ListProductsVariables>(
    ListProductsDocument,
    options,
  );
}
export type ListProductsHookResult = ReturnType<typeof useListProducts>;
export type ListProductsLazyQueryHookResult = ReturnType<
  typeof useListProductsLazyQuery
>;
export type ListProductsQueryResult = Apollo.QueryResult<
  ListProducts,
  ListProductsVariables
>;
export const ListProvidersDocument = gql`
  query listProviders {
    listProviders {
      id
      name
      phone
      email
      logo
      website
    }
  }
`;

/**
 * __useListProviders__
 *
 * To run a query within a React component, call `useListProviders` and pass it any options that fit your needs.
 * When your component renders, `useListProviders` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProviders({
 *   variables: {
 *   },
 * });
 */
export function useListProviders(
  baseOptions?: Apollo.QueryHookOptions<ListProviders, ListProvidersVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ListProviders, ListProvidersVariables>(
    ListProvidersDocument,
    options,
  );
}
export function useListProvidersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListProviders,
    ListProvidersVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ListProviders, ListProvidersVariables>(
    ListProvidersDocument,
    options,
  );
}
export type ListProvidersHookResult = ReturnType<typeof useListProviders>;
export type ListProvidersLazyQueryHookResult = ReturnType<
  typeof useListProvidersLazyQuery
>;
export type ListProvidersQueryResult = Apollo.QueryResult<
  ListProviders,
  ListProvidersVariables
>;
export const ListQueueDocument = gql`
  query listQueue($providerId: ID) {
    listQueue(providerId: $providerId) {
      orderNumber
      carPlateNumber
      timeSlot
    }
  }
`;

/**
 * __useListQueue__
 *
 * To run a query within a React component, call `useListQueue` and pass it any options that fit your needs.
 * When your component renders, `useListQueue` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListQueue({
 *   variables: {
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
export function useListQueue(
  baseOptions?: Apollo.QueryHookOptions<ListQueue, ListQueueVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ListQueue, ListQueueVariables>(
    ListQueueDocument,
    options,
  );
}
export function useListQueueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListQueue, ListQueueVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ListQueue, ListQueueVariables>(
    ListQueueDocument,
    options,
  );
}
export type ListQueueHookResult = ReturnType<typeof useListQueue>;
export type ListQueueLazyQueryHookResult = ReturnType<
  typeof useListQueueLazyQuery
>;
export type ListQueueQueryResult = Apollo.QueryResult<
  ListQueue,
  ListQueueVariables
>;
export const SearchProductsDocument = gql`
  query searchProducts($filter: ProductFilterInput!) {
    searchProducts(filter: $filter) {
      id
      name {
        ka
        en
      }
      providerId
      categoryId
      description {
        ka
        en
      }
      packages {
        id
        productId
        name {
          ka
          en
        }
        description {
          ka
          en
        }
        pricesForCarTypes {
          order
          carType
          price
        }
        availableServices {
          ka
          en
        }
        notAvailableServices {
          ka
          en
        }
        currency
        averageDurationMinutes
      }
      provider {
        id
        name
        phone
        email
        logo
        website
      }
      location {
        address {
          street
          district
          city
        }
        coordinates {
          lat
          lng
        }
      }
      mainImage
      images
      tags
    }
  }
`;

/**
 * __useSearchProducts__
 *
 * To run a query within a React component, call `useSearchProducts` and pass it any options that fit your needs.
 * When your component renders, `useSearchProducts` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProducts({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useSearchProducts(
  baseOptions: Apollo.QueryHookOptions<SearchProducts, SearchProductsVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<SearchProducts, SearchProductsVariables>(
    SearchProductsDocument,
    options,
  );
}
export function useSearchProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchProducts,
    SearchProductsVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<SearchProducts, SearchProductsVariables>(
    SearchProductsDocument,
    options,
  );
}
export type SearchProductsHookResult = ReturnType<typeof useSearchProducts>;
export type SearchProductsLazyQueryHookResult = ReturnType<
  typeof useSearchProductsLazyQuery
>;
export type SearchProductsQueryResult = Apollo.QueryResult<
  SearchProducts,
  SearchProductsVariables
>;
export const SubscribeToQueueDocument = gql`
  subscription subscribeToQueue($providerId: ID) {
    subscribeToQueue(providerId: $providerId)
  }
`;

/**
 * __useSubscribeToQueue__
 *
 * To run a query within a React component, call `useSubscribeToQueue` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToQueue` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToQueue({
 *   variables: {
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
export function useSubscribeToQueue(
  baseOptions?: Apollo.SubscriptionHookOptions<
    SubscribeToQueue,
    SubscribeToQueueVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useSubscription<SubscribeToQueue, SubscribeToQueueVariables>(
    SubscribeToQueueDocument,
    options,
  );
}
export type SubscribeToQueueHookResult = ReturnType<typeof useSubscribeToQueue>;
export type SubscribeToQueueSubscriptionResult =
  Apollo.SubscriptionResult<SubscribeToQueue>;
