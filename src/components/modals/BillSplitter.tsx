import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../utils';

export default function BillSplitter() {
  const [total, setTotal] = useState('');
  const [people, setPeople] = useState('2');
  const [tip, setTip] = useState('15');
  const [copied, setCopied] = useState(false);

  const totalNum = parseFloat(total) || 0;
  const peopleNum = parseInt(people) || 1;
  const tipNum = parseFloat(tip) || 0;

  const tipAmount = totalNum * (tipNum / 100);
  const grandTotal = totalNum + tipAmount;
  const perPerson = grandTotal / peopleNum;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Total: $${grandTotal.toFixed(2)} | Per Person: $${perPerson.toFixed(2)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-text-muted mb-2">Total Bill ($)</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-xl bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text text-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-text-muted mb-2">People</label>
            <input
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              min="1"
              className="w-full px-4 py-3 rounded-xl bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-text-muted mb-2">Tip (%)</label>
            <input
              type="number"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              min="0"
              className="w-full px-4 py-3 rounded-xl bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text text-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex justify-between items-center mb-4">
          <span className="text-text-muted font-medium">Per Person</span>
          <span className="text-3xl font-extrabold text-primary">${perPerson.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-text-muted border-t border-primary/20 pt-4">
          <span>Total + Tip: ${grandTotal.toFixed(2)}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-primary hover:text-primary-light transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
