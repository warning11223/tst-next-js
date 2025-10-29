'use client';

export const VideoGridError = () => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-red-600"
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
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Ошибка загрузки
                        </h1>

                        <p className="text-gray-600 mb-6">
                            Не удалось загрузить список видео. Попробуйте обновить страницу.
                        </p>

                        <button
                            onClick={handleReload}
                            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                        >
                            Обновить страницу
                        </button>

                        <p className="text-sm text-gray-500 mt-4">
                            При обновлении запрос будет выполнен заново
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};