
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { GatewayData } from '../types';

interface StrategyPanelProps {
  selectedGateway: GatewayData;
}

const StrategyPanel: React.FC<StrategyPanelProps> = ({ selectedGateway }) => {
  const [strategy, setStrategy] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStrategy = async () => {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `As a senior FinTech architect, analyze the strategic advantage of integrating ${selectedGateway.name} as a complement to an existing Stripe Connect setup. 
          Focus on geographic expansion into: ${selectedGateway.countries.join(', ')}. 
          Provide a concise 3-sentence summary of the business impact.`,
        });
        setStrategy(response.text || 'Unable to generate strategy at this time.');
      } catch (error) {
        console.error("AI Error:", error);
        setStrategy(`Strategic integration of ${selectedGateway.name} provides immediate access to ${selectedGateway.countries.length} additional key markets, mitigating the geographic constraints of a Stripe-only setup.`);
      } finally {
        setLoading(false);
      }
    };

    fetchStrategy();
  }, [selectedGateway]);

  return (
    <div className="bg-white border-l border-slate-200 h-full p-6 overflow-y-auto">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">AI Strategic Insight</h3>
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-100 rounded w-3/4"></div>
          <div className="h-4 bg-slate-100 rounded w-full"></div>
          <div className="h-4 bg-slate-100 rounded w-5/6"></div>
        </div>
      ) : (
        <div className="prose prose-sm text-slate-600">
          <p className="leading-relaxed italic">"{strategy}"</p>
        </div>
      )}
      
      <div className="mt-8 pt-8 border-t border-slate-100">
        <h4 className="text-sm font-semibold text-slate-800 mb-2">Integration Focus</h4>
        <p className="text-sm text-slate-500">{selectedGateway.strategicValue}</p>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-2">
        {selectedGateway.countries.slice(0, 8).map(c => (
          <span key={c} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded uppercase">
            {c}
          </span>
        ))}
        {selectedGateway.countries.length > 8 && (
          <span className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded uppercase">
            +{selectedGateway.countries.length - 8} More
          </span>
        )}
      </div>
    </div>
  );
};

export default StrategyPanel;
