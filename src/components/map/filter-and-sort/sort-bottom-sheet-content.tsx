import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../styles/colors';
import {SortByEnum} from '../../../store/slice/searchSlice';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {MapLocationIcon} from '../../../assets/icons/location-icon';
import {IconProps} from '../../../assets/icons/base';
import {LowPriceIcon} from '../../../assets/icons/low-price-icon';
import {PopularityIcon} from '../../../assets/icons/popularity-icon';
import {StarIcon} from '../../../assets/icons/star-icon';

export interface SortOptions {
  name: string;
  sortBy: SortByEnum;
  icon: React.FC<IconProps>;
}

const sortByOptionsList: SortOptions[] = [
  {
    name: 'ადგილის მიხედვით',
    sortBy: SortByEnum.LOCATION,
    icon: MapLocationIcon,
  },
  {
    name: 'შეფასების მიხედვით',
    sortBy: SortByEnum.RATE,
    icon: StarIcon,
  },
  {
    name: 'ფასის მიხედვით',
    sortBy: SortByEnum.PRICE,
    icon: LowPriceIcon,
  },
  {
    name: 'პოპიულარობის მიხედვით',
    sortBy: SortByEnum.POPULARITY,
    icon: PopularityIcon,
  },
];

interface FilterBottomSheetProps {
  sortBy: SortByEnum;
  setSortBy: (sortBy: SortByEnum) => void;
  onFinishButtonPress: () => void;
}

export default function SortBottomSheetContent({
  sortBy,
  onFinishButtonPress,
  setSortBy,
}: FilterBottomSheetProps) {
  function onPress() {
    onFinishButtonPress();
  }

  return (
    <View style={styles.bodyCont}>
      <FlatList
        data={sortByOptionsList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSortBy(item.sortBy);
              }}>
              <View style={styles.sortItem}>
                <View
                  style={{gap: 5, flexDirection: 'row', alignItems: 'center'}}>
                  <item.icon size={30} />
                  <Text style={styles.nameText}>{item.name}</Text>
                </View>
                {item.sortBy === sortBy && (
                  <Icon name={'check'} size={25} color={'green'} />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.sortBy}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      />
      <Pressable style={styles.nextButton} onPress={onPress}>
        <Text style={styles.nextText}>სორტირება</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  filterText: {
    textAlign: 'center',
    fontSize: 20,
  },
  bodyCont: {
    paddingHorizontal: 20,
    gap: 10,
  },
  sortItem: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nextButton: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 90,
  },
  nextText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  nameText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
