'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { login, register: registerUser, user, logout, isLoading } = useAuth();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const onRegisterSubmit = async (data: any) => {
    try {
      await registerUser(data.email, data.password, data.name);
      onClose();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  if (user) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="glass rounded-2xl p-8 w-96 max-w-[90vw]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold font-orbitron">Profile</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                    ) : (
                      <User size={32} />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-400">{user.email}</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={logout}
                  className="w-full py-3 glass rounded-lg font-medium hover:bg-white/10 transition-all duration-300"
                >
                  Sign Out
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="glass rounded-2xl p-8 w-96 max-w-[90vw]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-orbitron">
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <form onSubmit={isLogin ? loginForm.handleSubmit(onLoginSubmit) : registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                {!isLogin && (
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        {...registerForm.register('name')}
                        type="text"
                        placeholder="Full Name"
                        className="w-full pl-10 pr-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </div>
                    {registerForm.formState.errors.name && (
                      <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.name.message}</p>
                    )}
                  </div>
                )}

                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      {...(isLogin ? loginForm.register('email') : registerForm.register('email'))}
                      type="email"
                      placeholder="Email"
                      className="w-full pl-10 pr-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>
                  {(isLogin ? loginForm.formState.errors.email : registerForm.formState.errors.email) && (
                    <p className="text-red-400 text-sm mt-1">
                      {(isLogin ? loginForm.formState.errors.email : registerForm.formState.errors.email)?.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      {...(isLogin ? loginForm.register('password') : registerForm.register('password'))}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="w-full pl-10 pr-10 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {(isLogin ? loginForm.formState.errors.password : registerForm.formState.errors.password) && (
                    <p className="text-red-400 text-sm mt-1">
                      {(isLogin ? loginForm.formState.errors.password : registerForm.formState.errors.password)?.message}
                    </p>
                  )}
                </div>

                {!isLogin && (
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        {...registerForm.register('confirmPassword')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        className="w-full pl-10 pr-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </div>
                    {registerForm.formState.errors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-purple-400 hover:text-purple-300 ml-1 font-medium"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
