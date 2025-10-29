'use client'

import Link from 'next/link';
import {useParams} from "next/navigation";

export default function VideoDetailPage() {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Страница видео # {id}
                </h1>
                <p className="text-gray-600 mb-6">
                    Здесь будет детальная страница видео
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Вернуться к каталогу
                </Link>
            </div>
        </div>
    );
}