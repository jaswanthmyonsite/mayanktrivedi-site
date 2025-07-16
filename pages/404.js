import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import AvatarChat from '@/components/AvatarChat';
import { AVATAR_MODES } from '@/utils/constants';

const NotFoundPage = () => {
  return (
    <Layout
      title="404 - Page Not Found"
      description="The page you're looking for doesn't exist."
    >
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream to-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-9xl font-sans font-bold text-brand-navy/20 mb-4">
              404
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy mb-4">
              Oops! Page Not Found
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
              It seems you've ventured into uncharted territory. Even the best explorers 
              sometimes take a wrong turn.
            </p>

            <div className="flex justify-center mb-8">
              <AvatarChat
                mode={AVATAR_MODES.DEFAULT}
                size="medium"
                showChat={false}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary inline-flex items-center">
                <FiHome className="mr-2" />
                Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn-tertiary inline-flex items-center"
              >
                <FiArrowLeft className="mr-2" />
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

