import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import Nav from '@/customcomponents/Nav';

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [uname, setUName] = useState('');

  useEffect(() => {
    axios
      .get('/user/me', { withCredentials: true })
      .then((res) => {
        setEmail(res.data.email);
        setUName(res.data.name);
      })
      .catch((err) => console.log('Not logged in', err));
  }, []);

  return (
    <>
      <Nav />
      <section className="min-h-screen bg-gradient-to-r from-green-50 via-white to-blue-100 py-16 px-6 font-serif">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Text */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Welcome back{uname ? `, ${uname}` : ''} 👋
            </h1>
            <p className="text-lg text-gray-600">
              Manage your links, track stats, and explore your dashboard.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-l-4 border-blue-500">
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">🔗 Total Links</h3>
              <p className="text-gray-600">You’ve created <span className="font-bold">12</span> short URLs so far.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-l-4 border-green-500">
              <h3 className="text-2xl font-semibold text-green-700 mb-2">📈 Clicks Tracked</h3>
              <p className="text-gray-600">Your links received <span className="font-bold">893</span> total clicks.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-l-4 border-purple-500">
              <h3 className="text-2xl font-semibold text-purple-700 mb-2">🗓️ Last Activity</h3>
              <p className="text-gray-600">Last visit on <span className="font-medium">July 28, 2025</span>.</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-md text-gray-500">
              Logged in as: <span className="text-gray-800 font-medium">{email}</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
