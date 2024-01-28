import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BoomarksContextProvider from "./contexts/BoomarksContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BoomarksContextProvider>
        <App />
      </BoomarksContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
