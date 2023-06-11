import React from 'react';
import TechPassportQrScanner from '../../components/camera/tech-passport-qr-scanner';
import {CarStackScreenProps} from '../../navigation/types';

export default function TechPassportQrScannScreen(
  prop: CarStackScreenProps<'techCardQrScan'>,
) {
  return <TechPassportQrScanner />;
}
