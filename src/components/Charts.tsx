import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { AIModel } from '../types/AIModel';

interface ChartsProps {
  models: AIModel[];
  selectedModel: AIModel | null;
}

export const Charts: React.FC<ChartsProps> = ({ models, selectedModel }) => {
  const barChartRef = useRef<SVGSVGElement>(null);
  const scatterPlotRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!barChartRef.current) return;

    // Clear previous chart
    d3.select(barChartRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(barChartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height, 0]);

    x.domain(models.map(d => d.name));
    y.domain([0, d3.max(models, d => d.co2Emissions) || 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.selectAll('.bar')
      .data(models)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name) || 0)
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.co2Emissions))
      .attr('height', d => height - y(d.co2Emissions))
      .attr('fill', d => selectedModel?.id === d.id ? '#2563EB' : '#10B981')
      .attr('opacity', d => selectedModel?.id === d.id ? 1 : 0.7);

    // Add labels
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('CO₂ Emissions (kg)');

  }, [models, selectedModel]);

  useEffect(() => {
    if (!scatterPlotRef.current) return;

    // Clear previous chart
    d3.select(scatterPlotRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(scatterPlotRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(models, d => d.parameters.trainingTime) || 0])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(models, d => d.energyConsumption) || 0])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.selectAll('.dot')
      .data(models)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.parameters.trainingTime))
      .attr('cy', d => y(d.energyConsumption))
      .attr('r', 6)
      .style('fill', d => selectedModel?.id === d.id ? '#2563EB' : '#10B981')
      .style('opacity', d => selectedModel?.id === d.id ? 1 : 0.7);

    // Add labels
    svg.append('text')
      .attr('transform', `translate(${width/2},${height + margin.top + 20})`)
      .style('text-anchor', 'middle')
      .text('Training Time (hours)');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Energy Consumption (kWh)');

  }, [models, selectedModel]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">CO₂ Emissions by Model</h3>
        <svg ref={barChartRef}></svg>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Energy vs Training Time</h3>
        <svg ref={scatterPlotRef}></svg>
      </div>
    </div>
  );
};