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
  price?: number;
  priceUpdateTime?: number;
  p: { [key: number]: IAssetPurchase };
}

export interface IResponse<T> {
  data: T;
  success: boolean;
  error?: {
    message: string;
    code?: number;
  };
}

export interface ICcCoinData {
  Id: string;
  Url: string;
  ImageUrl: string;
  ContentCreatedOn: number;
  Name: string;
  Symbol: string;
  CoinName: string;
  FullName: string;
  Description: string;
  AssetTokenStatus: string;
  Algorithm: string;
  ProofType: string;
  SortOrder: string;
  TotalCoinsMined: number;
  CirculatingSupply: number;
  BlockNumber: number;
  NetHashesPerSecond: number;
  BlockReward: number;
  BlockTime: number;
  AssetLaunchDate: string;
  AssetWhitepaperUrl: string;
  AssetWebsiteUrl: string;
  MaxSupply: number;
  MktCapPenalty: number;
  IsUsedInDefi: number;
  IsUsedInNft: number;
  PlatformType: string;
  DecimalPoints: number;
  Difficulty: number;
}

export interface ICcCoinDataResponse {
  Response: string;
  Message: string;
  Data: { [key: string]: ICcCoinData };
}
