import React from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../../styles/colors';
import {useAuth} from '../../context/auth-context';
import useUser from '../../hooks/user';
import {RootStackScreenProps} from '../../navigation/types';
import {useRemoveUser} from '../../graphql/operations';
import ProfileIcon from '../../components/profile/profile-icon';
import InfoText from '../../components/profile/info-text';
import BaseIcon from '../../components/profile/icon';
import Chevron from '../../components/profile/chavron';
import {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

interface ListItemProps {
  title: string;
  onPress?: () => void;
  hideChevron?: boolean;
  containerStyle: ViewStyle;
  rightElement?: React.JSX.Element;
  rightTitle?: string;
  rightTitleStyle?: TextStyle;
  leftIcon: React.JSX.Element;
  rightIcon?: React.JSX.Element;
}

const ListItem = ({
  title,
  onPress,
  hideChevron,
  containerStyle,
  rightElement,
  rightTitle,
  rightTitleStyle,
  leftIcon,
  rightIcon,
}: ListItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        containerStyle,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {leftIcon ? leftIcon : null}
        <Text>{title}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
        {rightTitle ? <Text style={rightTitleStyle}>{rightTitle}</Text> : null}
        {rightIcon ? rightIcon : null}
        {rightElement ? rightElement : null}
      </View>
    </Pressable>
  );
};

export default function Profile({navigation}: RootStackScreenProps<'profile'>) {
  const user = useUser();
  const [removeUser] = useRemoveUser();
  const {removeAuthToken} = useAuth();

  const onPressSetting = () => {};

  const onChangePushNotifications = () => {};
  const onLogOut = () => {
    removeAuthToken()
      .then(() => {
        navigation.navigate('auth', {
          screen: 'signIn',
        });
      })
      .catch(() => {
        Alert.alert('Error', 'Error occurred during log out');
      });
  };
  const onRemoveAccount = async () => {
    // TODO `add are you sure?`
    await removeUser();

    onLogOut();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <ProfileIcon />
          </View>
          <View>
            <Text style={{fontSize: 16}}>
              {user?.firstname} {user?.lastname}
            </Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}>
              {user?.phone}
            </Text>
          </View>
        </View>
        <InfoText text="Account" />
        <View>
          <ListItem
            hideChevron
            title="შეტყობინებები"
            containerStyle={styles.listItemContainer}
            rightElement={
              <Switch onValueChange={onChangePushNotifications} value={true} />
            }
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FFADF2',
                }}
                icon={{
                  type: 'material',
                  name: 'notifications',
                }}
              />
            }
          />
          {/*<ListItem*/}
          {/*  // chevron*/}
          {/*  title="Currency"*/}
          {/*  rightTitle="USD"*/}
          {/*  rightTitleStyle={{fontSize: 15}}*/}
          {/*  onPress={() => onPressSetting()}*/}
          {/*  containerStyle={styles.listItemContainer}*/}
          {/*  leftIcon={*/}
          {/*    <BaseIcon*/}
          {/*      containerStyle={{backgroundColor: '#FAD291'}}*/}
          {/*      icon={{*/}
          {/*        type: 'font-awesome',*/}
          {/*        name: 'money',*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  }*/}
          {/*  rightIcon={<Chevron />}*/}
          {/*/>*/}
          {/*<ListItem*/}
          {/*  title="Location"*/}
          {/*  rightTitle="New York"*/}
          {/*  rightTitleStyle={{fontSize: 15}}*/}
          {/*  onPress={() => onPressSetting()}*/}
          {/*  containerStyle={styles.listItemContainer}*/}
          {/*  leftIcon={*/}
          {/*    <BaseIcon*/}
          {/*      containerStyle={{backgroundColor: '#57DCE7'}}*/}
          {/*      icon={{*/}
          {/*        type: 'material',*/}
          {/*        name: 'place',*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  }*/}
          {/*  rightIcon={<Chevron />}*/}
          {/*/>*/}
          <ListItem
            title="ენა"
            rightTitle="ქართული"
            rightTitleStyle={{fontSize: 15}}
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{backgroundColor: '#FEA8A1'}}
                icon={{
                  type: 'material',
                  name: 'language',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
        <InfoText text="მეტი" />
        <View>
          <ListItem
            title="ჩვენ შესახებ"
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{backgroundColor: '#A4C8F0'}}
                icon={{
                  type: 'ionicon',
                  name: 'md-information-circle',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="პირობები"
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{backgroundColor: '#C6C7C6'}}
                icon={{
                  type: 'entypo',
                  name: 'light-bulb',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="გააზიარე აპლიკაცია"
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#C47EFF',
                }}
                icon={{
                  type: 'entypo',
                  name: 'share',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="შეგვაფასე"
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FECE44',
                }}
                icon={{
                  type: 'entypo',
                  name: 'star',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Send FeedBack"
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#00C001',
                }}
                icon={{
                  type: 'materialicon',
                  name: 'feedback',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
        {/* Log out button */}
        <Pressable onPress={onLogOut} style={styles.button}>
          <Text style={[styles.buttonText, {color: colors.buttonPrimary}]}>
            აპლიკაციიდან გასვლა
          </Text>
        </Pressable>
        <Pressable onPress={onRemoveAccount} style={styles.button}>
          <Text style={[styles.buttonText, {color: 'red'}]}>წაშლა</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  sectionsContainer: {
    flex: 1,
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
});
