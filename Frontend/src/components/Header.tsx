import React from 'react';
import { Brain, BarChart2, Download, Filter } from 'lucide-react';
import { AIModel } from '../types/AIModel';
import { exportToPDF, exportToCSV } from '../utils/export';

interface HeaderProps {
  models: AIModel[];
  onOpenFilters: () => void;
}

export const Header: React.FC<HeaderProps> = ({ models, onOpenFilters }) => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8" />
          <h1 className="text-2xl font-bold">AI Carbon Footprint Analytics</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenFilters}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportToPDF(models)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>PDF</span>
            </button>
            <button
              onClick={() => exportToCSV(models)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <BarChart2 className="h-5 w-5" />
              <span>CSV</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};