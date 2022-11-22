import { IAsset, IAssetPurchase } from '../models/models';

export function getPurchase(
  amount: number,
  price: number,
  date: number
): IAssetPurchase {
  return {
    a: amount,
    p: price,
    d: date,
  };
}

export function getNewAsset(
  key: string,
  name: string,
  amount: number,
  price: number,
  date: number
): IAsset {
  const purchase = getPurchase(amount, price, date);
  return {
    name,
    amount,
    key: key.toUpperCase(),
    invested: amount * price,
    p: {
      [date]: purchase,
    },
  };
}

export function getAverageCost(asset: IAsset): string {
  return (asset.amount / asset.invested).toFixed(4);
}
