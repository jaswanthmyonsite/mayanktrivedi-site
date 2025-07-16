// pages/_app.js
import '@/styles/globals.css';
import { PassportProvider } from '@/context/PassportContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { trackEvent } from '@/utils/analytics';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      trackEvent('page_view', { page_path: url });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <PassportProvider>
      <Component {...pageProps} />
    </PassportProvider>
  );
}

export default MyApp;

// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0A2540" />
        
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// pages/index.js
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import QuoteBlock from '@/components/QuoteBlock';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeInUp, staggerChildren } from '@/utils/animations';
import { AVATAR_MODES } from '@/utils/constants';
import { FiArrowRight, FiAward, FiUsers, FiGlobe } from 'react-icons/fi';

const HomePage = () => {
  const stats = [
    { value: 25, label: 'Years of Leadership', suffix: '+' },
    { value: 5, label: 'Companies Founded' },
    { value: 200000, label: 'Patients Served', suffix: '+' },
    { value: 50, label: 'Countries Traveled', suffix: '+' },
  ];

  const ventures = [
    {
      name: 'myOnsite Healthcare',
      description: 'Revolutionizing mobile healthcare services across the US',
      icon: '🏥',
      link: '/ventures#myonsite',
    },
    {
      name: 'Mosum Technology',
      description: 'Pioneering healthcare IT from Vadodara to the world',
      icon: '💻',
      link: '/ventures#mosum',
    },
    {
      name: 'BioDescartes',
      description: 'Building India\'s vaccine manufacturing future',
      icon: '🧬',
      link: '/ventures#biodescartes',
    },
  ];

  const ctaButton = (
    <Link href="/about" className="btn-primary inline-flex items-center group">
      Discover My Journey
      <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
    </Link>
  );

  return (
    <Layout
      title="Mayank Trivedi - Visionary Leader in Healthcare Innovation"
      description="CEO, entrepreneur, and craftsman building the future of healthcare technology with heart and hands."
      currentPage="home"
    >
      {/* Hero Section */}
      <Hero
        title="Building Tomorrow's Healthcare"
        subtitle="With Innovation & Heart"
        description="I'm Mayank Trivedi. For over 25 years, I've been building companies that transform healthcare delivery through technology, compassion, and craftsmanship."
        cta={ctaButton}
        avatarMode={AVATAR_MODES.DEFAULT}
      />

      {/* Stats Bar */}
      <StatsBar stats={stats} className="shadow-sm" />

      {/* About Preview */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy mb-6">
                From Vadodara to the World
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                My journey began in the vibrant streets of Vadodara, where a young boy's 
                curiosity about technology would eventually lead to transforming healthcare 
                delivery for millions. From piloting gliders at 15 to building FDA-approved 
                software, every experience has shaped my approach to innovation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Today, I continue to build bridges between technology and humanity, whether 
                through AI-driven healthcare platforms or hand-crafted wooden furniture. 
                Because true innovation comes from understanding both the digital and the tangible.
              </p>
              <Link href="/about" className="text-brand-teal font-sans font-medium hover:text-brand-teal-light transition-colors duration-300 inline-flex items-center group">
                Read My Full Story
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/young-mayank-ncc.jpg"
                  alt="Young Mayank in NCC uniform"
                  className="rounded-lg shadow-md"
                />
                <img
                  src="/images/mayank-woodworking.jpg"
                  alt="Mayank woodworking"
                  className="rounded-lg shadow-md mt-8"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-orange text-white p-4 rounded-lg shadow-lg">
                <p className="font-sans font-bold text-lg">60+ Years</p>
                <p className="text-sm">Of Continuous Learning</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ventures Preview */}
      <section className="section bg-brand-gray-soft">
        <div className="container-custom">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy mb-4">
                Ventures That Make a Difference
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Each company I've built addresses real healthcare challenges with innovative solutions
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ventures.map((venture, index) => (
                <motion.div
                  key={venture.name}
                  variants={fadeInUp}
                  className="card p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4">{venture.icon}</div>
                  <h3 className="font-sans font-bold text-xl text-brand-navy mb-2">
                    {venture.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{venture.description}</p>
                  <Link
                    href={venture.link}
                    className="text-brand-teal font-sans font-medium hover:text-brand-teal-light transition-colors duration-300 inline-flex items-center group"
                  >
                    Learn More
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl">
          <QuoteBlock
            quote="Innovation isn't just about technology – it's about understanding people's needs and crafting solutions that truly make their lives better. Whether I'm writing code or carving wood, the principle remains the same: build with purpose, precision, and heart."
            author="Mayank Trivedi"
            variant="highlight"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-brand-navy to-brand-navy-light text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
              Ready to Build Something Together?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Whether you're an investor, partner, or someone passionate about healthcare innovation, 
              I'd love to connect and explore how we can create impact together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-secondary">
                Get in Touch
              </Link>
              <Link href="/speaking" className="btn bg-white text-brand-navy hover:bg-gray-100">
                Book a Speaking Engagement
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;