import React from 'react';
import { Brain, BarChart2, Download, Filter, UserCircle, LogOut } from 'lucide-react';
import { AIModel } from '../types/AIModel';
import { exportToPDF, exportToCSV } from '../utils/export';

interface HeaderProps {
  models: AIModel[];
  onOpenFilters: () => void;
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ models, onOpenFilters, user, onLogout }) => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left section: User info + title */}
        <div className="flex items-center space-x-6">
          
          {/* App title */}
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8" />
            <h1 className="text-2xl font-bold">AI Carbon Footprint Analytics</h1>
          </div>
        </div>

        {/* User info */}
        <div className="flex items-center space-x-2">
            <UserCircle className="h-6 w-6 text-white" />
            <span className="text-sm">
              {user.name} {user.email}
            </span>
          </div>


        {/* Right section: Buttons */}
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

          {/* Logout button */}
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
