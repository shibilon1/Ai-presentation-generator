
import React, { useState, useEffect } from 'react';
import type { Slide as SlideType } from '../types';
import { Slide } from './Slide';
import { downloadPptx } from '../services/pptxService';
import { DownloadIcon, LeftArrowIcon, RightArrowIcon } from './icons';

interface PresentationViewerProps {
  slides: SlideType[];
  isLoading: boolean;
  error: string | null;
  topic: string;
}

export const PresentationViewer: React.FC<PresentationViewerProps> = ({ slides, isLoading, error, topic }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [slides]);

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleDownload = () => {
    downloadPptx(slides, topic);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <svg className="animate-spin h-12 w-12 text-blue-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h2 className="text-xl font-semibold text-slate-300">Generating Your Presentation...</h2>
          <p className="text-slate-400 mt-2">The AI is working its magic. This might take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center bg-red-900/20 border border-red-500/50 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-red-400">An Error Occurred</h2>
          <p className="text-red-300 mt-2">{error}</p>
        </div>
      );
    }

    if (slides.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-2xl font-bold text-slate-300">Welcome!</h2>
          <p className="text-slate-400 mt-2">Enter a topic on the left to generate your presentation.</p>
          <img src="https://picsum.photos/seed/presentation/500/300" alt="Placeholder" className="mt-8 rounded-lg opacity-30"/>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <Slide slide={slides[currentSlideIndex]} />
        </div>
        <div className="flex items-center justify-between mt-4 p-4 bg-slate-800/50 border border-slate-700 rounded-b-lg">
          <button
            onClick={goToPrevSlide}
            disabled={currentSlideIndex === 0}
            className="p-2 rounded-full bg-slate-700 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <LeftArrowIcon />
          </button>
          <span className="font-mono text-sm text-slate-400">
            Slide {currentSlideIndex + 1} of {slides.length}
          </span>
          <button
            onClick={goToNextSlide}
            disabled={currentSlideIndex === slides.length - 1}
            className="p-2 rounded-full bg-slate-700 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RightArrowIcon />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-2xl border border-slate-700 aspect-[16/9] flex flex-col">
      <div className="flex-grow p-4 md:p-6 flex flex-col justify-center">
        {renderContent()}
      </div>
       {slides.length > 0 && !isLoading && (
        <div className="p-4 border-t border-slate-700 flex justify-end">
            <button 
                onClick={handleDownload}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
            >
                <DownloadIcon />
                Download .pptx
            </button>
        </div>
       )}
    </div>
  );
};
