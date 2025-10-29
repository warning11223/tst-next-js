import { NextResponse } from 'next/server';
import {VideosResponse} from "@/src/lib/types/video";
import {mockVideos} from "@/src/lib/data/mockVideos";

export async function GET() {
    // Ошибка 10%
    const shouldFail = Math.random() < 0.1;

    if (shouldFail) {
        return NextResponse.json(
            { message: 'Внутренняя ошибка сервера' },
            {
                status: 500,
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
            }
        );
    }

    try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response: VideosResponse = {
            videos: mockVideos,
        };

        return NextResponse.json(response, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Не удалось загрузить видео' },
            { status: 500 }
        );
    }
}