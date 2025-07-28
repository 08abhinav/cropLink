import React from "react";
import Nav from "@/customcomponents/Nav";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Signin = () => {
  return (
    <>
      <Nav />
      <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full grid md:grid-cols-2 gap-8 bg-white shadow-xl rounded-2xl overflow-hidden">
          
          {/* Left Side: Welcome Text */}
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

          {/* Right Side: Signin Form */}
          <div className="p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Sign In</h3>

            <form className="space-y-5">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="********" />
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
