import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  const [unit, setUnit] = useState<'inches' | 'cms'>('inches');

  if (!isOpen) return null;

  const sizeChartInches = [
    { size: 'XS', bust: '32', waist: '26', hip: '35', length: '44' },
    { size: 'S', bust: '34', waist: '28', hip: '37', length: '44.5' },
    { size: 'M', bust: '36', waist: '30', hip: '39', length: '45' },
    { size: 'L', bust: '38', waist: '32', hip: '41', length: '45.5' },
    { size: 'XL', bust: '40', waist: '34', hip: '43', length: '46' },
    { size: 'XXL', bust: '42', waist: '36', hip: '45', length: '46.5' }
  ];

  const sizeChartCms = sizeChartInches.map((row) => ({
    size: row.size,
    bust: Math.round(Number(row.bust) * 2.54).toString(),
    waist: Math.round(Number(row.waist) * 2.54).toString(),
    hip: Math.round(Number(row.hip) * 2.54).toString(),
    length: Math.round(Number(row.length) * 2.54).toString()
  }));

  const activeChart = unit === 'inches' ? sizeChartInches : sizeChartCms;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-amber-800" />
            <h3 className="font-bold text-base text-gray-900">Standard Size Guide ({category})</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Garment Measurements. The model is 5'8" wearing size S.
            </p>
            <div className="inline-flex rounded-md p-1 bg-gray-100 text-xs font-semibold">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 rounded transition-colors ${
                  unit === 'inches' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cms')}
                className={`px-3 py-1 rounded transition-colors ${
                  unit === 'cms' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-700 uppercase font-bold border-b border-gray-200">
                <tr>
                  <th className="px-3.5 py-2.5">Size</th>
                  <th className="px-3.5 py-2.5">Bust</th>
                  <th className="px-3.5 py-2.5">Waist</th>
                  <th className="px-3.5 py-2.5">Hips</th>
                  <th className="px-3.5 py-2.5">Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {activeChart.map((row) => (
                  <tr key={row.size} className="hover:bg-gray-50">
                    <td className="px-3.5 py-2 font-bold text-gray-900">{row.size}</td>
                    <td className="px-3.5 py-2">{row.bust} {unit === 'inches' ? 'in' : 'cm'}</td>
                    <td className="px-3.5 py-2">{row.waist} {unit === 'inches' ? 'in' : 'cm'}</td>
                    <td className="px-3.5 py-2">{row.hip} {unit === 'inches' ? 'in' : 'cm'}</td>
                    <td className="px-3.5 py-2">{row.length} {unit === 'inches' ? 'in' : 'cm'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Tip */}
          <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200 text-[11px] text-gray-700">
            <span className="font-bold text-amber-900">Fitting Tip:</span> If you are between sizes, we recommend selecting the larger size for a relaxed and fluid drape.
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-100 text-right">
          <button
            onClick={onClose}
            className="bg-gray-900 text-white font-bold text-xs px-5 py-2 rounded hover:bg-black transition-colors uppercase tracking-wider"
          >
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
};
