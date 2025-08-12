import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { apiService, handleApiError } from '../services/api';

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getHeroSlides();
        setSlides(response.data || []);
      } catch (err) {
        console.error('Error fetching hero slides:', err);
        setError(handleApiError(err, 'Failed to load hero slides'));
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSlides();
  }, []);

  if (loading) {
    return (
      <div className="hero-section flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading cultural heritage...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero-section flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Unable to load content</h2>
          <p className="text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="cta-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!slides || slides.length === 0) {
    return (
      <div className="hero-section flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No content available</h2>
          <p className="text-lg">Please check back later for cultural heritage content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={700}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        }}
        style={{ height: '100vh', height: '100svh' }}
        className="hero-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            style={{
              backgroundColor: slide.bg_color || slide.bgColor,
              color: slide.text_color || slide.textColor
            }}
          >
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
              {/* Content Section */}
              <div className="col-span-1 flex">
                <div className="flex h-full w-full flex-col justify-between p-4 lg:p-8">
                  {/* Top Content */}
                  <div className="mb-auto">
                    <h2 className="text-lg font-normal md:text-xl">{slide.title}</h2>
                    <h3 className="pb-2 font-normal opacity-60 text-lg md:text-xl">
                      {slide.description}
                    </h3>
                    <div className="flex items-center gap-2 pt-3 flex-wrap">
                      {slide.categories && slide.categories.map((category, index) => (
                        <span
                          key={index}
                          className="service-button"
                          style={{
                            backgroundColor: slide.text_color || slide.textColor,
                            color: slide.bg_color || slide.bgColor,
                            border: `1px solid ${slide.text_color || slide.textColor}`
                          }}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Brand Text - Bottom Left */}
                  <p className="font-display uppercase text-[4rem] leading-[0.95] md:text-[7rem]">
                    Culture
                  </p>
                </div>
              </div>
              
              {/* Image Section */}
              <div className="col-span-1 flex relative">
                <img
                  src={slide.image_url || slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute bottom-4 right-4">
                  <p className="font-display uppercase text-[4rem] leading-[0.95] md:text-[7rem] text-white mix-blend-difference">
                    India
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="swiper-button-prev !text-white !w-12 !h-12 !mt-0 !top-1/2 !left-4 !transform !-translate-y-1/2"></div>
      <div className="swiper-button-next !text-white !w-12 !h-12 !mt-0 !top-1/2 !right-4 !transform !-translate-y-1/2"></div>
      
      {/* Custom Pagination */}
      <div className="swiper-pagination !bottom-8"></div>
    </div>
  );
};

export default HeroSlider;