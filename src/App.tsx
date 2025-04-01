import  { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ModelList } from './components/ModelList';
import { Map } from './components/Map';
import { Charts } from './components/Charts';
import { Filters } from './components/Filters';
import { AIModel, FilterOptions } from './types/AIModel';

// Sample data - replace with actual API data
const sampleModels: AIModel[] = [
  {
    id: '1',
    name: 'GPT-3',
    provider: 'OpenAI',
    energyConsumption: 1543.2,
    co2Emissions: 436.8,
    datacenterLocation: {
      lat: 37.7749,
      lng: -122.4194,
      country: 'USA'
    },
    parameters: {
      modelSize: '175B',
      trainingTime: 288,
      batchSize: 1024,
      epochs: 100,
      hardwareType: 'NVIDIA A100'
    },
    metrics: {
      accuracy: 0.94,
      inferenceTime: 125
    }
  },
  {
    id: '2',
    name: 'DALL-E 2',
    provider: 'OpenAI',
    energyConsumption: 892.5,
    co2Emissions: 251.4,
    datacenterLocation: {
      lat: 47.6062,
      lng: -122.3321,
      country: 'USA'
    },
    parameters: {
      modelSize: '3.5B',
      trainingTime: 144,
      batchSize: 512,
      epochs: 80,
      hardwareType: 'NVIDIA V100'
    },
    metrics: {
      accuracy: 0.89,
      inferenceTime: 250
    }
  },
  {
    id: '3',
    name: 'Stable Diffusion',
    provider: 'Stability AI',
    energyConsumption: 256.8,
    co2Emissions: 72.4,
    datacenterLocation: {
      lat: 51.5074,
      lng: -0.1278,
      country: 'UK'
    },
    parameters: {
      modelSize: '1.5B',
      trainingTime: 72,
      batchSize: 256,
      epochs: 50,
      hardwareType: 'NVIDIA A6000'
    },
    metrics: {
      accuracy: 0.92,
      inferenceTime: 180
    }
  },
  {
    id: '4',
    name: 'Claude',
    provider: 'Anthropic',
    energyConsumption: 1205.6,
    co2Emissions: 340.2,
    datacenterLocation: {
      lat: 40.7128,
      lng: -74.0060,
      country: 'USA'
    },
    parameters: {
      modelSize: '150B',
      trainingTime: 240,
      batchSize: 768,
      epochs: 90,
      hardwareType: 'NVIDIA A100'
    },
    metrics: {
      accuracy: 0.93,
      inferenceTime: 145
    }
  },
  {
    id: '5',
    name: 'PaLM',
    provider: 'Google',
    energyConsumption: 1892.4,
    co2Emissions: 534.6,
    datacenterLocation: {
      lat: 45.5155,
      lng: -122.6789,
      country: 'USA'
    },
    parameters: {
      modelSize: '540B',
      trainingTime: 360,
      batchSize: 1024,
      epochs: 120,
      hardwareType: 'TPU v4'
    },
    metrics: {
      accuracy: 0.95,
      inferenceTime: 110
    }
  },
  {
    id: '6',
    name: 'BLOOM',
    provider: 'Hugging Face',
    energyConsumption: 402.3,
    co2Emissions: 89.7,
    datacenterLocation: {
      lat: 48.8566,
      lng: 2.3522,
      country: 'France'
    },
    parameters: {
      modelSize: '176B',
      trainingTime: 168,
      batchSize: 896,
      epochs: 75,
      hardwareType: 'NVIDIA A100'
    },
    metrics: {
      accuracy: 0.91,
      inferenceTime: 155
    }
  },
  {
    id: '7',
    name: 'LLaMA',
    provider: 'Meta AI',
    energyConsumption: 1345.8,
    co2Emissions: 380.2,
    datacenterLocation: {
      lat: 37.4847,
      lng: -122.1477,
      country: 'USA'
    },
    parameters: {
      modelSize: '65B',
      trainingTime: 216,
      batchSize: 768,
      epochs: 85,
      hardwareType: 'NVIDIA A100'
    },
    metrics: {
      accuracy: 0.93,
      inferenceTime: 135
    }
  },
  {
    id: '8',
    name: 'Midjourney',
    provider: 'Midjourney',
    energyConsumption: 678.9,
    co2Emissions: 191.6,
    datacenterLocation: {
      lat: 36.1699,
      lng: -115.1398,
      country: 'USA'
    },
    parameters: {
      modelSize: '4.8B',
      trainingTime: 192,
      batchSize: 512,
      epochs: 70,
      hardwareType: 'NVIDIA A100'
    },
    metrics: {
      accuracy: 0.90,
      inferenceTime: 220
    }
  },
  {
    id: '9',
    name: 'ERNIE',
    provider: 'Baidu',
    energyConsumption: 1123.5,
    co2Emissions: 316.8,
    datacenterLocation: {
      lat: 39.9042,
      lng: 116.4074,
      country: 'China'
    },
    parameters: {
      modelSize: '260B',
      trainingTime: 264,
      batchSize: 1024,
      epochs: 95,
      hardwareType: 'NVIDIA A100'
    },
    metrics: {
      accuracy: 0.92,
      inferenceTime: 140
    }
  },
  {
    id: '10',
    name: 'Kosmos-2',
    provider: 'Microsoft',
    energyConsumption: 945.7,
    co2Emissions: 266.9,
    datacenterLocation: {
      lat: 47.6062,
      lng: -122.3321,
      country: 'USA'
    },
    parameters: {
      modelSize: '1.9B',
      trainingTime: 144,
      batchSize: 384,
      epochs: 65,
      hardwareType: 'NVIDIA A100'
    },
    metrics: {
      accuracy: 0.91,
      inferenceTime: 165
    }
  }
];

function App() {
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    provider: [],
    minEmissions: 0,
    maxEmissions: Infinity,
    country: []
  });

  const providers = useMemo(() => 
    Array.from(new Set(sampleModels.map(model => model.provider))),
    []
  );

  const countries = useMemo(() => 
    Array.from(new Set(sampleModels.map(model => model.datacenterLocation.country))),
    []
  );

  const filteredModels = useMemo(() => {
    return sampleModels.filter(model => {
      const matchesProvider = filters.provider.length === 0 || filters.provider.includes(model.provider);
      const matchesCountry = filters.country.length === 0 || filters.country.includes(model.datacenterLocation.country);
      const matchesEmissions = model.co2Emissions >= filters.minEmissions && 
        (filters.maxEmissions === Infinity || model.co2Emissions <= filters.maxEmissions);
      
      return matchesProvider && matchesCountry && matchesEmissions;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        models={filteredModels}
        onOpenFilters={() => setIsFiltersOpen(true)}
      />
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ModelList 
              models={filteredModels}
              onSelectModel={setSelectedModel}
              selectedModel={selectedModel}
            />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <Map 
              models={filteredModels}
              selectedModel={selectedModel}
            />
            <Charts 
              models={filteredModels}
              selectedModel={selectedModel}
            />
          </div>
        </div>
      </main>
      <Filters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        providers={providers}
        countries={countries}
      />
    </div>
  );
}

export default App;