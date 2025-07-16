import React from 'react';
import Link from 'next/link';
import { FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* About */}
          <div>
            <h3 className="font-sans font-bold text-lg mb-4">About Mayank</h3>
            <p className="text-gray-300 leading-relaxed">
              Visionary leader with 25+ years of innovative leadership in healthcare technology, 
              building companies that make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.slice(1, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans font-bold text-lg mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://linkedin.com/in/mayanktrivedi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FiLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:mayank@indralok.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FiMail size={20} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {currentYear} Mayank Trivedi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
