import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppContextProvider({ children, value }) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}

//elo zelo
