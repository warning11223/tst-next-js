'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { VideoCard } from './VideoCard';

import { SearchInput } from './SearchInput';
import { DurationFilter } from './DurationFilter';

import { ErrorState } from './ErrorState';
import {useDebounce} from "@/src/hooks/useDebounce";
import {useVideos} from "@/src/hooks/useVideos";
import {filterByDuration, filterBySearch, sortByDate} from "@/src/lib/utils/video";
import {DurationFilterType} from "@/src/lib/types/video";
import {VideoSkeleton} from "@/src/components/VideoSkeleton";

export const VideoGrid = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [duration, setDuration] = useState<DurationFilterType>(
        (searchParams.get('duration') as DurationFilterType) || 'all'
    );

    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading, isError, refetch } = useVideos();

    useEffect(() => {
        const params = new URLSearchParams();
        if (debouncedSearch) params.set('search', debouncedSearch);
        if (duration !== 'all') params.set('duration', duration);

        const query = params.toString();
        router.replace(query ? `?${query}` : '/', { scroll: false });
    }, [debouncedSearch, duration, router]);

    const filteredVideos = useMemo(() => {
        if (!data?.videos) return [];

        let result = [...data.videos];
        result = sortByDate(result);
        result = filterByDuration(result, duration);
        result = filterBySearch(result, debouncedSearch);

        return result;
    }, [data, duration, debouncedSearch]);

    const handleReset = () => {
        setSearch('');
        setDuration('all');
    };

    if (isError) {
        return <ErrorState onRetry={() => refetch()} />;
    }

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

                {isLoading ? (
                    <div className="min-h-screen bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <VideoSkeleton key={i} />
                                ))}
                            </div>
                        </div>
                    </div>
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
