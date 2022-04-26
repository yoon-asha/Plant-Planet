import React, { createContext } from 'react';

import ExchangeStore from './ExchangeStore';

export const ExchangeContext = createContext();

const GlobalProvider = ({ children }) => {
  return (
    <ExchangeContext.Provider value={ExchangeStore}>
      {children}
    </ExchangeContext.Provider>
  );
};

export default GlobalProvider;
