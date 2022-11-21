import { ScreenType } from '../constants/types';

export interface IScreen {
  name: ScreenType;
  title: string;
}

export interface IAssetPurchase {
  // "p" is for "price"
  // "a" is for "amount"
  // "d" is for "date"
  p: number;
  a: number;
  d: number;
}

export interface IAsset {
  key: string;
  name: string;
  amount: number;
  invested: number;
  p: { [key: number]: IAssetPurchase };
}
