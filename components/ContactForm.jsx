import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import AvatarChat from './AvatarChat';
import { AVATAR_MODES } from '@/utils/constants';
import { trackEvent } from '@/utils/analytics';

const ContactForm = ({ initialSubject = '' }) => {
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'loading', 'success', 'error'
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      subject: initialSubject === 'speaking' ? 'Speaking Engagement Request' : 
               initialSubject === 'office-hours' ? 'Office Hours Request' : ''
    }
  });

  const onSubmit = async (data) => {
    setSubmitStatus('loading');
    
    try {
      // Track form submission
      trackEvent('contact_form_submit', {
        subject: data.subject,
        category: data.category,
      });

      // In production, this would send to your API endpoint
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      setSubmitStatus('success');
      reset();
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const categories = [
    'Partnership Opportunity',
    'Investment Discussion',
    'Speaking Engagement',
    'Mentorship Request',
    'Media Inquiry',
    'General Inquiry',
  ];

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-sans font-medium text-gray-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            className={`w-full px-4 py-3 rounded-md border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-colors duration-300`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" size={14} />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-sans font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className={`w-full px-4 py-3 rounded-md border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-colors duration-300`}
            placeholder="john.doe@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" size={14} />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Organization Field */}
        <div>
          <label htmlFor="organization" className="block text-sm font-sans font-medium text-gray-700 mb-1">
            Organization
          </label>
          <input
            type="text"
            id="organization"
            {...register('organization')}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-colors duration-300"
            placeholder="Your Company / Institution"
          />
        </div>

        {/* Category Field */}
        <div>
          <label htmlFor="category" className="block text-sm font-sans font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            {...register('category', { required: 'Please select a category' })}
            className={`w-full px-4 py-3 rounded-md border ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-colors duration-300`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" size={14} />
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-sans font-medium text-gray-700 mb-1">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            {...register('subject', { required: 'Subject is required' })}
            className={`w-full px-4 py-3 rounded-md border ${
              errors.subject ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-colors duration-300`}
            placeholder="Brief description of your inquiry"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" size={14} />
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-sans font-medium text-gray-700 mb-1">
            Message *
          </label>
          <textarea
            id="message"
            rows={6}
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 20,
                message: 'Message must be at least 20 characters',
              },
            })}
            className={`w-full px-4 py-3 rounded-md border ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-colors duration-300 resize-none`}
            placeholder="Tell me about your idea, project, or how I can help..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" size={14} />
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={submitStatus === 'loading'}
            className={`btn-primary flex items-center ${
              submitStatus === 'loading' ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {submitStatus === 'loading' ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <FiSend className="ml-2" />
              </>
            )}
          </button>

          {/* Privacy Note */}
          <p className="text-sm text-gray-600">
            * Required fields
          </p>
        </div>
      </form>

      {/* Status Messages */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-start"
          >
            <FiCheck className="text-green-600 mt-0.5 mr-3 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-sans font-medium text-green-800">Message sent successfully!</h4>
              <p className="text-sm text-green-700 mt-1">
                Thank you for reaching out. I'll get back to you within 48 hours.
              </p>
            </div>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start"
          >
            <FiAlertCircle className="text-red-600 mt-0.5 mr-3 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-sans font-medium text-red-800">Something went wrong</h4>
              <p className="text-sm text-red-700 mt-1">
                Please try again or email me directly at mayank@indralok.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar Reaction */}
      {submitStatus === 'success' && (
        <div className="absolute -right-32 top-0 hidden xl:block">
          <AvatarChat
            mode={AVATAR_MODES.DEFAULT}
            size="small"
            showChat={false}
          />
        </div>
      )}
    </div>
  );
};

export default ContactForm;

