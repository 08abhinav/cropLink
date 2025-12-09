import React, { useState } from "react";
import Nav from "@/components/Nav";
import { LinkIcon } from "lucide-react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UrlCreation = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ original_url: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("url/createUrl", form);
      toast.success("URL shortened!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />

      <section className="pt-32 pb-16 min-h-screen bg-black px-6 text-gray-200">
        <div className="max-w-5xl mx-auto">

          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
              Crop Your Links ✂️
            </h1>
            <p className="text-lg text-gray-400">
              Turn long URLs into clean, powerful short links instantly.
            </p>
          </div>

          {/* Form Card — Matching Dashboard style (glass) */}
          <div className="p-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              Enter a URL to Shorten
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* URL Input */}
              <div className="relative">
                <input
                  type="url"
                  name="original_url"
                  placeholder="https://example.com/very/long/link"
                  value={form.original_url}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-black/20 border border-white/20 px-5 py-4 text-base 
                             text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 
                             transition placeholder-gray-500"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  {form.original_url ? "Ready" : "Enter URL"}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!form.original_url || loading}
                className="flex items-center justify-center bg-gradient-to-r from-purple-500 
                           via-pink-500 to-red-500 hover:from-purple-600 hover:to-red-600 
                           text-white font-semibold py-3 rounded-xl text-lg transition shadow-lg 
                           disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                ) : (
                  <LinkIcon className="w-5 h-5 mr-2" />
                )}
                Shorten URL
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Your shortened links will appear in your dashboard.
            </p>

            {/* Custom URL Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate("/customCreation")}
                className="flex items-center justify-center bg-gradient-to-r from-purple-500 
               via-pink-500 to-red-500 hover:from-purple-600 hover:to-red-600 
               text-white font-semibold py-3 px-6 rounded-xl text-lg transition 
               shadow-lg cursor-pointer"
              >
                Create Custom URL
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UrlCreation;
