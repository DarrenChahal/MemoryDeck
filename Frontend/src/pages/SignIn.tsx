import React, { useState } from 'react';
import axios from 'axios';
import { signinInput } from '@darren_chahal/flashcard-common';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = signinInput.safeParse({ email, password });

    if (!validation.success) {
      setError(validation.error.errors.map(err => err.message).join(', '));
      return;
    }

    try {
      const response = await axios.post('https://backend.chahaldarren.workers.dev/api/v1/user/signin', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.jwt);
      setError('');
      window.location.href = '/';
    } catch (err) {
      setError('Sign in failed');
    }
  };

  return (
    <div className="min-h-screen bg-black-red-gradient flex items-center justify-center p-4">
      <div className="max-w-md w-full p-6 rounded-lg shadow-md bg-dark-metallic-gray text-white">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600 transition">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
