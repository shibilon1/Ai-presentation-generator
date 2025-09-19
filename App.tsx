
import React, { useState, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { PresentationViewer } from './components/PresentationViewer';
import { generateSlides } from './services/geminiService';
import type { Slide } from './types';

const App: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [presentationTopic, setPresentationTopic] = useState<string>('');

  const handleGenerate = useCallback(async (topic: string) => {
    if (!topic.trim()) {
      setError('Please enter a topic for your presentation.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSlides([]);
    setPresentationTopic(topic);

    try {
      const generatedSlides = await generateSlides(topic);
      if (generatedSlides && generatedSlides.length > 0) {
        setSlides(generatedSlides);
      } else {
        setError('The AI could not generate slides for this topic. Please try again with a different topic.');
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate presentation. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 shadow-lg sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          AI Presentation Generator
        </h1>
      </header>
      <main className="flex flex-col md:flex-row gap-8 p-4 md:p-8 max-w-screen-2xl mx-auto">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <ControlPanel onGenerate={handleGenerate} isLoading={isLoading} />
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4">
          <PresentationViewer
            slides={slides}
            isLoading={isLoading}
            error={error}
            topic={presentationTopic}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
