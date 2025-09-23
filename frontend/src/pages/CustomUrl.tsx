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
      <section className="min-h-screen bg-gradient-to-r from-green-50 via-white to-blue-100 px-6 py-16 font-sans">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10 flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-center">Create a Custom URL</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Original URL */}
            <input
              type="url"
              name="original_url"
              placeholder="https://example.com/very/long/link"
              value={form.original_url}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <div className="flex flex-col gap-1">
                <input
                    type="text"
                    name="custom_url"
                    placeholder="Short-url"
                    value={form.custom_url}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <p className="text-gray-500 text-sm">
                    Atleast 6 characters long and must contain at least <span className="font-semibold">2 digits (0-9)</span>, <span className="font-semibold">1 uppercase letter</span>, and <span className="font-semibold">1 lowercase letter</span>.
                </p>
            </div>

            <button
              type="submit"
              disabled={!form.original_url || loading}
              className="relative flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-semibold py-3 rounded-xl text-lg transition shadow-lg disabled:opacity-60"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
              ) : (
                <LinkIcon className="w-5 h-5 mr-2" />
              )}
              Shorten URL
            </button>
          </form>

          {/* Generated Short URL */}
          {shortUrl && (
            <div className="flex items-center justify-between bg-green-100 rounded-xl p-4 mt-4">
              <a href={shortUrl} target="_blank" className="text-green-800 font-medium underline">
                {shortUrl}
              </a>
              <button onClick={handleCopy} className="flex items-center gap-2 text-green-700 font-semibold hover:text-green-900">
                <ClipboardIcon className="w-4 h-4" />
                Copy
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CustomUrlPage;
