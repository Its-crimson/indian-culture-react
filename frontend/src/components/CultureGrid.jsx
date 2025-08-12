import React from 'react';
import { culturalCategories } from '../mock';

const CultureGrid = () => {
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
          {culturalCategories.map((category, index) => (
            <div
              key={category.id}
              className={`project-card ${index % 2 === 0 ? 'grid-item-large' : 'grid-item-small'}`}
              style={{
                backgroundColor: category.bgColor,
                color: category.textColor
              }}
            >
              {/* Image */}
              <div className="mb-6 overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
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
                    {category.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="service-button"
                        style={{
                          backgroundColor: category.textColor,
                          color: category.bgColor,
                          border: `1px solid ${category.textColor}`
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-normal opacity-80">
                      {category.count}
                    </span>
                    <button
                      className="cta-button"
                      style={{
                        backgroundColor: category.textColor,
                        color: category.bgColor,
                        borderColor: category.textColor
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