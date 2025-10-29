import {VideoGrid} from "@/src/components/VideoGrid";
import {VideoGridError} from "@/src/components/ui/VideoGridError";
import {getVideos} from "@/src/lib/utils/video";
import {Suspense} from "react";
import {VideoSkeleton} from "@/src/components/ui/VideoSkeleton";

export const metadata = {
    title: 'Каталог видео',
    description: 'Каталог обучающих видео по веб-разработке',
};

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
        <Suspense fallback={<VideoSkeleton />}>
            <VideoGrid initialData={videos} />
        </Suspense>
    );
}