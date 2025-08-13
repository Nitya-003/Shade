'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      { }
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full mb-6">
              <Mail size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-4">
              <span className="text-gradient">Stay in the Loop</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join our exclusive community and be the first to discover new arrivals, 
              limited editions, and insider deals from the shadows.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubscribed}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 min-w-[120px]"
              >
                {isSubscribed ? (
                  <span>Subscribed! ✨</span>
                ) : (
                  <>
                    Subscribe
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center space-x-8 text-sm text-gray-500"
          >
            <span>✨ Exclusive access</span>
            <span>🎯 Early bird deals</span>
            <span>📧 No spam, ever</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
