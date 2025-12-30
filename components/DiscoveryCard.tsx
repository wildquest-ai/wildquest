
import React from 'react';
import { AnimalInfo } from '../types';
import { StatusBadge } from './StatusBadge';

interface Props {
  animal: AnimalInfo;
  imageUrl: string;
}

export const DiscoveryCard: React.FC<Props> = ({ animal, imageUrl }) => {
  return (
    <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300 border-4 border-green-100">
      <div className="relative group">
        <img 
          src={imageUrl} 
          alt={animal.name} 
          className="w-full h-80 object-cover"
        />
        <div className="absolute top-4 right-4">
          <StatusBadge status={animal.status} />
        </div>
      </div>
      
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-1">{animal.name}</h2>
          <p className="text-lg text-green-600 font-medium italic">
            {animal.scientificName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-2xl">
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-green-700">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <p className="text-xs text-green-600 font-bold uppercase">Habitat</p>
              <p className="text-sm font-semibold text-gray-700 leading-tight">{animal.location}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-2xl">
            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700">
              <i className="fas fa-lightbulb"></i>
            </div>
            <div>
              <p className="text-xs text-blue-600 font-bold uppercase">Fun Fact</p>
              <p className="text-sm font-semibold text-gray-700 leading-tight">Amazing Adaptations</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <i className="fas fa-info-circle text-green-500"></i>
              About the {animal.name}
            </h3>
            <p className="text-gray-600 leading-relaxed mt-1">
              {animal.caption}
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-2xl">
            <p className="text-yellow-800 text-sm italic">
              " {animal.funFact} "
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
