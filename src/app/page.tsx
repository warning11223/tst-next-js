import {VideoGrid} from "@/src/components/VideoGrid";
import {VideoGridError} from "@/src/components/VideoGridError";

export const metadata = {
    title: 'Каталог видео',
    description: 'Каталог обучающих видео по веб-разработке',
};

export const revalidate = 60;

async function getVideos() {
    const res = await fetch('http://localhost:3000/api/videos', {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch videos');
    }

    const data = await res.json();
    return data.videos;
}

export default async function HomePage() {
    let videos;
    let hasError = false;

    try {
        videos = await getVideos();
    } catch (error) {
        console.error('Ошибка загрузки видео:', error);
        hasError = true;
    }

    if (hasError) {
        return <VideoGridError />;
    }

    return (
        <VideoGrid initialData={videos} />
    );
}