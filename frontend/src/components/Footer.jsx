import React, { useState } from 'react';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';
import { apiService, handleApiError } from '../services/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setSubscribeLoading(true);
      setSubscribeMessage('');
      await apiService.subscribeNewsletter(email);
      setSubscribeMessage('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      setSubscribeMessage(handleApiError(err, 'Failed to subscribe to newsletter'));
    } finally {
      setSubscribeLoading(false);
    }
  };

  const culturalLinks = [
    { name: 'Classical Arts', href: '/arts' },
    { name: 'Festivals', href: '/festivals' },
    { name: 'Architecture', href: '/architecture' },
    { name: 'Cuisine', href: '/cuisine' }
  ];

  const regionLinks = [
    { name: 'North India', href: '/regions/north' },
    { name: 'South India', href: '/regions/south' },
    { name: 'East India', href: '/regions/east' },
    { name: 'West India', href: '/regions/west' }
  ];

  const resourceLinks = [
    { name: 'Cultural Stories', href: '/stories' },
    { name: 'Educational Content', href: '/learn' },
    { name: 'Heritage Sites', href: '/sites' },
    { name: 'Research', href: '/research' }
  ];

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">
              Indian<span className="text-light-pink">Heritage</span>
            </h2>
            <p className="text-mid-grey text-lg mb-6 leading-relaxed">
              Celebrating the rich tapestry of Indian culture and heritage through 
              education, exploration, and preservation of our timeless traditions.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-mid-grey">Made with</span>
              <Heart className="w-4 h-4 text-light-pink fill-current" />
              <span className="text-sm text-mid-grey">for India's Culture</span>
            </div>
          </div>

          {/* Cultural Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-pink">Culture</h3>
            <ul className="space-y-2">
              {culturalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-mid-grey hover:text-white transition-colors duration-300 text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-pink">Regions</h3>
            <ul className="space-y-2">
              {regionLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-mid-grey hover:text-white transition-colors duration-300 text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-pink">Learn</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-mid-grey hover:text-white transition-colors duration-300 text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4">Stay Connected</h3>
            <p className="text-mid-grey text-lg mb-6">
              Subscribe to our newsletter for the latest stories, cultural insights, and heritage discoveries.
            </p>
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-mid-grey focus:outline-none focus:border-light-pink focus:bg-white/15 transition-all duration-300"
                required
              />
              <button 
                type="submit" 
                className="cta-button"
                disabled={subscribeLoading}
              >
                {subscribeLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {subscribeMessage && (
              <p className={`mt-3 text-sm ${subscribeMessage.includes('Successfully') ? 'text-green-400' : 'text-red-400'}`}>
                {subscribeMessage}
              </p>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Mail className="w-5 h-5 text-light-pink" />
              <span className="text-mid-grey">heritage@indianculture.org</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Phone className="w-5 h-5 text-light-pink" />
              <span className="text-mid-grey">+91 98765 43210</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <MapPin className="w-5 h-5 text-light-pink" />
              <span className="text-mid-grey">New Delhi, India</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-mid-grey text-sm">
              © 2025 Indian Heritage. All rights reserved. Celebrating India's cultural diversity.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-mid-grey hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-mid-grey hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-mid-grey hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;