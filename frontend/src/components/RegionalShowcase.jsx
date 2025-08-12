import React, { useState, useEffect } from 'react';
import { apiService, handleApiError } from '../services/api';

const RegionalShowcase = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegionalHighlights = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getRegionalHighlights();
        setRegions(response.data || []);
      } catch (err) {
        console.error('Error fetching regional highlights:', err);
        setError(handleApiError(err, 'Failed to load regional highlights'));
      } finally {
        setLoading(false);
      }
    };

    fetchRegionalHighlights();
  }, []);

  if (loading) {
    return (
      <section className="py-16" style={{ backgroundColor: '#151515' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-white mb-4 md:text-5xl">
              Regional Heritage
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16" style={{ backgroundColor: '#151515' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-white mb-4 md:text-5xl">
              Regional Heritage
            </h2>
            <div className="text-center p-8 bg-red-900/20 rounded-lg">
              <p className="text-red-400 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="cta-button"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" style={{ backgroundColor: '#151515' }}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-white mb-4 md:text-5xl">
            Regional Heritage
          </h2>
          <p className="text-lg text-mid-grey max-w-3xl mx-auto">
            Experience the unique cultural flavors of India's diverse regions. From the vibrant folk 
            traditions of the North to the classical arts of the South, each region tells its own story.
          </p>
        </div>

        {/* Regional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {regions.map((region) => (
            <div
              key={region.id}
              className="project-card regional-card"
              style={{
                backgroundColor: region.bg_color || region.bgColor,
                color: region.text_color || region.textColor
              }}
            >
              <div className="p-6">
                {/* Region Title */}
                <h3 className="text-2xl font-semibold mb-3">
                  {region.region_name || region.region}
                </h3>

                {/* States */}
                <div className="mb-4">
                  <h4 className="text-sm font-normal opacity-80 mb-2 uppercase letter-spacing-wide">
                    Key States
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {region.states && region.states.map((state, index) => (
                      <span
                        key={index}
                        className="service-button"
                        style={{
                          backgroundColor: region.text_color || region.textColor,
                          color: region.bg_color || region.bgColor,
                          border: `1px solid ${region.text_color || region.textColor}`
                        }}
                      >
                        {state}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cultural Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-normal opacity-80 mb-2 uppercase letter-spacing-wide">
                    Cultural Highlights
                  </h4>
                  <ul className="space-y-1">
                    {(region.cultural_highlights || region.highlights || []).map((highlight, index) => (
                      <li key={index} className="text-lg opacity-90">
                        • {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Explore Button */}
                <button
                  className="cta-button"
                  style={{
                    backgroundColor: region.text_color || region.textColor,
                    color: region.bg_color || region.bgColor,
                    borderColor: region.text_color || region.textColor
                  }}
                >
                  Explore {region.region_name || region.region}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Map Placeholder */}
        <div className="text-center">
          <div 
            className="mx-auto max-w-4xl p-12 rounded-lg border-2 border-dashed"
            style={{ borderColor: '#717171' }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Interactive Cultural Map
            </h3>
            <p className="text-lg text-mid-grey mb-6">
              Explore India's cultural diversity through our interactive map. 
              Click on different regions to discover their unique traditions and heritage.
            </p>
            <button className="cta-button">
              Launch Interactive Map
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalShowcase;