import { NextResponse } from 'next/server';
import {VideosResponse} from "@/src/lib/types/video";
import {mockVideos} from "@/src/lib/data/mockVideos";

// Установил кеширование 0, для отображения ошибки
export const revalidate = 0;

export async function GET() {
    // Ошибка 10%
    const shouldFail = Math.random() < 0.1;

    if (shouldFail) {
        return NextResponse.json(
            { message: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }

    try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response: VideosResponse = {
            videos: mockVideos,
        };

        return NextResponse.json(response, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
            },
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Не удалось загрузить видео' },
            { status: 500 }
        );
    }
}