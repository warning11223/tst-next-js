'use client';

import { useMemo, useState, useEffect, FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { VideoCard } from './VideoCard';
import { SearchInput } from './SearchInput';
import { DurationFilter } from './DurationFilter';
import { EmptyState } from './EmptyState';
import { useDebounce } from '@/src/hooks/useDebounce';
import { filterByDuration, filterBySearch, sortByDate } from '@/src/lib/utils/video';
import { DurationFilterType, Video } from '@/src/lib/types/video';

type VideoGridProps = {
    initialData: Video[];
};

export const VideoGrid: FC<VideoGridProps> = ({ initialData }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [duration, setDuration] = useState<DurationFilterType>(
        (searchParams.get('duration') as DurationFilterType) || 'all'
    );

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const params = new URLSearchParams();
        if (debouncedSearch) params.set('search', debouncedSearch);
        if (duration !== 'all') params.set('duration', duration);

        const query = params.toString();
        router.replace(query ? `?${query}` : '/', { scroll: false });
    }, [debouncedSearch, duration, router]);

    const filteredVideos = useMemo(() => {
        let result = [...initialData];
        result = sortByDate(result);
        result = filterByDuration(result, duration);
        result = filterBySearch(result, debouncedSearch);

        return result;
    }, [initialData, duration, debouncedSearch]);

    const handleReset = () => {
        setSearch('');
        setDuration('all');
    };

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
                    <EmptyState onReset={handleReset} />
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