import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { ModelList } from './components/ModelList';
import { Map } from './components/Map';
import { Charts } from './components/Charts';
import { Filters } from './components/Filters';
import { AIModel, FilterOptions } from './types/AIModel';

function App() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    provider: [],
    minEmissions: 0,
    maxEmissions: Infinity,
    country: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/models'); 
        if (!res.ok) throw new Error('Erreur lors du chargement des données');
        const data: AIModel[] = await res.json();
        setModels(data);
      } catch (err: any) {
        setError(err.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const providers = useMemo(
    () => Array.from(new Set(models.map((m) => m.provider))),
    [models]
  );

  const countries = useMemo(
    () => Array.from(new Set(models.map((m) => m.datacenterLocation.country))),
    [models]
  );

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const matchProvider =
        filters.provider.length === 0 || filters.provider.includes(model.provider);
      const matchCountry =
        filters.country.length === 0 ||
        filters.country.includes(model.datacenterLocation.country);
      const matchEmissions =
        model.co2Emissions >= filters.minEmissions &&
        (filters.maxEmissions === Infinity ||
          model.co2Emissions <= filters.maxEmissions);
      return matchProvider && matchCountry && matchEmissions;
    });
  }, [models, filters]);

  if (loading) return <div className="p-8 text-center">Chargement des modèles...</div>;
  if (error) return <div className="p-8 text-red-500">Erreur : {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header models={filteredModels} onOpenFilters={() => setIsFiltersOpen(true)} />
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 h-[500px] overflow-y-auto">
            <ModelList
              models={filteredModels}
              onSelectModel={setSelectedModel}
              selectedModel={selectedModel}
            />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div className="w-full mb-8">
              <Map models={filteredModels} selectedModel={selectedModel} />
            </div>
          </div>
        </div>
      </main>
      <div className="w-full mb-8">
        <Charts models={filteredModels} selectedModel={selectedModel} />
      </div>
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
