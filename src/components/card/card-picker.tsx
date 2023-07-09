import {Card} from '../../graphql/operations';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';
import React from 'react';
import {CardBackground} from './credit-card-icons';
import {
  CardIssuerToIconMap,
  MasterCardIcon,
} from '../../assets/icons/card/mastercard-icon';

interface CardPickeProps {
  cardId: string | null;
  setCardId: (cardType: string | null) => void;
  cards: Card[];
}

export default function CardPicker({cardId, setCardId, cards}: CardPickeProps) {
  if (cards.length === 0) {
    return null;
  }
  return (
    <View>
      <Text style={styles.inputHeader}>ბარათები</Text>
      <FlatList
        data={cards}
        renderItem={({item, index}) => {
          const CardIssuerToIconMapElement =
            CardIssuerToIconMap[item.cardType] || MasterCardIcon;
          return (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => {
                if (item.id === cardId) {
                  setCardId(null);
                  return;
                }
                setCardId(item.id);
              }}>
              <CardBackground>
                <View style={{padding: 10}}>
                  <CardIssuerToIconMapElement size={30} />
                  <Text style={styles.nameText}>{item.pan}</Text>
                  <Text style={styles.nameText}>{item.expirationDate}</Text>
                </View>
              </CardBackground>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  nameText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 20,
    borderRadius: 4,
  },
  cardTypeOptionActive: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  inputHeader: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonSelect: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonSelectText: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginRight: 10,
    color: '#000',
  },
});
