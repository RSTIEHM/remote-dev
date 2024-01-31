import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BoomarksContextProvider from "./contexts/BoomarksContextProvider.tsx";
import SearchTextContextProvider from "./contexts/SearchTextContextProvider.tsx";
import JobItemsContextProvider from "./contexts/JobItemsContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchTextContextProvider>
        <BoomarksContextProvider>
          <JobItemsContextProvider>
            <App />
          </JobItemsContextProvider>
        </BoomarksContextProvider>
      </SearchTextContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
