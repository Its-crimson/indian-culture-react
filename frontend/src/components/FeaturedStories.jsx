import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { featuredStories } from '../mock';

const FeaturedStories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-black mb-4 md:text-5xl">
            Cultural Stories
          </h2>
          <p className="text-lg text-dark-grey max-w-3xl mx-auto">
            Discover fascinating narratives that bring India's cultural heritage to life. 
            Each story unveils the deeper meanings behind our traditions and customs.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredStories.map((story, index) => (
            <article
              key={story.id}
              className="group cursor-pointer"
            >
              {/* Story Image */}
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span 
                    className="service-button"
                    style={{
                      backgroundColor: '#d987ff',
                      color: '#151515',
                      border: '1px solid #d987ff'
                    }}
                  >
                    {story.category}
                  </span>
                </div>
                {/* Read Time */}
                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                    <Clock className="w-3 h-3" />
                    {story.readTime}
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-black group-hover:text-mid-purple transition-colors duration-300">
                  {story.title}
                </h3>
                <p className="text-dark-grey leading-relaxed">
                  {story.excerpt}
                </p>
                <div className="flex items-center gap-2 text-mid-purple font-medium">
                  <span className="text-sm">Read Story</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Story Categories */}
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-black mb-4">Explore by Category</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Traditional Arts',
                'Festivals & Celebrations',
                'Architecture & Monuments',
                'Culinary Heritage',
                'Folk Tales',
                'Historical Narratives'
              ].map((category, index) => (
                <button
                  key={index}
                  className="service-button"
                  style={{
                    backgroundColor: index % 2 === 0 ? '#78d692' : '#ff965a',
                    color: '#151515',
                    border: `1px solid ${index % 2 === 0 ? '#78d692' : '#ff965a'}`
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button className="cta-button large">
            View All Stories
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center bg-light-yellow rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-black mb-4">
            Never Miss a Cultural Story
          </h3>
          <p className="text-dark-grey text-lg mb-6 max-w-2xl mx-auto">
            Get weekly stories, cultural insights, and heritage discoveries delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full border border-grey text-black placeholder-dark-grey focus:outline-none focus:border-mid-purple focus:ring-2 focus:ring-mid-purple/20 transition-all duration-300"
            />
            <button className="cta-button">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;