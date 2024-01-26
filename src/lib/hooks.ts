import { useEffect, useState } from "react";
import { JobItem } from "./types";
import { BASE_API_URL } from "./constants";
export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    async function fetchData() {
      // try
      setIsLoading(true);
      const request = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await request.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    }
    fetchData();
  }, [searchText]);
  return [jobItemsSliced, isLoading] as const;
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

export function useJobItem(id: number | null) {
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (!id) return;
    async function getData() {
      const response = await fetch(`${BASE_API_URL}/${id}`);
      const data = await response.json();
      setSelectedJob(data.jobItem);
    }
    getData();
  }, [id]);
  return selectedJob;
}
