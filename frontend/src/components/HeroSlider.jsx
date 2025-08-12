import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { heroSlides } from '../mock';

const HeroSlider = () => {
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
        {heroSlides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            style={{
              backgroundColor: slide.bgColor,
              color: slide.textColor
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
                      {slide.categories.map((category, index) => (
                        <span
                          key={index}
                          className="service-button"
                          style={{
                            backgroundColor: slide.textColor,
                            color: slide.bgColor,
                            border: `1px solid ${slide.textColor}`
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
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
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