import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { UserUrl } from "@/hooks/useDashboardStats";
import axios from "@/lib/axios";

interface Props {
  urls: UserUrl[];
  loading: boolean;
}

const UserUrlsList: React.FC<Props> = ({ urls, loading }) => {
  const baseURL =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8080";

  const [allUrls, setAllUrls] = useState<UserUrl[]>(urls);

  useEffect(() => {
    setAllUrls(urls);
  }, [urls]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Delete this short URL?");
    if (!confirmDelete) {
      toast.info("Delete cancelled");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `/api/deleteUrl/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllUrls((prev) => prev.filter((url) => url.id !== id));

      toast.success("Short URL deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete short URL");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-6 text-gray-400">
        Loading your URLs...
      </div>
    );
  }

  if (!allUrls.length) {
    return (
      <div className="text-center py-6 text-gray-400">
        You haven&apos;t created any short URLs yet.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {allUrls.map((u) => (

        <div
          key={u.id}
          className="bg-black p-5 rounded-xl shadow-lg grid grid-cols-1 lg:grid-cols-[2.3fr_2fr_1fr_1fr_0.8fr] gap-6 border border-gray-700 text-white hover:shadow-2xl transition w-full overflow-hidden items-start"
        >
          {/* Original URL */}
          <div className="min-w-0">
            <div className="text-xs text-gray-500 mb-1">Original URL</div>
            <div className="break-words text-gray-200 font-medium text-sm">
              {u.original_url}
            </div>
          </div>

          {/* Short URL */}
          <div className="min-w-0">
            <div className="text-xs text-gray-500 mb-1">Short URL</div>
            <a
              href={`${baseURL}/${u.short_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="break-words text-blue-400 font-semibold text-sm underline hover:text-blue-300"
            >
              {`${baseURL}/${u.short_url}`}
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-6 flex-wrap text-sm">
            <div>
              <div className="text-gray-500 text-sm">Clicks</div>
              <div className="font-bold text-white">{u.clicked}</div>
            </div>

            <div>
              <div className="text-gray-500 text-sm">Created</div>
              <div className="font-medium text-gray-200">
                {new Date(u.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* status */}
          <div>
            <div className="text-sm text-gray-500">Status</div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  u.is_active
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
              {u.is_active ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Delete */}
          <div className="flex lg:justify-end">
            <button
              onClick={() => handleDelete(u.id)}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-sm font-medium text-white cursor-pointer whitespace-nowrap"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserUrlsList;