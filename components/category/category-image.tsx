import {Category} from "../../graphql/operations";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ImageStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {Image} from "react-native";
import * as React from "react";




interface CategoryImageProps {
  item: Category;
  style: StyleProp<ImageStyle>;
}

export default function CategoryImage({
                                        item,
                                        style,
                                      }: CategoryImageProps) {

  if (item.image) {
    return <Image source={{uri: item.image}} style={style}/>;
  }

  return <></>
}
