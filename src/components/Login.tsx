import { useState } from 'react';
import { X, Lock, User, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function Login({ isOpen, onClose, onSuccess }: LoginProps) {
  const [showReset, setShowReset] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login, resetPassword } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      setUsername('');
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setError('Username atau password salah');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (resetPassword(email)) {
      setEmail('');
      setShowReset(false);
    } else {
      setError('Email tidak ditemukan');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-gray-900">{showReset ? 'Reset Password' : 'Login Admin'}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showReset ? (
            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700 mb-2">Username</label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                    placeholder="Masukkan username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                    placeholder="Masukkan password"
                    required
                  />
                </div>
              </div>

              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

              <button
                type="submit"
                className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => setShowReset(true)}
                className="w-full text-amber-600 hover:text-amber-700 text-sm"
              >
                Lupa Password?
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleResetPassword}
              className="space-y-4"
            >
              <p className="text-gray-600 text-sm">Masukkan email Anda untuk mereset password</p>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

              <button
                type="submit"
                className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Reset Password
              </button>

              <button
                type="button"
                onClick={() => setShowReset(false)}
                className="w-full text-gray-600 hover:text-gray-700 text-sm"
              >
                Kembali ke Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
