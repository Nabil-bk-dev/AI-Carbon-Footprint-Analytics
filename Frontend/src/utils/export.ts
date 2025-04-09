import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { AIModel } from '../types/AIModel';
import logoBase64 from '../assets/IALogo.PNG'; // 👈 ton logo en base64

export const exportToPDF = (models: AIModel[]) => {
  const doc = new jsPDF();

  // ✅ Ajouter le logo en haut à droite
  doc.addImage(logoBase64, 'PNG', 150, 10, 40, 15); // (image, format, x, y, width, height)

  // ✅ Titre
  doc.setFontSize(18);
  doc.setTextColor(34, 139, 34); // vert foncé
  doc.text('AI Carbon Footprint Report', 14, 20);

  // ✅ Date
  doc.setFontSize(11);
  doc.setTextColor(90);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

  // ✅ Tableau
  autoTable(doc, {
    startY: 35,
    head: [['Model', 'Provider', 'CO₂ Emissions (kg)', 'Energy (kWh)', 'Country']],
    body: models.map(model => [
      model.name,
      model.provider,
      model.co2Emissions.toFixed(2),
      model.energyConsumption.toFixed(2),
      model.datacenterLocation.country,
    ]),
    styles: {
      fontSize: 10,
      halign: 'center',
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [46, 204, 113],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { left: 14, right: 14 },
  });

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
    'Inference Time (ms)': model.metrics.inferenceTime,
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
