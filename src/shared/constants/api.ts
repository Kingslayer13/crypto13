export const API = {
  COIN_DATA: (fsym: string) =>
    `min-api.cryptocompare.com/data/all/coinlist?fsym=${fsym}`,
  COIN_PRICE: (fsym: string, tsyms: string) =>
    `min-api.cryptocompare.com/data/price?fsym=${fsym}&tsyms=${tsyms}`,
  MULTI_PRICE: (fsyms: string[], tsyms: string) =>
    `min-api.cryptocompare.com/data/pricemulti?fsyms=${fsyms.join(
      ','
    )}&tsyms=${tsyms}`,
};

export const CC_RESPONSE_STATUSES = {
  ERROR: 'Error',
};

export const CC_RESPONSE_MESSAGES = {
  NO_DATA: '"There is no data for the symbol',
};
