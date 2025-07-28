import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="w-full bg-black text-white font-serif">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
       <div className="flex items-center space-x-3">
          <img src="/url.png" alt="CropLink" className="h-10 w-auto" />
          <Link to="/" className="text-3xl font-bold text-blue-500">
            CropLink
          </Link>
        </div>
        <div className="space-x-4">
          <Link to="/register" className="text-gray-300 hover:text-white">
            Register
          </Link>
          <Link to="/signin" className="text-gray-300 hover:text-white">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav