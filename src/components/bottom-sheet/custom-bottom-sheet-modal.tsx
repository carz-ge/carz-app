import React, {useCallback, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop';
import CustomBackdrop from './customBackdrop';
import {BottomSheetProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/types';
import {SharedValue} from 'react-native-reanimated';
import {Pressable} from 'react-native';

interface CustomBottomSheetModalProps extends BottomSheetProps {
  snapPointIndex: number;
  snapPoints: Array<string | number> | SharedValue<Array<string | number>>;
  children: (() => React.ReactElement) | React.ReactNode[] | React.ReactNode;
  openerComponent:
    | (() => React.ReactElement)
    | React.ReactNode[]
    | React.ReactNode;
}

// TODO this is not completed yet
export default function CustomBottomSheetModal(
  props: CustomBottomSheetModalProps,
) {
  const modalRef = useRef<BottomSheetModal>(null);
  function handleOpen() {
    modalRef.current?.present();
  }

  const handleOnClose = useCallback(() => {
    modalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <CustomBackdrop onPress={handleOnClose} {...props} />
    ),
    [handleOnClose],
  );
  return (
    <>
      <Pressable onPress={handleOpen} />
      <BottomSheetModal
        ref={modalRef}
        index={props.snapPointIndex}
        enablePanDownToClose={true}
        snapPoints={props.snapPoints}
        backdropComponent={renderBackdrop}>
        {props.children}
      </BottomSheetModal>
    </>
  );
}
