export interface AIModel {
  id: string;          // utilisé pour la sélection côté frontend
  _id?: string;         // ajouté ici pour les données du backend (MongoDB)

  name: string;
  provider: string;
  energyConsumption: number; // in kWh
  co2Emissions: number;      // in kg

  datacenterLocation: {
    lat: number;
    lng: number;
    country: string;
  };

  parameters: {
    modelSize: string;
    trainingTime: number;
    batchSize: number;
    epochs: number;
    hardwareType: string;
  };

  metrics: {
    accuracy: number;
    inferenceTime: number;
  };
}

export interface FilterOptions {
  provider: string[];
  minEmissions: number;
  maxEmissions: number;
  country: string[];
}
