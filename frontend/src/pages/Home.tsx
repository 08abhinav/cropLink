import { useAuth } from "@clerk/clerk-react";
import Nav from "@/components/Nav";
import Dashboard from "./DashBoard";
import { Link } from "react-router-dom";
import { Link as LinkIcon, BarChart3, ShieldCheck } from "lucide-react";

const Home = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white flex flex-col relative overflow-hidden">
      <Nav />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10 py-22">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          CropLink
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
          Shorten your links, manage them with ease, and track insights — all in one
          place. <span className="text-white font-semibold">Simple. Fast. Reliable.</span>
        </p>
        <Link
          to="https://emerging-bass-86.accounts.dev"
          className="px-8 py-3 bg-white text-black rounded-2xl font-semibold text-lg shadow-lg hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </main>

      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
        <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg">
          <LinkIcon className="w-10 h-10 mx-auto mb-4 text-white" />
          <h3 className="text-xl font-bold mb-2">Generate Short URLs</h3>
          <p className="text-gray-400">
            Instantly create clean, shortened links that are fast and easy to share across any platform.
          </p>
        </div>
        <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg">
          <BarChart3 className="w-10 h-10 mx-auto mb-4 text-white" />
          <h3 className="text-xl font-bold mb-2">Generate Custom URLs</h3>
          <p className="text-gray-400">
            Personalize your links with custom slugs or branded domains for a professional touch.
          </p>
        </div>
        <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg">
          <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-white" />
          <h3 className="text-xl font-bold mb-2">Secure & Track</h3>
          <p className="text-gray-400">
            Built with modern security and scalability in mind, ensuring safe links.
          </p>
        </div>
      </section>

      <footer className="py-6 text-center text-gray-500 text-sm border-t border-white/10">
        © {new Date().getFullYear()} CropLink. All rights reserved.
      </footer>

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/20 blur-[200px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 blur-[150px] rounded-full" />
    </div>
  );
};

export default Home;
