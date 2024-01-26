import { useEffect, useState } from "react";
import { JobItem } from "./types";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    async function fetchData() {
      // try
      setIsLoading(true);
      const request = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );
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
