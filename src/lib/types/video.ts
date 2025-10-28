export interface Video {
    id: string;
    title: string;
    author: string;
    durationSec: number;
    publishedAt: string;
    thumbnail: string;
}

export type DurationFilterType = 'all' | 'short' | 'medium' | 'long';

export interface VideoFilters {
    search: string;
    duration: DurationFilterType;
}

export interface VideosResponse {
    videos: Video[];
}

export interface VideoError {
    message: string;
}