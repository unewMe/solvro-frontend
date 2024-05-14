import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Book } from "./Book";

export interface AppContextType {
  favorites: never[];
  handleFavorite?: (book: Book) => void;
}

const AppContext = createContext<AppContextType>({
  favorites: [], // Przykładowa domyślna wartość, dostosuj do swoich potrzeb
  handleFavorite: () => {},
});

export interface Book_t {
  id: string;
  title: string;
  authors: Array<{ name: string }>;
  formats: { "text/html": string}
  htmlLink: string;
}

interface AppContextProviderProps {
  children: ReactNode;
  value: AppContextType;
}

export interface JsonResponse {
  results: Book_t[];
  previous: string;
  next: string;
}

export function AppContextProvider({
  children,
  value,
}: AppContextProviderProps) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}

//elo zelo
