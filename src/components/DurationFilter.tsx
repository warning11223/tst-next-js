'use client';

import {DurationFilterType} from "@/src/lib/types/video";

interface DurationFilterProps {
    value: DurationFilterType;
    onChange: (value: DurationFilterType) => void;
}

const filterOptions = [
    { value: 'all' as const, label: 'Все' },
    { value: 'short' as const, label: '< 5 мин' },
    { value: 'medium' as const, label: '5-20 мин' },
    { value: 'long' as const, label: '> 20 мин' },
];

export const DurationFilter = ({ value, onChange }: DurationFilterProps) => {
    return (
        <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-700 flex items-center">
                Длительность:
            </span>
            {filterOptions.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
                        value === option.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-pressed={value === option.value}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};