import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '@/utils/animations';
import { AVATAR_MODES } from '@/utils/constants';
import { usePassport } from '@/context/PassportContext';
import { FiMic, FiUsers, FiGlobe, FiBookOpen, FiCalendar, FiMail } from 'react-icons/fi';
import Link from 'next/link';

const TopicCard = ({ icon, title, description, talkingPoints }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
        {React.cloneElement(icon, { className: 'text-brand-teal', size: 24 })}
      </div>
      <div className="flex-1">
        <h3 className="font-sans font-bold text-xl text-brand-navy mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2">
          {talkingPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-brand-teal mr-2">•</span>
              <span className="text-sm text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

const PastEngagement = ({ event, date, location, audience, topic }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-gradient-to-r from-brand-navy to-brand-navy-light text-white rounded-lg p-6"
  >
    <h4 className="font-sans font-bold text-lg mb-2">{event}</h4>
    <div className="space-y-1 text-white/80 text-sm">
      <p className="flex items-center">
        <FiCalendar className="mr-2" size={14} /> {date}
      </p>
      <p className="flex items-center">
        <FiGlobe className="mr-2" size={14} /> {location}
      </p>
      <p className="flex items-center">
        <FiUsers className="mr-2" size={14} /> {audience}
      </p>
    </div>
    <p className="mt-3 text-white/90 italic">"{topic}"</p>
  </motion.div>
);

const SpeakingPage = () => {
  const { addAchievement, ACHIEVEMENTS } = usePassport();

  useEffect(() => {
    addAchievement(ACHIEVEMENTS.SPEAKER_LISTENER);
  }, [addAchievement, ACHIEVEMENTS]);

  const topics = [
    {
      icon: <FiBookOpen />,
      title: 'Innovation in Healthcare Technology',
      description: 'How emerging technologies are transforming patient care and creating new opportunities',
      talkingPoints: [
        'AI and machine learning in diagnostics',
        'Mobile healthcare delivery models',
        'Building patient-centric technology',
        'Case studies from myOnsite and Indralok'
      ]
    },
    {
      icon: <FiUsers />,
      title: 'Building Global Teams from Small Cities',
      description: 'Lessons from creating world-class companies outside traditional tech hubs',
      talkingPoints: [
        'Overcoming infrastructure challenges',
        'Attracting and retaining talent',
        'Creating innovation ecosystems',
        'The Vadodara success story'
      ]
    },
    {
      icon: <FiMic />,
      title: 'Leadership & Mentorship',
      description: 'Developing leaders who can transform industries and communities',
      talkingPoints: [
        'Leading with empathy in tech',
        'Building high-performance cultures',
        'Mentorship as a growth multiplier',
        'Balancing innovation with integrity'
      ]
    },
    {
      icon: <FiGlobe />,
      title: 'Entrepreneurship in Emerging Markets',
      description: 'Navigating challenges and opportunities in developing economies',
      talkingPoints: [
        'Identifying underserved markets',
        'Building trust across cultures',
        'Scaling from local to global',
        'Creating sustainable impact'
      ]
    }
  ];

  const pastEngagements = [
    {
      event: 'HIMSS Global Health Conference',
      date: 'March 2023',
      location: 'Chicago, USA',
      audience: '45,000+ healthcare IT professionals',
      topic: 'The Future of Decentralized Healthcare Delivery'
    },
    {
      event: 'Startup India Summit',
      date: 'January 2023',
      location: 'New Delhi, India',
      audience: '5,000+ entrepreneurs and investors',
      topic: 'Building Global Companies from Tier-2 Cities'
    },
    {
      event: 'Harvard Medical School Executive Education',
      date: 'September 2022',
      location: 'Boston, USA',
      audience: 'Healthcare executives and physicians',
      topic: 'Digital Transformation in Patient Care'
    },
    {
      event: 'TiE Global Summit',
      date: 'December 2021',
      location: 'Dubai, UAE',
      audience: '2,000+ entrepreneurs and VCs',
      topic: 'From Vadodara to the World: A Journey of Innovation'
    }
  ];

  const speakingStats = [
    { number: '100+', label: 'Speaking Engagements' },
    { number: '25+', label: 'Countries' },
    { number: '50K+', label: 'People Inspired' },
    { number: '4.9/5', label: 'Average Rating' }
  ];

  return (
    <Layout
      title="Speaking - Share Knowledge, Inspire Innovation"
      description="Book Mayank Trivedi for keynotes, workshops, and panels on healthcare innovation, leadership, and entrepreneurship."
      currentPage="speaking"
    >
      {/* Hero Section */}
      <Hero
        title="Speaking & Sharing"
        subtitle="Inspiring the Next Generation"
        description="For over two decades, I've had the privilege of sharing my journey with audiences worldwide. Every talk is a conversation, every audience teaches me something new."
        avatarMode={AVATAR_MODES.SPEAKER}
      />

      {/* Speaking Topics */}
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
              Speaking Topics
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              From technical deep-dives to inspirational keynotes, I tailor each talk to create maximum value for your audience
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {topics.map((topic, index) => (
              <TopicCard key={index} {...topic} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Past Engagements */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy mb-4">
              Recent Engagements
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Honored to have spoken at some of the world's most prestigious platforms
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {pastEngagements.map((engagement, index) => (
              <PastEngagement key={index} {...engagement} />
            ))}
          </motion.div>

          {/* Speaking Stats */}
          <motion.div
            className="bg-brand-gray-soft rounded-lg p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {speakingStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="font-sans font-bold text-3xl text-brand-teal">
                    {stat.number}
                  </p>
                  <p className="text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Audiences Say */}
      <section className="section bg-brand-gray-soft">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy mb-4">
              What Audiences Say
            </h2>
          </motion.div>

          <div className="space-y-6">
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <p className="text-lg text-gray-700 italic mb-4">
                "Mayank's keynote was the highlight of our conference. He has a rare ability to blend 
                technical insights with human stories that resonate with everyone in the audience."
              </p>
              <footer className="text-sm text-gray-600">
                - Dr. Sarah Johnson, HIMSS Conference Director
              </footer>
            </motion.blockquote>

            <motion.blockquote
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <p className="text-lg text-gray-700 italic mb-4">
                "What sets Mayank apart is his authenticity. He shares failures as openly as successes, 
                making his insights incredibly valuable for entrepreneurs at any stage."
              </p>
              <footer className="text-sm text-gray-600">
                - Rajesh Kumar, TiE Global President
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* Book a Speaking Engagement */}
      <section className="section bg-gradient-to-r from-brand-navy to-brand-navy-light text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
              Invite Me to Speak
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Whether it's a keynote, panel discussion, workshop, or fireside chat, 
              I'd be honored to share insights with your audience.
            </p>
            
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <h3 className="font-sans font-bold text-lg mb-4">Speaking Formats</h3>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="font-medium">• Keynotes (45-60 min)</p>
                  <p className="font-medium">• Workshops (Half/Full day)</p>
                </div>
                <div>
                  <p className="font-medium">• Panel Discussions</p>
                  <p className="font-medium">• Fireside Chats</p>
                </div>
              </div>
            </div>

            <Link href="/contact?subject=speaking" className="btn-secondary">
              Request Speaking Engagement
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SpeakingPage;

