import React from 'react';
import type { Option } from '../types';

interface SegmentedControlProps<T extends Option> {
  label: string;
  options: T[];
  selectedOption: T;
  onSelect: (option: T) => void;
  disabled?: boolean;
}

export const SegmentedControl = <T extends Option>({ label, options, selectedOption, onSelect, disabled = false }: SegmentedControlProps<T>) => {
  return (
    <div className={disabled ? 'opacity-50 pointer-events-none' : ''}>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="flex w-full p-1 bg-slate-100 rounded-lg space-x-1" role="group">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
            disabled={disabled}
            className={`w-full text-center px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
              selectedOption.id === option.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'bg-transparent text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={selectedOption.id === option.id}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};