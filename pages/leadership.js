import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import QuoteBlock from '@/components/QuoteBlock';
import AvatarChat from '@/components/AvatarChat';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '@/utils/animations';
import { AVATAR_MODES } from '@/utils/constants';
import { usePassport } from '@/context/PassportContext';
import { FiTarget, FiUsers, FiHeart, FiTrendingUp, FiAward, FiBook } from 'react-icons/fi';

const LeadershipPrinciple = ({ icon, title, description, example }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
        {React.cloneElement(icon, { className: 'text-brand-teal', size: 24 })}
      </div>
      <div className="flex-1">
        <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">{title}</h3>
        <p className="text-gray-600 mb-3">{description}</p>
        {example && (
          <div className="bg-brand-gray-soft rounded p-3">
            <p className="text-sm text-gray-700 italic">
              <span className="font-medium">In Practice:</span> {example}
            </p>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const MentorshipStory = ({ name, role, story, outcome }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-gradient-to-br from-brand-navy to-brand-navy-light text-white rounded-lg p-6"
  >
    <h4 className="font-sans font-bold text-xl mb-2">{name}</h4>
    <p className="text-white/80 text-sm mb-3">{role}</p>
    <p className="text-white/90 mb-4">{story}</p>
    <div className="border-t border-white/20 pt-4">
      <p className="text-sm">
        <span className="font-bold">Today:</span> {outcome}
      </p>
    </div>
  </motion.div>
);

const LeadershipPage = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);
  const { addAchievement, ACHIEVEMENTS } = usePassport();

  useEffect(() => {
    addAchievement(ACHIEVEMENTS.LEADERSHIP_STUDENT);
  }, [addAchievement, ACHIEVEMENTS]);

  const principles = [
    {
      icon: <FiTarget />,
      title: 'Vision with Innovation',
      description: 'Start with a bold vision and embrace unconventional thinking to realize it. Never be afraid to imagine a future that doesn\'t exist yet.',
      example: 'Championed mobile healthcare services years before they became mainstream, seeing the potential when others saw obstacles.'
    },
    {
      icon: <FiHeart />,
      title: 'Lead with Empathy',
      description: 'Understanding and caring for your team\'s growth and well-being creates loyalty and drives exceptional performance.',
      example: 'During a critical project deadline, noticed a team member struggling. Instead of pressure, offered support and flexible hours, resulting in breakthrough innovation.'
    },
    {
      icon: <FiUsers />,
      title: 'Empower Others',
      description: 'A leader\'s job is to build other leaders. Give people ownership and watch them exceed their own expectations.',
      example: 'Gave a junior developer full responsibility for a client presentation. With guidance, not control, they landed our biggest contract.'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Continuous Learning',
      description: 'Stay curious and humble. The best leaders are perpetual students, learning from everyone around them.',
      example: 'At 60, still taking online courses in AI and machine learning, often learning alongside team members half my age.'
    },
    {
      icon: <FiAward />,
      title: 'Excellence & Integrity',
      description: 'Success without integrity is failure. Every decision must pass the test of both quality and ethics.',
      example: 'Turned down a lucrative contract because it would compromise patient data privacy. The client returned later with better terms and deeper respect.'
    },
    {
      icon: <FiBook />,
      title: 'Share Knowledge Freely',
      description: 'Knowledge grows when shared. Creating a culture of open learning multiplies innovation.',
      example: 'Instituted "Innovation Fridays" where anyone could teach something new - from coding to cooking. Best product ideas often came from these sessions.'
    }
  ];

  const mentorshipStories = [
    {
      name: 'Raj Patel',
      role: 'From Intern to CEO',
      story: 'Started as a nervous intern at Mosum in 1998. I saw potential he didn\'t see in himself. Rotated him through departments, sponsored his MBA, and gave him increasing responsibilities.',
      outcome: 'CEO of a $50M healthcare tech company, mentoring others as I mentored him.'
    },
    {
      name: 'Sarah Chen',
      role: 'From Developer to CTO',
      story: 'A brilliant but quiet programmer who rarely spoke in meetings. I made her lead a critical FDA submission project, coaching her through the challenges.',
      outcome: 'CTO at a Fortune 500 healthcare company, known for building inclusive tech teams.'
    },
    {
      name: 'Ahmed Hassan',
      role: 'From Support to Product Head',
      story: 'Customer support engineer with deep product insights. When others saw "just support staff," I saw a future product visionary. Gave him a product team to lead.',
      outcome: 'VP of Product at a unicorn startup, his products serve millions globally.'
    }
  ];

  const testimonials = [
    {
      quote: 'Mayank doesn\'t manage people - he unleashes their potential. He saw abilities in me I didn\'t know existed.',
      author: 'Rakshit Sheth',
      role: 'Former CTO, Mosum Technology'
    },
    {
      quote: 'The biggest lesson I learned from Mayank was to never lose sight of the human element in technology. He leads with both brain and heart.',
      author: 'Dr. Anita Sharma',
      role: 'Director of Engineering, myOnsite'
    },
    {
      quote: 'He asks questions that make you think differently. One conversation with Mayank can change your entire approach to a problem.',
      author: 'James Wilson',
      role: 'Partner, Healthcare Ventures'
    }
  ];

  const impactStats = [
    { number: '50+', label: 'Leaders Mentored' },
    { number: '10+', label: 'Now in C-Suite Roles' },
    { number: '5', label: 'Founded Their Own Companies' },
    { number: '∞', label: 'Lives Impacted' }
  ];

  return (
    <Layout
      title="Leadership Philosophy - Building Leaders, Not Just Companies"
      description="Discover Mayank Trivedi's approach to leadership, mentorship, and building high-performing teams that change industries."
      currentPage="leadership"
    >
      {/* Hero Section */}
      <Hero
        title="Leadership That Transforms"
        subtitle="Building Leaders, Not Just Companies"
        description="True leadership isn't about being the smartest person in the room. It's about building the room where smart people can do their best work."
        avatarMode={AVATAR_MODES.MENTOR}
      />

      {/* Core Principles */}
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
              Leadership Principles That Guide Me
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              These aren't just theories - they're practices I live by every day
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {principles.map((principle, index) => (
              <LeadershipPrinciple key={index} {...principle} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mentorship Stories */}
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
              Mentorship in Action
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              The greatest reward is watching others achieve more than they thought possible
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {mentorshipStories.map((story, index) => (
              <MentorshipStory key={index} {...story} />
            ))}
          </motion.div>

          {/* Impact Stats */}
          <motion.div
            className="bg-white rounded-lg shadow-sm p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-sans font-bold text-2xl text-brand-navy text-center mb-8">
              Mentorship Impact
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="font-sans font-bold text-4xl text-brand-teal">
                    {stat.number}
                  </p>
                  <p className="text-gray-600 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Philosophy Quote */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl">
          <QuoteBlock
            quote="I've been fortunate to have great mentors who believed in me; I see it as my duty to pay that forward by nurturing talent and sharing what I've learned. At the end of the day, it's not about the titles you held or the companies you led. It's about the people you uplifted and the knowledge you shared. That's your legacy."
            author="Mayank Trivedi"
            variant="highlight"
          />
        </div>
      </section>

      {/* Team Building Approach */}
      <section className="section bg-brand-gray-soft">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy mb-6">
                Building High-Performance Teams
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-sans font-bold text-xl text-brand-navy mb-2">
                    Hire for Potential, Not Just Experience
                  </h3>
                  <p className="text-gray-700">
                    Some of my best team members were fresh graduates with no experience 
                    but unlimited curiosity. Give them the right environment, and they'll 
                    surprise you.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-sans font-bold text-xl text-brand-navy mb-2">
                    Create Psychological Safety
                  </h3>
                  <p className="text-gray-700">
                    Teams perform best when they feel safe to take risks, make mistakes, 
                    and voice different opinions. Fear kills innovation faster than any 
                    competitor.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-sans font-bold text-xl text-brand-navy mb-2">
                    Celebrate Failures as Learning
                  </h3>
                  <p className="text-gray-700">
                    We had a "Failure Friday" tradition where teams shared what didn't 
                    work and what they learned. Some of our biggest breakthroughs came 
                    from understanding our failures.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-sans font-bold text-xl text-brand-navy mb-2">
                    Lead by Example
                  </h3>
                  <p className="text-gray-700">
                    Never ask your team to do something you wouldn't do yourself. Whether 
                    it's staying late to meet a deadline or admitting a mistake, 
                    authenticity builds trust.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <AvatarChat mode={AVATAR_MODES.MENTOR} size="large" showChat={true} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy mb-4">
              What Team Members Say
            </h2>
          </motion.div>
          
          <div className="relative">
            <QuoteBlock
              quote={testimonials[selectedTestimonial].quote}
              author={testimonials[selectedTestimonial].author}
              role={testimonials[selectedTestimonial].role}
              variant="default"
            />
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedTestimonial === index
                      ? 'bg-brand-teal w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient-to-r from-brand-navy to-brand-navy-light text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
              Let's Build Something Together
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Whether you're looking for mentorship, building a team, or seeking leadership 
              guidance, I'm always happy to share what I've learned.
            </p>
            <a href="/contact" className="btn-secondary">
              Connect With Me
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default LeadershipPage;
