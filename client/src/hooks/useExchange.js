import { useContext } from 'react';

import { ExchangeContext } from '../store';

const useExchange = () => {
  const exchangeStore = useContext(ExchangeContext);
  return exchangeStore;
};

export default useExchange;
