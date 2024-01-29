import { createContext, useContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";

type BookmarksContext = {
  bookmarkIds: number[];
  handleToggleBookmark: (id: number) => void;
};
export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BoomarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkIds, setBookmarkIds] = useLocalStorage<number[]>(
    "bookmarkIds",
    []
  );

  const { jobItems: bookmarkedJobItems, isLoading } = useJobItems(bookmarkIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
