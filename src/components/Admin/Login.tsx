import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md p-8 bg-surface-container-low rounded-lg border border-outline-variant shadow-lg">
        <h2 className="text-3xl font-headline font-bold text-on-surface mb-6 text-center">Admin Login</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full p-3 bg-surface border border-outline-variant rounded focus:border-primary focus:outline-none text-on-surface"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full p-3 bg-surface border border-outline-variant rounded focus:border-primary focus:outline-none text-on-surface"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary text-on-primary font-bold rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}
