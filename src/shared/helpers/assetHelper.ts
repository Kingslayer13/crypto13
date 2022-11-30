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

export function getNewAsset(key: string, name: string): IAsset {
  return {
    name,
    key: key.toUpperCase(),
    p: {},
  };
}

export function getAmount(asset: IAsset): number {
  return Object.keys(asset.p).reduce((amount, date) => {
    return amount + asset.p[date].a;
  }, 0);
}

export function getInvested(asset: IAsset): number {
  return Object.keys(asset.p).reduce((invested, date) => {
    const purchase = asset.p[date] as IAssetPurchase;
    return invested + purchase.a * purchase.p;
  }, 0);
}

export function getAverageCost(asset: IAsset): string {
  const amount = getAmount(asset);
  const invested = getInvested(asset);
  return (invested / amount).toFixed(4);
}
