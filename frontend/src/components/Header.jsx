import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationLinks } from '../mock';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              Indian<span className="text-light-pink">Heritage</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-white hover:text-light-pink transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="cta-button" style={{
              backgroundColor: '#ffd1e7',
              color: '#151515',
              borderColor: '#ffd1e7'
            }}>
              Explore Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="py-4 border-t border-white/10">
              <div className="flex flex-col space-y-4">
                {navigationLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="nav-link text-white hover:text-light-pink transition-colors duration-300 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4">
                  <button 
                    className="cta-button w-full"
                    style={{
                      backgroundColor: '#ffd1e7',
                      color: '#151515',
                      borderColor: '#ffd1e7'
                    }}
                  >
                    Explore Now
                  </button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;