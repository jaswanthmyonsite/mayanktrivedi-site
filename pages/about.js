import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import QuoteBlock from '@/components/QuoteBlock';
import AvatarChat from '@/components/AvatarChat';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '@/utils/animations';
import { AVATAR_MODES } from '@/utils/constants';
import { usePassport } from '@/context/PassportContext';
import { FiBook, FiAward, FiGlobe, FiHeart } from 'react-icons/fi';

const AboutPage = () => {
  const { addAchievement, ACHIEVEMENTS } = usePassport();

  useEffect(() => {
    // Achievement for exploring about section
    addAchievement(ACHIEVEMENTS.ABOUT_EXPLORER);
  }, [addAchievement, ACHIEVEMENTS]);

  const timelineEvents = [
    {
      year: '1975',
      title: 'Born in Vadodara',
      description: 'Started life in the cultural capital of Gujarat',
      icon: '👶',
      detail: 'A journey begins in the vibrant streets of Vadodara, where family values and curiosity shaped my early years.'
    },
    {
      year: '1990',
      title: 'First Flight',
      description: 'Piloted a glider at age 15 with NCC',
      icon: '✈️',
      detail: 'Conquering fear 3000 feet above ground taught me that courage is not the absence of fear, but action despite it.'
    },
    {
      year: '1994',
      title: 'Founded Mosum',
      description: 'Started healthcare IT company in Vadodara',
      icon: '💻',
      detail: 'Defying conventional wisdom, I brought Silicon Valley ambition to my hometown, proving innovation knows no geography.'
    },
    {
      year: '2006',
      title: 'Mosum Acquisition',
      description: 'Eclipsys acquires Mosum, validating our vision',
      icon: '🎯',
      detail: 'A historic moment for Vadodara tech scene - our first multinational acquisition proved world-class products can come from anywhere.'
    },
    {
      year: '2014',
      title: 'myOnsite Launch',
      description: 'Revolutionizing mobile healthcare in USA',
      icon: '🏥',
      detail: 'Transforming a struggling company into a national leader in mobile diagnostics, bringing healthcare to patients\' doorsteps.'
    },
    {
      year: '2024',
      title: 'BioDescartes',
      description: 'Building vaccine manufacturing in India',
      icon: '🧬',
      detail: 'Returning to India to build critical healthcare infrastructure, combining global expertise with local impact.'
    }
  ];

  const values = [
    {
      icon: <FiBook />,
      title: 'Continuous Learning',
      description: 'Every day brings new lessons. I remain a student, whether learning new programming languages or mastering woodworking techniques.'
    },
    {
      icon: <FiAward />,
      title: 'Excellence & Integrity',
      description: 'Success without integrity is failure. Every decision, every product, every relationship is built on a foundation of trust and quality.'
    },
    {
      icon: <FiGlobe />,
      title: 'Global Vision, Local Impact',
      description: 'While my companies operate globally, I never forget the importance of creating opportunities in local communities, especially in Vadodara.'
    },
    {
      icon: <FiHeart />,
      title: 'Empathy in Leadership',
      description: 'Technology serves people, not the other way around. Understanding human needs drives every innovation we create.'
    }
  ];

  const milestones = [
    { year: '1990s', achievement: 'Built FDA-approved software in 12 months (industry norm: 4-5 years)' },
    { year: '2000s', achievement: 'Scaled Eclipsys India to 700+ employees' },
    { year: '2010s', achievement: 'Transformed myOnsite to serve 200,000+ patients nationwide' },
    { year: '2020s', achievement: 'Launching BioDescartes for vaccine self-reliance in India' }
  ];

  return (
    <Layout
      title="About Mayank Trivedi - The Journey of a Visionary"
      description="From a curious boy in Vadodara to a global healthcare technology leader, discover the story of innovation, perseverance, and purpose."
      currentPage="about"
    >
      {/* Hero Section */}
      <Hero
        title="My Story"
        subtitle="A Journey of Purpose & Innovation"
        description="From piloting gliders at 15 to building healthcare companies that serve millions, every chapter of my life has been about pushing boundaries and creating meaningful impact."
        avatarMode={AVATAR_MODES.PILOT}
      />

      {/* Timeline Section */}
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
              Life's Defining Moments
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Each milestone shaped who I am today - an entrepreneur, innovator, and lifelong learner
            </p>
          </motion.div>

          <Timeline events={timelineEvents} />
        </div>
      </section>

      {/* Personal Story Section */}
      <section className="section bg-brand-gray-soft">
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
                The Boy Who Loved to Build
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-4">
                  Growing up in Vadodara, I was the child who took apart radios to understand 
                  how they worked, conducted chemistry experiments in our kitchen (much to my 
                  mother's concern), and spent weekends at the public library with my father, 
                  wandering between shelves taller than myself.
                </p>
                <p className="text-gray-700 mb-4">
                  At 15, the National Cadet Corps gave me wings – literally. My first glider 
                  flight was terrifying and exhilarating. Soaring silently above the earth, 
                  I learned that once you overcome fear, the sky truly is the limit. This 
                  lesson has guided every risk I've taken since.
                </p>
                <p className="text-gray-700 mb-4">
                  My journey to America at 22 was another leap of faith. With two suitcases 
                  and boundless dreams, I transformed from a textile engineer to a software 
                  pioneer, always remembering that growth happens outside comfort zones.
                </p>
              </div>
              
              <QuoteBlock
                quote="I've always chosen the path where I'd learn the most – not earn the most."
                author="Mayank Trivedi"
                variant="minimal"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-sans font-bold text-xl text-brand-navy mb-4">
                  Key Life Principles
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-teal mr-2">•</span>
                    <span className="text-gray-700">If there is no challenge, there is no fun</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-teal mr-2">•</span>
                    <span className="text-gray-700">Success is a team sport</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-teal mr-2">•</span>
                    <span className="text-gray-700">Technology must serve people, not the other way around</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-teal mr-2">•</span>
                    <span className="text-gray-700">Never stop learning, never stop growing</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <AvatarChat mode={AVATAR_MODES.DEFAULT} size="medium" showChat={true} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              Values That Guide Me
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-teal">
                  {React.cloneElement(value.icon, { size: 28 })}
                </div>
                <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section bg-gradient-to-r from-brand-navy to-brand-navy-light text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
              Milestones & Impact
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Decades of building, learning, and creating meaningful change
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <h3 className="font-sans font-bold text-2xl mb-2">{milestone.year}</h3>
                <p className="text-white/90">{milestone.achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Touch Section */}
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
              Beyond Business
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">Pilot</h3>
                <p className="text-gray-600">Licensed pilot who finds peace above the clouds</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🪵</div>
                <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">Craftsman</h3>
                <p className="text-gray-600">Hand-crafting furniture teaches patience and precision</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🏍️</div>
                <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">Rider</h3>
                <p className="text-gray-600">Harley Davidson adventures across continents</p>
              </div>
            </div>

            <QuoteBlock
              quote="Whether I'm coding software or carving wood, the principle is the same: respect the material, understand the user, and craft with care. Life's greatest joy comes from building something meaningful with your own hands."
              author="Mayank Trivedi"
              variant="highlight"
            />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
