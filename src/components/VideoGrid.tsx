'use client';

import { FC } from 'react';
import { VideoCard } from './ui/VideoCard';
import { SearchInput } from './ui/SearchInput';
import { DurationFilter } from './DurationFilter';
import { EmptyState } from './ui/EmptyState';
import { Video } from '@/src/lib/types/video';
import {useFilters} from "@/src/hooks/useFilters";

type VideoGridProps = {
    initialData: Video[];
};

export const VideoGrid: FC<VideoGridProps> = ({ initialData }) => {
    const {
        search,
        setSearch,
        duration,
        setDuration,
        filteredVideos,
        resetFilters,
    } = useFilters(initialData);

    return (
        <div className="min-h-screen bg-gray-200">
            <div className="max-w-7xl m-auto-custom px-4 sm:px-6 lg:px-8 py-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        Каталог видео
                    </h1>

                    <div className="space-y-4">
                        <SearchInput value={search} onChange={setSearch} />
                        <DurationFilter value={duration} onChange={setDuration} />
                    </div>
                </header>

                {filteredVideos.length === 0 ? (
                    <EmptyState onReset={resetFilters} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};