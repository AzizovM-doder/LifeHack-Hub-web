import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const conversions = {
  length: {
    km: 1000,
    m: 1,
    cm: 0.01,
    mm: 0.001,
    mi: 1609.34,
    yd: 0.9144,
    ft: 0.3048,
    in: 0.0254
  },
  weight: {
    kg: 1000,
    g: 1,
    mg: 0.001,
    lb: 453.592,
    oz: 28.3495
  },
  volume: {
    l: 1,
    ml: 0.001,
    gal: 3.78541,
    qt: 0.946353,
    pt: 0.473176,
    cup: 0.236588,
    floz: 0.0295735
  }
} as const;

type Category = keyof typeof conversions;

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>('length');
  const [fromUnit, setFromUnit] = useState<string>('km');
  const [toUnit, setToUnit] = useState<string>('mi');
  const [value, setValue] = useState('1');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value as Category;
    setCategory(newCat);
    const units = Object.keys(conversions[newCat]);
    setFromUnit(units[0]);
    setToUnit(units[1]);
  };

  const convert = () => {
    const num = parseFloat(value);
    if (isNaN(num)) return '0.00';
    
    const catConversions = conversions[category] as Record<string, number>;
    const fromFactor = catConversions[fromUnit] || 1;
    const toFactor = catConversions[toUnit] || 1;
    
    // Convert to base unit first (m, g, l)
    const baseValue = num * fromFactor;
    // Convert from base unit to target
    const result = baseValue / toFactor;
    
    return result.toFixed(4).replace(/\.?0+$/, ''); // Remove trailing zeros
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-text-muted mb-2">Category</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full px-4 py-3 rounded-xl bg-bg border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text font-medium capitalize"
        >
          {Object.keys(conversions).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="space-y-2">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-bg border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text text-lg text-center"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-bg-card border border-border outline-none text-text text-sm font-medium text-center"
          >
            {Object.keys(conversions[category]).map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        <div className="p-2 bg-accent/10 rounded-full text-accent">
          <ArrowRightLeft className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <div className="w-full px-4 py-3 rounded-xl bg-accent/10 border border-accent/20 text-accent font-extrabold text-lg text-center overflow-hidden text-ellipsis">
            {convert()}
          </div>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-bg-card border border-border outline-none text-text text-sm font-medium text-center"
          >
            {Object.keys(conversions[category]).map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
