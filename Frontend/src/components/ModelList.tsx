import React from 'react';
import { AIModel } from '../types/AIModel';
import { Server, Cpu, Clock, Database } from 'lucide-react';

interface ModelListProps {
  models: AIModel[];
  onSelectModel: (model: AIModel) => void;
  selectedModel?: AIModel | null;
}

export const ModelList: React.FC<ModelListProps> = ({ models, onSelectModel, selectedModel }) => {
  return (
    <div className="bg-white shadow-md !p-0 !m-0">
      <h2 className="text-xl font-semibold mb-4">AI Models</h2>
      <div className="space-y-2">
        {models.map((model) => (
          <div
            key={model.id}
            onClick={() => onSelectModel(model)}
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer transition-colors ${
              selectedModel?.id === model.id ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
            }`}
          >
            <Server className="h-5 w-5 text-teal-600" />
            <div className="flex-grow">
              <h3 className="font-medium">{model.name}</h3>
              <p className="text-sm text-gray-500">{model.provider}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{model.co2Emissions.toFixed(2)} kg CO₂</p>
              <p className="text-xs text-gray-500">{model.energyConsumption.toFixed(2)} kWh</p>
            </div>
          </div>
        ))}
      </div>
      {selectedModel && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Model Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Cpu className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">{selectedModel.parameters.hardwareType}</p>
                <p className="text-xs text-gray-500">Hardware</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">{selectedModel.metrics.inferenceTime} ms</p>
                <p className="text-xs text-gray-500">Inference Time</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">{selectedModel.parameters.modelSize}</p>
                <p className="text-xs text-gray-500">Model Size</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};