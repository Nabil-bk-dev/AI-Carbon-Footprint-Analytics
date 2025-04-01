import React from 'react'; 
import { FilterOptions } from '../types/AIModel';
import { X } from 'lucide-react';

interface FiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  providers: string[];
  countries: string[];
}

export const Filters: React.FC<FiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  providers,
  countries,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filter Models</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Providers
            </label>
            <div className="space-y-2">
              {providers.map(provider => (
                <label key={provider} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.provider.includes(provider)}
                    onChange={(e) => {
                      const newProviders = e.target.checked
                        ? [...filters.provider, provider]
                        : filters.provider.filter(p => p !== provider);
                      onFiltersChange({ ...filters, provider: newProviders });
                    }}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span>{provider}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Countries
            </label>
            <div className="space-y-2">
              {countries.map(country => (
                <label key={country} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.country.includes(country)}
                    onChange={(e) => {
                      const newCountries = e.target.checked
                        ? [...filters.country, country]
                        : filters.country.filter(c => c !== country);
                      onFiltersChange({ ...filters, country: newCountries });
                    }}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span>{country}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CO₂ Emissions Range (kg)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  value={filters.minEmissions}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    minEmissions: Number(e.target.value)
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Min"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={filters.maxEmissions}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    maxEmissions: Number(e.target.value)
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
