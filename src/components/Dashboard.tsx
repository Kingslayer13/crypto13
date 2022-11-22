import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { RootStackParamList, SCREENS } from '../shared/constants/screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAssets } from '../shared/hooks/useAsset';
import AssetListItem from './AssetListItem';
import { IAsset } from '../shared/models/models';
import { COLORS } from '../shared/constants/styles';
import CustomButton from './CustomButton';
import { getAssetsPrice } from '../shared/helpers/requestHelper';

type Props = NativeStackScreenProps<RootStackParamList, 'DASHBOARD'>;

export default function Dashboard({ navigation }: Props) {
  const assets = useAssets();
  const [assetPrices, setAssetPrices] = useState<{ [key: string]: number }>({});
  const renderItem = ({ item }) => {
    const currentPrice = assetPrices[item.key];
    return (
      <AssetListItem asset={item} currentPrice={currentPrice}></AssetListItem>
    );
  };

  useEffect(() => {
    const getAssetPrices = async () => {
      const symbols = assets.map((a) => a.key);
      const prices = await getAssetsPrice(symbols);
      if (prices.success) {
        setAssetPrices(prices.data || {});
      }
    };
    if (assets.length) {
      getAssetPrices();
    }
  });
  return (
    <View style={styles.screen}>
      <FlatList
        data={assets}
        renderItem={renderItem}
        keyExtractor={(item: IAsset) => item.key}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          title="+"
          style={styles.addButton}
          color={COLORS.TEXT_DEFAULT}
          onPress={() => navigation.navigate(SCREENS.ADD_ASSET.name)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.BG_DEFAULT,
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 40,
    height: 100,
    width: 50,
    margin: 0,
    padding: 0,
    borderRadius: 0,
  },
  addButton: {
    width: '100%',
    height: '100%',
  },
  list: {
    width: '100%',
  },
  listItem: {},
});
