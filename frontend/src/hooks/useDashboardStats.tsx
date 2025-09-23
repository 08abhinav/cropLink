import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "@/lib/axios"

export interface UserUrl {
  id: number;
  original_url: string;
  short_url: string;
  clicked: number;
  created_at: string;
}

export function useDashboardStats() {
  const [email, setEmail] = useState("");
  const [uname, setUName] = useState("");

  const [links, setLinks] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  const [lastCreated, setLastCreated] = useState<string>("");

  const [userUrls, setUserUrls] = useState<UserUrl[]>([]);
  const [loadingUrls, setLoadingUrls] = useState<boolean>(true);
  const [loadingStats, setLoadingStats] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("/url/getStats", { withCredentials: true })
      .then((res) => {
        setClicks(res.data.total_clicks ?? res.data.TotalClicks ?? 0);
        setLinks(res.data.total_links ?? res.data.TotalLinks ?? 0);
        setLastCreated(
          res.data.last_created_url ?? res.data.LastCreatedURL ?? ""
        );
      })
      .catch((err) => {
        console.log(err)
        toast.error(err?.response?.data?.message || "Failed to load stats");
      })
      .finally(() => setLoadingStats(false));

    const fetchUrls = async () => {
      setLoadingUrls(true);
      try {
        const res = await axios.get("/url/my-urls", {
          withCredentials: true,
        });
        setUserUrls(res.data.urls || res.data);
      } catch (e) {
        console.error("Failed to fetch user URLs", e);
        setUserUrls([]);
      } finally {
        setLoadingUrls(false);
      }
    };
    fetchUrls();
  }, []);

  return {
    email,
    uname,
    links,
    clicks,
    lastCreated,
    userUrls,
    loadingUrls,
    loadingStats,
  };
}
