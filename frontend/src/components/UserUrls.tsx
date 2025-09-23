import React from "react";
import type { UserUrl } from "@/hooks/useDashboardStats";

interface Props {
  urls: UserUrl[];
  loading: boolean;
}

const UserUrlsList: React.FC<Props> = ({ urls, loading }) => {
  const baseURL =
    import.meta.env.BACKEND_BASE_URL || "http://localhost:8080";

  if (loading) {
    return (
      <div className="text-center py-6 text-gray-400">
        Loading your URLs...
      </div>
    );
  }

  if (!urls.length) {
    return (
      <div className="text-center py-6 text-gray-400">
        You haven&apos;t created any short URLs yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {urls.map((u) => (
        <div
          key={u.id}
          className="bg-black p-5 rounded-xl shadow-lg flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-700 text-white hover:shadow-2xl transition"
        >
          {/* Original URL */}
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 mb-1">Original URL</div>
            <div className="break-words text-gray-200 font-medium text-sm">
              {u.original_url}
            </div>
          </div>

          {/* Short URL */}
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 mb-1">Short URL</div>
            <div className="break-words text-blue-400 font-semibold text-sm">
              <a
                href={`${baseURL}/${u.short_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-300"
                aria-label={`Visit shortened URL ${u.short_url}`}
              >
                {`${baseURL}/${u.short_url}`}
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 flex-wrap text-sm mt-2 sm:mt-0">
            <div>
              <div className="text-gray-500">Clicks</div>
              <div className="font-bold text-white">{u.clicked}</div>
            </div>
            <div>
              <div className="text-gray-500">Created</div>
              <div className="font-medium text-gray-200">
                {new Date(u.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserUrlsList;
