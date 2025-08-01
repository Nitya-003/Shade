'use client';

import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Experience3D from '@/components/Experience3D';
import Newsletter from '@/components/Newsletter';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="overflow-x-hidden"
    >
      <Hero />
      <Experience3D />
      <FeaturedProducts />
      <Newsletter />
    </motion.div>
  );
}
