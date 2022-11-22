import {
  API,
  CC_RESPONSE_MESSAGES,
  CC_RESPONSE_STATUSES,
} from '../constants/api';
import { ICcCoinData, ICcCoinDataResponse, IResponse } from '../models/models';
import { MESSAGES } from '../constants/constants';

function getHeaders() {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Apikey: process.env.CC_API,
  };
}

async function get<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(),
  });
  return (await response.json()) as T;
}

export async function getSingleAssetData(
  symbol: string
): Promise<IResponse<ICcCoinData>> {
  const fsym = symbol.toUpperCase();
  const url = `https://${API.COIN_DATA(fsym)}`;
  const respCc = await get<ICcCoinDataResponse>(url);
  const respUser: IResponse<ICcCoinData> = {
    data: null,
    success: true,
  };
  if (respCc.Response === CC_RESPONSE_STATUSES.ERROR) {
    respUser.success = false;
    respUser.error = {
      message: respCc.Message,
    };
    if (respCc.Message.includes(CC_RESPONSE_MESSAGES.NO_DATA)) {
      respUser.error = {
        message: MESSAGES.NO_DATA,
      };
    }
    return respUser;
  }
  respUser.data = respCc.Data[fsym];
  return respUser;
}

export async function getAssetPrice(
  symbol: string
): Promise<IResponse<number>> {
  const fsym = symbol.toUpperCase();
  const tsyms = 'USD';
  const url = `https://${API.COIN_PRICE(fsym, tsyms)}`;
  const respCc = await get<any>(url);
  const respUser: IResponse<number> = {
    data: null,
    success: true,
  };
  if (respCc.Response && respCc.Response === CC_RESPONSE_STATUSES.ERROR) {
    respUser.success = false;
    respUser.error = {
      message: respCc.Message,
    };
    return respUser;
  }
  respUser.data = +respCc[tsyms];
  return respUser;
}

export async function getAssetsPrice(
  symbols: string[]
): Promise<IResponse<{ [key: string]: number }>> {
  const fsyms = symbols.map((s) => s.toUpperCase());
  const tsyms = 'USD';
  const url = `https://${API.MULTI_PRICE(fsyms, tsyms)}`;
  const respCc = await get<any>(url);
  const respUser: IResponse<{ [key: string]: number }> = {
    data: null,
    success: true,
  };
  if (respCc.Response && respCc.Response === CC_RESPONSE_STATUSES.ERROR) {
    respUser.success = false;
    respUser.error = {
      message: respCc.Message,
    };
    return respUser;
  }
  respUser.data = fsyms.reduce((data, symbol) => {
    const symbolData = respCc[symbol];
    if (symbolData) {
      data[symbol] = +symbolData[tsyms];
    }
    return data;
  }, {});
  return respUser;
}
