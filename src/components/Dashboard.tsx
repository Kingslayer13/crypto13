import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, View, Text } from 'react-native';
import { RootStackParamList, SCREENS } from '../shared/constants/screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAssets } from '../shared/hooks/useAsset';
import AssetListItem from './AssetListItem';
import { IAsset } from '../shared/models/models';
import { COLORS, FONTS } from '../shared/constants/styles';
import CustomButton from './CustomButton';
import { getAssetsPrice } from '../shared/helpers/requestHelper';
import asyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'DASHBOARD'>;

export default function Dashboard({ navigation }: Props) {
  const { assets, getAssets } = useAssets();
  const [assetPrices, setAssetPrices] = useState<{ [key: string]: number }>({});
  const renderItem = ({ item }) => {
    const currentPrice = assetPrices[item.key];
    return <AssetListItem asset={item}></AssetListItem>;
  };

  useFocusEffect(
    React.useCallback(() => {
      getAssets();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const onResetButton = async () => {
    console.log('clear storage');
    await asyncStorage.clear();
    navigation.navigate(SCREENS.DASHBOARD.name);
  };

  const onRefresh = async () => {
    console.log('on refresh');
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          <AntDesign
            name="closecircle"
            size={24}
            style={styles.headerButton}
            color="red"
            onPress={() => onResetButton()}
          />
          <AntDesign
            style={styles.headerButton}
            name="sync"
            size={24}
            color={COLORS.WHITE}
            onPress={() => onRefresh()}
          />
        </View>
      ),
    });
    // const getAssetPrices = async () => {
    //   const symbols = assets.map((a) => a.key);
    //   const prices = await getAssetsPrice(symbols);
    //   if (prices.success) {
    //     setAssetPrices(prices.data || {});
    //   }
    // };
    // if (assets.length) {
    //   getAssetPrices();
    // }
  }, [navigation]);
  return (
    <View style={styles.screen}>
      {assets && assets.length ? (
        <FlatList
          data={assets}
          renderItem={renderItem}
          keyExtractor={(item: IAsset) => item.key}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyLabel}>No assets</Text>
        </View>
      )}
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
  empty: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyLabel: {
    fontFamily: FONTS.IBM_Plex_Bold,
    fontSize: 24,
    color: COLORS.WHITE,
  },
  headerButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerButton: {
    marginHorizontal: 5,
  },
});
