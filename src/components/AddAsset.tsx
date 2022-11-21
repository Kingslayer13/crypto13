import React, { useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAsset } from '../shared/hooks/useAsset';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, SCREENS } from '../shared/constants/screens';
import CustomInput from './CustomInput';
import { COLORS } from '../shared/constants/styles';
import CustomButton from './CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'ADD_ASSET'>;

export default function AddAsset({ navigation }: Props) {
  const inputRef = useRef();
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [assetKey, setAssetKey] = useState<string>(null);
  const [assetName, setAssetName] = useState<string>(null);
  const [amount, setAmount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const { current, storeAssetData } = useAsset(null);

  const onDateChange = (event, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShowPicker(false);
    setDate(currentDate);
    inputRef?.current?.blur();
  };

  const onAssetKeyChange = (event) => {
    const key = event.nativeEvent.text;
    setAssetKey(key);
    setAssetName(key && key !== '' ? `${key} name` : undefined);
  };

  const isValid = () => Boolean(amount !== undefined && amount > 0 && assetKey);

  const onSubmit = async () => {
    if (!isValid()) {
      return;
    }
    await storeAssetData(assetKey, assetName, amount, price, date.getTime());
    navigation.navigate(SCREENS.DASHBOARD.name);
  };

  return (
    <View style={styles.container}>
      <CustomInput
        label="Asset Key"
        placeholder="-"
        value={assetKey}
        onChange={(e) => onAssetKeyChange(e)}
      />
      <CustomInput
        variant="outlined"
        label="Asset Name"
        placeholder="-"
        value={assetName}
        editable={false}
      />
      <CustomInput
        variant="outlined"
        label="Amount"
        placeholder="-"
        keyboardType="numeric"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.nativeEvent.text))}
      />
      <CustomInput
        variant="outlined"
        label="Buy price"
        placeholder="-"
        keyboardType="numeric"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.nativeEvent.text))}
      />
      <CustomInput
        variant="outlined"
        label="Date"
        value={date.toDateString()}
        innerRef={inputRef}
        showSoftInputOnFocus={false}
        onPressIn={() => setShowPicker(true)}
      />
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onDateChange}
        />
      )}
      <CustomButton
        title="ADD ASSET"
        onPress={() => onSubmit()}
        disabled={!isValid()}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: COLORS.BG_DEFAULT,
  },
  button: {
    marginTop: 'auto',
  },
});
