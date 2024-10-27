import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MarketingHeroProps {
  data: {
    title: string;
    subtitle: string;
    cta: string;
    backgroundImage: string;
  };
}

export default function MarketingHero({ data }: MarketingHeroProps) {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center hero-section"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {data.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          {data.subtitle}
        </p>
        <button className="cta-button px-8 py-4 rounded-full text-lg font-medium inline-flex items-center space-x-2 hover:opacity-90 transition-opacity">
          <span>{data.cta}</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}