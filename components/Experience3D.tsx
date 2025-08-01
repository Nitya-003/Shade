'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';

// Simple 3D Box component as placeholder for actual products
const ProductBox = () => {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#a855f7" 
        metalness={0.7}
        roughness={0.2}
        emissive="#4c1d95"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const Experience3D = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-orbitron mb-6">
            <span className="text-gradient">3D Experience</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Interact with our products in a whole new dimension. Rotate, zoom, and explore 
            every detail with our immersive 3D viewer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 h-96 md:h-[500px]"
        >
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading 3D Experience...</p>
              </div>
            </div>
          }>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={0.4} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              
              <PresentationControls
                global
                rotation={[0.13, 0.1, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
              >
                <ProductBox />
              </PresentationControls>
              
              <Environment preset="city" />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </Suspense>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Click and drag to rotate • Scroll to zoom</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>✨ Real-time rendering</span>
            <span>🎯 Interactive controls</span>
            <span>📱 Mobile optimized</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience3D;
