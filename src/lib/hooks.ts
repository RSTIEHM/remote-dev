import { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

type JobItemApiResponse = {
  public: true;
  jobItem: JobItemExpanded;
};

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const request = await fetch(`${BASE_API_URL}?search=${searchText}`);
  const data = await request.json();
  return data;
};

// =========================================================

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const jobItems = data?.jobItems;
  const isLoading = isInitialLoading;
  return { jobItems, isLoading };
}
// ===========================================

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const jobItem = data?.jobItem;
  const isLoading = isInitialLoading;
  return { jobItem, isLoading } as const;
}

export function useActiveID() {
  const [activeID, setActiveID] = useState<number | null>(null);
  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveID(id);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return activeID;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [deBouncedValue, setdeBouncedValue] = useState(value);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setdeBouncedValue(value);
    }, delay);
    return () => clearTimeout(timerID);
  }, [value, delay]);
  return deBouncedValue;
}
