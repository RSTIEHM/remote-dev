import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

// TYPE CONTEXT ====================================
type SearchTextContext = {
  searchText: string;
  deBouncedValue: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

// CREATE CONTEXT =============================
export const SearchTextContext = createContext<SearchTextContext | null>(null);

// PROVIDER ===============================
export default function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");
  const deBouncedValue = useDebounce(searchText, 300);
  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };
  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        deBouncedValue,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
