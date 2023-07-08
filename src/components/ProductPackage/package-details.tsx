import {ProductDetails} from '../../graphql/operations';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Entypo, Feather} from '@expo/vector-icons';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
interface PackageInfoProps {
  productPackage: ProductDetails;
}

interface ServiceInfoProps {
  service: string;
}
function IncluededServiceInfo({service}: ServiceInfoProps) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
      <Feather name={'check'} color={'green'} size={24} />
      <Text>{service}</Text>
    </View>
  );
}

function NotIncludedServiceInfo({service}: ServiceInfoProps) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
      <Entypo name={'cross'} color={'red'} size={24} />
      <Text>{service}</Text>
    </View>
  );
}
export default function PackageInfo({productPackage}: PackageInfoProps) {
  return (
    <BottomSheetScrollView>
      <Text style={styles.infoModalHeader}>{productPackage.name.ka}</Text>
      <View style={{marginTop: 10, padding: 10}}>
        <Text style={styles.title}>რა შედის?</Text>
        <View style={{marginTop: 10}}>
          {productPackage.availableServices?.map((service, index) => (
            <IncluededServiceInfo service={service.ka} key={index} />
          ))}
          {productPackage.notAvailableServices?.map((service, index) => (
            <NotIncludedServiceInfo service={service?.ka || ''} key={index} />
          ))}
        </View>
      </View>
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  infoModalHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
