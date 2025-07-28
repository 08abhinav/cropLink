import React, { useState } from "react";
import Nav from "@/customcomponents/Nav";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "@/customcomponents/Loader";
import axios from "@/lib/axios";

const Signup = () => {
  const navigate = useNavigate()
  const[loading, setLoading] = useState(false)
  const[form, setForm] = useState({
    name:"",
    email:"",
    password:"",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      await axios.post("/user/register", form);
      toast.success("Successfully registered")
      setLoading(true)
      setTimeout(() =>{
        navigate("/signin");
      }, 1500);
    }catch(err: any){
      console.error("Registration error:", err.response?.data || err.message);
    }
  }

  return (
    <>
      <Nav />
      {loading && <Loader />}
      <section className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-green-100 flex items-center justify-center px-4 py-12 font-serif">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 shadow-xl rounded-2xl bg-white overflow-hidden">
          <div className="bg-blue-600 text-white p-10 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4">Create Your Account</h2>
            <p className="text-lg mb-6">
              Join CropLink today and simplify how you manage your URLs.
            </p>
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/signin" className="underline hover:text-blue-200">
                Sign In
              </Link>
            </p>
          </div>
          {/* Right Panel with Form */}
          <div className="p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Sign Up</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input name="name" id="name" placeholder="John Doe" 
                value={form.name}
                onChange={handleChange} />
              </div>

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
                onChange={handleChange} />
              </div>

              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>

            <p className="mt-6 text-sm text-gray-500 text-center">
              By signing up, you agree to our{" "}
              <span className="underline">Terms</span> and{" "}
              <span className="underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
