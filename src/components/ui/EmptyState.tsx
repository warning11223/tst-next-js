interface EmptyStateProps {
    onReset: () => void;
}

export const EmptyState = ({ onReset }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <svg
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                Видео не найдены
            </h3>
            <p className="text-gray-600 mb-4 text-center max-w-md">
                Попробуйте изменить параметры поиска или сбросить фильтры
            </p>
            <button
                onClick={onReset}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
                Сбросить фильтры
            </button>
        </div>
    );
};