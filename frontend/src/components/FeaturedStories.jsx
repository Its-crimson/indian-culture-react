import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { apiService, handleApiError } from '../services/api';

const FeaturedStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchFeaturedStories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getFeaturedStories();
        setStories(response.data || []);
      } catch (err) {
        console.error('Error fetching featured stories:', err);
        setError(handleApiError(err, 'Failed to load featured stories'));
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedStories();
  }, []);

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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center p-8 bg-red-50 rounded-lg mb-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="cta-button"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stories Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {stories.map((story, index) => (
                <article
                  key={story.id}
                  className="group cursor-pointer"
                >
                  {/* Story Image */}
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img
                      src={story.image_url || story.image}
                      alt={story.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
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
                        {story.read_time}
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
              
              {/* Newsletter Form */}
              <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-full border border-grey text-black placeholder-dark-grey focus:outline-none focus:border-mid-purple focus:ring-2 focus:ring-mid-purple/20 transition-all duration-300"
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
              
              {/* Subscription Message */}
              {subscribeMessage && (
                <p className={`text-sm ${subscribeMessage.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>
                  {subscribeMessage}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedStories;