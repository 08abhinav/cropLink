import React, { useState } from "react";
import Nav from "@/components/Nav";
import { ClipboardIcon, LinkIcon } from "lucide-react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";

const CustomUrlPage = () => {
  const [form, setForm] = useState({ original_url: "", custom_url: "" });
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShortUrl(null);

    try {
      const res = await axios.post("url/create-customUrl", form);
      setShortUrl(res.data.short_url);
      toast.success("Short URL created successfully!");
    } catch (err: any) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <>
      <Nav />
      <section className="pt-32 pb-16 min-h-screen bg-black px-6 text-gray-200">
        <div className="max-w-3xl mx-auto">

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
              Create a{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
                Custom URL
              </span>
            </h1>
            <p className="text-lg text-gray-400">
              Personalize your short links with your own unique alias.
            </p>
          </div>

          {/* Main Card */}
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* Original URL */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-300 font-medium">Original URL</label>
                <input
                  type="url"
                  name="original_url"
                  placeholder="https://example.com/long/url"
                  value={form.original_url}
                  onChange={handleChange}
                  required
                  className="bg-black/30 border border-white/20 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Custom URL */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-300 font-medium">Custom Alias</label>
                <input
                  type="text"
                  name="custom_url"
                  placeholder="myCustom123"
                  value={form.custom_url}
                  onChange={handleChange}
                  className="bg-black/30 border border-white/20 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <p className="text-gray-400 text-sm leading-5">
                  Must be at least{" "}
                  <span className="font-semibold text-gray-200">6 characters</span> long and
                  contain at least{" "}
                  <span className="font-semibold text-gray-200">2 digits</span>,{" "}
                  <span className="font-semibold text-gray-200">1 uppercase</span>{" "}
                  and <span className="font-semibold text-gray-200">1 lowercase</span>.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!form.original_url || loading}
                className="relative flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 rounded-xl text-lg transition shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                ) : (
                  <LinkIcon className="w-5 h-5 mr-2" />
                )}
                Shorten URL
              </button>
            </form>

            {/* Result */}
            {shortUrl && (
              <div className="mt-8 p-5 flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl">
                <a
                  href={shortUrl}
                  target="_blank"
                  className="text-purple-300 font-medium underline text-lg"
                >
                  {shortUrl}
                </a>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-gray-200 font-medium hover:text-white"
                >
                  <ClipboardIcon className="w-5 h-5" />
                  Copy
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomUrlPage;
