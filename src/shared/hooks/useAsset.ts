import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { IAsset } from '../models/models';
import { getNewAsset, getPurchase } from '../helpers/assetHelper';
import { STORE_PREFIX_ASSET } from '../constants/constants';

export function useAssets() {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const getAssets = async (): Promise<IAsset[]> => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys && keys.length) {
        const assetKeys = keys.filter((k) => k.includes(STORE_PREFIX_ASSET));
        const pairs = await AsyncStorage.multiGet(assetKeys);
        const items = pairs.reduce((array, pair) => {
          const jsonValue = pair[1];
          const parsed = JSON.parse(jsonValue) as IAsset;
          array.push(parsed);
          return array;
        }, [] as IAsset[]);
        setAssets(items);
      }
    } catch (e) {
      setAssets([]);
    }
  };
  useEffect(() => {
    if (!assets || !assets.length) {
      getAssets();
    }
  });

  return { assets, getAssets };
}

export function useAsset(assetKey?: string) {
  const [asset, setAsset] = useState<IAsset>(null);

  useEffect(() => {
    if (assetKey && assetKey !== '') {
      getAssetData();
    }
  }, [assetKey]);

  const getAssetData = async (): Promise<IAsset> => {
    try {
      const storeKey = `${STORE_PREFIX_ASSET}${assetKey}`;
      const jsonValue = await AsyncStorage.getItem(storeKey);
      console.log('got asset 1', jsonValue);
      if (jsonValue !== null) {
        const value = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log('got asset 2', value);
        setAsset(value as IAsset);
      }
    } catch (e) {
      console.log('got error', e);
      setAsset(null);
    }
  };

  const storeAssetData = async (
    key: string,
    name: string,
    amount: number,
    price: number,
    date: number,
    currentPrice: number
  ) => {
    try {
      if (asset) {
        await storeAssetPurchase(key, amount, price, date);
      } else {
        const newAsset: IAsset = getNewAsset(key, name);
        const purchase = getPurchase(amount, price, date);
        newAsset.p[purchase.d] = purchase;
        newAsset.price = currentPrice;
        newAsset.priceUpdateTime = new Date().getTime();
        const storeKey = `${STORE_PREFIX_ASSET}${key}`;
        const jsonValue = JSON.stringify(newAsset);
        await AsyncStorage.setItem(storeKey, jsonValue);
        console.log('saved');
      }
    } catch (e) {
      // saving error
    }
  };

  const storeCurrentPrice = async (key: string, currentPrice: number) => {
    try {
      if (!asset) {
        await getAssetData();
      }
      const storeKey = `${STORE_PREFIX_ASSET}${key}`;
      console.log(storeKey, asset);
      asset.price = currentPrice;
      asset.priceUpdateTime = new Date().getTime();
      const jsonValue = JSON.stringify(asset);
      await AsyncStorage.setItem(storeKey, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const storeAssetPurchase = async (
    key: string,
    amount: number,
    price: number,
    date: number
  ) => {
    try {
      const storeKey = `${STORE_PREFIX_ASSET}${key}`;
      asset.p[date] = getPurchase(amount, price, date);
      const jsonValue = JSON.stringify(asset);
      await AsyncStorage.setItem(storeKey, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  return { asset, storeAssetData, storeCurrentPrice };
}
