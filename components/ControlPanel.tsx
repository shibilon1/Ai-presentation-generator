
import React, { useState } from 'react';
import { GenerateIcon } from './icons';

interface ControlPanelProps {
  onGenerate: (topic: string) => void;
  isLoading: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(topic);
  };

  return (
    <aside className="bg-slate-800/50 rounded-lg p-6 shadow-2xl border border-slate-700 sticky top-24">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-2">
              Presentation Topic
            </label>
            <textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
              rows={5}
              className="w-full bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-slate-500 disabled:opacity-50"
              placeholder="e.g., 'The Future of Renewable Energy' or provide an outline..."
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <GenerateIcon />
                Generate Presentation
              </>
            )}
          </button>
        </div>
      </form>
    </aside>
  );
};
