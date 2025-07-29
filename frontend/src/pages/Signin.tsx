import React, { useState } from "react";
import Nav from "@/customcomponents/Nav";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import Loader from "@/customcomponents/Loader";
import { useAuth } from "@/context/AuthContext";

const Signin = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const[loading, setLoading] = useState(false);
  const[form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async(e: React.FormEvent) =>{
    e.preventDefault()
    try {
      await axios.post("/user/signin", form,{
        withCredentials: true,
      });

      toast.success("successfully signed in")
      setIsAuthenticated(true)
      setLoading(true);
      setTimeout(()=>{
        navigate("/dashboard")
      },1500)

    } catch (err : any) {
      toast.error(err.message)
    }
  }

  return (
    <>
      <Nav />
      {loading && <Loader/>}
      <section className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-green-100 flex items-center justify-center px-4 py-12 font-serif">
        <div className="max-w-3xl w-full grid md:grid-cols-2 gap-8 bg-white shadow-xl rounded-2xl overflow-hidden">
          
          <div className="bg-blue-600 text-white p-10 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-lg mb-6">
              Sign in to manage and track your links with CropLink.
            </p>
            <p className="text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="underline hover:text-blue-200">
                Register
              </Link>
            </p>
          </div>

          <div className="p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Sign In</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" placeholder="you@example.com"
                value={form.email}
                onChange={handleChange} />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input name="password" id="password" type="password" placeholder="********"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password" />
              </div>

              <Button type="submit" className="w-full mt-4">
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
