import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BoomarksContextProvider";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkIds, handleToggleBookmark } = useContext(BookmarksContext);

  return (
    <button onClick={() => handleToggleBookmark(id)} className="bookmark-btn">
      <BookmarkFilledIcon
        className={`
      ${bookmarkIds.includes(id) ? "filled" : ""}
      `}
      />
    </button>
  );
}
