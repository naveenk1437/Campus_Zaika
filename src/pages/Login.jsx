import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const navigate = useNavigate(); // ✅ for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert('✅ Login successful!');
      navigate('/menu'); // ✅ redirect to Menu page
    } catch (error) {
      alert('❌ Login failed: ' + error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      return alert('Please enter your email to reset password.');
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('✅ Password reset email sent! Check your inbox.');
      setShowModal(false);
    } catch (error) {
      alert('❌ Failed to send reset email: ' + error.message);
    }
  };

  return (
    <div className="bg-yellow-100 dark:bg-gray-900 text-black dark:text-white min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Log In
          </button>

          {/* Forgot Password */}
          <p
            className="text-sm text-right text-blue-500 hover:underline cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Forgot Password?
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
          </p>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-center">Reset Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 mb-4"
            />
            <div className="flex justify-between gap-2">
              <button
                onClick={handleForgotPassword}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
              >
                Send Reset Email
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
