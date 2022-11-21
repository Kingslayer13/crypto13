import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAsset } from '../shared/hooks/useAsset';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, SCREENS } from '../shared/constants/screens';
import CustomInput from './CustomInput';
import { COLORS, FONTS } from '../shared/constants/styles';
import CustomButton from './CustomButton';
import {
  getSingleAssetData,
  getSingleAssetPrice,
} from '../shared/helpers/requestHelper';
import Loader from './Loader';

type Props = NativeStackScreenProps<RootStackParamList, 'ADD_ASSET'>;

export default function AddAsset({ navigation }: Props) {
  const inputRef = useRef();
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [assetKey, setAssetKey] = useState<string>(null);
  const [assetName, setAssetName] = useState<string>(null);
  const [amount, setAmount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [currentPrice, setCurrentPrice] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { current, storeAssetData } = useAsset(null);

  const onDateChange = (event, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShowPicker(false);
    setDate(currentDate);
    inputRef?.current?.blur();
  };

  const isValid = () => {
    const validForm = Boolean(amount !== undefined && amount > 0 && assetKey);
    const validResponse = Boolean(!error && !loading && assetName);
    return validForm && validResponse;
  };

  const onSubmitKey = async () => {
    setLoading(true);
    const coinData = await getSingleAssetData(assetKey);
    setLoading(false);
    if (!coinData.success) {
      setError(coinData.error.message);
    } else {
      setError(undefined);
      setAssetName(coinData.data.CoinName);
      const coinPrice = await getSingleAssetPrice(assetKey);
      const cPriceNum = +coinPrice.data;
      if (!isNaN(cPriceNum)) {
        setCurrentPrice(cPriceNum);
      }
    }
  };

  const onSubmit = async () => {
    if (!isValid()) {
      return;
    }
    await storeAssetData(assetKey, assetName, amount, price, date.getTime());
    navigation.navigate(SCREENS.DASHBOARD.name);
  };

  return (
    <View style={styles.container}>
      {loading && <Loader label="Fetching API..." />}
      <CustomInput
        label="Asset Key"
        placeholder="-"
        value={assetKey}
        onChange={(e) => setAssetKey(e.nativeEvent.text)}
        onSubmitEditing={() => onSubmitKey()}
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
      {error && <Text style={styles.error}>{error}</Text>}
      {assetName && (
        <View style={styles.info}>
          <Text style={styles.infoLabels}>Name: {assetName}</Text>
          <Text style={styles.infoLabels}>Price: {currentPrice}</Text>
        </View>
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
    position: 'relative',
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
  error: {
    color: 'red',
    fontFamily: FONTS.IBM_Plex_MediumItalic,
  },
  info: {
    display: 'flex',
  },
  infoLabels: {
    marginTop: 10,
    color: COLORS.TEXT_DEFAULT,
    fontFamily: FONTS.IBM_Plex_MediumItalic,
  },
});
