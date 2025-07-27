import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../ui/ImageWithFallback';

const carouselData = [
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop',
    title: '생각을 아이디어로',
    subtitle: '창의적인 아이디어를 체계적으로 정리하고 발전시켜보세요'
  },
  {
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=800&fit=crop',
    title: '아이디어를 실행으로',
    subtitle: '혁신적인 도구로 아이디어를 현실로 만들어보세요'
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop',
    title: '함께 만들어가는 혁신',
    subtitle: '팀워크와 협업으로 더 큰 성과를 달성하세요'
  }
];

export function SignupCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full bg-gradient-to-br from-iwl-purple-50 to-iwl-blue-50 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={carouselData[currentSlide].image}
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-12">
        <div className="mb-8">
          {/* IWL Logo Placeholder - 실제 로고가 있으면 교체 */}
          <div className="mb-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                <div className="w-8 h-8 bg-iwl-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">iWL</span>
                </div>
                <span className="text-2xl text-gray-800">Idea Work Lab</span>
              </div>
            </div>
          </div>
          
          {/* Dynamic Content */}
          <h2 className="text-3xl mb-4 text-gray-800">
            {carouselData[currentSlide].title}
          </h2>
          <p className="text-lg text-gray-600 max-w-md">
            {carouselData[currentSlide].subtitle}
          </p>
        </div>

        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-iwl-gradient w-8' 
                  : 'bg-gray-400 hover:bg-gray-500 w-2'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-8 right-8 w-32 h-32 bg-iwl-purple opacity-10 rounded-full animate-pulse" />
      <div className="absolute bottom-16 left-8 w-20 h-20 bg-iwl-blue opacity-15 rounded-full animate-pulse delay-1000" />
      
      {/* Floating Icons */}
      <div className="absolute top-1/4 left-12 w-6 h-6 text-iwl-purple opacity-30 animate-bounce">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div className="absolute bottom-1/3 right-16 w-8 h-8 text-iwl-blue opacity-25 animate-pulse">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
    </div>
  );
}