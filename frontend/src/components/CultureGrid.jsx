import React, { useState, useEffect } from 'react';
import { apiService, handleApiError } from '../services/api';

const CultureGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCulturalCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getCulturalCategories();
        setCategories(response.data || []);
      } catch (err) {
        console.error('Error fetching cultural categories:', err);
        setError(handleApiError(err, 'Failed to load cultural categories'));
      } finally {
        setLoading(false);
      }
    };

    fetchCulturalCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-black mb-4 md:text-5xl">
              Explore Indian Culture
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-black mb-4 md:text-5xl">
              Explore Indian Culture
            </h2>
            <div className="text-center p-8 bg-red-50 rounded-lg">
              <p className="text-red-600 mb-4">{error}</p>
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-black mb-4 md:text-5xl">
            Explore Indian Culture
          </h2>
          <p className="text-lg text-dark-grey max-w-3xl mx-auto">
            Dive deep into the rich tapestry of Indian heritage through our comprehensive cultural categories. 
            Each section offers a unique window into India's diverse traditions and customs.
          </p>
        </div>

        {/* Culture Cards Grid */}
        <div className="portfolio-grid">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`project-card ${index % 2 === 0 ? 'grid-item-large' : 'grid-item-small'}`}
              style={{
                backgroundColor: category.bg_color || category.bgColor,
                color: category.text_color || category.textColor
              }}
            >
              {/* Image */}
              <div className="mb-6 overflow-hidden rounded-lg">
                <img
                  src={category.image_url || category.image}
                  alt={category.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-normal hover:underline mb-2 cursor-pointer">
                    {category.title}
                  </h3>
                  <p className="font-normal opacity-60 text-lg mb-4 line-clamp-3">
                    {category.description}
                  </p>
                </div>

                {/* Categories and Count */}
                <div className="mt-auto">
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {category.categories && category.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="service-button"
                        style={{
                          backgroundColor: category.text_color || category.textColor,
                          color: category.bg_color || category.bgColor,
                          border: `1px solid ${category.text_color || category.textColor}`
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-normal opacity-80">
                      {category.count_text || category.count}
                    </span>
                    <button
                      className="cta-button"
                      style={{
                        backgroundColor: category.text_color || category.textColor,
                        color: category.bg_color || category.bgColor,
                        borderColor: category.text_color || category.textColor
                      }}
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="cta-button large">
            View All Cultural Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default CultureGrid;