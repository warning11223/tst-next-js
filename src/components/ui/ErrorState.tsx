interface ErrorStateProps {
    onRetry: () => void;
}

export const ErrorState = ({ onRetry }: ErrorStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <svg
                className="w-16 h-16 text-red-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ошибка загрузки
            </h3>
            <p className="text-gray-600 mb-4 text-center max-w-md">
                Не удалось загрузить видео. Попробуйте обновить страницу
            </p>
            <button
                onClick={onRetry}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Повторить
            </button>
        </div>
    );
};