
import React, { useState } from 'react';
import { GATEWAYS } from './constants';
import { GatewayId } from './types';
import MapComponent from './components/MapComponent';
import StrategyPanel from './components/StrategyPanel';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<GatewayId>('paypal');
  const selectedGateway = GATEWAYS[selectedId];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 flex flex-col md:flex-row md:items-center justify-between shadow-lg z-10 border-b border-slate-700">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
             <h1 className="text-lg font-bold tracking-tight">Stripe Connect Expansion Map</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Multi-Processor Geographic Complementary Analysis</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex flex-col">
            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1">Secondary Integration</label>
            <select 
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value as GatewayId)}
              className="bg-slate-800 border border-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 transition-all outline-none"
            >
              {Object.values(GATEWAYS).map(gw => (
                <option key={gw.id} value={gw.id}>{gw.name}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row relative">
        <div className="flex-1 relative">
          <MapComponent selectedGateway={selectedGateway} />
        </div>
        
        {/* Mobile Info Tab (Visible on small screens) */}
        <div className="md:hidden bg-white border-t border-slate-200 p-4">
           <h2 className="text-sm font-bold text-slate-800">{selectedGateway.name}</h2>
           <p className="text-xs text-slate-500 mt-1">{selectedGateway.description}</p>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-80 shadow-2xl">
          <StrategyPanel selectedGateway={selectedGateway} />
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="bg-slate-100 border-t border-slate-200 px-4 py-2 flex justify-between items-center text-[10px] text-slate-500 font-medium">
        <div className="flex items-center gap-4">
          <span>Stripe Markets: {selectedId === 'adyen' ? 'Core Overlap' : 'Strategic Gaps'}</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Active Gateway: {selectedGateway.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Live Geographic Engine</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
