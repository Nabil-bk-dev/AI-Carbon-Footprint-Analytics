import React from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import { AIModel } from '../types/AIModel';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  models: AIModel[];
  selectedModel: AIModel | null;
}

export const Map: React.FC<MapProps> = ({ models, selectedModel }) => {
  const getMarkerSize = (emissions: number) => {
    const maxEmissions = Math.max(...models.map(m => m.co2Emissions));
    return (emissions / maxEmissions) * 30 + 20;
  };

  const getMarkerColor = (emissions: number) => {
    const maxEmissions = Math.max(...models.map(m => m.co2Emissions));
    const ratio = emissions / maxEmissions;
    if (ratio < 0.3) return '#10B981'; // green
    if (ratio < 0.6) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  return (
    <div className="relative z-30 h-[500px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {models.map((model) => {
          const isSelected = selectedModel?._id === model._id;

          return (
            <CircleMarker
              key={model._id}
              center={[model.datacenterLocation.lat, model.datacenterLocation.lng]}
              radius={getMarkerSize(model.co2Emissions) + (isSelected ? 5 : 0)}
              fillColor={getMarkerColor(model.co2Emissions)}
              color={isSelected ? '#2563EB' : '#333'} 
              weight={isSelected ? 4 : 1}             
              stroke={true}                           
              opacity={1}
              fillOpacity={0.6}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{model.name}</h3>
                  <p className="text-sm">Provider: {model.provider}</p>
                  <p className="text-sm">CO₂: {model.co2Emissions.toFixed(2)} kg</p>
                  <p className="text-sm">Energy: {model.energyConsumption.toFixed(2)} kWh</p>
                  <p className="text-sm">Location: {model.datacenterLocation.country}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};
