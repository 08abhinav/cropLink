import React, { useState } from "react";
import Nav from "@/components/Nav";
import { ClipboardIcon, LinkIcon, ArrowRightIcon } from "lucide-react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UrlCreation = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({original_url: ""})
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("url/createUrl", form)
      setLoading(true);
      toast.success("URL shortened!");
      navigate("/dashboard")
      setTimeout(() => {
        setLoading(false);
      }, 1000);

    } catch (err:any) {
      toast.error(err.message)
    }finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <section className="py-35 min-h-screen bg-gradient-to-r from-green-50 via-white to-blue-100 px-6 font-serif">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          
          {/* Left Promo / Stats Panel */}
          <div className="flex flex-col justify-center gap-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                Crop your links. Grow your reach.
              </h2>
              <p className="text-gray-600 mb-4">
                Turn long unwieldy URLs into short, trackable links that your audience can trust. Instant shortening, click analytics, and user ownership — all in one place.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <LinkIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-700">Shorten Instantly</div>
                    <div className="text-gray-500 text-xs">Generate compact links in a single click.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <ClipboardIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-700">Copy Easily</div>
                    <div className="text-gray-500 text-xs">One-tap copy for sharing anywhere.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <ArrowRightIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-purple-700">Smart Redirects</div>
                    <div className="text-gray-500 text-xs">Users always land where they should.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <div className="w-5 h-5 text-yellow-600 font-bold">📊</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-yellow-700">Track Clicks</div>
                    <div className="text-gray-500 text-xs">See how your links perform over time.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="relative bg-white/95 shadow-2xl rounded-2xl p-10 backdrop-blur-md border border-gray-200 flex flex-col">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-green-400 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
              🔗 Crop Your Link
            </div>
            <div className="mt-4 flex flex-col gap-4">
              <p className="text-gray-700 text-lg font-medium text-center">
                Paste a long URL below and get a clean short link you can share anywhere.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="url"
                    name="original_url"
                    placeholder="http://example.com/very/long/link"
                    value={form.original_url}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-5 py-3 pr-32 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    {form.original_url ? "Ready" : "Enter URL"}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={!form.original_url || loading}
                  className="relative flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 
                  text-white font-semibold py-3 rounded-xl text-lg transition shadow-lg disabled:opacity-60"
                >
                  {loading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                  ) : (
                    <LinkIcon className="w-5 h-5 mr-2" />
                  )}
                  Shorten URL 
                </button>
              </form>
            </div>

            {/* subtle footer */}
            <div className="mt-auto text-center text-xs text-gray-400 pt-6">
              Generated links are tracked and you can view them on your dashboard.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UrlCreation;
