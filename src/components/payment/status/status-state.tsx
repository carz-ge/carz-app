import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import GoBack from '../../go-back';
import ManagerWaitingStatus from './manager-waiting-status';
import SuccessStatus from './success-status';
import FailedStatus from './failed-status';

interface StatusStateProps {
  successPayment: boolean;
}

export default function StatusState({successPayment}: StatusStateProps) {
  const [successAnimationFinished, setSuccessAnimationFinished] =
    useState(false);
  const onSuccessAnimationFinish = () => {
    setSuccessAnimationFinished(true);
  };

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      <GoBack />
      <SafeAreaView style={{marginTop: 40, alignItems: 'center'}}>
        {!successPayment && <FailedStatus />}
        {successPayment && !successAnimationFinished && (
          <SuccessStatus onAnimationFinished={onSuccessAnimationFinish} />
        )}
        {successPayment && successAnimationFinished && <ManagerWaitingStatus />}
      </SafeAreaView>
    </SafeAreaView>
  );
}
