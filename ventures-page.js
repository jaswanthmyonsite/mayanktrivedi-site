// pages/ventures.js
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerChildren } from '@/utils/animations';
import { AVATAR_MODES } from '@/utils/constants';
import { usePassport } from '@/context/PassportContext';
import { FiGlobe, FiUsers, FiTrendingUp, FiAward, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';

const VentureCard = ({ venture, isActive, onClick }) => {
  return (
    <motion.div
      layout
      className={`card p-6 cursor-pointer transition-all duration-300 ${
        isActive ? 'ring-2 ring-brand-teal shadow-lg' : 'hover:shadow-md'
      }`}
      onClick={onClick}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{venture.icon}</div>
        <span className={`text-sm font-sans font-medium ${
          venture.status === 'Active' ? 'text-green-600' : 'text-gray-500'
        }`}>
          {venture.status}
        </span>
      </div>
      
      <h3 className="font-sans font-bold text-xl text-brand-navy mb-2">
        {venture.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{venture.tagline}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{venture.year}</span>
        <span className="text-brand-teal text-sm font-medium">
          {isActive ? 'Hide Details' : 'View Details'} →
        </span>
      </div>
    </motion.div>
  );
};

const VentureDetail = ({ venture }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-sans font-bold text-3xl text-brand-navy mb-4">
            {venture.name}
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {venture.description}
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <FiGlobe className="text-brand-teal mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-sans font-medium text-brand-navy">Market Reach</h4>
                <p className="text-gray-600">{venture.marketReach}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FiUsers className="text-brand-teal mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-sans font-medium text-brand-navy">Team Size</h4>
                <p className="text-gray-600">{venture.teamSize}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FiTrendingUp className="text-brand-teal mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-sans font-medium text-brand-navy">Key Metrics</h4>
                <p className="text-gray-600">{venture.keyMetrics}</p>
              </div>
            </div>
          </div>
          
          {venture.website && (
            <a
              href={venture.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-brand-teal hover:text-brand-teal-light transition-colors duration-300"
            >
              Visit Website
              <FiExternalLink className="ml-2" />
            </a>
          )}
        </div>
        
        <div>
          <h3 className="font-sans font-bold text-xl text-brand-navy mb-4">
            Key Achievements
          </h3>
          <ul className="space-y-3">
            {venture.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start">
                <FiAward className="text-brand-orange mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{achievement}</span>
              </li>
            ))}
          </ul>
          
          {venture.impact && (
            <div className="mt-8 p-6 bg-brand-gray-soft rounded-lg">
              <h4 className="font-sans font-bold text-lg text-brand-navy mb-2">
                Impact Story
              </h4>
              <p className="text-gray-700 italic">"{venture.impact}"</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const VenturesPage = () => {
  const [activeVenture, setActiveVenture] = useState(null);
  const { addAchievement, ACHIEVEMENTS } = usePassport();

  useEffect(() => {
    addAchievement(ACHIEVEMENTS.VENTURE_SCOUT);
  }, [addAchievement, ACHIEVEMENTS]);

  const ventures = [
    {
      id: 'myonsite',
      name: 'myOnsite Healthcare',
      tagline: 'Bringing healthcare to your doorstep',
      icon: '🏥',
      status: 'Active',
      year: '2014 - Present',
      description: 'Revolutionizing healthcare delivery by providing mobile phlebotomy and diagnostic services directly to patients\' homes. What started as a struggling company has transformed into the national leader in mobile healthcare services.',
      marketReach: 'Operating in 25+ states across the USA',
      teamSize: '500+ healthcare professionals',
      keyMetrics: '200,000+ patients served, 95% patient satisfaction',
      website: 'https://myonsitehealthcare.com',
      achievements: [
        'First to achieve nationwide mobile phlebotomy coverage',
        'Partnerships with Memorial Sloan Kettering, CDC, and Harvard',
        'Reduced patient no-shows by 85% for partner institutions',
        'Pioneered COVID-19 at-home testing during pandemic'
      ],
      impact: 'An 82-year-old cancer patient in rural Texas couldn\'t travel for weekly blood work. Thanks to myOnsite, she received care at home, enabling timely treatment adjustments that ultimately saved her life.'
    },
    {
      id: 'mosum',
      name: 'Mosum Technology / Sysware',
      tagline: 'World-class healthcare IT from Vadodara',
      icon: '💻',
      status: 'Acquired (2006)',
      year: '1994 - 2006',
      description: 'Built from a one-room office in Vadodara to a multinational healthcare software company. Developed FDA-approved blood bank management systems in record time, proving that world-class innovation can come from anywhere.',
      marketReach: 'USA, Canada, Hong Kong, Israel, Netherlands',
      teamSize: '150+ employees across 3 countries',
      keyMetrics: 'FDA clearance in 12 months, $15M acquisition by Eclipsys',
      achievements: [
        'FDA 510(k) clearance on first submission - industry first',
        'ISO 9001 and ISO 13485 certifications',
        'Partnership with Philips Medical Systems',
        'Created 700+ high-skill jobs in Gujarat',
        'Vadodara\'s first multinational tech acquisition'
      ],
      impact: 'Our blood bank software prevented countless transfusion errors and saved lives. One hospital reported a 99.9% reduction in blood type mismatches after implementing our system.'
    },
    {
      id: 'indralok',
      name: 'Indralok Technologies',
      tagline: 'Real-time location intelligence for healthcare',
      icon: '📍',
      status: 'Active',
      year: '2008 - Present',
      description: 'Pioneering RFID and real-time location systems for hospitals. AwareCare platform helps healthcare facilities track patients, equipment, and staff in real-time, improving safety and operational efficiency.',
      marketReach: 'North America, expanding to Europe',
      teamSize: '25+ engineers and healthcare specialists',
      keyMetrics: '50+ hospital implementations, 30% reduction in equipment search time',
      website: 'https://indralok.com',
      achievements: [
        'First cloud-based RTLS platform for healthcare',
        'Reduced patient wait times by average 40%',
        'Prevented $2M+ in lost equipment for partner hospitals',
        'RFID in Healthcare Consortium executive member'
      ],
      impact: 'A children\'s hospital used our system to track vulnerable pediatric patients, preventing two potential abduction attempts and reuniting numerous lost children with families within minutes.'
    },
    {
      id: 'biodescartes',
      name: 'BioDescartes',
      tagline: 'Building India\'s vaccine future',
      icon: '🧬',
      status: 'Active',
      year: '2024 - Present',
      description: 'Establishing a state-of-the-art vaccine manufacturing facility in Vadodara, partnering with global experts in mRNA technology. Aligned with India\'s vision for healthcare self-reliance.',
      marketReach: 'India, with plans for global distribution',
      teamSize: 'Building team of 100+ scientists and technicians',
      keyMetrics: 'Capacity for 100M doses annually, WHO-GMP standards',
      achievements: [
        'First mRNA vaccine facility in Gujarat',
        'Partnership with leading mRNA technology experts',
        'Supporting Make in India initiative',
        'Creating high-tech jobs in biotechnology'
      ],
      impact: 'Positioning India to respond rapidly to future pandemics while creating a sustainable biotech ecosystem in Vadodara.'
    },
    {
      id: 'jbt',
      name: 'JBT Hospitality',
      tagline: 'Smart spaces for modern living',
      icon: '🏢',
      status: 'Active',
      year: '2010 - Present',
      description: 'Developing sustainable commercial and residential properties in Vadodara, including co-working spaces that nurture the startup ecosystem.',
      marketReach: 'Vadodara and surrounding regions',
      teamSize: '50+ professionals',
      keyMetrics: '1M+ sq ft developed, 20+ startups incubated',
      achievements: [
        'First LEED-certified commercial complex in Vadodara',
        'Created affordable co-working spaces for 50+ startups',
        'Integrated smart building technologies',
        'Community-focused development approach'
      ],
      impact: 'Our co-working spaces have helped launch 5 successful tech startups that now employ over 200 people in Vadodara.'
    }
  ];

  return (
    <Layout
      title="Ventures - Building Companies That Matter"
      description="Explore the companies and initiatives founded by Mayank Trivedi, each addressing critical healthcare and community needs."
      currentPage="ventures"
    >
      {/* Hero Section */}
      <Hero
        title="Ventures That Transform"
        subtitle="Building Tomorrow's Solutions Today"
        description="Each venture I've founded addresses real-world challenges with innovative solutions. From healthcare delivery to vaccine manufacturing, these companies reflect my commitment to creating meaningful impact."
        avatarMode={AVATAR_MODES.SUIT}
      />

      {/* Ventures Grid */}
      <section className="section bg-brand-gray-soft">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy mb-4">
              Portfolio of Innovation
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Click on any venture to explore its story, impact, and achievements
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {ventures.map((venture) => (
              <motion.div key={venture.id} variants={fadeInUp}>
                <VentureCard
                  venture={venture}
                  isActive={activeVenture?.id === venture.id}
                  onClick={() => setActiveVenture(
                    activeVenture?.id === venture.id ? null : venture
                  )}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Venture Detail */}
          <AnimatePresence mode="wait">
            {activeVenture && (
              <VentureDetail venture={activeVenture} />
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Innovation Philosophy */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy mb-8">
              My Approach to Building Companies
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">
                  Problem First
                </h3>
                <p className="text-gray-600">
                  Every venture starts with a real problem that affects real people
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">
                  People Powered
                </h3>
                <p className="text-gray-600">
                  Success comes from empowering talented teams to do their best work
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">
                  Sustainable Impact
                </h3>
                <p className="text-gray-600">
                  Building for long-term value, not short-term gains
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default VenturesPage;