
import React from 'react';
import type { Slide as SlideType } from '../types';

interface SlideProps {
  slide: SlideType;
}

export const Slide: React.FC<SlideProps> = ({ slide }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 p-8 flex flex-col justify-center rounded-lg animate-fade-in">
      <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 mb-6 border-b-2 border-purple-500/50 pb-3">
        {slide.title}
      </h2>
      <ul className="space-y-4 text-lg text-slate-300 list-disc pl-6">
        {slide.content.map((point, index) => (
          <li key={index} className="transition-opacity duration-500" style={{ transitionDelay: `${index * 100}ms` }}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};
