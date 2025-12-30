
import React from 'react';
import { AnimalInfo } from '../types';

interface Props {
  status: AnimalInfo['status'];
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const getColors = () => {
    switch (status) {
      case 'Least Concern': return 'bg-green-100 text-green-700 border-green-200';
      case 'Near Threatened': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Vulnerable': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Endangered': return 'bg-red-100 text-red-700 border-red-200';
      case 'Critically Endangered': return 'bg-red-200 text-red-900 border-red-300';
      case 'Extinct in the Wild': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getColors()}`}>
      {status}
    </span>
  );
};
