import {Category} from '../../graphql/operations';
import {Pressable, StyleSheet, Text} from 'react-native';
import * as React from 'react';
import colors from '../../styles/colors';

interface CategoryMapItemProps {
  onPress: () => void;
  category: Category;
  isSelected: boolean;
  index: number;
}
export function CategoryMapItem({
  onPress,
  category,
  isSelected,
  index,
}: CategoryMapItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.category,
        {backgroundColor: isSelected ? colors.primary : colors.white},
      ]}>
      <Text
        style={[
          styles.category,
          {color: isSelected ? colors.white : colors.black},
        ]}>
        {category.name.ka}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  category: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 5,
    margin: 5,
  },
  categoryName: {
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});
