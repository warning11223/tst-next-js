import { NextResponse } from 'next/server';
import {VideosResponse} from "@/src/lib/types/video";
import {mockVideos} from "@/src/lib/data/mockVideos";

export const revalidate = 60;

export async function GET() {
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