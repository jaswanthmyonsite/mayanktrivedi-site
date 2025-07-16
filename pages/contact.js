import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';
import { AVATAR_MODES } from '@/utils/constants';
import { usePassport } from '@/context/PassportContext';
import { FiMail, FiLinkedin, FiMapPin, FiClock } from 'react-icons/fi';
import { useRouter } from 'next/router';

const ContactPage = () => {
  const router = useRouter();
  const { addAchievement, ACHIEVEMENTS } = usePassport();
  const [subject, setSubject] = useState('');

  useEffect(() => {
    // Check if there's a subject in the query params (e.g., from speaking page)
    if (router.query.subject) {
      setSubject(router.query.subject);
    }
  }, [router.query]);

  useEffect(() => {
    addAchievement(ACHIEVEMENTS.CONTACT_INITIATOR);
  }, [addAchievement, ACHIEVEMENTS]);

  const contactMethods = [
    {
      icon: <FiMail />,
      title: 'Email',
      value: 'mayank@indralok.com',
      link: 'mailto:mayank@indralok.com',
      description: 'For business inquiries and collaborations'
    },
    {
      icon: <FiLinkedin />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/mayanktrivedi',
      link: 'https://linkedin.com/in/mayanktrivedi',
      description: 'Connect professionally and stay updated'
    },
    {
      icon: <FiMapPin />,
      title: 'Locations',
      value: 'Vadodara, India • Florida, USA',
      description: 'Operating globally from two home bases'
    },
    {
      icon: <FiClock />,
      title: 'Response Time',
      value: 'Within 48 hours',
      description: 'I personally read and respond to every message'
    }
  ];

  return (
    <Layout
      title="Contact Mayank Trivedi - Let's Build Together"
      description="Get in touch to discuss partnerships, investments, speaking engagements, or mentorship opportunities."
      currentPage="contact"
    >
      {/* Hero Section */}
      <Hero
        title="Let's Connect"
        subtitle="Every Great Journey Starts with a Conversation"
        description="Whether you're an entrepreneur with a bold vision, an investor seeking the next opportunity, or someone passionate about healthcare innovation, I'd love to hear from you."
        avatarMode={AVATAR_MODES.DEFAULT}
      />

      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="font-sans font-bold text-2xl text-brand-navy mb-6">
                Send a Message
              </h2>
              <ContactForm initialSubject={subject} />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-sans font-bold text-2xl text-brand-navy mb-6">
                Other Ways to Connect
              </h2>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {React.cloneElement(method.icon, { className: 'text-brand-teal', size: 24 })}
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-lg text-brand-navy">
                        {method.title}
                      </h3>
                      {method.link ? (
                        <a
                          href={method.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-teal hover:text-brand-teal-light transition-colors duration-300"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-gray-700">{method.value}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Hours */}
              <div className="mt-8 bg-brand-gray-soft rounded-lg p-6">
                <h3 className="font-sans font-bold text-lg text-brand-navy mb-4">
                  Virtual Office Hours
                </h3>
                <p className="text-gray-700 mb-4">
                  I hold virtual office hours once a month for entrepreneurs and students. 
                  It's a chance to ask questions, get advice, or just have a conversation 
                  about innovation and entrepreneurship.
                </p>
                <button
                  onClick={() => setSubject('office-hours')}
                  className="text-brand-teal font-sans font-medium hover:text-brand-teal-light transition-colors duration-300"
                >
                  Request Office Hours Slot →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">
                What types of partnerships are you interested in?
              </h3>
              <p className="text-gray-700">
                I'm particularly interested in healthcare technology ventures, mobile health 
                solutions, and initiatives that create meaningful impact in underserved 
                communities. I look for passionate teams solving real problems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">
                Do you offer mentorship to entrepreneurs?
              </h3>
              <p className="text-gray-700">
                Yes, I regularly mentor entrepreneurs, especially those in healthcare tech 
                and those building from non-traditional locations. Reach out with your 
                story and let's see how I can help.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">
                What's your investment focus?
              </h3>
              <p className="text-gray-700">
                I invest in early-stage healthcare technology companies with strong teams 
                and clear paths to improving patient outcomes. I prefer being an active 
                advisor rather than a passive investor.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-gradient-to-r from-brand-teal to-brand-teal-light text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
              Your Story Matters
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Behind every message is a person with dreams, challenges, and potential. 
              I read every message personally because you never know where the next 
              great collaboration will come from.
            </p>
            <p className="text-lg text-white/80">
              Looking forward to hearing from you.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
