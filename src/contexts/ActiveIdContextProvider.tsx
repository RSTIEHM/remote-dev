import { createContext } from "react";
import { useActiveID } from "../lib/hooks";

// TYPE CONTEXT ====================================
type ActiveIdContext = {
  activeId: number | null;
};

// CREATE CONTEXT =============================
export const ActiveIdContext = createContext<ActiveIdContext | null>(null);

// PROVIDER ===============================
export default function BoomarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeId = useActiveID();
  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
