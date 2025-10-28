import {DurationFilterType, Video} from "@/src/lib/types/video";

export const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Сегодня';
    if (diffDays === 1) return 'Вчера';
    if (diffDays < 7) return `${diffDays} дн. назад`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} нед. назад`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} мес. назад`;
    return `${Math.floor(diffDays / 365)} г. назад`;
};

export const filterByDuration = (
    videos: Video[],
    filter: DurationFilterType
): Video[] => {
    if (filter === 'all') return videos;

    return videos.filter((video) => {
        if (filter === 'short') return video.durationSec < 300;
        if (filter === 'medium')
            return video.durationSec >= 300 && video.durationSec <= 1200;
        if (filter === 'long') return video.durationSec > 1200;
        return true;
    });
};

export const filterBySearch = (videos: Video[], search: string): Video[] => {
    if (!search.trim()) return videos;

    const searchLower = search.toLowerCase().trim();
    return videos.filter((video) =>
        video.title.toLowerCase().includes(searchLower)
    );
};

export const sortByDate = (videos: Video[]): Video[] => {
    return [...videos].sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
};