import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export interface BookProps {
  book: Book_t;
  isFavorite: boolean;
  handleFavorite: (book: Book_t) => void;
}


export interface AppContextType {
  favorites: Book_t[];
  handleFavorite: (book: Book_t) => void;
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
  languages: Array<{ name: string }>;
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
