import { jsPDF } from 'jspdf';
import Papa from 'papaparse';
import { AIModel } from '../types/AIModel';

export const exportToPDF = (models: AIModel[]) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text('AI Models Carbon Footprint Report', 20, 20);
  
  // Add date
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  
  // Add table headers
  const headers = ['Model', 'Provider', 'CO₂ (kg)', 'Energy (kWh)', 'Location'];
  let y = 40;
  
  doc.setFontSize(12);
  doc.text(headers[0], 20, y);
  doc.text(headers[1], 60, y);
  doc.text(headers[2], 100, y);
  doc.text(headers[3], 140, y);
  doc.text(headers[4], 180, y);
  
  // Add table content
  models.forEach((model, index) => {
    y = 50 + (index * 10);
    
    doc.text(model.name, 20, y);
    doc.text(model.provider, 60, y);
    doc.text(model.co2Emissions.toFixed(2), 100, y);
    doc.text(model.energyConsumption.toFixed(2), 140, y);
    doc.text(model.datacenterLocation.country, 180, y);
  });
  
  // Save the PDF
  doc.save('ai-carbon-footprint-report.pdf');
};

export const exportToCSV = (models: AIModel[]) => {
  const data = models.map(model => ({
    Name: model.name,
    Provider: model.provider,
    'CO₂ Emissions (kg)': model.co2Emissions,
    'Energy Consumption (kWh)': model.energyConsumption,
    Country: model.datacenterLocation.country,
    'Model Size': model.parameters.modelSize,
    'Training Time (hours)': model.parameters.trainingTime,
    'Batch Size': model.parameters.batchSize,
    'Hardware Type': model.parameters.hardwareType,
    'Accuracy': model.metrics.accuracy,
    'Inference Time (ms)': model.metrics.inferenceTime
  }));
  
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'ai-carbon-footprint-data.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};