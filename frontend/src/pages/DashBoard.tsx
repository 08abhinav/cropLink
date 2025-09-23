import Nav from "@/components/Nav";
import UserUrlsList from "@/components/UserUrls";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
  const now = new Date();
  const { user } = useUser();
  const { links, clicks, lastCreated, userUrls, loadingUrls, loadingStats } =
    useDashboardStats();

  return (
    <>
      <Nav />
      <section className="pt-32 pb-16 min-h-screen bg-black px-6 text-gray-200">
        <div className="max-w-7xl mx-auto">
          {/* Welcome */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
                {user?.fullName ||
                  user?.username ||
                  user?.primaryEmailAddress?.emailAddress ||
                  "User"}
              </span>{" "}
              👋
            </h1>

            <p className="text-lg text-gray-400">
              Manage your links and track your activity at a glance.
            </p>
          </div>

          {/* Stats Section with Glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-lg font-semibold text-gray-300">🔗 Total Links</h3>
              <p className="text-3xl font-bold text-white mt-2">
                {loadingStats ? "…" : links || 0}
              </p>
              <p className="text-sm text-gray-400 mt-1">You’ve created</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-lg font-semibold text-gray-300">📈 Clicks Tracked</h3>
              <p className="text-3xl font-bold text-white mt-2">
                {loadingStats ? "…" : clicks || 0}
              </p>
              <p className="text-sm text-gray-400 mt-1">Your links received</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-lg font-semibold text-gray-300">🗓️ Last Activity</h3>
              <p className="text-lg font-medium text-white mt-2">
                {loadingStats
                  ? "…"
                  : lastCreated
                  ? new Date(lastCreated).toDateString()
                  : now.toDateString()}
              </p>
              <p className="text-sm text-gray-400 mt-1">Last created</p>
            </div>
          </div>

          {/* User URLs */}
          <div className="mt-16">
            <h2 className="text-3xl font-extrabold text-white mb-6">
              Your Created URLs
            </h2>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-md">
              {/* Keep your <UserUrlsList /> glass-styled */}
              <p className="text-gray-400 text-sm mb-4">
                All your shortened links in one place.
              </p>
              <div className="divide-y divide-white/10">
                <UserUrlsList urls={userUrls} loading={loadingUrls} />
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-16 text-center">
            <p className="text-md text-gray-400">
              Logged in as:{" "}
              <span className="text-white font-medium">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
