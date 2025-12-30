
import React, { useState, useCallback } from 'react';
import { DiscoveryState } from './types';
import { fetchRandomAnimal, generateAnimalImage } from './services/geminiService';
import { DiscoveryCard } from './components/DiscoveryCard';

interface ExtendedState extends DiscoveryState {
  history: string[];
}

const App: React.FC = () => {
  const [state, setState] = useState<ExtendedState>({
    animal: null,
    imageUrl: null,
    loading: false,
    error: null,
    history: [],
  });

  const handleDiscover = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Pass the current history to ensure uniqueness
      const animal = await fetchRandomAnimal(state.history);
      
      // Use the name and caption to generate a contextual image
      const imageUrl = await generateAnimalImage(animal.name, animal.caption);
      
      setState(prev => ({
        animal,
        imageUrl,
        loading: false,
        error: null,
        history: [...prev.history, animal.name],
      }));
    } catch (err) {
      console.error(err);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: "Oops! The animals are hiding. Let's try again!" 
      }));
    }
  }, [state.history]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-[#f8fafc] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
      
      {/* Discovery Counter Badge */}
      {state.history.length > 0 && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div className="bg-white border-2 border-green-500 rounded-2xl px-4 py-2 shadow-xl flex items-center gap-3">
            <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
              {state.history.length}
            </div>
            <span className="text-green-700 font-bold text-sm uppercase tracking-wider">Species Discovered</span>
          </div>
        </div>
      )}

      {/* Header */}
      {!state.animal && !state.loading && (
        <div className="text-center mb-12 flex flex-col items-center max-w-2xl">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-200 float">
            <i className="fas fa-paw text-white text-4xl"></i>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold text-gray-800 mb-4 tracking-tight">
            WildQuest
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed px-4">
            Embark on a journey to discover the most fascinating creatures 
            roaming our planet. Every click reveals a new wonder!
          </p>
        </div>
      )}

      {/* Discovery Area */}
      <div className="w-full flex flex-col items-center">
        {state.loading && (
          <div className="flex flex-col items-center justify-center p-20">
            <div className="relative">
               <div className="w-32 h-32 border-8 border-green-100 border-t-green-500 rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fas fa-binoculars text-green-500 text-2xl animate-bounce"></i>
               </div>
            </div>
            <p className="mt-8 text-2xl font-bold text-green-700 animate-pulse">
              Scanning the horizon...
            </p>
            <p className="text-gray-500 mt-2 italic">Looking for something you haven't seen yet</p>
          </div>
        )}

        {state.error && (
          <div className="bg-red-50 text-red-700 p-6 rounded-3xl border-2 border-red-100 flex flex-col items-center mb-8">
            <i className="fas fa-exclamation-triangle text-3xl mb-3"></i>
            <p className="font-bold text-xl">{state.error}</p>
          </div>
        )}

        {state.animal && state.imageUrl && !state.loading && (
          <div className="mb-10 w-full flex justify-center animate-[fadeIn_0.5s_ease-out]">
            <DiscoveryCard animal={state.animal} imageUrl={state.imageUrl} />
          </div>
        )}

        {/* Action Button */}
        <div className={`mt-4 ${state.loading ? 'hidden' : 'block'}`}>
          <button
            onClick={handleDiscover}
            disabled={state.loading}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-green-500 rounded-full hover:bg-green-600 active:scale-95 shadow-xl shadow-green-100 hover:shadow-green-200"
          >
            <span className="flex items-center gap-3 text-2xl">
              <i className={`fas ${state.animal ? 'fa-redo' : 'fa-compass'} group-hover:rotate-12 transition-transform`}></i>
              {state.animal ? 'Discover Another!' : 'Start Exploring'}
            </span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="mt-16 text-center text-gray-400 text-sm">
        <p className="flex items-center gap-2 justify-center">
          <i className="fas fa-shield-alt text-green-400"></i>
          Exploring Earth's Biodiversity
        </p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
