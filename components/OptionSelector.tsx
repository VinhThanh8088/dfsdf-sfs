import React from 'react';
import type { Option } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface OptionSelectorProps<T extends Option> {
  label: string;
  options: T[];
  selectedOption: T;
  onSelect: (option: T) => void;
  renderOption: (option: T) => React.ReactNode;
  disabled?: boolean;
  gridColsClass?: string;
}

export const OptionSelector = <T extends Option>(
  { label, options, selectedOption, onSelect, renderOption, disabled = false, gridColsClass = 'grid-cols-2' }: OptionSelectorProps<T>
) => {
  return (
    <div className={disabled ? 'opacity-50 pointer-events-none' : ''}>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className={`grid ${gridColsClass} gap-3`}>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
            disabled={disabled}
            className={`relative p-2 border rounded-lg text-center transition-all duration-200 w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
              selectedOption.id === option.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-slate-300 bg-white hover:border-blue-500'
            } ${disabled ? 'bg-slate-100' : ''}`}
             aria-pressed={selectedOption.id === option.id}
          >
            {renderOption(option)}
            {selectedOption.id === option.id && (
              <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow">
                <CheckIcon className="w-3 h-3 text-white" />
              </div>
            )}
             <div className={`absolute -inset-px rounded-lg border-2 border-transparent ${selectedOption.id === option.id ? 'border-blue-600' : 'group-hover:border-blue-500'} transition-all duration-200 pointer-events-none`}></div>
          </button>
        ))}
      </div>
    </div>
  );
};